/**
 * AI provider abstraction.
 *
 * Today: Lovable AI Gateway is the only implementation (zero-config, no user keys).
 * Tomorrow: additional providers (Ollama, OpenAI, Gemini, Azure OpenAI, Anthropic,
 * OpenRouter) can be added by implementing the `ChatProvider` interface and
 * registering them in `getProvider()`. UI/server-function call sites do NOT change —
 * they always call `chatComplete()` and get back `{ text }` or `{ json }`.
 */

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type ChatOptions = {
  messages: ChatMessage[];
  model?: string;
  jsonMode?: boolean;
  temperature?: number;
};

export type ChatResult =
  | { ok: true; text: string }
  | { ok: false; status: number; text: string };

export interface ChatProvider {
  id: string;
  chat(opts: ChatOptions): Promise<ChatResult>;
}

// ---------- Lovable AI Gateway ----------
const LovableProvider: ChatProvider = {
  id: "lovable",
  async chat({ messages, model, jsonMode }) {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false, status: 500, text: "AI is not configured (LOVABLE_API_KEY missing)." };
    }
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
      body: JSON.stringify({
        model: model ?? "google/gemini-3-flash-preview",
        messages,
        ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, status: res.status, text: body.slice(0, 400) };
    }
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return { ok: true, text: json.choices?.[0]?.message?.content?.trim() ?? "" };
  },
};

// Future providers plug in here. Each just needs to implement ChatProvider.
// e.g. OpenAIProvider, GeminiProvider, AnthropicProvider, OllamaProvider,
// AzureOpenAIProvider, OpenRouterProvider.
const providers: Record<string, ChatProvider> = {
  lovable: LovableProvider,
};

export type ProviderId = keyof typeof providers | string;

export function getProvider(id?: ProviderId): ChatProvider {
  const key = (id ?? process.env.AI_PROVIDER ?? "lovable").toLowerCase();
  return providers[key] ?? LovableProvider;
}

/** Convenience: run a chat completion with the currently-configured default provider. */
export async function chatComplete(opts: ChatOptions & { provider?: ProviderId }): Promise<ChatResult> {
  const p = getProvider(opts.provider);
  return p.chat(opts);
}

/** Human-readable error messages for common upstream failures. */
export function formatChatError(r: Extract<ChatResult, { ok: false }>): string {
  if (r.status === 402) return "Workspace is out of AI credits.";
  if (r.status === 429) return "Rate limited. Try again shortly.";
  return `AI error (${r.status}). ${r.text}`;
}
