import { createFileRoute } from "@tanstack/react-router";
import { CAREERS } from "@/content/careers";
import { SKILL_TREE } from "@/content/skill-tree";
import { useMyProgress } from "@/lib/progress-hooks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, GraduationCap, DollarSign } from "lucide-react";

export const Route = createFileRoute("/_authenticated/career")({
  head: () => ({ meta: [{ title: "Career Ladder · Cybersec Masters" }] }),
  component: CareerPage,
});

function CareerPage() {
  const { data: progress } = useMyProgress();
  const completed = new Set(
    (progress ?? []).filter((r) => r.status === "completed").map((r) => r.session_slug),
  );

  const unlockedSkills = new Set<string>();
  SKILL_TREE.forEach((s) => {
    const reqsMet = s.requires.every((r) => unlockedSkills.has(r));
    const anyProgress = s.sessionSlugs.some((slug) => completed.has(slug));
    if (reqsMet && (s.requires.length === 0 || anyProgress)) unlockedSkills.add(s.key);
  });

  const levels: Array<"entry" | "mid" | "senior"> = ["entry", "mid", "senior"];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
      <header className="glass-panel rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Briefcase className="h-5 w-5 text-cyber" />
          <div>
            <h1 className="text-2xl font-bold">Career Ladder</h1>
            <p className="text-sm text-muted-foreground">
              Roles unlock as you build skills. Each shows salary, certs, and gap analysis.
            </p>
          </div>
        </div>
      </header>

      <div className="mt-6 space-y-8">
        {levels.map((lvl) => (
          <div key={lvl}>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyber">
              {lvl}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {CAREERS.filter((c) => c.level === lvl).map((c) => {
                const have = c.requires.filter((r) => unlockedSkills.has(r)).length;
                const total = c.requires.length;
                const pct = total ? Math.round((have / total) * 100) : 0;
                const ready = pct === 100;
                return (
                  <Card key={c.key} className="glass-panel p-5">
                    <div className="flex items-center gap-2">
                      <div className="font-bold">{c.title}</div>
                      {ready && (
                        <Badge className="ml-auto cyber-gradient text-cyber-foreground">
                          Ready
                        </Badge>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <DollarSign className="h-3.5 w-3.5 text-cyber" /> {c.salary}
                    </div>
                    <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Readiness
                    </div>
                    <Progress value={pct} className="mt-1 h-1.5" />
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {have} / {total} skills
                    </div>
                    <div className="mt-3">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-cyber flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" /> Certs
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {c.certs.map((x) => (
                          <Badge key={x} variant="outline" className="text-[10px]">
                            {x}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Requires
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {c.requires.map((r) => (
                          <Badge
                            key={r}
                            variant="outline"
                            className={`text-[10px] ${unlockedSkills.has(r) ? "border-cyber/60 text-cyber" : "opacity-60"}`}
                          >
                            {r}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
