// Month 1 — Fundamentals curriculum derived from Great Coder Cybersecurity Masters PPT.
// Each session is a 90-minute mission with the full pipeline: brief → objectives →
// story → visual → enterprise example → guided lab → challenge → assessment → summary.

export type QuizQuestion = {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type FlowNode = { id: string; label: string; caption?: string };

export type Session = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  duration: string;
  day: number;
  brief: string;
  objectives: string[];
  whyItMatters: string;
  story: string;
  visual: {
    kind: "flow" | "layered";
    title: string;
    nodes: FlowNode[];
  };
  enterprise: {
    where: string;
    business: string;
    attacker: string;
    defender: string;
    incident: string;
  };
  concepts: { term: string; definition: string; example?: string }[];
  guidedLab: {
    title: string;
    goal: string;
    steps: { instruction: string; command?: string; expected?: string }[];
  };
  challenge: { title: string; prompt: string; hint: string };
  assessment: QuizQuestion[];
  summary: string;
  interviewQuestions: string[];
  careers: string[];
};

export const MONTH_1: Session[] = [
  {
    slug: "m1-s01-cyber-landscape",
    number: 1,
    title: "The Cybersecurity Landscape",
    subtitle: "Why every industry became a security customer",
    duration: "90 min",
    day: 1,
    brief:
      "Before you defend, you have to see the terrain. Today you map the modern threat surface — cloud, AI, banking, healthcare, government — and understand why cybersecurity is now a permanent line item.",
    objectives: [
      "Articulate why every industry is a cybersecurity buyer",
      "Explain the three pillars of security: Confidentiality, Integrity, Availability",
      "Name three foundation roles the program targets",
      "Identify the difference between IT and security work",
    ],
    whyItMatters:
      "A SOC analyst who cannot name where their company makes money will never be trusted with an incident. Business context is the first control.",
    story:
      "In 2017, Maersk — the world's largest shipping company — was hit by NotPetya. Within seven minutes, 49,000 laptops were bricked. A single unpatched Ukrainian tax software became a $300M incident. Not because the attackers were sophisticated. Because nobody had mapped what mattered.",
    visual: {
      kind: "flow",
      title: "Where cybersecurity lives inside the modern enterprise",
      nodes: [
        { id: "cloud", label: "Cloud", caption: "AWS · Azure · GCP" },
        { id: "ai", label: "AI Systems", caption: "Prompts · Models · Data" },
        { id: "fintech", label: "Fintech", caption: "Payments · Wallets" },
        { id: "health", label: "Healthcare", caption: "Records · Devices" },
        { id: "ecom", label: "E-Commerce", caption: "Accounts · Checkout" },
        { id: "gov", label: "Government", caption: "Identity · Infra" },
      ],
    },
    enterprise: {
      where: "Every Fortune 500 has a SOC. Every SaaS has a security engineer. Every bank has a red team.",
      business: "Downtime costs money. Data loss triggers regulatory fines (GDPR, HIPAA, PCI-DSS).",
      attacker: "Attackers follow value: PII, PHI, PCI, IP, and access to the supply chain.",
      defender: "Defenders map crown jewels first, then place controls around them.",
      incident: "NotPetya (Maersk 2017) — $300M loss from a single unpatched vendor tool.",
    },
    concepts: [
      { term: "Confidentiality", definition: "Only authorized identities can read data.", example: "Encryption at rest, RBAC" },
      { term: "Integrity", definition: "Data has not been altered by anyone unauthorized.", example: "Checksums, digital signatures" },
      { term: "Availability", definition: "Systems are reachable when the business needs them.", example: "DDoS protection, backups" },
      { term: "Attack Surface", definition: "Every point where an untrusted actor can attempt to interact with your systems." },
    ],
    guidedLab: {
      title: "Map your first attack surface",
      goal: "Enumerate the public footprint of a real company using open sources.",
      steps: [
        { instruction: "Pick a public company you shop with." },
        { instruction: "Query certificate transparency logs for its subdomains.", command: "curl -s 'https://crt.sh/?q=example.com&output=json' | jq '.[].name_value' | sort -u" },
        { instruction: "Count the unique subdomains — each is a potential entry point.", expected: "Typically 30-500 for a mid-sized enterprise" },
      ],
    },
    challenge: {
      title: "The CIA Triage",
      prompt: "A patient's hospital record is publicly visible on Google. Which of C, I, or A is violated first — and which controls prevent it?",
      hint: "Confidentiality is broken. But could the record also have been tampered with in transit?",
    },
    assessment: [
      { q: "Which principle ensures data has not been altered?", options: ["Confidentiality", "Integrity", "Availability", "Authenticity"], correct: 1, explanation: "Integrity is about detecting/preventing unauthorized modification." },
      { q: "A SOC analyst's first foundation-role responsibility is:", options: ["Building firewalls", "Writing exploits", "Triaging alerts", "Signing contracts"], correct: 2, explanation: "SOC analysts triage — decide noise vs incident." },
      { q: "NotPetya spread through:", options: ["Phishing email only", "A supply-chain compromise of Ukrainian tax software", "A zero-day in Windows Server", "A malicious USB drop"], correct: 1, explanation: "M.E.Doc was the initial vector — a supply-chain attack." },
    ],
    summary:
      "Cybersecurity is not a product — it is the discipline of protecting a business's ability to operate. You now know the CIA triad, the industries most affected, and why business context matters as much as tooling.",
    interviewQuestions: [
      "Walk me through the CIA triad with a real example.",
      "What is the difference between IT and security?",
      "Which industries hire the most SOC analysts and why?",
    ],
    careers: ["SOC Analyst L1", "Security Analyst", "GRC Analyst"],
  },
  {
    slug: "m1-s02-enterprise-anatomy",
    number: 2,
    title: "How an Enterprise Actually Works",
    subtitle: "Business, departments, data, and trust boundaries",
    duration: "90 min",
    day: 4,
    brief:
      "You will spend your career defending systems built by people who do not think in security terms. Today we tour a mid-sized enterprise: what departments own what data, how work flows, and where the trust boundaries live.",
    objectives: [
      "Diagram a mid-sized enterprise: business units, IT, security",
      "Identify crown-jewel data by department (HR, Finance, Product, Sales)",
      "Explain why 'least privilege' is a business decision, not a technical one",
      "Recognize where trust boundaries appear and why they matter",
    ],
    whyItMatters: "An alert on the CFO's laptop is not the same as an alert on a print server. Context is priority.",
    story:
      "In 2013, Target lost 40M credit cards. The initial breach? An HVAC vendor's stolen VPN credential. The vendor had no reason to reach the payment network — but the trust boundary was never drawn. That is a business failure that only security noticed after the fact.",
    visual: {
      kind: "layered",
      title: "The enterprise stack — from customers to crown jewels",
      nodes: [
        { id: "cust", label: "Customers", caption: "External untrusted" },
        { id: "web", label: "Web / Mobile", caption: "Public facing" },
        { id: "app", label: "App tier", caption: "Business logic" },
        { id: "data", label: "Data tier", caption: "Databases · Warehouses" },
        { id: "corp", label: "Corp IT", caption: "Email · Endpoints · Directory" },
        { id: "crown", label: "Crown jewels", caption: "IP · PII · Payments" },
      ],
    },
    enterprise: {
      where: "Every enterprise has HR, Finance, Product, Sales, IT, and Security — often reporting to different C-levels.",
      business: "Different data types have different regulatory weights (GDPR for PII, PCI for cards, SOX for financial reporting).",
      attacker: "Attackers pivot from low-value systems (HVAC, print, dev laptops) toward high-value systems (payments, HR, source code).",
      defender: "Defenders draw trust boundaries and enforce them with network segmentation, IAM, and monitoring.",
      incident: "Target (2013) — HVAC vendor's credential → point-of-sale → 40M cards.",
    },
    concepts: [
      { term: "Trust Boundary", definition: "Any point where data or control crosses between systems with different privilege levels." },
      { term: "Crown Jewels", definition: "The 5–10 assets whose loss would materially damage the business." },
      { term: "Least Privilege", definition: "Every identity gets the minimum access needed to do its job, and no more." },
      { term: "Segmentation", definition: "Splitting the network so a breach in one zone does not become a breach in every zone." },
    ],
    guidedLab: {
      title: "Draw the trust boundaries",
      goal: "Given a company org chart, mark every place where data crosses a trust boundary.",
      steps: [
        { instruction: "Open the sample org (Product, Sales, Finance, HR, IT, Security)." },
        { instruction: "Trace how a new customer's payment flows from checkout → payment gateway → finance → warehouse." },
        { instruction: "Circle every system-to-system hop — each is a boundary.", expected: "Typically 4–7 hops" },
      ],
    },
    challenge: {
      title: "The HVAC Problem",
      prompt: "You are the SOC lead. A third-party HVAC vendor needs access to the building management system. What three controls do you require before approval?",
      hint: "Think: network isolation, credential lifecycle, monitoring.",
    },
    assessment: [
      { q: "The Target 2013 breach entered through:", options: ["A phishing email to the CEO", "An HVAC vendor's credential", "A SQL injection on the checkout page", "A zero-day in Windows"], correct: 1, explanation: "Third-party access is a persistent trust-boundary weakness." },
      { q: "'Crown jewels' refers to:", options: ["The CEO's laptop", "The 5-10 assets whose loss would materially harm the business", "Encrypted backups", "The domain controller"], correct: 1, explanation: "Crown jewels are business-critical, not the most technical." },
    ],
    summary:
      "You now see the enterprise the way a security architect sees it: as departments with data, connected by trust boundaries that must be enforced.",
    interviewQuestions: [
      "How would you prioritize an alert on the CFO's laptop vs a print server?",
      "What is least privilege and where does it break down in practice?",
    ],
    careers: ["GRC Analyst", "SOC Analyst", "IAM Analyst"],
  },
  {
    slug: "m1-s03-data-lifecycle",
    number: 3,
    title: "Data — Structured, Unstructured, and In-Flight",
    subtitle: "The lifecycle security actually protects",
    duration: "90 min",
    day: 7,
    brief:
      "Security is really data security. Today you learn how data is created, classified, stored, moved, and destroyed — and where each stage introduces risk.",
    objectives: [
      "Distinguish structured, semi-structured, and unstructured data",
      "Walk the six stages of the data lifecycle",
      "Match classification levels (Public, Internal, Confidential, Restricted) to controls",
      "Explain why 'data at rest' and 'data in transit' need different protections",
    ],
    whyItMatters: "Every regulation (GDPR, HIPAA, PCI) is a rule about data. Every breach is a data loss story.",
    story:
      "In 2019, Capital One's data warehouse — 100M records — was exfiltrated because a misconfigured WAF let an attacker request AWS metadata. Data at rest was encrypted. Data in use was not.",
    visual: {
      kind: "flow",
      title: "The data lifecycle",
      nodes: [
        { id: "create", label: "Create", caption: "User input · Sensors" },
        { id: "store", label: "Store", caption: "DB · S3 · Warehouse" },
        { id: "use", label: "Use", caption: "Query · Compute" },
        { id: "share", label: "Share", caption: "API · Export · Email" },
        { id: "archive", label: "Archive", caption: "Cold storage" },
        { id: "destroy", label: "Destroy", caption: "Secure delete · Crypto-shred" },
      ],
    },
    enterprise: {
      where: "Data warehouses (Snowflake, BigQuery), object storage (S3), operational DBs (Postgres, DynamoDB).",
      business: "Data classification drives access reviews, retention schedules, and DR planning.",
      attacker: "Attackers target the stage with the weakest control — usually Use or Share.",
      defender: "Defenders encrypt at rest, TLS in transit, tokenize in use, and log every export.",
      incident: "Capital One (2019) — SSRF against a misconfigured WAF exposed 100M records.",
    },
    concepts: [
      { term: "Structured Data", definition: "Rows and columns with a schema — relational tables." },
      { term: "Unstructured Data", definition: "Documents, images, chat logs — no fixed schema." },
      { term: "Data at Rest", definition: "Stored on disk — protect with encryption + access control." },
      { term: "Data in Transit", definition: "Moving across a network — protect with TLS." },
      { term: "Data Classification", definition: "Public / Internal / Confidential / Restricted — dictates controls." },
    ],
    guidedLab: {
      title: "Classify a real dataset",
      goal: "Take a mixed dataset and assign each field a classification.",
      steps: [
        { instruction: "Open sample.csv (contains name, email, ssn, purchase, feedback)." },
        { instruction: "Assign: name = Internal, email = Confidential, ssn = Restricted, purchase = Internal, feedback = Public." },
        { instruction: "Decide what controls each field needs (encryption? masking? retention?)." },
      ],
    },
    challenge: {
      title: "Data Exfiltration Path",
      prompt: "Trace how PII from your database could reach an attacker via a benign-looking SaaS integration.",
      hint: "Think: OAuth scopes, export APIs, third-party sync.",
    },
    assessment: [
      { q: "TLS protects:", options: ["Data at rest", "Data in transit", "Data in use", "All three"], correct: 1, explanation: "TLS encrypts data while moving across a network." },
      { q: "Which field is Restricted?", options: ["Marketing email address", "Social Security Number", "Customer feedback text", "Blog post"], correct: 1, explanation: "SSN is high-sensitivity PII." },
    ],
    summary: "Data lives through six stages — you now know how to protect each one.",
    interviewQuestions: ["Walk me through the data lifecycle.", "What is the difference between encryption at rest and in transit?"],
    careers: ["Data Security Analyst", "SOC Analyst", "DLP Engineer"],
  },
  {
    slug: "m1-s04-networking-fundamentals",
    number: 4,
    title: "Networking — How Packets Actually Move",
    subtitle: "OSI, TCP/IP, and the three-way handshake",
    duration: "90 min",
    day: 10,
    brief:
      "Every attack and every defense happens on a network. Today you learn how a packet leaves your laptop, crosses six devices, and returns — and how each hop can be observed.",
    objectives: [
      "Name the 7 OSI layers and their real-world equivalents",
      "Explain the TCP three-way handshake",
      "Distinguish public vs private IPs, and IPv4 vs IPv6",
      "Read a basic packet capture and identify the source/destination/protocol",
    ],
    whyItMatters: "A SOC alert is a story about packets. If you cannot read the packet, you cannot tell the story.",
    story: "Every SYN flood in history is the same three-way handshake — just weaponized.",
    visual: {
      kind: "layered",
      title: "OSI model — where problems live",
      nodes: [
        { id: "l7", label: "L7 Application", caption: "HTTP · DNS · SSH" },
        { id: "l6", label: "L6 Presentation", caption: "TLS · encoding" },
        { id: "l5", label: "L5 Session", caption: "Sessions · sockets" },
        { id: "l4", label: "L4 Transport", caption: "TCP · UDP" },
        { id: "l3", label: "L3 Network", caption: "IP · routing" },
        { id: "l2", label: "L2 Data Link", caption: "MAC · ARP · switches" },
        { id: "l1", label: "L1 Physical", caption: "Cables · radio" },
      ],
    },
    enterprise: {
      where: "Cisco, Palo Alto, Fortinet firewalls sit at L3/L4. WAFs sit at L7. IDS/IPS observe everywhere.",
      business: "Network segmentation limits blast radius and is a compliance requirement.",
      attacker: "Attackers pivot laterally at L2/L3, exfiltrate at L7 (often over HTTPS to look normal).",
      defender: "Defenders watch traffic patterns — beaconing intervals, unusual DNS, TLS SNI anomalies.",
      incident: "Any C2 channel disguised as HTTPS to a rare domain.",
    },
    concepts: [
      { term: "OSI Model", definition: "Seven-layer conceptual model of network communication." },
      { term: "TCP Handshake", definition: "SYN → SYN-ACK → ACK; establishes a reliable session." },
      { term: "Private IP", definition: "RFC1918 ranges (10/8, 172.16/12, 192.168/16) — not routable on the public internet." },
      { term: "DNS", definition: "Translates names to IPs; a favorite covert channel." },
    ],
    guidedLab: {
      title: "Your first packet capture",
      goal: "Capture and inspect a TCP handshake with tcpdump.",
      steps: [
        { instruction: "Start capture on your loopback interface.", command: "sudo tcpdump -i lo0 -c 10 port 8080" },
        { instruction: "In another terminal, curl a local server.", command: "curl http://127.0.0.1:8080" },
        { instruction: "Identify the SYN, SYN-ACK, ACK packets.", expected: "Three-way handshake before the HTTP GET" },
      ],
    },
    challenge: { title: "DNS Beacon", prompt: "You see DNS queries to a random-looking domain every 60 seconds from an accounting laptop. What is happening and what do you do?", hint: "C2 over DNS. Isolate host, capture, escalate." },
    assessment: [
      { q: "TCP handshake order is:", options: ["ACK, SYN, SYN-ACK", "SYN, SYN-ACK, ACK", "SYN, ACK, SYN-ACK", "SYN-ACK, SYN, ACK"], correct: 1, explanation: "Client sends SYN, server replies SYN-ACK, client confirms with ACK." },
      { q: "192.168.1.10 is:", options: ["A public IP", "A private RFC1918 IP", "IPv6", "A multicast address"], correct: 1, explanation: "192.168/16 is private." },
    ],
    summary: "You can now describe every network conversation in seven layers and read the first packets of any session.",
    interviewQuestions: ["Explain the TCP handshake.", "How does DNS work and how is it abused?"],
    careers: ["SOC Analyst", "Network Security Engineer", "Threat Hunter"],
  },
  {
    slug: "m1-s05-linux-foundations",
    number: 5,
    title: "Linux for Defenders",
    subtitle: "The command line every SOC analyst lives in",
    duration: "90 min",
    day: 13,
    brief:
      "Servers are Linux. Logs are Linux. Containers are Linux. Today you learn the 40 commands that cover 95% of SOC daily work.",
    objectives: [
      "Navigate the filesystem confidently",
      "Read and filter logs with tail, grep, awk, cut",
      "Manage users, groups, and file permissions",
      "Inspect running processes and open ports",
    ],
    whyItMatters: "If you cannot grep an auth.log, you cannot investigate a brute-force alert.",
    story: "The first sign of every Linux intrusion is in /var/log/auth.log. The analysts who found it read it. The analysts who missed it did not.",
    visual: {
      kind: "flow",
      title: "The Linux investigation loop",
      nodes: [
        { id: "who", label: "who / w", caption: "Who is on the box?" },
        { id: "ps", label: "ps aux", caption: "What is running?" },
        { id: "ss", label: "ss -tulpn", caption: "What is listening?" },
        { id: "log", label: "tail -f /var/log/*", caption: "What just happened?" },
        { id: "hash", label: "sha256sum", caption: "Is the binary trusted?" },
      ],
    },
    enterprise: {
      where: "Every cloud VM. Every Kubernetes node. Every SIEM agent runs on Linux.",
      business: "Uptime and audit both depend on being able to read the box.",
      attacker: "Attackers drop reverse shells, cron jobs, and SUID binaries.",
      defender: "Defenders check crontabs, systemd units, and shell histories first.",
      incident: "A modified /etc/passwd or an unexpected root SSH key is often the smoking gun.",
    },
    concepts: [
      { term: "File Permissions", definition: "rwx for user/group/other; represented in octal (e.g. 755)." },
      { term: "Process", definition: "A running program; identified by PID." },
      { term: "systemd", definition: "The service manager on most modern Linux distros." },
      { term: "SUID bit", definition: "Runs a binary as its owner regardless of caller — a favorite persistence trick." },
    ],
    guidedLab: {
      title: "Investigate a suspicious login",
      goal: "Detect a failed brute force in auth.log.",
      steps: [
        { instruction: "Tail the auth log for failed logins.", command: "sudo tail -f /var/log/auth.log | grep 'Failed password'" },
        { instruction: "Count failed attempts per source IP.", command: "grep 'Failed password' /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head" },
        { instruction: "Any IP with >20 attempts is a candidate for a temp block.", expected: "Ranked list of source IPs" },
      ],
    },
    challenge: { title: "Find the Persistence", prompt: "You suspect an attacker left a backdoor. Where are the four most common Linux persistence locations to check first?", hint: "cron, systemd, .bashrc, SUID binaries." },
    assessment: [
      { q: "chmod 755 file grants:", options: ["rwx to owner, rx to group and others", "rwx to everyone", "read only to group", "no permissions"], correct: 0, explanation: "7=rwx, 5=rx." },
      { q: "Which command shows listening TCP ports with owning process?", options: ["ls -la", "ss -tulpn", "cat /etc/passwd", "df -h"], correct: 1, explanation: "ss -tulpn is the modern netstat replacement." },
    ],
    summary: "You now have the muscle memory to open a Linux box and answer 'is this compromised?' in ten minutes.",
    interviewQuestions: ["Walk me through investigating a suspicious Linux host.", "What is the SUID bit and how is it abused?"],
    careers: ["SOC Analyst", "Incident Responder", "DFIR Analyst"],
  },
  {
    slug: "m1-s06-windows-fundamentals",
    number: 6,
    title: "Windows & Active Directory",
    subtitle: "The environment 90% of enterprises still run",
    duration: "90 min",
    day: 16,
    brief:
      "Enterprise networks are Windows. Every SOC analyst must read Event Viewer, understand a domain controller, and know why Kerberos matters.",
    objectives: [
      "Explain what Active Directory is and why it centralizes identity",
      "Read the four most important Windows Event IDs (4624, 4625, 4672, 4688)",
      "Name three common AD attacks (Kerberoasting, Golden Ticket, DCSync)",
      "Understand the difference between local and domain accounts",
    ],
    whyItMatters: "If you cannot read Windows logs, you cannot investigate 90% of enterprise incidents.",
    story: "The 2020 SolarWinds breach relied on forged SAML tokens — the modern evolution of a Golden Ticket attack.",
    visual: {
      kind: "layered",
      title: "Windows enterprise stack",
      nodes: [
        { id: "user", label: "User", caption: "Domain account" },
        { id: "wks", label: "Workstation", caption: "Windows 11" },
        { id: "dc", label: "Domain Controller", caption: "Kerberos · LDAP" },
        { id: "svc", label: "Services", caption: "SPNs · service accounts" },
        { id: "data", label: "File Shares", caption: "SMB · NTFS ACLs" },
      ],
    },
    enterprise: {
      where: "Every Fortune 500 has AD. Azure AD (Entra ID) is the cloud sibling.",
      business: "AD centralizes identity — one compromise there is game over.",
      attacker: "Attackers dump credentials from LSASS and forge Kerberos tickets.",
      defender: "Defenders enforce tiered admin, LAPS, and monitor Event ID 4672.",
      incident: "Any 4624 login of a domain admin from a workstation is a red flag.",
    },
    concepts: [
      { term: "Kerberos", definition: "AD's ticket-based auth protocol." },
      { term: "SID", definition: "Security Identifier — the real name of an AD principal." },
      { term: "GPO", definition: "Group Policy Object — pushes config to domain-joined machines." },
      { term: "LSASS", definition: "The Windows process that stores credentials in memory; attacker favorite." },
    ],
    guidedLab: {
      title: "Read the Windows security log",
      goal: "Identify successful and failed logons.",
      steps: [
        { instruction: "In Event Viewer, open Security log." },
        { instruction: "Filter for Event ID 4624 (success) and 4625 (failure)." },
        { instruction: "Note the Logon Type field — 3 is network, 10 is RDP.", expected: "You can tell how each user reached the box" },
      ],
    },
    challenge: { title: "The Golden Ticket", prompt: "Explain in plain English how a Golden Ticket attack works and one detection that catches it.", hint: "krbtgt hash + forged TGT. Detect via 4769 with weird encryption type." },
    assessment: [
      { q: "Event ID 4624 means:", options: ["Failed logon", "Successful logon", "Account lockout", "Privilege escalation"], correct: 1, explanation: "4624 = successful logon; 4625 = failed." },
      { q: "Kerberoasting attacks:", options: ["Domain controllers directly", "Service Principal Names (SPNs)", "Firewall rules", "DNS servers"], correct: 1, explanation: "SPN tickets can be cracked offline." },
    ],
    summary: "You can now navigate a Windows domain, read its logs, and reason about its top attacks.",
    interviewQuestions: ["What is Kerberos and how is it attacked?", "What is LSASS and why do attackers target it?"],
    careers: ["SOC Analyst", "AD Security Engineer", "Blue Team"],
  },
  {
    slug: "m1-s07-enterprise-infrastructure",
    number: 7,
    title: "Enterprise Infrastructure — Cloud, On-Prem, Hybrid",
    subtitle: "Where workloads actually live in 2026",
    duration: "90 min",
    day: 20,
    brief:
      "Modern enterprises are hybrid. Today you learn how workloads distribute across AWS, Azure, GCP, on-prem data centers, and SaaS — and where the security surface changes at each boundary.",
    objectives: [
      "Explain the shared responsibility model",
      "Distinguish IaaS, PaaS, SaaS at a security level",
      "Name three cloud-native security services (GuardDuty, Defender, Security Command Center)",
      "Recognize the most common misconfigurations (open S3, permissive IAM, exposed keys)",
    ],
    whyItMatters: "The single biggest source of cloud breaches is misconfiguration — the customer's responsibility, always.",
    story: "The Capital One 2019 breach was a cloud misconfig. So was 2017 Verizon. So was 2020 Twitter. The trend is not slowing.",
    visual: {
      kind: "flow",
      title: "The shared responsibility split",
      nodes: [
        { id: "aws", label: "AWS", caption: "Physical + hypervisor" },
        { id: "cust", label: "Customer", caption: "IAM · Data · Network config" },
        { id: "saas", label: "SaaS", caption: "Provider owns almost everything" },
      ],
    },
    enterprise: {
      where: "AWS/Azure/GCP for compute; Okta/Auth0 for identity; SaaS for productivity.",
      business: "Cloud speed comes with cloud misconfiguration risk.",
      attacker: "Attackers scan for public S3, exposed keys in GitHub, and permissive IAM policies.",
      defender: "Defenders enable CSPM tooling, rotate keys, and enforce least-privilege IAM.",
      incident: "Any public S3 bucket with PII inside it.",
    },
    concepts: [
      { term: "Shared Responsibility", definition: "Provider secures the cloud; customer secures what they put in it." },
      { term: "IAM", definition: "Identity & Access Management — the cloud's real perimeter." },
      { term: "CSPM", definition: "Cloud Security Posture Management — detects misconfigurations continuously." },
    ],
    guidedLab: {
      title: "Find the misconfig",
      goal: "Given a sample AWS IAM policy, identify the over-privileged action.",
      steps: [
        { instruction: "Open sample-policy.json." },
        { instruction: "Spot the '*' in Action or Resource." },
        { instruction: "Rewrite it with least privilege.", expected: "Specific actions, specific ARNs" },
      ],
    },
    challenge: { title: "Public Bucket", prompt: "A dev accidentally makes an S3 bucket public. You have 15 minutes before it hits Twitter. What three actions do you take, in order?", hint: "Revoke ACL → assess exposure → notify legal." },
    assessment: [
      { q: "In the shared responsibility model, who secures the underlying hypervisor?", options: ["Customer", "Cloud provider", "Auditor", "SOC"], correct: 1, explanation: "Provider secures OF the cloud; you secure IN the cloud." },
      { q: "Which is the cloud's real perimeter?", options: ["Firewalls", "VPNs", "IAM", "TLS"], correct: 2, explanation: "In cloud, identity is the new perimeter." },
    ],
    summary: "You now understand the cloud's most dangerous surface: misconfiguration.",
    interviewQuestions: ["Explain the shared responsibility model.", "What is the most common cause of cloud breaches?"],
    careers: ["Cloud Security Analyst", "DevSecOps", "CSPM Engineer"],
  },
  {
    slug: "m1-s08-checkpoint",
    number: 8,
    title: "Checkpoint — 'I can map this network'",
    subtitle: "End of Month 1 — assemble what you learned",
    duration: "90 min",
    day: 28,
    brief:
      "Day 30. You should be able to read system logs, navigate Linux and Windows, and explain how a corporate network is laid out. Today you prove it.",
    objectives: [
      "Assemble a network diagram of a fictional enterprise",
      "Trace a phishing incident from email delivery to endpoint compromise",
      "Justify three security controls in business language",
      "Complete a 20-question comprehensive assessment",
    ],
    whyItMatters: "This is your first portfolio artifact and your first interview story.",
    story: "Every hiring manager asks: 'Walk me through an environment you understand.' Today you build that answer.",
    visual: {
      kind: "flow",
      title: "Your Month 1 knowledge stack",
      nodes: [
        { id: "biz", label: "Business", caption: "Session 1-2" },
        { id: "data", label: "Data", caption: "Session 3" },
        { id: "net", label: "Network", caption: "Session 4" },
        { id: "linux", label: "Linux", caption: "Session 5" },
        { id: "win", label: "Windows", caption: "Session 6" },
        { id: "cloud", label: "Cloud", caption: "Session 7" },
      ],
    },
    enterprise: {
      where: "You now speak the language every SOC interview uses.",
      business: "You can defend controls in dollars, not jargon.",
      attacker: "You know the seven most common initial-access paths.",
      defender: "You know the seven most common early-detection points.",
      incident: "Your first tabletop exercise is next month.",
    },
    concepts: [
      { term: "Enterprise Fluency", definition: "The ability to describe a company's tech, data, and controls in 5 minutes." },
    ],
    guidedLab: {
      title: "Build your network diagram",
      goal: "Produce a one-page diagram of a fictional 200-person company.",
      steps: [
        { instruction: "Draw: internet edge, DMZ, corp LAN, server VLAN, DB VLAN, cloud VPC." },
        { instruction: "Label each trust boundary." },
        { instruction: "Mark where you would place: firewall, IDS, SIEM agent, WAF, MFA." },
      ],
    },
    challenge: { title: "The Interview Story", prompt: "In 90 seconds, describe an enterprise you understand and the top three security concerns it faces.", hint: "Business first, then tech, then controls." },
    assessment: [
      { q: "The CIA triad stands for:", options: ["Central Intelligence Agency", "Confidentiality, Integrity, Availability", "Compliance, Insurance, Audit", "Cyber, Info, Access"], correct: 1, explanation: "The three security properties." },
      { q: "Cloud's real perimeter is:", options: ["Firewall", "VPN", "Identity (IAM)", "TLS"], correct: 2, explanation: "Identity is the new perimeter." },
      { q: "TCP handshake:", options: ["ACK/SYN/SYN-ACK", "SYN/SYN-ACK/ACK", "SYN/ACK", "SYN/FIN/ACK"], correct: 1, explanation: "SYN → SYN-ACK → ACK." },
    ],
    summary: "Month 1 complete. You are enterprise-fluent. Month 2 turns you into a SOC analyst.",
    interviewQuestions: ["Walk me through an enterprise network.", "What is your favorite log source and why?"],
    careers: ["SOC Analyst L1", "Junior Security Analyst"],
  },
];

export const PROGRAM_MONTHS = [
  { number: 1, title: "Fundamentals", subtitle: "OS, networking, Linux, Windows, cloud", days: "Day 1 → 30", status: "active" as const, sessionCount: MONTH_1.length },
  { number: 2, title: "SOC Analyst", subtitle: "Detect, investigate, respond", days: "Day 31 → 60", status: "locked" as const, sessionCount: 8 },
  { number: 3, title: "Ethical Hacking", subtitle: "Attacker methodology", days: "Day 61 → 90", status: "locked" as const, sessionCount: 8 },
  { number: 4, title: "VAPT & Projects", subtitle: "Real assessments and portfolio", days: "Day 91 → 120", status: "locked" as const, sessionCount: 8 },
];

export function getSession(slug: string): Session | undefined {
  return MONTH_1.find((s) => s.slug === slug);
}
