import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Check, Lock, Circle, Code, Cpu, Database, Server } from "lucide-react";
import { OS_LEARNING_PATH } from "@/content/os";
import { useMyProgress } from "@/lib/progress-hooks";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/roadmap")({
  head: () => ({ meta: [{ title: "Enterprise Curriculum — Cybersec Masters" }] }),
  component: RoadmapPage,
});

const MODULE_ICONS: Record<number, any> = {
  0: Cpu,
  1: Server,
  2: Code,
  3: Database,
};

function RoadmapPage() {
  const { data: progress } = useMyProgress();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-8">
      <header className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">
          {OS_LEARNING_PATH.title}
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Enterprise OS Mastery.
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {OS_LEARNING_PATH.description}
        </p>
      </header>

      <div className="relative">
        {/* vertical rail */}
        <div className="absolute bottom-4 left-6 top-4 w-px bg-gradient-to-b from-cyber via-primary/40 to-transparent md:left-8" />

        <div className="space-y-6">
          {OS_LEARNING_PATH.modules.map((m, mIndex) => {
            const active = true; // All active for now, can implement locking logic later
            const pct = 0; // Replace with actual progress tracking
            const Icon = MODULE_ICONS[mIndex] || Cpu;

            return (
              <div key={m.id} className="relative pl-16 md:pl-20">
                <div
                  className={`absolute left-0 top-2 flex h-12 w-12 items-center justify-center rounded-xl font-mono text-sm font-bold md:h-14 md:w-14 ${active ? "cyber-gradient text-cyber-foreground shadow-glow" : "bg-surface-2 text-muted-foreground"}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`glass-panel rounded-2xl p-6 ${active ? "border-cyber/40" : ""}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        Module {mIndex + 1}
                      </div>
                      <h2 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">
                        {m.title}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">{m.learningObjects.length} Learning Objects</p>
                    </div>
                    <Badge
                      variant={active ? "default" : "outline"}
                      className={active ? "cyber-gradient text-cyber-foreground" : ""}
                    >
                      {active ? `${pct}% complete` : "Locked"}
                    </Badge>
                  </div>

                  {active && (
                    <div className="mt-5 grid gap-2 md:grid-cols-2">
                      {m.learningObjects.map((loId, i) => {
                        const done = false; // Progress map logic goes here
                        const inp = false;
                        
                        // Extract human-readable title from ID for now to avoid importing all 26 objects directly here
                        const loTitleRaw = loId.split(':').pop() || '';
                        const loTitle = loTitleRaw.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

                        return (
                          <Link
                            key={loId}
                            to="/session/$slug"
                            params={{ slug: loId }}
                            className="group flex items-center gap-3 rounded-lg border border-border/50 bg-surface-1 p-3 transition-colors hover:border-cyber/40 hover:bg-surface-2"
                          >
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${done ? "bg-success/20 text-success" : inp ? "bg-cyber/20 text-cyber" : "bg-surface-2 text-muted-foreground"}`}
                            >
                              {done ? (
                                <Check className="h-3.5 w-3.5" />
                              ) : (
                                <span>{String(i + 1).padStart(2, "0")}</span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-medium group-hover:text-cyber">
                                {loTitle}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                {loId}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
