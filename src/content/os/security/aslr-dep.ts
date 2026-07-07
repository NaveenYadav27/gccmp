import { LearningObject } from "@/lib/learning-objects";

export const aslrDepLO: LearningObject = {
  id: "os:security:aslr-dep",
  title: "ASLR & DEP Mitigations",
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
      businessContext: "Understanding ASLR & DEP Mitigations is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to ASLR & DEP Mitigations. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:security:aslr-dep",
    domain: "os",
    title: "ASLR & DEP Mitigations",
    description: "Deep dive into ASLR & DEP Mitigations and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying ASLR & DEP Mitigations.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for ASLR & DEP Mitigations."
  ],
};
