import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { askMentor } from "@/lib/ai-mentor.functions";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

export function AiMentorDrawer({ sessionContext }: { sessionContext?: string }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"beginner" | "engineer" | "soc">("engineer");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const ask = useServerFn(askMentor);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || busy) return;
    const q = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    setBusy(true);
    try {
      const res = await ask({ data: { question: q, mode, sessionContext } });
      setMessages((m) => [...m, { role: "assistant", content: res.text }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Something went wrong reaching the mentor." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="cyber-gradient text-cyber-foreground shadow-glow hover:opacity-90">
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
          </SheetTitle>
          <SheetDescription className="text-xs">
            Explain concepts, generate notes, run through scenarios.
          </SheetDescription>
          <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)} className="pt-2">
            <TabsList className="grid w-full grid-cols-3 bg-surface-2">
              <TabsTrigger value="beginner" className="text-xs">Beginner</TabsTrigger>
              <TabsTrigger value="engineer" className="text-xs">Engineer</TabsTrigger>
              <TabsTrigger value="soc" className="text-xs">SOC</TabsTrigger>
            </TabsList>
          </Tabs>
        </SheetHeader>

        <ScrollArea className="flex-1 px-5 py-4">
          {messages.length === 0 ? (
            <div className="mt-8 space-y-4 text-center">
              <div className="cyber-gradient mx-auto flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow">
                <Sparkles className="h-6 w-6 text-cyber-foreground" />
              </div>
              <div>
                <div className="font-semibold">Ready to help.</div>
                <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
                  Try: "Explain the CIA triad", "Give me a mnemonic for OSI",
                  or paste an alert for triage.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                  <div className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                    m.role === "user" ? "bg-primary" : "cyber-gradient"
                  )}>
                    {m.role === "user" ? <User className="h-3.5 w-3.5 text-primary-foreground" /> : <Bot className="h-3.5 w-3.5 text-cyber-foreground" />}
                  </div>
                  <div className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border/60 bg-surface-1 text-foreground"
                  )}>
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
              placeholder="Ask anything about this session…"
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
