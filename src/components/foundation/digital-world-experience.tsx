import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  AlertTriangle,
  Building2,
  Cpu,
  Database,
  Network,
  KeyRound,
  Zap,
  ChevronRight,
  CheckCircle2,
  XCircle,
  FlaskConical,
  Briefcase,
  MessageSquare,
  Sparkles,
  Clock,
  ShieldAlert,
  Radio,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AiMentorDrawer } from "@/components/ai-mentor-drawer";
import {
  COMPANY,
  PERSONA,
  MISSION,
  PILLARS,
  TX_HOPS,
  ROOT_CAUSE,
  REAL_INCIDENTS,
  QUIZ,
  LAB,
  INTERVIEW,
  CAREER,
  type TxHop,
} from "@/content/digital-world-experience";

const CTX = `Foundation · The Digital World @ ${COMPANY.name}. Student is ${PERSONA.role} (${PERSONA.empId}) on mission ${MISSION.ticket} — online banking outage across EMEA. Frame answers around the four pillars: compute, storage, network, identity.`;

const PILLAR_ICON: Record<string, typeof Cpu> = {
  compute: Cpu,
  storage: Database,
  network: Network,
  identity: KeyRound,
};
const PILLAR_COLOR: Record<string, string> = {
  compute: "text-blue-400 border-blue-500/40 bg-blue-500/10",
  storage: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  network: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  identity: "text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-500/10",
};

export function DigitalWorldExperience() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-8">
      <Link to="/foundation" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Foundation
      </Link>

      <MissionBrief />

      <Section eyebrow="Section 1" icon={Building2} title="Executive brief" subtitle="What just broke, and why the board cares.">
        <ExecBrief />
      </Section>

      <Section eyebrow="Section 2" icon={Zap} title="The four pillars of the digital world" subtitle="Every enterprise runs on these. Click any pillar.">
        <PillarExplorer />
      </Section>

      <Section eyebrow="Section 3" icon={Radio} title="Transaction tracer" subtitle="Walk the login request across the bank. Find the failing hop.">
        <TransactionTracer />
      </Section>

      <Section eyebrow="Section 4" icon={ShieldAlert} title="Attack surface — real incidents" subtitle="These are not textbook cases. They happened.">
        <RealIncidents />
      </Section>

      <Section eyebrow="Section 5" icon={FlaskConical} title="Enterprise lab" subtitle={LAB.title}>
        <LabPanel />
      </Section>

      <Section eyebrow="Section 6" icon={CheckCircle2} title="Knowledge check" subtitle="You don't leave the shift until you can answer these.">
        <Quiz />
      </Section>

      <Section eyebrow="Section 7" icon={MessageSquare} title="Interview prep" subtitle="How this topic shows up in interviews.">
        <InterviewPanel />
      </Section>

      <Section eyebrow="Section 8" icon={Briefcase} title="Career progression" subtitle="What this unlocks in your growth path.">
        <CareerPanel />
      </Section>

      <MissionComplete />

      <div className="fixed bottom-6 right-6 z-40">
        <AiMentorDrawer context={CTX} />
      </div>
    </div>
  );
}

/* ─────────────────────────── Shared shell ─────────────────────────── */

