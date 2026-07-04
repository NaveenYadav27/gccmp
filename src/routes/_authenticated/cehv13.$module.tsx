import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Wrench, Target } from "lucide-react";
import { CEHV13_MODULES, getCehModule } from "@/content/cehv13";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
      <Button asChild variant="link"><Link to="/cehv13">← Back to CEHv13</Link></Button>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Button className="mt-4" onClick={reset}>Retry</Button>
    </div>
  ),
  component: CehModulePage,
});

function CehModulePage() {
  const { mod } = Route.useLoaderData() as { mod: (typeof CEHV13_MODULES)[number] };
  const idx = CEHV13_MODULES.findIndex((m) => m.slug === mod.slug);
  const prev = idx > 0 ? CEHV13_MODULES[idx - 1] : undefined;
  const next = idx < CEHV13_MODULES.length - 1 ? CEHV13_MODULES[idx + 1] : undefined;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 md:px-8">
      <Link to="/cehv13" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> CEHv13
      </Link>

      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-cyber/50 text-cyber">Module {String(mod.number).padStart(2, "0")}</Badge>
          <Badge variant="outline">{mod.domain}</Badge>
          <span className="text-xs text-muted-foreground">{mod.duration}</span>
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
              <span className="mt-0.5 font-mono text-[10px] text-cyber">{String(i + 1).padStart(2, "0")}</span>
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
              <Badge key={t} variant="outline" className="border-border/60 font-mono text-[10px]">{t}</Badge>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            <Target className="h-4 w-4 text-cyber" /> MITRE ATT&CK
          </div>
          <div className="flex flex-wrap gap-2">
            {mod.mitre.map((t) => (
              <Badge key={t} variant="outline" className="border-border/60">{t}</Badge>
            ))}
          </div>
        </section>
      </div>

      <nav className="flex items-center justify-between border-t border-border/60 pt-4">
        {prev ? (
          <Button asChild variant="ghost" size="sm">
            <Link to="/cehv13/$module" params={{ module: prev.slug }}>
              <ArrowLeft className="mr-1 h-4 w-4" /> {prev.title}
            </Link>
          </Button>
        ) : <span />}
        {next ? (
          <Button asChild size="sm">
            <Link to="/cehv13/$module" params={{ module: next.slug }}>
              {next.title} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        ) : <span />}
      </nav>
    </div>
  );
}
