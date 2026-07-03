export type CareerRole = {
  key: string;
  title: string;
  level: "entry" | "mid" | "senior";
  requires: string[]; // skill keys
  salary: string;
  certs: string[];
  nextRoles: string[];
};

export const CAREERS: CareerRole[] = [
  { key: "helpdesk", title: "IT Support / Helpdesk", level: "entry", requires: ["os"], salary: "US$35–50k", certs: ["A+"], nextRoles: ["sysadmin", "socL1"] },
  { key: "sysadmin", title: "Sysadmin", level: "mid", requires: ["linux", "windows"], salary: "US$60–90k", certs: ["RHCSA", "MCSA"], nextRoles: ["cloudeng", "socL2"] },
  { key: "socL1", title: "SOC Analyst L1", level: "entry", requires: ["security", "networking"], salary: "US$55–80k", certs: ["Security+", "CySA+"], nextRoles: ["socL2"] },
  { key: "socL2", title: "SOC Analyst L2", level: "mid", requires: ["soc"], salary: "US$85–120k", certs: ["GCIH", "GCFA"], nextRoles: ["hunter", "ir"] },
  { key: "cloudeng", title: "Cloud Engineer", level: "mid", requires: ["cloud"], salary: "US$95–140k", certs: ["AWS SAA", "AZ-104"], nextRoles: ["cloudsec"] },
  { key: "cloudsec", title: "Cloud Security Engineer", level: "senior", requires: ["cloudsec"], salary: "US$130–180k", certs: ["CCSP", "AWS SCS"], nextRoles: [] },
  { key: "hunter", title: "Threat Hunter", level: "senior", requires: ["hunting"], salary: "US$130–170k", certs: ["GCTI", "GCFA"], nextRoles: [] },
  { key: "ir", title: "Incident Responder", level: "senior", requires: ["ir"], salary: "US$120–170k", certs: ["GCIH", "GCFA"], nextRoles: [] },
  { key: "pentest", title: "Penetration Tester", level: "mid", requires: ["vapt"], salary: "US$100–150k", certs: ["OSCP"], nextRoles: [] },
];
