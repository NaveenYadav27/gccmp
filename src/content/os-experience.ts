export const COMPANY = {
  name: "ShadowX Financial Corporation",
  employees: 42000,
  countries: 18,
  branches: 24,
  units: [
    "Retail Banking",
    "Corporate Banking",
    "Trading",
    "Finance",
    "Risk",
    "HR",
    "SOC",
    "NOC",
    "Cloud",
    "Infrastructure",
    "Application Support",
    "Security Operations",
  ],
};

export type TwinNode = {
  id: string;
  label: string;
  os: string;
  purpose: string;
  owner: string;
  services: string[];
  processes: string[];
  users: string[];
  controls: string[];
  attacks: string[];
  monitoring: string[];
};

export const TWIN: TwinNode[] = [
  {
    id: "internet",
    label: "Internet",
    os: "—",
    purpose: "Untrusted zone. All client & attacker traffic originates here.",
    owner: "External",
    services: ["HTTPS", "DNS", "SMTP"],
    processes: [],
    users: ["Customers", "Threat actors"],
    controls: ["Perimeter ACLs", "Threat intel feeds"],
    attacks: ["DDoS", "Credential stuffing", "Phishing"],
    monitoring: ["Edge NetFlow", "Passive DNS"],
  },
  {
    id: "fw",
    label: "Perimeter Firewall",
    os: "PAN-OS 11 (Linux-based)",
    purpose: "Stateful inspection between Internet and DMZ.",
    owner: "NOC · Network Security",
    services: ["Stateful FW", "IPS", "TLS decrypt"],
    processes: ["mgmtsrvr", "sysd", "logrcvr"],
    users: ["fwadmin", "readonly-audit"],
    controls: ["Zone policies", "GeoIP block", "IDS signatures"],
    attacks: ["Rule misconfig", "Mgmt-plane exposure"],
    monitoring: ["Traffic logs → SIEM", "Threat logs"],
  },
  {
    id: "dmz",
    label: "DMZ Segment",
    os: "Segmented VLAN",
    purpose: "Isolation zone for Internet-facing systems.",
    owner: "Infrastructure",
    services: ["Reverse proxy", "WAF"],
    processes: [],
    users: [],
    controls: ["Micro-segmentation", "East-west inspection"],
    attacks: ["Pivot from web tier"],
    monitoring: ["Zeek east-west taps"],
  },
  {
    id: "lb",
    label: "Load Balancer",
    os: "F5 TMOS (BSD-derived)",
    purpose: "Distributes client traffic to web pool.",
    owner: "Infrastructure",
    services: ["HTTPS VIP", "Health checks", "TLS offload"],
    processes: ["tmm", "mcpd", "bigd"],
    users: ["ltmadmin"],
    controls: ["iRules", "Rate limits"],
    attacks: ["Slowloris", "Cert misuse"],
    monitoring: ["VIP stats", "TCP resets"],
  },
  {
    id: "web",
    label: "Web Servers (web01-06)",
    os: "Ubuntu Server 22.04 LTS",
    purpose: "Serves shadowx-online.com retail banking portal.",
    owner: "Application Support",
    services: ["nginx 1.24", "auditd", "osquery"],
    processes: ["nginx", "systemd", "osqueryd", "sshd"],
    users: ["root", "www-data", "deploy"],
    controls: ["AppArmor", "UFW", "TLS 1.3 only"],
    attacks: ["Web shell drop", "SSRF"],
    monitoring: ["/var/log/nginx", "auditd → SIEM"],
  },
  {
    id: "app",
    label: "App Servers (app01-12)",
    os: "RHEL 9",
    purpose: "Java trading & payments microservices.",
    owner: "Trading · App Support",
    services: ["Tomcat 10", "systemd", "filebeat"],
    processes: ["java", "systemd", "filebeat", "sshd"],
    users: ["appsvc", "root", "deploy"],
    controls: ["SELinux enforcing", "mTLS between tiers"],
    attacks: ["Deserialization RCE", "Log4Shell class"],
    monitoring: ["JMX", "GC logs", "app.log"],
  },
  {
    id: "db",
    label: "Database Cluster (db01-04)",
    os: "Oracle Linux 9",
    purpose: "Core banking ledger — customer, account, ledger.",
    owner: "Finance · DBA",
    services: ["Oracle 19c RAC", "listener", "auditd"],
    processes: ["oracle", "tnslsnr", "ohasd"],
    users: ["oracle", "grid", "root"],
    controls: ["TDE", "Row-level audit", "Bastion-only access"],
    attacks: ["SQLi via app tier", "Credential theft"],
    monitoring: ["DB audit", "Query firewall"],
  },
  {
    id: "dc",
    label: "Domain Controllers (DC01-04)",
    os: "Windows Server 2022",
    purpose: "SHADOWX.LOCAL Active Directory forest root.",
    owner: "Infrastructure · Identity",
    services: ["AD DS", "DNS", "Kerberos KDC", "LDAP"],
    processes: ["lsass.exe", "ntds.exe", "svchost.exe", "dns.exe"],
    users: ["Administrator", "krbtgt", "Domain Admins"],
    controls: ["Tiered admin", "LAPS", "PAW workstations"],
    attacks: ["Kerberoasting", "DCSync", "Golden Ticket"],
    monitoring: ["4624/4625/4768/4769", "Sysmon → SIEM"],
  },
  {
    id: "file",
    label: "File Servers (fs01-08)",
    os: "Windows Server 2022",
    purpose: "SMB shares for HR, Legal, Trading research.",
    owner: "Infrastructure",
    services: ["SMB 3.1.1", "DFS-R", "FSRM"],
    processes: ["System", "svchost.exe", "smb.exe"],
    users: ["Domain Users", "fsadmin"],
    controls: ["NTFS ACL", "SMB signing", "FSRM ransomware canaries"],
    attacks: ["Ransomware encryption", "Data exfil"],
    monitoring: ["Event 5145", "FSRM alerts"],
  },
  {
    id: "laptops",
    label: "Employee Laptops (~42k)",
    os: "Windows 11 Enterprise",
    purpose: "Daily-driver endpoints for staff worldwide.",
    owner: "End User Computing",
    services: ["Intune MDM", "Defender for Endpoint", "Zscaler"],
    processes: ["explorer.exe", "svchost.exe", "MsMpEng.exe", "chrome.exe"],
    users: ["DOMAIN\\user", "SYSTEM"],
    controls: ["BitLocker", "ASR rules", "Conditional Access"],
    attacks: ["Phishing → macro", "Info-stealer", "Living-off-the-land"],
    monitoring: ["MDE telemetry", "Sysmon"],
  },
  {
    id: "linux",
    label: "Linux Servers (600+)",
    os: "Mixed: Ubuntu, RHEL, Debian",
    purpose: "Batch, ETL, risk models, container hosts.",
    owner: "Infrastructure · Cloud",
    services: ["docker/containerd", "cron", "sshd", "osquery"],
    processes: ["systemd", "dockerd", "cron", "sshd"],
    users: ["root", "svc-*", "sre"],
    controls: ["CIS hardening", "Falco", "Just-in-time SSH"],
    attacks: ["Crypto-miner drop", "SSH key theft", "Container escape"],
    monitoring: ["auditd", "Falco → SIEM"],
  },
  {
    id: "cloud",
    label: "Cloud (AWS + Azure)",
    os: "Amazon Linux 2023, AKS nodes",
    purpose: "Customer analytics, mobile-app backends, DR.",
    owner: "Cloud Platform",
    services: ["EKS", "RDS", "S3", "AKS", "Key Vault"],
    processes: ["kubelet", "containerd", "aws-node"],
    users: ["IAM roles", "workload identities"],
    controls: ["SCPs", "GuardDuty", "Private endpoints"],
    attacks: ["IMDSv1 SSRF", "Overly-permissive IAM"],
    monitoring: ["CloudTrail", "GuardDuty", "Azure Defender"],
  },
  {
    id: "soc",
    label: "SOC (Bengaluru + London)",
    os: "Analyst workstations · Win11",
    purpose: "24×7 monitoring, triage, response.",
    owner: "Security Operations",
    services: ["Splunk ES", "SOAR", "TIP"],
    processes: [],
    users: ["L1 analysts", "L2", "L3 hunters"],
    controls: ["Runbooks", "Playbooks", "MITRE-mapped detections"],
    attacks: ["Alert fatigue", "Insider misuse"],
    monitoring: ["SIEM dashboards", "Case queue"],
  },
  {
    id: "siem",
    label: "SIEM (Splunk ES)",
    os: "RHEL 9 indexer cluster",
    purpose: "Central log aggregation, correlation, detection.",
    owner: "Security Operations",
    services: ["indexers", "search heads", "forwarders"],
    processes: ["splunkd"],
    users: ["splunk", "soc-admin"],
    controls: ["RBAC", "Audit trail on SPL"],
    attacks: ["Log tampering", "Detection blind spots"],
    monitoring: ["Notable events", "Risk-based alerts"],
  },
];

