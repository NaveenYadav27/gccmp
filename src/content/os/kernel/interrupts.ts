import { LearningObject } from "@/lib/learning-objects";

export const interruptsLO: LearningObject = {
  id: "os:kernel:interrupts",
  title: "Hardware Interrupts & IRQs",
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
      businessContext: "Understanding Hardware Interrupts & IRQs is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Hardware Interrupts & IRQs. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:kernel:interrupts",
    domain: "os",
    title: "Hardware Interrupts & IRQs",
    description: "Deep dive into Hardware Interrupts & IRQs and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Hardware Interrupts & IRQs.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Hardware Interrupts & IRQs."
  ],
};
