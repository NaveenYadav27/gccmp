import { createFileRoute } from "@tanstack/react-router";
import { Terminal, Zap, Server, Network, Bug, Cloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/labs")({
  head: () => ({ meta: [{ title: "Virtual Labs — Cybersec Masters" }] }),
  component: LabsPage,
});

const LABS = [
  {
    icon: Terminal,
    name: "Linux Investigation",
    mission: "M1.5",
    ready: true,
    tag: "Foundational",
  },
  { icon: Network, name: "Packet Capture 101", mission: "M1.4", ready: true, tag: "Networking" },
  {
    icon: Server,
    name: "Windows Event Log Triage",
    mission: "M1.6",
    ready: true,
    tag: "Windows/AD",
  },
  { icon: Cloud, name: "S3 Misconfiguration Hunt", mission: "M1.7", ready: true, tag: "Cloud" },
  { icon: Bug, name: "Kerberoasting Simulation", mission: "M2", ready: false, tag: "Blue Team" },
  { icon: Zap, name: "Proxmox Cyber Range", mission: "M4", ready: false, tag: "Enterprise Range" },
];

function LabsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-8">
      <header>
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">Practice</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">Virtual labs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hands-on environments tied to each mission. Enterprise-shaped, not slide examples.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {LABS.map((l) => (
          <div
            key={l.name}
            className="glass-panel group relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-cyber/50"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl cyber-gradient shadow-glow">
                <l.icon className="h-5 w-5 text-cyber-foreground" />
              </div>
              <Badge variant="outline" className="text-[10px]">
                {l.mission}
              </Badge>
            </div>
            <div className="font-bold">{l.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{l.tag}</div>
            <div className="mt-4 text-xs font-medium text-cyber">
              {l.ready ? "Open in mission →" : "Unlocks with cohort progression"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
