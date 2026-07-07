import { createFileRoute } from "@tanstack/react-router";
import { useMyProfile, useMyRoles, useMyProgress, summarizeMonth1 } from "@/lib/progress-hooks";
import { useMemo } from "react";
import { User, Mail, Shield, Flame, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Profile — Cybersec Masters" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { data: profile } = useMyProfile();
  const { data: roles } = useMyRoles();
  const { data: progress } = useMyProgress();
  const summary = useMemo(() => summarizeMonth1(progress), [progress]);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 md:px-8">
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-start gap-5">
          <div className="cyber-gradient flex h-16 w-16 items-center justify-center rounded-2xl shadow-glow">
            <User className="h-8 w-8 text-cyber-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {profile?.display_name ?? "Analyst"}
            </h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" /> {profile?.email}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline">{profile?.cohort ?? "Cohort 2026"}</Badge>
              {(roles ?? []).map((r) => (
                <Badge key={r} className="cyber-gradient text-cyber-foreground capitalize">
                  {r}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat icon={Trophy} label="Missions cleared" value={String(summary.completed)} />
        <Stat icon={Flame} label="Streak" value={`${profile?.streak_days ?? 0}d`} />
        <Stat icon={Shield} label="Month 1" value={`${summary.pct}%`} />
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-cyber">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 font-mono text-3xl font-bold">{value}</div>
    </div>
  );
}
