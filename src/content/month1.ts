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
    kind: "flow" | "layered" | "os-simulator" | "network-simulator";
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
    slug: "m1-bb1-os",
    number: 1,
    title: "Operating Systems",
    subtitle: "Kernel, Memory, Processes, and Boot",
    duration: "180 min",
    day: 1,
    brief:
      "An Enterprise OS Simulator covering Kernel, Processes, Threads, Memory, Filesystem, Permissions, Boot Process, BIOS, UEFI, and Virtual Memory.",
    objectives: [
      "Understand Kernel space vs User space",
      "Trace the Boot Process from BIOS/UEFI to init",
      "Analyze process context switching and threads",
      "Investigate memory allocation and virtual memory mapping",
    ],
    whyItMatters:
      "Every attack ultimately executes on an OS. Understanding the OS kernel and memory is required to hunt advanced threats.",
    story:
      "In 2010, Stuxnet loaded malicious drivers into the Windows kernel to hide its operations. By living in Ring 0, it bypassed all user-land antivirus.",
    visual: {
      kind: "os-simulator",
      title: "Enterprise OS Simulator",
      nodes: [],
    },
    enterprise: {
      where: "Windows Servers, Linux VMs, and employee endpoints.",
      business: "Uptime and stability of the underlying OS is critical for all applications.",
      attacker: "Attackers aim for privilege escalation to SYSTEM or root.",
      defender: "Defenders monitor process creation, unexpected services, and driver loads.",
      incident:
        "CrowdStrike (2024) - A bad kernel driver update caused millions of endpoints to crash.",
    },
    concepts: [
      { term: "Kernel", definition: "The core of the OS that manages CPU, memory, and devices." },
      { term: "Process", definition: "An executing instance of a program." },
      {
        term: "Virtual Memory",
        definition:
          "Memory management technique that provides an idealized abstraction of storage resources.",
      },
      {
        term: "Context Switch",
        definition:
          "Process of storing the state of a process/thread so it can be restored and resume execution.",
      },
    ],
    guidedLab: {
      title: "Enterprise Incident Investigation",
      goal: "Use the OS Simulator to find a hidden malicious process.",
      steps: [
        { instruction: "Open the Process Explorer.", command: "Launch OS Simulator" },
        { instruction: "Identify processes running under SYSTEM or root without a valid parent." },
        { instruction: "Terminate the anomalous process." },
      ],
    },
    challenge: {
      title: "Rootkit Detection",
      prompt:
        "A process is hiding from standard 'ps' output but you can see network connections. Where in the OS is the attacker hiding?",
      hint: "Think about Kernel vs User space hooks.",
    },
    assessment: [
      {
        q: "What is the primary role of the Kernel?",
        options: [
          "Running user applications",
          "Managing hardware and system resources",
          "Rendering UI",
          "Providing network cables",
        ],
        correct: 1,
        explanation: "The kernel bridges hardware and software.",
      },
      {
        q: "What is Virtual Memory?",
        options: [
          "RAM installed physically",
          "Abstraction of memory that allows processes to act as if they have contiguous memory",
          "Cloud storage",
          "ROM",
        ],
        correct: 1,
        explanation: "Virtual memory maps logical addresses to physical addresses.",
      },
    ],
    summary:
      "You can now investigate the lowest levels of an operating system, mapping processes to memory and tracking boot sequences.",
    interviewQuestions: [
      "Explain the difference between User space and Kernel space.",
      "How does a computer boot from UEFI to the login prompt?",
    ],
    careers: ["Threat Hunter", "Incident Response", "System Administrator"],
  },
  {
    slug: "m1-bb2-networking",
    number: 2,
    title: "Networking",
    subtitle: "Enterprise Packet Journey",
    duration: "180 min",
    day: 5,
    brief:
      "An interactive journey of a packet moving through an enterprise network, dissecting the OSI model, TCP Handshake, DNS, and Firewalls.",
    objectives: [
      "Deconstruct the OSI Model down to raw frames",
      "Analyze the TCP 3-Way Handshake and sequence numbers",
      "Map out DNS resolution across root and authoritative servers",
      "Understand stateful vs stateless firewall inspection",
    ],
    whyItMatters:
      "Networks are the highway attackers use to move laterally and exfiltrate data. If you can't read packets, you are blind to the most critical threats.",
    story:
      "In 2013, the Target breach involved attackers moving laterally across the corporate network, eventually exfiltrating data via ICMP and FTP to external drop servers. Deep packet inspection could have flagged this anomalous outbound traffic.",
    visual: {
      kind: "network-simulator",
      title: "Enterprise Packet Journey",
      nodes: [],
    },
    enterprise: {
      where: "Switches, Routers, Firewalls (Palo Alto, Cisco), Load Balancers, and DNS Servers.",
      business:
        "Provides the connectivity required for applications to serve customers and employees.",
      attacker:
        "Attackers pivot through subnets, exploit open ports, and tunnel traffic via DNS/ICMP.",
      defender:
        "Defenders use NIDS/NIPS (Suricata, Snort) and PCAP analysis (Wireshark) to detect C2 beacons.",
      incident:
        "SolarWinds (2020) - SUNBURST backdoor used DGA (Domain Generation Algorithms) in DNS requests to establish Command & Control.",
    },
    concepts: [
      {
        term: "OSI Model",
        definition: "A conceptual framework used to understand how networks operate (Layer 1-7).",
      },
      {
        term: "TCP Handshake",
        definition: "SYN, SYN-ACK, ACK. The mechanism to establish a reliable connection.",
      },
      {
        term: "DNS",
        definition: "Domain Name System. Translates human-readable names to IP addresses.",
      },
      {
        term: "PCAP",
        definition: "Packet Capture. A file containing intercepted network traffic.",
      },
    ],
    guidedLab: {
      title: "Packet Analysis with AI",
      goal: "Use the AI Packet Analyzer to identify a data exfiltration attempt.",
      steps: [
        { instruction: "Open the AI Packet Analyzer.", command: "Launch Analyzer" },
        { instruction: "Paste the provided suspicious DNS query log or upload a PCAP." },
        { instruction: "Review the AI output to identify the encoded exfiltration payload." },
      ],
    },
    challenge: {
      title: "The Silent Beacon",
      prompt:
        "You notice consistent, small outbound UDP packets over port 53 to an unknown IP, but standard DNS logs show no matching queries. What is happening?",
      hint: "Think about how DNS tunnels bypass standard logging by encoding data in TXT records or subdomains.",
    },
    assessment: [
      {
        q: "Which layer of the OSI model does a Router primarily operate on?",
        options: [
          "Data Link (Layer 2)",
          "Network (Layer 3)",
          "Transport (Layer 4)",
          "Application (Layer 7)",
        ],
        correct: 1,
        explanation: "Routers use IP addresses (Layer 3) to forward packets between networks.",
      },
      {
        q: "What are the flags used in a standard TCP connection establishment?",
        options: ["ACK, PSH, FIN", "SYN, SYN-ACK, ACK", "RST, SYN, URG", "SYN, FIN, ACK"],
        correct: 1,
        explanation: "The 3-way handshake is SYN, SYN-ACK, ACK.",
      },
    ],
    summary:
      "You can now visualize how packets traverse the internet and enterprise networks, and understand the artifacts left behind at each hop.",
    interviewQuestions: [
      "Walk me through what happens exactly when you type 'google.com' in your browser.",
      "Explain the difference between TCP and UDP, and give a cyber attack example for each.",
    ],
    careers: ["Network Security Engineer", "SOC Analyst (Tier 1/2)", "Threat Hunter"],
  },
  {
    slug: "m1-bb3-linux",
    number: 3,
    title: "Linux",
    subtitle: "Enterprise Linux Operations",
    duration: "180 min",
    day: 10,
    brief: "Placeholder for Linux Building Block.",
    objectives: [],
    whyItMatters: "",
    story: "",
    visual: { kind: "flow", title: "Linux", nodes: [] },
    enterprise: { where: "", business: "", attacker: "", defender: "", incident: "" },
    concepts: [],
    guidedLab: { title: "", goal: "", steps: [] },
    challenge: { title: "", prompt: "", hint: "" },
    assessment: [],
    summary: "",
    interviewQuestions: [],
    careers: [],
  },
  {
    slug: "m1-bb4-windows",
    number: 4,
    title: "Windows",
    subtitle: "Enterprise Windows",
    duration: "180 min",
    day: 15,
    brief: "Placeholder for Windows Building Block.",
    objectives: [],
    whyItMatters: "",
    story: "",
    visual: { kind: "flow", title: "Windows", nodes: [] },
    enterprise: { where: "", business: "", attacker: "", defender: "", incident: "" },
    concepts: [],
    guidedLab: { title: "", goal: "", steps: [] },
    challenge: { title: "", prompt: "", hint: "" },
    assessment: [],
    summary: "",
    interviewQuestions: [],
    careers: [],
  },
  {
    slug: "m1-bb5-security-concepts",
    number: 5,
    title: "Security Concepts",
    subtitle: "CIA, AAA, IAM, and Crypto",
    duration: "180 min",
    day: 20,
    brief: "Placeholder for Security Concepts Building Block.",
    objectives: [],
    whyItMatters: "",
    story: "",
    visual: { kind: "flow", title: "Concepts", nodes: [] },
    enterprise: { where: "", business: "", attacker: "", defender: "", incident: "" },
    concepts: [],
    guidedLab: { title: "", goal: "", steps: [] },
    challenge: { title: "", prompt: "", hint: "" },
    assessment: [],
    summary: "",
    interviewQuestions: [],
    careers: [],
  },
  {
    slug: "m1-bb6-enterprise-infrastructure",
    number: 6,
    title: "Enterprise Infrastructure",
    subtitle: "Interactive Enterprise Digital Twin",
    duration: "180 min",
    day: 25,
    brief: "Placeholder for Enterprise Infrastructure Building Block.",
    objectives: [],
    whyItMatters: "",
    story: "",
    visual: { kind: "flow", title: "Infra", nodes: [] },
    enterprise: { where: "", business: "", attacker: "", defender: "", incident: "" },
    concepts: [],
    guidedLab: { title: "", goal: "", steps: [] },
    challenge: { title: "", prompt: "", hint: "" },
    assessment: [],
    summary: "",
    interviewQuestions: [],
    careers: [],
  },
  {
    slug: "m1-bb7-risk",
    number: 7,
    title: "Risk Awareness",
    subtitle: "Business Impact and Compliance",
    duration: "180 min",
    day: 30,
    brief: "Placeholder for Risk Awareness Building Block.",
    objectives: [],
    whyItMatters: "",
    story: "",
    visual: { kind: "flow", title: "Risk", nodes: [] },
    enterprise: { where: "", business: "", attacker: "", defender: "", incident: "" },
    concepts: [],
    guidedLab: { title: "", goal: "", steps: [] },
    challenge: { title: "", prompt: "", hint: "" },
    assessment: [],
    summary: "",
    interviewQuestions: [],
    careers: [],
  },
];

export const PROGRAM_MONTHS = [
  {
    number: 1,
    title: "CyberOS Foundations",
    subtitle: "OS, Network, Infra, Risk",
    days: "Day 1 → 30",
    status: "active" as const,
    sessionCount: MONTH_1.length,
  },
  {
    number: 2,
    title: "SOC Analyst",
    subtitle: "Detect, investigate, respond",
    days: "Day 31 → 60",
    status: "locked" as const,
    sessionCount: 8,
  },
  {
    number: 3,
    title: "Ethical Hacking",
    subtitle: "Attacker methodology",
    days: "Day 61 → 90",
    status: "locked" as const,
    sessionCount: 8,
  },
  {
    number: 4,
    title: "VAPT & Projects",
    subtitle: "Real assessments and portfolio",
    days: "Day 91 → 120",
    status: "locked" as const,
    sessionCount: 8,
  },
];

export function getSession(slug: string): Session | undefined {
  return MONTH_1.find((s) => s.slug === slug);
}
