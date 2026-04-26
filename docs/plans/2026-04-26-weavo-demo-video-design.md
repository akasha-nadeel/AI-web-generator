# Weavo Landing-Page Demo Video — Design Document

**Date:** 2026-04-26
**Status:** Design approved, awaiting implementation plan
**Owner:** Akasha Nadeel
**Type:** Marketing asset (landing-page hero video)

## Summary

A 72-second, silent + captioned product demo video for the Weavo landing page, inspired by the calm/minimal aesthetic of the `claude.ai/design` intro animation. The video tells the canonical Weavo story end-to-end — prompt → AI generation → editor refinement → one-click publish → live site — and ends on a "Get Started Free" CTA. Produced programmatically with Remotion (React-based video framework) so an AI agent can write and render it directly, then mounted into the existing video container below the landing-page hero.

## Motivation

The current landing page has a video container slot below the hero section (with "LIVE DEMO" badge and centered play button) populated with placeholder content. A real product demo video at this slot is the highest-leverage marketing asset — it converts hero-section visitors who are still deciding whether to scroll or sign up. The video needs to (a) look premium enough to match the design quality of the generated sites Weavo produces, and (b) be producible by an AI agent without GUI tools.

## Goals

- A 72-second silent + captioned video that tells the full Weavo story (prompt → generate → edit → publish → live site)
- Aesthetic indistinguishable from a hand-crafted Linear/Stripe/Cal.com landing-page demo
- 100% programmatic production — no GUI tools required
- Authentically shows the real Weavo product (not a fictional UI)
- Mounted into the existing landing-page video container with autoplay-muted-loop semantics

## Non-goals (v1)

- Voiceover (silent + captions only)
- Vertical 9:16 cutdown for socials (16:9 master only — can crop later if needed)
- Multi-language captions (English only)
- Interactive video features (chapters, hotspots)
- Cinematic 3D effects, particles, complex motion blur
- A/B variants

## Key Decisions

