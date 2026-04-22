// Claude Haiku fallback classifier — same contract as classifyWithGemini.
//
// When Gemini's free tier is exhausted (or the key is missing), we still
// need routing so scoped edits keep working. Haiku is fast (~500ms) and
// cheap (~$0.0003 per classify at 10k-char HTML), so this is a clean
// drop-in replacement.

import {
  BASE_PROMPT,
  SCOPE_INSTRUCTIONS,
  NO_SCOPE_INSTRUCTIONS,
  parseClassificationText,
  type GeminiClassification,
  type SectionSummary,
} from "./gemini-chat";

const CLAUDE_CLASSIFIER_MODEL = "claude-haiku-4-5-20251001";

export async function classifyWithClaude(
  userMessage: string,
  currentHtml: string,
  signal?: AbortSignal,
  history?: Array<{ role: "user" | "assistant"; content: string }>,
  sections?: SectionSummary[]
): Promise<GeminiClassification> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { type: "error", message: "ANTHROPIC_API_KEY not set" };

  const systemPrompt =
    BASE_PROMPT(currentHtml) +
    (sections && sections.length > 0
      ? SCOPE_INSTRUCTIONS(sections)
      : NO_SCOPE_INSTRUCTIONS);

  const messages: Array<{ role: "user" | "assistant"; content: string }> = [
    ...(history ?? []),
    { role: "user", content: userMessage },
  ];

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: CLAUDE_CLASSIFIER_MODEL,
        max_tokens: 500,
        temperature: 0.3,
        system: systemPrompt,
        messages,
      }),
      signal,
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      return {
        type: "error",
        message: errData?.error?.message || `Claude classifier error (${resp.status})`,
      };
    }

    const data = await resp.json();
    const text: string = data.content?.[0]?.text ?? "";
    return parseClassificationText(text);
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    return {
      type: "error",
      message:
        name === "AbortError"
          ? "Classifier timed out"
          : err instanceof Error
            ? err.message
            : "Classifier failed",
    };
  }
}
