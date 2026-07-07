import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * SimulatorEngine is the reusable engine that powers all specialized simulators
 * (e.g., OS Process Explorer, Linux Filesystem, Network Monitor).
 */

export interface SimulatorAction {
  type: string;
  payload: any;
  timestamp: string;
}

export interface SimulatorEngineProps<TState> {
  title: string;
  description: string;
  initialState: TState;
  
  // Render Prop: Passes down the state, dispatcher, and action logger to the specific UI
  renderSimulator: (props: {
    state: TState;
    setState: React.Dispatch<React.SetStateAction<TState>>;
    logAction: (actionType: string, payload: any) => void;
  }) => React.ReactNode;
  
  // Evidence Engine Hooks
  onEvidenceGenerated?: (evidence: SimulatorAction[]) => void;
}

export function SimulatorEngine<TState>({
  title,
  description,
  initialState,
  renderSimulator,
  onEvidenceGenerated,
}: SimulatorEngineProps<TState>) {
  const [state, setState] = useState<TState>(initialState);
  const [actionLog, setActionLog] = useState<SimulatorAction[]>([]);

  const logAction = useCallback((actionType: string, payload: any) => {
    const action: SimulatorAction = {
      type: actionType,
      payload,
      timestamp: new Date().toISOString(),
    };
    setActionLog((prev) => [...prev, action]);
  }, []);

  const handleGenerateEvidence = () => {
    if (onEvidenceGenerated) {
      onEvidenceGenerated(actionLog);
    }
  };

  return (
    <Card className="border-border bg-card shadow-2xl overflow-hidden flex flex-col h-[700px]">
      <CardHeader className="bg-muted/50 border-b border-border/50 py-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <span className="bg-primary/20 p-1.5 rounded-md text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M17 7h.01" />
                <path d="M11 7h.01" />
                <path d="M7 11h10" />
                <path d="M7 15h10" />
              </svg>
            </span>
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Events Logged: {actionLog.length}
          </Badge>
          <Button variant="secondary" size="sm" onClick={handleGenerateEvidence}>
            Generate Evidence
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-hidden relative bg-black/40">
        {/* Render the specialized simulator here */}
        <div className="absolute inset-0 overflow-auto">
          {renderSimulator({ state, setState, logAction })}
        </div>
      </CardContent>
    </Card>
  );
}
