# Weavo Demo Video — Implementation Plan

**Companion to:** `docs/plans/2026-04-26-weavo-demo-video-design.md`
**Date:** 2026-04-26
**Status:** Awaiting approval to begin Phase 1

## Overview

9 phases, each independently completable and viewable. Phases 1-2 are infrastructure. Phases 3-7 produce the seven beats (built easiest-first to surface tooling issues early). Phase 8 is composition + render. Phase 9 mounts the rendered MP4 into the landing page.

**Total estimated effort:** ~1-2 sessions of focused agent work plus user review rounds for timing/feel.

**Layout decision:** Remotion lives in a sub-package at `remotion/` with its own `package.json`. Keeps the main app's dependency graph clean (Remotion's deps don't affect Next.js bundle); user runs `cd remotion && npx remotion render` to produce the MP4.

## Conventions

- All paths relative to repo root
- New files marked `[NEW]`, modified files marked `[EDIT]`
- Each phase ends with a checkpoint commit
- Acceptance criteria = "what proves this phase is done"
- Beat duration spec lives in the design doc; implementation references it as the source of truth
- Frame rate: **60fps** throughout. Total composition: 72s × 60fps = **4320 frames**

## Phase 1 — Remotion Scaffold + Dependencies

**Goal:** A working Remotion sub-package that renders an empty 72-second white composition at 2560×1440 60fps.

### Files

- `[NEW] remotion/package.json` — declares Remotion deps, render script
- `[NEW] remotion/tsconfig.json` — TS config for Remotion
- `[NEW] remotion/remotion.config.ts` — sets video format, codec, scale
- `[NEW] remotion/src/index.ts` — registers root composition
- `[NEW] remotion/src/Root.tsx` — `<Composition>` definition, 4320 frames, white bg
- `[NEW] remotion/src/MainComposition.tsx` — top-level scene component (empty for now)
- `[NEW] remotion/.gitignore` — ignore `out/`, `node_modules/`
- `[NEW] remotion/README.md` — render command, dev command, output path
- `[EDIT] .gitignore` — add `remotion/node_modules` and `remotion/out`

### Dependencies

- `remotion`, `@remotion/cli`, `@remotion/bundler`, `@remotion/renderer` (core)
- `@remotion/shiki` (code editor syntax in Phase 6)
- `@remotion/google-fonts` (Inter, Instrument Serif)
- `@remotion/media-utils` (audio mixing in Phase 8)

### Acceptance criteria

- `cd remotion && npm install` completes without errors
- `cd remotion && npx remotion preview` opens the Studio at `localhost:3000` showing a 72s blank white composition
- `cd remotion && npx remotion render` produces `remotion/out/weavo-demo.mp4` (72s, white, silent)
- Commit: "Scaffold Remotion sub-package for demo video"

## Phase 2 — Shared Primitives

**Goal:** Reusable components for the browser frame, animated cursor, captions, and timing utilities. Used by every beat.

### Files

- `[NEW] remotion/src/primitives/BrowserFrame.tsx` — Chrome-style frame with traffic lights, address bar prop, no tab bar, 12px radius, soft shadow
- `[NEW] remotion/src/primitives/Cursor.tsx` — 24px black arrow, conditional white outline prop, props for position keyframes
- `[NEW] remotion/src/primitives/Caption.tsx` — Inter 500 32px black, fade + 8px drift in/out, props for text + start/end frames
- `[NEW] remotion/src/primitives/Typewriter.tsx` — character-by-character text reveal with per-char timing + punctuation pauses
- `[NEW] remotion/src/lib/timing.ts` — frame helpers: `secondsToFrames`, `BEATS` constant with start/end frames per beat from design doc
- `[NEW] remotion/src/lib/easing.ts` — exports `softEaseOut` (cubic-bezier 0.16, 1, 0.3, 1) and other curves
- `[NEW] remotion/src/lib/colors.ts` — exports `COLORS` constant from Section C colors table
- `[NEW] remotion/src/primitives/__tests__/Caption.test.tsx` — render snapshot at frame 0 / mid / end of caption window

### Acceptance criteria

