export type CehModule = {
  slug: string;
  number: number;
  title: string;
  domain: string;
  duration: string;
  brief: string;
  objectives: string[];
  tools: string[];
  mitre: string[];
};

export const CEHV13_MODULES: CehModule[] = [
  {
    slug: "01-intro-ethical-hacking",
    number: 1,
    title: "Introduction to Ethical Hacking",
    domain: "Foundations",
    duration: "45 min",
    brief:
      "Information security fundamentals, hacker classes, the cyber kill chain, and legal / regulatory context for the ethical hacker.",
    objectives: [
      "Define ethical hacking and its scope",
      "Walk the cyber kill chain and MITRE ATT&CK",
      "Understand laws, standards, and rules of engagement",
    ],
    tools: ["N/A — conceptual"],
    mitre: ["Reconnaissance", "Resource Development"],
  },
  {
    slug: "02-footprinting-recon",
    number: 2,
    title: "Footprinting and Reconnaissance",
    domain: "Reconnaissance",
    duration: "60 min",
    brief:
      "Passive and active intelligence gathering — WHOIS, DNS, OSINT, social media, and search-engine dorking against a target.",
    objectives: [
      "Perform passive OSINT without touching the target",
      "Enumerate DNS, WHOIS, and subdomains",
      "Build a target profile from public data",
    ],
    tools: ["whois", "dig", "theHarvester", "Shodan", "Google Dorks"],
    mitre: ["Reconnaissance (TA0043)"],
  },
  {
    slug: "03-scanning-networks",
    number: 3,
    title: "Scanning Networks",
    domain: "Reconnaissance",
    duration: "60 min",
    brief: "Host discovery, port scanning, service and OS fingerprinting with Nmap.",
    objectives: [
      "Discover live hosts on a network",
      "Identify open ports, services, and versions",
      "Evade basic IDS/IPS during scans",
    ],
    tools: ["nmap", "masscan", "hping3", "Zenmap"],
    mitre: ["Discovery (TA0007)"],
  },
  {
    slug: "04-enumeration",
    number: 4,
    title: "Enumeration",
    domain: "Reconnaissance",
    duration: "50 min",
    brief:
      "Extract usernames, shares, services, and configuration data from SMB, NetBIOS, LDAP, SNMP, and DNS.",
    objectives: [
      "Enumerate SMB, LDAP, SNMP, and DNS safely",
      "Identify default and weak configurations",
      "Turn enumeration output into an attack plan",
    ],
    tools: ["enum4linux", "ldapsearch", "snmpwalk", "smbclient"],
    mitre: ["Discovery (TA0007)"],
  },
  {
    slug: "05-vulnerability-analysis",
    number: 5,
    title: "Vulnerability Analysis",
    domain: "Assessment",
    duration: "55 min",
    brief:
      "Identify, classify, and prioritize weaknesses. CVSS scoring, CVE lookup, and scanner-driven assessment.",
    objectives: [
      "Run and read a vulnerability scan",
      "Apply CVSS to prioritise findings",
      "Correlate CVEs with the target environment",
    ],
    tools: ["Nessus", "OpenVAS", "Nikto", "NVD"],
    mitre: ["Discovery", "Resource Development"],
  },
  {
    slug: "06-system-hacking",
    number: 6,
    title: "System Hacking",
    domain: "Exploitation",
    duration: "70 min",
    brief:
      "Gain access, escalate privileges, maintain access, and cover tracks on Windows and Linux hosts.",
    objectives: [
      "Crack and reuse credentials",
      "Escalate privileges on Windows and Linux",
      "Establish persistence and defensive evasion",
    ],
    tools: ["Metasploit", "Mimikatz", "hashcat", "PsExec"],
    mitre: ["Initial Access", "Privilege Escalation", "Persistence"],
  },
  {
    slug: "07-malware-threats",
    number: 7,
    title: "Malware Threats",
    domain: "Exploitation",
    duration: "55 min",
    brief:
      "Trojans, viruses, worms, ransomware, fileless malware, and modern analysis techniques.",
    objectives: [
      "Classify malware families and behaviours",
      "Run static and dynamic analysis safely",
      "Extract IOCs and TTPs",
    ],
    tools: ["VirusTotal", "PEStudio", "CAPE", "Cuckoo"],
    mitre: ["Execution", "Defense Evasion", "Impact"],
  },
  {
    slug: "08-sniffing",
    number: 8,
    title: "Sniffing",
    domain: "Network Attacks",
    duration: "50 min",
    brief:
      "Capture and inspect network traffic. ARP spoofing, MAC flooding, DHCP attacks, and detection.",
    objectives: [
      "Capture traffic with Wireshark and tcpdump",
      "Perform and defend against ARP/DHCP spoofing",
      "Extract credentials and metadata from PCAPs",
    ],
    tools: ["Wireshark", "tcpdump", "Ettercap", "Bettercap"],
    mitre: ["Credential Access", "Collection"],
  },
  {
    slug: "09-social-engineering",
    number: 9,
    title: "Social Engineering",
    domain: "Human Attacks",
    duration: "45 min",
    brief:
      "Phishing, pretexting, vishing, and physical intrusion. The human is the softest boundary.",
    objectives: [
      "Design a phishing campaign safely and ethically",
      "Detect and analyse phishing headers",
      "Design controls that reduce human risk",
    ],
    tools: ["GoPhish", "SET", "MailSniper"],
    mitre: ["Initial Access — Phishing"],
  },
  {
    slug: "10-denial-of-service",
    number: 10,
    title: "Denial-of-Service",
    domain: "Availability Attacks",
    duration: "45 min",
    brief:
      "Volumetric, protocol, and application-layer DDoS. Mitigation with rate-limiting, scrubbing, and CDN.",
    objectives: [
      "Distinguish DoS vs. DDoS vectors",
      "Identify amplification and reflection attacks",
      "Design a DDoS-resilient architecture",
    ],
    tools: ["hping3", "LOIC (lab only)", "Cloudflare / AWS Shield"],
    mitre: ["Impact — Endpoint DoS / Network DoS"],
  },
  {
    slug: "11-session-hijacking",
    number: 11,
    title: "Session Hijacking",
    domain: "Web & Network",
    duration: "45 min",
    brief:
      "Steal or predict session identifiers. Fixation, sidejacking, and modern token-based mitigations.",
    objectives: [
      "Explain session identifiers and lifecycles",
      "Perform sidejacking in a lab context",
      "Apply HttpOnly, Secure, SameSite, and rotation",
    ],
    tools: ["Burp Suite", "OWASP ZAP", "Wireshark"],
    mitre: ["Credential Access", "Lateral Movement"],
  },
  {
    slug: "12-evading-ids-firewalls-honeypots",
    number: 12,
    title: "Evading IDS, Firewalls, and Honeypots",
    domain: "Defense Evasion",
    duration: "50 min",
    brief:
      "How attackers slip past perimeter and detection controls, and how defenders instrument to catch them.",
    objectives: [
      "Fragment, tunnel, and obfuscate traffic",
      "Recognise honeypots and canaries",
      "Tune detection rules to reduce evasion",
    ],
    tools: ["Snort", "Suricata", "Zeek", "iptables"],
    mitre: ["Defense Evasion (TA0005)"],
  },
  {
    slug: "13-hacking-web-servers",
    number: 13,
    title: "Hacking Web Servers",
    domain: "Web",
    duration: "55 min",
    brief:
      "Attack Apache, Nginx, and IIS at the server layer. Misconfig, path traversal, and default creds.",
    objectives: [
      "Fingerprint web-server versions and modules",
      "Exploit known server-side misconfigurations",
      "Harden a web server checklist-style",
    ],
    tools: ["Nikto", "gobuster", "curl", "Metasploit"],
    mitre: ["Initial Access — Exploit Public-Facing Application"],
  },
  {
    slug: "14-hacking-web-applications",
    number: 14,
    title: "Hacking Web Applications",
    domain: "Web",
    duration: "70 min",
    brief:
      "The OWASP Top 10 in practice — broken access control, injection, SSRF, XSS, IDOR, and beyond.",
    objectives: [
      "Test for the OWASP Top 10 methodically",
      "Chain vulnerabilities into a full exploit",
      "Write high-quality remediation advice",
    ],
    tools: ["Burp Suite", "OWASP ZAP", "ffuf", "sqlmap"],
    mitre: ["Initial Access", "Execution", "Collection"],
  },
  {
    slug: "15-sql-injection",
    number: 15,
    title: "SQL Injection",
    domain: "Web",
    duration: "55 min",
    brief:
      "Classic, blind, time-based, and out-of-band SQLi. Data exfiltration, auth bypass, and defence.",
    objectives: [
      "Detect SQLi manually and with tools",
      "Exfiltrate data from blind SQLi",
      "Apply parameterisation and least-privilege",
    ],
    tools: ["sqlmap", "Burp Suite"],
    mitre: ["Initial Access — Exploit Public-Facing App"],
  },
  {
    slug: "16-hacking-wireless-networks",
    number: 16,
    title: "Hacking Wireless Networks",
    domain: "Network Attacks",
    duration: "55 min",
    brief:
      "WEP, WPA2, WPA3, PMKID and evil-twin attacks. Enterprise 802.1X and mitigations.",
    objectives: [
      "Capture WPA handshakes",
      "Attack PMKID and PSK weaknesses",
      "Design a defensible enterprise Wi-Fi",
    ],
    tools: ["aircrack-ng", "hcxdumptool", "hashcat", "Wireshark"],
    mitre: ["Initial Access — Wireless Compromise"],
  },
  {
    slug: "17-hacking-mobile-platforms",
    number: 17,
    title: "Hacking Mobile Platforms",
    domain: "Mobile",
    duration: "55 min",
    brief:
      "Android and iOS attack surfaces — insecure storage, IPC, permissions, and MDM bypass.",
    objectives: [
      "Reverse-engineer an APK safely",
      "Test mobile app IPC and storage",
      "Advise on MAM/MDM controls",
    ],
    tools: ["MobSF", "Frida", "Objection", "adb"],
    mitre: ["Initial Access — Supply Chain / Mobile"],
  },
  {
    slug: "18-iot-ot-hacking",
    number: 18,
    title: "IoT and OT Hacking",
    domain: "IoT / OT",
    duration: "50 min",
    brief:
      "Attack surfaces of IoT devices and industrial control systems. Modbus, MQTT, firmware, and safety.",
    objectives: [
      "Enumerate IoT devices on a network",
      "Analyse firmware for hardcoded secrets",
      "Understand OT safety boundaries",
    ],
    tools: ["binwalk", "firmware-mod-kit", "Shodan", "PLCscan"],
    mitre: ["Initial Access — IoT"],
  },
  {
    slug: "19-cloud-computing",
    number: 19,
    title: "Cloud Computing",
    domain: "Cloud",
    duration: "60 min",
    brief:
      "AWS, Azure, and GCP threat models — IAM abuse, S3 misconfig, container escape, and cloud IR.",
    objectives: [
      "Enumerate a cloud account safely",
      "Exploit IAM misconfigurations",
      "Design cloud-native detections",
    ],
    tools: ["Pacu", "ScoutSuite", "CloudMapper", "Prowler"],
    mitre: ["Initial Access — Cloud", "Privilege Escalation"],
  },
  {
    slug: "20-cryptography",
    number: 20,
    title: "Cryptography",
    domain: "Foundations",
    duration: "55 min",
    brief:
      "Symmetric, asymmetric, hashing, PKI, and TLS. Attacks: padding oracles, downgrade, misuse.",
    objectives: [
      "Choose the right primitive for a use case",
      "Recognise crypto misuse and downgrade risk",
      "Explain PKI and certificate validation end-to-end",
    ],
    tools: ["openssl", "hashcat", "CyberChef"],
    mitre: ["Credential Access", "Defense Evasion"],
  },
];

export function getCehModule(slug: string): CehModule | undefined {
  return CEHV13_MODULES.find((m) => m.slug === slug);
}
