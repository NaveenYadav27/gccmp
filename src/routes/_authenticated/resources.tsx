import { createFileRoute } from "@tanstack/react-router";
import { FileText, BookOpen, Terminal, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_authenticated/resources")({
  head: () => ({ meta: [{ title: "Resources — Cybersec Masters" }] }),
  component: ResourcesPage,
});

const GROUPS = [
  {
    title: "Cheat sheets",
    icon: Terminal,
    items: [
      "Linux investigation commands",
      "Windows Event ID reference",
      "TCP/IP quick reference",
      "AWS IAM policy patterns",
    ],
  },
  {
    title: "Reading",
    icon: BookOpen,
    items: [
      "NIST Cybersecurity Framework 2.0",
      "MITRE ATT&CK — enterprise matrix",
      "CIS Critical Security Controls v8",
      "Verizon DBIR (annual)",
    ],
  },
  {
    title: "Playbooks",
    icon: FileText,
    items: [
      "SOC L1 triage template",
      "Incident response checklist",
      "Phishing analysis workflow",
      "Malware sandbox pipeline",
    ],
  },
];

function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 md:px-8">
      <header>
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">Reference</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">Resources</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Cheat sheets, cornerstone reading, and repeatable playbooks.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-3">
        {GROUPS.map((g) => (
          <div key={g.title} className="glass-panel rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2">
                <g.icon className="h-4 w-4 text-cyber" />
              </div>
              <h2 className="font-bold">{g.title}</h2>
            </div>
            <ul className="space-y-2">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="flex items-center justify-between gap-2 rounded-md p-2 text-sm hover:bg-surface-1"
                >
                  <span>{it}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
