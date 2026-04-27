import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateUser, createSite, logGeneration } from "@/lib/supabase/queries";
import { deductCredits, getCreditBalance } from "@/lib/supabase/credits";
import {
  SYSTEM_PROMPT,
  buildUserPrompt,
  buildSystemPrompt,
  buildFocusedUserPrompt,
  AI_CLASSIFY_PROMPT,
  parseAIClassification,
  mergeClassifications,
  type Classification,
} from "@/lib/ai/prompts/generation";
import { rateLimit } from "@/lib/rate-limit";
import { extractDesignDNA, formatDesignBriefForPrompt, type DesignBrief } from "@/lib/ai/prompts/modules/design-extractor";
import { findBestPattern } from "@/lib/ai/design-library";
import { MODEL_COSTS, canUseModel, type ModelKey } from "@/lib/constants";
import { validateAndFixImages } from "@/lib/ai/image-validator";
import { enhanceGeneratedHtml } from "@/lib/ai/runtime/post-process";

export const maxDuration = 120; // Allow up to 120s for AI generation (32k token responses need more time)

interface ImagePayload {
  data: string; // base64 data URL (data:image/png;base64,...)
  type: string; // e.g. "image/png"
}

/**
 * Strip the data URL prefix and return raw base64 + media type.
 */
function parseDataUrl(dataUrl: string): { base64: string; mediaType: string } {
  const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (match) {
    return { mediaType: match[1], base64: match[2] };
  }
  return { mediaType: "image/png", base64: dataUrl };
}

/**
 * Hard upper bound on a single AI API call.
 *
 * Prod (Vercel): 100s leaves ~20s headroom inside maxDuration=120s for
 *   classifier, image validation, post-process, DB write. At ~100-150
 *   tokens/sec, this allows ~10-15k output tokens before abort. Streaming
 *   ensures any partial response is salvaged via extractHtml's fragment
 *   wrapping path — the user gets a partial site rather than nothing.
 *
 * Dev: 300s — no Vercel timeout to fight, give Sonnet room to actually
 *   USE the 48k max_tokens cap. Without enough timeout headroom, raising
 *   max_tokens alone is theatrical: the request aborts before the model
 *   reaches the cap, so output is timeout-limited regardless of the cap.
 *   At ~100-150 tokens/sec, 300s allows ~30-45k output tokens — enough
 *   to finish a dense multi-section site with footer.
 */
const AI_FETCH_TIMEOUT_MS =
  process.env.NODE_ENV === "production" ? 100_000 : 300_000;

/**
 * Output token cap. 48000 leaves Sonnet enough room to render a full
 * multi-section site (hero + 5-7 content sections + footer) without
 * truncating mid-attribute. Real-world usage is typically 20-30k for
 * a normal site; the headroom only kicks in on dense layouts (gym sites
 * with stats + program cards + facility grids + testimonials all on
 * the same page).
 *
 * Sonnet supports up to 64k output tokens; staying at 48k preserves
 * a small safety margin without paying for unused capacity. Bumped
 * from 32k after observing footer + facilities images getting cut off
 * on dense gym/restaurant generations.
 */
const MAX_OUTPUT_TOKENS = 48000;

interface StreamResult {
  content: string;
  inputTokens: number;
  outputTokens: number;
  cacheRead: number;
  cacheWrite: number;
  stopReason: string | null;
  aborted: boolean;
}

/**
 * Stream Anthropic SSE response and accumulate text deltas. The point of
 * streaming here isn't UX — it's bill-safety. With non-streaming, an abort
 * at 100s means Anthropic billed us for tokens we never received. With
 * streaming, every delta is captured as it arrives, so even if the stream
 * is cut short we have the partial HTML to save.
 *
 * Returns whatever was accumulated, never throws on stream errors — the
 * caller decides if the partial is salvageable via extractHtml.
 */