- `BrowserFrame` renders a clean Chrome frame with prop-driven URL in address bar
- `Cursor` interpolates smoothly between two positions over a frame range
- `Typewriter` reveals text at 80 chars/sec with longer pause on `.,—`
- `Caption` fades in + drifts up correctly (visual check in Studio)
- All primitives importable from beat components
- Commit: "Add Remotion shared primitives (browser frame, cursor, captions)"

## Phase 3 — Beat 0 (Cold Open) + Beat 6 (CTA Close)

**Goal:** Ship the easiest beats first — pure motion graphics, no real product screenshots needed. Validates typography + timing pipeline end-to-end.

### Files

- `[NEW] remotion/src/beats/Beat0_ColdOpen.tsx` — frames 0-240
  - 0:00-0:01 hold blank
  - 0:01-0:02.4 letter-by-letter reveal "A website,"
  - 0:02.4-0:04 morph (cross-fade) to "in a sentence."
  - Instrument Serif 96px, off-black `#0A0A0A`, centered
- `[NEW] remotion/src/beats/Beat6_CTAClose.tsx` — frames 4080-4320
  - 1:08-1:08.4 white fade-in (assumes prior beat fades to white)
  - 1:09 "weavo." wordmark (Instrument Serif 64px black)
  - 1:09-1:10.4 "Get Started Free" pill: black bg, white text, single subtle scale 1.0→1.04→1.0 pulse via spring
  - Below pill: light-gray `weavostudio.com`
  - Hold final frame to 1:12
- `[EDIT] remotion/src/MainComposition.tsx` — mount Beat 0 and Beat 6 in the timeline

### Acceptance criteria

- Render produces a video where 0-4s shows the cold open and 1:08-1:12 shows the CTA close, with white in between
- "Get Started Free" pill matches existing landing-page nav button visually (pixel-comparable)
- Commit: "Implement cold open and CTA close beats"

## Phase 4 — Playwright Screenshot Capture Script

**Goal:** A repeatable script that captures real Weavo product screenshots into `remotion/public/`. Enables Beats 2, 3, 5 to use authentic product imagery.

### Files

- `[NEW] scripts/capture-demo-frames.ts` — Playwright script
  - Connects to local dev server (`localhost:3000`)
  - Uses a test account (env var `DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD` or session cookie)
  - Generates a Kino streaming site via the actual generator (or loads a pre-generated `siteId` for determinism)
  - Captures:
    - `kino-hero-only.png` — viewport-cropped hero of the live site
    - `kino-hero-trending.png` — hero + trending row visible
    - `kino-full-bento.png` — hero + trending + genres
    - `kino-full-page-tall.png` — full-page screenshot (will be tall, used for Beat 5 scroll)
    - `kino-after-edit.png` — same site but with bigger hero title + Watch Trailer button (for Beat 3 crossfade)
- `[NEW] scripts/README-capture.md` — how to run the capture script, what to verify
- `[NEW] remotion/public/.gitkeep` — ensure dir exists in git

### Open questions for the user before running

1. Should the script run against `localhost:3000` (real dev server, real AI gen) or `weavostudio.com` (production)? Local is simpler.
2. Authentication: Clerk session cookie vs. test user credentials?
3. Determinism: should we lock to a specific `siteId` (regenerate offline once, capture forever) or regenerate per run?

### Acceptance criteria

- Script runs end-to-end on user's machine and produces all 5 PNGs at ≥1920px wide
- Captured Kino site matches Trilok pattern (warm-black bg, vivid red `#E63838` accent, MASSIVE outline-stroke numbered posters)
- PNGs committed to `remotion/public/` (or git-LFS if too large)
- Commit: "Add Playwright capture script for demo screenshots"

## Phase 5 — Animated UI Beats (1, 3, 4)

**Goal:** The three beats that show Weavo UI. Built as React mocks for full motion control (rather than screen recordings).

### Files

- `[NEW] remotion/src/components/WeavoDashboard.tsx` — high-fidelity React mock of `src/app/(auth)/dashboard/page.tsx` (chat input, empty state)
- `[NEW] remotion/src/components/WeavoEditor.tsx` — high-fidelity mock of editor route (chat sidebar + preview pane)
- `[NEW] remotion/src/components/PublishModal.tsx` — modal with subdomain input + Publish button
- `[NEW] remotion/src/beats/Beat1_Prompt.tsx` — frames 240-1080
  - Shrink Beat 0 heading to "weavo." top-left wordmark
  - Browser frame zoom-in (scale 0.85→1.0 over 800ms) showing dashboard at `weavostudio.com/dashboard`
  - Cursor enters bottom-right at 0:07, glides to chat input
  - `Typewriter` reveals the Kino prompt over 0:08-0:16
  - Cursor glides to Send, hovers, clicks
  - Caption "Type what you need." (0:14-0:17.5)
