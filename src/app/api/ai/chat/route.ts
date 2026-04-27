import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { buildEditorChatPrompt } from "@/lib/ai/prompts/editorChat";
import { rateLimit } from "@/lib/rate-limit";
import { getOrCreateUser } from "@/lib/supabase/queries";
import { MODEL_COSTS, CHAT_EDIT_CREDITS } from "@/lib/constants";
import { getCreditBalance, deductCredits } from "@/lib/supabase/credits";
import { classifyWithGemini, type GeminiClassification } from "@/lib/ai/gemini-chat";
import { classifyWithClaude } from "@/lib/ai/claude-classifier";
import { uploadUserImage } from "@/lib/supabase/storage";
import {
  splitSections,
  spliceSections,
  parseScopedResponse,
  SCOPE_START,
  SCOPE_END,
  type SectionSplit,
} from "@/lib/ai/html-sections";
import { enhanceGeneratedHtml } from "@/lib/ai/runtime/post-process";

export const maxDuration = 300;

interface ChatImage {
  data: string;
  type: string;
}

interface ParsedImage {
  dataUrl: string;
  mimeType: string;
  base64: string;
  // Public URL after uploading to Supabase Storage. Falls back to dataUrl
  // if upload failed — worst case we embed base64 as before.
  publicUrl?: string;
}

type StreamEvent =
  | { type: "mode"; mode: "chat" | "html" }
  | { type: "token"; text: string }
  | { type: "progress"; chars: number }
  | { type: "scope"; targets: number[] }
  | { type: "confirm_required"; reason: "large_regen"; htmlChars: number; estimatedSeconds: number }
  | { type: "done"; html?: string; reply?: string; creditsRemaining: number }
  | { type: "error"; message: string };

// Threshold above which a CHANGE_ALL (full-site regen) gets a confirmation
// step instead of firing straight at Claude. Picked so a typical 5-section
// site (~20k chars) passes through automatically, while ecommerce/heavy
// sites (~40k+) require an explicit opt-in. Crossing this boundary is
// what caused the ~$1 silent burn during the 2026-04-25 bug.
const LARGE_REGEN_CHAR_THRESHOLD = 30_000;

function parseDataUrl(dataUrl: string): { base64: string; mimeType: string } | null {
  const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) return null;
  return { mimeType: match[1], base64: match[2] };
}