export type OsConcept = {
  id: string;
  title: string;
  short: string;
  detail: string;
  enterprise: string;
};

export const CONCEPTS: OsConcept[] = [
  {
    id: "kernel",
    title: "Kernel",
    short: "Ring 0 — full hardware access.",
    detail:
      "The kernel manages CPU scheduling, memory, devices, and enforces the security boundary between processes.",
    enterprise:
      "A kernel exploit on a ShadowX trading app-server bypasses SELinux and turns a user-level RCE into full host compromise.",
  },
  {
    id: "user",
    title: "User Mode",
    short: "Ring 3 — sandboxed apps.",
    detail: "Applications run here and must ask the kernel via syscalls for privileged operations.",
    enterprise:
      "chrome.exe on an analyst laptop runs in user mode; it cannot read another user's memory without a kernel-mediated request.",
  },
  {
    id: "syscall",
    title: "System Calls",
    short: "The user↔kernel API.",
    detail:
      "open(), read(), execve(), NtCreateFile — every privileged action goes through a syscall.",
    enterprise:
      "Sysmon Event 1 on ShadowX endpoints captures every execve/CreateProcess syscall for SOC correlation.",
  },
  {
    id: "sched",
    title: "Scheduler",
    short: "Decides who runs next.",
    detail:
      "Preemptive multitasking gives each thread a time slice based on priority and fairness.",
    enterprise:
      "A runaway java thread on app07 starving the scheduler → latency spike on the trading API.",
  },
  {
    id: "process",
    title: "Processes",
    short: "An address space + threads.",
    detail: "Each process has its own virtual memory, file handles, and security token.",
    enterprise:
      "svchost.exe on a DC hosts dozens of Windows services; identifying which one matters for incident triage.",
  },
  {
    id: "thread",
    title: "Threads",
    short: "Units of execution.",
    detail: "Threads within a process share memory but have their own stack and registers.",
    enterprise:
      "Cobalt Strike beacons often inject a rogue thread into a legitimate process — Sysmon Event 8 catches this.",
  },
  {
    id: "memory",
    title: "Memory",
    short: "RAM layout per process.",
    detail: "Code, heap, stack, shared libs, kernel — each region has permissions (R/W/X).",
    enterprise:
      "A W+X region inside lsass.exe on DC01 is a strong indicator of credential-dump tooling.",
  },
  {
    id: "vmem",
    title: "Virtual Memory",
    short: "Isolation + paging.",
    detail: "MMU maps virtual pages to physical frames; pages can be swapped to disk.",
    enterprise:
      "hiberfil.sys and pagefile.sys on a ShadowX exec's laptop are forensic goldmines for IR.",
  },
  {
    id: "fs",
    title: "Filesystems",
    short: "How data is stored.",
    detail: "NTFS, ext4, xfs — journaling, ACLs, MFT/inodes track ownership and layout.",
    enterprise: "NTFS $MFT timestamps on file01 reveal timestomping by a ransomware actor.",
  },
  {
    id: "perm",
    title: "Permissions",
    short: "Who can do what.",
    detail: "POSIX rwx / NTFS ACL / SELinux label — enforced by the kernel on every access.",
    enterprise:
      "A world-writable /etc/cron.d file on a Linux batch host = privilege escalation to root.",
  },
  {
    id: "svc",
    title: "Services",
    short: "Long-running background daemons.",
    detail:
      "systemd on Linux, Services / svchost on Windows — start at boot, run under service accounts.",
    enterprise:
      "A rogue Windows service named 'WinDefendUpdater' persisting Cobalt Strike on a file server.",
  },
  {
    id: "drv",
    title: "Drivers",
    short: "Kernel-mode extensions.",
    detail: "Talk to hardware; a malicious signed driver = full kernel compromise (BYOVD).",
    enterprise:
      "BYOVD attacks disable Defender for Endpoint on ShadowX laptops before ransomware detonates.",
  },
  {
    id: "boot",
    title: "Boot Loader",
    short: "First code after firmware.",
    detail: "GRUB / Windows Boot Manager loads the kernel and initrd/BCD.",
    enterprise:
      "A bootkit on a laptop survives OS reinstall — Secure Boot + measured boot mitigate this.",
  },
  {
    id: "hw",
    title: "Hardware",
    short: "CPU, RAM, disks, NIC.",
    detail: "The OS abstracts hardware; the CPU enforces rings, the MMU enforces memory isolation.",
    enterprise: "TPM 2.0 on ShadowX laptops seals BitLocker keys to a known-good boot chain.",
  },
  {
    id: "bios",
    title: "BIOS / UEFI",
    short: "Firmware bootstrap.",
    detail: "UEFI supports Secure Boot, measured boot, and larger disks than legacy BIOS.",
    enterprise:
      "UEFI Secure Boot policy is enforced fleet-wide on ShadowX laptops via Intune baseline.",
  },
];

