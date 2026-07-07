import { useState } from "react";
import { 
  Building2, 
  Terminal, 
  Network, 
  BookOpen, 
  AlertTriangle,
  PlayCircle,
  Briefcase,
  Shield,
  Activity,
  Server,
  ArrowRight
} from "lucide-react";
import { F01_MODULE } from "@/content/foundation/f01-digital-world";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningObject } from "@/lib/learning-objects";

export function FoundationEnterpriseEngine({ topicSlug }: { topicSlug: string }) {
  // Currently wiring F01. Future topics will be dynamically resolved.
  const moduleData = topicSlug === "digital-world" ? F01_MODULE : null;

  if (!moduleData) {
    return <div>Module data not found for {topicSlug}</div>;
  }

  const [activeLO, setActiveLO] = useState<LearningObject>(moduleData.learningObjects[0]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Left Sidebar: Learning Objects List */}
      <div className="w-80 border-r border-border/60 bg-surface-1 overflow-y-auto hidden md:block p-4">
        <div className="mb-6">
          <Badge variant="outline" className="mb-2 text-cyber border-cyber/50">
            {moduleData.title.split(":")[0]}
          </Badge>
          <h2 className="font-bold text-lg leading-tight">{moduleData.title.split(":")[1]}</h2>
          <p className="text-xs text-muted-foreground mt-1">{moduleData.description}</p>
        </div>

        <div className="space-y-3">
          {moduleData.learningObjects.map((lo, idx) => (
            <div 
              key={lo.id}
              onClick={() => setActiveLO(lo)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                activeLO.id === lo.id 
                  ? "border-cyber bg-cyber/10 shadow-[0_0_15px_rgba(0,255,170,0.1)]" 
                  : "border-border/60 hover:border-cyber/50 glass-panel"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Part {idx + 1}</span>
                <Badge variant="outline" className="text-[9px] h-4">{lo.metadata.durationMinutes}m</Badge>
              </div>
              <div className="font-medium text-sm leading-tight">{lo.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area: The Enterprise Engine */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pb-32">
        {/* Header: Enterprise Context */}
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl cyber-gradient shadow-glow shrink-0">
              <Building2 className="h-6 w-6 text-cyber-foreground" />
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyber">
                Global Financial Services
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {activeLO.title}
              </h1>
            </div>
          </div>
          
          <div className="glass-panel p-4 rounded-xl border-destructive/30 bg-destructive/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-destructive" />
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-destructive">INCIDENT ALERT</h3>
                <p className="text-sm mt-1 text-foreground/90">{activeLO.enterpriseContext.story}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Engine Tabs */}
        <Tabs defaultValue="executive" className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 h-auto mb-6 bg-surface-1/50">
            <TabsTrigger value="executive" className="text-xs py-2">Executive Brief</TabsTrigger>
            <TabsTrigger value="business" className="text-xs py-2">Business Risk</TabsTrigger>
            <TabsTrigger value="theory" className="text-xs py-2">Architecture</TabsTrigger>
            <TabsTrigger value="asset" className="text-xs py-2">Asset Context</TabsTrigger>
            <TabsTrigger value="lab" className="text-xs py-2 text-cyber data-[state=active]:text-cyber data-[state=active]:shadow-glow-sm">Proxmox Lab</TabsTrigger>
          </TabsList>

          <TabsContent value="executive" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Briefcase className="h-4 w-4 text-cyber"/> Business View</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{activeLO.executiveBrief.businessExplanation}</p>
                </CardContent>
              </Card>
              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Server className="h-4 w-4 text-cyber"/> Technical View</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{activeLO.executiveBrief.technicalExplanation}</p>
                </CardContent>
              </Card>
              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Shield className="h-4 w-4 text-cyber"/> SOC View</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{activeLO.executiveBrief.socExplanation}</p>
                </CardContent>
              </Card>
              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Activity className="h-4 w-4 text-cyber"/> Manager View</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{activeLO.executiveBrief.managerExplanation}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4">Enterprise Dependency</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-bold text-cyber mb-1">Financial Impact</h4>
                  <p className="text-sm text-muted-foreground">{activeLO.enterpriseContext.financialImpact}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cyber mb-1">Operational Impact</h4>
                  <p className="text-sm text-muted-foreground">{activeLO.enterpriseContext.operationalImpact}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cyber mb-1">Compliance & Regulatory</h4>
                  <p className="text-sm text-muted-foreground">{activeLO.enterpriseContext.complianceImpact}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cyber mb-1">Real World Incidents</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {activeLO.enterpriseContext.realIncidents.map((inc, i) => (
                      <li key={i}>{inc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="theory" className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4">Architecture & Theory</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm leading-relaxed">{activeLO.traditionalLearning.theory}</p>
                </div>
                <div className="p-4 bg-black/40 rounded-lg font-mono text-xs text-cyber/80 border border-border/50">
                  {activeLO.traditionalLearning.architecture}
                </div>
                
                <div>
                  <h4 className="text-sm font-bold mb-2">Key Terminology</h4>
                  <div className="grid gap-2">
                    {Object.entries(activeLO.traditionalLearning.terminology).map(([term, def]) => (
                      <div key={term} className="text-sm">
                        <span className="font-bold text-cyber">{term}:</span> <span className="text-muted-foreground">{def}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="asset" className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border-cyber/30">
              <div className="flex items-center gap-3 mb-6">
                <Network className="h-6 w-6 text-cyber" />
                <h3 className="font-bold text-lg">Digital Twin Integration</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-border/60 rounded-xl bg-surface-1/50">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Asset ID</div>
                  <div className="font-mono font-bold text-cyber">{activeLO.enterpriseContext.asset.assetId}</div>
                </div>
                <div className="p-4 border border-border/60 rounded-xl bg-surface-1/50">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Location</div>
                  <div className="text-sm">{activeLO.enterpriseContext.asset.location}</div>
                </div>
                <div className="p-4 border border-border/60 rounded-xl bg-surface-1/50">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Type</div>
                  <div className="text-sm uppercase">{activeLO.enterpriseContext.asset.type}</div>
                </div>
                <div className="p-4 border border-border/60 rounded-xl bg-surface-1/50">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">OS</div>
                  <div className="text-sm">{activeLO.enterpriseContext.asset.os}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{activeLO.enterpriseContext.asset.businessContext}</p>
            </div>
          </TabsContent>

          <TabsContent value="lab" className="space-y-6">
            {activeLO.labs.map(lab => (
              <div key={lab.id} className="glass-panel p-6 rounded-2xl border-cyber border-opacity-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Terminal className="w-32 h-32" />
                </div>
                
                <div className="relative z-10">
                  <Badge className="bg-cyber text-cyber-foreground hover:bg-cyber/80 mb-3">Enterprise Lab Validated</Badge>
                  <h3 className="font-bold text-2xl mb-2">{lab.title}</h3>
                  <p className="text-foreground/80 mb-6">{lab.missionBrief}</p>
                  
                  <div className="bg-black/60 border border-border/60 rounded-xl p-4 mb-6">
                    <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Infrastructure Hook</h4>
                    <div className="flex gap-2 mb-4">
                      {lab.infrastructure.vms.map(vm => (
                        <Badge key={vm} variant="outline" className="font-mono bg-surface-1/50">{vm}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{lab.scenario}</p>
                  </div>

                  <div className="flex gap-4">
                    <Button className="cyber-button">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Provision Proxmox Lab
                    </Button>
                    <Button variant="outline">
                      View Architecture Diagram
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