function Section({
  eyebrow,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  icon: typeof Cpu;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-panel rounded-2xl p-6 md:p-8">
      <header className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl cyber-gradient shadow-glow">
          <Icon className="h-5 w-5 text-cyber-foreground" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyber">{eyebrow}</div>
          <h2 className="mt-0.5 text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

/* ─────────────────────────── Mission brief ─────────────────────────── */

function MissionBrief() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-destructive/30 bg-gradient-to-br from-destructive/10 via-background to-background p-6 md:p-8">
      <div className="absolute right-6 top-6 hidden items-center gap-2 md:flex">
        <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-destructive">Live incident</span>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <Badge variant="outline" className="border-cyber/50 text-cyber">F01</Badge>
        <span>Foundation · The Digital World</span>
        <span>·</span>
        <span>{COMPANY.name}</span>
        <span>·</span>
        <span>{PERSONA.empId}</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{MISSION.headline}</h1>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
        <span className="font-mono text-destructive">{MISSION.ticket}</span> · {MISSION.severity} · opened {MISSION.opened}. {MISSION.callerImpact}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MISSION.businessImpact.map((b) => (
          <div key={b.label} className="rounded-xl border border-border/60 bg-surface-1 p-3">
            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{b.label}</div>
            <div className="mt-1 font-mono text-lg font-bold">{b.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border/60 bg-background/60 p-4 text-sm">
        <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-cyber">
          <AlertTriangle className="h-3.5 w-3.5" /> What we know so far
        </div>
        <p className="text-muted-foreground">{MISSION.soFar}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────── Executive brief ─────────────────────────── */

function ExecBrief() {
  const cards = [
    {
      audience: "Business",
      line: `${COMPANY.name} is a bank; a bank is a promise to move money on demand. Every minute customers can't log in, that promise breaks.`,
    },
    { audience: "Technical", line: "'Online banking' is a distributed system of ~6 layers. A failure at any one layer looks identical to the customer: 'the app is down'." },
    { audience: "SOC", line: "Availability failures and attacks share the same first 10 minutes. Triage the layer, then decide: outage or intrusion." },
    { audience: "Administrator", line: "The failing service isn't always the loudest. Start from the customer's request and walk downstream." },
    { audience: "Manager", line: "Business impact is measured in £/min and regulator clocks, not CPU %." },
    { audience: "AI mentor", line: "Ask me to explain any hop, any pillar, or any incident in beginner, technical, SOC, interview, or manager framing." },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <div key={c.audience} className="rounded-xl border border-border/60 bg-surface-1 p-4">
          <div className="text-[10px] uppercase tracking-[0.15em] text-cyber">{c.audience}</div>
          <p className="mt-2 text-sm text-foreground">{c.line}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── Pillar explorer ─────────────────────────── */

function PillarExplorer() {
  const [selected, setSelected] = useState<string>("identity");
  const p = PILLARS.find((x) => x.id === selected)!;
  const Icon = PILLAR_ICON[p.id];
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <div className="space-y-2">
        {PILLARS.map((pl) => {
          const PI = PILLAR_ICON[pl.id];
          const active = pl.id === selected;
          return (
            <button
              key={pl.id}
              onClick={() => setSelected(pl.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                active ? "border-cyber/60 bg-cyber/10 shadow-glow" : "border-border/60 bg-surface-1 hover:border-cyber/30",
              )}
            >
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg border", PILLAR_COLOR[pl.id])}>
                <PI className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold">{pl.name}</div>
                <div className="truncate text-xs text-muted-foreground">{pl.tag}</div>
              </div>
              <ChevronRight className={cn("h-4 w-4 transition-transform", active && "translate-x-0.5 text-cyber")} />
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-border/60 bg-background/60 p-5">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl border", PILLAR_COLOR[p.id])}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-lg font-bold">{p.name}</div>
            <div className="text-xs text-muted-foreground">{p.tag}</div>
          </div>
        </div>
        <p className="mt-4 text-sm">{p.desc}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-[0.15em] text-cyber">Real examples</div>
            <div className="flex flex-wrap gap-1.5">
              {p.examples.map((e) => (
                <Badge key={e} variant="outline" className="border-border/60 text-[11px]">{e}</Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-[0.15em] text-cyber">At {COMPANY.short}</div>
            <div className="rounded-md border border-border/60 bg-surface-1 p-2 font-mono text-[11px] text-muted-foreground">{p.gfs}</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-destructive">
            <ShieldAlert className="h-3 w-3" /> How attackers hit this pillar
          </div>
          <ul className="space-y-1 text-sm">
            {p.attack.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-destructive" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Transaction tracer ─────────────────────────── */

function TransactionTracer() {
  const [step, setStep] = useState(0);
  const [investigated, setInvestigated] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);

  const hop = TX_HOPS[step];
  const totalLatency = useMemo(() => TX_HOPS.slice(0, step + 1).reduce((s, h) => s + h.latencyMs, 0), [step]);
  const failingHop = TX_HOPS.find((h) => !h.ok);
  const allInvestigated = investigated.size >= TX_HOPS.length;

  function next() {
    setInvestigated((prev) => new Set(prev).add(hop.id));
    setStep((s) => Math.min(TX_HOPS.length - 1, s + 1));
  }
  function reset() {
    setStep(0);
    setInvestigated(new Set());
    setRevealed(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-cyber/50 text-cyber">
            Hop {step + 1} / {TX_HOPS.length}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> Cumulative latency: <span className="font-mono">{totalLatency}ms</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={reset}>Reset</Button>
          <Button size="sm" onClick={next} disabled={step === TX_HOPS.length - 1 && investigated.has(hop.id)}>
            Investigate hop {step + 1 < TX_HOPS.length ? step + 2 : ""} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Progress value={((step + 1) / TX_HOPS.length) * 100} className="h-1.5" />

      <div className="grid gap-2 lg:grid-cols-6">
        {TX_HOPS.map((h, i) => {
          const PI = PILLAR_ICON[h.pillar];
          const isCurrent = i === step;
          const wasVisited = investigated.has(h.id) || i < step;
          return (
            <button
              key={h.id}
              onClick={() => setStep(i)}
              className={cn(
                "flex flex-col items-start gap-1 rounded-lg border p-2 text-left transition-all",
                isCurrent && "border-cyber/60 bg-cyber/10 shadow-glow",
                !isCurrent && wasVisited && "border-border/60 bg-surface-1",
                !isCurrent && !wasVisited && "border-border/40 bg-background/40 opacity-70 hover:opacity-100",
              )}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">#{i + 1}</span>
                {wasVisited && (h.ok ? <CheckCircle2 className="h-3 w-3 text-emerald-400" /> : <XCircle className="h-3 w-3 text-destructive" />)}
              </div>
              <PI className="h-3.5 w-3.5 text-cyber" />
              <div className="text-[11px] font-medium leading-tight">{h.actor}</div>
            </button>
          );
        })}
      </div>

      <HopCard hop={hop} />

      {allInvestigated && (
        <div className="rounded-xl border border-cyber/40 bg-cyber/5 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-cyber">
            <Sparkles className="h-4 w-4" /> Trace complete — {investigated.size}/{TX_HOPS.length} hops inspected
          </div>
          <p className="mt-2 text-sm">
            Failing hop: <span className="font-mono text-destructive">{failingHop?.actor}</span> ·
            pillar: <span className="font-mono">{failingHop?.pillar}</span>
          </p>
          {!revealed ? (
            <Button className="mt-3" size="sm" onClick={() => setRevealed(true)}>Reveal root cause</Button>
          ) : (
            <div className="mt-3 space-y-2 rounded-lg border border-border/60 bg-background/60 p-3 text-sm">
              <div><span className="text-xs font-medium uppercase tracking-[0.15em] text-cyber">Finding · </span>{ROOT_CAUSE.finding}</div>
              <div><span className="text-xs font-medium uppercase tracking-[0.15em] text-cyber">Fix · </span>{ROOT_CAUSE.fix}</div>
              <div><span className="text-xs font-medium uppercase tracking-[0.15em] text-cyber">Lesson · </span>{ROOT_CAUSE.lesson}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HopCard({ hop }: { hop: TxHop }) {
  const PI = PILLAR_ICON[hop.pillar];
  return (
    <div className="rounded-xl border border-border/60 bg-background/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-cyber">{hop.layer}</div>
          <div className="mt-0.5 text-lg font-bold">{hop.actor}</div>
          <div className="mt-1 text-sm text-muted-foreground">{hop.action}</div>
        </div>
        <div className={cn("flex items-center gap-1 rounded-md border px-2 py-1", PILLAR_COLOR[hop.pillar])}>
          <PI className="h-3.5 w-3.5" />
          <span className="text-[11px] font-medium uppercase">{hop.pillar}</span>
        </div>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Stat label="Latency" value={`${hop.latencyMs}ms`} />
        <Stat label="Status" value={hop.ok ? "OK" : "FAILED"} tone={hop.ok ? "ok" : "err"} />
        <Stat label="Pillar" value={hop.pillar.toUpperCase()} />
      </div>
      <div className="mt-3 rounded-lg border border-border/60 bg-surface-1 p-3 text-xs">
        <div className="text-[10px] uppercase tracking-[0.15em] text-cyber">Telemetry</div>
        <div className="mt-1 font-mono">{hop.detail}</div>
      </div>
      <div className="mt-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-xs">
        <div className="text-[10px] uppercase tracking-[0.15em] text-destructive">If an attacker owned this hop</div>
        <div className="mt-1">{hop.attackIfLost}</div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "ok" | "err" }) {
  return (
    <div className="rounded-md border border-border/60 bg-surface-1 p-2">
      <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
      <div
        className={cn(
          "mt-0.5 font-mono text-sm font-bold",
          tone === "ok" && "text-emerald-400",
          tone === "err" && "text-destructive",
        )}
      >
        {value}
      </div>
    </div>
  );
}

/* ─────────────────────────── Real incidents ─────────────────────────── */

function RealIncidents() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {REAL_INCIDENTS.map((i) => {
        const PI = PILLAR_ICON[i.pillar];
        return (
          <div key={i.who} className="flex gap-3 rounded-xl border border-border/60 bg-surface-1 p-4">
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border", PILLAR_COLOR[i.pillar])}>
              <PI className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{i.year} · pillar: {i.pillar}</div>
              <div className="font-bold">{i.who}</div>
              <div className="mt-1 text-sm text-muted-foreground">{i.line}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────── Lab ─────────────────────────── */

function LabPanel() {
  const [summary, setSummary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const wordCount = summary.trim().split(/\s+/).filter(Boolean).length;
  const good = wordCount >= 20 && /identity|auth/i.test(summary);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-xl border border-border/60 bg-background/60 p-5">
        <div className="mb-2 flex items-center gap-2 text-xs">
          <Badge variant="outline" className="border-cyber/50 text-cyber">{LAB.id}</Badge>
          <span className="text-muted-foreground">Provider: {LAB.provider} · {LAB.duration}</span>
        </div>
        <div className="text-lg font-bold">{LAB.title}</div>
        <p className="mt-2 text-sm text-muted-foreground">{LAB.mission}</p>

        <div className="mt-4">
          <div className="mb-1 text-[10px] uppercase tracking-[0.15em] text-cyber">Evidence auto-captured</div>
          <ul className="space-y-1 text-sm">
            {LAB.evidenceCaptured.map((e) => (
              <li key={e} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-100/80">
          <span className="font-medium">Roadmap · </span>{LAB.proxmoxNote}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-background/60 p-5">
        <div className="text-sm font-bold">Deliverable · 3-line incident summary</div>
        <div className="mt-1 text-xs text-muted-foreground">Draft the ticket update Marcus will forward to the CIO.</div>
        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="At 08:14 GMT, online banking failed for EMEA customers because…"
          className="mt-3 min-h-32 font-mono text-xs"
        />
        <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{wordCount} words · aim for 20+</span>
          <span>{good ? "✓ mentions identity/auth" : "mention which pillar failed"}</span>
        </div>
        <Button className="mt-3 w-full" disabled={!good} onClick={() => setSubmitted(true)}>
          {submitted ? "Submitted for AI review ✓" : "Submit for AI review"}
        </Button>
        {submitted && (
          <div className="mt-3 rounded-lg border border-cyber/40 bg-cyber/5 p-3 text-xs">
            <span className="font-medium text-cyber">AI mentor · </span>
            Strong opening. Add £/min impact and mention that downstream systems (DB, mainframe) were healthy so leadership doesn't misdirect resources.
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────── Quiz ─────────────────────────── */

function Quiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const score = QUIZ.reduce((n, q) => {
    const chosen = q.options.find((o) => o.id === answers[q.id]);
    return chosen?.correct ? n + 1 : n;
  }, 0);
  const answered = Object.keys(answers).length;
  return (
    <div className="space-y-4">
      {QUIZ.map((q, qi) => (
        <div key={q.id} className="rounded-xl border border-border/60 bg-background/60 p-4">
          <div className="mb-3 text-sm font-medium">
            <span className="mr-2 font-mono text-xs text-cyber">Q{qi + 1}</span>
            {q.prompt}
          </div>
          <div className="grid gap-2">
            {q.options.map((o) => {
              const chosen = answers[q.id] === o.id;
              const anyAnswered = !!answers[q.id];
              return (
                <button
                  key={o.id}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                  className={cn(
                    "rounded-lg border p-3 text-left text-sm transition-colors",
                    !anyAnswered && "border-border/60 bg-surface-1 hover:border-cyber/40",
                    chosen && o.correct && "border-emerald-500/60 bg-emerald-500/10",
                    chosen && !o.correct && "border-destructive/60 bg-destructive/10",
                    !chosen && anyAnswered && "border-border/40 bg-surface-1/60 opacity-70",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span>{o.text}</span>
                    {chosen && (o.correct ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" /> : <XCircle className="h-4 w-4 shrink-0 text-destructive" />)}
                  </div>
                  {chosen && <div className="mt-2 text-xs text-muted-foreground">{o.why}</div>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface-1 p-3 text-sm">
        <span>Answered {answered}/{QUIZ.length}</span>
        <span className="font-mono">Score: {score}/{QUIZ.length}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────── Interview + Career ─────────────────────────── */

function InterviewPanel() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {INTERVIEW.map((q, i) => (
        <div key={q.q} className="rounded-xl border border-border/60 bg-background/60">
          <button
            className="flex w-full items-center justify-between p-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-medium">Q{i + 1}. {q.q}</span>
            <ChevronRight className={cn("h-4 w-4 transition-transform", open === i && "rotate-90 text-cyber")} />
          </button>
          {open === i && (
            <div className="border-t border-border/60 p-4 text-sm text-muted-foreground">{q.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function CareerPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-border/60 bg-background/60 p-4">
        <div className="text-[10px] uppercase tracking-[0.15em] text-cyber">Role progression</div>
        <div className="mt-1 font-bold">{CAREER.role}</div>
      </div>
      <div className="rounded-xl border border-border/60 bg-background/60 p-4">
        <div className="text-[10px] uppercase tracking-[0.15em] text-cyber">Skills unlocked</div>
        <ul className="mt-1 space-y-1 text-sm">
          {CAREER.skillsUnlocked.map((s) => (
            <li key={s} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-400" />{s}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border/60 bg-background/60 p-4">
        <div className="text-[10px] uppercase tracking-[0.15em] text-cyber">Next</div>
        <ul className="mt-1 space-y-1 text-sm">
          {CAREER.nextTopics.map((t) => (
            <li key={t} className="flex gap-2"><ChevronRight className="mt-0.5 h-3.5 w-3.5 text-cyber" />{t}</li>
          ))}
        </ul>
        <div className="mt-3 text-xs text-muted-foreground">{CAREER.cehLink}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Mission complete ─────────────────────────── */

function MissionComplete() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyber/40 bg-gradient-to-br from-cyber/15 via-background to-background p-6 md:p-8">
      <div className="flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-cyber" />
        <div className="text-xs uppercase tracking-[0.2em] text-cyber">Mission complete · F01</div>
      </div>
      <h2 className="mt-2 text-2xl font-bold">You mapped the digital world {COMPANY.short} runs on.</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Every future topic — Linux, Windows, networking, cryptography — is a deeper dive into one of the four pillars you just met. Marcus signed off on your shift note. Log into F02 when you're ready.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link to="/foundation/$topic" params={{ topic: "computer-fundamentals" }}>Next · F02 Computer Fundamentals <ChevronRight className="ml-1 h-4 w-4" /></Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link to="/foundation">Back to Foundation</Link>
        </Button>
      </div>
    </div>
  );
}