export type Proc = {
  pid: number;
  ppid: number;
  name: string;
  user: string;
  cpu: number;
  mem: number;
  signed: "Microsoft" | "Google" | "Adobe" | "ShadowX" | "Unsigned";
  status: "Running" | "Sleeping";
  suspicious?: string;
};

export const PROCESSES: Proc[] = [
  {
    pid: 4,
    ppid: 0,
    name: "System",
    user: "SYSTEM",
    cpu: 0.4,
    mem: 180,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 612,
    ppid: 4,
    name: "smss.exe",
    user: "SYSTEM",
    cpu: 0.0,
    mem: 12,
    signed: "Microsoft",
    status: "Sleeping",
  },
  {
    pid: 780,
    ppid: 612,
    name: "csrss.exe",
    user: "SYSTEM",
    cpu: 0.1,
    mem: 24,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 812,
    ppid: 612,
    name: "wininit.exe",
    user: "SYSTEM",
    cpu: 0.0,
    mem: 18,
    signed: "Microsoft",
    status: "Sleeping",
  },
  {
    pid: 904,
    ppid: 812,
    name: "services.exe",
    user: "SYSTEM",
    cpu: 0.2,
    mem: 42,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 928,
    ppid: 812,
    name: "lsass.exe",
    user: "SYSTEM",
    cpu: 0.3,
    mem: 62,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 1120,
    ppid: 904,
    name: "svchost.exe",
    user: "NETWORK SERVICE",
    cpu: 0.5,
    mem: 88,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 1240,
    ppid: 904,
    name: "svchost.exe",
    user: "LOCAL SERVICE",
    cpu: 0.2,
    mem: 66,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 1388,
    ppid: 904,
    name: "MsMpEng.exe",
    user: "SYSTEM",
    cpu: 2.1,
    mem: 320,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 2044,
    ppid: 1120,
    name: "svchost.exe",
    user: "SYSTEM",
    cpu: 0.4,
    mem: 44,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 3120,
    ppid: 2044,
    name: "powershell.exe",
    user: "SHADOWX\\e.morris",
    cpu: 18.4,
    mem: 210,
    signed: "Microsoft",
    status: "Running",
    suspicious: "Spawned by svchost — not a normal parent. Encoded command line.",
  },
  {
    pid: 3444,
    ppid: 3120,
    name: "rundll32.exe",
    user: "SHADOWX\\e.morris",
    cpu: 6.8,
    mem: 96,
    signed: "Microsoft",
    status: "Running",
    suspicious: "Loaded from %TEMP%. Outbound TCP:443 to 185.94.111.1.",
  },
  {
    pid: 4102,
    ppid: 1240,
    name: "explorer.exe",
    user: "SHADOWX\\e.morris",
    cpu: 0.7,
    mem: 140,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 4520,
    ppid: 4102,
    name: "chrome.exe",
    user: "SHADOWX\\e.morris",
    cpu: 3.1,
    mem: 620,
    signed: "Google",
    status: "Running",
  },
  {
    pid: 4780,
    ppid: 4102,
    name: "OUTLOOK.EXE",
    user: "SHADOWX\\e.morris",
    cpu: 1.2,
    mem: 410,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 5210,
    ppid: 4102,
    name: "Teams.exe",
    user: "SHADOWX\\e.morris",
    cpu: 2.4,
    mem: 380,
    signed: "Microsoft",
    status: "Running",
  },
  {
    pid: 6600,
    ppid: 4102,
    name: "updater.tmp",
    user: "SHADOWX\\e.morris",
    cpu: 11.2,
    mem: 42,
    signed: "Unsigned",
    status: "Running",
    suspicious: "Unsigned binary in %TEMP%\\updater.tmp. High CPU, no vendor.",
  },
];

