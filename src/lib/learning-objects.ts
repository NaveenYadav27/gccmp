/**
 * CORE ENGINES & LEARNING OBJECT (LO) FRAMEWORK
 * CyberOS Enterprise - Milestone 1
 */

// ============================================================================
// 1. KNOWLEDGE GRAPH
// ============================================================================

export type Domain = "os" | "networking" | "linux" | "windows" | "security" | "infrastructure" | "digital-world" | "binary" | "hex" | "virtualization" | "landscape" | "ethical-hacking" | "computer-fundamentals";

export interface KnowledgeGraphNode {
  id: string; // e.g. "os:kernel:system-calls"
  domain: Domain;
  title: string;
  description: string;
  
  // The Brain: Everything this node connects to
  prerequisites: string[]; // Node IDs
  dependencies: string[]; // Node IDs
  relatedConcepts: string[]; // Node IDs
  
  // References to external/learning assets
  relatedSimulators: string[]; // Simulator IDs
  relatedLabs: string[]; // Lab IDs
  relatedCEHModules: string[]; // e.g. "cehv13:module-5"
  
  // Enterprise Context
  enterpriseAssets: EnterpriseAsset[];
  careerSkills: string[];
}

// ============================================================================
// 2. ENTERPRISE DIGITAL TWIN & ASSETS
// ============================================================================

export interface EnterpriseAsset {
  assetId: string; // e.g. "GFS-FIN-LAPTOP-01"
  type: "workstation" | "server" | "router" | "firewall" | "cloud-instance" | "domain-controller" | "application" | "database";
  location: string; // e.g. "Global Financial Services -> NYC Branch -> Floor 4"
  os: string;
  criticality: "low" | "medium" | "high" | "critical";
  businessContext: string;
}

// ============================================================================
// 3. MULTI-MODAL LAB ENGINE
// ============================================================================

export type ValidationMode = "automatic" | "ai-conversation" | "instructor-review" | "simulator";

export interface EvidenceEngineRequirements {
  requiresCommands: boolean;
  requiresScreenshots: boolean;
  requiresTimeline: boolean;
  requiresLogs: boolean;
  requiresPcap: boolean;
  requiresConfiguration: boolean;
  requiresRegistryExport: boolean;
  requiresFindings: boolean;
  requiresRecommendations: boolean;
  requiresSocReport: boolean;
  requiresExecutiveSummary: boolean;
}

export interface LabDefinition {
  id: string;
  title: string;
  missionBrief: string;
  scenario: string;
  infrastructure: {
    type: "proxmox" | "docker" | "simulator" | "cloud";
    diagramUrl?: string;
    vms: string[]; // e.g. ["ubuntu-web", "windows-dc", "kali-attacker"]
  };
  evidence: EvidenceEngineRequirements;
  validationRules: {
    mode: ValidationMode;
    criteria: string[]; // e.g. ["User terminated PID 6666", "User isolated host from network"]
  };
  hints: string[];
  aiPrompt: string; // Context passed to AI for grading in ai-conversation mode
  reportTemplate: string; // Markdown template for the Evidence Engine
  unlockRules: string[]; // IDs of LOs unlocked upon completion
  scoreRules: {
    maxScore: number;
    penaltyPerHint: number;
  };
}

// ============================================================================
// 4. ANIMATION ENGINE
// ============================================================================

export interface AnimationFrame {
  id: string;
  title: string;
  voiceover: string; // Text to be read or displayed as subtitles
  visualState: any; // State passed to the renderer (SVG/Canvas)
  highlights: string[]; // Elements to glow or focus on
  interactiveElements?: {
    elementId: string;
    onClickAction: string;
  }[];
}

export interface AnimationStoryboard {
  id: string;
  frames: AnimationFrame[];
  aiExplanationPrompt: string; // Context for AI Mentor if user asks about this animation
}

// ============================================================================
// 5. THE LEARNING OBJECT (LO)
// ============================================================================
// The smallest, independently deployable unit of learning.

export interface LearningObject {
  id: string; // e.g. "os:architecture:kernel-mode"
  title: string;
  domain: Domain;
  
  // Metadata & Context
  metadata: {
    durationMinutes: number;
    difficulty: "beginner" | "intermediate" | "advanced";
  };
  
  // 1. Executive Brief
  executiveBrief: {
    businessExplanation: string;
    technicalExplanation: string;
    socExplanation: string;
    administratorExplanation: string;
    managerExplanation: string;
    aiExplanation: string;
  };
  
  // 2. Enterprise Context
  enterpriseContext: {
    asset: EnterpriseAsset;
    story: string;
    whyCompaniesUseThis: string;
    businessRisk: string;
    businessDependency: string;
    financialImpact: string;
    operationalImpact: string;
    complianceImpact: string;
    realIncidents: string[];
  };
  
  // 3. Traditional Learning
  traditionalLearning: {
    theory: string;
    architecture: string;
    history: string;
    terminology: Record<string, string>;
    industryStandards: string[];
    commonMistakes: string[];
  };
  
  // Core Content (Engines consume these)
  visualExplanation?: {
    type: "static" | "diagram";
    content: string; // Markdown or SVG
  };
  animation?: AnimationStoryboard;
  
  // Graph & Integration
  knowledgeGraphNode: KnowledgeGraphNode;
  aiMentorContext: string; // Deep context injected into the AI Mentor Engine
  
  // Interactive Elements
  simulatorHooks?: string[]; // IDs of simulators embedded in this LO
  labs: LabDefinition[];
  
  // Assessments & Outcomes
  assessmentReferences: string[]; // IDs of mini-quizzes
  interviewPreparation: {
    question: string;
    modelAnswer: string;
  }[];
  careerSkills: string[];
  
  // Tracking
  acceptanceCriteria: string[]; // What must the student do to complete this LO?
}
