import { createFileRoute, Link } from "@tanstack/react-router";
import { SKILL_TREE } from "@/content/skill-tree";
import { useMyProgress } from "@/lib/progress-hooks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/skills")({
  head: () => ({ meta: [{ title: "Skill Tree · Cybersec Masters" }] }),
  component: SkillsPage,
});

function SkillsPage() {
  const { data: progress } = useMyProgress();
  const completed = new Set((progress ?? []).filter((r) => r.status === "completed").map((r) => r.session_slug));

  const unlockedKeys = new Set<string>();
  SKILL_TREE.forEach((s) => {
    const reqsMet = s.requires.every((r) => unlockedKeys.has(r));
    const anyProgress = s.sessionSlugs.some((slug) => completed.has(slug));
    if (reqsMet && (s.requires.length === 0 || anyProgress)) unlockedKeys.add(s.key);
  });

  const tiers = Array.from(new Set(SKILL_TREE.map((s) => s.tier))).sort((a, b) => a - b);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
      <header className="glass-panel rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-cyber" />
          <div>
            <h1 className="text-2xl font-bold">Skill Tree</h1>
            <p className="text-sm text-muted-foreground">Complete missions to unlock branches. Higher tiers open up specialist roles.</p>
          </div>
          <Badge className="ml-auto cyber-gradient text-cyber-foreground">{unlockedKeys.size}/{SKILL_TREE.length} unlocked</Badge>
        </div>
      </header>

      <div className="mt-6 space-y-6">
        {tiers.map((tier) => (
          <div key={tier}>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-border/50" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tier {tier}</span>
              <div className="h-px flex-1 bg-border/50" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SKILL_TREE.filter((s) => s.tier === tier).map((s) => {
                const unlocked = unlockedKeys.has(s.key);
                return (
                  <Card
                    key={s.key}
                    className={cn(
                      "glass-panel p-4 transition-all",
                      unlocked ? "border-cyber/40 shadow-glow" : "opacity-60",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {unlocked ? <Unlock className="h-4 w-4 text-cyber" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                      <div className="font-bold">{s.label}</div>
                    </div>
                    {s.requires.length > 0 && (
                      <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                        Requires: {s.requires.join(", ")}
                      </div>
                    )}
                    {s.careers.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {s.careers.map((c) => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}
                      </div>
                    )}
                    {unlocked && s.sessionSlugs[0] && (
                      <Link
                        to="/session/$slug" params={{ slug: s.sessionSlugs[0] }}
                        className="mt-3 inline-flex text-xs font-semibold text-cyber hover:underline"
                      >Practice →</Link>
                    )}
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
