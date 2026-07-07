import { LearningObject } from "@/lib/learning-objects";

export const digitalBusinessLO: LearningObject = {
  id: "digital-world:business-applications",
  title: "Digital Business & Applications",
  domain: "digital-world",
  
  metadata: {
    durationMinutes: 150,
    difficulty: "beginner",
  },

  executiveBrief: {
    businessExplanation: "A modern bank is not a vault holding cash; it is a software application holding a ledger. When the application goes down, the bank ceases to function.",
    technicalExplanation: "Applications are composed of front-end web servers, middle-tier API gateways, and back-end database clusters. A failure at any tier cascadingly drops customer traffic.",
    socExplanation: "Attackers target the application logic (Layer 7) to manipulate financial ledgers or steal customer PII. You must monitor application logs (WAF, IIS, Nginx) alongside network traffic.",
    administratorExplanation: "You are responsible for the uptime of these distributed services. You must manage load balancers, SSL certificates, and server health to ensure 99.999% availability.",
    managerExplanation: "Downtime costs GFS $100,000 per minute in lost transactions and SLA penalties. We prioritize incident response for Tier 1 applications.",
    aiExplanation: "I will guide the student through the architecture of a 3-tier web application and explain how a single point of failure disrupts the business.",
  },

  enterpriseContext: {
    asset: {
      assetId: "GFS-PROD-WEB-01",
      type: "server",
      location: "GFS -> NYC Datacenter -> Rack 42",
      os: "Ubuntu 22.04 LTS",
      criticality: "critical",
      businessContext: "This server hosts the public-facing Retail Banking portal. 2 million customers rely on this interface daily.",
    },
    story: "INCIDENT ALERT: At 09:15 AM EST, the GFS Retail Banking portal went offline. Customers are taking to Twitter/X to complain. The Help Desk is overwhelmed. You have been assigned to trace the banking transaction flow and identify the failure.",
    whyCompaniesUseThis: "Companies build web applications to provide self-service capabilities to customers globally, 24/7, without requiring human tellers.",
    businessRisk: "If the application is compromised, attackers can siphon funds, steal identities, or ransomware the database.",
    businessDependency: "The entire retail banking revenue stream depends on this application.",
    financialImpact: "Outages cost $100k/minute. Data breaches cost an average of $4.45M per IBM's report, plus severe regulatory fines (GDPR, NYDFS).",
    operationalImpact: "Call centers flood with angry customers. Branch staff cannot process transactions because their internal tools use the same API.",
    complianceImpact: "PCI-DSS requires strict logging and segmentation. Any breach triggers mandatory reporting to regulators within 72 hours.",
    realIncidents: [
      "2017 Equifax Breach (Vulnerable web application framework).",
      "2021 Twitch Source Code Leak (Misconfigured server).",
    ],
  },

  traditionalLearning: {
    theory: "A modern digital enterprise operates on a 3-tier architecture: Presentation (Frontend), Logic (Backend/API), and Data (Database). When a user clicks 'Transfer Funds', a REST API call is made over HTTPS, handled by a web server, processed by application code, and committed to a SQL database.",
    architecture: "Client (Browser/App) -> WAF/Load Balancer -> Web Server (Nginx) -> App Server (Node/Python) -> Database (PostgreSQL).",
    history: "We evolved from mainframes (monolithic) to client-server, to 3-tier web apps, and now to distributed microservices.",
    terminology: {
      "WAF": "Web Application Firewall. Filters malicious HTTP traffic.",
      "Load Balancer": "Distributes incoming traffic across multiple servers to prevent overload.",
      "API": "Application Programming Interface. How software talks to other software.",
    },
    industryStandards: [
      "OWASP Top 10 (Application Security)",
      "PCI-DSS (Payment Card Industry Data Security Standard)",
    ],
    commonMistakes: [
      "Assuming the frontend is secure and not validating input on the backend.",
      "Storing secrets (API keys, passwords) in plain text in the application code.",
    ],
  },

  knowledgeGraphNode: {
    id: "digital-world:business-applications",
    domain: "digital-world",
    title: "Digital Business & Applications",
    description: "Understand the 3-tier architecture of modern digital business and the impact of application failure.",
    prerequisites: [],
    dependencies: [],
    relatedConcepts: ["networking:http", "security:cia-triad"],
    relatedSimulators: [],
    relatedLabs: ["lab:gfs-banking-outage"],
    relatedCEHModules: ["cehv13:module-1"],
    enterpriseAssets: [],
    careerSkills: ["Incident Response", "Web Architecture"],
  },

  aiMentorContext: "The student is learning how a failure in a 3-tier web application directly causes massive financial damage to a bank. Emphasize the connection between technical architecture (Nginx, Node, Postgres) and business outcomes (revenue, reputation). If they ask about the lab, guide them to check the Nginx logs first.",

  labs: [
    {
      id: "lab:gfs-banking-outage",
      title: "Trace the Banking Transaction (Outage)",
      missionBrief: "The GFS Retail Banking portal is returning a 502 Bad Gateway error. Trace the transaction flow and restore service.",
      scenario: "You are logged into the jump host. The web server (GFS-PROD-WEB-01) is reachable, but the application is throwing errors.",
      infrastructure: {
        type: "proxmox",
        vms: ["gfs-jump-host", "gfs-prod-web-01", "gfs-prod-db-01"],
      },
      evidence: {
        requiresCommands: true,
        requiresScreenshots: true,
        requiresTimeline: true,
        requiresLogs: true,
        requiresPcap: false,
        requiresConfiguration: false,
        requiresRegistryExport: false,
        requiresFindings: true,
        requiresRecommendations: true,
        requiresSocReport: false,
        requiresExecutiveSummary: true,
      },
      validationRules: {
        mode: "ai-conversation",
        criteria: [
          "Student identified the Nginx 502 error in /var/log/nginx/error.log.",
          "Student identified that the backend Node.js service was crashed.",
          "Student restarted the application service using systemctl.",
          "Student verified the portal is accessible."
        ],
      },
      hints: [
        "Check the HTTP status codes. What does 502 mean?",
        "Where does Nginx store its error logs on Ubuntu?",
        "If Nginx is running but the app is dead, how do you check the app service status?"
      ],
      aiPrompt: "You are the GFS SOC Manager. The student must explain how they restored the banking portal. Grade them based on whether they correctly identified the crashed backend service and restarted it. Do not accept vague answers.",
      reportTemplate: "# Incident Report: Banking Portal Outage\n\n## Timeline\n\n## Root Cause\n\n## Resolution\n\n## Business Impact\n",
      unlockRules: [],
      scoreRules: {
        maxScore: 100,
        penaltyPerHint: 15,
      },
    }
  ],

  assessmentReferences: [],
  interviewPreparation: [
    {
      question: "Can you explain what a 502 Bad Gateway error means in the context of a 3-tier web application?",
      modelAnswer: "A 502 Bad Gateway means the reverse proxy or load balancer (like Nginx) received an invalid response from the upstream backend server (like a Node.js API). It usually indicates the backend service is crashed, overloaded, or unreachable, not that the web server itself is down."
    }
  ],
  careerSkills: ["Service Troubleshooting", "Log Analysis", "Incident Response"],
  acceptanceCriteria: [
    "Complete the theory module on 3-tier architectures.",
    "Successfully restore the GFS banking portal in the Proxmox lab.",
    "Submit the Executive Summary report for manager review."
  ],
};
