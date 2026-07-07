// Concept-level knowledge graph. Nodes = concepts, edges = "leads to" relationships.
export type GraphNode = {
  id: string;
  label: string;
  domain: "os" | "network" | "linux" | "windows" | "identity" | "cloud" | "security" | "soc";
  sessionSlug?: string;
  summary: string;
};

export type GraphEdge = { from: string; to: string };

export const GRAPH_NODES: GraphNode[] = [
  {
    id: "os",
    label: "Operating Systems",
    domain: "os",
    sessionSlug: "m1-bb1-os",
    summary: "Kernel, processes, memory — the stage every attack plays on.",
  },
  {
    id: "kernel",
    label: "Kernel Space",
    domain: "os",
    sessionSlug: "m1-bb1-os",
    summary: "Ring 0 execution, drivers, and memory management.",
  },
  {
    id: "process",
    label: "Processes & Memory",
    domain: "os",
    sessionSlug: "m1-bb1-os",
    summary: "Where malware lives at runtime.",
  },
  {
    id: "boot",
    label: "Boot Sequence",
    domain: "os",
    sessionSlug: "m1-bb1-os",
    summary: "UEFI, Bootloaders, and Init systems.",
  },
  {
    id: "filesystem",
    label: "Filesystem",
    domain: "os",
    summary: "Persistence and forensics start here.",
  },
  {
    id: "network",
    label: "Networking",
    domain: "network",
    sessionSlug: "m1-s04-networking",
    summary: "How packets move across GFC.",
  },
  {
    id: "osi",
    label: "OSI / TCP-IP",
    domain: "network",
    summary: "The mental model for every network conversation.",
  },
  {
    id: "dns",
    label: "DNS",
    domain: "network",
    summary: "Name resolution — and #1 exfil channel.",
  },
  { id: "tls", label: "TLS", domain: "network", summary: "Where trust becomes math." },
  { id: "firewall", label: "Firewall / IPS", domain: "network", summary: "Boundary enforcement." },
  {
    id: "linux",
    label: "Linux",
    domain: "linux",
    sessionSlug: "m1-s05-linux",
    summary: "The OS that runs the app tier.",
  },
  { id: "bash", label: "Shell & Scripting", domain: "linux", summary: "Automation and forensics." },
  {
    id: "windows",
    label: "Windows",
    domain: "windows",
    sessionSlug: "m1-s06-windows",
    summary: "The OS that runs the workforce.",
  },
  {
    id: "ad",
    label: "Active Directory",
    domain: "identity",
    summary: "GFC's identity ground truth.",
  },
  {
    id: "kerberos",
    label: "Kerberos",
    domain: "identity",
    summary: "The ticket system attackers love.",
  },
  { id: "mfa", label: "MFA / SSO", domain: "identity", summary: "Modern login." },
  {
    id: "cloud",
    label: "Cloud Fundamentals",
    domain: "cloud",
    sessionSlug: "m1-s07-cloud",
    summary: "Shared responsibility, IAM, buckets.",
  },
  { id: "iam", label: "IAM", domain: "cloud", summary: "Who can do what in the cloud." },
  { id: "s3", label: "Object Storage", domain: "cloud", summary: "Public buckets = breaches." },
  { id: "k8s", label: "Kubernetes", domain: "cloud", summary: "Where microservices live." },
  {
    id: "cia",
    label: "CIA Triad",
    domain: "security",
    sessionSlug: "m1-s01-cyber-landscape",
    summary: "Confidentiality, Integrity, Availability.",
  },
  { id: "risk", label: "Risk", domain: "security", summary: "Threat × Vulnerability × Impact." },
  {
    id: "mitre",
    label: "MITRE ATT&CK",
    domain: "security",
    summary: "Shared language of adversary behavior.",
  },
  {
    id: "siem",
    label: "SIEM",
    domain: "soc",
    sessionSlug: "m1-s08-checkpoint",
    summary: "Log aggregation + detection.",
  },
  { id: "soc", label: "SOC Operations", domain: "soc", summary: "The 24×7 defense room." },
  { id: "ir", label: "Incident Response", domain: "soc", summary: "PICERL — the playbook." },
  {
    id: "hunting",
    label: "Threat Hunting",
    domain: "soc",
    summary: "Assume breach, then prove it.",
  },
];

export const GRAPH_EDGES: GraphEdge[] = [
  { from: "os", to: "kernel" },
  { from: "kernel", to: "process" },
  { from: "os", to: "boot" },
  { from: "os", to: "filesystem" },
  { from: "os", to: "linux" },
  { from: "os", to: "windows" },
  { from: "network", to: "osi" },
  { from: "network", to: "dns" },
  { from: "network", to: "tls" },
  { from: "network", to: "firewall" },
  { from: "linux", to: "bash" },
  { from: "windows", to: "ad" },
  { from: "ad", to: "kerberos" },
  { from: "ad", to: "mfa" },
  { from: "cloud", to: "iam" },
  { from: "cloud", to: "s3" },
  { from: "cloud", to: "k8s" },
  { from: "cia", to: "risk" },
  { from: "risk", to: "mitre" },
  { from: "mitre", to: "siem" },
  { from: "firewall", to: "siem" },
  { from: "ad", to: "siem" },
  { from: "iam", to: "siem" },
  { from: "siem", to: "soc" },
  { from: "soc", to: "ir" },
  { from: "soc", to: "hunting" },
  { from: "hunting", to: "mitre" },
];
