import { LearningObject } from "@/lib/learning-objects";

export const eventTracingLO: LearningObject = {
  id: "os:logging:event-tracing",
  title: "Event Tracing for Windows (ETW)",
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
      businessContext: "Understanding Event Tracing for Windows (ETW) is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Event Tracing for Windows (ETW). Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:logging:event-tracing",
    domain: "os",
    title: "Event Tracing for Windows (ETW)",
    description: "Deep dive into Event Tracing for Windows (ETW) and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Event Tracing for Windows (ETW).",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Event Tracing for Windows (ETW)."
  ],
};
