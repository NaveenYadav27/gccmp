export type FoundationTopic = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  duration: string;
  brief: string;
  objectives: string[];
  keyIdeas: string[];
};

export const FOUNDATION_TOPICS: FoundationTopic[] = [
  {
    slug: "digital-world",
    number: 1,
    title: "The Digital World",
    subtitle: "How modern life runs on code, networks, and data",
    duration: "20 min",
    brief:
      "Set the stage for cybersecurity. Understand how computing, networks, cloud, and data flows shape the enterprise attack surface.",
    objectives: [
      "Describe the digital ecosystem an enterprise runs on",
      "Identify the four pillars: compute, storage, network, identity",
      "Explain why every business is now a target",
    ],
    keyIdeas: ["Compute", "Storage", "Network", "Identity", "Attack surface"],
  },
  {
    slug: "computer-fundamentals",
    number: 2,
    title: "Computer Fundamentals",
    subtitle: "CPU, memory, storage, I/O — the machine model",
    duration: "25 min",
    brief:
      "Learn what a computer actually does. This is the model every OS, exploit, and forensic tool operates against.",
    objectives: [
      "Explain the von Neumann architecture",
      "Distinguish RAM, cache, disk, and swap",
      "Trace how an instruction becomes execution",
    ],
    keyIdeas: ["CPU", "RAM", "Disk", "Bus", "Instruction cycle"],
  },
  {
    slug: "binary",
    number: 3,
    title: "Binary Number System",
    subtitle: "Bits, bytes, and how machines count",
    duration: "20 min",
    brief:
      "Every packet, password, and payload is bits. Master binary to read raw data confidently.",
    objectives: [
      "Convert decimal ↔ binary",
      "Interpret bytes, words, and endianness",
      "Read a bitmask and a subnet mask",
    ],
    keyIdeas: ["Bit", "Byte", "Endianness", "Mask", "Boolean logic"],
  },
  {
    slug: "hex",
    number: 4,
    title: "Hexadecimal & Encoding",
    subtitle: "Hex, ASCII, Base64, URL encoding",
    duration: "20 min",
    brief:
      "Attackers hide in encodings. Learn to recognise and convert between the encodings you'll see in logs, payloads, and memory.",
    objectives: [
      "Convert between hex, decimal, and binary",
      "Decode ASCII, Base64, and URL-encoded payloads",
      "Spot obfuscated strings inside logs",
    ],
    keyIdeas: ["Hex", "ASCII", "Base64", "URL encoding", "Obfuscation"],
  },
  {
    slug: "operating-systems",
    number: 5,
    title: "Operating Systems",
    subtitle: "Kernel, processes, users, permissions",
    duration: "30 min",
    brief:
      "The OS is the security boundary attackers try to cross. Understand kernel/user space, processes, and privilege.",
    objectives: [
      "Describe kernel vs. user space",
      "Explain process, thread, and privilege",
      "Map users, groups, and permissions",
    ],
    keyIdeas: ["Kernel", "Process", "Privilege", "Syscall", "ACL"],
  },
  {
    slug: "linux",
    number: 6,
    title: "Linux Fundamentals",
    subtitle: "Shell, filesystem, permissions, logs",
    duration: "35 min",
    brief:
      "Linux runs most of the internet and most enterprise workloads. Command the shell like an SRE.",
    objectives: [
      "Navigate the filesystem confidently",
      "Read and set POSIX permissions",
      "Inspect processes, sockets, and journalctl logs",
    ],
    keyIdeas: ["bash", "chmod", "ps/top", "systemd", "/var/log"],
  },
  {
    slug: "windows",
    number: 7,
    title: "Windows & Active Directory",
    subtitle: "Registry, services, events, AD basics",
    duration: "35 min",
    brief:
      "Enterprises live in Windows and AD. Learn the objects, events, and PowerShell primitives you'll investigate.",
    objectives: [
      "Navigate Event Viewer and key Event IDs",
      "Explain users, groups, GPOs in Active Directory",
      "Use PowerShell for enumeration",
    ],
    keyIdeas: ["Event ID", "Registry", "GPO", "PowerShell", "NTFS ACL"],
  },
  {
    slug: "virtualization",
    number: 8,
    title: "Virtualization & Containers",
    subtitle: "Hypervisors, VMs, Docker, isolation",
    duration: "25 min",
    brief:
      "Modern labs and modern production both run on virtualization. Understand what isolates workloads and what doesn't.",
    objectives: [
      "Compare type-1 vs. type-2 hypervisors",
      "Explain container vs. VM isolation",
      "Reason about escape and blast radius",
    ],
    keyIdeas: ["Hypervisor", "VM", "Container", "Namespace", "cgroup"],
  },
  {
    slug: "networking",
    number: 9,
    title: "Networking Essentials",
    subtitle: "OSI, TCP/IP, DNS, HTTP, TLS",
    duration: "40 min",
    brief:
      "Every attack traverses a network. Master the stack that carries it so you can read packets and defend flows.",
    objectives: [
      "Walk a packet up and down the OSI stack",
      "Explain DNS, HTTP, and TLS handshakes",
      "Interpret common ports and protocols",
    ],
    keyIdeas: ["OSI", "TCP/IP", "DNS", "HTTP", "TLS"],
  },
  {
    slug: "security-basics",
    number: 10,
    title: "Information Security Basics",
    subtitle: "CIA triad, threats, controls",
    duration: "25 min",
    brief:
      "Security is a discipline of trade-offs. Learn the vocabulary and mental models used across the industry.",
    objectives: [
      "Apply the CIA triad to real systems",
      "Distinguish threat, vulnerability, risk",
      "Classify preventive, detective, corrective controls",
    ],
    keyIdeas: ["CIA", "Threat", "Vulnerability", "Risk", "Control"],
  },
  {
    slug: "cybersecurity-overview",
    number: 11,
    title: "Cybersecurity Landscape",
    subtitle: "Domains, roles, frameworks",
    duration: "25 min",
    brief:
      "Map the field. Know where you fit, what the SOC does, and how NIST, MITRE, and ISO connect.",
    objectives: [
      "Map cybersecurity domains and roles",
      "Introduce NIST CSF, MITRE ATT&CK, ISO 27001",
      "Explain red / blue / purple team split",
    ],
    keyIdeas: ["NIST CSF", "MITRE ATT&CK", "ISO 27001", "SOC", "Red/Blue"],
  },
  {
    slug: "ethical-hacking-lifecycle",
    number: 12,
    title: "Ethical Hacking Lifecycle",
    subtitle: "Recon → exploit → post-exploit → report",
    duration: "30 min",
    brief:
      "The lifecycle every ethical hacker follows — and the exact structure of the CEHv13 curriculum you're about to start.",
    objectives: [
      "Walk through the 5 phases of ethical hacking",
      "Contrast black-box, white-box, grey-box testing",
      "Understand rules of engagement and reporting",
    ],
    keyIdeas: ["Recon", "Scanning", "Exploitation", "Post-exploit", "Reporting"],
  },
];

export function getFoundationTopic(slug: string): FoundationTopic | undefined {
  return FOUNDATION_TOPICS.find((t) => t.slug === slug);
}