async function readAnthropicStream(response: Response): Promise<StreamResult> {
  const result: StreamResult = {
    content: "",
    inputTokens: 0,
    outputTokens: 0,
    cacheRead: 0,
    cacheWrite: 0,
    stopReason: null,
    aborted: false,
  };

  if (!response.body) return result;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // SSE frames are separated by blank lines; events use "data: <json>".
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // keep partial last line for next chunk

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const evt = JSON.parse(payload);
          if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
            result.content += evt.delta.text;
          } else if (evt.type === "message_start" && evt.message?.usage) {
            result.inputTokens = evt.message.usage.input_tokens ?? 0;
            result.cacheRead = evt.message.usage.cache_read_input_tokens ?? 0;
            result.cacheWrite = evt.message.usage.cache_creation_input_tokens ?? 0;
          } else if (evt.type === "message_delta") {
            if (evt.delta?.stop_reason) result.stopReason = evt.delta.stop_reason;
            if (evt.usage?.output_tokens) result.outputTokens = evt.usage.output_tokens;
          }
        } catch {
          // Bad JSON in the middle of a stream — skip; we still keep
          // everything we accumulated up to this point.
        }
      }
    }
  } catch (err) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    result.aborted = isAbort;
    console.warn(
      `[Generate] Anthropic stream ${isAbort ? "aborted" : "errored"} — preserved ${result.content.length} chars (${result.outputTokens} tokens) before failure`
    );
  }

  return result;
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number = AI_FETCH_TIMEOUT_MS
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Variant of fetchWithTimeout that exposes the AbortController so the caller
 * can keep the timeout alive across the streaming read (not just the initial
 * request). Without this, the timer fires only against the headers — once
 * headers arrive the body could stream forever.
 */
