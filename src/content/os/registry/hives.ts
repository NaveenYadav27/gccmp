import { LearningObject } from "@/lib/learning-objects";

export const hivesLO: LearningObject = {
  id: "os:registry:hives",
  title: "Windows Registry Hives",
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
      businessContext: "Understanding Windows Registry Hives is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Windows Registry Hives. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:registry:hives",
    domain: "os",
    title: "Windows Registry Hives",
    description: "Deep dive into Windows Registry Hives and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Windows Registry Hives.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Windows Registry Hives."
  ],
};
