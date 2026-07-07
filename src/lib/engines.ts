import { LearningObject, LabDefinition, SimulatorAction } from "./learning-objects";

/**
 * 1. PRESENTATION ENGINE
 * Consumes a Learning Object and generates presentation assets.
 */
export class PresentationEngine {
  public static generateInstructorPPT(lo: LearningObject): string {
    return `[PPT] ${lo.title} - ${lo.metadata.durationMinutes} mins\n` + 
           `Context: ${lo.enterpriseContext.story}`;
  }

  public static generateStudentNotes(lo: LearningObject): string {
    return `# Notes: ${lo.title}\n\n${lo.enterpriseContext.story}\n\n` + 
           `## Key Concepts\n- ` + lo.knowledgeGraphNode.relatedConcepts.join("\n- ");
  }

  public static generateFlashCards(lo: LearningObject): { q: string; a: string }[] {
    return lo.interviewPreparation.map((prep) => ({
      q: prep.question,
      a: prep.modelAnswer,
    }));
  }
}

/**
 * 2. EVIDENCE ENGINE
 * Captures student progress during labs and produces SOC/Incident reports.
 */
export interface LabEvidence {
  labId: string;
  studentId: string;
  startTime: string;
  endTime: string;
  simulatorActions: SimulatorAction[];
  notes: string[];
  findings: string;
  aiSummary: string;
}

export class EvidenceEngine {
  public static generateSOCReport(evidence: LabEvidence): string {
    return `
      # SOC INCIDENT REPORT
      **Lab:** ${evidence.labId}
      **Analyst:** ${evidence.studentId}
      **Time:** ${evidence.startTime} to ${evidence.endTime}
      
      ## Actions Taken
      ${evidence.simulatorActions.map((a) => `- [${a.timestamp}] ${a.type}: ${JSON.stringify(a.payload)}`).join("\n")}
      
      ## Analyst Findings
      ${evidence.findings}
      
      ## AI Summary
      ${evidence.aiSummary}
    `;
  }
}

/**
 * 3. MULTI-MODAL LAB VALIDATION ENGINE
 */
export class LabValidationEngine {
  public static validateAutomatically(lab: LabDefinition, actions: SimulatorAction[]): boolean {
    if (lab.validationRules.mode !== "automatic") return false;
    
    // Very simple check: see if the required criteria strings appear in the action payloads
    return lab.validationRules.criteria.every((criterion) => 
      actions.some((a) => JSON.stringify(a.payload).includes(criterion))
    );
  }

  public static async validateViaAi(lab: LabDefinition, studentExplanation: string): Promise<{ score: number; feedback: string }> {
    if (lab.validationRules.mode !== "ai-conversation") throw new Error("Wrong validation mode");
    
    // This would call evaluateMission from ai-mentor.functions.ts in a real implementation
    return {
      score: 85,
      feedback: "Good explanation, but you missed checking the child processes.",
    };
  }
}