function fetchAbortable(
  url: string,
  init: RequestInit,
  timeoutMs: number = AI_FETCH_TIMEOUT_MS
): { responsePromise: Promise<Response>; cancel: () => void } {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  return {
    responsePromise: fetch(url, { ...init, signal: ctrl.signal }),
    cancel: () => clearTimeout(timer),
  };
}

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit: 5 generations per minute per user
    const rl = rateLimit(`generate:${clerkId}`, { maxRequests: 5, windowMs: 60_000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const user = await getOrCreateUser(clerkId, "", null);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { prompt, industry, mood, pages, templateId, images, model: requestedModel } = body as {
      prompt: string;
      industry: string;
      mood: string;
      pages?: string[];
      templateId?: string;
      images?: ImagePayload[];
      model?: ModelKey;
    };

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // ── Model selection + payment gate ─────────────────────────────
    // Default: haiku for free-plan users, sonnet for paid. If the user
    // explicitly picks a locked model on the free plan, reject with a
    // clear upsell so the client can show a "buy credits" modal.
    const modelKey: ModelKey =
      requestedModel && requestedModel in MODEL_COSTS
        ? requestedModel
        : user.plan === "free"
          ? "haiku"
          : "sonnet";

    if (!canUseModel(user.plan, modelKey)) {
      return NextResponse.json(
        {
          error: "This model requires a credit pack. Upgrade to unlock Sonnet and Opus.",
          code: "MODEL_REQUIRES_PAYMENT",
          requestedModel: modelKey,
          availableOnFree: ["haiku"],
        },
        { status: 402 }
      );
    }

    const selectedModel = MODEL_COSTS[modelKey];

    // ── Credit balance pre-check ────────────────────────────────────
    // Reject early (before any AI cost is incurred) if the user can't
    // afford this generation. The actual deduction happens after a
    // successful generation — deducting here would require refund logic
    // on AI failures, which adds complexity we don't need yet.
    const currentBalance = await getCreditBalance(user.id);
    if (currentBalance === null) {
      return NextResponse.json({ error: "User record missing" }, { status: 404 });
    }
    if (currentBalance < selectedModel.credits) {
      return NextResponse.json(
        {
          error: `Not enough credits. This generation needs ${selectedModel.credits} credits, you have ${currentBalance}.`,
          code: "INSUFFICIENT_CREDITS",
          required: selectedModel.credits,
          balance: currentBalance,
          model: modelKey,
        },
        { status: 402 }
      );
    }

    const hasImages = images && images.length > 0;
    const trimmedPrompt = prompt.trim();
    const effectiveIndustry = industry || "general";
    const effectiveMood = mood || "modern";

    // ── Step 1: Classify & Build Focused Prompt ──────────────────────
    // Rule-based classification (instant, free)
    let { systemPrompt: focusedSystemPrompt, classification } = buildSystemPrompt({
      prompt: trimmedPrompt,
      industry: effectiveIndustry,
      mood: effectiveMood,
    });

    // For template-based generation, use legacy prompt (templates override everything)
    const isTemplateMode = !!templateId;
    const activeSystemPrompt = isTemplateMode ? SYSTEM_PROMPT : focusedSystemPrompt;

    // Build the user prompt
    const userPrompt = isTemplateMode
      ? buildUserPrompt({
          prompt: trimmedPrompt,
          industry: effectiveIndustry,
          mood: effectiveMood,
          pages: pages || [],
          templateId,
        })
      : buildFocusedUserPrompt({
          prompt: trimmedPrompt,
          industry: effectiveIndustry,
          mood: effectiveMood,
          pages: pages || [],
          classification,
        });

    // ── Step 2: Optional AI Classification (for low-confidence cases) ──
    // If confidence is low and we have an API key, refine classification
    if (!isTemplateMode && classification.confidence < 0.6 && process.env.ANTHROPIC_API_KEY) {
      try {
        const classifyResponse = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 300,
            temperature: 0,
            system: AI_CLASSIFY_PROMPT,
            messages: [{ role: "user", content: `Request: "${trimmedPrompt}"\nIndustry: ${effectiveIndustry}\nMood: ${effectiveMood}` }],
          }),
        });

        if (classifyResponse.ok) {
          const classifyData = await classifyResponse.json();
          const aiText = classifyData.content?.[0]?.text;
          if (aiText) {
            const aiOverride = parseAIClassification(aiText);
            if (aiOverride) {
              classification = mergeClassifications(classification, aiOverride);
              // Re-assemble with refined classification
              const { assembleSystemPrompt: assemble } = await import("@/lib/ai/prompts/modules/assembler");
              focusedSystemPrompt = assemble(classification);
            }
          }
        }
      } catch (e) {
        // AI classification failed — proceed with rule-based (graceful fallback)
        console.warn("AI classification failed, using rule-based:", e);
      }
    }

    const finalSystemPrompt = isTemplateMode ? SYSTEM_PROMPT : focusedSystemPrompt;

    console.log(`[Generate] UI: ${classification.uiType}, Style: ${classification.layoutStyle}, Color: ${classification.colorMode}, Confidence: ${classification.confidence.toFixed(2)}, Prompt size: ${finalSystemPrompt.length} chars`);

    // ── Step 2.5: Design DNA Extraction (when images are uploaded) ───
    let designBrief: DesignBrief | null = null;
    if (hasImages) {
      const extractionProvider = process.env.ANTHROPIC_API_KEY
        ? "anthropic" as const
        : process.env.OPENAI_API_KEY
          ? "openai" as const
          : process.env.GEMINI_API_KEY
            ? "gemini" as const
            : null;
      const extractionKey =
        process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

      if (extractionProvider && extractionKey) {
        designBrief = await extractDesignDNA(images, extractionKey, extractionProvider);
        if (designBrief) {
          console.log(`[Generate] Design DNA extracted: ${designBrief.colorMode} mode, patterns: ${designBrief.signaturePatterns.length}, mood: ${designBrief.moodKeywords}`);
        }
      }
    }

    // ── Step 2.75: Library Pattern Matching (when no user images) ─────
    // If no images were uploaded and no brief extracted, check the design
    // library for a matching pattern based on industry + mood.
    if (!designBrief && !hasImages) {
      try {
        const match = await findBestPattern(effectiveIndustry, effectiveMood, trimmedPrompt);
        if (match) {
          designBrief = match.brief;
          console.log(`[Generate] Library match found: "${match.name}" (${match.industries.join(", ")})`);
        }
      } catch (e) {
        // Library query failed — proceed without design guidance (graceful)
        console.warn("[Generate] Design library query failed:", e);
      }
    }

    // Build the final user prompt text based on what information is available
    let finalUserPrompt: string;

    if (hasImages && designBrief) {
      // User uploaded images + extraction succeeded → text brief only (no images sent to AI)
      finalUserPrompt = `${formatDesignBriefForPrompt(designBrief)}\n\n${userPrompt}`;
    } else if (hasImages && !designBrief) {
      // User uploaded images + extraction failed → generic fallback with images
      finalUserPrompt = `REFERENCE IMAGE(S) ATTACHED ABOVE.
Analyze the reference image(s) carefully. Study the exact:
- Layout structure (hero, navigation, content sections, grids, carousels)
- Color scheme (background colors, text colors, accent colors)
- Typography (font styles, sizes, weights, heading treatments)
- UI patterns (cards, buttons, spacing, borders, shadows)
- Visual mood and design language
- Component arrangement and information hierarchy

Generate a website that closely matches the design patterns, visual style, and layout shown in the reference image(s), while incorporating the user's specific request below.

${userPrompt}`;
    } else if (designBrief) {
      // No user images, but library match found → inject brief as style guide
      finalUserPrompt = `DESIGN STYLE GUIDE (use as design direction — if the user's request below contradicts any pattern, follow the user's request instead):

${formatDesignBriefForPrompt(designBrief)}

${userPrompt}`;
    } else {
      // No images, no library match → plain prompt
      finalUserPrompt = userPrompt;
    }

    // ── Step 3: Generate Website ─────────────────────────────────────
    let generatedHtml: string | null = null;
    let modelUsed = "unknown";

    if (process.env.ANTHROPIC_API_KEY) {
      modelUsed = selectedModel.apiModel;

      // Build message content — images only when extraction failed, otherwise text-only
      const userContent: Array<{ type: string; [key: string]: unknown }> = [];

      if (hasImages && !designBrief) {
        // Fallback: extraction failed, send raw images to generation AI
        for (const img of images) {
          const { base64, mediaType } = parseDataUrl(img.data);
          userContent.push({
            type: "image",
            source: { type: "base64", media_type: mediaType, data: base64 },
          });
        }
      }
      userContent.push({ type: "text", text: finalUserPrompt });

      // Prompt caching: mark the system prompt as cacheable. Cache hits on
      // repeat requests (within 5 min) with the SAME assembled system prompt
      // — i.e. same classification. Cuts input cost ~90% on cache reads.
      const systemBlocks = [
        {
          type: "text",
          text: finalSystemPrompt,
          cache_control: { type: "ephemeral" as const },
        },
      ];

      // STREAMING: tokens arrive incrementally via SSE. Critical because
      // Anthropic bills for every output token they generate — even if we
      // abort mid-response. With non-streaming, abort = pay for nothing.
      // With streaming, we keep every token that reached us before the cut.
      const { responsePromise, cancel } = fetchAbortable(
        "https://api.anthropic.com/v1/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: modelUsed,
            max_tokens: MAX_OUTPUT_TOKENS,
            stream: true,
            system: systemBlocks,
            messages: [{ role: "user", content: userContent }],
          }),
        }
      );

      let response: Response;
      try {
        response = await responsePromise;
      } catch (fetchErr) {
        cancel();
        const isAbort = fetchErr instanceof Error && fetchErr.name === "AbortError";
        console.error(
          `[Generate] Anthropic fetch ${isAbort ? "timed out before headers" : "failed"} after ${AI_FETCH_TIMEOUT_MS}ms:`,
          fetchErr
        );
        return NextResponse.json(
          {
            error: isAbort
              ? "Generation timed out. Please try again — your app credits were not deducted."
              : "AI service unreachable. Please try again.",
          },
          { status: 504 }
        );
      }

      if (!response.ok) {
        cancel();
        const errorData = await response.json().catch(() => ({}));
        console.error("Anthropic API error:", errorData);
      } else {
        const stream = await readAnthropicStream(response);
        cancel();
        console.log(
          `[Generate] Tokens — input: ${stream.inputTokens}, output: ${stream.outputTokens}, cache_read: ${stream.cacheRead}, cache_write: ${stream.cacheWrite}, stop: ${stream.stopReason}${stream.aborted ? " (ABORTED)" : ""}`
        );
        if (stream.stopReason === "max_tokens") {
          console.warn(`[Generate] ⚠ Output hit max_tokens cap (${stream.outputTokens} tokens). HTML will be truncated — footer/sections may be cut off.`);
        }
        if (stream.aborted && stream.content.length > 0) {
          console.warn(
            `[Generate] ⚠ Stream aborted but salvaging ${stream.content.length} chars (${stream.outputTokens} billed tokens). User pays, user gets the partial.`
          );
        }
        if (stream.content) {
          generatedHtml = extractHtml(stream.content);
          // If extraction failed despite billed tokens, dump raw response
          // so we can see WHY the model output was rejected. Never silently
          // throw away tokens the user paid for.
          if (!generatedHtml) {
            const head = stream.content.slice(0, 600).replace(/\n/g, "\\n");
            const tail = stream.content.slice(-600).replace(/\n/g, "\\n");
            console.error(
              `[Generate] ⚠ extractHtml returned null after Anthropic billed ${stream.outputTokens} output tokens. ` +
                `stop=${stream.stopReason}. Response head: "${head}" ... tail: "${tail}"`
            );
          }
        } else if (stream.outputTokens > 0) {
          console.error(
            `[Generate] ⚠ Stream produced no content despite ${stream.outputTokens} output tokens billed. Stop reason: ${stream.stopReason}`
          );
        }
      }
    } else if (process.env.OPENAI_API_KEY) {
      modelUsed = "gpt-4o";

      const userContent: Array<{ type: string; [key: string]: unknown }> = [];

      if (hasImages && !designBrief) {
        for (const img of images) {
          userContent.push({
            type: "image_url",
            image_url: { url: img.data, detail: "high" },
          });
        }
      }
      userContent.push({ type: "text", text: finalUserPrompt });

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: modelUsed,
          messages: [
            { role: "system", content: finalSystemPrompt },
            { role: "user", content: userContent },
          ],
          temperature: 0.7,
          max_tokens: MAX_OUTPUT_TOKENS,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("OpenAI API error:", errorData);
      } else {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          generatedHtml = extractHtml(content);
        }
      }
    } else if (process.env.GEMINI_API_KEY) {
      modelUsed = "gemini-2.0-flash";

      const parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [];

      if (hasImages && !designBrief) {
        for (const img of images) {
          const { base64, mediaType } = parseDataUrl(img.data);
          parts.push({
            inline_data: { mime_type: mediaType, data: base64 },
          });
        }
      }
      parts.push({ text: finalUserPrompt });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelUsed}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: finalSystemPrompt }] },
            contents: [{ parts }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: MAX_OUTPUT_TOKENS,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Gemini API error:", errorData);
      } else {
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (content) {
          generatedHtml = extractHtml(content);
        }
      }
    } else {
      return NextResponse.json(
        { error: "No AI API key configured. Add ANTHROPIC_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    if (!generatedHtml) {
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 500 }
      );
    }

    // Catch hallucinated/dead photo IDs before they reach the browser.
    const validation = await validateAndFixImages(generatedHtml);
    if (validation.swapped > 0) {
      console.warn(
        `[Generate] Image validation — checked ${validation.checked}, swapped ${validation.swapped} broken URLs`
      );
    } else {
      console.log(`[Generate] Image validation — checked ${validation.checked}, all OK`);
    }
    generatedHtml = validation.html;

    // Inject scroll animations + smooth scroll + mobile-nav runtime,
    // and repair nav anchors. Idempotent — safe to re-run on chat edits.
    const enhanced = enhanceGeneratedHtml(generatedHtml);
    generatedHtml = enhanced.html;
    console.log(
      `[Generate] Runtime enhance — ids:+${enhanced.addedIds}, nav fixed:${enhanced.fixedNavLinks}, reveals:+${enhanced.addedReveals}, runtime injected:${enhanced.injectedRuntime}, viewport injected:${enhanced.injectedViewport}`
    );
    if (enhanced.responsiveWarnings.length > 0) {
      console.warn(`[Generate] Responsive drift — ${enhanced.responsiveWarnings.join("; ")}`);
    }

    // Store the generated HTML in site_json as { html: "..." }
    const siteData = { html: generatedHtml };

    // Prefer the brand name baked into the generated HTML (e.g. <title>Kino — …</title>)
    // and fall back to a prompt-derived name only if the HTML doesn't expose one.
    const siteName =
      extractBrandFromHtml(generatedHtml) || extractSiteName(prompt);

    const site = await createSite(
      user.id,
      siteName,
      industry || "general",
      {}, // theme_json — not needed anymore since HTML contains everything
      siteData
    );

    // Log generation
    await logGeneration(
      site?.id || "",
      user.id,
      prompt.slice(0, 200),
      {
        model: modelUsed,
        promptLength: prompt.length,
        hasImages: !!hasImages,
        imageCount: images?.length || 0,
        classification: {
          uiType: classification.uiType,
          layoutStyle: classification.layoutStyle,
          colorMode: classification.colorMode,
          confidence: classification.confidence,
        },
        designBriefExtracted: !!designBrief,
        systemPromptSize: finalSystemPrompt.length,
      },
      modelUsed
    );

    // ── Deduct credits (after successful generation) ────────────────
    // Safe by design: the atomic RPC row-locks the user, so two parallel
    // successful generations can't both read the same stale balance.
    const deductResult = await deductCredits(
      user.id,
      selectedModel.credits,
      "generation",
      {
        siteId: site?.id,
        modelKey,
        apiModel: selectedModel.apiModel,
      }
    );
    const creditsRemaining = deductResult.success
      ? deductResult.newBalance
      : currentBalance;

    return NextResponse.json({
      siteId: site?.id,
      html: generatedHtml,
      creditsRemaining,
      model: modelKey,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Extract clean HTML from AI response.
 *
 * Resilience matters here: the model is paid for, the user is paid for.
 * If we return null, the route reports "generation failed" and the user
 * loses real Anthropic money for nothing. So this function tries hard:
 *
 *   1. Unwrap markdown code fences (with or without `html` lang tag)
 *   2. Find the first <!DOCTYPE or <html (case-insensitive) and start there
 *   3. Truncate after the last </html> if present (drops trailing chatter)
 *   4. If only a body/head fragment exists, wrap it in a minimal shell
 *      so the user gets *something* renderable instead of a blank page
 *
 * Returns null only if the response contains no HTML-shaped content at all.
 */
function extractHtml(content: string): string | null {
  let html = content.trim();
  if (!html) return null;

  // Strip ALL markdown code fences (some models wrap with ```html ... ```
  // even when told not to; some emit multiple fenced blocks). Take the
  // longest fenced block — that's almost always the actual HTML payload.
  const fences = [...html.matchAll(/```(?:html|HTML)?\s*\n?([\s\S]*?)\n?\s*```/g)];
  if (fences.length > 0) {
    const longest = fences.reduce((a, b) => (b[1].length > a[1].length ? b : a));
    html = longest[1].trim();
  }

  // Find the first real HTML start marker, case-insensitive.
  // Skip any preamble the model emitted ("Here is your website: ...").
  const startMatch = html.match(/<!doctype\s+html|<html\b/i);
  if (startMatch && startMatch.index !== undefined && startMatch.index > 0) {
    html = html.slice(startMatch.index);
  }

  // Drop anything after the closing </html> (trailing markdown / commentary).
  const endIdx = html.toLowerCase().lastIndexOf("</html>");
  if (endIdx !== -1) {
    html = html.slice(0, endIdx + "</html>".length);
  }

  // Happy path: we have a recognizable HTML document.
  if (/<!doctype\s+html|<html\b/i.test(html)) {
    return html;
  }

  // Salvage path: model returned a fragment (just <body>, just <head>, or
  // a sequence of <section>s). Wrap it so the browser can still render it
  // and the user gets value for their tokens. The post-processor will
  // inject the runtime + viewport meta on top.
  if (/<(body|head|section|main|header|nav|div)\b/i.test(html)) {
    console.warn("[Generate] extractHtml: salvaging fragment with minimal HTML shell");
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Site</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
${html}
</body>
</html>`;
  }

  return null;
}

/**
 * Extract a reasonable site name from the user's prompt.
 */
function extractSiteName(prompt: string): string {
  // Take first ~50 chars, trim to last complete word
  const truncated = prompt.slice(0, 50).trim();
  const lastSpace = truncated.lastIndexOf(" ");
  const name = lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated;
  return name || "My Website";
}

/**
 * Pull the brand name out of the AI-generated HTML's <title> tag.
 *
 * The system prompt asks the model to invent a real brand and put it in
 * <title>. Typical formats: "Kino — Stream Cinema", "NOTFLIX | Streaming",
 * "Iron Gym - Train Hard". We keep only the part before the first
 * separator and reject obvious junk values.
 *
 * Returns null when nothing usable is found so the caller can fall back to
 * the prompt-based extractor.
 */
function extractBrandFromHtml(html: string): string | null {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch) return null;

  // Decode the few HTML entities the AI tends to emit
  let title = titleMatch[1]
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

  // Keep only the brand portion before the first separator
  const split = title.split(/\s+[—–|·\-:]\s+/);
  if (split.length > 0) title = split[0].trim();

  // Strip surrounding quotes / parentheses
  title = title.replace(/^["'(]+|["')]+$/g, "").trim();

  // Reject obvious non-names
  if (!title) return null;
  if (title.length > 60) return null;
  if (/^(untitled|website|home|welcome|index|document|page|my\s+site)$/i.test(title)) {
    return null;
  }

  return title;
}
