import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  question: z.string().min(1).max(2000),
  mode: z.enum(["beginner", "engineer", "soc"]).default("engineer"),
  sessionContext: z.string().max(4000).optional(),
});

const SYSTEM_PROMPTS: Record<string, string> = {
  beginner:
    "You are Sentinel, the AI mentor for the Cybersec Masters Learning OS. Explain in the simplest possible terms with everyday analogies. Assume no cybersecurity background. Keep answers under 200 words. Use short paragraphs and bullet points.",
  engineer:
    "You are Sentinel, the AI mentor for the Cybersec Masters Learning OS. Explain like a senior security engineer — precise, technical, with concrete commands, tool names, and log-line examples where useful. Keep answers under 250 words.",
  soc:
    "You are Sentinel, the AI mentor for the Cybersec Masters Learning OS. Answer as a senior SOC analyst would in a shift handoff: signal, hypothesis, next action, escalation. Prefer numbered playbook steps. Keep answers under 220 words.",
};

export const askMentor = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => InputSchema.parse(raw))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { text: "AI Mentor is not configured yet. LOVABLE_API_KEY is missing on the server." };
    }

    const system = SYSTEM_PROMPTS[data.mode] ?? SYSTEM_PROMPTS.engineer;
    const userContent = data.sessionContext
      ? `Current session context:\n${data.sessionContext}\n\nStudent question:\n${data.question}`
      : data.question;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (res.status === 402) {
      return { text: "Your workspace is out of Lovable AI credits. Add credits in Settings → Workspace → Usage." };
    }
    if (res.status === 429) {
      return { text: "AI Mentor is rate-limited right now. Try again in a moment." };
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { text: `AI Mentor error (${res.status}). ${body.slice(0, 200)}` };
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = json.choices?.[0]?.message?.content?.trim() ?? "No response.";
    return { text };
  });