- `[NEW] remotion/src/beats/Beat3_Refine.tsx` — frames 2100-3000
  - Editor mock with the previously-generated Kino site visible in preview pane
  - Cursor types refine prompt in chat
  - At 0:42-0:46, **crossfade** the preview screenshot from `kino-full-bento.png` to `kino-after-edit.png`
  - Cursor moves up and hovers over new "Watch Trailer" button (subtle scale on hover)
  - Caption "Refine by chatting." (0:42-0:48)
- `[NEW] remotion/src/beats/Beat4_Publish.tsx` — frames 3000-3600
  - Editor mock; cursor moves to Publish
  - Modal opens (250ms scale 0.96→1.0 + opacity 0→1)
  - Subdomain field auto-fills `kino` letter-by-letter; preview text updates `kino.weavostudio.com`
  - Cursor clicks Publish (black bg, white text)
  - 1s loading shimmer, then check + "Live at **kino.weavostudio.com**"
  - Caption "Live in one click." (0:54-0:59)
- `[EDIT] remotion/src/MainComposition.tsx` — mount Beats 1, 3, 4 in the timeline

### Acceptance criteria

- Beats 1, 3, 4 render at the correct timing with the correct UI mocks
- Cursor movement feels smooth (no overshoot, no jitter)
- Subdomain auto-fill is legible at full speed
- Commit: "Implement prompt, refine, and publish beats"

## Phase 6 — Beat 2 (The Build) — Most Complex

**Goal:** The "money shot" beat. White code editor streaming HTML on the left, Kino preview building in passes on the right.

### Files

- `[NEW] remotion/src/components/CodeEditor.tsx` — white-bg code panel using `@remotion/shiki` for syntax. Props: `code` string, `streamProgress` 0-1
- `[NEW] remotion/src/components/PreviewPane.tsx` — container that reveals four sections (hero, trending, genres, featured) by progress prop, each with fade + 16px upward drift over 500ms
- `[NEW] remotion/src/data/kino-html-snippet.ts` — exported HTML string used in the streaming animation. Real-looking but ~30-50 lines, written for legibility on screen
- `[NEW] remotion/src/beats/Beat2_Build.tsx` — frames 1080-2100
  - Hard cut from Beat 1 to `/generate` route
  - Code editor on left (50% width) streaming HTML token-by-token at 80 chars/sec
  - Preview pane on right (50% width) building in passes:
    - Frame ~1440 (0:24): hero (`kino-hero-only.png`)
    - Frame ~1620 (0:27): hero + trending (`kino-hero-trending.png`)
    - Frame ~1800 (0:30): full bento (`kino-full-bento.png`)
    - Frame ~1920 (0:32): featured fade-in (subtle band)
  - At frame ~1980 (0:33): code pane dims to 30% opacity, preview expands to 65% width
  - Caption "Real code. Real design." (0:24-0:30)
- `[EDIT] remotion/src/MainComposition.tsx` — mount Beat 2

### Acceptance criteria

- Code streams legibly (font size 14-16px, can be paused and read)
- Preview builds in passes, each pass clearly visible
- Code pane dim + preview expand transition feels intentional
- Commit: "Implement build beat with code stream and preview reveal"

## Phase 7 — Beat 5 (The Payoff)

**Goal:** New tab → URL types → page loads → cinematic auto-scroll through the live Kino site.

### Files

- `[NEW] remotion/src/components/TabBar.tsx` — animated tab grow (new tab appearing next to existing tab)
- `[NEW] remotion/src/components/AddressBarTyping.tsx` — focused address bar with typewriter reveal
- `[NEW] remotion/src/beats/Beat5_Payoff.tsx` — frames 3600-4080
  - 1:00-1:00.4: tab grow animation
  - 1:00.4-1:02: URL types `kino.weavostudio.com`, Enter
  - 1:02-1:02.5: subtle progress bar
  - 1:02.5-1:08: cinematic vertical scroll of `kino-full-page-tall.png` from top to ~1 viewport-height down, soft ease, 6 seconds
  - No caption (let the site breathe)
