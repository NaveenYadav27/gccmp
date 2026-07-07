import { LearningObject } from "@/lib/learning-objects";

export const contextSwitchLO: LearningObject = {
  id: "os:threads:context-switch",
  title: "Context Switching Mechanisms",
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
      businessContext: "Understanding Context Switching Mechanisms is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Context Switching Mechanisms. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:threads:context-switch",
    domain: "os",
    title: "Context Switching Mechanisms",
    description: "Deep dive into Context Switching Mechanisms and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Context Switching Mechanisms.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Context Switching Mechanisms."
  ],
};
