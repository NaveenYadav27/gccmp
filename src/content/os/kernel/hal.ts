import { LearningObject } from "@/lib/learning-objects";

export const halLO: LearningObject = {
  id: "os:kernel:hal",
  title: "Hardware Abstraction Layer (HAL)",
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
      businessContext: "Understanding Hardware Abstraction Layer (HAL) is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Hardware Abstraction Layer (HAL). Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:kernel:hal",
    domain: "os",
    title: "Hardware Abstraction Layer (HAL)",
    description: "Deep dive into Hardware Abstraction Layer (HAL) and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Hardware Abstraction Layer (HAL).",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Hardware Abstraction Layer (HAL)."
  ],
};