export type FsEntry = {
  name: string;
  kind: "dir" | "file";
  owner: string;
  perm: string;
  note?: string;
};
export type Fs = { os: "Windows" | "Linux" | "Mac"; root: string; tree: Record<string, FsEntry[]> };

export const FILESYSTEMS: Fs[] = [
  {
    os: "Windows",
    root: "C:\\",
    tree: {
      "C:\\": [
        {
          name: "Windows",
          kind: "dir",
          owner: "SYSTEM",
          perm: "RX (Users)",
          note: "OS binaries. Read-only for users.",
        },
        { name: "Program Files", kind: "dir", owner: "SYSTEM", perm: "RX (Users)" },
        { name: "Users", kind: "dir", owner: "SYSTEM", perm: "RX (Users)" },
        {
          name: "ProgramData",
          kind: "dir",
          owner: "SYSTEM",
          perm: "M (Users)",
          note: "Often abused for persistence — watch for scripts here.",
        },
      ],
      "C:\\Windows": [
        {
          name: "System32",
          kind: "dir",
          owner: "TrustedInstaller",
          perm: "RX",
          note: "Core OS. lsass.exe, svchost.exe live here.",
        },
        {
          name: "Temp",
          kind: "dir",
          owner: "SYSTEM",
          perm: "M",
          note: "Cleanup target. Attacker drop zone.",
        },
        { name: "Logs", kind: "dir", owner: "SYSTEM", perm: "R" },
      ],
      "C:\\Users": [
        { name: "e.morris", kind: "dir", owner: "SHADOWX\\e.morris", perm: "F (owner)" },
        { name: "Public", kind: "dir", owner: "SYSTEM", perm: "M (Users)" },
      ],
      "C:\\Users\\e.morris": [
        { name: "Desktop", kind: "dir", owner: "SHADOWX\\e.morris", perm: "F" },
        {
          name: "AppData",
          kind: "dir",
          owner: "SHADOWX\\e.morris",
          perm: "F",
          note: "Local/Roaming — malware persistence via Startup or scheduled tasks.",
        },
        { name: "trading-model.xlsx", kind: "file", owner: "SHADOWX\\e.morris", perm: "F" },
      ],
    },
  },
  {
    os: "Linux",
    root: "/",
    tree: {
      "/": [
        { name: "etc", kind: "dir", owner: "root", perm: "755", note: "System configuration." },
        { name: "var", kind: "dir", owner: "root", perm: "755", note: "Logs, spool, mail." },
        { name: "home", kind: "dir", owner: "root", perm: "755" },
        {
          name: "tmp",
          kind: "dir",
          owner: "root",
          perm: "1777",
          note: "Sticky bit. Common attacker staging area.",
        },
        { name: "usr", kind: "dir", owner: "root", perm: "755" },
      ],
      "/etc": [
        {
          name: "passwd",
          kind: "file",
          owner: "root",
          perm: "644",
          note: "User accounts. World-readable, not password store.",
        },
        {
          name: "shadow",
          kind: "file",
          owner: "root",
          perm: "640",
          note: "Password hashes. Root-only.",
        },
        {
          name: "sudoers",
          kind: "file",
          owner: "root",
          perm: "440",
          note: "Sudo policy. World-writable = instant root.",
        },
        {
          name: "cron.d",
          kind: "dir",
          owner: "root",
          perm: "755",
          note: "Scheduled jobs — persistence target.",
        },
      ],
      "/var": [
        {
          name: "log",
          kind: "dir",
          owner: "root",
          perm: "755",
          note: "auth.log, syslog, journalctl → SIEM.",
        },
        { name: "www", kind: "dir", owner: "www-data", perm: "755" },
      ],
      "/tmp": [
        {
          name: ".xk",
          kind: "dir",
          owner: "www-data",
          perm: "700",
          note: "Hidden dir — suspicious!",
        },
      ],
    },
  },
  {
    os: "Mac",
    root: "/",
    tree: {
      "/": [
        { name: "Applications", kind: "dir", owner: "root", perm: "755" },
        {
          name: "Library",
          kind: "dir",
          owner: "root",
          perm: "755",
          note: "LaunchDaemons/LaunchAgents = persistence.",
        },
        { name: "Users", kind: "dir", owner: "root", perm: "755" },
        { name: "System", kind: "dir", owner: "root", perm: "755", note: "SIP-protected." },
      ],
      "/Library": [
        { name: "LaunchDaemons", kind: "dir", owner: "root", perm: "755" },
        { name: "LaunchAgents", kind: "dir", owner: "root", perm: "755" },
      ],
    },
  },
];

