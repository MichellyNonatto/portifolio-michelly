import type { AiSummarizer } from "./showcase-sync.service";
import {
  buildGeminiSummaryPrompt,
  GEMINI_SUMMARY_SYSTEM_INSTRUCTION,
} from "./gemini-summary.prompt.ts";

export interface GeminiSummarizerConfig {
  apiKey: string;
  model: string;
  provider?: string;
}

export class GeminiSummarizerService implements AiSummarizer {
  private readonly apiKey: string;
  readonly provider: string;
  readonly model: string;
  private readonly baseUrl = "https://generativelanguage.googleapis.com/v1beta";

  constructor(config: GeminiSummarizerConfig) {
    if (!config?.apiKey) {
      throw new Error("Missing 'apiKey' in GeminiSummarizerConfig.");
    }
    if (!config?.model) {
      throw new Error("Missing 'model' in GeminiSummarizerConfig.");
    }

    this.apiKey = config.apiKey;
    this.model = config.model;
    this.provider = config.provider ?? process.env.AI_PROVIDER ?? "gemini";
  }

  async generateSummary(repoName: string, language: string | null, readmeContent: string): Promise<string> {
    const endpoint = `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`;

    const payload = {
      systemInstruction: {
        parts: [{ text: GEMINI_SUMMARY_SYSTEM_INSTRUCTION }],
      },
      contents: [
        {
          parts: [{ text: buildGeminiSummaryPrompt(repoName, language, readmeContent) }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 250,
        responseMimeType: "application/json",
      },
    };

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok) {
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!candidate) throw new Error("Gemini returned empty candidate content.");

        const json = candidate.replace(/^```json\s*|\s*```$/g, "").trim();
        let parsed: {
          repository_name?: unknown;
          summary?: unknown;
          primary_language?: unknown;
        };
        try {
          parsed = JSON.parse(json);
        } catch {
          throw new Error("Gemini returned invalid JSON.");
        }
        if (
          typeof parsed.repository_name !== "string"
          || typeof parsed.summary !== "string"
          || typeof parsed.primary_language !== "string"
          || !parsed.summary.trim()
        ) {
          throw new Error("Gemini returned JSON with an invalid repository summary.");
        }
        return parsed.summary.trim();
      }

      if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 2) {
        throw new Error(`Gemini API error (${response.status}): ${data.error?.message || response.statusText}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 500));
    }
    throw new Error("Gemini API request failed after retries.");
  }
}
