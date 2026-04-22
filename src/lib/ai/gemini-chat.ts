// Gemini free-tier chat classifier + responder + scope picker.
//
// Every user message is sent here first. Gemini reads the current HTML
// for context and decides one of four things:
//   • CHAT        — conversational / question → Gemini answers directly
//   • CHANGE_ALL  — a global change (theme, fonts, layout) → regenerate whole HTML via Claude
//   • CHANGE_SCOPED [indexes] — only specific sections need editing → scoped Claude call
//   • (implicit)  — falls back to CHANGE_ALL on ambiguous output
//
// Using one model for all three decisions saves a round-trip and keeps
// scope classification free (no Claude spend on routing).

const GEMINI_MODEL = "gemini-2.0-flash";

export interface SectionSummary {
  index: number;
  tag: string;
  preview: string;
}

export const BASE_PROMPT = (currentHtml: string) => `You are the routing layer of a website editor. The user has an existing HTML website and is chatting with you. Every message you receive is EITHER a request to change the website OR a conversational/question message.

CURRENT WEBSITE HTML (use only for context; never output HTML yourself):
${currentHtml}

Decide the user's intent and output ONE LINE:

A) CHAT — ONLY for questions, greetings, acknowledgements. Examples: "hi", "thanks", "what color is the header?", "is it responsive?", "what fonts are used?".
   Output: CHAT: <your short friendly reply, 1-2 sentences max>

B) CHANGE — the user wants to modify the website. ANY modification request goes here, even if slightly ambiguous. Don't ask clarifying questions — pick the most reasonable interpretation and apply it. The user can always refine.
   Output (see scoping rules below): either CHANGE_ALL or CHANGE_SCOPED [n,m,...]

Rules:
- If it's a question about the site, answer it based on the HTML.
- Never output HTML, code blocks, or markdown.
- Do NOT ask clarifying questions for change requests. Just classify and let the editor model do the work.
- Be concise. Don't greet the user unless they greeted you.`;

export const SCOPE_INSTRUCTIONS = (sections: SectionSummary[]) => `
SITE SECTIONS (top-level only):
${sections.map((s) => `[${s.index}] <${s.tag}> — "${s.preview}"`).join("\n")}

If the user wants a CHANGE, decide the scope:
- CHANGE_SCOPED [indexes] — the change affects SPECIFIC sections listed above. PREFER THIS when the user names or clearly implies a particular section.
  Example: "make the hero title bigger" when section 1 is the hero → CHANGE_SCOPED [1]
  Example: "change the hero background to black" → CHANGE_SCOPED [hero's index]
  Example: "add a second card to features" → CHANGE_SCOPED [features' index]
  Example: "remove the testimonials" → CHANGE_SCOPED [testimonials' index]
  Example: "update the footer links" → CHANGE_SCOPED [footer's index]
- CHANGE_ALL — ONLY when the change is explicitly GLOBAL and affects most/all sections.
  Example: "make the whole site dark mode"
  Example: "change the font across the site to serif"
  Example: "use a blue color palette everywhere"
  Example: "redesign the whole site"

Default to CHANGE_SCOPED when a specific section is named or implied. Only use CHANGE_ALL when the user says "whole site", "everywhere", "all sections", or asks for a theme/typography/palette overhaul.
Output ONE of: CHAT: <reply>    CHANGE_ALL    CHANGE_SCOPED [0,2]`;

export const NO_SCOPE_INSTRUCTIONS = `
If the user wants a CHANGE, output CHANGE_ALL (no section list is available).
Output ONE of: CHAT: <reply>    CHANGE_ALL`;

export type GeminiClassification =
  | { type: "chat"; reply: string }
  | { type: "change_all" }
  | { type: "change_scoped"; targets: number[] }
  | { type: "error"; message: string };

/**
 * Shared parser for any model that follows the CHAT/CHANGE_ALL/CHANGE_SCOPED
 * output contract. Used by both Gemini and the Claude fallback so behavior
 * stays consistent when one is unavailable.
 */
export function parseClassificationText(text: string): GeminiClassification {
  const trimmed = text.trim();
  if (!trimmed) return { type: "error", message: "Empty classifier response" };

  const firstLine = trimmed.split("\n")[0].trim();
  const upper = firstLine.toUpperCase();

  if (upper.startsWith("CHAT:")) {
    const afterPrefix = trimmed.replace(/^\s*CHAT:\s*/i, "");
    return { type: "chat", reply: afterPrefix.trim() };
  }

  const scopedMatch = firstLine.match(/^CHANGE_SCOPED\s*\[?\s*([\d,\s]*)\s*\]?/i);
  if (scopedMatch) {
    const raw = scopedMatch[1] || "";
    const targets = raw
      .split(/[,\s]+/)
      .map((s) => parseInt(s, 10))
      .filter((n) => Number.isFinite(n) && n >= 0);
    if (targets.length > 0) return { type: "change_scoped", targets };
    return { type: "change_all" };
  }

  if (upper.startsWith("CHANGE_ALL") || upper.startsWith("CHANGE")) {
    return { type: "change_all" };
  }

  return { type: "chat", reply: trimmed };
}

export async function classifyWithGemini(
  userMessage: string,
  currentHtml: string,
  signal?: AbortSignal,
  history?: Array<{ role: "user" | "assistant"; content: string }>,
  sections?: SectionSummary[]
): Promise<GeminiClassification> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { type: "error", message: "GEMINI_API_KEY not set" };

  const systemPrompt =
    BASE_PROMPT(currentHtml) +
    (sections && sections.length > 0
      ? SCOPE_INSTRUCTIONS(sections)
      : NO_SCOPE_INSTRUCTIONS);

  // Gemini uses "user" and "model" (not "assistant") for chat roles.
  // Including history lets follow-ups like "make it bigger" resolve correctly.
  const historyContents = (history ?? []).map((t) => ({
    role: t.role === "assistant" ? "model" : "user",
    parts: [{ text: t.content }],
  }));

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [
            ...historyContents,
            { role: "user", parts: [{ text: userMessage }] },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        }),
        signal,
      }
    );

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      return {
        type: "error",
        message: errData?.error?.message || `Gemini classifier error (${resp.status})`,
      };
    }

    const data = await resp.json();
    const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
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
