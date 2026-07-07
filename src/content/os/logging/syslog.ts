import { LearningObject } from "@/lib/learning-objects";

export const syslogLO: LearningObject = {
  id: "os:logging:syslog",
  title: "Syslog & Journald",
  domain: "os",
  
  metadata: {
    durationMinutes: 30,
    difficulty: "intermediate",
  },
  
  enterpriseContext: {
    asset: {
      assetId: "GFS-FIN-LAPTOP-01",
      type: "workstation",
      location: "GFS -> London -> Finance",
      os: "Windows 11 Enterprise",
      criticality: "high",
      businessContext: "Understanding Syslog & Journald is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Syslog & Journald. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:logging:syslog",
    domain: "os",
    title: "Syslog & Journald",
    description: "Deep dive into Syslog & Journald and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Syslog & Journald.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Syslog & Journald."
  ],
};
