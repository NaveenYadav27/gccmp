import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Wrench,
  Target,
  Award,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { CEHV13_MODULES, getCehModule } from "@/content/cehv13";
import { CEH_QUIZZES } from "@/content/cehv13-quizzes";
import { updateSessionProgress } from "@/lib/progress-hooks";
import { awardXp } from "@/lib/xp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/cehv13/$module")({
  head: ({ params }) => {
    const m = params ? getCehModule(params.module) : undefined;
    return {
      meta: [
        { title: m ? `${m.title} — CEHv13` : "CEHv13 module" },
        { name: "description", content: m?.brief ?? "CEHv13 module" },
      ],
    };
  },
  loader: ({ params }) => {
    const mod = getCehModule(params.module);
    if (!mod) throw notFound();
    return { mod };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Module not found</h1>
      <Button asChild variant="link">
        <Link to="/cehv13">← Back to CEHv13</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Button className="mt-4" onClick={reset}>
        Retry
      </Button>
    </div>
  ),
  component: CehModulePage,
});

function CehModulePage() {
  const { mod } = Route.useLoaderData() as { mod: (typeof CEHV13_MODULES)[number] };
  const qc = useQueryClient();

  const idx = CEHV13_MODULES.findIndex((m) => m.slug === mod.slug);
  const prev = idx > 0 ? CEHV13_MODULES[idx - 1] : undefined;
  const next = idx < CEHV13_MODULES.length - 1 ? CEHV13_MODULES[idx + 1] : undefined;

  const questions = CEH_QUIZZES[mod.slug] || [];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const correctCount = questions.reduce(
    (count, q, i) => count + (answers[i] === q.answer ? 1 : 0),
    0,
  );
  const allCorrect = correctCount === questions.length && questions.length > 0;

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }
    setSubmitted(true);
    if (allCorrect) {
      setCompleted(true);
      try {
        await updateSessionProgress(mod.slug, 100);
        await awardXp("quiz_perfect");
        qc.invalidateQueries({ queryKey: ["my-progress"] });
        qc.invalidateQueries({ queryKey: ["my-xp"] });
        toast.success("Module Completed! +20 XP Awarded.");
      } catch (err) {
        console.error("Error saving progress:", err);
      }
    } else {
      toast.error(`You scored ${correctCount}/${questions.length}. Retry to master this module!`);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setCompleted(false);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 md:px-8">
      <Link
        to="/cehv13"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> CEHv13
      </Link>

      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-cyber/50 text-cyber">
            Module {String(mod.number).padStart(2, "0")}
          </Badge>
          <Badge variant="outline">{mod.domain}</Badge>
          <span className="text-xs text-muted-foreground">{mod.duration}</span>
          {completed && (
            <Badge className="bg-success/20 text-success border-success/30 flex items-center gap-1">
              <Check className="h-3 w-3" /> MASTERED
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{mod.title}</h1>
      </header>

      <div className="glass-panel rounded-2xl p-6">
        <p className="text-sm leading-relaxed">{mod.brief}</p>
      </div>

      <section className="glass-panel rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-cyber" /> Objectives
        </div>
        <ul className="space-y-2 text-sm">
          {mod.objectives.map((o, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 font-mono text-[10px] text-cyber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="glass-panel rounded-2xl p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            <Wrench className="h-4 w-4 text-cyber" /> Tools
          </div>
          <div className="flex flex-wrap gap-2">
            {mod.tools.map((t) => (
              <Badge key={t} variant="outline" className="border-border/60 font-mono text-[10px]">
                {t}
              </Badge>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            <Target className="h-4 w-4 text-cyber" /> MITRE ATT&CK
          </div>
          <div className="flex flex-wrap gap-2">
            {mod.mitre.map((t) => (
              <Badge key={t} variant="outline" className="border-border/60">
                {t}
              </Badge>
            ))}
          </div>
        </section>
      </div>

      {/* Local assessment quiz check */}
      {questions.length > 0 && (
        <section className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <Award className="h-5 w-5 text-cyber animate-pulse-ring" />
            <div>
              <h3 className="font-bold text-sm">Module Knowledge Check</h3>
              <p className="text-[11px] text-muted-foreground">
                Complete the quiz with 100% score to master this module and earn XP.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q, qIdx) => {
              const selectedOption = answers[qIdx];
              const isSelected = selectedOption !== undefined;
              return (
                <div key={qIdx} className="space-y-3">
                  <div className="text-sm font-semibold flex items-start gap-2">
                    <span className="font-mono text-cyber text-xs mt-0.5">{qIdx + 1}.</span>
                    <span>{q.q}</span>
                  </div>
                  <div className="grid gap-2 pl-4">
                    {q.options.map((option, oIdx) => {
                      const isOptionSelected = selectedOption === oIdx;
                      const isCorrect = q.answer === oIdx;

                      let optionStyle = "border-border/60 hover:border-cyber/40";
                      if (submitted) {
                        if (isCorrect) {
                          optionStyle =
                            "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-semibold";
                        } else if (isOptionSelected) {
                          optionStyle = "border-destructive bg-destructive/10 text-destructive";
                        } else {
                          optionStyle = "border-border/40 opacity-60";
                        }
                      } else if (isOptionSelected) {
                        optionStyle = "border-cyber bg-cyber/5 text-cyber font-medium";
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelect(qIdx, oIdx)}
                          className={cn(
                            "w-full text-left text-xs rounded-xl border p-3 transition-all",
                            optionStyle,
                          )}
                          disabled={submitted}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {submitted && isCorrect && (
                              <Check className="h-3.5 w-3.5 text-emerald-500" />
                            )}
                            {submitted && isOptionSelected && !isCorrect && (
                              <X className="h-3.5 w-3.5 text-destructive" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <div className="mt-2 pl-4 text-xs text-muted-foreground bg-surface-1/40 p-2.5 rounded-lg border border-border/40 flex gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-cyber" />
                      <span>{q.explain}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-border/60">
            {submitted ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold">
                  Result:{" "}
                  <span className={cn(allCorrect ? "text-emerald-500" : "text-destructive")}>
                    {correctCount}/{questions.length} Correct
                  </span>
                </span>
                {!allCorrect && (
                  <Button size="sm" variant="outline" onClick={handleReset}>
                    Retry Quiz
                  </Button>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-muted-foreground">
                Select an option for each question to submit.
              </span>
            )}

            {!submitted && (
              <Button
                size="sm"
                className="cyber-gradient text-cyber-foreground"
                onClick={handleSubmit}
              >
                Submit Answers
              </Button>
            )}
          </div>
        </section>
      )}

      <nav className="flex items-center justify-between border-t border-border/60 pt-4">
        {prev ? (
          <Button asChild variant="ghost" size="sm">
            <Link to="/cehv13/$module" params={{ module: prev.slug }}>
              <ArrowLeft className="mr-1 h-4 w-4" /> {prev.title}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button asChild size="sm">
            <Link to="/cehv13/$module" params={{ module: next.slug }}>
              {next.title} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
