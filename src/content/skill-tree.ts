// Visual skill tree — unlocks derive from user_progress + skill_unlocks.
export type SkillNode = {
  key: string;
  label: string;
  tier: number;
  requires: string[]; // skill keys
  sessionSlugs: string[]; // completing any unlocks
  careers: string[];
};

export const SKILL_TREE: SkillNode[] = [
  { key: "os", label: "Operating Systems", tier: 0, requires: [], sessionSlugs: ["m1-s02-anatomy"], careers: ["IT Support"] },
  { key: "networking", label: "Networking", tier: 0, requires: [], sessionSlugs: ["m1-s04-networking"], careers: ["NOC Analyst"] },
  { key: "linux", label: "Linux", tier: 1, requires: ["os"], sessionSlugs: ["m1-s05-linux"], careers: ["Linux Admin", "DevOps"] },
  { key: "windows", label: "Windows", tier: 1, requires: ["os"], sessionSlugs: ["m1-s06-windows"], careers: ["Windows Admin", "Sysadmin"] },
  { key: "identity", label: "Identity & AD", tier: 2, requires: ["windows"], sessionSlugs: [], careers: ["Identity Engineer"] },
  { key: "cloud", label: "Cloud Fundamentals", tier: 2, requires: ["linux", "networking"], sessionSlugs: ["m1-s07-cloud"], careers: ["Cloud Engineer"] },
  { key: "security", label: "Security Foundations", tier: 2, requires: ["networking"], sessionSlugs: ["m1-s01-cyber-landscape", "m1-s03-data"], careers: ["Security Analyst"] },
  { key: "soc", label: "SOC Operations", tier: 3, requires: ["security", "windows"], sessionSlugs: ["m1-s08-checkpoint"], careers: ["SOC Analyst L1", "SOC L2"] },
  { key: "hunting", label: "Threat Hunting", tier: 4, requires: ["soc", "linux"], sessionSlugs: [], careers: ["Threat Hunter"] },
  { key: "ir", label: "Incident Response", tier: 4, requires: ["soc"], sessionSlugs: [], careers: ["IR Consultant"] },
  { key: "cloudsec", label: "Cloud Security", tier: 4, requires: ["cloud", "security"], sessionSlugs: [], careers: ["Cloud Security Engineer"] },
  { key: "vapt", label: "VAPT / Ethical Hacking", tier: 5, requires: ["linux", "networking", "security"], sessionSlugs: [], careers: ["Penetration Tester"] },
  { key: "aisec", label: "AI Security", tier: 5, requires: ["cloudsec", "security"], sessionSlugs: [], careers: ["AI Security Engineer"] },
];
