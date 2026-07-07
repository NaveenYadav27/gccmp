import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GRAPH_NODES, GRAPH_EDGES, type GraphNode } from "@/content/knowledge-graph";
import { useMyProgress } from "@/lib/progress-hooks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Network } from "lucide-react";

export const Route = createFileRoute("/_authenticated/graph")({
  head: () => ({ meta: [{ title: "Knowledge Graph · Cybersec Masters" }] }),
  component: GraphPage,
});

const DOMAIN_COLOR: Record<GraphNode["domain"], string> = {
  os: "hsl(200 90% 60%)",
  network: "hsl(190 80% 55%)",
  linux: "hsl(45 90% 55%)",
  windows: "hsl(220 80% 65%)",
  identity: "hsl(320 70% 65%)",
  cloud: "hsl(170 70% 55%)",
  security: "hsl(0 75% 60%)",
  soc: "hsl(140 65% 55%)",
};

// Deterministic layout — circular per-domain clusters.
function positionOf(idx: number, total: number) {
  const a = (idx / total) * Math.PI * 2;
  return { x: 50 + Math.cos(a) * 38, y: 50 + Math.sin(a) * 38 };
}

function GraphPage() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const { data: progress } = useMyProgress();
  const completed = new Set(
    (progress ?? []).filter((r) => r.status === "completed").map((r) => r.session_slug),
  );

  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    GRAPH_NODES.forEach((n, i) => map.set(n.id, positionOf(i, GRAPH_NODES.length)));
    return map;
  }, []);

  const filtered = q.trim()
    ? new Set(
        GRAPH_NODES.filter((n) => n.label.toLowerCase().includes(q.toLowerCase())).map((n) => n.id),
      )
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <header className="glass-panel rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Network className="h-5 w-5 text-cyber" />
          <div>
            <h1 className="text-2xl font-bold">Knowledge Graph</h1>
            <p className="text-sm text-muted-foreground">
              Every concept and how it connects. Completed missions light their concepts up.
            </p>
          </div>
          <Input
            placeholder="Search concept…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="ml-auto max-w-xs bg-surface-1"
          />
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="glass-panel p-4">
          <svg viewBox="0 0 100 100" className="h-[560px] w-full">
            {GRAPH_EDGES.map((e, i) => {
              const a = positions.get(e.from);
              const b = positions.get(e.to);
              if (!a || !b) return null;
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="hsl(200 30% 30% / 0.5)"
                  strokeWidth="0.15"
                />
              );
            })}
            {GRAPH_NODES.map((n) => {
              const p = positions.get(n.id)!;
              const isDone = n.sessionSlug ? completed.has(n.sessionSlug) : false;
              const dim = filtered && !filtered.has(n.id);
              return (
                <g
                  key={n.id}
                  onClick={() => setSelected(n)}
                  className="cursor-pointer"
                  opacity={dim ? 0.2 : 1}
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isDone ? 2.4 : 1.8}
                    fill={DOMAIN_COLOR[n.domain]}
                    stroke={isDone ? "hsl(190 90% 70%)" : "hsl(220 40% 8%)"}
                    strokeWidth={isDone ? 0.5 : 0.3}
                  />
                  <text
                    x={p.x}
                    y={p.y - 3}
                    fontSize="1.6"
                    fill="hsl(210 20% 85%)"
                    textAnchor="middle"
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </Card>

        <div className="space-y-4">
          <Card className="glass-panel p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-cyber">
              Legend
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {Object.entries(DOMAIN_COLOR).map(([d, c]) => (
                <div
                  key={d}
                  className="flex items-center gap-1.5 rounded-md border border-border/50 bg-surface-1 px-2 py-1 text-[10px]"
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: c }} />
                  <span className="uppercase tracking-wider text-muted-foreground">{d}</span>
                </div>
              ))}
            </div>
          </Card>
          {selected && (
            <Card className="glass-panel p-4">
              <Badge className="mb-2" variant="outline">
                {selected.domain}
              </Badge>
              <div className="text-lg font-bold">{selected.label}</div>
              <p className="mt-1 text-sm text-muted-foreground">{selected.summary}</p>
              {selected.sessionSlug && (
                <Button asChild size="sm" className="mt-3 w-full">
                  <Link to="/session/$slug" params={{ slug: selected.sessionSlug }}>
                    Open mission
                  </Link>
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
