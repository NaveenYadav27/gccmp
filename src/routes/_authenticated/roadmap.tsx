import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Check, Lock, Circle } from "lucide-react";
import { MONTH_1, PROGRAM_MONTHS } from "@/content/month1";
import { useMyProgress, summarizeMonth1 } from "@/lib/progress-hooks";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/roadmap")({
  head: () => ({ meta: [{ title: "Program Roadmap — Cybersec Masters" }] }),
  component: RoadmapPage,
});

function RoadmapPage() {
  const { data: progress } = useMyProgress();
  const summary = useMemo(() => summarizeMonth1(progress), [progress]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-8">
      <header className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">120-day program</div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Four months. One transformation.</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A mission-driven path from enterprise fluency to interview-ready SOC analyst. Every month builds on the last.
        </p>
      </header>

      <div className="relative">
        {/* vertical rail */}
        <div className="absolute bottom-4 left-6 top-4 w-px bg-gradient-to-b from-cyber via-primary/40 to-transparent md:left-8" />

        <div className="space-y-6">
          {PROGRAM_MONTHS.map((m) => {
            const active = m.status === "active";
            const pct = active ? summary.pct : 0;
            return (
              <div key={m.number} className="relative pl-16 md:pl-20">
                <div className={`absolute left-0 top-2 flex h-12 w-12 items-center justify-center rounded-xl font-mono text-sm font-bold md:h-14 md:w-14 ${active ? "cyber-gradient text-cyber-foreground shadow-glow" : "bg-surface-2 text-muted-foreground"}`}>
                  M{m.number}
                </div>
                <div className={`glass-panel rounded-2xl p-6 ${active ? "border-cyber/40" : ""}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        {m.days}
                      </div>
                      <h2 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">{m.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{m.subtitle}</p>
                    </div>
                    <Badge variant={active ? "default" : "outline"} className={active ? "cyber-gradient text-cyber-foreground" : ""}>
                      {active ? `${pct}% complete` : "Locked"}
                    </Badge>
                  </div>

                  {active && (
                    <div className="mt-5 grid gap-2 md:grid-cols-2">
                      {MONTH_1.map((s) => {
                        const r = summary.map.get(s.slug);
                        const done = r?.status === "completed";
                        const inp = r?.status === "in_progress";
                        return (
                          <Link
                            key={s.slug}
                            to="/session/$slug"
                            params={{ slug: s.slug }}
                            className="group flex items-center gap-3 rounded-lg border border-border/50 bg-surface-1 p-3 transition-colors hover:border-cyber/40 hover:bg-surface-2"
                          >
                            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${done ? "bg-success/20 text-success" : inp ? "bg-cyber/20 text-cyber" : "bg-surface-2 text-muted-foreground"}`}>
                              {done ? <Check className="h-3.5 w-3.5" /> : <span>{String(s.number).padStart(2, "0")}</span>}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-medium group-hover:text-cyber">{s.title}</div>
                              <div className="text-[11px] text-muted-foreground">Day {s.day} · {s.duration}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {!active && (
                    <div className="mt-5 flex items-center gap-2 rounded-lg border border-border/40 bg-surface-1/50 p-4 text-xs text-muted-foreground">
                      <Lock className="h-3.5 w-3.5" />
                      Unlocks after Month {m.number - 1} · {m.sessionCount} missions
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* capstone */}
          <div className="relative pl-16 md:pl-20">
            <div className="absolute left-0 top-2 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 font-mono text-sm font-bold text-muted-foreground md:h-14 md:w-14">
              <Circle className="h-4 w-4" />
            </div>
            <div className="glass-panel rounded-2xl p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Day 121+</div>
              <h2 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">Interview & placement</h2>
              <p className="mt-1 text-sm text-muted-foreground">Mock interviews, portfolio polish, and referrals into partner SOCs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
