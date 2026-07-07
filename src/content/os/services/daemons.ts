import { LearningObject } from "@/lib/learning-objects";

export const daemonsLO: LearningObject = {
  id: "os:services:daemons",
  title: "Linux Daemons & Windows Services",
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
      businessContext: "Understanding Linux Daemons & Windows Services is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Linux Daemons & Windows Services. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:services:daemons",
    domain: "os",
    title: "Linux Daemons & Windows Services",
    description: "Deep dive into Linux Daemons & Windows Services and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Linux Daemons & Windows Services.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Linux Daemons & Windows Services."
  ],
};
