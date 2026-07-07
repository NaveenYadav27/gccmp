import { LearningObject } from "@/lib/learning-objects";

export const heapStackLO: LearningObject = {
  id: "os:memory:heap-stack",
  title: "Heap vs Stack Memory",
  domain: "os",
  
  metadata: {
    durationMinutes: 30,
    difficulty: "beginner",
  },
  
  enterpriseContext: {
    asset: {
      assetId: "GFS-FIN-LAPTOP-01",
      type: "workstation",
      location: "GFS -> London -> Finance",
      os: "Windows 11 Enterprise",
      criticality: "high",
      businessContext: "Understanding Heap vs Stack Memory is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Heap vs Stack Memory. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:memory:heap-stack",
    domain: "os",
    title: "Heap vs Stack Memory",
    description: "Deep dive into Heap vs Stack Memory and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Heap vs Stack Memory.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Heap vs Stack Memory."
  ],
};
