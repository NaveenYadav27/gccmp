import { LearningObject } from "@/lib/learning-objects";

export const systemdLO: LearningObject = {
  id: "os:boot:systemd",
  title: "Systemd Initialization",
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
      businessContext: "Understanding Systemd Initialization is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Systemd Initialization. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:boot:systemd",
    domain: "os",
    title: "Systemd Initialization",
    description: "Deep dive into Systemd Initialization and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Systemd Initialization.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Systemd Initialization."
  ],
};