export type MemRegion = {
  id: string;
  label: string;
  kind: "code" | "heap" | "stack" | "kernel" | "buffer" | "cache" | "free";
  size: number;
  note: string;
};

export const MEMORY: MemRegion[] = [
  {
    id: "kernel",
    label: "Kernel Space",
    kind: "kernel",
    size: 25,
    note: "Kernel code, drivers, page tables. Ring 0 only.",
  },
  {
    id: "cache",
    label: "Page Cache",
    kind: "cache",
    size: 18,
    note: "Recently-read disk pages. Speeds up file I/O.",
  },
  {
    id: "buffer",
    label: "I/O Buffers",
    kind: "buffer",
    size: 6,
    note: "Pending disk / network transfers.",
  },
  {
    id: "code",
    label: ".text (code)",
    kind: "code",
    size: 8,
    note: "Executable instructions. R+X, not writable.",
  },
  {
    id: "heap",
    label: "Heap",
    kind: "heap",
    size: 22,
    note: "malloc / new. Grows upward. Corruption = RCE.",
  },
  {
    id: "stack",
    label: "Stack",
    kind: "stack",
    size: 5,
    note: "Function locals, return addresses. Grows downward.",
  },
  {
    id: "free",
    label: "Free / swappable",
    kind: "free",
    size: 16,
    note: "Reclaimable pages, backed by pagefile if pressured.",
  },
];

export const BOOT_STEPS = [
  {
    id: 1,
    label: "Power On",
    detail: "CPU jumps to reset vector in firmware.",
    enterprise: "TPM begins measuring the boot chain.",
  },
  {
    id: 2,
    label: "BIOS/UEFI",
    detail: "Firmware initialises hardware and runs POST.",
    enterprise: "UEFI Secure Boot verifies bootloader signature.",
  },
  {
    id: 3,
    label: "Boot Loader",
    detail: "GRUB / Windows Boot Manager loads kernel image.",
    enterprise: "Measured boot extends PCRs in the TPM.",
  },
  {
    id: 4,
    label: "Kernel Init",
    detail: "Kernel decompresses, sets up memory, mounts initrd.",
    enterprise: "SELinux / Defender kernel components initialise.",
  },
  {
    id: 5,
    label: "Drivers",
    detail: "Bus, storage, network drivers load.",
    enterprise: "BitLocker unseals its key from TPM if PCRs match.",
  },
  {
    id: 6,
    label: "System Services",
    detail: "systemd / services.exe starts daemons.",
    enterprise: "Sysmon, Splunk UF, Defender start early → full telemetry from boot.",
  },
  {
    id: 7,
    label: "Login",
    detail: "Winlogon / LightDM waits for credentials.",
    enterprise: "Conditional Access checks device compliance before token issuance.",
  },
  {
    id: 8,
    label: "Desktop",
    detail: "Explorer / GNOME shell hands off to the user.",
    enterprise: "Analyst is on the ShadowX SOC console, ready for the day.",
  },
];

export type Service = {
  id: string;
  name: string;
  display: string;
  status: "Running" | "Stopped";
  startup: "Automatic" | "Manual" | "Disabled";
  impact: string;
};

export const SERVICES: Service[] = [
  {
    id: "wdefend",
    name: "WinDefend",
    display: "Microsoft Defender Antivirus",
    status: "Running",
    startup: "Automatic",
    impact: "Stopping this disables endpoint protection. SOC gets a health alert within minutes.",
  },
  {
    id: "sysmon",
    name: "Sysmon64",
    display: "Sysmon Telemetry",
    status: "Running",
    startup: "Automatic",
    impact: "Without Sysmon, ShadowX loses process, network, and image-load telemetry.",
  },
  {
    id: "spooler",
    name: "Spooler",
    display: "Print Spooler",
    status: "Running",
    startup: "Automatic",
    impact: "PrintNightmare risk. ShadowX policy: disable on servers.",
  },
  {
    id: "wu",
    name: "wuauserv",
    display: "Windows Update",
    status: "Running",
    startup: "Manual",
    impact: "Patch gap grows if disabled.",
  },
  {
    id: "rdp",
    name: "TermService",
    display: "Remote Desktop Services",
    status: "Stopped",
    startup: "Disabled",
    impact: "Enabling exposes RDP — must be gated behind PAM / bastion.",
  },
  {
    id: "splunk",
    name: "SplunkForwarder",
    display: "Splunk Universal Forwarder",
    status: "Running",
    startup: "Automatic",
    impact: "Without this, endpoint logs never reach the SIEM.",
  },
];

