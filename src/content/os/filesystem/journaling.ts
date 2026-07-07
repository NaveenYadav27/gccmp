import { LearningObject } from "@/lib/learning-objects";

export const journalingLO: LearningObject = {
  id: "os:filesystem:journaling",
  title: "Filesystem Journaling",
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
      businessContext: "Understanding Filesystem Journaling is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Filesystem Journaling. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:filesystem:journaling",
    domain: "os",
    title: "Filesystem Journaling",
    description: "Deep dive into Filesystem Journaling and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Filesystem Journaling.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Filesystem Journaling."
  ],
};
