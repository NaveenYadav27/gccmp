import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ArrowRight } from "lucide-react";
import { FOUNDATION_TOPICS } from "@/content/foundation";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/foundation/")({
  head: () => ({
    meta: [
      { title: "Foundation — Cybersec Masters" },
      {
        name: "description",
        content:
          "Foundation curriculum: 12 topics from the digital world to the ethical hacking lifecycle.",
      },
    ],
  }),
  component: FoundationIndex,
});

function FoundationIndex() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-8">
      <header>
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">
          Learn · Foundation
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
          Cybersecurity Foundation
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Twelve short topics that make the rest of the program click. Start at the top or jump to
          what you need.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FOUNDATION_TOPICS.map((t) => (
          <Link
            key={t.slug}
            to="/foundation/$topic"
            params={{ topic: t.slug }}
            className="glass-panel group relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-cyber/50"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl cyber-gradient shadow-glow">
                <BookOpen className="h-5 w-5 text-cyber-foreground" />
              </div>
              <Badge variant="outline" className="text-[10px]">
                F{String(t.number).padStart(2, "0")}
              </Badge>
            </div>
            <div className="font-bold leading-tight">{t.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{t.subtitle}</div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{t.duration}</span>
              <span className="flex items-center gap-1 font-medium text-cyber">
                Open{" "}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
