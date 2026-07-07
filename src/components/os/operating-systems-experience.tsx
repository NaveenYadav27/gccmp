import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Shield,
  Cpu,
  MemoryStick,
  HardDrive,
  Power,
  Wrench,
  AlertTriangle,
  FlaskConical,
  Network,
  Briefcase,
  Sparkles,
  Search,
  X,
  Play,
  Square,
  RotateCw,
  ChevronRight,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AiMentorDrawer } from "@/components/ai-mentor-drawer";
import {
  COMPANY,
  TWIN,
  CONCEPTS,
  PROCESSES,
  FILESYSTEMS,
  MEMORY,
  BOOT_STEPS,
  SERVICES,
  INCIDENT,
  LABS,
  GRAPH_NODES,
  GRAPH_EDGES,
  CAREERS,
  type TwinNode,
  type OsConcept,
  type Proc,
  type Fs,
  type Service,
  type Lab,
} from "@/content/os-experience";

const CTX =
  "Foundation · Operating Systems @ ShadowX Financial Corporation. Instruction is enterprise SOC-flavoured, referencing Windows AD, Linux servers, and SIEM telemetry.";

export function OperatingSystemsExperience() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-8">
      <Link
        to="/foundation"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Foundation
      </Link>

      <MissionBrief />

      <Section
        icon={Building2}
        eyebrow="Section 2"
        title="Enterprise Digital Twin"
        subtitle={`Every alert at ${COMPANY.name} starts on one of these systems. Click a node.`}
      >
        <DigitalTwin />
      </Section>

      <Section
        icon={Cpu}
        eyebrow="Section 3"
        title="Operating System Explorer"
        subtitle="Every concept an OS gives you — click to inspect."
      >
        <ConceptExplorer />
      </Section>

      <Section
        icon={Cpu}
        eyebrow="Section 4"
        title="Interactive Process Explorer"
        subtitle="Live view of an analyst's Windows 11 endpoint."
      >
        <ProcessExplorer />
      </Section>

      <Section
        icon={HardDrive}
        eyebrow="Section 5"
        title="Enterprise Filesystem"
        subtitle="Browse the filesystem shape of Windows, Linux, and macOS."
      >
        <FilesystemBrowser />
      </Section>

      <Section
        icon={MemoryStick}
        eyebrow="Section 6"
        title="Memory Visualizer"
        subtitle="How RAM is carved up per process — and where attackers hide."
      >
        <MemoryVisualizer />
      </Section>

      <Section
        icon={Power}
        eyebrow="Section 7"
        title="Boot Process Simulator"
        subtitle="From power-on to desktop, step-by-step."
      >
        <BootSimulator />
      </Section>

      <Section
        icon={Wrench}
        eyebrow="Section 8"
        title="Service Manager"
        subtitle="Start / stop / disable services and see the business impact."
      >
        <ServiceManager />
      </Section>

      <Section
        icon={AlertTriangle}
        eyebrow="Section 9"
        title="Enterprise Incident"
        subtitle="Live SIEM alert. Investigate and recommend action."
      >
        <IncidentInvestigation />
      </Section>

      <Section
        icon={FlaskConical}
        eyebrow="Section 10"
        title="Operating System Labs"
        subtitle="Ten hands-on missions modelled on real ShadowX tickets."
      >
        <LabsGrid />
      </Section>

      <Section
        icon={Sparkles}
        eyebrow="Section 11"
        title="AI Mentor"
        subtitle="Ask anything about the OS. Get an answer scoped to a SOC L1, sysadmin, or interview."
      >
        <MentorPanel />
      </Section>

      <Section
        icon={Network}
        eyebrow="Section 12"
        title="Knowledge Graph"
        subtitle="How every OS concept connects. Hover a node."
      >
        <KnowledgeGraph />
      </Section>

      <Section
        icon={Briefcase}
        eyebrow="Section 13"
        title="Career Mapping"
        subtitle="Where operating-system knowledge shows up in eight roles you might grow into."
      >
        <CareerMap />
      </Section>
    </div>
  );
}

/* ------------------------------ shared ------------------------------ */

