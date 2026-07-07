// Content data for F01: The Digital World experience
// Enterprise scenario: Global Financial Services (GFS) — EMEA online banking outage

export const COMPANY = {
  name: "Global Financial Services (GFS)",
  short: "GFS",
};

export const PERSONA = {
  role: "Junior SOC Analyst",
  empId: "EMP-4427",
};

export const MISSION = {
  ticket: "INC-2024-0731",
  headline: "EMEA Online Banking — Total Outage",
  severity: "P1 · Critical",
  opened: "08:14 GMT",
  callerImpact:
    "Customers across EMEA cannot log in to online or mobile banking. Estimated 2.4 million sessions dropped.",
  soFar:
    "Load balancer logs show a spike in TLS handshake failures beginning at 08:11. App servers are healthy. Database cluster is healthy. Network team reports no ISP issues. Identity team is investigating the auth service.",
  businessImpact: [
    { label: "Customers affected", value: "2.4M" },
    { label: "Revenue at risk", value: "£180K/min" },
    { label: "Regulator SLA", value: "4h max" },
    { label: "Open incidents", value: "1 P1" },
  ],
};

export const PILLARS = [
  {
    id: "compute",
    name: "Compute",
    tag: "CPU, memory, processes, virtualisation",
    desc:
      "Every GFS transaction is processed by compute resources — physical servers, VMs and containers. When compute is saturated, services degrade or crash. Attackers exploit compute via cryptojacking, DoS, or malware that burns CPU.",
    examples: ["Web servers", "App servers", "Containers", "VMs", "Serverless functions"],
    gfs: "32 app server VMs (Ubuntu 22.04) behind load balancer LB-EMEA-01. Each runs the Node.js banking API.",
    attack: [
      "DoS/DDoS to exhaust CPU/memory and cause outage",
      "Cryptojacking malware hidden in app container",
      "Privilege escalation via kernel exploit to own the host",
    ],
  },
  {
    id: "storage",
    name: "Storage",
    tag: "Databases, file systems, block & object storage",
    desc:
      "Storage holds customer records, transaction logs, and audit trails. Corruption, ransomware, or unauthorised access here is catastrophic — both for operations and for PCI-DSS compliance.",
    examples: ["PostgreSQL", "Oracle DB", "S3 / Blob", "NFS mounts", "SAN / NAS"],
    gfs: "PostgreSQL cluster (primary + 2 replicas). Stores 14M customer accounts. Encrypted at rest (AES-256). Backed up every 15 min to GFS-VAULT-S3.",
    attack: [
      "SQL injection to exfiltrate or corrupt records",
      "Ransomware encrypting the database volume",
      "Backup deletion to prevent recovery",
    ],
  },
  {
    id: "network",
    name: "Network",
    tag: "Packets, protocols, DNS, TLS, routing",
    desc:
      "The network carries every request between users, services, and data. GFS runs across 3 data centres connected by MPLS. A misconfiguration, DDoS, or BGP hijack can black-hole traffic instantly.",
    examples: ["Load balancers", "Firewalls", "DNS", "TLS certificates", "VPN gateways"],
    gfs: "Akamai CDN → F5 LB-EMEA-01 → 32 app VMs → PostgreSQL cluster. TLS 1.3 enforced end-to-end. Certificate managed by DigiCert, expires 2025-03-14.",
    attack: [
      "TLS certificate expiry silently kills HTTPS connections",
      "BGP hijack reroutes traffic to attacker-controlled server",
      "DNS poisoning redirects users to phishing site",
    ],
  },
  {
    id: "identity",
    name: "Identity",
    tag: "Users, credentials, MFA, IAM, tokens",
    desc:
      "Identity is the gatekeeper. Every request must prove who it is. At GFS, the identity plane controls access to banking, admin systems, and cloud APIs. Compromised credentials are the #1 attack vector.",
    examples: ["Active Directory", "OAuth 2.0", "SAML", "MFA tokens", "API keys"],
    gfs: "Azure AD (Entra ID) for staff SSO. Customer auth via internal IdM-CORE service (OAuth 2.0 + TOTP MFA). Today's outage started here — IdM-CORE is returning 503.",
    attack: [
      "Credential stuffing against IdM-CORE login endpoint",
      "OAuth token theft via open redirect",
      "MFA bypass via SIM swapping or push-bombing",
    ],
  },
];

