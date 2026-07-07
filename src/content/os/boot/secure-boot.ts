import { LearningObject } from "@/lib/learning-objects";

export const secureBootLO: LearningObject = {
  id: "os:boot:secure-boot",
  title: "Secure Boot Process",
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
      businessContext: "Understanding Secure Boot Process is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Secure Boot Process. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:boot:secure-boot",
    domain: "os",
    title: "Secure Boot Process",
    description: "Deep dive into Secure Boot Process and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Secure Boot Process.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Secure Boot Process."
  ],
};
