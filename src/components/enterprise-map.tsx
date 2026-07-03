import { useState } from "react";
import { NODES, EDGES, type EnterpriseNode } from "@/content/enterprise";
import { cn } from "@/lib/utils";

const LAYER_COLOR: Record<EnterpriseNode["layer"], string> = {
  user: "hsl(200 90% 60%)",
  endpoint: "hsl(200 90% 60%)",
  network: "hsl(190 80% 55%)",
  perimeter: "hsl(45 90% 55%)",
  app: "hsl(170 70% 55%)",
  data: "hsl(280 70% 65%)",
  identity: "hsl(320 70% 65%)",
  cloud: "hsl(220 80% 65%)",
  security: "hsl(0 75% 60%)",
  ops: "hsl(140 65% 55%)",
};

export function EnterpriseMap({ onSelect }: { onSelect: (n: EnterpriseNode) => void }) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <svg viewBox="0 0 100 100" className="h-[520px] w-full">
      <defs>
        <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M 5 0 L 0 0 0 5" fill="none" stroke="hsl(200 30% 20% / 0.35)" strokeWidth="0.15" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
      {EDGES.map((e, i) => {
        const a = NODES.find((n) => n.id === e.from);
        const b = NODES.find((n) => n.id === e.to);
        if (!a || !b) return null;
        const active = hover === a.id || hover === b.id;
        return (
          <g key={i}>
            <line
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={active ? "hsl(190 90% 60%)" : "hsl(200 30% 40% / 0.6)"}
              strokeWidth={active ? 0.4 : 0.2}
            />
            {e.label && active && (
              <text
                x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 0.6}
                fontSize="1.6" fill="hsl(190 90% 70%)" textAnchor="middle"
              >
                {e.label}
              </text>
            )}
          </g>
        );
      })}
      {NODES.map((n) => (
        <g
          key={n.id}
          onMouseEnter={() => setHover(n.id)}
          onMouseLeave={() => setHover(null)}
          onClick={() => onSelect(n)}
          className="cursor-pointer"
        >
          <circle
            cx={n.x} cy={n.y} r={hover === n.id ? 2.6 : 2}
            fill={LAYER_COLOR[n.layer]}
            opacity={0.85}
            stroke="hsl(220 40% 8%)" strokeWidth="0.3"
          />
          <text x={n.x} y={n.y + 4.5} fontSize="1.8" fill="hsl(210 20% 85%)" textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function EnterpriseLegend() {
  const layers = Array.from(new Set(NODES.map((n) => n.layer)));
  return (
    <div className="flex flex-wrap gap-2 text-[10px]">
      {layers.map((l) => (
        <div key={l} className={cn("flex items-center gap-1.5 rounded-md border border-border/50 bg-surface-1 px-2 py-1")}>
          <span className="h-2 w-2 rounded-full" style={{ background: LAYER_COLOR[l] }} />
          <span className="uppercase tracking-wider text-muted-foreground">{l}</span>
        </div>
      ))}
    </div>
  );
}
