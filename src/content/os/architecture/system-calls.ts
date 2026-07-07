import { LearningObject } from "@/lib/learning-objects";

export const systemCallsLO: LearningObject = {
  id: "os:architecture:system-calls",
  title: "System Calls API",
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
      businessContext: "Understanding System Calls API is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to System Calls API. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:architecture:system-calls",
    domain: "os",
    title: "System Calls API",
    description: "Deep dive into System Calls API and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying System Calls API.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for System Calls API."
  ],
};
