import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { FOUNDATION_TOPICS, getFoundationTopic } from "@/content/foundation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OperatingSystemsExperience } from "@/components/os/operating-systems-experience";
import { DigitalWorldExperience } from "@/components/foundation/digital-world-experience";

export const Route = createFileRoute("/_authenticated/foundation/$topic")({
  head: ({ params }) => {
    const t = params ? getFoundationTopic(params.topic) : undefined;
    return {
      meta: [
        { title: t ? `${t.title} — Foundation` : "Foundation topic" },
        { name: "description", content: t?.brief ?? "Foundation topic" },
      ],
    };
  },
  loader: ({ params }) => {
    const topic = getFoundationTopic(params.topic);
    if (!topic) throw notFound();
    return { topic };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Topic not found</h1>
      <Button asChild variant="link"><Link to="/foundation">← Back to Foundation</Link></Button>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Button className="mt-4" onClick={reset}>Retry</Button>
    </div>
  ),
  component: FoundationTopicPage,
});

function FoundationTopicPage() {
  const { topic } = Route.useLoaderData() as { topic: (typeof FOUNDATION_TOPICS)[number] };
  const idx = FOUNDATION_TOPICS.findIndex((t) => t.slug === topic.slug);
  const prev = idx > 0 ? FOUNDATION_TOPICS[idx - 1] : undefined;
  const next = idx < FOUNDATION_TOPICS.length - 1 ? FOUNDATION_TOPICS[idx + 1] : undefined;

  if (topic.slug === "operating-systems") return <OperatingSystemsExperience />;
  if (topic.slug === "digital-world") return <DigitalWorldExperience />;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 md:px-8">
      <Link to="/foundation" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Foundation
      </Link>

      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-cyber/50 text-cyber">F{String(topic.number).padStart(2, "0")}</Badge>
          <span className="text-xs text-muted-foreground">{topic.duration}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{topic.title}</h1>
        <p className="text-sm text-muted-foreground">{topic.subtitle}</p>
      </header>

      <div className="glass-panel rounded-2xl p-6">
        <p className="text-sm leading-relaxed text-foreground">{topic.brief}</p>
      </div>

      <section className="glass-panel rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-cyber" /> Learning objectives
        </div>
        <ul className="space-y-2 text-sm">
          {topic.objectives.map((o, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 font-mono text-[10px] text-cyber">{String(i + 1).padStart(2, "0")}</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-panel rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
          <Sparkles className="h-4 w-4 text-cyber" /> Key ideas
        </div>
        <div className="flex flex-wrap gap-2">
          {topic.keyIdeas.map((k) => (
            <Badge key={k} variant="outline" className="border-border/60">{k}</Badge>
          ))}
        </div>
      </section>

      <nav className="flex items-center justify-between border-t border-border/60 pt-4">
        {prev ? (
          <Button asChild variant="ghost" size="sm">
            <Link to="/foundation/$topic" params={{ topic: prev.slug }}>
              <ArrowLeft className="mr-1 h-4 w-4" /> {prev.title}
            </Link>
          </Button>
        ) : <span />}
        {next ? (
          <Button asChild size="sm">
            <Link to="/foundation/$topic" params={{ topic: next.slug }}>
              {next.title} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        ) : <span />}
      </nav>
    </div>
  );
}