export type TxHop = {
  id: string;
  step: number;
  layer: string;
  actor: string;
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
    step: 1,
    layer: "CDN / Edge",
    actor: "Akamai Edge Node",
    action: "Terminates TLS, caches static assets, passes dynamic requests to load balancer",
    pillar: "network",
    latencyMs: 12,
    ok: true,
    detail: "TLS 1.3 handshake: 11ms. HTTP/2 stream established. Cache MISS on /api/auth/login. Forwarding to LB-EMEA-01.",
    attackIfLost: "Attacker intercepts plaintext credentials before they reach GFS; can replay tokens globally",
  },
  {
    id: "h2",
    step: 2,
    layer: "Load Balancer",
    actor: "F5 LB-EMEA-01",
    action: "Health-checks app servers, distributes requests round-robin, enforces WAF rules",
    pillar: "network",
    latencyMs: 3,
    ok: true,
    detail: "29/32 app VMs healthy. Round-robin selection: app-vm-07. WAF: no SQL injection pattern. Forwarding.",
    attackIfLost: "Attacker bypasses WAF, injects malicious payloads directly to app server; or causes split-brain between VMs",
  },
  {
    id: "h3",
    step: 3,
    layer: "Application Server",
    actor: "app-vm-07 (Node.js API)",
    action: "Parses JSON body, validates CSRF token, calls IdM-CORE to authenticate user",
    pillar: "compute",
    latencyMs: 8,
    ok: true,
    detail: "CPU: 41%. Memory: 3.2 GB / 8 GB. CSRF token valid. Calling IdM-CORE at http://idm-core.gfs.internal:8080/auth",
    attackIfLost: "Attacker can execute arbitrary code on the VM, pivot to internal network, or install a backdoor",
  },
  {
    id: "h4",
    step: 4,
    layer: "Identity Service",
    actor: "IdM-CORE Auth Service",
    action: "Validates username + password hash, triggers MFA check, issues short-lived JWT",
    pillar: "identity",
    latencyMs: 950,
    ok: false,
    detail: "HTTP 503 Service Unavailable. Response body: {\"error\":\"upstream_timeout\",\"detail\":\"LDAP connection pool exhausted\"}. IdM-CORE cannot reach AD-DC-02. LDAP pool: 500/500 connections.",
    attackIfLost: "Attacker controls authentication — can bypass MFA, issue tokens for any user, or lock out all customers",
  },
  {
    id: "h5",
    step: 5,
    layer: "Directory Service",
    actor: "Active Directory (AD-DC-02)",
    action: "Verifies user credentials against directory, returns group memberships",
    pillar: "identity",
    latencyMs: 0,
    ok: false,
    detail: "AD-DC-02 unreachable. AD-DC-01 (primary) is healthy. Replication lag between DC-01 and DC-02: 47 minutes. Root cause: DC-02 NIC firmware crash at 08:09.",
    attackIfLost: "Attacker with DC access can create accounts, reset any password, and issue Kerberos tickets (golden ticket attack)",
  },
  {
    id: "h6",
    step: 6,
    layer: "Database",
    actor: "PostgreSQL Primary",
    action: "Stores and retrieves customer account records, session tokens, audit log",
    pillar: "storage",
    latencyMs: 0,
    ok: true,
    detail: "PostgreSQL: healthy. Connection pool: 234/400. Query p95: 4ms. No blocking queries. Replica lag: 0ms. (DB was never reached because auth failed upstream.)",
    attackIfLost: "Attacker exfiltrates 14M customer records or corrupts balances — maximum financial and regulatory damage",
  },
];

export const ROOT_CAUSE = {
  finding:
    "AD-DC-02 (secondary domain controller) suffered a NIC firmware crash at 08:09. IdM-CORE's LDAP connection pool was exclusively configured to use DC-02 for EMEA region load balancing. When DC-02 went offline, all 500 LDAP connections timed out simultaneously, exhausting the pool. IdM-CORE returned HTTP 503, causing all login attempts to fail.",
  fix: "1) Restart AD-DC-02 NIC (firmware rollback). 2) Update IdM-CORE LDAP config to failover to DC-01 automatically. 3) Drain and restart IdM-CORE connection pool. ETA: 35 minutes.",
  lesson:
    "A single point of failure in the Identity pillar caused a total outage despite healthy compute, storage, and network layers. Resilience must be designed at each pillar independently.",
};

export const REAL_INCIDENTS = [
  {
    who: "Okta (2022)",
    year: 2022,
    pillar: "identity" as const,
    line: "Lapsus$ accessed Okta's customer support tool via a compromised contractor laptop. 366 customer tenants were potentially exposed. No code was modified but trust was severely damaged.",
  },
  {
    who: "Facebook (2021)",
    year: 2021,
    pillar: "network" as const,
    line: "A BGP configuration change withdrew Facebook's routing announcements from the global internet. DNS and identity systems went unreachable. 3.5 billion users were locked out for ~6 hours.",
  },
  {
    who: "Capital One (2019)",
    year: 2019,
    pillar: "compute" as const,
    line: "A misconfigured WAF allowed an attacker to exploit a Server-Side Request Forgery (SSRF) vulnerability, retrieve AWS IAM credentials via the metadata service, and exfiltrate 100M customer records from S3.",
  },
  {
    who: "British Airways (2018)",
    year: 2018,
    pillar: "storage" as const,
    line: "Magecart attackers injected 22 lines of JavaScript into BA's payment page. Payment card data for 500,000 customers was exfiltrated in real time. £20M ICO fine.",
  },
];

