import { LearningObject } from "@/lib/learning-objects";

export const ipcLO: LearningObject = {
  id: "os:processes:ipc",
  title: "Inter-Process Communication (IPC)",
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
      businessContext: "Understanding Inter-Process Communication (IPC) is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Inter-Process Communication (IPC). Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:processes:ipc",
    domain: "os",
    title: "Inter-Process Communication (IPC)",
    description: "Deep dive into Inter-Process Communication (IPC) and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Inter-Process Communication (IPC).",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Inter-Process Communication (IPC)."
  ],
};
