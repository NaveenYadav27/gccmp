import React, { useState } from "react";
import { Cpu, HardDrive, LayoutDashboard, TerminalSquare, AlertCircle } from "lucide-react";

export function OsSimulator() {
  const [activeTab, setActiveTab] = useState<"process" | "memory" | "boot">("process");

  return (
    <div className="flex flex-col h-[500px] border border-border/50 rounded-xl bg-background overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border/50 bg-surface-1 p-2">
        <button
          onClick={() => setActiveTab("process")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "process"
              ? "bg-cyber/20 text-cyber"
              : "text-muted-foreground hover:bg-surface-2"
          }`}
        >
          <LayoutDashboard className="h-4 w-4" /> Process Explorer
        </button>
        <button
          onClick={() => setActiveTab("memory")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "memory"
              ? "bg-cyber/20 text-cyber"
              : "text-muted-foreground hover:bg-surface-2"
          }`}
        >
          <Cpu className="h-4 w-4" /> Memory Viewer
        </button>
        <button
          onClick={() => setActiveTab("boot")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "boot"
              ? "bg-cyber/20 text-cyber"
              : "text-muted-foreground hover:bg-surface-2"
          }`}
        >
          <HardDrive className="h-4 w-4" /> Boot Sequence
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === "process" && <ProcessExplorer />}
        {activeTab === "memory" && <MemoryViewer />}
        {activeTab === "boot" && <BootSequence />}
      </div>
    </div>
  );
}

function ProcessExplorer() {
  const processes = [
    { pid: 0, name: "System Idle Process", user: "SYSTEM", mem: "8 K", cpu: "98" },
    { pid: 4, name: "System", user: "SYSTEM", mem: "1,204 K", cpu: "0" },
    { pid: 340, name: "smss.exe", user: "SYSTEM", mem: "1,024 K", cpu: "0" },
    { pid: 432, name: "csrss.exe", user: "SYSTEM", mem: "3,500 K", cpu: "0" },
    { pid: 504, name: "wininit.exe", user: "SYSTEM", mem: "2,100 K", cpu: "0" },
    { pid: 512, name: "services.exe", user: "SYSTEM", mem: "8,900 K", cpu: "0" },
    { pid: 524, name: "lsass.exe", user: "SYSTEM", mem: "14,500 K", cpu: "0" },
    { pid: 888, name: "svchost.exe", user: "SYSTEM", mem: "24,000 K", cpu: "0" },
    { pid: 900, name: "svchost.exe", user: "NETWORK SERVICE", mem: "12,000 K", cpu: "0" },
    { pid: 912, name: "svchost.exe", user: "LOCAL SERVICE", mem: "18,000 K", cpu: "0" },
    { pid: 1432, name: "explorer.exe", user: "Administrator", mem: "64,000 K", cpu: "1" },
    { pid: 1890, name: "chrome.exe", user: "Administrator", mem: "145,000 K", cpu: "0" },
    { pid: 2110, name: "chrome.exe", user: "Administrator", mem: "130,000 K", cpu: "0" },
    {
      pid: 6666,
      name: "unknown_svc.exe",
      user: "SYSTEM",
      mem: "1,024 K",
      cpu: "1",
      anomalous: true,
    },
  ];

  const [selectedPid, setSelectedPid] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full space-y-4 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <TerminalSquare className="h-5 w-5 text-cyber" />
        <h3 className="font-semibold">Process Explorer</h3>
      </div>
      <div className="rounded-md border border-border/50 overflow-hidden bg-surface-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-2">
            <tr>
              <th className="px-3 py-2 font-medium">PID</th>
              <th className="px-3 py-2 font-medium">Process Name</th>
              <th className="px-3 py-2 font-medium">User</th>
              <th className="px-3 py-2 font-medium">Memory</th>
              <th className="px-3 py-2 font-medium">CPU</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => (
              <tr
                key={p.pid}
                onClick={() => setSelectedPid(p.pid)}
                className={`border-t border-border/50 cursor-pointer transition-colors ${
                  selectedPid === p.pid ? "bg-cyber/10" : "hover:bg-surface-2/50"
                } ${p.anomalous ? "text-danger" : ""}`}
              >
                <td className="px-3 py-2 font-mono text-xs">{p.pid}</td>
                <td className="px-3 py-2 flex items-center gap-2">
                  {p.name}
                  {p.anomalous && <AlertCircle className="h-3 w-3 text-danger" />}
                </td>
                <td className="px-3 py-2">{p.user}</td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{p.mem}</td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{p.cpu}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedPid === 6666 && (
        <div className="p-3 rounded-md bg-danger/10 border border-danger/40 animate-fade-in-up">
          <p className="text-sm font-semibold text-danger">Anomaly Detected</p>
          <p className="text-xs mt-1">
            This process is running as SYSTEM but has no valid parent process. It is opening a
            network socket to an unknown IP.
          </p>
        </div>
      )}
    </div>
  );
}

function MemoryViewer() {
  return (
    <div className="flex flex-col h-full space-y-4 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <Cpu className="h-5 w-5 text-cyber" />
        <h3 className="font-semibold">Memory Mapping & Virtual Memory</h3>
      </div>
      <div className="relative h-64 w-full bg-surface-1 rounded-xl border border-border/50 flex p-4 gap-8">
        <div className="flex-1 border-2 border-dashed border-cyber/50 rounded-lg flex items-center justify-center relative bg-cyber/5">
          <span className="font-semibold text-cyber">User Space (Ring 3)</span>
          <div className="absolute top-4 left-4 right-4 h-12 bg-surface-2 rounded border border-border shadow-sm flex items-center justify-center text-xs font-mono">
            explorer.exe (Virtual: 0x00400000)
          </div>
          <div className="absolute top-20 left-4 right-4 h-12 bg-surface-2 rounded border border-border shadow-sm flex items-center justify-center text-xs font-mono">
            chrome.exe (Virtual: 0x00400000)
          </div>
        </div>
        <div className="flex-1 border-2 border-solid border-danger/50 rounded-lg flex items-center justify-center relative bg-danger/5">
          <span className="font-semibold text-danger">Kernel Space (Ring 0)</span>
          <div className="absolute top-4 left-4 right-4 bottom-4 bg-surface-2 rounded border border-border shadow-sm flex items-center justify-center flex-col gap-2">
            <div className="text-xs font-mono w-full px-4 text-center">ntoskrnl.exe</div>
            <div className="text-xs font-mono w-full px-4 text-center">hal.dll</div>
            <div className="text-xs font-mono w-full px-4 text-center border-t border-danger/40 pt-2 text-danger">
              malicious_rootkit.sys
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Virtual Memory allows both explorer.exe and chrome.exe to think they start at 0x00400000.
        The MMU translates these to different physical pages.
      </p>
    </div>
  );
}

function BootSequence() {
  const steps = [
    { name: "Power On", desc: "Motherboard receives power." },
    { name: "UEFI / BIOS", desc: "Performs POST, initializes hardware." },
    { name: "Bootloader", desc: "Grub / Windows Boot Manager loaded from EFI system partition." },
    { name: "Kernel Init", desc: "Kernel decompresses, mounts root filesystem." },
    { name: "Init / Systemd", desc: "Starts user space services (PID 1)." },
    { name: "Login Prompt", desc: "User can interact." },
  ];

  return (
    <div className="flex flex-col h-full space-y-4 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <HardDrive className="h-5 w-5 text-cyber" />
        <h3 className="font-semibold">Boot Sequence</h3>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full cyber-gradient flex items-center justify-center text-xs font-bold text-cyber-foreground shrink-0">
              {i + 1}
            </div>
            <div className="flex-1 bg-surface-1 border border-border/50 rounded-lg p-3">
              <p className="font-semibold text-sm">{step.name}</p>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