| # | Decision | Why |
|---|---|---|
| Q1 | Reference style: claude.ai/design intro | Confirmed by user — calm, premium, browser-frame aesthetic, silent + captions |
| Q2 | Job: full-journey product demo, not input-cycle loop | User picked option 3 — show the whole flow including the output (Weavo's differentiator) |
| Q3 | Audio: silent + ambient pad music + black captions | Matches Claude reference exactly; works with autoplay-muted on landing page |
| Q4 | 5 visible beats, ~70s runtime | Balance between thorough story and ship-able runtime |
| Q5 | Aspect ratio: 16:9 master | Mounts into existing landing-page slot; crops to other ratios cleanly |
| Q6 | Mount: existing video container below hero | User confirmed this slot — already styled with "LIVE DEMO" badge |
| Q7 | Background: pure white (#FFFFFF) | User override of original cream — makes dark Kino site preview pop harder |
| Q8 | Demo industry: streaming platform "Kino" | Showcases Trilok pattern (Design #36) — most cinematic library asset |
| Q9 | Captions: pure black (#000000) | User-specified — max contrast on white |
| Q10 | CTA close: solid black button, white text, "Get Started Free" | Matches existing nav CTA |
| Q11 | Code editor in Beat 2: white background | User override — unifies with white video bg, makes Beat 2 a "white in, dark out" split |
| Q12 | Domain shown: weavostudio.com | User-confirmed marketing domain (not weavo.site) |
| Q13 | Production tool: Remotion | Programmatic — code-driven, AI-agent-producible, no GUI needed |

## Architecture

```
[ Remotion project ]  ──→  [ React components per beat ]  ──→  [ Render via FFmpeg ]  ──→  [ MP4 → landing page video slot ]
                              ↑
                        (real product screenshots
                         captured via Playwright)
```

### What's new

1. `remotion/` directory — Remotion project with 7 beat components, browser frame, cursor, captions, music
2. `scripts/capture-demo-frames.ts` — Playwright script to capture real product screenshots into `remotion/public/`
3. Landing-page video element swap — replace placeholder with rendered MP4

### What's NOT touched

- Weavo generator, chat, editor, publish flow — pure presentation layer
- Supabase, AI prompts, design library — none of this changes
- Existing landing-page hero, nav, sections — only the video container's `src` changes

## Storyboard (Section A from brainstorm)

| # | Beat | Duration | What's on screen | Caption |
|---|---|---|---|---|
| 0 | Cold open | 0:00 – 0:04 | White bg, big serif heading: "A website," → morphs to "in a sentence." | (heading is the caption) |
| 1 | The prompt | 0:04 – 0:18 | Browser frame zoom-in. Weavo dashboard at `weavostudio.com/dashboard`. Cursor types prompt: *"Build a streaming platform called Kino — dark cinematic with red accents, show trending movies and series."* Cursor → Send. | "Type what you need." (0:14) |
| 2 | The build | 0:18 – 0:35 | `/generate` route. Split: white code editor streams HTML token-by-token (left) + Trilok-styled Kino preview builds in passes (right). | "Real code. Real design." (0:24) |
| 3 | The refine | 0:35 – 0:50 | Editor route. Cursor types: *"Make the hero title bigger and add a 'Watch Trailer' button."* Live preview updates in place. | "Refine by chatting." (0:42) |
| 4 | The publish | 0:50 – 1:00 | Cursor clicks Publish → modal opens → subdomain auto-fills `kino` → click Publish → success: "Live at kino.weavostudio.com" | "Live in one click." (0:54) |
| 5 | The payoff | 1:00 – 1:08 | New tab opens. URL types `kino.weavostudio.com`. Page loads. Slow cinematic auto-scroll through hero → trending → genres → footer. | (none) |
| 6 | CTA close | 1:08 – 1:12 | Site fades to white. "weavo." wordmark. "Get Started Free" pill (black bg, white text), single subtle pulse. URL `weavostudio.com` below. | (none) |

**Total runtime: 1:12 (72s).**

## Visual Spec (Section C from brainstorm)

### Typography
- **Cold open + final wordmark:** Instrument Serif (or matched serif from existing landing-page hero), weight 400-500
- **Captions:** Inter, weight 500, size 32px, letter-spacing -0.01em, color `#000000`
- **In-product UI:** Real Weavo dashboard typography (whatever the actual product uses)
- **Generated Kino site:** Per Trilok pattern — condensed bold all-caps for hero, bold sans for headings

### Colors

| Element | Color |
|---|---|
| Video bg | `#FFFFFF` |
| Captions | `#000000` |
| Final CTA pill | bg `#000000`, text `#FFFFFF` |
| Cold open heading | `#0A0A0A` |
| Cursor | `#000000` fill, conditional 1px white outline on dark surfaces |
| Code editor in Beat 2 | bg `#FFFFFF`, text `#0A0A0A` |
| Code syntax | tags `#0F62FE`, strings `#0E7C3A`, comments `#6B7280`, attributes `#A11A77` |
| Generated Kino site bg | `#0E0E0E` |
| Generated Kino site accent | `#E63838` |

### Motion
- **Default ease:** `cubic-bezier(0.16, 1, 0.3, 1)` — soft ease-out
- **Fades:** 400ms
- **Browser zoom-in (Beat 1):** 800ms, scale 0.85 → 1.0
- **Cursor moves:** 600ms per segment, no overshoot
- **Code streaming (Beat 2):** ~80 chars/sec linear
- **Preview section reveals (Beat 2):** fade + 16px upward drift, 500ms each
- **Modal open (Beat 4):** 250ms, scale 0.96 → 1.0 + opacity 0 → 1
- **CTA pulse (Beat 6):** 600ms, scale 1.0 → 1.04 → 1.0, sine ease

### Captions style
- Position: bottom center, 12% padding from canvas bottom
- Animation in/out: fade + 8px upward drift, 400ms
- On-screen duration: 3.5s typical
- Never overlap a UI screenshot — captions appear on white matte only

### Cursor
- Single consistent macOS-style arrow, 24px (larger than real for legibility)
- Black fill `#000000`, conditional 1px white outline on dark backgrounds
- On click: target element scales 0.92 for 80ms

### Browser frame
- Clean Chrome-style: 3 traffic lights left, refresh + back/forward, single address bar
- No tab bar (focus tight)
- 12px rounded corners, soft shadow `0 30px 60px rgba(0,0,0,0.08)`

### Music
- Ambient pad, 60-90 BPM, no rhythm/melody — held chord with subtle filter sweep
- Source: Artlist or Epidemic Sound, query "ambient pad" / "minimal cinematic" / "tech intro calm"
- Mix: -18 LUFS, ducks -3dB under captions
- On landing page: muted by default (autoplay constraint)

## Production Approach (Section D from brainstorm)

### Tool: Remotion

React-based video framework. Every frame is a React render; render command produces an MP4. Used by Notion, Cal.com, Sentry, Linear for landing-page demos. Free for solo use.

### Source mix per beat

| Beat | Source |
|---|---|
| 0 — Cold open | Pure Remotion components (motion graphics) |
| 1 — Prompt | React mock of Weavo dashboard (high-fidelity copy of `src/app/(auth)/dashboard/page.tsx`) inside animated browser frame |
| 2 — Build | React code editor component (`@remotion/shiki` for syntax) + Playwright-captured screenshot of generated Kino site, revealed in passes |
| 3 — Refine | React mock of editor + crossfade between two Playwright-captured screenshots (before/after the chat edit) |
| 4 — Publish | React mock of editor with animated React modal |
| 5 — Payoff | Tall full-page Playwright screenshot of live Kino site, scrolled vertically over 6s |
| 6 — CTA close | Pure Remotion components (motion graphics) |

### Pre-production: capture real product screenshots

A Playwright script (`scripts/capture-demo-frames.ts`) drives a local dev server, navigates through the flow, and saves screenshots to `remotion/public/`. Required captures:
1. Generated Kino site — hero only
2. Generated Kino site — hero + trending row
3. Generated Kino site — full bento (hero + trending + genres)
4. Generated Kino site — full page (tall scroll capture for Beat 5)
5. Generated Kino site — after chat edit applied (bigger hero title + Watch Trailer button)

Dashboard, generate page, editor, and modal are React mocks (full motion control), not screenshots.

### Render pipeline

```bash
cd remotion
npm install
npx remotion render src/index.ts MainComposition out/weavo-demo.mp4 --concurrency=4
```

Render at 2560×1440, H.264, 60fps, ~12 Mbps. ~10-15 min render time.

### Mount on landing page

- Replace placeholder media in existing video container
- `<video autoPlay muted loop playsInline>` with H.264 + WebM `<source>` fallback
- Keep "LIVE DEMO" badge as decorative branding
- Hide play-button overlay (autoplay) OR repurpose as click-to-unmute (decision deferred to implementation)
- `preload="metadata"` to avoid blocking First Contentful Paint

## Quality bar

Remotion output for this minimal/typographic style: ~85-90% of After Effects quality, indistinguishable to most viewers. The aesthetic chosen (calm, minimal, no particles, no 3D, no fast motion) is *exactly* Remotion's strength — Linear, Cal.com, and Sentry's demo videos are all Remotion and feel premium.

## Risks

1. **Generated Kino site varies between AI runs** — non-determinism could mean each capture looks different. Mitigation: capture once, lock the output, reuse the saved screenshot. If the captured site isn't visually compelling, regenerate until one is.
2. **Subdomain hosting still publishes to `*.weavo.site`, not `*.weavostudio.com`** — Beats 4 + 5 show `kino.weavostudio.com` which may not match the real codebase. Mitigation: marketing fiction is fine for a demo video; the URL is shown statically in the address bar (not loaded). If misleading, swap to `kino.weavo.site`.
3. **Remotion render time grows with effect complexity** — current design is simple (typewriter, fades, scrolls), so render should stay under 15 min. Watch this if scope expands.
4. **Browser frame fidelity** — a hand-built Chrome-frame React component may look "off" vs. a real screenshot. Mitigation: use Remotion's `<BrowserFrame>` community packages, or a cropped real Chrome screenshot as the frame chrome (replacing only the inner viewport).

## Reversibility

If the video underperforms or the brand direction changes, reverting is trivial:
- Swap the video `src` back to the placeholder (~5 min)
- Delete `remotion/` directory and `scripts/capture-demo-frames.ts`
- The whole asset is contained — zero coupling to Weavo's product code

## Acceptance criteria

- [ ] 72-second MP4 at 2560×1440, ≤30 MB, H.264 + WebM
- [ ] All 7 beats render with timing matching this spec (within ±200ms per caption)
- [ ] Captions are pure black, Inter 500, on white matte only
- [ ] Generated Kino site shown is genuinely produced by Weavo (not a Photoshop mock)
- [ ] Mounts into landing-page video container, autoplays muted, loops cleanly
- [ ] Lighthouse Performance score on the landing page does not regress more than -5 points from current baseline
- [ ] Akasha approves the final render
