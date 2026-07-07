import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const PacketAnalyzerSchema = z.object({
  filename: z.string(),
  content: z.string(), // Base64 for binary, text for logs
  type: z.enum(["binary", "text"]),
});

export const analyzePacket = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => PacketAnalyzerSchema.parse(raw))
  .handler(async ({ data }) => {
    let textToAnalyze = "";

    if (data.type === "binary") {
      // It's a PCAP or EVTX. Try local parsing.
      const buffer = Buffer.from(data.content, "base64");
      const tmpFile = path.join(os.tmpdir(), `packet_${Date.now()}_${data.filename}`);
      fs.writeFileSync(tmpFile, buffer);

      try {
        if (data.filename.endsWith(".evtx")) {
          // Attempt python evtx parsing (assuming python is available)
          const { stdout } = await execAsync(
            `python3 -c "import Evtx.Evtx as evtx; import json; print(json.dumps([r.xml() for r in evtx.Evtx('${tmpFile}').records()][:10]))"`,
          );
          textToAnalyze = stdout;
        } else {
          // PCAP/PCAPNG
          const { stdout } = await execAsync(`tshark -r "${tmpFile}" -c 50 -V`);
          textToAnalyze = stdout;
        }
      } catch (err: unknown) {
        fs.unlinkSync(tmpFile);
        const errMsg = err instanceof Error ? err.message : String(err);
        return {
          result: `Local parsing failed or tools (tshark/python-evtx) not installed. 
Please install TShark (Wireshark) on the host to analyze raw PCAP/EVTX files.
Error: ${errMsg}`,
        };
      }
      fs.unlinkSync(tmpFile);
    } else {
      textToAnalyze = data.content;
    }

    if (!textToAnalyze.trim()) {
      return { result: "No parsable data found in the input." };
    }

    // Now send the parsed text (or raw log text) to AI
    const { getAiConfig } = await import("./ai-mentor.functions"); // lazy load to avoid circular deps if needed, but they are in same file
    const config = getAiConfig();
    if (!config) return { result: "AI config missing." };

    const system =
      "You are a senior network and forensics analyst. Analyze the following packet capture, log snippet, or evtx records. Identify any anomalies, C2 beacons, data exfiltration, or malicious behavior. Keep your analysis concise and formatted with markdown.";

    // Truncate to avoid blowing up context window
    const truncatedText = textToAnalyze.slice(0, 15000);

    const res = await fetch(config.url, {
      method: "POST",
      headers: config.headers as HeadersInit,
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Please analyze this data:\n\n${truncatedText}` },
        ],
      }),
    });

    if (!res.ok) return { result: `AI Error (${res.status})` };
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return { result: json.choices?.[0]?.message?.content?.trim() ?? "No analysis generated." };
  });