export const INCIDENT = {
  alert:
    "SIEM notable: svchost.exe (pid 2044) spawned powershell.exe (pid 3120) with a base64-encoded command line on LAPTOP-EM-041 (user: SHADOWX\\e.morris).",
  facts: [
    "svchost.exe is a Microsoft-signed service host. It should be parented by services.exe (pid 904), NOT spawn user-context PowerShell.",
    "The PowerShell parent chain: services.exe → svchost.exe (2044) → powershell.exe (3120). This chain is abnormal.",
    "powershell.exe then spawned rundll32.exe (3444) loading a DLL from %TEMP% — classic LOLBIN abuse.",
    "rundll32.exe holds an outbound TCP:443 session to 185.94.111.1 — a hosting AS (M247), not a Microsoft edge.",
    "e.morris opened a phishing email 22 minutes before the alert (see Email Gateway log).",
  ],
  questions: [
    {
      q: "Which process should be the parent of a legitimate PowerShell session for user e.morris?",
      options: ["svchost.exe", "explorer.exe", "lsass.exe", "csrss.exe"],
      answer: 1,
      explain:
        "Interactive PowerShell is normally spawned from explorer.exe (the user shell), not svchost.",
    },
    {
      q: "The rundll32.exe DLL is loaded from %TEMP%. What does that signal?",
      options: [
        "Normal Windows update behaviour",
        "Living-off-the-land binary abuse",
        "A driver install",
        "A print job",
      ],
      answer: 1,
      explain:
        "Legitimate rundll32 loads DLLs from System32 / signed vendor paths, not user-writable %TEMP%.",
    },
    {
      q: "Best immediate containment action?",
      options: [
        "Reboot the laptop",
        "Isolate the endpoint via MDE and collect memory",
        "Delete powershell.exe",
        "Reset the user's password only",
      ],
      answer: 1,
      explain:
        "Network isolation preserves evidence and stops C2 while IR triages memory and disk.",
    },
  ],
  action:
    "Isolate LAPTOP-EM-041 via Defender for Endpoint, capture RAM with Comae/DumpIt, disable e.morris's Kerberos tickets, and open an IR ticket referencing MITRE T1059.001 (PowerShell) + T1218.011 (Rundll32).",
};

export type Lab = {
  id: number;
  title: string;
  business: string;
  objectives: string[];
  story: string;
  steps: string[];
  expected: string;
  hints: string[];
  evidence: string[];
  interview: string[];
  assessment: { q: string; a: string }[];
};

