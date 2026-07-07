import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Send, Bot, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { askMentor, type Persona, type Mode } from "@/lib/ai-mentor.functions";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const PERSONA_LABELS: Record<Persona, string> = {
  trainer: "Cyber Trainer",
  soc: "SOC Analyst",
  network: "Network Engineer",
  linux: "Linux Admin",
  windows: "Windows / AD",
  cloud: "Cloud Architect",
  ciso: "CISO",
  hiring: "Hiring Manager",
  interviewer: "Interviewer",
};

const QUICK: { mode: Mode; label: string }[] = [
  { mode: "explain", label: "Explain" },
  { mode: "simplify", label: "Simplify" },
  { mode: "deepdive", label: "Deep dive" },
  { mode: "enterprise", label: "Enterprise view" },
  { mode: "quiz", label: "Quiz me" },
  { mode: "flashcards", label: "Flashcards" },
  { mode: "commands", label: "Commands" },
  { mode: "interview", label: "Interview Qs" },
  { mode: "career", label: "Career" },
  { mode: "lab", label: "Lab help" },
];

export function AiMentorDrawer({ sessionContext }: { sessionContext?: string }) {
  const [open, setOpen] = useState(false);
  const [persona, setPersona] = useState<Persona>("trainer");
  const [mode, setMode] = useState<Mode>("explain");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const ask = useServerFn(askMentor);

  async function sendWith(question: string, forcedMode?: Mode) {
    if (!question.trim() || busy) return;
    const useMode = forcedMode ?? mode;
    setMessages((m) => [...m, { role: "user", content: question }]);
    setBusy(true);
    try {
      const res = await ask({ data: { question, persona, mode: useMode, sessionContext } });
      setMessages((m) => [...m, { role: "assistant", content: res.text }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went wrong reaching the mentor." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    await sendWith(q);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="cyber-gradient text-cyber-foreground shadow-glow hover:opacity-90"
        >
          <Sparkles className="mr-1.5 h-4 w-4" />
          AI Mentor
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 border-l border-border/70 bg-background/95 p-0 backdrop-blur-xl sm:max-w-md">
        <SheetHeader className="border-b border-border/60 p-5">
          <SheetTitle className="flex items-center gap-2 text-base">
            <div className="cyber-gradient flex h-8 w-8 items-center justify-center rounded-lg">
              <Bot className="h-4 w-4 text-cyber-foreground" />
            </div>
            Sentinel · AI Mentor
            <Badge variant="outline" className="ml-auto text-[10px]">
              {PERSONA_LABELS[persona]}
            </Badge>
          </SheetTitle>
          <SheetDescription className="text-xs">
            Multi-persona mentor inside Global Financial Corp.
          </SheetDescription>
          <div className="pt-2">
            <Select value={persona} onValueChange={(v) => setPersona(v as Persona)}>
              <SelectTrigger className="h-8 bg-surface-2 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(PERSONA_LABELS) as Persona[]).map((p) => (
                  <SelectItem key={p} value={p}>
                    {PERSONA_LABELS[p]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="scrollbar-none flex gap-1 overflow-x-auto pt-2">
            {QUICK.map((q) => (
              <button
                key={q.mode}
                onClick={() => setMode(q.mode)}
                className={cn(
                  "whitespace-nowrap rounded-md border px-2 py-1 text-[10px] font-medium transition-colors",
                  mode === q.mode
                    ? "border-cyber/60 bg-cyber/10 text-cyber"
                    : "border-border/50 bg-surface-1 text-muted-foreground hover:text-foreground",
                )}
              >
                {q.label}
              </button>
            ))}
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-5 py-4">
          {messages.length === 0 ? (
            <div className="mt-6 space-y-4 text-center">
              <div className="cyber-gradient mx-auto flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow">
                <Sparkles className="h-6 w-6 text-cyber-foreground" />
              </div>
              <div>
                <div className="font-semibold">Ready to help.</div>
                <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
                  Pick a persona + mode, then ask. Try "Kerberoasting in GFC" as CISO with
                  Enterprise view.
                </p>
              </div>
              <div className="mx-auto grid max-w-xs grid-cols-2 gap-2 pt-2">
                {[
                  "Explain the CIA triad",
                  "Give me 5 flashcards on DNS",
                  "Interview questions for SOC L1",
                  "How does Kerberos work in GFC?",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => sendWith(s)}
                    className="rounded-md border border-border/50 bg-surface-1 p-2 text-left text-[11px] hover:border-cyber/40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                      m.role === "user" ? "bg-primary" : "cyber-gradient",
                    )}
                  >
                    {m.role === "user" ? (
                      <User className="h-3.5 w-3.5 text-primary-foreground" />
                    ) : (
                      <Bot className="h-3.5 w-3.5 text-cyber-foreground" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-border/60 bg-surface-1 text-foreground",
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-cyber" />
                  Sentinel is thinking…
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <form onSubmit={send} className="border-t border-border/60 p-4">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask as ${PERSONA_LABELS[persona]}…`}
              className="min-h-[44px] resize-none bg-surface-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(e as unknown as React.FormEvent);
                }
              }}
            />
            <Button type="submit" size="icon" disabled={busy || !input.trim()} className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
