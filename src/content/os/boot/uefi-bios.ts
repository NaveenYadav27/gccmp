import { LearningObject } from "@/lib/learning-objects";

export const uefiBiosLO: LearningObject = {
  id: "os:boot:uefi-bios",
  title: "UEFI vs Legacy BIOS",
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
      businessContext: "Understanding UEFI vs Legacy BIOS is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to UEFI vs Legacy BIOS. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:boot:uefi-bios",
    domain: "os",
    title: "UEFI vs Legacy BIOS",
    description: "Deep dive into UEFI vs Legacy BIOS and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying UEFI vs Legacy BIOS.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for UEFI vs Legacy BIOS."
  ],
};
