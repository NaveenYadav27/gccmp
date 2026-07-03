import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const PERSONAS = [
  "trainer", "soc", "network", "linux", "windows", "cloud", "ciso", "hiring", "interviewer",
] as const;
export type Persona = typeof PERSONAS[number];

export const MODES = [
  "explain", "simplify", "deepdive", "enterprise", "quiz", "flashcards",
  "commands", "interview", "career", "lab",
] as const;
export type Mode = typeof MODES[number];

const InputSchema = z.object({
  question: z.string().min(1).max(4000),
  persona: z.enum(PERSONAS).default("trainer"),
  mode: z.enum(MODES).default("explain"),
  sessionContext: z.string().max(6000).optional(),
});

const PERSONA_PROMPTS: Record<Persona, string> = {
  trainer:
    "You are Sentinel, a friendly cyber trainer. Explain concepts with enterprise analogies from Global Financial Corp (GFC), a 42k-employee bank.",
  soc:
    "You are a senior SOC analyst on shift at GFC. Answer like a shift handoff: signal → hypothesis → next action → escalation.",
  network:
    "You are GFC's principal network engineer. Answer with topology, protocol, and packet-level reasoning.",
  linux:
    "You are GFC's lead Linux SRE. Prefer commands, /etc paths, and systemd/journalctl output.",
  windows:
    "You are GFC's Windows / AD architect. Prefer Event IDs, PowerShell, and Group Policy references.",
  cloud:
    "You are GFC's cloud security architect (AWS + Azure). Reason in terms of IAM, VPCs, control plane, and blast radius.",
  ciso:
    "You are the CISO of GFC. Frame answers in business risk, regulator impact, and board-level language.",
  hiring:
    "You are a cybersecurity hiring manager. Evaluate answers as if in a hiring loop; be candid.",
  interviewer:
    "You are a technical interviewer. Ask a probing follow-up after your answer to force deeper thinking.",
};

const MODE_PROMPTS: Record<Mode, string> = {
  explain: "Give a clear structured explanation.",
  simplify: "Explain like the reader is completely new. Use one everyday analogy. Under 150 words.",
  deepdive: "Go deep — mechanisms, edge cases, related standards. Up to 400 words.",
  enterprise: "Focus on where this shows up inside GFC's stack — which system, which team owns it, what the failure looks like.",
  quiz: "Produce 5 multiple-choice questions (A–D) with correct answer and 1-line rationale.",
  flashcards: "Produce 8 flashcards as 'Q: … / A: …' pairs, one per line pair.",
  commands: "List the exact commands or PowerShell/CLI snippets, one per line, with a short comment.",
  interview: "Produce 5 interview questions and short model answers, tuned to a mid-level SOC/security role.",
  career: "Give career guidance: current position, next role, skill gaps, recommended certs, and one 30-day plan.",
  lab: "You are a lab assistant. Diagnose the user's issue step-by-step, suggest the next command to run, and explain what output would confirm the theory.",
};

export const askMentor = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => InputSchema.parse(raw))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { text: "AI Mentor is not configured. LOVABLE_API_KEY is missing." };
    }
    const system = `${PERSONA_PROMPTS[data.persona]}\n\nMode: ${MODE_PROMPTS[data.mode]}\n\nAlways stay inside the GFC enterprise universe when useful. Keep formatting tight and readable.`;
    const userContent = data.sessionContext
      ? `Current session:\n${data.sessionContext}\n\nStudent:\n${data.question}`
      : data.question;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (res.status === 402) return { text: "Workspace is out of Lovable AI credits." };
    if (res.status === 429) return { text: "Rate limited. Try again shortly." };
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { text: `Mentor error (${res.status}). ${body.slice(0, 200)}` };
    }
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return { text: json.choices?.[0]?.message?.content?.trim() ?? "No response." };
  });

const EvalSchema = z.object({
  missionId: z.string(),
  scenario: z.string(),
  successCriteria: z.array(z.string()),
  findings: z.string().min(1).max(4000),
});

export const evaluateMission = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => EvalSchema.parse(raw))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) return { score: 0, feedback: "Mentor not configured." };
    const system =
      "You are a senior SOC lead grading a junior analyst. Return a JSON object with keys 'score' (0-100 integer) and 'feedback' (<= 180 words). No prose outside the JSON.";
    const user = `Scenario:\n${data.scenario}\n\nSuccess criteria:\n- ${data.successCriteria.join("\n- ")}\n\nAnalyst findings:\n${data.findings}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
      }),
    });
    if (!res.ok) return { score: 0, feedback: `Evaluator error (${res.status}).` };
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const raw = json.choices?.[0]?.message?.content ?? "{}";
    try {
      const parsed = JSON.parse(raw) as { score?: number; feedback?: string };
      return {
        score: Math.max(0, Math.min(100, Math.round(parsed.score ?? 0))),
        feedback: parsed.feedback ?? "No feedback.",
      };
    } catch {
      return { score: 0, feedback: raw.slice(0, 400) };
    }
  });
