import { LearningObject } from "@/lib/learning-objects";

export const bottlenecksLO: LearningObject = {
  id: "os:performance:bottlenecks",
  title: "Identifying CPU/RAM Bottlenecks",
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
      businessContext: "Understanding Identifying CPU/RAM Bottlenecks is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Identifying CPU/RAM Bottlenecks. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:performance:bottlenecks",
    domain: "os",
    title: "Identifying CPU/RAM Bottlenecks",
    description: "Deep dive into Identifying CPU/RAM Bottlenecks and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Identifying CPU/RAM Bottlenecks.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Identifying CPU/RAM Bottlenecks."
  ],
};
