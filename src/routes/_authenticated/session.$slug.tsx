import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft, ArrowRight, Check, Clock, Target, Sparkles, BookOpen,
  Building2, ShieldAlert, Terminal, Zap, Trophy, MessageCircleQuestion,
  Briefcase, PlayCircle, CheckCircle2, XCircle,
} from "lucide-react";
import { getSession, MONTH_1, type Session } from "@/content/month1";
import { awardXp } from "@/lib/xp";
import { markSessionStarted, updateSessionProgress } from "@/lib/progress-hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/session/$slug")({
  loader: ({ params }) => {
    const s = getSession(params.slug);
    if (!s) throw notFound();
    return { session: s };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.session.title ?? "Mission"} — Cybersec Masters` }],
  }),
  component: SessionPage,
});

const SECTIONS = [
  { id: "brief", label: "Brief", icon: Target },
  { id: "objectives", label: "Objectives", icon: Check },
  { id: "story", label: "Story", icon: BookOpen },
  { id: "visual", label: "Visual", icon: Sparkles },
  { id: "enterprise", label: "Enterprise", icon: Building2 },
  { id: "concepts", label: "Concepts", icon: ShieldAlert },
  { id: "lab", label: "Guided Lab", icon: Terminal },
  { id: "challenge", label: "Challenge", icon: Zap },
  { id: "assessment", label: "Assessment", icon: Trophy },
  { id: "summary", label: "Summary", icon: CheckCircle2 },
  { id: "interview", label: "Interview", icon: MessageCircleQuestion },
  { id: "careers", label: "Careers", icon: Briefcase },
];

function SessionPage() {
  const { session } = Route.useLoaderData() as { session: Session };
  const qc = useQueryClient();
  const idx = MONTH_1.findIndex((s) => s.slug === session.slug);
  const prev = idx > 0 ? MONTH_1[idx - 1] : null;
  const next = idx < MONTH_1.length - 1 ? MONTH_1[idx + 1] : null;

  const [visited, setVisited] = useState<Set<string>>(new Set(["brief"]));
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    markSessionStarted(session.slug).then(() => qc.invalidateQueries({ queryKey: ["my-progress"] }));
  }, [session.slug, qc]);

  const pct = Math.round((visited.size / SECTIONS.length) * 100);

  useEffect(() => {
    updateSessionProgress(session.slug, pct);
  }, [pct, session.slug]);

  function markVisited(id: string) {
    setVisited((v) => (v.has(id) ? v : new Set(v).add(id)));
  }

  async function completeMission() {
    await updateSessionProgress(session.slug, 100);
    await awardXp("mission_complete");
    qc.invalidateQueries({ queryKey: ["my-progress"] });
    qc.invalidateQueries({ queryKey: ["my-xp"] });
    setCompleted(true);
    toast.success(`Mission ${String(session.number).padStart(2, "0")} cleared. +50 XP`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-xs">
        <Link to="/month/$number" params={{ number: "1" }} className="text-muted-foreground hover:text-cyber">
          Month 1 · Fundamentals
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-foreground">Mission {String(session.number).padStart(2, "0")}</span>
      </div>

      {/* Header */}
      <header className="glass-panel relative overflow-hidden rounded-2xl p-6 md:p-8">
        <div className="grid-bg absolute inset-0 opacity-15" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyber/15 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="cyber-gradient text-cyber-foreground">MISSION {String(session.number).padStart(2, "0")}</Badge>
            <Badge variant="outline" className="text-[10px]"><Clock className="mr-1 h-2.5 w-2.5" />{session.duration}</Badge>
            <Badge variant="outline" className="text-[10px]">Day {session.day}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{session.title}</h1>
          <p className="mt-2 text-base text-muted-foreground">{session.subtitle}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="w-48">
              <Progress value={pct} className="h-1.5" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">{pct}% surveyed</span>
          </div>
        </div>
      </header>

      {/* Section nav */}
      <nav className="scrollbar-none sticky top-14 z-20 -mx-4 mt-6 flex gap-1 overflow-x-auto border-b border-border/60 bg-background/80 px-4 py-2 backdrop-blur md:mx-0 md:rounded-xl md:border md:px-3">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => markVisited(s.id)}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
              visited.has(s.id) ? "text-cyber" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <s.icon className="h-3.5 w-3.5" />
            {s.label}
          </a>
        ))}
      </nav>

      {/* Sections */}
      <div className="mt-8 space-y-6">
        <Section id="brief" title="Mission Brief" icon={Target} onView={markVisited}>
          <p className="text-base leading-relaxed">{session.brief}</p>
        </Section>

        <Section id="objectives" title="Learning Objectives" icon={Check} onView={markVisited}>
          <ul className="grid gap-3 md:grid-cols-2">
            {session.objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-border/50 bg-surface-1 p-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-cyber/20 font-mono text-[10px] font-bold text-cyber">
                  {i + 1}
                </div>
                <span className="text-sm">{o}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="story" title="Why This Matters" icon={BookOpen} onView={markVisited}>
          <div className="rounded-lg border-l-4 border-cyber bg-surface-1 p-4">
            <p className="text-sm font-medium leading-relaxed text-foreground">{session.whyItMatters}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{session.story}</p>
        </Section>

        <Section id="visual" title={session.visual.title} icon={Sparkles} onView={markVisited}>
          <FlowVisual nodes={session.visual.nodes} layered={session.visual.kind === "layered"} />
        </Section>

        <Section id="enterprise" title="Enterprise Perspective" icon={Building2} onView={markVisited}>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { label: "Where it lives", text: session.enterprise.where },
              { label: "Business impact", text: session.enterprise.business },
              { label: "Attacker view", text: session.enterprise.attacker },
              { label: "Defender view", text: session.enterprise.defender },
            ].map((row) => (
              <div key={row.label} className="rounded-lg border border-border/50 bg-surface-1 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyber">{row.label}</div>
                <p className="mt-1.5 text-sm leading-relaxed">{row.text}</p>
              </div>
            ))}
            <div className="rounded-lg border border-danger/40 bg-danger/5 p-4 md:col-span-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-danger">Real incident</div>
              <p className="mt-1.5 text-sm leading-relaxed">{session.enterprise.incident}</p>
            </div>
          </div>
        </Section>

        <Section id="concepts" title="Core Concepts" icon={ShieldAlert} onView={markVisited}>
          <div className="grid gap-3 md:grid-cols-2">
            {session.concepts.map((c) => (
              <div key={c.term} className="group rounded-lg border border-border/50 bg-surface-1 p-4 transition-colors hover:border-cyber/40">
                <div className="font-mono text-sm font-bold text-cyber">{c.term}</div>
                <p className="mt-1 text-sm text-muted-foreground">{c.definition}</p>
                {c.example && <div className="mt-2 text-[11px] text-muted-foreground"><span className="font-semibold text-foreground">e.g.</span> {c.example}</div>}
              </div>
            ))}
          </div>
        </Section>

        <Section id="lab" title={`Guided Lab · ${session.guidedLab.title}`} icon={Terminal} onView={markVisited}>
          <p className="mb-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Goal:</span> {session.guidedLab.goal}
          </p>
          <ol className="space-y-3">
            {session.guidedLab.steps.map((step, i) => (
              <li key={i} className="rounded-lg border border-border/50 bg-surface-1 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md cyber-gradient font-mono text-[11px] font-bold text-cyber-foreground">
                    {i + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm">{step.instruction}</p>
                    {step.command && (
                      <pre className="overflow-x-auto rounded-md border border-border/60 bg-background p-3 font-mono text-xs text-cyan-glow">
                        <span className="mr-2 select-none text-muted-foreground">$</span>{step.command}
                      </pre>
                    )}
                    {step.expected && (
                      <div className="text-[11px] text-muted-foreground">
                        <span className="font-semibold text-cyber">Expected:</span> {step.expected}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="challenge" title={`Challenge · ${session.challenge.title}`} icon={Zap} onView={markVisited}>
          <div className="rounded-xl border border-warning/40 bg-warning/5 p-5">
            <p className="text-sm">{session.challenge.prompt}</p>
            <details className="mt-4">
              <summary className="cursor-pointer text-xs font-semibold text-warning hover:text-warning/80">Reveal hint</summary>
              <p className="mt-2 text-xs text-muted-foreground">{session.challenge.hint}</p>
            </details>
          </div>
        </Section>

        <QuizSection questions={session.assessment} slug={session.slug} onView={markVisited} />

        <Section id="summary" title="Mission Summary" icon={CheckCircle2} onView={markVisited}>
          <div className="rounded-lg border border-cyber/40 bg-cyber/5 p-5">
            <p className="text-sm leading-relaxed">{session.summary}</p>
          </div>
        </Section>

        <Section id="interview" title="Interview Questions" icon={MessageCircleQuestion} onView={markVisited}>
          <ul className="space-y-2">
            {session.interviewQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-border/50 bg-surface-1 p-3 text-sm">
                <span className="font-mono text-xs text-cyber">Q{i + 1}</span>
                {q}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="careers" title="Where This Skill Lands You" icon={Briefcase} onView={markVisited}>
          <div className="flex flex-wrap gap-2">
            {session.careers.map((c) => (
              <Badge key={c} variant="outline" className="border-cyber/40 text-cyber">{c}</Badge>
            ))}
          </div>
        </Section>

        {/* Complete + nav */}
        <div className="glass-panel flex flex-col gap-4 rounded-2xl p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-cyber">Ready?</div>
            <div className="mt-1 font-semibold">Mark this mission as cleared to advance your progress.</div>
          </div>
          <Button size="lg" onClick={completeMission} disabled={completed} className="cyber-gradient text-cyber-foreground shadow-glow hover:opacity-90">
            <Trophy className="mr-2 h-4 w-4" />
            {completed ? "Mission cleared" : "Complete mission"}
          </Button>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          {prev ? (
            <Button asChild variant="ghost">
              <Link to="/session/$slug" params={{ slug: prev.slug }}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Mission {String(prev.number).padStart(2, "0")}
              </Link>
            </Button>
          ) : <div />}
          {next ? (
            <Button asChild>
              <Link to="/session/$slug" params={{ slug: next.slug }}>
                Mission {String(next.number).padStart(2, "0")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link to="/month/$number" params={{ number: "1" }}>
                Back to Month 1
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  id, title, icon: Icon, onView, children,
}: {
  id: string; title: string; icon: React.ComponentType<{ className?: string }>;
  onView: (id: string) => void; children: React.ReactNode;
}) {
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) onView(id); });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [id, onView]);

  return (
    <section id={id} className="scroll-mt-32 animate-fade-in-up">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2">
          <Icon className="h-4 w-4 text-cyber" />
        </div>
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      </div>
      <Card className="glass-panel p-5 md:p-6">{children}</Card>
    </section>
  );
}

function FlowVisual({ nodes, layered }: { nodes: { id: string; label: string; caption?: string }[]; layered?: boolean }) {
  if (layered) {
    return (
      <div className="space-y-2">
        {nodes.map((n, i) => (
          <div
            key={n.id}
            className="flex items-center gap-4 rounded-lg border border-border/50 bg-gradient-to-r from-surface-1 to-surface-2 p-4"
            style={{ marginLeft: `${i * 4}px`, opacity: 1 - i * 0.02 }}
          >
            <div className="cyber-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold text-cyber-foreground">
              L{nodes.length - i}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{n.label}</div>
              {n.caption && <div className="text-xs text-muted-foreground">{n.caption}</div>}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {nodes.map((n, i) => (
        <div key={n.id} className="relative rounded-xl border border-border/50 bg-surface-1 p-4 transition-all hover:border-cyber/50 hover:shadow-glow">
          <div className="mb-2 flex items-center gap-2">
            <div className="cyber-gradient flex h-6 w-6 items-center justify-center rounded font-mono text-[10px] font-bold text-cyber-foreground">
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>
          <div className="font-semibold">{n.label}</div>
          {n.caption && <div className="mt-1 text-xs text-muted-foreground">{n.caption}</div>}
        </div>
      ))}
    </div>
  );
}

function QuizSection({
  questions, slug, onView,
}: { questions: import("@/content/month1").QuizQuestion[]; slug: string; onView: (id: string) => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = document.getElementById("assessment");
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) onView("assessment"); });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [onView]);

  const score = useMemo(
    () => questions.reduce((n, q, i) => n + (answers[i] === q.correct ? 1 : 0), 0),
    [answers, questions]
  );

  async function submit() {
    setSubmitted(true);
    const { supabase } = await import("@/integrations/supabase/client");
    const { data: userRes } = await supabase.auth.getUser();
    if (userRes.user) {
      await supabase.from("assessment_attempts").insert({
        user_id: userRes.user.id,
        session_slug: slug,
        score,
        total: questions.length,
        answers,
      });
    }
    if (score === questions.length) toast.success("Perfect score.");
    else toast.info(`${score}/${questions.length} correct — review the misses.`);
  }

  return (
    <section id="assessment" className="scroll-mt-32 animate-fade-in-up">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2">
          <Trophy className="h-4 w-4 text-cyber" />
        </div>
        <h2 className="text-lg font-bold tracking-tight">Assessment</h2>
        {submitted && (
          <Badge className="ml-2 cyber-gradient text-cyber-foreground">
            {score}/{questions.length}
          </Badge>
        )}
      </div>
      <Card className="glass-panel space-y-5 p-5 md:p-6">
        {questions.map((q, i) => (
          <div key={i} className="space-y-2">
            <div className="flex gap-2 text-sm font-medium">
              <span className="font-mono text-cyber">Q{i + 1}.</span>
              <span>{q.q}</span>
            </div>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const chosen = answers[i] === oi;
                const isCorrect = oi === q.correct;
                const wrong = submitted && chosen && !isCorrect;
                const right = submitted && isCorrect;
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
                      right && "border-success/60 bg-success/10",
                      wrong && "border-danger/60 bg-danger/10",
                      !submitted && chosen && "border-cyber/60 bg-cyber/10",
                      !submitted && !chosen && "border-border/50 bg-surface-1 hover:border-cyber/40",
                      submitted && !chosen && !isCorrect && "border-border/40 bg-surface-1/50 opacity-60"
                    )}
                  >
                    <div className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]",
                      right && "border-success bg-success/20 text-success",
                      wrong && "border-danger bg-danger/20 text-danger",
                      !submitted && "border-border"
                    )}>
                      {right ? <Check className="h-3 w-3" /> : wrong ? <XCircle className="h-3 w-3" /> : String.fromCharCode(65 + oi)}
                    </div>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="rounded-md border border-border/50 bg-surface-1 p-2 text-xs text-muted-foreground">
                <span className="font-semibold text-cyber">Why:</span> {q.explanation}
              </p>
            )}
          </div>
        ))}
        {!submitted ? (
          <Button
            onClick={submit}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full sm:w-auto"
          >
            <PlayCircle className="mr-2 h-4 w-4" /> Submit answers
          </Button>
        ) : (
          <Button onClick={() => { setAnswers({}); setSubmitted(false); }} variant="outline" className="w-full sm:w-auto">
            Retake
          </Button>
        )}
      </Card>
    </section>
  );
}
