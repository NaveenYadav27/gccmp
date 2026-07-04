import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Flame, Trophy, Target, PlayCircle, Sparkles, Calendar, TrendingUp, BookOpen } from "lucide-react";
import { MONTH_1, PROGRAM_MONTHS } from "@/content/month1";
import { useMyProfile, useMyProgress, summarizeMonth1 } from "@/lib/progress-hooks";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Mission Control — CyberOS Enterprise" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { data: profile } = useMyProfile();
  const { data: progress } = useMyProgress();
  const summary = useMemo(() => summarizeMonth1(progress), [progress]);

  // Find next session
  const next = MONTH_1.find((s) => {
    const r = summary.map.get(s.slug);
    return !r || r.status !== "completed";
  }) ?? MONTH_1[0];

  const recent = (progress ?? [])
    .slice()
    .sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8">
      {/* Welcome */}
      <div className="glass-panel relative overflow-hidden rounded-2xl p-6 md:p-8">
        <div className="grid-bg absolute inset-0 opacity-20" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">
              Mission Control · Cohort 2026 · Day {Math.max(1, Math.min(30, summary.completed * 4))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome back, <span className="cyber-text">{profile?.display_name ?? "analyst"}</span>.
            </h1>
            <p className="max-w-lg text-sm text-muted-foreground">
              You are {summary.pct}% through Month 1 — Fundamentals. Your next mission is ready.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg" className="cyber-gradient text-cyber-foreground shadow-glow hover:opacity-90">
              <Link to="/session/$slug" params={{ slug: next.slug }}>
                <PlayCircle className="mr-2 h-5 w-5" />
                Resume mission
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={Target} label="Month 1 progress" value={`${summary.pct}%`} sublabel={`${summary.completed}/${summary.total} missions`} />
        <StatCard icon={Flame} label="Streak" value={`${profile?.streak_days ?? 0} days`} sublabel="Keep the rhythm" accent />
        <StatCard icon={Trophy} label="Missions cleared" value={String(summary.completed)} sublabel="Foundations" />
        <StatCard icon={TrendingUp} label="In progress" value={String(summary.inProgress)} sublabel="Pick up where you left off" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Next mission */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Next mission</div>
                <h2 className="mt-1 text-xl font-bold tracking-tight">
                  Mission {String(next.number).padStart(2, "0")} · {next.title}
                </h2>
              </div>
              <Badge variant="outline" className="border-cyber/50 text-cyber">
                {next.duration}
              </Badge>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{next.brief}</p>
            <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {next.objectives.slice(0, 4).map((o, i) => (
                <div key={i} className="rounded-lg border border-border/60 bg-surface-1 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-cyber">Objective {i + 1}</div>
                  <div className="mt-1 text-xs leading-tight text-foreground">{o}</div>
                </div>
              ))}
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link to="/session/$slug" params={{ slug: next.slug }}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Enter mission
              </Link>
            </Button>
          </div>

          {/* Roadmap preview */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Program roadmap</div>
                <h2 className="mt-1 text-xl font-bold tracking-tight">120-day path</h2>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to="/roadmap">Full roadmap →</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {PROGRAM_MONTHS.map((m) => {
                const active = m.status === "active";
                const pct = active ? summary.pct : 0;
                return (
                  <div key={m.number} className={`flex items-center gap-4 rounded-xl border p-4 ${active ? "border-cyber/40 bg-cyber/5" : "border-border/50 bg-surface-1/50 opacity-70"}`}>
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${active ? "cyber-gradient text-cyber-foreground" : "bg-surface-2 text-muted-foreground"}`}>
                      M{m.number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="truncate font-semibold">{m.title}</div>
                        <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{m.days}</div>
                      </div>
                      <div className="truncate text-xs text-muted-foreground">{m.subtitle}</div>
                      {active && <Progress value={pct} className="mt-2 h-1" />}
                    </div>
                    {!active && <Badge variant="outline" className="text-[10px]">Locked</Badge>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyber" />
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Today's objective</div>
            </div>
            <div className="font-semibold leading-snug">{next.objectives[0]}</div>
            <p className="mt-2 text-xs text-muted-foreground">{next.whyItMatters}</p>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-cyber" />
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Recent activity</div>
            </div>
            {recent.length === 0 ? (
              <p className="text-xs text-muted-foreground">No activity yet. Start your first mission.</p>
            ) : (
              <ul className="space-y-3">
                {recent.map((r) => {
                  const s = MONTH_1.find((x) => x.slug === r.session_slug);
                  if (!s) return null;
                  return (
                    <li key={r.session_slug}>
                      <Link to="/session/$slug" params={{ slug: s.slug }} className="flex items-start gap-3 rounded-lg p-2 -mx-2 hover:bg-surface-1">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-2 text-[10px] font-bold">
                          M{String(s.number).padStart(2, "0")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{s.title}</div>
                          <div className="text-[11px] text-muted-foreground">
                            {r.status === "completed" ? "Completed" : `${r.progress_pct}% done`}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-cyber" />
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Program pillars</div>
            </div>
            <ul className="space-y-2 text-sm">
              {["Learning", "Practice", "Projects", "Consistency"].map((p, i) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-cyber">0{i + 1}</span>
                  <span className="font-medium">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sublabel: string;
  accent?: boolean;
}) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent ? "cyber-gradient text-cyber-foreground" : "bg-surface-2 text-cyber"}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 font-mono text-3xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sublabel}</div>
    </div>
  );
}
