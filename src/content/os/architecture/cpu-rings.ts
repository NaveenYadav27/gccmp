import { LearningObject } from "@/lib/learning-objects";

export const cpuRingsLO: LearningObject = {
  id: "os:architecture:cpu-rings",
  title: "CPU Protection Rings",
  domain: "os",
  
  metadata: {
    durationMinutes: 30,
    difficulty: "beginner",
  },
  
  enterpriseContext: {
    asset: {
      assetId: "GFS-CORE-DC-01",
      type: "domain-controller",
      location: "GFS -> NYC -> Datacenter A",
      os: "Windows Server 2022",
      criticality: "critical",
      businessContext: "The primary Domain Controller authenticates all 42,000 employees. Understanding CPU rings is essential to grasping how the OS protects LSASS (Local Security Authority Subsystem Service) from standard user processes.",
    },
    story: "Before we talk about Kernel and User modes, we must understand the hardware's perspective. x86 architecture defines 4 protection rings (Ring 0 to Ring 3). GFS security policies heavily rely on the isolation provided by these rings.",
  },
  
  knowledgeGraphNode: {
    id: "os:architecture:cpu-rings",
    domain: "os",
    title: "CPU Protection Rings",
    description: "Hardware-enforced privilege levels that control access to memory and CPU instructions.",
    prerequisites: [],
    dependencies: ["os:architecture:kernel-user-mode", "os:architecture:system-calls"],
    relatedConcepts: ["security:hardware-isolation", "os:memory:virtual-memory"],
    relatedSimulators: [],
    relatedLabs: [],
    relatedCEHModules: [],
    enterpriseAssets: ["GFS-CORE-DC-01"],
    careerSkills: ["System Architecture", "Security Fundamentals"],
  },
  
  aiMentorContext: "The student is learning about the hardware basis of OS security (x86 rings 0-3). Emphasize that most modern OSes only use Ring 0 (Kernel) and Ring 3 (User), though hypervisors use Ring -1.",
  
  labs: [],
  
  assessmentReferences: [],
  interviewPreparation: [
    {
      question: "What is the difference between Ring 0 and Ring 3?",
      modelAnswer: "Ring 0 is the highest privilege level, typically reserved for the OS kernel and drivers, allowing direct access to hardware and memory. Ring 3 is the lowest privilege level where user applications run. Applications in Ring 3 cannot directly access hardware; they must request the kernel to do so via system calls.",
    }
  ],
  careerSkills: ["System Architecture"],
  acceptanceCriteria: [
    "Read the executive overview of CPU Rings.",
    "Correctly answer the interview question regarding Ring 0 vs Ring 3."
  ],
};
