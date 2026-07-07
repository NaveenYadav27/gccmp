import { systemCallsLO } from "./architecture/system-calls";
import { interruptsLO } from "./kernel/interrupts";
import { halLO } from "./kernel/hal";
import { lifecycleLO } from "./processes/lifecycle";
import { ipcLO } from "./processes/ipc";
import { schedulingLO } from "./threads/scheduling";
import { contextSwitchLO } from "./threads/context-switch";
import { virtualMemoryLO } from "./memory/virtual-memory";
import { pageFaultsLO } from "./memory/page-faults";
import { heapStackLO } from "./memory/heap-stack";
import { ntfsExt4LO } from "./filesystem/ntfs-ext4";
import { journalingLO } from "./filesystem/journaling";
import { aclLO } from "./permissions/acl";
import { posixLO } from "./permissions/posix";
import { lsassLO } from "./authentication/lsass";
import { pamLO } from "./authentication/pam";
import { uefiBiosLO } from "./boot/uefi-bios";
import { secureBootLO } from "./boot/secure-boot";
import { systemdLO } from "./boot/systemd";
import { daemonsLO } from "./services/daemons";
import { hivesLO } from "./registry/hives";
import { eventTracingLO } from "./logging/event-tracing";
import { syslogLO } from "./logging/syslog";
import { aslrDepLO } from "./security/aslr-dep";
import { cgroupsLO } from "./security/cgroups";
import { bottlenecksLO } from "./performance/bottlenecks";
import { cpuRingsLO } from "./architecture/cpu-rings";
import { kernelUserModeLO } from "./architecture/kernel-user-mode";
import { LearningObject } from "@/lib/learning-objects";

export const osLearningObjects: LearningObject[] = [
  cpuRingsLO,
  kernelUserModeLO,
  systemCallsLO,
  interruptsLO,
  halLO,
  lifecycleLO,
  ipcLO,
  schedulingLO,
  contextSwitchLO,
  virtualMemoryLO,
  pageFaultsLO,
  heapStackLO,
  ntfsExt4LO,
  journalingLO,
  aclLO,
  posixLO,
  lsassLO,
  pamLO,
  uefiBiosLO,
  secureBootLO,
  systemdLO,
  daemonsLO,
  hivesLO,
  eventTracingLO,
  syslogLO,
  aslrDepLO,
  cgroupsLO,
  bottlenecksLO,
];

export const OS_LEARNING_PATH = {
  id: "path:os:core",
  title: "Operating Systems Core",
  description: "A 20-25 hour enterprise deep dive into Operating Systems.",
  modules: [
    {
      id: "module:os:architecture",
      title: "Module 1: Architecture & Internals",
      learningObjects: [
        "os:architecture:cpu-rings",
        "os:architecture:kernel-user-mode",
        "os:architecture:system-calls"
      ]
    },
    {
      id: "module:os:kernel",
      title: "Module 2: Kernel & Hardware",
      learningObjects: [
        "os:kernel:hal",
        "os:kernel:interrupts"
      ]
    },
    {
      id: "module:os:processes",
      title: "Module 3: Processes & Threads",
      learningObjects: [
        "os:processes:lifecycle",
        "os:processes:ipc",
        "os:threads:context-switch",
        "os:threads:scheduling"
      ]
    },
    {
      id: "module:os:memory",
      title: "Module 4: Memory Management",
      learningObjects: [
        "os:memory:heap-stack",
        "os:memory:virtual-memory",
        "os:memory:page-faults"
      ]
    }
  ]
};
