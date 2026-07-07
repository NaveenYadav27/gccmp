import { LearningObject } from "@/lib/learning-objects";

export const schedulingLO: LearningObject = {
  id: "os:threads:scheduling",
  title: "CPU Scheduling Algorithms",
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
      businessContext: "Understanding CPU Scheduling Algorithms is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to CPU Scheduling Algorithms. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:threads:scheduling",
    domain: "os",
    title: "CPU Scheduling Algorithms",
    description: "Deep dive into CPU Scheduling Algorithms and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying CPU Scheduling Algorithms.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for CPU Scheduling Algorithms."
  ],
};
