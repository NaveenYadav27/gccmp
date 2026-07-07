import { LearningObject } from "@/lib/learning-objects";

export const cgroupsLO: LearningObject = {
  id: "os:security:cgroups",
  title: "Linux Control Groups (cgroups)",
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
      businessContext: "Understanding Linux Control Groups (cgroups) is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Linux Control Groups (cgroups). Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:security:cgroups",
    domain: "os",
    title: "Linux Control Groups (cgroups)",
    description: "Deep dive into Linux Control Groups (cgroups) and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Linux Control Groups (cgroups).",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Linux Control Groups (cgroups)."
  ],
};
