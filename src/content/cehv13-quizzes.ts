export type Question = {
  q: string;
  options: string[];
  answer: number; // 0-indexed correct option index
  explain: string;
};

export const CEH_QUIZZES: Record<string, Question[]> = {
  "01-intro-ethical-hacking": [
    {
      q: "What is the key differentiator between an ethical hacker and a malicious cracker?",
      options: [
        "The specific hacking tools they utilize",
        "The level of programming language mastery",
        "Written authorization, scope alignment, and defensive intent",
        "The operating system they perform attacks from",
      ],
      answer: 2,
      explain:
        "Ethical hackers must have formal authorization (rules of engagement) and operate with the intent to discover and report vulnerabilities to secure the target.",
    },
    {
      q: "Which phase of the Cyber Kill Chain focuses on pairing exploit payloads with delivery vectors like email attachments?",
      options: ["Reconnaissance", "Weaponization", "Delivery", "Exploitation"],
      answer: 1,
      explain:
        "Weaponization involves coupling software exploits with Trojans or delivery packages to construct a payload ready for transmission.",
    },
  ],
  "02-footprinting-recon": [
    {
      q: "Which technique is classified as passive footprinting?",
      options: [
        "Requesting a DNS Zone Transfer (AXFR)",
        "Querying public WHOIS databases and search engine indices",
        "Scanning target systems with Nmap TCP Connect",
        "Sending traceroute packets directly to target gateways",
      ],
      answer: 1,
      explain:
        "Passive footprinting involves gathering public information without direct interaction or traffic exchange with the target's network interfaces.",
    },
    {
      q: "What does the Google Dork operator 'filetype:xls site:target.com' accomplish?",
      options: [
        "It scans target.com for SQL injection flaws in spreadsheets",
        "It searches for Excel files hosted on target.com exposed to public search indexers",
        "It downloads all emails associated with target.com",
        "It brute-forces files on target.com using xls wordlists",
      ],
      answer: 1,
      explain:
        "The operator 'site:' restricts search to target.com and 'filetype:' filters files to the Excel (.xls) format, which often contain sensitive tables or configurations.",
    },
  ],
  "03-scanning-networks": [
    {
      q: "Which Nmap scan flag performs a 'Stealth SYN' scan, leaving connections half-open to avoid full logging?",
      options: ["-sT", "-sS", "-sU", "-sX"],
      answer: 1,
      explain:
        "The -sS flag runs a TCP SYN (stealth) scan. It sends a SYN packet and awaits a SYN/ACK, but sends a RST packet instead of an ACK to prevent establishing a full connection.",
    },
    {
      q: "If a port scanner sends a TCP SYN packet to a closed port on a target host, what response should it receive under RFC standard behavior?",
      options: [
        "No response (timeout)",
        "A TCP SYN/ACK packet",
        "A TCP RST/ACK packet",
        "An ICMP Host Unreachable packet",
      ],
      answer: 2,
      explain:
        "Active closed ports respond with a RST (Reset) packet with ACK flag set to signal that they are not listening for incoming connections.",
    },
  ],
  "04-enumeration": [
    {
      q: "Which tool is specifically designed to perform deep query enumeration against Windows domain controllers using NetBIOS/SMB?",
      options: ["nikto", "enum4linux", "hydra", "john"],
      answer: 1,
      explain:
        "enum4linux is a perl script wrapper around Samba tools (smbclient, rpclient, net) used to query details from Windows/Samba systems.",
    },
    {
      q: "Why is SNMP enumeration highly valuable to an adversary during the discovery phase?",
      options: [
        "It automatically decrypts local filesystems on target nodes",
        "It yields system uptime, routing tables, active network interfaces, and device details if community strings are weak",
        "It executes commands directly in kernel-space",
        "It bypasses all network-layer firewalls by default",
      ],
      answer: 1,
      explain:
        "Simple Network Management Protocol (SNMP) using default community strings ('public' or 'private') lets attackers pull rich system metrics and device topologies.",
    },
  ],
  "05-vulnerability-analysis": [
    {
      q: "What CVSS score range designates a vulnerability of 'High' severity according to the standard CVSS v3 rating scale?",
      options: ["4.0 – 6.9", "7.0 – 8.9", "9.0 – 10.0", "0.1 – 3.9"],
      answer: 1,
      explain: "In CVSS v3: Medium is 4.0-6.9, High is 7.0-8.9, and Critical is 9.0-10.0.",
    },
    {
      q: "What is the primary difference between a vulnerability assessment and a penetration test?",
      options: [
        "Vulnerability assessment exploits systems; penetration testing only lists them",
        "Vulnerability assessment focuses on listing and prioritizing weaknesses; penetration testing exploits vulnerabilities to demonstrate real-world impact and paths",
        "Assessments do not utilize software tools",
        "Penetration testing is only performed by external compliance auditors",
      ],
      answer: 1,
      explain:
        "Assessments scan and index vulnerabilities; pentests actively exploit those issues to confirm access potential, lateral movement paths, and real risk.",
    },
  ],
  "06-system-hacking": [
    {
      q: "Which technique involves stealing stored Windows NTLM password hashes from memory or registries and using them to authenticate to other domain hosts without cracking them?",
      options: ["Brute Force", "Pass-the-Hash (PtH)", "Rainbow Table Lookup", "Dictionary Attack"],
      answer: 1,
      explain:
        "Pass-the-Hash lets attackers authenticate to remote servers using the raw LM or NTLM password hash instead of the plaintext password.",
    },
    {
      q: "What is the purpose of DLL Hijacking during system post-exploitation?",
      options: [
        "To bypass firewalls by injecting code into network packets",
        "To escalate privileges or run arbitrary payloads by placing malicious DLLs in directory search paths loaded by trusted programs",
        "To crack SAM database hashes locally",
        "To intercept keyboard keystrokes via hook API",
      ],
      answer: 1,
      explain:
        "Many Windows programs look for DLLs in their local application directory first. Placing a malicious DLL there allows hijack execution when the application launches.",
    },
  ],
  "07-malware-threats": [
    {
      q: "What characteristic distinguishes fileless malware from traditional malware infections?",
      options: [
        "It does not require execution privileges",
        "It runs exclusively in system memory using native tools like PowerShell or WMI, leaving no physical files on disk",
        "It can only attack Linux and Unix distributions",
        "It relies exclusively on physical USB delivery",
      ],
      answer: 1,
      explain:
        "Fileless malware leverages trusted, built-in system tools ('living off the land') to run payloads in memory, making it hard for signature-based AV to detect.",
    },
    {
      q: "Which analysis technique involves running malware inside a secure sandbox to monitor active file writes, registry changes, and network sockets?",
      options: [
        "Static Analysis",
        "Dynamic Analysis",
        "Heuristic Disassembly",
        "Source Code Auditing",
      ],
      answer: 1,
      explain:
        "Dynamic analysis runs the binary in a monitored virtual sandbox environment to observe its active behavioral telemetry in real-time.",
    },
  ],
  "08-sniffing": [
    {
      q: "How does ARP Poisoning work on a switched local area network?",
      options: [
        "By overloading the switch's MAC address lookup table to force it to act as a hub",
        "By broadcasting forged ARP replies linking the gateway IP to the attacker's MAC address, routing traffic through the attacker",
        "By flooding target ports with TCP SYN packets to disrupt service",
        "By altering DNS records cached on domain controllers",
      ],
      answer: 1,
      explain:
        "ARP Poisoning updates the ARP cache of the victim and gateway with spoofed mapping, routing local network packets through the attacker's interface (Man-in-the-Middle).",
    },
    {
      q: "What network state is induced when an attacker floods a switch with thousands of fake MAC addresses, exhausting its content-addressable memory (CAM)?",
      options: [
        "Broadcast Loop",
        "Fail-Secure lock",
        "Fail-Open (Hub/Sniffable) mode",
        "Interface Shutdown",
      ],
      answer: 2,
      explain:
        "When a switch's CAM table fills up, it enters fail-open mode. It broadcasts all incoming frames to every port, turning the switch into a hub and allowing passive sniffing.",
    },
  ],
  "09-social-engineering": [
    {
      q: "What term describes a highly targeted phishing attack customized to a specific individual or company using detailed background intelligence?",
      options: ["Vishing", "Spear Phishing", "Smishing", "Watering Hole"],
      answer: 1,
      explain:
        "Spear Phishing utilizes tailored details gathered from reconnaissance to trick specific targets, increasing the likelihood of successful deception.",
    },
    {
      q: "An attacker positions themselves near an office smoking area, strikes up a friendly chat with an employee, and follows closely behind them through a badge-secured door. What attack vector is this?",
      options: ["Tailgating / Piggybacking", "Pretexting", "Diversion Theft", "Shoulder Surfing"],
      answer: 0,
      explain:
        "Tailgating involves following an authorized person into a restricted physical area without authenticating, exploiting courtesy or distraction.",
    },
  ],
  "10-denial-of-service": [
    {
      q: "What is the primary mechanism of a DNS Amplification attack?",
      options: [
        "flooding target nameservers with recursive queries until they exhaust CPU",
        "sending small queries with a spoofed source IP (the victim) to open DNS resolvers, eliciting large response payloads sent to the victim",
        "cracking the target's DNS zone files to route visitors to blank servers",
        "corrupting DNS proxy caches across standard ISPs",
      ],
      answer: 1,
      explain:
        "DNS Amplification leverages DNS requests with spoofed victim source IPs and response enlargement techniques (like EDNS0) to overwhelm the victim's download bandwidth.",
    },
    {
      q: "Which DDoS mitigation control focuses on identifying and filtering out malicious packet streams at ISP ingress points before they reach the target data center?",
      options: ["Host firewalls", "Load balancers", "Traffic Scrubbing Services", "IDS signatures"],
      answer: 2,
      explain:
        "Scrubbing services route traffic through high-capacity globally distributed centers, filtering malicious packets (like volume floods) and forwarding only clean requests.",
    },
  ],
  "11-session-hijacking": [
    {
      q: "Which session cookie attribute prevents client-side scripting languages (like JavaScript) from reading or accessing session cookies, neutralizing basic XSS cookie theft?",
      options: ["Secure", "HttpOnly", "SameSite", "Domain Scope"],
      answer: 1,
      explain:
        "The HttpOnly flag blocks client-side scripts from reading the cookie value via `document.cookie`, preventing attackers from stealing session identifiers through cross-site scripting.",
    },
    {
      q: "What is the core difference between Session Hijacking and Session Fixation?",
      options: [
        "Fixation steals cookies during transport; Hijacking intercepts them at rest",
        "In Fixation, the attacker provides a known session identifier to the victim's browser and waits for them to log in; in Hijacking, the attacker steals an active session token after login",
        "Fixation only targets database session keys",
        "Hijacking relies on social engineering",
      ],
      answer: 1,
      explain:
        "Session Fixation forces a predetermined, valid session ID onto a victim's session, which the attacker can hijack once the victim authenticates.",
    },
  ],
  "12-evading-ids-firewalls-honeypots": [
    {
      q: "Which technique fragments IP packets into small segments to prevent signature matching in network intrusion detection sensors?",
      options: [
        "Session Splicing / Fragmentation",
        "Encryption tunneling",
        "Obfuscation encoding",
        "Proxy chaining",
      ],
      answer: 0,
      explain:
        "Fragmentation breaks packets down below the standard signature buffer size of simpler IDS sensors, forcing them to either reconstruct packets in memory or skip validation.",
    },
    {
      q: "What is the primary security goal of deploying a honeypot inside an enterprise environment?",
      options: [
        "To serve as a high-capacity backup database for disaster recovery",
        "To distract and trap attackers while generating high-fidelity alerts on unauthorized lateral movement",
        "To scan internal workstations for malware signatures",
        "To decrypt SSL/TLS network streams",
      ],
      answer: 1,
      explain:
        "Honeypots have no business purpose. Any interaction with them is immediately suspicious, generating high-fidelity alerts of unauthorized lateral movement.",
    },
  ],
  "13-hacking-web-servers": [
    {
      q: "Which web server misconfiguration allows an attacker to navigate outside the web root folder to read system files like '/etc/passwd'?",
      options: [
        "Directory Listing Enabled",
        "Path Traversal / Directory Traversal",
        "HTTP Parameter Pollution",
        "Insecure Direct Object Reference",
      ],
      answer: 1,
      explain:
        "Path traversal uses dot-dot-slash (`../`) syntax to step out of the designated document root directory and access arbitrary files on the local disk.",
    },
    {
      q: "Why is disabling default HTTP methods like PUT and DELETE a standard hardening practice for web servers?",
      options: [
        "They trigger buffer overflow vulnerabilities in SSL libraries",
        "They allow attackers to upload web shells or modify/delete existing web resources directly on the host file system",
        "They slow down page render times in browsers",
        "They expose database query ports",
      ],
      answer: 1,
      explain:
        "Leaving PUT or DELETE active allows unauthorized users to write files (like shell scripts) or delete pages if write permissions are misconfigured.",
    },
  ],
  "14-hacking-web-applications": [
    {
      q: "Which vulnerability allows an attacker to force a server-side application to make HTTP requests to internal backends or third-party APIs on its behalf?",
      options: [
        "Cross-Site Scripting (XSS)",
        "Server-Side Request Forgery (SSRF)",
        "Broken Object Level Authorization (BOLA)",
        "Cross-Site Request Forgery (CSRF)",
      ],
      answer: 1,
      explain:
        "SSRF occurs when an attacker manipulates parameters to force a web server to query internal systems (like metadata services or DBs) that are otherwise blocked from the public web.",
    },
    {
      q: "What type of Cross-Site Scripting (XSS) stores the exploit script on the target application's database, serving it to any visitor loading that page?",
      options: ["Reflected XSS", "Stored / Persistent XSS", "DOM-based XSS", "Blind XSS"],
      answer: 1,
      explain:
        "Stored XSS occurs when malicious scripts are permanently stored in databases (e.g., in a comment field) and rendered to other users.",
    },
  ],
  "15-sql-injection": [
    {
      q: "Which SQL Injection technique extracts data when a web page does not return database records or raw errors directly, but changes page output based on conditional True/False queries?",
      options: [
        "In-Band SQL Injection",
        "Boolean-Based Blind SQL Injection",
        "Union-Based SQL Injection",
        "Out-of-Band SQL Injection",
      ],
      answer: 1,
      explain:
        "Boolean Blind SQLi relies on asking the database true/false questions and analyzing whether the application returns a successful response or an error code.",
    },
    {
      q: "What is the most robust code-level defense against SQL Injection vulnerabilities?",
      options: [
        "Validating user input using blacklist filters",
        "Using parameterized queries (prepared statements) and binding parameters safely",
        "Enabling web application firewalls (WAF)",
        "Encrypting all table columns",
      ],
      answer: 1,
      explain:
        "Parameterized queries separate SQL commands from user input variables, ensuring the database engine treats input strictly as data rather than executable statements.",
    },
  ],
  "16-hacking-wireless-networks": [
    {
      q: "Which vulnerability in WPA2 allows attackers to capture and crack the four-way handshake offline using brute-force dictionaries?",
      options: [
        "WEP RC4 Key reuse",
        "Pre-Shared Key (PSK) offline cracking",
        "WPS PIN brute force",
        "KRACK (Key Reinstallation Attack)",
      ],
      answer: 1,
      explain:
        "WPA2 handshakes expose the MIC (Message Integrity Code). Intercepting this handshake lets attackers run dictionary attacks offline to crack the PSK.",
    },
    {
      q: "How does an Evil Twin attack work on public wireless networks?",
      options: [
        "By injecting exploits into target routers via command line",
        "By broadcasting a rogue access point with the exact SSID as a legitimate network, tricking devices into connecting automatically",
        "By spoofing MAC addresses of connected laptops",
        "By flooding standard channels with RF noise to disrupt connections",
      ],
      answer: 1,
      explain:
        "Evil Twin attacks mimic legitimate wireless SSIDs. Target devices connect to the rogue network automatically because of matching SSIDs and stronger signals, letting attackers intercept traffic.",
    },
  ],
  "17-hacking-mobile-platforms": [
    {
      q: "What is the primary security risk of sideloading mobile applications from untrusted sources?",
      options: [
        "It increases local battery drain",
        "It bypasses official app store security reviews, risking installation of modified applications bundled with spyware or remote access Trojans",
        "It invalidates local phone warranty files",
        "It causes mobile network disconnections",
      ],
      answer: 1,
      explain:
        "Sideloading bypasses app store sandboxing and security validations, exposing the OS to repackaged applications containing embedded malicious payloads.",
    },
    {
      q: "Which dynamic instrumentation toolkit allows attackers or reverse engineers to inject custom scripts into running mobile app processes to hook functions and bypass root checks?",
      options: ["ADB", "Frida", "APKTool", "MobSF"],
      answer: 1,
      explain:
        "Frida is a dynamic instrumentation toolkit that lets you inject snippets of JavaScript into native mobile application runtimes to hook APIs and inspect variables.",
    },
  ],
  "18-iot-ot-hacking": [
    {
      q: "What protocol is commonly used in industrial control system (ICS) environments for serial communication between PLCs, often lacking built-in encryption or authentication?",
      options: ["MQTT", "Modbus", "Zigbee", "CoAP"],
      answer: 1,
      explain:
        "Modbus was designed for simple serial communications. It does not include authentication, authorization, or encryption, making it vulnerable to injection attacks if accessed.",
    },
    {
      q: "Why is firmware extraction valuable to an IoT hacker?",
      options: [
        "It speeds up network data transfers",
        "It allows analysis of file systems, extracting hardcoded admin passwords, API keys, certificates, and binary vulnerabilities",
        "It resets hardware device clocks",
        "It disables local physical relays",
      ],
      answer: 1,
      explain:
        "Extracting firmware lets attackers mount and explore the IoT device's root file system, uncovering configuration flaws and hardcoded credentials.",
    },
  ],
  "19-cloud-computing": [
    {
      q: "In the cloud shared responsibility model, which element is the customer (tenant) responsible for protecting in an Infrastructure-as-a-Service (IaaS) deployment?",
      options: [
        "Physical data center security",
        "Virtualization hypervisor software",
        "Operating systems, application configurations, and access management (IAM)",
        "Underlying storage drives and physical networking cabling",
      ],
      answer: 2,
      explain:
        "Under IaaS, providers secure physical systems, hypervisors, and infrastructure. Customers must secure the guest OS, configurations, data access, and IAM settings.",
    },
    {
      q: "What is the security risk of leaving an AWS S3 bucket configured with public 'ListBucket' permissions?",
      options: [
        "Anyone can overwrite all files in the bucket",
        "Anonymous users can list and discover all object names and structures, potentially exposing sensitive files to leaks or bulk downloads",
        "It deletes all logs from CloudTrail",
        "It exposes database master passwords",
      ],
      answer: 1,
      explain:
        "Public ListBucket access allows anonymous users to query bucket contents, enabling automated crawlers to discover and leak files.",
    },
  ],
  "20-cryptography": [
    {
      q: "Which algorithm class uses two keys (a public key for encryption and a private key for decryption)?",
      options: [
        "Symmetric Cryptography",
        "Asymmetric (Public Key) Cryptography",
        "Hashing Algorithms",
        "Key Stretching Functions",
      ],
      answer: 1,
      explain:
        "Asymmetric cryptography utilizes public/private key pairs. Anyone can encrypt using the public key, but only the corresponding private key holder can decrypt.",
    },
    {
      q: "What is the primary purpose of salting password hashes?",
      options: [
        "To encrypt password hashes during transport",
        "To append unique random data to passwords before hashing, neutralizing lookup matches using precomputed Rainbow Tables",
        "To speed up password verification checks on logins",
        "To compress long passwords into smaller payloads",
      ],
      answer: 1,
      explain:
        "Salting ensures identical passwords generate distinct hashes. This prevents lookup attacks and blocks attackers from using precomputed rainbow tables to crack passwords in bulk.",
    },
  ],
};
