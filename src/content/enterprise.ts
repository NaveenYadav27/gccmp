// Global Financial Corp — the fictional enterprise every mission lives inside.
export type EnterpriseNode = {
  id: string;
  label: string;
  layer: "user" | "endpoint" | "network" | "perimeter" | "app" | "data" | "identity" | "cloud" | "security" | "ops";
  x: number; // 0-100
  y: number; // 0-100
  description: string;
  runsOn: string;
  business: string;
  attackerView: string;
  defenderView: string;
  relatedSlugs: string[];
  concepts: string[];
};

export type EnterpriseEdge = { from: string; to: string; label?: string };

export const ORG = {
  name: "Global Financial Corp",
  ticker: "GFC",
  hq: "Singapore",
  employees: 42000,
  sites: ["Singapore HQ", "London", "New York", "Mumbai", "Sydney"],
  units: ["Retail Banking", "Corporate Banking", "Trading", "Wealth", "IT", "SecOps", "Risk & Compliance"],
  crownJewels: ["Core Banking DB", "Trading Engine", "Customer PII Vault", "SWIFT Gateway"],
};

export const NODES: EnterpriseNode[] = [
  {
    id: "employee", label: "Employee Laptop", layer: "user", x: 8, y: 20,
    description: "42k corporate endpoints running Windows 11 with EDR, MDM, and DLP agents.",
    runsOn: "Windows 11 Enterprise · Intune enrolled",
    business: "Every trade, ticket, and customer email flows through here first.",
    attackerView: "Phishing, malicious macros, browser 0-day, stolen creds.",
    defenderView: "EDR telemetry, Sysmon, Defender ASR, USB block, MFA.",
    relatedSlugs: ["m1-s02-anatomy", "m1-s06-windows"],
    concepts: ["Endpoint", "EDR", "Phishing", "MFA"],
  },
  {
    id: "switch", label: "Access Switch", layer: "network", x: 22, y: 30,
    description: "Layer-2 switches at every branch. 802.1X enforced, port-mirror to SOC.",
    runsOn: "Cisco Catalyst 9300",
    business: "Delivers every packet from desk to data center.",
    attackerView: "MAC spoofing, VLAN hopping, rogue device.",
    defenderView: "802.1X, DHCP snooping, port security, SPAN → Zeek.",
    relatedSlugs: ["m1-s04-networking"],
    concepts: ["VLAN", "802.1X", "Switching"],
  },
  {
    id: "router", label: "Core Router", layer: "network", x: 34, y: 42,
    description: "Handles east-west + north-south routing to data centers and cloud.",
    runsOn: "Cisco ASR / Juniper MX",
    business: "Uptime of this box = uptime of the branch.",
    attackerView: "BGP hijack, routing table poisoning.",
    defenderView: "ACLs, NetFlow to SIEM, config drift monitoring.",
    relatedSlugs: ["m1-s04-networking"],
    concepts: ["Routing", "NetFlow", "BGP"],
  },
  {
    id: "firewall", label: "Perimeter Firewall", layer: "perimeter", x: 46, y: 52,
    description: "Next-gen firewall — IDS/IPS, TLS inspection, URL filter, sandbox.",
    runsOn: "Palo Alto PA-5450",
    business: "Legally-required boundary between GFC and the Internet.",
    attackerView: "Evasion via encryption, tunneling over allowed ports.",
    defenderView: "IPS signatures, App-ID, sinkhole DNS, SIEM feed.",
    relatedSlugs: ["m1-s04-networking", "m1-s08-checkpoint"],
    concepts: ["Firewall", "IPS", "TLS inspection"],
  },
  {
    id: "vpn", label: "Remote Access VPN", layer: "perimeter", x: 22, y: 60,
    description: "SSL VPN + posture check for 18k remote workers.",
    runsOn: "GlobalProtect / AnyConnect",
    business: "COVID-era lifeline — still 40% of workforce is remote.",
    attackerView: "Cred stuffing, MFA fatigue, 0-day in VPN appliance.",
    defenderView: "MFA, device posture, geo-velocity, alert on impossible travel.",
    relatedSlugs: ["m1-s04-networking"],
    concepts: ["VPN", "MFA", "Zero Trust"],
  },
  {
    id: "loadbalancer", label: "Load Balancer / WAF", layer: "perimeter", x: 58, y: 45,
    description: "F5 in front of every customer-facing web tier.",
    runsOn: "F5 BIG-IP with ASM",
    business: "Absorbs DDoS + injects security headers.",
    attackerView: "Layer-7 DDoS, header smuggling, WAF bypass.",
    defenderView: "Rate limits, OWASP CRS, JA3 fingerprinting.",
    relatedSlugs: ["m1-s04-networking"],
    concepts: ["WAF", "DDoS", "Load balancing"],
  },
  {
    id: "webserver", label: "Web Tier", layer: "app", x: 70, y: 32,
    description: "Public site + customer portal — 1.4M sessions/day.",
    runsOn: "NGINX + Node.js on Linux",
    business: "The face of the bank. Every downtime minute = angry tweets.",
    attackerView: "SQLi, XSS, deserialization, credential stuffing.",
    defenderView: "WAF, CSP, secret scanning, canary tokens.",
    relatedSlugs: ["m1-s05-linux"],
    concepts: ["Web app", "OWASP Top 10"],
  },
  {
    id: "appserver", label: "Application Tier", layer: "app", x: 74, y: 50,
    description: "Java microservices — accounts, payments, notifications.",
    runsOn: "Spring Boot on Kubernetes (EKS)",
    business: "Executes actual money movement.",
    attackerView: "Broken auth, SSRF, insecure deserialization, log4j-class bugs.",
    defenderView: "SBOM, image signing, admission controllers, runtime EDR.",
    relatedSlugs: ["m1-s07-cloud"],
    concepts: ["Microservices", "Kubernetes", "SSRF"],
  },
  {
    id: "db", label: "Core Banking DB", layer: "data", x: 82, y: 62,
    description: "Oracle Exadata cluster. Every debit/credit lives here.",
    runsOn: "Oracle Exadata + Data Guard",
    business: "Crown jewel #1. Regulator visits if it breaks.",
    attackerView: "Ransomware, insider export, backup destruction.",
    defenderView: "TDE, DAM, immutable backups, break-glass access.",
    relatedSlugs: ["m1-s03-data"],
    concepts: ["Database", "Encryption at rest", "DLP"],
  },
  {
    id: "ad", label: "Active Directory", layer: "identity", x: 34, y: 72,
    description: "Forest with 3 domains, 42k user objects, 8k computer objects.",
    runsOn: "Windows Server 2022 · 12 DCs",
    business: "Every login, GPO, share, printer.",
    attackerView: "Kerberoasting, DCSync, Golden Ticket, ADCS abuse.",
    defenderView: "Tier model, PAWs, ATA/Defender for Identity, LAPS.",
    relatedSlugs: ["m1-s06-windows"],
    concepts: ["Active Directory", "Kerberos", "GPO"],
  },
  {
    id: "cloud", label: "AWS / Azure Estate", layer: "cloud", x: 60, y: 72,
    description: "800 accounts, IaC-managed, landing zone with SCPs.",
    runsOn: "AWS Organizations + Azure Mgmt Groups",
    business: "Where new products ship in weeks, not months.",
    attackerView: "Leaked keys, over-permissive IAM, public S3, SSRF-to-IMDS.",
    defenderView: "CSPM, GuardDuty, Access Analyzer, SCPs, IMDSv2 enforced.",
    relatedSlugs: ["m1-s07-cloud"],
    concepts: ["IAM", "S3", "CSPM"],
  },
  {
    id: "siem", label: "SIEM", layer: "security", x: 46, y: 82,
    description: "Splunk Enterprise Security — 8 TB/day.",
    runsOn: "Splunk ES + ES Content Update",
    business: "One pane of glass for detection & compliance evidence.",
    attackerView: "Log tampering, defender blind spots.",
    defenderView: "Correlation rules, notable events, risk-based alerting.",
    relatedSlugs: ["m1-s08-checkpoint"],
    concepts: ["SIEM", "Correlation", "MITRE ATT&CK"],
  },
  {
    id: "soc", label: "24×7 SOC", layer: "ops", x: 58, y: 92,
    description: "3-tier SOC across SG/UK/NY. 90-second MTTA target.",
    runsOn: "Splunk + SOAR + ServiceNow SIR",
    business: "Insurance, regulator, brand — all rely on this room.",
    attackerView: "Overwhelm with noise, low-and-slow campaigns.",
    defenderView: "Runbooks, threat hunting, purple teaming.",
    relatedSlugs: ["m1-s08-checkpoint"],
    concepts: ["SOC", "Incident Response", "Threat Hunting"],
  },
];

export const EDGES: EnterpriseEdge[] = [
  { from: "employee", to: "switch" },
  { from: "switch", to: "router" },
  { from: "router", to: "firewall" },
  { from: "vpn", to: "firewall" },
  { from: "firewall", to: "loadbalancer" },
  { from: "loadbalancer", to: "webserver" },
  { from: "webserver", to: "appserver" },
  { from: "appserver", to: "db" },
  { from: "employee", to: "ad", label: "logon" },
  { from: "appserver", to: "cloud" },
  { from: "firewall", to: "siem", label: "logs" },
  { from: "ad", to: "siem", label: "logs" },
  { from: "cloud", to: "siem", label: "logs" },
  { from: "webserver", to: "siem", label: "logs" },
  { from: "siem", to: "soc" },
];

export function nodeById(id: string) {
  return NODES.find((n) => n.id === id);
}
