// F01 · The Digital World — enterprise learning object for GFS SOC Day 1.

export const COMPANY = {
  name: "Global Financial Services",
  short: "GFS",
  hq: "London · Canary Wharf",
  regions: 27,
  employees: 48_500,
  customers: "18.4M",
  ciso: "Priya Raman",
  soc: "GFS-SOC (Follow-the-sun · London → Singapore → NYC)",
};

export const PERSONA = {
  name: "You",
  role: "Junior SOC Analyst · Tier 1",
  empId: "GFS-SOC-2041",
  manager: "Marcus Chen (SOC Shift Lead)",
  dept: "Cyber Defence · Security Operations",
  shift: "London · 08:00–16:00 GMT",
  laptop: "GFS-LT-2041 (Win 11 · Defender · CrowdStrike Falcon)",
};

// The pain that opens the lesson.
export const MISSION = {
  ticket: "INC-874120",
  severity: "P1 · Customer-facing outage",
  opened: "08:14 GMT · Monday",
  headline: "Online banking is DOWN across EMEA",
  callerImpact:
    "Retail customers can't log in on web or mobile. Branch tellers can't authorise wires. Call-centre queue is at 2,400 and growing.",
  businessImpact: [
    { label: "Revenue at risk", value: "£1.2M / hour" },
    { label: "Affected customers", value: "6.8M EMEA" },
    { label: "Regulator clock", value: "72h to notify FCA if breach" },
    { label: "SLA breach in", value: "46 min" },
  ],
  soFar:
    "Ops confirms the core banking mainframe is healthy. Network confirms internet links are up. Yet the mobile app times out at login. Where does 'online banking' actually live? That's today's mission — map the digital world the bank runs on before you can defend it.",
};

// Four pillars — every enterprise runs on these.
export const PILLARS = [
  {
    id: "compute",
    name: "Compute",
    tag: "Where code runs",
    desc: "CPUs, VMs, containers, serverless. Every request eventually executes on a processor.",
    examples: ["EC2 / Azure VMs", "Kubernetes pods", "Mainframe LPARs", "Lambda functions"],
    gfs: "18,400 VMs · 4 mainframes · 62 K8s clusters",
    attack: ["Malware execution", "Container escape", "Cryptomining", "Living-off-the-land binaries"],
  },
  {
    id: "storage",
    name: "Storage",
    tag: "Where data rests",
    desc: "Databases, object stores, file shares, backups. This is what attackers steal or encrypt.",
    examples: ["Oracle / Postgres", "S3 / Azure Blob", "SMB shares", "Backup tapes"],
    gfs: "94 PB total · 22 PB customer PII · 480 databases",
    attack: ["Ransomware encryption", "Data exfiltration", "SQL injection", "Backup destruction"],
  },
  {
    id: "network",
    name: "Network",
    tag: "How bits move",
    desc: "Routers, switches, firewalls, DNS, load balancers, the internet. Every attack traverses a network.",
    examples: ["BGP peering", "Cloudflare / F5", "Palo Alto firewalls", "Internal MPLS"],
    gfs: "27 datacentres · 3 tier-1 ISPs · 14,200 firewall rules",
    attack: ["DDoS", "DNS hijack", "Lateral movement", "MITM on TLS"],
  },
  {
    id: "identity",
    name: "Identity",
    tag: "Who is who",
    desc: "Users, service accounts, tokens, MFA. Modern attacks steal identity, not machines.",
    examples: ["Active Directory", "Okta / Entra ID", "SAML / OIDC", "Kerberos tickets"],
    gfs: "48,500 humans · 312,000 service accounts · 6 AD forests",
    attack: ["Phishing", "Password spray", "Kerberoasting", "OAuth consent abuse"],
  },
] as const;

// The banking transaction the customer just tried — every hop is a component we can defend or lose.
export type TxHop = {
  id: string;
  actor: string;
  layer: "customer" | "edge" | "app" | "identity" | "data" | "core";
  action: string;
  pillar: "compute" | "storage" | "network" | "identity";
  latencyMs: number;
  ok: boolean;
  detail: string;
  attackIfLost: string;
};

