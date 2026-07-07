import React, { useState, useEffect } from "react";
import { Activity, Globe, Server, ArrowRight, ArrowLeft, Terminal } from "lucide-react";
import { PacketAnalyzer } from "@/components/analyzers/PacketAnalyzer";

export function NetworkSimulator() {
  const [activeTab, setActiveTab] = useState<"tcp" | "osi" | "dns" | "analyzer">("tcp");

  return (
    <div className="flex flex-col h-[500px] border border-border/50 rounded-xl bg-background overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border/50 bg-surface-1 p-2">
        <button
          onClick={() => setActiveTab("tcp")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "tcp"
              ? "bg-cyber/20 text-cyber"
              : "text-muted-foreground hover:bg-surface-2"
          }`}
        >
          <Activity className="h-4 w-4" /> TCP Handshake
        </button>
        <button
          onClick={() => setActiveTab("osi")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "osi"
              ? "bg-cyber/20 text-cyber"
              : "text-muted-foreground hover:bg-surface-2"
          }`}
        >
          <Server className="h-4 w-4" /> OSI Encapsulation
        </button>
        <button
          onClick={() => setActiveTab("dns")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "dns"
              ? "bg-cyber/20 text-cyber"
              : "text-muted-foreground hover:bg-surface-2"
          }`}
        >
          <Globe className="h-4 w-4" /> DNS Resolution
        </button>
        <button
          onClick={() => setActiveTab("analyzer")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "analyzer"
              ? "bg-cyber/20 text-cyber"
              : "text-muted-foreground hover:bg-surface-2"
          }`}
        >
          <Terminal className="h-4 w-4" /> AI Packet Analyzer
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === "tcp" && <TcpHandshake />}
        {activeTab === "osi" && <OsiEncapsulation />}
        {activeTab === "dns" && <DnsResolution />}
        {activeTab === "analyzer" && <PacketAnalyzer />}
      </div>
    </div>
  );
}

function TcpHandshake() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fade-in-up">
      <div className="flex items-center gap-2 self-start">
        <Activity className="h-5 w-5 text-cyber" />
        <h3 className="font-semibold">TCP 3-Way Handshake</h3>
      </div>
      <div className="flex items-center justify-between w-full max-w-lg px-8 relative">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-xl bg-surface-2 border-2 border-cyber/50 flex items-center justify-center mb-2">
            <Globe className="h-8 w-8 text-cyber" />
          </div>
          <span className="font-semibold text-sm">Client</span>
          <span className="text-xs text-muted-foreground">10.0.0.5</span>
        </div>
        <div className="flex-1 relative h-32 flex flex-col justify-between items-center py-4">
          <div
            className={`w-full flex items-center transition-opacity duration-500 ${step >= 1 ? "opacity-100" : "opacity-10"}`}
          >
            <div className="flex-1 h-0.5 bg-cyber/50 relative">
              {step === 1 && (
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-cyber text-cyber-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-glow">
                  SYN
                </div>
              )}
            </div>
            <ArrowRight className="text-cyber/50 h-4 w-4 -ml-1" />
          </div>
          <div
            className={`w-full flex items-center transition-opacity duration-500 ${step >= 2 ? "opacity-100" : "opacity-10"}`}
          >
            <ArrowLeft className="text-success/50 h-4 w-4 -mr-1" />
            <div className="flex-1 h-0.5 bg-success/50 relative">
              {step === 2 && (
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-success text-success-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-glow">
                  SYN-ACK
                </div>
              )}
            </div>
          </div>
          <div
            className={`w-full flex items-center transition-opacity duration-500 ${step >= 3 ? "opacity-100" : "opacity-10"}`}
          >
            <div className="flex-1 h-0.5 bg-cyber/50 relative">
              {step === 3 && (
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-cyber text-cyber-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-glow">
                  ACK
                </div>
              )}
            </div>
            <ArrowRight className="text-cyber/50 h-4 w-4 -ml-1" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-xl bg-surface-2 border-2 border-success/50 flex items-center justify-center mb-2">
            <Server className="h-8 w-8 text-success" />
          </div>
          <span className="font-semibold text-sm">Server</span>
          <span className="text-xs text-muted-foreground">8.8.8.8</span>
        </div>
      </div>
      <div className="bg-surface-1 border border-border/50 rounded-lg p-4 max-w-lg text-sm text-center">
        {step === 0 && "Waiting to connect..."}
        {step === 1 && "Client sends SYN (synchronize sequence numbers) to initiate a connection."}
        {step === 2 && "Server receives SYN, replies with SYN-ACK (acknowledging the request)."}
        {step === 3 && "Client replies with ACK. Connection is now ESTABLISHED."}
      </div>
    </div>
  );
}

function OsiEncapsulation() {
  const layers = [
    { num: 7, name: "Application", protocol: "HTTP/DNS", data: "Data" },
    { num: 6, name: "Presentation", protocol: "TLS", data: "Data" },
    { num: 5, name: "Session", protocol: "Sockets", data: "Data" },
    { num: 4, name: "Transport", protocol: "TCP/UDP", data: "Segment" },
    { num: 3, name: "Network", protocol: "IP", data: "Packet" },
    { num: 2, name: "Data Link", protocol: "Ethernet", data: "Frame" },
    { num: 1, name: "Physical", protocol: "Cables/Wifi", data: "Bits" },
  ];

  return (
    <div className="flex flex-col h-full space-y-4 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <Server className="h-5 w-5 text-cyber" />
        <h3 className="font-semibold">OSI Model Encapsulation</h3>
      </div>
      <div className="grid gap-2 overflow-y-auto pr-2 pb-4">
        {layers.map((l) => (
          <div key={l.num} className="flex items-center gap-4 group">
            <div className="cyber-gradient flex h-8 w-8 items-center justify-center rounded font-mono text-xs font-bold text-cyber-foreground shrink-0 group-hover:shadow-glow transition-all">
              L{l.num}
            </div>
            <div className="flex-1 border border-border/50 bg-surface-1 rounded-md px-4 py-2 flex justify-between items-center group-hover:border-cyber/50 transition-colors">
              <span className="font-semibold">{l.name}</span>
              <span className="text-xs text-muted-foreground font-mono bg-surface-2 px-2 py-1 rounded">
                {l.protocol}
              </span>
            </div>
            <div className="w-24 text-right text-xs font-mono text-muted-foreground border-l border-border/50 pl-4 py-2">
              {l.data}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DnsResolution() {
  return (
    <div className="flex flex-col h-full space-y-4 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-cyber" />
        <h3 className="font-semibold">DNS Resolution</h3>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center">
        <div className="p-4 bg-surface-1 border border-border/50 rounded-xl">
          <p className="text-sm font-medium mb-2">Recursive Resolver</p>
          <p className="text-xs text-muted-foreground">
            Queries Root (.) &rarr; TLD (.com) &rarr; Authoritative (example.com)
          </p>
        </div>
        <p className="text-xs text-muted-foreground max-w-sm">
          Attackers abuse DNS by tunneling data in TXT records or using Domain Generation Algorithms
          (DGAs) for C2 beaconing.
        </p>
      </div>
    </div>
  );
}
