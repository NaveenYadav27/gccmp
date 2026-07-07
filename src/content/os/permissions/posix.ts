import { LearningObject } from "@/lib/learning-objects";

export const posixLO: LearningObject = {
  id: "os:permissions:posix",
  title: "POSIX Permissions & UGO",
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
      businessContext: "Understanding POSIX Permissions & UGO is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to POSIX Permissions & UGO. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:permissions:posix",
    domain: "os",
    title: "POSIX Permissions & UGO",
    description: "Deep dive into POSIX Permissions & UGO and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying POSIX Permissions & UGO.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for POSIX Permissions & UGO."
  ],
};
