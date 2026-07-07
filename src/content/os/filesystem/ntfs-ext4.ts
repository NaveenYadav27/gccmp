import { LearningObject } from "@/lib/learning-objects";

export const ntfsExt4LO: LearningObject = {
  id: "os:filesystem:ntfs-ext4",
  title: "NTFS vs EXT4 Structures",
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
      businessContext: "Understanding NTFS vs EXT4 Structures is critical for diagnosing security and performance anomalies in GFS infrastructure.",
    },
    story: "As a SOC analyst at GFS, you frequently encounter alerts related to NTFS vs EXT4 Structures. Let's break down how this mechanism works.",
  },
  
  knowledgeGraphNode: {
    id: "os:filesystem:ntfs-ext4",
    domain: "os",
    title: "NTFS vs EXT4 Structures",
    description: "Deep dive into NTFS vs EXT4 Structures and its security implications.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: [],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: [],
    careerSkills: ["Endpoint Security"],
  },
  
  aiMentorContext: "Student is studying NTFS vs EXT4 Structures.",
  
  labs: [],
  assessmentReferences: [],
  interviewPreparation: [],
  careerSkills: ["Endpoint Security"],
  acceptanceCriteria: [
    "Review the module content for NTFS vs EXT4 Structures."
  ],
};