function extractHtml(content: string): string | null {
  let html = content.trim();
  const codeBlockMatch = html.match(/```(?:html)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (codeBlockMatch) html = codeBlockMatch[1].trim();
  if (html.includes("<!DOCTYPE html>") || html.includes("<html")) return html;
  const htmlMatch = html.match(/(<!DOCTYPE html>[\s\S]*<\/html>)/i);
  return htmlMatch ? htmlMatch[1] : null;
}

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rl = rateLimit(`chat:${clerkId}`, { maxRequests: 20, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  const body = await req.json();
  const { message, html, siteJson, images, siteId, history, confirmed } = body;
  const currentHtml = html || siteJson?.html;
  // Set to true by the client when resubmitting after the user accepts the
  // large-regen warning. Prevents the cost guard from blocking the retry.
  const userConfirmedLargeRegen = confirmed === true;

  // Normalize history: accept { role: "user" | "assistant" | "ai"; content: string }
  // Drop anything malformed. Keep the last 10 turns — enough to carry intent
  // ("make it bigger", "change that to blue") without blowing tokens.
  const priorTurns: Array<{ role: "user" | "assistant"; content: string }> = [];
  if (Array.isArray(history)) {
    for (const t of history) {
      if (!t || typeof t.content !== "string" || !t.content.trim()) continue;
      const role = t.role === "assistant" || t.role === "ai" ? "assistant" : "user";
      priorTurns.push({ role, content: t.content });
    }
  }
  const trimmedHistory = priorTurns.slice(-10);

  if (!message || !currentHtml) {
    return NextResponse.json({ error: "Message and current HTML are required" }, { status: 400 });
  }

  const user = await getOrCreateUser(clerkId, "", null);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const plan = user.plan ?? "free";
  const modelKey: "haiku" | "sonnet" = plan === "free" ? "haiku" : "sonnet";
  const anthropicModel = MODEL_COSTS[modelKey].apiModel;
  const editCost = CHAT_EDIT_CREDITS[modelKey];

  const currentBalance = await getCreditBalance(user.id);
  if (currentBalance === null) {
    return NextResponse.json({ error: "User record missing" }, { status: 404 });
  }
  if (currentBalance < editCost) {
    return NextResponse.json(
      {
        error: `Not enough credits. This edit needs ${editCost} credits, you have ${currentBalance}.`,
        code: "INSUFFICIENT_CREDITS",
        required: editCost,
        balance: currentBalance,
        model: modelKey,
      },
      { status: 402 }
    );
  }

  const parsedImages: ParsedImage[] = [];
  if (Array.isArray(images)) {
    for (const img of images as ChatImage[]) {
      if (img.data && typeof img.data === "string") {
        const parsed = parseDataUrl(img.data);
        if (parsed) parsedImages.push({ dataUrl: img.data, mimeType: parsed.mimeType, base64: parsed.base64 });
      }
    }
  }

  // Upload each attached image to Supabase Storage in parallel. We still
  // keep the base64 around because Anthropic vision needs it, but the
  // HTML gets the small public URL instead of a bloated base64 blob.
  if (parsedImages.length > 0) {
    await Promise.all(
      parsedImages.map(async (img) => {
        const result = await uploadUserImage({
          userId: user.id,
          siteId: typeof siteId === "string" ? siteId : null,
          base64: img.base64,
          mimeType: img.mimeType,
        });
        if (result) img.publicUrl = result.publicUrl;
      })
    );
  }

  let userMessage = message;
  if (parsedImages.length > 0) {
    const placeholders = parsedImages.map((_, i) => `{{USER_IMAGE_${i + 1}}}`).join(", ");
    userMessage += `\n\n[ATTACHED ${parsedImages.length} IMAGE(S). Use ${placeholders} as the exact src or url() value wherever the image(s) should appear in the HTML. Output the placeholder exactly as written — it will be replaced with the real image data automatically. For background images use style="background-image: url({{USER_IMAGE_1}}); background-size: cover; background-position: center;"]`;
  }

  const systemPrompt = buildEditorChatPrompt(currentHtml);
  const encoder = new TextEncoder();

  // Split HTML into top-level sections so scoped edits can target them.
  // If the HTML is too malformed to split or has fewer than 2 sections,
  // we fall back to full-HTML regeneration (existing behavior).
  const split: SectionSplit | null = splitSections(currentHtml);
  const sectionSummaries = split
    ? split.sections.map((s) => ({ index: s.index, tag: s.tag, preview: s.preview }))
    : undefined;
  console.log(
    `[chat] split: ${split ? `${split.sections.length} sections [${split.sections.map((s) => s.tag).join(", ")}]` : "FAILED — will use full regen"}`
  );

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: StreamEvent) => {
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      };

      // Abort signal for 240s runaway protection. maxDuration is 300s, so
      // this leaves headroom for finalization + save. Most edits finish in
      // <10s via scoped mode; full regens of large sites can need 60-120s.
      const abort = new AbortController();
      const timeout = setTimeout(() => abort.abort(), 240_000);

      // Accumulate as tokens arrive so we can detect mode + parse final HTML.
      let accumulated = "";
      // Populated when the Gemini classifier picks specific sections.
      // Null means "regenerate full HTML" (fallback path).
      let scopeTargets: number[] | null = null;
      // Set to the spliced HTML if the scoped path succeeds. If set, we skip
      // the full-regen Claude call and go straight to finalize/save.
      let scopedFinalHtml: string | null = null;
      let mode: "chat" | "html" | null = null;
      // Captured from Anthropic's message_delta event. If "max_tokens", the
      // response was truncated mid-flight — must not overwrite the user's site.
      let stopReason: string | null = null;

      // Emit mode as soon as we can tell from the buffered prefix.
      const detectMode = (): void => {
        if (mode !== null) return;
        const trimmed = accumulated.trimStart();
        if (trimmed.length < 1) return;
        // Explicit CHAT: prefix wins.
        if (trimmed.length >= 5 && trimmed.slice(0, 5).toUpperCase() === "CHAT:") {
          mode = "chat";
          send({ type: "mode", mode: "chat" });
          return;
        }
        // HTML-ish first chars — lock in html mode once we have enough signal.
        const firstChar = trimmed[0];
        if (firstChar === "<" || trimmed.length >= 20) {
          mode = "html";
          send({ type: "mode", mode: "html" });
          return;
        }
      };

      // Forward a text delta. In chat mode we stream tokens to the UI
      // (stripping the leading "CHAT:" prefix). In html mode the raw HTML
      // isn't useful to show, so we emit periodic progress events with
      // accumulated char count — enough to prove the stream is alive.
      let chatPrefixStripped = false;
      let lastProgressReportedAt = 0;
      const forwardDelta = (delta: string): void => {
        accumulated += delta;
        detectMode();
        if (mode === "chat") {
          let out = delta;
          if (!chatPrefixStripped) {
            const trimmedAcc = accumulated.trimStart();
            if (trimmedAcc.toUpperCase().startsWith("CHAT:")) {
              out = trimmedAcc.slice(5).replace(/^\s+/, "");
              chatPrefixStripped = true;
            }
          }
          if (out) send({ type: "token", text: out });
          return;
        }
        if (mode === "html") {
          // Emit progress every ~400 chars so the client sees movement.
          if (accumulated.length - lastProgressReportedAt >= 400) {
            lastProgressReportedAt = accumulated.length;
            send({ type: "progress", chars: accumulated.length });
          }
        }
      };

      // ── Step 1: classify the user's intent ────────────────────────
      // Route the message to one of CHAT / CHANGE_ALL / CHANGE_SCOPED.
      // Try Gemini first (free tier). If it's down/quota-exhausted, fall
      // back to Claude Haiku so scoping still works. Image-bearing messages
      // always skip classification — they're almost always edits.
      let classifier: "gemini" | "claude" | null = null;
      let classification: GeminiClassification | null = null;
      try {
        if (parsedImages.length === 0) {
          if (process.env.GEMINI_API_KEY) {
            classification = await classifyWithGemini(
              message,
              currentHtml,
              abort.signal,
              trimmedHistory,
              sectionSummaries
            );
            classifier = "gemini";
          }
          if (
            (!classification || classification.type === "error") &&
            process.env.ANTHROPIC_API_KEY
          ) {
            if (classification?.type === "error") {
              console.warn(
                `[chat] Gemini failed (${classification.message}) — falling back to Claude Haiku classifier`
              );
            }
            classification = await classifyWithClaude(
              message,
              currentHtml,
              abort.signal,
              trimmedHistory,
              sectionSummaries
            );
            classifier = "claude";
          }

          if (classification?.type === "chat") {
            mode = "chat";
            send({ type: "mode", mode: "chat" });
            send({ type: "token", text: classification.reply });
            send({ type: "done", reply: classification.reply, creditsRemaining: currentBalance });
            controller.close();
            clearTimeout(timeout);
            return;
          }
          if (classification?.type === "error") {
            console.warn("[chat] Both classifiers failed, falling through to full regen:", classification.message);
          }
          if (classification?.type === "change_scoped" && split) {
            const valid = classification.targets.filter(
              (t) => Number.isFinite(t) && t >= 0 && t < split.sections.length
            );
            if (valid.length > 0 && valid.length < split.sections.length) {
              scopeTargets = valid;
              send({ type: "scope", targets: valid });
              console.log(`[chat] ${classifier}: CHANGE_SCOPED ${JSON.stringify(valid)}`);
            } else {
              console.log(
                `[chat] ${classifier}: CHANGE_SCOPED ${JSON.stringify(classification.targets)} — invalid or covers all, falling back to full regen`
              );
            }
          } else if (classification?.type === "change_all") {
            console.log(`[chat] ${classifier}: CHANGE_ALL → full regen`);
          }
        }
      } catch (err) {
        console.warn("[chat] Classifier threw, falling back to full regen:", err);
      }

      // ── Cost guard: full regens of large sites cost real money ──
      // Sonnet regenerating a 60k-char HTML bills ~20k input + 15-20k output
      // tokens per attempt (~$0.30–0.40), and timing out client-side doesn't
      // stop Anthropic from charging for the tokens already streamed. Before
      // firing that call, ask the user to confirm. The client re-sends with
      // { confirmed: true } to skip this block on the second attempt.
      const wouldRunFullRegen = scopeTargets === null;
      const siteIsLarge = currentHtml.length > LARGE_REGEN_CHAR_THRESHOLD;
      if (wouldRunFullRegen && siteIsLarge && !userConfirmedLargeRegen) {
        const estimatedSeconds = Math.ceil(currentHtml.length / 250); // ~250 chars/sec at Sonnet stream speed
        console.log(
          `[chat] Cost guard: blocked full-regen on ${currentHtml.length}-char site pending user confirmation`
        );
        send({
          type: "confirm_required",
          reason: "large_regen",
          htmlChars: currentHtml.length,
          estimatedSeconds,
        });
        controller.close();
        clearTimeout(timeout);
        return;
      }

      // ── Step 2a: Scoped Claude edit (only touches target sections) ──
      // When the classifier picks specific sections, we send ONLY those
      // to Claude — much smaller prompt, no truncation risk, ~3-5× cheaper.
      // The untouched sections get spliced back byte-exact into the HTML.
      // Any failure falls through to the full-regen path below.
      if (
        scopeTargets !== null &&
        split !== null &&
        process.env.ANTHROPIC_API_KEY
      ) {
        try {
          mode = "html";
          send({ type: "mode", mode: "html" });

          const scoped = await runScopedEdit({
            anthropicKey: process.env.ANTHROPIC_API_KEY,
            model: anthropicModel,
            signal: abort.signal,
            split,
            targets: scopeTargets,
            userMessage,
            history: trimmedHistory,
            onProgress: (chars) => send({ type: "progress", chars }),
          });

          if (scoped.ok) {
            // Image replacement handled in the common finalization below
            // (currently a no-op since scoped runs only without images, but
            // keep the invariant that all placeholder rewriting happens once).
            scopedFinalHtml = scoped.html;
          } else {
            console.warn(`[chat] Scoped edit failed, falling back to full regen: ${scoped.reason}`);
            // Reset stream state so the fallback path starts clean.
            accumulated = "";
            lastProgressReportedAt = 0;
          }
        } catch (err) {
          console.warn("[chat] Scoped edit threw, falling back to full regen:", err);
          accumulated = "";
          lastProgressReportedAt = 0;
        }
      }

      // ── Step 2: Claude streaming (for actual HTML edits) ──────────
      // Skipped when the scoped path already produced a full HTML.
      try {
        if (scopedFinalHtml === null && process.env.ANTHROPIC_API_KEY) {
          const userContent: Array<{ type: string; [key: string]: unknown }> = [];
          for (const img of parsedImages) {
            userContent.push({
              type: "image",
              source: { type: "base64", media_type: img.mimeType, data: img.base64 },
            });
          }
          userContent.push({ type: "text", text: userMessage });

          const resp = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.ANTHROPIC_API_KEY,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: anthropicModel,
              // 32000 matches /api/ai/generate so full-site regens don't
              // get clipped. Chat edits often still regenerate the whole
              // HTML until scoped edits ship.
              max_tokens: 32000,
              stream: true,
              system: systemPrompt,
              messages: [
                // Prior chat turns let the model resolve references like
                // "make it bigger" or "change that to blue" without the user
                // restating context. System prompt still holds the live HTML.
                ...trimmedHistory,
                { role: "user", content: parsedImages.length > 0 ? userContent : userMessage },
              ],
            }),
            signal: abort.signal,
          });

          if (!resp.ok || !resp.body) {
            const errData = await resp.json().catch(() => ({}));
            const msg = errData?.error?.message || `Anthropic API error (${resp.status})`;
            console.error(`Anthropic chat stream error (model=${anthropicModel}):`, resp.status, errData);
            send({ type: "error", message: msg });
            controller.close();
            return;
          }

          // Parse Anthropic's SSE stream: lines of "data: {json}" with
          // event_delta containing text deltas.
          const reader = resp.body.getReader();
          const decoder = new TextDecoder();
          let sseBuffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            sseBuffer += decoder.decode(value, { stream: true });
            const lines = sseBuffer.split("\n");
            sseBuffer = lines.pop() ?? "";
            for (const rawLine of lines) {
              // Strip trailing \r so CRLF line endings don't corrupt JSON parse.
              const line = rawLine.replace(/\r$/, "");
              if (!line.startsWith("data: ")) continue;
              const payload = line.slice(6).trim();
              if (!payload || payload === "[DONE]") continue;
              try {
                const evt = JSON.parse(payload);
                if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
                  const text = evt.delta.text as string;
                  if (text) forwardDelta(text);
                } else if (evt.type === "message_delta" && evt.delta?.stop_reason) {
                  stopReason = evt.delta.stop_reason as string;
                }
              } catch {
                // Ignore non-JSON keep-alives.
              }
            }
          }
        } else if (scopedFinalHtml === null) {
          // Non-streaming fallback — OpenAI/Gemini. We buffer the full
          // response then emit it as a single mode + token burst so the
          // client protocol stays unified.
          const fullText = await callNonStreamingFallback({
            systemPrompt,
            userMessage,
            parsedImages,
            signal: abort.signal,
          });
          if (fullText == null) {
            send({ type: "error", message: "No AI API key configured." });
            controller.close();
            return;
          }
          if (fullText.upstreamError) {
            send({ type: "error", message: fullText.upstreamError });
            controller.close();
            return;
          }
          if (fullText.raw) {
            forwardDelta(fullText.raw);
          }
        }
      } catch (err) {
        const name = err instanceof Error ? err.name : "";
        const msg =
          name === "AbortError"
            ? "Request timed out. Try a simpler change."
            : err instanceof Error
              ? err.message
              : "Chat failed";
        console.error("Chat stream error:", err);
        send({ type: "error", message: msg });
        controller.close();
        return;
      } finally {
        clearTimeout(timeout);
      }

      // ── Stream ended — finalize ───────────────────────────────────
      // If mode never got detected (e.g. empty response), fall back.
      if (mode === null) {
        detectMode();
      }

      const trimmed = accumulated.trim();
      let chatReply: string | null = null;
      let updatedHtml: string | null = null;

      if (scopedFinalHtml !== null) {
        // Scoped path already produced the final HTML — skip extractHtml
        // and the CHAT: detection (scoped mode never emits CHAT:).
        updatedHtml = scopedFinalHtml;
      } else if (mode === "chat" || trimmed.toUpperCase().startsWith("CHAT:")) {
        chatReply = trimmed.replace(/^CHAT:\s*/i, "");
      } else {
        updatedHtml = extractHtml(accumulated);
        if (!updatedHtml) {
          // Model returned something but no valid HTML — surface raw text.
          chatReply = trimmed || "The AI didn't produce a valid response. Try rephrasing.";
          mode = "chat";
          // Late mode signal so the client knows to treat it as text.
          send({ type: "mode", mode: "chat" });
        }
      }

      if (chatReply) {
        send({ type: "done", reply: chatReply, creditsRemaining: currentBalance });
        controller.close();
        return;
      }

      if (!updatedHtml) {
        send({
          type: "done",
          reply: "The AI didn't produce a valid response. Try rephrasing.",
          creditsRemaining: currentBalance,
        });
        controller.close();
        return;
      }

      // Data-loss guard: if Claude hit the token cap, its output is
      // truncated mid-file. Do NOT overwrite the user's existing site —
      // surface an error and keep the old HTML.
      const looksComplete = /<\/html>\s*$/i.test(updatedHtml.trim());
      if (stopReason === "max_tokens" || !looksComplete) {
        console.warn(
          `[chat] Rejected truncated HTML (stop_reason=${stopReason}, looksComplete=${looksComplete}, len=${updatedHtml.length})`
        );
        send({
          type: "error",
          message:
            "The change was too big to fit in one response — the page would have been cut off. Try breaking the edit into smaller steps (e.g. change one section at a time).",
        });
        controller.close();
        return;
      }

      // Replace image placeholders with actual data URLs
      for (let i = 0; i < parsedImages.length; i++) {
        // Prefer the uploaded public URL. Fall back to base64 data URL
        // only if the storage upload failed — better to have a heavy
        // HTML than a broken image.
        const src = parsedImages[i].publicUrl ?? parsedImages[i].dataUrl;
        updatedHtml = updatedHtml.replaceAll(`{{USER_IMAGE_${i + 1}}}`, src);
      }

      // Re-run runtime enhancements. For scoped edits this is a no-op
      // (runtime already lives in the gap region). For full regens this
      // restores any IDs/anchors/reveals/script the model may have dropped.
      const chatEnhanced = enhanceGeneratedHtml(updatedHtml);
      updatedHtml = chatEnhanced.html;
      if (chatEnhanced.injectedViewport) {
        console.warn("[Chat] viewport meta was missing — injected by post-process");
      }
      if (chatEnhanced.responsiveWarnings.length > 0) {
        console.warn(`[Chat] Responsive drift — ${chatEnhanced.responsiveWarnings.join("; ")}`);
      }

      // Deduct credits — only for real HTML updates.
      const deductResult = await deductCredits(user.id, editCost, "generation", {
        source: "chat_edit",
        modelKey,
        apiModel: anthropicModel,
      });
      const creditsRemaining = deductResult.success ? deductResult.newBalance : currentBalance - editCost;

      send({ type: "done", html: updatedHtml, creditsRemaining: creditsRemaining ?? currentBalance - editCost });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

// Fallback for OpenAI / Gemini — returns the full response text at once.
// Used only when ANTHROPIC_API_KEY is not set.
async function callNonStreamingFallback(args: {
  systemPrompt: string;
  userMessage: string;
  parsedImages: ParsedImage[];
  signal: AbortSignal;
}): Promise<{ raw?: string; upstreamError?: string } | null> {
  const { systemPrompt, userMessage, parsedImages, signal } = args;

  if (process.env.OPENAI_API_KEY) {
    const userContent: Array<{ type: string; [key: string]: unknown }> = [];
    for (const img of parsedImages) {
      userContent.push({ type: "image_url", image_url: { url: img.dataUrl, detail: "high" } });
    }
    userContent.push({ type: "text", text: userMessage });

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: parsedImages.length > 0 ? userContent : userMessage },
        ],
        temperature: 0.5,
        max_tokens: 16000,
      }),
      signal,
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      return { upstreamError: errData?.error?.message || `OpenAI API error (${resp.status})` };
    }
    const data = await resp.json();
    return { raw: data.choices?.[0]?.message?.content ?? "" };
  }

  if (process.env.GEMINI_API_KEY) {
    const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];
    for (const img of parsedImages) {
      parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } });
    }
    parts.push({ text: userMessage });

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 16000 },
        }),
        signal,
      }
    );

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      return { upstreamError: errData?.error?.message || `Gemini API error (${resp.status})` };
    }
    const data = await resp.json();
    return { raw: data.candidates?.[0]?.content?.parts?.[0]?.text ?? "" };
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────
// Scoped edit: send only the target sections to Claude and splice back.
// ─────────────────────────────────────────────────────────────────────

const SCOPED_SYSTEM_PROMPT = `You are editing specific sections of an existing HTML website. The user will show you only the sections that should be modified, each wrapped in sentinel markers of the form <!-- WVSCOPE:N:START --> ... <!-- WVSCOPE:N:END -->.

STRICT OUTPUT RULES:
1. Output ONLY the modified sections, each wrapped in the SAME sentinel markers with the SAME index (N). Example:
   <!-- WVSCOPE:0:START -->
   <header>... modified header ...</header>
   <!-- WVSCOPE:0:END -->
2. Do NOT output any text outside the sentinel markers. No prose, no markdown, no code fences.
3. Do NOT include <!DOCTYPE>, <html>, <head>, <body>, or <script> wrapper tags — you are NOT writing a full document.
4. Preserve each section's OUTER tag type (a <header> stays <header>, a <section> stays <section>, a <style> stays <style>). Change its contents, attributes, and children freely.
5. If a section is shown but doesn't need changing, OMIT it entirely from your output.
6. Use Tailwind classes and inline styles consistent with the existing code.
7. Keep all image srcs, Unsplash URLs, and icon SVGs intact unless the request is specifically about them.
8. When editing a <style> section: keep the opening <style> and closing </style> tags. You may add, remove, or rewrite CSS rules inside, but do not convert the section into anything else. Do NOT delete rules the user did not ask to change.

The rest of the website (not shown) will be preserved byte-for-byte.`;

interface ScopedEditArgs {
  anthropicKey: string;
  model: string;
  signal: AbortSignal;
  split: SectionSplit;
  targets: number[];
  userMessage: string;
  history: Array<{ role: "user" | "assistant"; content: string }>;
  onProgress: (chars: number) => void;
}

async function runScopedEdit(
  args: ScopedEditArgs
): Promise<{ ok: true; html: string } | { ok: false; reason: string }> {
  const { anthropicKey, model, signal, split, targets, userMessage, history, onProgress } = args;

  // Build the user prompt: only the target sections wrapped in markers,
  // then the user's actual request at the bottom.
  const scopedBlocks = targets
    .map((idx) => {
      const section = split.sections[idx];
      return `${SCOPE_START(idx)}\n${section.content}\n${SCOPE_END(idx)}`;
    })
    .join("\n\n");

  const scopedUserContent = `SECTIONS TO EDIT:\n\n${scopedBlocks}\n\nUSER REQUEST: ${userMessage}`;

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      // 16000 is plenty for a handful of sections — we'll never hit the cap
      // here, which is exactly the point of scoping.
      max_tokens: 16000,
      stream: true,
      system: SCOPED_SYSTEM_PROMPT,
      messages: [...history, { role: "user", content: scopedUserContent }],
    }),
    signal,
  });

  if (!resp.ok || !resp.body) {
    const errData = await resp.json().catch(() => ({}));
    const reason = errData?.error?.message || `Anthropic API error (${resp.status})`;
    return { ok: false, reason };
  }

  // Stream SSE and accumulate text deltas.
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let sseBuffer = "";
  let accumulated = "";
  let stopReason: string | null = null;
  let lastProgressAt = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    sseBuffer += decoder.decode(value, { stream: true });
    const lines = sseBuffer.split("\n");
    sseBuffer = lines.pop() ?? "";
    for (const rawLine of lines) {
      const line = rawLine.replace(/\r$/, "");
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const evt = JSON.parse(payload);
        if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
          const text = evt.delta.text as string;
          if (text) {
            accumulated += text;
            if (accumulated.length - lastProgressAt >= 400) {
              lastProgressAt = accumulated.length;
              onProgress(accumulated.length);
            }
          }
        } else if (evt.type === "message_delta" && evt.delta?.stop_reason) {
          stopReason = evt.delta.stop_reason as string;
        }
      } catch {
        // Ignore non-JSON keep-alives.
      }
    }
  }

  if (stopReason === "max_tokens") {
    return { ok: false, reason: "Scoped response was truncated (max_tokens)" };
  }

  // Parse the sentinel-wrapped sections the model returned.
  const replacements = parseScopedResponse(accumulated);
  if (replacements.size === 0) {
    return {
      ok: false,
      reason: `No sections parsed from model response (len=${accumulated.length})`,
    };
  }

  // Sanity: every returned index must be one we asked for. Extra indexes
  // (hallucinated) are silently dropped.
  const targetSet = new Set(targets);
  const validReplacements = new Map<number, string>();
  for (const [idx, content] of replacements.entries()) {
    if (targetSet.has(idx)) validReplacements.set(idx, content);
  }
  if (validReplacements.size === 0) {
    return { ok: false, reason: "Model returned sections outside the requested scope" };
  }

  const finalHtml = spliceSections(split, validReplacements);

  // Spliced HTML must still be a valid document.
  if (!/<\/html>\s*$/i.test(finalHtml.trim())) {
    return { ok: false, reason: "Spliced HTML is not a complete document" };
  }

  return { ok: true, html: finalHtml };
}
