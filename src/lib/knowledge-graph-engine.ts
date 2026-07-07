import { KnowledgeGraphNode } from "./learning-objects";

/**
 * CORE KNOWLEDGE GRAPH ENGINE
 * Manages the global state of the learning ecosystem.
 */

class KnowledgeGraphEngine {
  private graph: Map<string, KnowledgeGraphNode> = new Map();

  // Register a new Learning Object node into the graph
  public registerNode(node: KnowledgeGraphNode) {
    if (this.graph.has(node.id)) {
      console.warn(`Node ${node.id} already exists in the Knowledge Graph. Overwriting.`);
    }
    this.graph.set(node.id, node);
  }

  // Retrieve a specific node
  public getNode(id: string): KnowledgeGraphNode | undefined {
    return this.graph.get(id);
  }

  // Get all nodes for a specific domain
  public getNodesByDomain(domain: string): KnowledgeGraphNode[] {
    return Array.from(this.graph.values()).filter((n) => n.domain === domain);
  }

  // Get the complete learning path (Prerequisites -> Node -> Dependencies)
  public getLearningPath(id: string) {
    const node = this.getNode(id);
    if (!node) return null;

    return {
      current: node,
      prerequisites: node.prerequisites.map((p) => this.getNode(p)).filter(Boolean),
      dependencies: node.dependencies.map((d) => this.getNode(d)).filter(Boolean),
      related: node.relatedConcepts.map((r) => this.getNode(r)).filter(Boolean),
    };
  }

  // Generate the AI Context Payload for the current node
  public generateAiContext(id: string): string {
    const path = this.getLearningPath(id);
    if (!path) return "Unknown node context.";

    const context = `
      CURRENT CONCEPT: ${path.current.title}
      DOMAIN: ${path.current.domain}
      DESCRIPTION: ${path.current.description}
      
      CAREER SKILLS: ${path.current.careerSkills.join(", ")}
      ENTERPRISE ASSETS: ${path.current.enterpriseAssets.map(a => a.assetId).join(", ")}
      
      PREREQUISITES: ${path.prerequisites.map(p => p?.title).join(", ")}
      WHAT THIS UNLOCKS: ${path.dependencies.map(d => d?.title).join(", ")}
    `;

    return context.trim();
  }
}

// Export a singleton instance to be used across the application
export const kgEngine = new KnowledgeGraphEngine();
