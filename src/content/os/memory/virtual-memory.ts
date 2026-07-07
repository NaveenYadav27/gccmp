import { LearningObject } from "@/lib/learning-objects";

export const virtualMemoryLO: LearningObject = {
  id: "os:memory:virtual-memory",
  title: "Virtual Memory & Paging",
  domain: "os",
  
  metadata: {
    durationMinutes: 30,
    difficulty: "advanced",
  },
  
  enterpriseContext: {
    asset: {
      assetId: "GFS-FIN-LAPTOP-01",
      type: "workstation",
      location: "GFS -> London -> Finance",
      os: "Windows 11 Enterprise",
      criticality: "high",
      businessContext: "Understanding Virtual Memory & Paging is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Virtual Memory & Paging. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:memory:virtual-memory",
    domain: "os",
    title: "Virtual Memory & Paging",
    description: "Deep dive into Virtual Memory & Paging and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Virtual Memory & Paging.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Virtual Memory & Paging."
  ],
};
