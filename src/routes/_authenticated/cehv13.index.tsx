import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, ArrowRight } from "lucide-react";
import { CEHV13_MODULES } from "@/content/cehv13";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/cehv13/")({
  head: () => ({
    meta: [
      { title: "CEHv13 — Cybersec Masters" },
      {
        name: "description",
        content: "All 20 CEHv13 modules, from Introduction to Ethical Hacking to Cryptography.",
      },
    ],
  }),
  component: CehIndex,
});

function CehIndex() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-8">
      <header>
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">
          Learn · CEHv13
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
          Certified Ethical Hacker v13
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          The full 20-module CEHv13 map. Each module lists objectives, tools, and MITRE mapping —
          hands-on labs are wired in from the Cyber Range.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CEHV13_MODULES.map((m) => (
          <Link
            key={m.slug}
            to="/cehv13/$module"
            params={{ module: m.slug }}
            className="glass-panel group relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-cyber/50"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl cyber-gradient shadow-glow">
                <Shield className="h-5 w-5 text-cyber-foreground" />
              </div>
              <Badge variant="outline" className="text-[10px]">
                M{String(m.number).padStart(2, "0")}
              </Badge>
            </div>
            <div className="font-bold leading-tight">{m.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {m.domain} · {m.duration}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{m.tools[0]}</span>
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
