import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Enterprise Hierarchy for Global Financial Services (GFS)
 */
export type HierarchyLevel =
  | "GFS"
  | "Region"
  | "Branch"
  | "Department"
  | "ServerRoom"
  | "Cloud"
  | "Employee"
  | "Workstation"
  | "Server"
  | "Application"
  | "OS"
  | "Process"
  | "Service"
  | "Threat";

export interface EnterpriseTimelineEvent {
  time: string;
  title: string;
  description: string;
  type: "alert" | "investigation" | "report" | "action";
  relatedAssetId: string;
}

export interface EnterpriseTimeMachineState {
  year: number;
  osGeneration: string;
  description: string;
}

export const ERAS: EnterpriseTimeMachineState[] = [
  { year: 2010, osGeneration: "Windows Server 2008 / Ubuntu 10", description: "Legacy architecture, heavily on-premise." },
  { year: 2015, osGeneration: "Windows Server 2012 / Ubuntu 16", description: "Virtualization era, early cloud." },
  { year: 2020, osGeneration: "Windows Server 2019 / Ubuntu 20", description: "Hybrid cloud, containerization." },
  { year: 2026, osGeneration: "Windows Server 2025 / Ubuntu 24", description: "Zero-trust, AI-native infrastructure." },
];

export function HierarchicalDigitalTwin() {
  const [currentLevel, setCurrentLevel] = useState<HierarchyLevel>("GFS");
  const [selectedEra, setSelectedEra] = useState<EnterpriseTimeMachineState>(ERAS[3]);
  const [timelineEvents] = useState<EnterpriseTimelineEvent[]>([
    { time: "08:30", title: "Arrive at GFS", description: "Shift begins in the London SOC.", type: "action", relatedAssetId: "GFS-LON-SOC" },
    { time: "09:00", title: "High CPU Alert", description: "Finance Laptop 01 reported 100% CPU usage.", type: "alert", relatedAssetId: "GFS-FIN-LAPTOP-01" },
    { time: "09:15", title: "Investigate OS", description: "Opened Process Explorer on the target asset.", type: "investigation", relatedAssetId: "GFS-FIN-LAPTOP-01" },
  ]);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top Bar: Time Machine & Status */}
      <Card className="bg-card shadow-lg border-border">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight text-primary">Global Financial Services (GFS)</h2>
            <Badge variant="outline" className="font-mono">Status: ACTIVE</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Enterprise Time Machine:</span>
            {ERAS.map((era) => (
              <Button
                key={era.year}
                variant={selectedEra.year === era.year ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedEra(era)}
              >
                {era.year}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-4 flex-1 h-[600px]">
        {/* Left Col: Timeline */}
        <Card className="col-span-1 bg-black/40 border-border overflow-hidden flex flex-col">
          <CardHeader className="bg-muted/50 py-3">
            <CardTitle className="text-sm font-semibold">Enterprise Timeline</CardTitle>
          </CardHeader>
          <CardContent className="p-4 overflow-y-auto flex-1 space-y-4">
            {timelineEvents.map((ev, i) => (
              <div key={i} className="flex gap-3 relative pl-4 border-l-2 border-primary/30">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-primary" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-primary">{ev.time}</span>
                  <span className="text-sm font-semibold">{ev.title}</span>
                  <span className="text-xs text-muted-foreground">{ev.description}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Col: Hierarchical View */}
        <Card className="col-span-3 bg-black/40 border-border overflow-hidden flex flex-col">
          <CardHeader className="bg-muted/50 py-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">Asset Topology: {currentLevel}</CardTitle>
            <Badge className="font-mono">{selectedEra.osGeneration}</Badge>
          </CardHeader>
          <CardContent className="p-6 flex-1 relative flex items-center justify-center">
            {/* Placeholder for the interactive D3/React Flow Graph of the hierarchy */}
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Interactive Navigation mapped to:</p>
              <h3 className="text-2xl font-bold text-primary">
                GFS &rarr; London &rarr; Finance Dept &rarr; Laptop 01
              </h3>
              <p className="text-sm text-muted-foreground">Clicking a node drills down into the asset OS simulators.</p>
              <div className="flex justify-center gap-2 mt-4">
                <Button variant="secondary" onClick={() => setCurrentLevel("Workstation")}>Zoom to Workstation</Button>
                <Button variant="outline" onClick={() => setCurrentLevel("OS")}>View Operating System</Button>
                <Button onClick={() => setCurrentLevel("Process")}>Inspect Processes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
