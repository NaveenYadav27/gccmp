import { LearningObject } from "@/lib/learning-objects";

export const lifecycleLO: LearningObject = {
  id: "os:processes:lifecycle",
  title: "Process Lifecycle & States",
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
      businessContext: "Understanding Process Lifecycle & States is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Process Lifecycle & States. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:processes:lifecycle",
    domain: "os",
    title: "Process Lifecycle & States",
    description: "Deep dive into Process Lifecycle & States and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Process Lifecycle & States.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Process Lifecycle & States."
  ],
};