function Section({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <header className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl cyber-gradient shadow-glow">
          <Icon className="h-5 w-5 text-cyber-foreground" />
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyber">
            {eyebrow}
          </div>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

/* ------------------------------ 1 · Mission Brief ------------------------------ */

function MissionBrief() {
  return (
    <div className="glass-panel space-y-4 rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="border-cyber/50 text-cyber">
          <Shield className="mr-1 h-3 w-3" /> Day 1 · SOC L1
        </Badge>
        <span className="text-xs text-muted-foreground">Foundation · F05 · Operating Systems</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome to {COMPANY.name}</h1>
      <p className="text-sm leading-relaxed text-muted-foreground">
        You've just badged in as a SOC Analyst at {COMPANY.name} —{" "}
        {COMPANY.employees.toLocaleString()} employees, {COMPANY.countries} countries,{" "}
        {COMPANY.branches} branch offices, {COMPANY.units.length} business units. Every alert you'll
        investigate this year originates on an operating system: a Windows domain controller, a
        Linux trading server, an analyst's laptop, or a cloud node.
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          {
            t: "Why OS matters",
            d: "The OS is the security boundary attackers cross. Understanding it separates a triager from a hunter.",
          },
          {
            t: "Where alerts come from",
            d: "Sysmon on Windows, auditd on Linux, EDR on endpoints — every telemetry stream is an OS-level signal.",
          },
          {
            t: "What SOC does",
            d: "Read process trees, correlate events, decide contain-or-monitor. Nothing here is theoretical.",
          },
        ].map((c) => (
          <div key={c.t} className="rounded-xl border border-border/60 bg-background/40 p-4">
            <div className="text-xs font-semibold text-cyber">{c.t}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ 2 · Digital Twin ------------------------------ */

function DigitalTwin() {
  const [sel, setSel] = useState<TwinNode | null>(null);
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-5">
        {TWIN.map((n) => (
          <button
            key={n.id}
            onClick={() => setSel(n)}
            className="group rounded-xl border border-border/60 bg-background/40 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-cyber/60 hover:shadow-glow"
          >
            <div className="text-xs font-bold group-hover:text-cyber">{n.label}</div>
            <div className="mt-1 truncate text-[10px] text-muted-foreground">{n.os}</div>
          </button>
        ))}
      </div>
      <Dialog open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <DialogContent className="max-w-2xl">
          {sel && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-cyber" /> {sel.label}
                </DialogTitle>
                <DialogDescription>{sel.purpose}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Operating System" value={sel.os} />
                <Field label="Business Owner" value={sel.owner} />
                <ListField label="Installed Services" items={sel.services} />
                <ListField label="Running Processes" items={sel.processes} mono />
                <ListField label="Users" items={sel.users} />
                <ListField label="Security Controls" items={sel.controls} />
                <ListField label="Common Attacks" items={sel.attacks} tone="danger" />
                <ListField label="Monitoring" items={sel.monitoring} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-3">
      <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
function ListField({
  label,
  items,
  mono,
  tone,
}: {
  label: string;
  items: string[];
  mono?: boolean;
  tone?: "danger";
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-3">
      <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </div>
      <ul className="mt-1 space-y-0.5 text-xs">
        {items.length === 0 && <li className="text-muted-foreground">—</li>}
        {items.map((i) => (
          <li key={i} className={cn(mono && "font-mono", tone === "danger" && "text-destructive")}>
            • {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ 3 · Concepts ------------------------------ */

function ConceptExplorer() {
  const [sel, setSel] = useState<OsConcept>(CONCEPTS[0]);
  return (
    <div className="glass-panel grid gap-4 rounded-2xl p-4 md:grid-cols-[220px_1fr] md:p-6">
      <ScrollArea className="h-[380px] rounded-lg border border-border/60 bg-background/30 p-2">
        <div className="space-y-1">
          {CONCEPTS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSel(c)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition-colors",
                sel.id === c.id ? "bg-cyber/15 text-cyber" : "hover:bg-muted/50",
              )}
            >
              <span>{c.title}</span>
              <ChevronRight className="h-3 w-3 opacity-50" />
            </button>
          ))}
        </div>
      </ScrollArea>
      <div
        key={sel.id}
        className="animate-fade-in space-y-3 rounded-lg border border-border/60 bg-background/30 p-5"
      >
        <div className="text-xs font-medium uppercase tracking-[0.15em] text-cyber">
          {sel.title}
        </div>
        <div className="text-lg font-semibold">{sel.short}</div>
        <p className="text-sm text-muted-foreground">{sel.detail}</p>
        <div className="rounded-md border border-cyber/30 bg-cyber/5 p-3 text-xs">
          <span className="font-semibold text-cyber">At ShadowX: </span>
          {sel.enterprise}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ 4 · Process Explorer ------------------------------ */

function ProcessExplorer() {
  const [rows, setRows] = useState<Proc[]>(PROCESSES);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"cpu" | "mem" | "pid">("cpu");
  const [sel, setSel] = useState<Proc | null>(null);

  const view = useMemo(() => {
    let r = rows.filter((p) =>
      [p.name, String(p.pid), p.user, p.signed].some((s) =>
        s.toLowerCase().includes(q.toLowerCase()),
      ),
    );
    r = [...r].sort((a, b) =>
      sort === "pid"
        ? a.pid - b.pid
        : Number(b[sort as keyof Proc]) - Number(a[sort as keyof Proc]),
    );
    return r;
  }, [rows, q, sort]);

  function terminate(pid: number) {
    setRows((r) => r.filter((p) => p.pid !== pid && p.ppid !== pid));
    setSel(null);
  }

  return (
    <div className="glass-panel space-y-3 rounded-2xl p-4 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by name, PID, user, or signer…"
            className="pl-8"
          />
        </div>
        <Select value={sort} onValueChange={(v) => setSort(v as "cpu" | "mem" | "pid")}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cpu">Sort · CPU</SelectItem>
            <SelectItem value="mem">Sort · Memory</SelectItem>
            <SelectItem value="pid">Sort · PID</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={() => setRows(PROCESSES)}>
          Reset
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border border-border/60">
        <table className="w-full text-xs">
          <thead className="bg-muted/40 text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-2 text-left">PID</th>
              <th className="p-2 text-left">PPID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-right">CPU %</th>
              <th className="p-2 text-right">Mem MB</th>
              <th className="p-2 text-left">Signer</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2" />
            </tr>
          </thead>
          <tbody>
            {view.map((p) => (
              <tr
                key={p.pid}
                onClick={() => setSel(p)}
                className={cn(
                  "cursor-pointer border-t border-border/40 hover:bg-muted/30",
                  p.suspicious && "bg-destructive/5",
                )}
              >
                <td className="p-2 font-mono">{p.pid}</td>
                <td className="p-2 font-mono">{p.ppid}</td>
                <td className="p-2 font-mono">
                  {p.name}
                  {p.suspicious && <span className="ml-1 text-destructive">⚠</span>}
                </td>
                <td className="p-2">{p.user}</td>
                <td className="p-2 text-right font-mono">{p.cpu.toFixed(1)}</td>
                <td className="p-2 text-right font-mono">{p.mem}</td>
                <td className="p-2">{p.signed}</td>
                <td className="p-2">{p.status}</td>
                <td className="p-2 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      terminate(p.pid);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <DialogContent>
          {sel && (
            <>
              <DialogHeader>
                <DialogTitle className="font-mono">
                  {sel.name} · pid {sel.pid}
                </DialogTitle>
                <DialogDescription>
                  Parent PID {sel.ppid} · owned by {sel.user} · signed by {sel.signed}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 text-sm">
                <div>
                  CPU {sel.cpu}% · Mem {sel.mem} MB · {sel.status}
                </div>
                {sel.suspicious ? (
                  <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
                    <div className="font-semibold">Suspicious</div>
                    <div className="mt-1">{sel.suspicious}</div>
                  </div>
                ) : (
                  <div className="rounded-md border border-border/60 bg-muted/30 p-3 text-xs">
                    Normal parent chain. No unusual signer or path.
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="destructive" onClick={() => terminate(sel.pid)}>
                    <X className="mr-1 h-3 w-3" /> Terminate (simulated)
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ------------------------------ 5 · Filesystem ------------------------------ */

function FilesystemBrowser() {
  const [os, setOs] = useState<Fs>(FILESYSTEMS[0]);
  const [path, setPath] = useState<string>(FILESYSTEMS[0].root);
  const entries = os.tree[path] ?? [];

  function pick(newOs: Fs) {
    setOs(newOs);
    setPath(newOs.root);
  }

  return (
    <div className="glass-panel space-y-3 rounded-2xl p-4 md:p-6">
      <Tabs value={os.os} onValueChange={(v) => pick(FILESYSTEMS.find((f) => f.os === v)!)}>
        <TabsList>
          {FILESYSTEMS.map((f) => (
            <TabsTrigger key={f.os} value={f.os}>
              {f.os}
            </TabsTrigger>
          ))}
        </TabsList>
        {FILESYSTEMS.map((f) => (
          <TabsContent key={f.os} value={f.os} className="space-y-3">
            <div className="flex items-center gap-2 rounded-md border border-border/60 bg-background/40 px-3 py-2 font-mono text-xs">
              <HardDrive className="h-3 w-3 text-cyber" />
              <span>{path}</span>
              {path !== f.root && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-auto h-6"
                  onClick={() => setPath(f.root)}
                >
                  ← root
                </Button>
              )}
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {entries.map((e) => {
                const child =
                  e.kind === "dir"
                    ? `${path}${path.endsWith("/") || path.endsWith("\\") ? "" : os.os === "Windows" ? "\\" : "/"}${e.name}`
                    : null;
                const clickable = child && os.tree[child];
                return (
                  <button
                    key={e.name}
                    disabled={!clickable}
                    onClick={() => clickable && setPath(child!)}
                    className={cn(
                      "rounded-lg border border-border/60 bg-background/40 p-3 text-left transition-colors",
                      clickable && "hover:border-cyber/50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">
                        {e.kind === "dir" ? "📁" : "📄"} {e.name}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">{e.perm}</span>
                    </div>
                    <div className="mt-1 text-[10px] text-muted-foreground">owner: {e.owner}</div>
                    {e.note && <div className="mt-1 text-[10px] text-cyber">{e.note}</div>}
                  </button>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

/* ------------------------------ 6 · Memory ------------------------------ */

function MemoryVisualizer() {
  const [sel, setSel] = useState<string>(MEMORY[0].id);
  const active = MEMORY.find((m) => m.id === sel)!;
  const total = MEMORY.reduce((s, m) => s + m.size, 0);
  const colors: Record<string, string> = {
    kernel: "bg-destructive/70",
    cache: "bg-cyber/60",
    buffer: "bg-cyber/40",
    code: "bg-primary/70",
    heap: "bg-amber-500/70",
    stack: "bg-emerald-500/70",
    free: "bg-muted",
  };
  return (
    <div className="glass-panel space-y-3 rounded-2xl p-4 md:p-6">
      <div className="flex h-14 overflow-hidden rounded-lg border border-border/60">
        {MEMORY.map((m) => (
          <button
            key={m.id}
            onClick={() => setSel(m.id)}
            style={{ width: `${(m.size / total) * 100}%` }}
            className={cn(
              "group relative transition-all",
              colors[m.kind],
              sel === m.id && "ring-2 ring-cyber ring-offset-1 ring-offset-background",
            )}
            title={m.label}
          >
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-foreground/90 opacity-0 group-hover:opacity-100">
              {m.label}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {MEMORY.map((m) => (
          <button
            key={m.id}
            onClick={() => setSel(m.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-md border border-border/60 px-2 py-1 text-[10px]",
              sel === m.id && "border-cyber text-cyber",
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", colors[m.kind])} />
            {m.label}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-cyber/30 bg-cyber/5 p-4">
        <div className="text-sm font-semibold">{active.label}</div>
        <div className="mt-1 text-xs text-muted-foreground">{active.note}</div>
      </div>
    </div>
  );
}

/* ------------------------------ 7 · Boot ------------------------------ */

function BootSimulator() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const active = BOOT_STEPS[step];

  function play() {
    if (playing) return;
    setPlaying(true);
    setStep(0);
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i >= BOOT_STEPS.length) {
        clearInterval(t);
        setPlaying(false);
        return;
      }
      setStep(i);
    }, 900);
  }

  return (
    <div className="glass-panel space-y-4 rounded-2xl p-4 md:p-6">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={play} disabled={playing}>
          <Play className="mr-1 h-3 w-3" /> {playing ? "Booting…" : "Play boot"}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setStep(0)}>
          Reset
        </Button>
        <Progress value={((step + 1) / BOOT_STEPS.length) * 100} className="ml-2 flex-1" />
      </div>
      <div className="grid gap-2 md:grid-cols-4 lg:grid-cols-8">
        {BOOT_STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setStep(i)}
            className={cn(
              "rounded-lg border p-2 text-left text-[10px] transition-all",
              i <= step
                ? "border-cyber/60 bg-cyber/10 text-foreground"
                : "border-border/60 text-muted-foreground",
            )}
          >
            <div className="font-mono">{String(s.id).padStart(2, "0")}</div>
            <div className="mt-0.5 font-semibold">{s.label}</div>
          </button>
        ))}
      </div>
      <div
        key={active.id}
        className="animate-fade-in rounded-lg border border-border/60 bg-background/40 p-4"
      >
        <div className="text-sm font-semibold">{active.label}</div>
        <div className="mt-1 text-xs text-muted-foreground">{active.detail}</div>
        <div className="mt-2 rounded-md border border-cyber/30 bg-cyber/5 p-2 text-xs">
          <span className="font-semibold text-cyber">ShadowX: </span>
          {active.enterprise}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ 8 · Services ------------------------------ */

function ServiceManager() {
  const [rows, setRows] = useState<Service[]>(SERVICES);
  function set(id: string, patch: Partial<Service>) {
    setRows((r) => r.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }
  return (
    <div className="glass-panel space-y-3 rounded-2xl p-4 md:p-6">
      <div className="space-y-2">
        {rows.map((s) => (
          <div key={s.id} className="rounded-lg border border-border/60 bg-background/40 p-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="flex-1">
                <div className="text-sm font-semibold">{s.display}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{s.name}</div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  s.status === "Running"
                    ? "border-emerald-500/50 text-emerald-500"
                    : "border-muted text-muted-foreground",
                )}
              >
                {s.status}
              </Badge>
              <Select
                value={s.startup}
                onValueChange={(v) => set(s.id, { startup: v as Service["startup"] })}
              >
                <SelectTrigger className="w-full md:w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => set(s.id, { status: "Running" })}
                >
                  <Play className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => set(s.id, { status: "Stopped" })}
                >
                  <Square className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => set(s.id, { status: "Running" })}
                >
                  <RotateCw className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="mt-2 rounded-md border border-cyber/30 bg-cyber/5 p-2 text-xs">
              <span className="font-semibold text-cyber">Impact: </span>
              {s.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ 9 · Incident ------------------------------ */

function IncidentInvestigation() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const done = Object.keys(answers).length === INCIDENT.questions.length;
  const score = INCIDENT.questions.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);

  return (
    <div className="glass-panel space-y-4 rounded-2xl p-4 md:p-6">
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-destructive">
          SIEM Notable
        </div>
        <div className="mt-1 text-sm">{INCIDENT.alert}</div>
      </div>
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Investigation facts
        </div>
        <ul className="space-y-1.5 text-xs">
          {INCIDENT.facts.map((f, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono text-cyber">{String(i + 1).padStart(2, "0")}</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        {INCIDENT.questions.map((q, i) => (
          <div key={i} className="rounded-lg border border-border/60 bg-background/40 p-3">
            <div className="text-sm font-semibold">
              {i + 1}. {q.q}
            </div>
            <div className="mt-2 grid gap-1">
              {q.options.map((o, oi) => {
                const chosen = answers[i] === oi;
                const correct = q.answer === oi;
                const show = answers[i] !== undefined;
                return (
                  <button
                    key={oi}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-left text-xs transition-colors",
                      !show && "border-border/60 hover:border-cyber/50",
                      show && correct && "border-emerald-500/60 bg-emerald-500/10",
                      show && chosen && !correct && "border-destructive/60 bg-destructive/10",
                    )}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {answers[i] !== undefined && (
              <div className="mt-2 text-[11px] text-muted-foreground">{q.explain}</div>
            )}
          </div>
        ))}
      </div>
      {done && (
        <div className="rounded-lg border border-cyber/40 bg-cyber/5 p-4">
          <div className="text-sm font-semibold">
            Score: {score} / {INCIDENT.questions.length}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Recommended action</div>
          <div className="mt-1 text-sm">{INCIDENT.action}</div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ 10 · Labs ------------------------------ */

function LabsGrid() {
  const [sel, setSel] = useState<Lab | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {LABS.map((l) => (
          <button
            key={l.id}
            onClick={() => setSel(l)}
            className="group rounded-xl border border-border/60 bg-background/40 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-cyber/60"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-cyber">
                LAB {String(l.id).padStart(2, "0")}
              </span>
              {completed.has(l.id) && (
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-500">
                  Done
                </Badge>
              )}
            </div>
            <div className="mt-1 text-sm font-semibold group-hover:text-cyber">{l.title}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">{l.business}</div>
          </button>
        ))}
      </div>
      <Dialog open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <DialogContent className="max-w-3xl">
          {sel && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Lab {String(sel.id).padStart(2, "0")} · {sel.title}
                </DialogTitle>
                <DialogDescription>{sel.business}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh]">
                <div className="space-y-4 pr-3 text-sm">
                  <LabBlock title="Mission brief">{sel.story}</LabBlock>
                  <LabList title="Learning objectives" items={sel.objectives} />
                  <LabList title="Interactive steps" items={sel.steps} mono />
                  <LabBlock title="Expected output">{sel.expected}</LabBlock>
                  <LabList title="Hints" items={sel.hints} />
                  <LabList title="Evidence to collect" items={sel.evidence} />
                  <LabList title="Interview questions" items={sel.interview} />
                  <div>
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      Assessment
                    </div>
                    <div className="space-y-2">
                      {sel.assessment.map((a, i) => (
                        <AssessmentRow key={i} q={a.q} a={a.a} />
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setCompleted((s) => new Set(s).add(sel.id));
                      setSel(null);
                    }}
                    className="w-full"
                  >
                    Mark lab complete
                  </Button>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LabBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {title}
      </div>
      <div className="rounded-md border border-border/60 bg-background/40 p-3 text-xs">
        {children}
      </div>
    </div>
  );
}
function LabList({ title, items, mono }: { title: string; items: string[]; mono?: boolean }) {
  return (
    <div>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {title}
      </div>
      <ul className="space-y-1 rounded-md border border-border/60 bg-background/40 p-3 text-xs">
        {items.map((s, i) => (
          <li key={i} className={cn("flex gap-2", mono && "font-mono")}>
            <span className="text-cyber">›</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function AssessmentRow({ q, a }: { q: string; a: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-md border border-border/60 bg-background/40 p-3 text-xs">
      <div className="font-semibold">{q}</div>
      {show ? (
        <div className="mt-1 font-mono text-cyber">{a}</div>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          className="mt-1 h-6 px-2 text-[10px]"
          onClick={() => setShow(true)}
        >
          Reveal answer
        </Button>
      )}
    </div>
  );
}

/* ------------------------------ 11 · Mentor ------------------------------ */

function MentorPanel() {
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          Ask about processes, kernel mode, PIDs, memory, filesystems — or say "explain as SOC L1"
          or "for interview".
        </div>
        <AiMentorDrawer sessionContext={CTX} />
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {[
          "What is a process?",
          "Explain kernel mode.",
          "Why is this service suspicious?",
          "Explain PID.",
          "Explain memory.",
          "Explain filesystem.",
          "Explain as beginner.",
          "Explain as SOC L1.",
          "Explain for interview.",
        ].map((p) => (
          <div
            key={p}
            className="rounded-md border border-border/60 bg-background/40 p-2 text-xs text-muted-foreground"
          >
            💬 {p}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ 12 · Knowledge Graph ------------------------------ */

function KnowledgeGraph() {
  const [hover, setHover] = useState<string | null>(null);
  const nodeById = useMemo(() => Object.fromEntries(GRAPH_NODES.map((n) => [n.id, n])), []);
  const connected = new Set<string>();
  if (hover) {
    GRAPH_EDGES.forEach(([a, b]) => {
      if (a === hover) connected.add(b);
      if (b === hover) connected.add(a);
    });
  }
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg border border-border/60 bg-background/40">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {GRAPH_EDGES.map(([a, b], i) => {
            const na = nodeById[a],
              nb = nodeById[b];
            const active = hover && (a === hover || b === hover);
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke={active ? "hsl(var(--cyber))" : "hsl(var(--border))"}
                strokeWidth={active ? 0.4 : 0.15}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {GRAPH_NODES.map((n) => {
          const isHover = hover === n.id;
          const isConn = connected.has(n.id);
          return (
            <button
              key={n.id}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setHover(n.id)}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all",
                isHover
                  ? "border-cyber bg-cyber/20 text-cyber shadow-glow"
                  : isConn
                    ? "border-cyber/60 bg-cyber/10 text-foreground"
                    : "border-border/60 bg-background/70 text-muted-foreground",
              )}
            >
              {n.label}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Hover a concept to see how it wires into the rest of the operating system.
      </p>
    </div>
  );
}

/* ------------------------------ 13 · Careers ------------------------------ */

function CareerMap() {
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="grid gap-3 md:grid-cols-2">
        {CAREERS.map((c) => (
          <div key={c.role} className="rounded-lg border border-border/60 bg-background/40 p-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-cyber" />
              <div className="text-sm font-semibold">{c.role}</div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{c.use}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {c.tools.map((t) => (
                <Badge key={t} variant="outline" className="text-[10px]">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