export const LAB = {
  id: "LAB-F01-01",
  provider: "Proxmox VE (GFS Lab Cluster)",
  duration: "45 min",
  title: "Map the GFS Digital Estate",
  mission:
    "You have been given read-only access to the GFS staging environment. Your mission is to document the four pillars — list the assets under each, confirm TLS certificate validity, and write the 3-line incident summary Marcus will send to the CIO.",
  evidenceCaptured: [
    "Screenshot: nmap scan of GFS DMZ (port inventory)",
    "Screenshot: TLS certificate details for banking.gfs.internal",
    "Screenshot: AD Users & Computers — IdM service account",
    "Artefact: 3-line CIO incident summary (your deliverable)",
  ],
  proxmoxNote:
    "Proxmox lab provisioning is on the product roadmap. When live, you will clone the GFS-STAGING template and complete this lab in a fully isolated VM — no risk to production.",
};

export const QUIZ = [
  {
    id: "q1",
    prompt: "The GFS online banking outage at 08:14 was ultimately caused by a failure in which pillar?",
    options: [
      { id: "a", text: "Compute — the app servers ran out of memory", correct: false, why: "App servers were healthy throughout the incident." },
      { id: "b", text: "Network — Akamai dropped the TLS session", correct: false, why: "Akamai was healthy. TLS handshakes succeeded at the edge." },
      { id: "c", text: "Identity — IdM-CORE could not reach Active Directory", correct: true, why: "Correct. AD-DC-02 NIC crash → LDAP pool exhaustion → IdM-CORE 503 → all logins fail." },
      { id: "d", text: "Storage — the PostgreSQL cluster was corrupted", correct: false, why: "PostgreSQL was healthy. The database was never reached because auth failed first." },
    ],
  },
  {
    id: "q2",
    prompt: "A junior analyst suggests 'the network is down' because customers can't reach the site. Why is this wrong in the GFS incident?",
    options: [
      { id: "a", text: "The analyst is right — network issues always cause login failures", correct: false, why: "Not true. Login failures have many root causes across all four pillars." },
      { id: "b", text: "Network (CDN, LB) was healthy — the failure was in the Identity pillar", correct: true, why: "Correct. Akamai and the F5 load balancer were both healthy. The failure was identity-layer deep." },
      { id: "c", text: "You can't tell without a packet capture", correct: false, why: "Load balancer and CDN logs clearly showed network hops were healthy." },
      { id: "d", text: "The network team is always responsible for login issues", correct: false, why: "Login issues span all four pillars. You must trace the full request path." },
    ],
  },
  {
    id: "q3",
    prompt: "Which GFS asset is most critical to protect from a ransomware attack?",
    options: [
      { id: "a", text: "Akamai edge nodes", correct: false, why: "CDN nodes cache public assets and don't store sensitive customer data." },
      { id: "b", text: "The F5 load balancer", correct: false, why: "Load balancers are critical for availability but don't store customer data." },
      { id: "c", text: "PostgreSQL primary — 14M customer accounts", correct: true, why: "Correct. Encrypting or destroying the database would be catastrophic — financially and under PCI-DSS/GDPR." },
      { id: "d", text: "app-vm-07", correct: false, why: "Individual app VMs are replaceable. The database holds the irreplaceable data." },
    ],
  },
];

export const INTERVIEW = [
  {
    q: "Explain the four pillars of a digital enterprise to a non-technical interviewer.",
    a: "Every digital business runs on four pillars: Compute (the CPUs and memory that run software), Storage (the databases and file systems that hold data), Network (the cables and protocols that move data between systems and users), and Identity (the system that verifies who you are and what you're allowed to do). A failure or breach at any single pillar can take down the entire business.",
  },
  {
    q: "Walk me through how a customer login request travels at a large bank.",
    a: "The request hits the CDN edge for TLS termination, passes to a load balancer that selects a healthy app server, the app server calls the identity/auth service which checks credentials against Active Directory, and if auth succeeds, the app server queries the database to load the account. The response travels back through the same path. A failure at any hop — network, compute, identity, or storage — causes the login to fail.",
  },
  {
    q: "How do you distinguish between a cyber attack and an operational outage in the first 10 minutes?",
    a: "In the first 10 minutes, you triage the four pillars: check compute health (CPU/memory metrics), storage replication lag and error rates, network connectivity between tiers, and identity service health. An operational outage typically has a clear infrastructure cause (hardware failure, misconfiguration, deployment). An attack may show lateral movement indicators, unusual access patterns, or alerts from the SIEM. You treat both as P1 until you have evidence to distinguish them.",
  },
];

export const CAREER = {
  role: "Junior SOC Analyst → SOC Analyst → Senior Analyst / Incident Responder",
  skillsUnlocked: [
    "Enterprise triage framework (4 pillars)",
    "Reading application and infrastructure logs",
    "Stakeholder communication during incidents",
    "Root cause analysis documentation",
  ],
  nextTopics: [
    "F02 · Computer Fundamentals — how compute pillar works internally",
    "F05 · Operating Systems — kernel, processes, privilege",
    "F09 · Networking Essentials — deep dive into the network pillar",
    "CEH M01 · Introduction to Ethical Hacking",
  ],
  cehLink: "Completing all 12 Foundation topics unlocks the CEH curriculum track.",
};
