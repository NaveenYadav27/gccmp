import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  TrendingUp,
  ClipboardCheck,
  AlertTriangle,
  Building,
  ChevronDown,
  ChevronRight,
  Download,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMyRoles } from "@/lib/progress-hooks";
import { MONTH_1 } from "@/content/month1";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/instructor")({
  head: () => ({ meta: [{ title: "Instructor Portal — Cybersec Masters" }] }),
  component: InstructorPage,
});

function InstructorPage() {
  const { data: roles } = useMyRoles();
  const isStaff = roles?.includes("instructor") || roles?.includes("admin");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const { data: students } = useQuery({
    queryKey: ["instructor-students"],
    enabled: !!isStaff,
    queryFn: async () => {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id,display_name,cohort,streak_days,created_at,company");
      const { data: progress } = await supabase
        .from("user_progress")
        .select("user_id,session_slug,status,progress_pct");
      const total = MONTH_1.length;
      const byUser = new Map<string, { completed: number; inProgress: number }>();
      (progress ?? []).forEach((p) => {
        const cur = byUser.get(p.user_id) ?? { completed: 0, inProgress: 0 };
        if (p.status === "completed") cur.completed++;
        else if (p.status === "in_progress") cur.inProgress++;
        byUser.set(p.user_id, cur);
      });
      return (profiles ?? []).map((p) => {
        const stats = byUser.get(p.id) ?? { completed: 0, inProgress: 0 };
        return { ...p, ...stats, pct: Math.round((stats.completed / total) * 100) };
      });
    },
  });

  if (roles && !isStaff) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/20">
          <AlertTriangle className="h-7 w-7 text-warning" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Instructor access required</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The instructor portal is restricted to teaching staff. Ask an admin to grant you the
          instructor role.
        </p>
      </div>
    );
  }

  const totalStudents = students?.length ?? 0;
  const avgPct = totalStudents
    ? Math.round(students!.reduce((n, s) => n + s.pct, 0) / totalStudents)
    : 0;
  const atRisk = (students ?? []).filter((s) => s.pct < 25).length;

  // Group by company
  const byCompany = (students ?? []).reduce(
    (acc, s) => {
      const comp = s.company || "Independent";
      if (!acc[comp]) acc[comp] = [];
      acc[comp].push(s);
      return acc;
    },
    {} as Record<string, typeof students>,
  );

  const companyNames = Object.keys(byCompany).sort();

  const toggleCompany = (comp: string) => {
    setExpanded((prev) => ({ ...prev, [comp]: !prev[comp] }));
  };

  const exportCSV = () => {
    if (!students) return;
    const header = "Name,Company,Cohort,Streak,Completed,InProgress,PercentComplete\n";
    const rows = students
      .map((s) => {
        const name = s.display_name ? `"${s.display_name.replace(/"/g, '""')}"` : "Unnamed";
        const comp = s.company ? `"${s.company.replace(/"/g, '""')}"` : "Independent";
        return `${name},${comp},${s.cohort ?? ""},${s.streak_days ?? 0},${s.completed},${s.inProgress},${s.pct}`;
      })
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `cohort-progress-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">
            Instructor
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">Cohort console</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time student progress across Month 1.
          </p>
        </div>
        <Button
          onClick={exportCSV}
          variant="outline"
          className="border-cyber/30 text-cyber hover:bg-cyber/10 shrink-0"
        >
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat icon={Users} label="Students" value={String(totalStudents)} />
        <Stat icon={TrendingUp} label="Avg. Month 1" value={`${avgPct}%`} />
        <Stat
          icon={ClipboardCheck}
          label="At-risk (<25%)"
          value={String(atRisk)}
          accent={atRisk > 0}
        />
      </div>

      <div className="glass-panel overflow-hidden rounded-2xl">
        <div className="border-b border-border/60 px-5 py-4">
          <h2 className="font-bold flex items-center gap-2">
            <Building className="h-4 w-4 text-cyber" />
            Enterprise Groups
          </h2>
        </div>
        <div className="divide-y divide-border/60">
          {companyNames.map((comp) => {
            const compStudents = byCompany[comp];
            const compAvg = Math.round(
              compStudents.reduce((n, s) => n + s.pct, 0) / compStudents.length,
            );
            const isExpanded = expanded[comp] !== false; // expanded by default

            return (
              <div key={comp} className="flex flex-col">
                <button
                  onClick={() => toggleCompany(comp)}
                  className="flex items-center justify-between px-5 py-3 hover:bg-surface-1/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-semibold text-sm">{comp}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {compStudents.length} {compStudents.length === 1 ? "student" : "students"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="hidden sm:inline">Avg:</span>
                    <span className="font-semibold text-foreground">{compAvg}%</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="divide-y divide-border/30 bg-surface-1/20 pl-6 md:pl-10">
                    {compStudents.map((s) => (
                      <div
                        key={s.id}
                        className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="truncate font-medium text-sm">
                              {s.display_name ?? "Unnamed"}
                            </div>
                            {s.pct < 25 && (
                              <Badge
                                variant="outline"
                                className="border-warning/50 text-warning text-[9px] px-1 py-0 h-4"
                              >
                                At risk
                              </Badge>
                            )}
                            {s.pct === 100 && (
                              <Badge className="bg-success/20 text-success text-[9px] px-1 py-0 h-4">
                                Complete
                              </Badge>
                            )}
                          </div>
                          <div className="mt-0.5 text-[11px] text-muted-foreground">
                            {s.cohort || "No cohort"} · streak {s.streak_days ?? 0}d
                          </div>
                        </div>
                        <div className="hidden w-32 md:block">
                          <Progress value={s.pct} className="h-1" />
                        </div>
                        <div className="w-12 text-right font-mono text-xs font-semibold">
                          {s.pct}%
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {students && students.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">
              No students in this cohort yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </div>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent ? "bg-warning/20 text-warning" : "bg-surface-2 text-cyber"}`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 font-mono text-3xl font-bold">{value}</div>
    </div>
  );
}
