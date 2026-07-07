import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertTriangle, Building2, CheckCircle2, Send, Trophy } from "lucide-react";
import { todaysMission } from "@/content/daily-missions";
import { evaluateMission } from "@/lib/ai-mentor.functions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { awardXp } from "@/lib/xp";

export const Route = createFileRoute("/_authenticated/daily")({
  head: () => ({ meta: [{ title: "Daily Enterprise Mission · Cybersec Masters" }] }),
  component: DailyPage,
});

const SEV_COLOR: Record<string, string> = {
  low: "bg-cyber/20 text-cyber",
  medium: "bg-warning/20 text-warning",
  high: "bg-orange-500/20 text-orange-400",
  critical: "bg-danger/20 text-danger",
};

function DailyPage() {
  const mission = todaysMission();
  const evalFn = useServerFn(evaluateMission);
  const qc = useQueryClient();
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [findings, setFindings] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);

  async function submit() {
    if (!findings.trim() || busy) return;
    setBusy(true);
    try {
      const r = await evalFn({
        data: {
          missionId: mission.id,
          scenario: mission.scenario,
          successCriteria: mission.successCriteria,
          findings,
        },
      });
      setResult(r);
      const { data: userRes } = await supabase.auth.getUser();
      if (userRes.user) {
        await supabase.from("daily_mission_attempts").insert({
          user_id: userRes.user.id,
          mission_id: mission.id,
          findings: { text: findings, checklist: done },
          score: r.score,
          ai_feedback: r.feedback,
        });
        await awardXp("daily_mission");
        qc.invalidateQueries({ queryKey: ["my-xp"] });
      }
      toast.success(`Graded ${r.score}/100`);
    } catch {
      toast.error("Could not reach the evaluator");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-8">
      <header className="glass-panel relative overflow-hidden rounded-2xl p-6">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-warning/10 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-warning/20 text-warning">
              <AlertTriangle className="mr-1 h-3 w-3" /> LIVE TICKET
            </Badge>
            <Badge className={SEV_COLOR[mission.severity]}>{mission.severity.toUpperCase()}</Badge>
            <Badge variant="outline">
              <Building2 className="mr-1 h-3 w-3" />
              {mission.bu}
            </Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">{mission.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mission.scenario}</p>
        </div>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="glass-panel p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-cyber">
            Objectives
          </div>
          <ul className="mt-3 space-y-2">
            {mission.objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Checkbox
                  checked={!!done[i]}
                  onCheckedChange={(v) => setDone((d) => ({ ...d, [i]: !!v }))}
                  className="mt-0.5"
                />
                <span className={done[i] ? "text-muted-foreground line-through" : ""}>{o}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="glass-panel p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-cyber">
            Dataset available
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Referenced dataset:{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
              {mission.datasetRef}
            </code>
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Explore it in the Labs page and copy relevant rows into your findings.
          </p>
          <div className="mt-4">
            <div className="text-xs font-semibold text-cyber">Skills exercised</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {mission.skills.map((s) => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-xs font-semibold text-warning">
              Reveal hint
            </summary>
            <p className="mt-1 text-xs text-muted-foreground">{mission.hint}</p>
          </details>
        </Card>
      </div>

      <Card className="glass-panel mt-6 p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.15em] text-cyber">
          Your findings report
        </div>
        <Textarea
          value={findings}
          onChange={(e) => setFindings(e.target.value)}
          placeholder="Root cause, evidence (Event IDs / IPs / process names), containment step, and stand-up summary…"
          className="mt-3 min-h-40 bg-surface-1 font-mono text-xs"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            AI-graded against senior SOC criteria.
          </span>
          <Button
            onClick={submit}
            disabled={busy || !findings.trim()}
            className="cyber-gradient text-cyber-foreground"
          >
            <Send className="mr-2 h-4 w-4" /> {busy ? "Grading…" : "Submit for AI review"}
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="glass-panel mt-4 border-cyber/40 p-5">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-cyber" />
            <div className="text-2xl font-bold">
              {result.score}
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
            <Badge className="ml-auto cyber-gradient text-cyber-foreground">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              +40 XP
            </Badge>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{result.feedback}</p>
        </Card>
      )}
    </div>
  );
}