export const TX_HOPS: TxHop[] = [
  {
    id: "h1",
    actor: "Customer mobile app",
    layer: "customer",
    action: "Tap 'Log in' — send credentials + device fingerprint",
    pillar: "network",
    latencyMs: 12,
    ok: true,
    detail: "iOS/Android app opens TLS 1.3 to api.gfsbank.com. Cert pinned to GFS root CA.",
    attackIfLost: "Fake app on jailbroken phone; SSL-strip on hotel wifi.",
  },
  {
    id: "h2",
    actor: "Cloudflare edge (LHR)",
    layer: "edge",
    action: "Terminate TLS · WAF inspect · rate-limit",
    pillar: "network",
    latencyMs: 4,
    ok: true,
    detail: "WAF blocks OWASP Top-10 patterns. Bot-score gates 41% of raw traffic.",
    attackIfLost: "Credential-stuffing bots reach origin; L7 DDoS.",
  },
  {
    id: "h3",
    actor: "API Gateway (AWS eu-west-2)",
    layer: "app",
    action: "Route /v3/auth/login to auth-service pod",
    pillar: "compute",
    latencyMs: 6,
    ok: false,
    detail: "❌ Gateway → auth-service returns 504. Pod count 0/12 in eu-west-2a.",
    attackIfLost: "Attacker replays captured JWTs; broken auth = broken bank.",
  },
  {
    id: "h4",
    actor: "auth-service (EKS pod)",
    layer: "identity",
    action: "Validate credentials against Entra ID · mint session JWT",
    pillar: "identity",
    latencyMs: 38,
    ok: false,
    detail: "Never reached. Pods evicted after node group autoscaler failed at 07:52 GMT.",
    attackIfLost: "Password spray, MFA bypass, token forgery.",
  },
  {
    id: "h5",
    actor: "Customer profile DB (Postgres)",
    layer: "data",
    action: "Read account summary, balance, recent txns",
    pillar: "storage",
    latencyMs: 22,
    ok: true,
    detail: "DB is healthy. Row-level encryption via pgcrypto. Read replica in eu-west-1.",
    attackIfLost: "PII dump; ransomware; regulator fine under GDPR.",
  },
  {
    id: "h6",
    actor: "Core banking (z/OS mainframe)",
    layer: "core",
    action: "Post any pending debit/credit · confirm ledger",
    pillar: "compute",
    latencyMs: 84,
    ok: true,
    detail: "Mainframe LPAR CBANK-01. RACF-authenticated. 4.2M txns/hour capacity.",
    attackIfLost: "Ledger tampering — existential risk to the bank.",
  },
];

export const ROOT_CAUSE = {
  finding:
    "auth-service is down in eu-west-2. Every downstream hop is healthy — but with no identity layer, the 'digital world' collapses at the front door.",
  layer: "identity",
  fix: "Cluster autoscaler restored; pods rescheduled. Login recovered at 08:47 GMT (33 min impact).",
  lesson:
    "Attacks and outages both target the weakest pillar. You just proved that a healthy database is worthless without a healthy identity service.",
};

// A short list of real incidents that map to today's pillars.
export const REAL_INCIDENTS = [
  {
    year: 2023,
    who: "MOVEit (Progress)",
    pillar: "storage",
    line: "Zero-day SQLi in a file-transfer product; 2,700+ orgs breached. Storage layer.",
  },
  {
    year: 2024,
    who: "CrowdStrike Falcon update",
    pillar: "compute",
    line: "Bad kernel driver bricked 8.5M Windows hosts globally. Compute layer.",
  },
  {
    year: 2023,
    who: "Okta support system",
    pillar: "identity",
    line: "Attacker stole HAR files with session tokens from Okta support. Identity layer.",
  },
  {
    year: 2016,
    who: "Dyn DNS",
    pillar: "network",
    line: "Mirai botnet DDoS took DNS offline; half the US internet unreachable. Network layer.",
  },
] as const;

// End-of-topic knowledge check.
export type Question = {
  id: string;
  prompt: string;
  options: { id: string; text: string; correct?: true; why: string }[];
};