- `[EDIT] remotion/src/MainComposition.tsx` — mount Beat 5

### Acceptance criteria

- Tab grow animation feels real (not snapped)
- URL typing legible at full speed
- Scroll is smooth, slow, cinematic — no jitter, no janking on a long PNG
- Commit: "Implement payoff beat with cinematic site scroll"

## Phase 8 — Composition Assembly, Music, Final Timing Pass

**Goal:** All beats wired into a single composition with crossfades, music, and frame-perfect timing per design doc.

### Files

- `[NEW] remotion/public/audio/ambient-pad.mp3` — ambient pad track (user-provided from Artlist/Epidemic, or AI-suggested fallback)
- `[NEW] remotion/src/AudioTrack.tsx` — `<Audio>` element with volume curve: -18 LUFS base, ducks -3dB during caption frame ranges
- `[EDIT] remotion/src/MainComposition.tsx` — final assembly:
  - All 7 beats sequenced
  - Crossfades between beats where the design doc calls for soft transitions (Beats 4→5, 5→6 specifically)
  - `<AudioTrack>` mounted on the root
- `[NEW] remotion/src/timing-checklist.md` — table of every motion event with target frame and tolerance, used for QA pass

### Acceptance criteria

- Full 72s render plays continuously with no visual glitches at beat boundaries
- Music is audible throughout, ducks correctly during captions
- Every caption appears within ±12 frames (200ms) of its design-doc target
- Commit: "Assemble full composition with music and final timing"

## Phase 9 — Render + Landing Page Mount

**Goal:** Rendered MP4 dropped into the landing-page video container; site rebuilt and verified.

### Files

- `[NEW] public/videos/weavo-demo.mp4` — final rendered H.264 (copied from `remotion/out/`)
- `[NEW] public/videos/weavo-demo.webm` — WebM/AV1 fallback for smaller payload (rendered via `--codec=vp9` in a second pass)
- `[NEW] public/videos/weavo-demo-poster.jpg` — first frame as poster image (avoids blank flash on slow networks)
- `[EDIT] (landing page video container component)` — file location TBD via grep for "LIVE DEMO" / video container; replace placeholder media src with `<source src="/videos/weavo-demo.webm" type="video/webm" />` + H.264 fallback. Add `autoPlay muted loop playsInline preload="metadata" poster="/videos/weavo-demo-poster.jpg"`. Decide play-button overlay: hide on autoplay OR repurpose as click-to-unmute.

### Acceptance criteria

- Landing page renders the new video at the existing container slot
- Video autoplays muted, loops cleanly without a perceptible cut
- Lighthouse Performance score on the landing page is within -5 points of baseline
- Page works correctly on Chrome, Safari, Firefox, mobile Safari (autoplay constraints differ)
- File sizes: WebM ≤15 MB, MP4 ≤30 MB
- Commit: "Mount demo video on landing page"

## Risks & open questions (carry over from design doc)

1. **AI generation non-determinism** — first capture run may not produce a visually compelling Kino site. Mitigation: regenerate until satisfied; lock the chosen `siteId` for all subsequent captures.
2. **Subdomain hosting domain mismatch** — codebase publishes to `*.weavo.site` per old memory; user confirmed marketing domain is `weavostudio.com`. Beats 4-5 show `kino.weavostudio.com` as marketing fiction (URL is shown statically, never loaded). Flag for user if they want this resolved before producing the video.
3. **Browser frame fidelity** — hand-built Chrome-frame React component may look "off." Mitigation in Phase 2: try Remotion community packages first; fall back to a cropped real Chrome screenshot as the chrome (replacing only the inner viewport) if the React version reads as fake.
4. **Music licensing** — user must provide a licensed track or paid Artlist subscription before Phase 8. Free fallback: search Pixabay or YouTube Audio Library for "ambient pad" loops.

## What approval looks like

User reviews this plan and gives one of:
- "Approve all 9 phases, start Phase 1" → I begin Phase 1
- "Change phase X, then start" → I revise then begin
- "Pause" → no further work, plan stays as documented for later

After Phase 1 ships, future phases proceed without re-approval unless the design itself changes.
