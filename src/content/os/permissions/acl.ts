import { LearningObject } from "@/lib/learning-objects";

export const aclLO: LearningObject = {
  id: "os:permissions:acl",
  title: "Access Control Lists (ACL)",
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
      businessContext: "Understanding Access Control Lists (ACL) is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to Access Control Lists (ACL). Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:permissions:acl",
    domain: "os",
    title: "Access Control Lists (ACL)",
    description: "Deep dive into Access Control Lists (ACL) and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying Access Control Lists (ACL).",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for Access Control Lists (ACL)."
  ],
};