export const QUIZ: Question[] = [
  {
    id: "q1",
    prompt: "Which pillar is failing in the GFS outage?",
    options: [
      { id: "a", text: "Compute", why: "Pods CAN'T run but the compute platform itself (EKS) is healthy." },
      { id: "b", text: "Storage", why: "DB is fine; not the bottleneck." },
      { id: "c", text: "Network", why: "Cloudflare + gateway are fine." },
      { id: "d", text: "Identity", correct: true, why: "auth-service pods are 0/12. No identity → no login → no bank." },
    ],
  },
  {
    id: "q2",
    prompt: "Why does 'the bank is on the cloud' oversimplify?",
    options: [
      {
        id: "a",
        text: "Because there's no cloud; it's someone else's computer.",
        why: "Cute but not the point — the point is that the bank spans many layers.",
      },
      {
        id: "b",
        text: "Because a banking transaction crosses ~6 layers (device, edge, app, identity, data, core), each with its own attack surface.",
        correct: true,
        why: "Exactly. You can't defend a system you can't map.",
      },
      { id: "c", text: "Because clouds are less secure than on-prem.", why: "Not inherently — different threat model, not weaker." },
      { id: "d", text: "Because mainframes don't run in the cloud.", why: "True but tangential." },
    ],
  },
  {
    id: "q3",
    prompt: "A regulator asks: 'where does customer PII live?' Which pillar answers?",
    options: [
      { id: "a", text: "Compute", why: "PII is data-at-rest, not the CPU that reads it." },
      { id: "b", text: "Storage", correct: true, why: "DBs, object stores, backups. That's the storage pillar." },
      { id: "c", text: "Network", why: "Network is data-in-motion." },
      { id: "d", text: "Identity", why: "Identity says WHO can read PII, not where it sits." },
    ],
  },
];

export const LAB = {
  id: "F01-LAB-01",
  title: "Trace the failing banking transaction",
  mission: "Walk the 6 hops of a login request. Identify the failing pillar. Draft a 3-line incident summary for Marcus.",
  provider: "mock" as const,
  duration: "20 min",
  evidenceCaptured: [
    "6 hops recorded with latency, pillar, and health",
    "Failing hop highlighted",
    "Root-cause pillar identified",
    "3-line incident summary drafted",
  ],
  proxmoxNote:
    "Real Proxmox lab arrives with Increment 01 · Sub-iteration 10. This mission runs in the browser today and will re-run against live VMs once the LabProvider abstraction ships.",
};

export const INTERVIEW = [
  {
    q: "Walk me through what happens when a customer taps 'Log in' on our mobile app.",
    a: "Device → TLS to edge (Cloudflare, WAF) → API gateway → auth-service pod → Entra ID for credential check → JWT minted → subsequent calls hit profile DB and core banking. Six layers, four pillars.",
  },
  {
    q: "Which pillar do modern attackers target most, and why?",
    a: "Identity. Stealing a valid token or session bypasses network, compute, and storage controls. See Okta 2023, Midnight Blizzard 2024.",
  },
  {
    q: "If the database is fine but customers can't see their balance, where do you look first?",
    a: "Upstream of the DB — identity and app layers. The DB being healthy just means the failure is somewhere between customer and DB.",
  },
];

export const CAREER = {
  role: "SOC Analyst Tier 1 → Tier 2",
  skillsUnlocked: [
    "Enterprise architecture literacy",
    "Incident triage framing (pillar-first)",
    "Stakeholder communication (business + technical)",
  ],
  nextTopics: ["F02 Computer Fundamentals", "F09 Networking Essentials", "F10 Information Security"],
  cehLink: "Sets the mental model for CEH Module 01 (Introduction to Ethical Hacking) and Module 03 (Scanning).",
};

// Knowledge Graph nodes surfaced from this topic.
export const KG_NODES = [
  { id: "digital-world", label: "The Digital World", kind: "topic" },
  { id: "compute", label: "Compute pillar", kind: "concept" },
  { id: "storage", label: "Storage pillar", kind: "concept" },
  { id: "network", label: "Network pillar", kind: "concept" },
  { id: "identity", label: "Identity pillar", kind: "concept" },
  { id: "attack-surface", label: "Attack surface", kind: "concept" },
  { id: "gfs-online-banking", label: "GFS Online Banking (asset)", kind: "asset" },
] as const;