export const LABS: Lab[] = [
  {
    id: 1,
    title: "Identify Running Processes",
    business: "L1 SOC triage on a ShadowX trading desk workstation.",
    objectives: [
      "Enumerate processes on Windows & Linux",
      "Map PID → PPID → user",
      "Spot outliers vs known-good baselines",
    ],
    story:
      "The trading floor reports 'my laptop is slow'. Prove whether it's benign or an incident before the market opens.",
    steps: [
      "Windows: Get-Process | Sort CPU -Desc | Select -First 15",
      "Linux: ps -eo pid,ppid,user,%cpu,%mem,cmd --sort=-%cpu | head",
      "Cross-check top consumers against the Process Explorer in this lesson",
      "Flag any unsigned binary or unusual parent chain",
    ],
    expected: "A short-list of 3-5 processes with unexpected parent, path, or signer.",
    hints: [
      "Unsigned + %TEMP% path is almost never legitimate.",
      "Parent chain matters more than name.",
    ],
    evidence: ["Screenshot of process list", "Notes on each flagged PID"],
    interview: [
      "What is a PPID and why does it matter for triage?",
      "How do you tell a legitimate svchost.exe from a masquerade?",
    ],
    assessment: [
      { q: "Legit svchost.exe parent?", a: "services.exe" },
      { q: "Where does a normal Windows service binary live?", a: "%SystemRoot%\\System32" },
    ],
  },
  {
    id: 2,
    title: "Investigate High CPU Usage",
    business: "Risk-modelling batch on Linux host risk-etl-03 is at 100% CPU.",
    objectives: [
      "Isolate the offending thread",
      "Distinguish crypto-miner vs runaway job",
      "Report with evidence",
    ],
    story:
      "The 03:00 risk batch missed its SLA. NOC paged the SOC because CPU spike patterns match miner behaviour.",
    steps: [
      "top -H -p <pid>",
      "perf top -p <pid>",
      "ls -la /proc/<pid>/exe",
      "ss -tnp | grep <pid>",
    ],
    expected: "Root-cause: either a legitimate long-running job or a miner beaconing to a pool.",
    hints: [
      "Miners often talk to stratum+tcp:// on non-standard ports.",
      "/proc/<pid>/exe reveals the true binary path even after rename.",
    ],
    evidence: ["perf output", "Network connections snapshot"],
    interview: ["How do you find the actual binary behind a renamed process on Linux?"],
    assessment: [{ q: "Which /proc entry shows the true binary?", a: "/proc/<pid>/exe" }],
  },
  {
    id: 3,
    title: "Find Unauthorized User",
    business:
      "HR notifies IT that j.patel left ShadowX 6 months ago. Does the account still exist anywhere?",
    objectives: [
      "Enumerate local & domain accounts",
      "Identify orphaned/rogue accounts",
      "Recommend deprovisioning",
    ],
    story: "A leaver's account is a top-3 breach vector. Prove clean-up.",
    steps: [
      "net user /domain",
      "Get-LocalUser",
      "grep j.patel /etc/passwd on every Linux host via osquery",
      "Check last logon timestamps",
    ],
    expected: "List of any surviving accounts + last-logon proof.",
    hints: [
      "Local accounts often outlive AD accounts.",
      "Service accounts sometimes borrow leaver names.",
    ],
    evidence: ["Account list", "Last-logon report"],
    interview: ["Why is a stale local admin account more dangerous than a stale domain user?"],
    assessment: [
      { q: "Which Windows local group should NEVER contain a leaver?", a: "Administrators" },
    ],
  },
  {
    id: 4,
    title: "Permission Misconfiguration",
    business: "A payments Linux host has /etc/shadow world-readable after a botched Ansible run.",
    objectives: ["Detect the misconfig", "Understand the blast radius", "Remediate safely"],
    story: "One chmod away from every hash being harvestable.",
    steps: [
      "ls -l /etc/shadow",
      "stat /etc/shadow",
      "chmod 640 /etc/shadow",
      "chown root:shadow /etc/shadow",
      "Rotate any potentially exposed credentials",
    ],
    expected: "Perms restored to 640 root:shadow, exposure window logged.",
    hints: [
      "stat shows exact octal + owner.",
      "Don't just fix — assume compromise if exposed >5min.",
    ],
    evidence: ["Before/after ls -l"],
    interview: ["Explain the difference between /etc/passwd and /etc/shadow."],
    assessment: [{ q: "Correct perms for /etc/shadow?", a: "640 root:shadow" }],
  },
  {
    id: 5,
    title: "Service Failure Investigation",
    business: "SplunkForwarder service stopped on 40 ShadowX endpoints simultaneously.",
    objectives: [
      "Diagnose service failure",
      "Determine benign vs adversary action",
      "Restore telemetry",
    ],
    story:
      "Losing 40 endpoints of telemetry at once is either a bad patch or a coordinated evasion.",
    steps: [
      "Get-Service SplunkForwarder",
      "Get-WinEvent -LogName System | Where Id -eq 7031",
      "Check for recent patch deployments",
      "Look for concurrent Defender tamper events",
    ],
    expected: "Root cause identified; if adversary → IR; if patch → rollback + re-enable.",
    hints: ["Event 7031 = service crashed. Correlate timestamps across endpoints."],
    evidence: ["Service state", "Event log excerpt"],
    interview: ["Which MITRE technique covers stopping security services?"],
    assessment: [{ q: "MITRE ID for Impair Defenses: Disable or Modify Tools?", a: "T1562.001" }],
  },
  {
    id: 6,
    title: "Memory Leak Investigation",
    business: "Trading API pod's RSS grows 200MB/hr on app07.",
    objectives: ["Confirm leak vs cache growth", "Identify leaking allocator", "Recommend fix"],
    story: "Untreated, the pod OOMs during Asia open. Trades fail.",
    steps: [
      "kubectl top pod",
      "jcmd <pid> GC.heap_info",
      "jmap -histo:live <pid> | head",
      "Correlate with recent deploy",
    ],
    expected: "Suspect class + owner service identified.",
    hints: ["Live histogram excludes garbage — real leaks stand out."],
    evidence: ["Heap histogram"],
    interview: ["Difference between RSS growth from cache vs true leak?"],
    assessment: [{ q: "JVM tool for a live heap histogram?", a: "jmap -histo:live" }],
  },
  {
    id: 7,
    title: "Disk Space Investigation",
    business: "db02 alerting: /var/log at 96%.",
    objectives: ["Find the largest consumers", "Distinguish log flood vs attacker staging"],
    story: "A full /var stops Oracle from writing audit — a compliance breach.",
    steps: [
      "df -h",
      "du -sh /var/log/* | sort -h",
      "lsof +L1 (deleted-but-open files)",
      "Rotate + investigate top talker",
    ],
    expected: "Space freed, root cause documented.",
    hints: ["Deleted files held open by a process still consume space."],
    evidence: ["du output"],
    interview: ["What is 'deleted but held open' and how do you find it?"],
    assessment: [{ q: "Command to list deleted-but-open files?", a: "lsof +L1" }],
  },
  {
    id: 8,
    title: "Boot Failure Investigation",
    business: "A ShadowX exec's laptop won't boot after a firmware update.",
    objectives: ["Walk the boot chain", "Isolate the failing stage"],
    story: "BitLocker recovery prompt appears every boot.",
    steps: [
      "Verify UEFI Secure Boot state",
      "Check TPM PCR values vs known-good",
      "Suspend BitLocker, boot, resume",
    ],
    expected: "Root cause: PCR mismatch after firmware update. Documented mitigation.",
    hints: ["A firmware update changes PCR0 → BitLocker asks for recovery key."],
    evidence: ["TPM logs"],
    interview: ["Why does a firmware update trigger BitLocker recovery?"],
    assessment: [{ q: "Which PCR does firmware measurement extend?", a: "PCR0" }],
  },
  {
    id: 9,
    title: "Windows Event Analysis",
    business: "SIEM correlation missed a suspected DC login abuse. Manual triage of DC01.",
    objectives: ["Read the Security event log", "Correlate 4624/4625/4672 chains"],
    story: "An after-hours 4672 (special privileges) on DC01 needs explanation.",
    steps: [
      "Get-WinEvent -FilterHashtable @{LogName='Security';Id=4672}",
      "Correlate with 4624 for the same LogonId",
      "Check source workstation & network origin",
    ],
    expected: "Legitimate admin or adversary? Documented.",
    hints: ["4672 without a matching 4624 in the same LogonId = tampering."],
    evidence: ["Event pairs"],
    interview: ["What does event 4672 mean?"],
    assessment: [{ q: "Event ID for 'special privileges assigned to new logon'?", a: "4672" }],
  },
  {
    id: 10,
    title: "Linux Log Investigation",
    business: "web03 (Ubuntu) shows sshd auth failures burst at 02:14 UTC.",
    objectives: [
      "Read /var/log/auth.log",
      "Correlate with fail2ban",
      "Decide block vs deeper hunt",
    ],
    story: "A distributed password-spray targets ShadowX bastion accounts nightly.",
    steps: [
      "grep sshd /var/log/auth.log | grep 'Failed password'",
      "awk pattern to bucket by src IP",
      "fail2ban-client status sshd",
      "Feed IPs into SIEM watchlist",
    ],
    expected: "IPs blocked, hunt query created.",
    hints: ["Bucket by src IP and by username to distinguish spray vs brute force."],
    evidence: ["Log excerpts", "fail2ban status"],
    interview: ["Password spray vs brute force — what's the difference?"],
    assessment: [{ q: "Default sshd log path on Ubuntu?", a: "/var/log/auth.log" }],
  },
];

