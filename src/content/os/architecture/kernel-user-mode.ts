import { LearningObject } from "@/lib/learning-objects";

export const kernelUserModeLO: LearningObject = {
  id: "os:architecture:kernel-user-mode",
  title: "Kernel Mode vs User Mode",
  domain: "os",
  
  metadata: {
    durationMinutes: 45,
    difficulty: "intermediate",
  },
  
  enterpriseContext: {
    asset: {
      assetId: "GFS-FIN-LAPTOP-01",
      type: "workstation",
      location: "GFS -> London -> Finance",
      os: "Windows 11 Enterprise",
      criticality: "high",
      businessContext: "This laptop processes quarterly financial statements. A kernel-level compromise here could lead to massive regulatory fines.",
    },
    story: "At 09:15 AM, the SOC received an alert for an unauthorized driver installation attempt on GFS-FIN-LAPTOP-01. Why does an attacker want to load a driver? Because drivers run in Kernel Mode. Let's understand why this boundary is the most important defense line in the operating system.",
  },
  
  knowledgeGraphNode: {
    id: "os:architecture:kernel-user-mode",
    domain: "os",
    title: "Kernel Mode vs User Mode",
    description: "The CPU privilege rings that separate untrusted applications from core OS components.",
    prerequisites: ["os:architecture:cpu-rings"],
    dependencies: ["os:architecture:system-calls", "os:kernel:drivers"],
    relatedConcepts: ["security:privilege-escalation"],
    relatedSimulators: ["sim:os:memory-viewer"],
    relatedLabs: ["lab:os:unauthorized-driver"],
    relatedCEHModules: ["cehv13:module-5-system-hacking"],
    enterpriseAssets: [],
    careerSkills: ["Incident Response", "Malware Analysis", "Endpoint Security"],
  },
  
  aiMentorContext: "The student is learning about the isolation between ring 3 (User) and ring 0 (Kernel). Focus on why malware wants ring 0 (rootkits) to hide from EDR.",
  
  simulatorHooks: ["sim:os:memory-viewer"],
  
  labs: [
    {
      id: "lab:os:unauthorized-driver",
      title: "Investigate Unauthorized Driver Load",
      missionBrief: "Determine if the suspicious driver 'finance_helper.sys' successfully loaded into kernel memory.",
      scenario: "An executable was run by the user. It attempted to load a driver.",
      evidence: {
        logs: ["Event ID 7045: A service was installed in the system. Service Name: finance_helper"],
      },
      validationRules: {
        mode: "ai-conversation",
        criteria: ["Identified the driver in kernel memory", "Explained the risk of Ring 0 access"],
      },
      hints: ["Look at the Memory Viewer simulator", "Check the load address"],
      aiPrompt: "Evaluate if the student understands that the driver achieved kernel execution.",
      reportTemplate: "# Incident Report\n\n## Findings\n\n## Mitigation\n",
      scoreRules: { maxScore: 100, penaltyPerHint: 10 },
      unlockRules: [],
    }
  ],
  
  assessmentReferences: [],
  interviewPreparation: [
    {
      question: "Why do EDR (Endpoint Detection and Response) solutions run in Kernel Mode?",
      modelAnswer: "EDR solutions need to monitor all system activity, including file I/O, registry modifications, and process creation. If they ran in User Mode, malware running in Kernel Mode (a rootkit) could easily blind or bypass them by intercepting the APIs the EDR relies on. Kernel Mode provides the highest level of privilege and visibility.",
    }
  ],
  careerSkills: ["Endpoint Security", "Malware Analysis"],
  acceptanceCriteria: [
    "Successfully complete the 'Investigate Unauthorized Driver Load' lab.",
    "Correctly answer the AI Mentor's question regarding EDR positioning."
  ],
};
