import { LearningObject } from "@/lib/learning-objects";

export const lsassLO: LearningObject = {
  id: "os:authentication:lsass",
  title: "LSASS & Windows Auth",
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
      businessContext: "Understanding LSASS & Windows Auth is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to LSASS & Windows Auth. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:authentication:lsass",
    domain: "os",
    title: "LSASS & Windows Auth",
    description: "Deep dive into LSASS & Windows Auth and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying LSASS & Windows Auth.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for LSASS & Windows Auth."
  ],
};
