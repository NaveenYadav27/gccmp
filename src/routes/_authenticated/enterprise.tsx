import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Users, MapPin, Server, ShieldAlert } from "lucide-react";
import { EnterpriseMap, EnterpriseLegend } from "@/components/enterprise-map";
import { ORG, NODES, type EnterpriseNode } from "@/content/enterprise";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/enterprise")({
  head: () => ({ meta: [{ title: "Enterprise Map · Global Financial Corp" }] }),
  component: EnterprisePage,
});

function EnterprisePage() {
  const [selected, setSelected] = useState<EnterpriseNode | null>(null);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <header className="glass-panel relative overflow-hidden rounded-2xl p-6 md:p-8">
        <div className="grid-bg absolute inset-0 opacity-15" />
        <div className="relative">
          <Badge className="cyber-gradient text-cyber-foreground">ENTERPRISE UNIVERSE</Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{ORG.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Every mission you run happens inside this fictional bank. Click any node to see how it lives in the enterprise.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="flex items-center gap-1.5 rounded-md border border-border/50 bg-surface-1 px-2 py-1"><MapPin className="h-3 w-3 text-cyber" />HQ {ORG.hq}</span>
            <span className="flex items-center gap-1.5 rounded-md border border-border/50 bg-surface-1 px-2 py-1"><Users className="h-3 w-3 text-cyber" />{ORG.employees.toLocaleString()} employees</span>
            <span className="flex items-center gap-1.5 rounded-md border border-border/50 bg-surface-1 px-2 py-1"><Building2 className="h-3 w-3 text-cyber" />{ORG.sites.length} sites</span>
            <span className="flex items-center gap-1.5 rounded-md border border-border/50 bg-surface-1 px-2 py-1"><Server className="h-3 w-3 text-cyber" />{NODES.length} core systems</span>
          </div>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="glass-panel p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">Infrastructure Topology</div>
            <EnterpriseLegend />
          </div>
          <EnterpriseMap onSelect={setSelected} />
        </Card>

        <div className="space-y-4">
          <Card className="glass-panel p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyber">Crown Jewels</div>
            <ul className="space-y-1.5 text-sm">
              {ORG.crownJewels.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <ShieldAlert className="h-3.5 w-3.5 text-warning" /> {c}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="glass-panel p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyber">Business Units</div>
            <div className="flex flex-wrap gap-1.5">
              {ORG.units.map((u) => <Badge key={u} variant="outline">{u}</Badge>)}
            </div>
          </Card>
          <Card className="glass-panel p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyber">Sites</div>
            <div className="flex flex-wrap gap-1.5">
              {ORG.sites.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
            </div>
          </Card>
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full border-l border-border/70 bg-background/95 backdrop-blur-xl sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.label}</SheetTitle>
                <SheetDescription className="text-xs uppercase tracking-wider">{selected.layer} layer</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4 text-sm">
                <p className="text-muted-foreground">{selected.description}</p>
                <Field label="Runs on" value={selected.runsOn} />
                <Field label="Business" value={selected.business} />
                <Field label="Attacker view" value={selected.attackerView} tone="danger" />
                <Field label="Defender view" value={selected.defenderView} tone="cyber" />
                {selected.concepts.length > 0 && (
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyber">Concepts</div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {selected.concepts.map((c) => <Badge key={c} variant="outline">{c}</Badge>)}
                    </div>
                  </div>
                )}
                {selected.relatedSlugs.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyber">Related missions</div>
                    {selected.relatedSlugs.map((s) => (
                      <Button key={s} asChild variant="outline" size="sm" className="w-full justify-start">
                        <Link to="/session/$slug" params={{ slug: s }}>Open · {s}</Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Field({ label, value, tone }: { label: string; value: string; tone?: "cyber" | "danger" }) {
  return (
    <div className={`rounded-lg border p-3 ${tone === "danger" ? "border-danger/40 bg-danger/5" : tone === "cyber" ? "border-cyber/40 bg-cyber/5" : "border-border/50 bg-surface-1"}`}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyber">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
