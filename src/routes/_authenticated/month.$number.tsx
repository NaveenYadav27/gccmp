import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Check, Clock, ArrowRight, PlayCircle } from "lucide-react";
import { MONTH_1 } from "@/content/month1";
import { useMyProgress, summarizeMonth1 } from "@/lib/progress-hooks";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/month/$number")({
  head: () => ({ meta: [{ title: "Month 1 · Fundamentals — Cybersec Masters" }] }),
  component: MonthPage,
});

function MonthPage() {
  const { number } = Route.useParams();
  const { data: progress } = useMyProgress();
  const summary = useMemo(() => summarizeMonth1(progress), [progress]);

  if (number !== "1") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Month {number} unlocks after Month 1</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Complete Month 1 to advance the roadmap.
        </p>
        <Button asChild className="mt-6">
          <Link to="/month/$number" params={{ number: "1" }}>
            Go to Month 1
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-8">
      <header className="glass-panel relative overflow-hidden rounded-2xl p-6 md:p-8">
        <div className="grid-bg absolute inset-0 opacity-20" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyber/15 blur-3xl" />
        <div className="relative">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">
            Month 01 · Day 1 → 30
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Fundamentals — <span className="cyber-text">Enterprise Fluency</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Before defending an enterprise, you must recognize one — the systems, the network paths,
            the user flows, the trust boundaries. Eight missions. Real labs. Interview-ready by Day
            30.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-40">
                <Progress value={summary.pct} className="h-2" />
              </div>
              <span className="font-mono text-sm font-semibold">{summary.pct}%</span>
            </div>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">
              {summary.completed} of {summary.total} missions complete
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {MONTH_1.map((s) => {
          const r = summary.map.get(s.slug);
          const done = r?.status === "completed";
          const inp = r?.status === "in_progress";
          return (
            <Link
              key={s.slug}
              to="/session/$slug"
              params={{ slug: s.slug }}
              className="group glass-panel relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-cyber/50"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${done ? "bg-success/20 text-success" : inp ? "cyber-gradient text-cyber-foreground shadow-glow" : "bg-surface-2 text-muted-foreground group-hover:text-cyber"}`}
                >
                  {done ? <Check className="h-5 w-5" /> : String(s.number).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">
                      Day {s.day}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      <Clock className="mr-1 h-2.5 w-2.5" />
                      {s.duration}
                    </Badge>
                    {done && (
                      <Badge className="bg-success/20 text-success text-[10px]">Cleared</Badge>
                    )}
                    {inp && (
                      <Badge className="cyber-gradient text-cyber-foreground text-[10px]">
                        In progress
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-2 font-bold leading-tight group-hover:text-cyber">{s.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{s.subtitle}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-cyber opacity-0 transition-opacity group-hover:opacity-100">
                    {inp ? (
                      <>
                        <PlayCircle className="h-3.5 w-3.5" /> Resume
                      </>
                    ) : (
                      <>
                        Enter mission <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
