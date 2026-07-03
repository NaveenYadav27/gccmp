// Daily enterprise missions — realistic SOC/IT tickets set inside Global Financial Corp.
export type DailyMission = {
  id: string;
  title: string;
  scenario: string;
  bu: string;
  severity: "low" | "medium" | "high" | "critical";
  objectives: string[];
  datasetRef: string; // filename under src/content/datasets
  successCriteria: string[];
  hint: string;
  skills: string[];
};

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: "dm-01-brute-force",
    title: "Retail Banking users can't log in",
    scenario:
      "07:14 SGT — Service desk floods with 'account locked' tickets from the Retail Banking floor in Singapore HQ. Ops suspects an AD lockout storm. You are the on-call SOC analyst.",
    bu: "Retail Banking",
    severity: "high",
    objectives: [
      "Identify affected user population",
      "Determine source of lockouts (endpoint vs external)",
      "Contain the source",
      "Document findings for the 09:00 stand-up",
    ],
    datasetRef: "ad-lockouts.json",
    successCriteria: [
      "Correctly names the failing logon type",
      "Identifies the source IP as external",
      "Recommends blocking at perimeter, not password reset",
    ],
    hint: "Look at LogonType — interactive vs network tells you where the attempt came from.",
    skills: ["Windows Event Logs", "AD", "Triage"],
  },
  {
    id: "dm-02-s3-exposure",
    title: "S3 bucket flagged public by CSPM",
    scenario:
      "GuardDuty + CSPM ticket at 22:03. A bucket named gfc-trading-reports has flipped to public read. Trading BU owner is on a plane.",
    bu: "Trading",
    severity: "critical",
    objectives: [
      "Confirm the exposure",
      "Assess data sensitivity",
      "Remediate without breaking downstream jobs",
      "Draft the customer/regulator notification decision",
    ],
    datasetRef: "cloudtrail-s3.json",
    successCriteria: [
      "Traces the PutBucketAcl event",
      "Identifies the IAM principal",
      "Chooses block-public-access, not delete",
    ],
    hint: "CloudTrail eventName + userIdentity.arn will name the actor.",
    skills: ["AWS", "IAM", "CloudTrail", "Data classification"],
  },
  {
    id: "dm-03-phish",
    title: "Suspected phishing wave against Wealth Mgmt",
    scenario:
      "Email gateway quarantined 214 messages in 4 minutes, all targeting relationship managers. One executive already clicked.",
    bu: "Wealth",
    severity: "high",
    objectives: [
      "Extract IOCs from the sample",
      "Determine if the click led to credential entry",
      "Roll out a mail rule and force MFA re-auth",
    ],
    datasetRef: "phishing-sample.json",
    successCriteria: [
      "Extracts sending domain + payload URL",
      "Notes the lookalike domain technique",
      "Escalates the clicked user for hunt",
    ],
    hint: "Compare the display name against the actual sending domain.",
    skills: ["Phishing", "Email headers", "IOC extraction"],
  },
  {
    id: "dm-04-linux-outbound",
    title: "Unusual outbound from a Linux app host",
    scenario:
      "Zeek flags a Linux app server making persistent TLS to a rare AS. The host serves the payments microservice.",
    bu: "IT / Payments",
    severity: "critical",
    objectives: [
      "Determine parent process",
      "Confirm whether this is C2 or a benign integration",
      "Isolate if malicious",
    ],
    datasetRef: "linux-outbound.json",
    successCriteria: [
      "Identifies a non-standard binary path",
      "Notes cron persistence",
      "Recommends host isolation + memory capture",
    ],
    hint: "cron and /tmp are always worth a look on Linux.",
    skills: ["Linux forensics", "Network analysis", "IR"],
  },
];

export function todaysMission() {
  const day = Math.floor(Date.now() / 86400000);
  return DAILY_MISSIONS[day % DAILY_MISSIONS.length];
}
