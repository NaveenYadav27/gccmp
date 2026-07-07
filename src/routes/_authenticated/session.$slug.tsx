import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Clock, Server, Terminal, ShieldAlert, Cpu } from "lucide-react";
import { osLearningObjects } from "@/content/os";
import { LearningObject } from "@/lib/learning-objects";
import { markSessionStarted, updateSessionProgress } from "@/lib/progress-hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HierarchicalDigitalTwin } from "@/components/digital-twin/HierarchicalDigitalTwin";
import { SimulatorEngine } from "@/components/engines/simulator-engine/SimulatorEngine";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/session/$slug")({
  loader: ({ params }) => {
    const lo = osLearningObjects.find(obj => obj.id === params.slug);
    if (!lo) throw notFound();
    return { lo };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.lo.title ?? "Module"} — Cybersec Masters` }],
  }),
  component: SessionPage,
});

function SessionPage() {
  const { lo } = Route.useLoaderData() as { lo: LearningObject };
  const qc = useQueryClient();

  useEffect(() => {
    // We keep legacy progress hooks to avoid breaking progress entirely for now
    markSessionStarted(lo.id).then(() =>
      qc.invalidateQueries({ queryKey: ["my-progress"] }),
    );
    updateSessionProgress(lo.id, 10);
  }, [lo.id, qc]);

  const completeConcept = () => {
    updateSessionProgress(lo.id, 100);
    qc.invalidateQueries({ queryKey: ["my-progress"] });
    toast.success(`Concept ${lo.title} mastered. +50 XP`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-xs">
        <Link
          to="/roadmap"
          className="text-muted-foreground hover:text-cyber"
        >
          OS Curriculum
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-foreground">
          {lo.domain.toUpperCase()}
        </span>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-foreground">
          {lo.title}
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Context & Concept */}
        <div className="xl:col-span-1 space-y-6">
          <header className="glass-panel relative overflow-hidden rounded-2xl p-6">
            <div className="grid-bg absolute inset-0 opacity-15" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyber/15 blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="cyber-gradient text-cyber-foreground">
                  {lo.domain.toUpperCase()} MODULE
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  <Clock className="mr-1 h-2.5 w-2.5" />
                  {lo.metadata.durationMinutes}m
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {lo.metadata.difficulty.toUpperCase()}
                </Badge>
              </div>
              <h1 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">{lo.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{lo.knowledgeGraphNode.description}</p>
            </div>
          </header>

          <Card className="glass-panel p-5">
            <h3 className="flex items-center gap-2 font-bold mb-3"><ShieldAlert className="w-4 h-4 text-cyber"/> Enterprise Context</h3>
            <p className="text-sm leading-relaxed mb-4">{lo.enterpriseContext.story}</p>
            {lo.enterpriseContext.asset && (
              <div className="p-3 bg-surface-1 rounded border border-border/50 text-xs">
                <div className="font-mono text-cyber mb-1">{lo.enterpriseContext.asset.assetId}</div>
                <div className="text-muted-foreground">{lo.enterpriseContext.asset.os} - {lo.enterpriseContext.asset.location}</div>
                <div className="mt-2 pt-2 border-t border-border/50">{lo.enterpriseContext.asset.businessContext}</div>
              </div>
            )}
          </Card>
          
          <Card className="glass-panel p-5">
             <h3 className="flex items-center gap-2 font-bold mb-3"><Server className="w-4 h-4 text-cyber"/> Dependencies & Skills</h3>
             <div className="space-y-4 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs mb-1">Prerequisites</div>
                  {lo.knowledgeGraphNode.prerequisites.length > 0 ? (
                    lo.knowledgeGraphNode.prerequisites.map(p => <Badge key={p} variant="secondary" className="mr-1">{p.split(':').pop()}</Badge>)
                  ) : <span className="text-xs">None</span>}
                </div>
                <div>
                  <div className="text-muted-foreground text-xs mb-1">Career Skills</div>
                  {lo.careerSkills.map(s => <Badge key={s} variant="outline" className="mr-1 border-cyber/30 text-cyber">{s}</Badge>)}
                </div>
             </div>
          </Card>
        </div>

        {/* Right Column: Digital Twin & Interactive Lab */}
        <div className="xl:col-span-2 space-y-6">
          {/* 1. Digital Twin UI Shell */}
          <div className="rounded-2xl border border-border bg-surface-1 p-2 h-[350px]">
             <HierarchicalDigitalTwin assetId={lo.enterpriseContext.asset?.assetId || "GFS-GLOBAL"} />
          </div>

          {/* 2. Simulator Engine Shell */}
          <div className="rounded-2xl border border-border bg-surface-1 p-2 h-[450px]">
            {lo.labs && lo.labs.length > 0 ? (
              <SimulatorEngine labDefinition={lo.labs[0]} />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                 <Terminal className="w-12 h-12 opacity-20" />
                 <p>No interactive lab specified for this concept.</p>
                 <Button onClick={completeConcept} className="cyber-gradient text-cyber-foreground mt-4">Acknowledge & Complete</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
