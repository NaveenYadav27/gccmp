import { LearningObject } from "@/lib/learning-objects";

export const pamLO: LearningObject = {
  id: "os:authentication:pam",
  title: "Pluggable Auth Modules (PAM)",
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
      businessContext: "Understanding Pluggable Auth Modules (PAM) is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Pluggable Auth Modules (PAM). Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:authentication:pam",
    domain: "os",
    title: "Pluggable Auth Modules (PAM)",
    description: "Deep dive into Pluggable Auth Modules (PAM) and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Pluggable Auth Modules (PAM).",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Pluggable Auth Modules (PAM)."
  ],
};