export const GRAPH_NODES = [
  { id: "process", label: "Process", x: 50, y: 20 },
  { id: "thread", label: "Thread", x: 20, y: 35 },
  { id: "memory", label: "Memory", x: 80, y: 35 },
  { id: "kernel", label: "Kernel", x: 50, y: 50 },
  { id: "files", label: "Files", x: 15, y: 65 },
  { id: "perm", label: "Permissions", x: 35, y: 78 },
  { id: "svc", label: "Services", x: 55, y: 78 },
  { id: "drv", label: "Drivers", x: 75, y: 65 },
  { id: "reg", label: "Registry", x: 85, y: 78 },
  { id: "sys", label: "Syscalls", x: 50, y: 90 },
  { id: "auth", label: "Authentication", x: 20, y: 90 },
  { id: "net", label: "Networking", x: 80, y: 90 },
] as const;

export const GRAPH_EDGES: [string, string][] = [
  ["process", "thread"],
  ["process", "memory"],
  ["process", "kernel"],
  ["thread", "kernel"],
  ["memory", "kernel"],
  ["kernel", "files"],
  ["kernel", "drv"],
  ["kernel", "sys"],
  ["files", "perm"],
  ["perm", "svc"],
  ["svc", "reg"],
  ["drv", "reg"],
  ["sys", "auth"],
  ["sys", "net"],
  ["auth", "perm"],
  ["net", "process"],
];

export const CAREERS = [
  {
    role: "SOC Analyst",
    use: "Reads process trees, event logs, and memory indicators to triage alerts.",
    tools: ["Sysmon", "Splunk", "Defender for Endpoint"],
  },
  {
    role: "System Administrator",
    use: "Manages services, permissions, patching, and boot integrity across fleets.",
    tools: ["Ansible", "Intune", "systemd"],
  },
  {
    role: "Cloud Engineer",
    use: "Designs OS images and node hardening for EKS/AKS at scale.",
    tools: ["Packer", "CIS baselines", "IaC"],
  },
  {
    role: "DevOps Engineer",
    use: "Owns CI runners, container base images, and rollout safety.",
    tools: ["Docker", "K8s", "GitHub Actions"],
  },
  {
    role: "Security Engineer",
    use: "Ships detections tied to process, memory, and syscall behaviour.",
    tools: ["Sigma", "eBPF", "Falco"],
  },
  {
    role: "Threat Hunter",
    use: "Hypothesis-driven hunts across process ancestry, LOLBINs, persistence.",
    tools: ["KQL", "SPL", "osquery"],
  },
  {
    role: "Incident Responder",
    use: "Live-response acquisition: memory, disk, volatile artifacts.",
    tools: ["Velociraptor", "Comae", "KAPE"],
  },
  {
    role: "Malware Analyst",
    use: "Reverses samples, models process behaviour, unpacks in memory.",
    tools: ["x64dbg", "Ghidra", "PE-bear"],
  },
];
