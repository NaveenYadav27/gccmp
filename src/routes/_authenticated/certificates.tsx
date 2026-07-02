import { createFileRoute } from "@tanstack/react-router";
import { Award, Lock } from "lucide-react";
import { useMyProgress, summarizeMonth1 } from "@/lib/progress-hooks";
import { useMemo } from "react";

export const Route = createFileRoute("/_authenticated/certificates")({
  head: () => ({ meta: [{ title: "Certificates — Cybersec Masters" }] }),
  component: CertificatesPage,
});

const CERTS = [
  { id: "m1", title: "Fundamentals — Enterprise Fluency", unlock: 100, month: 1 },
  { id: "m2", title: "SOC Analyst — Blue Team", unlock: 0, month: 2 },
  { id: "m3", title: "Ethical Hacking — Offensive Mindset", unlock: 0, month: 3 },
  { id: "m4", title: "VAPT & Real Projects", unlock: 0, month: 4 },
  { id: "cap", title: "Cybersec Masters — Program Complete", unlock: 0, month: 0 },
];

function CertificatesPage() {
  const { data: progress } = useMyProgress();
  const summary = useMemo(() => summarizeMonth1(progress), [progress]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 md:px-8">
      <header>
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">Recognition</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">Certificates</h1>
        <p className="mt-1 text-sm text-muted-foreground">Earned on completion. Verifiable on your profile.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {CERTS.map((c) => {
          const unlocked = c.month === 1 && summary.pct >= 100;
          return (
            <div key={c.id} className={`glass-panel rounded-2xl p-5 ${unlocked ? "border-cyber/40" : ""}`}>
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${unlocked ? "cyber-gradient text-cyber-foreground shadow-glow" : "bg-surface-2 text-muted-foreground"}`}>
                  {unlocked ? <Award className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                </div>
                {c.month > 0 && <span className="font-mono text-[10px] text-muted-foreground">MONTH {c.month}</span>}
              </div>
              <div className="font-bold">{c.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {unlocked ? "Ready to claim." : c.month === 1 ? `Complete Month 1 to unlock (${summary.pct}%)` : "Complete previous months to unlock"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
