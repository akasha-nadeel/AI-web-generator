# Next.js Export — Implementation Plan

**Companion to:** `docs/plans/2026-04-22-nextjs-export-design.md`
**Date:** 2026-04-22
**Status:** Awaiting approval to begin Phase 1

## Overview

9 phases, each independently completable and testable. Phases 1-4 are backend (translator + API). Phases 5-6 are frontend (UI + monetization). Phases 7-9 are polish, growth, and verification.

**Total estimated effort:** ~3-4 days of focused work for v1 launch.

## Conventions

- All paths relative to repo root
- New files marked `[NEW]`, modified files marked `[EDIT]`
- Each phase ends with a checkpoint commit
- Acceptance criteria = "what proves this phase is done"

## Phase 1 — Hooks Library + Snapshot Test Setup

**Goal:** Hand-write the 4 React hooks that will be copied verbatim into every export. Set up snapshot test infrastructure.

### Files

- `[NEW] src/lib/export/templates/hooks/useScrollReveal.ts` — IntersectionObserver, ~40 lines
- `[NEW] src/lib/export/templates/hooks/useSmoothScroll.ts` — anchor click handler, ~25 lines
- `[NEW] src/lib/export/templates/hooks/useMobileNav.ts` — toggle handler, ~20 lines
- `[NEW] src/lib/export/templates/hooks/useAccordion.ts` — accordion handler, ~25 lines
- `[NEW] src/lib/export/__fixtures__/restaurant.html` — sample generated HTML (copy from a real generation)
- `[NEW] src/lib/export/__fixtures__/saas.html` — sample
- `[NEW] src/lib/export/__fixtures__/portfolio.html` — sample
- `[NEW] src/lib/export/__fixtures__/agency.html` — sample
- `[NEW] src/lib/export/__fixtures__/ecommerce.html` — sample
- `[NEW] src/lib/export/__tests__/hooks.test.ts` — verify hook source files exist + parse as valid TS

### Acceptance criteria

- All 4 hook files are valid TypeScript that compile under strict mode
- Each hook is `'use client'`-prefixed and uses `useEffect` with cleanup
- 5 fixture HTML files saved (real generations, post-runtime conventions)
- `npm test` passes for the hook validity test
- Commit: "Add export hooks library and snapshot fixtures"

## Phase 2 — Translator Core (Mode B — Default)

**Goal:** HTML → file map. Image mode B only (Unsplash via remotePatterns). No image bundling yet.

### Files

- `[NEW] src/lib/export/parser.ts` — wraps `htmlparser2`, exports `parseDocument(html)` returning typed AST
- `[NEW] src/lib/export/sections.ts` — walks AST, splits at top-level `<header>/<section>/<footer>`, returns array of `{ id, name, html }`
- `[NEW] src/lib/export/jsx.ts` — converts HTML string → JSX string (class→className, for→htmlFor, void self-close, style→object, strip event handlers, wrap in component)
- `[NEW] src/lib/export/images.ts` — exports `convertImagesMode B(jsx)` (regex swap `<img>` → `<Image>`, extract Unsplash dims from URL params)
- `[NEW] src/lib/export/icons.ts` — lookup table for ~20 lucide icons, exports `swapInlineSvgs(jsx)` returning `{ jsx, imports }`
- `[NEW] src/lib/export/runtime-detect.ts` — exports `detectHookNeeds(html)` returning `{ scrollReveal, smoothScroll, mobileNav, accordion }`
- `[NEW] src/lib/export/translate.ts` — orchestrates: `translateHtmlToNextjs(html, { bundleImages: false })` → returns `Record<string, string>` file map
- `[NEW] src/lib/export/__tests__/translate.test.ts` — runs translator on each fixture, snapshot-compares the file map

### Acceptance criteria

- Translator runs against all 5 fixtures without throwing
- Each fixture produces a file map with at minimum: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, plus one `.tsx` per top-level section
- Snapshot tests pass (first run creates snapshots)
- Output JSX is syntactically valid (verified by parsing through TypeScript compiler API in test)
- Commit: "Add HTML→Next.js translator (mode B, no image bundling)"

## Phase 3 — Static Templates + ZIP Builder

**Goal:** Emit `package.json`, configs, README, etc. Wrap everything in ZIP.

### Files

- `[NEW] src/lib/export/templates/static/package.json.ts` — exports a function returning `package.json` string with site name interpolated
- `[NEW] src/lib/export/templates/static/tsconfig.json.ts`
- `[NEW] src/lib/export/templates/static/tailwind.config.ts.ts`
- `[NEW] src/lib/export/templates/static/next.config.ts.ts` — includes Unsplash remotePatterns
- `[NEW] src/lib/export/templates/static/globals.css.ts` — Tailwind v4 `@import` + slot for extracted custom CSS
- `[NEW] src/lib/export/templates/static/readme.md.ts` — install instructions
- `[NEW] src/lib/export/templates/static/gitignore.ts`
- `[EDIT] src/lib/export/translate.ts` — wires static templates into the file map
- `[NEW] src/lib/export/zip.ts` — `buildZip(fileMap)` using `jszip`, returns `Buffer`
- `[EDIT] package.json` — add `jszip` dependency

### Acceptance criteria

- `jszip` installed
- All static templates emit valid contents (package.json parses as JSON, tsconfig parses, etc.)
- `buildZip(fileMap)` returns a Buffer
- Manual test: write the buffer to a `.zip` file on disk, unzip, run `npm install` → succeeds
- Commit: "Add static templates and ZIP builder for Next.js export"

## Phase 4 — API Route + Pro Gate

**Goal:** `POST /api/export/nextjs` endpoint, fully gated, streaming ZIP back.

### Files

- `[NEW] src/app/api/export/nextjs/route.ts` — handler with auth, ownership check, age check, translator call, ZIP stream
- `[NEW] supabase/migrations/YYYYMMDDHHMMSS_exports_log.sql` — `exports_log` table (`id`, `user_id`, `project_id`, `created_at`)
- `[EDIT] src/lib/supabase.ts` (or wherever client lives) — no change probably, but verify service-role client available for the route
- `[NEW] src/lib/export/__tests__/route.test.ts` — integration test: mock auth + db, hit route, assert response is application/zip

### Acceptance criteria

- Unauthenticated request → 401
- Free user → 403
- Pro user, project not owned → 403
- Pro user, owned project, pre-2026-04-22 → 400 with regenerate message
- Pro user, owned project, post-2026-04-22 → 200 with ZIP body
- `exports_log` row created on success
- Commit: "Add Pro-gated /api/export/nextjs endpoint"

## Phase 5 — UI: Buttons + Popover

**Goal:** Add export buttons to dashboard cards and preview screen. Pro popover with checkbox.

### Files

- `[NEW] src/components/export/ExportButton.tsx` — button component, accepts `projectId`, `userPlan`, `siteCreatedAt` props; renders correct state (Pro/Free/old-site disabled)
- `[NEW] src/components/export/ExportPopover.tsx` — popover content with bundleImages checkbox + Download button; calls `/api/export/nextjs`, handles loading + success toast
- `[EDIT] src/app/(auth)/dashboard/page.tsx` (or wherever cards render) — add `<ExportButton />` to each card
- `[EDIT] src/app/(auth)/preview/[id]/page.tsx` (or equivalent) — add `<ExportButton />` top-right

### Acceptance criteria

- Pro user sees "Export Next.js" on every project card and on preview screen
- Click → popover opens with checkbox + Download button
- Download triggers ZIP download in browser
- Loading spinner shows during 1-2s wait
- Success toast appears with filename
- Old sites show disabled state with tooltip
- Commit: "Add Next.js export buttons and Pro popover"

## Phase 6 — UI: Free-User Upgrade Modal

**Goal:** Free users clicking the export button see the upgrade modal.

### Files

- `[NEW] src/components/export/UpgradeModal.tsx` — modal with title, 3 bullet points, "See Pricing" + "Maybe later" buttons
- `[EDIT] src/components/export/ExportButton.tsx` — when `userPlan === 'free'`, click opens `<UpgradeModal />` instead of popover

### Acceptance criteria

- Free user clicks button → modal opens
- "See Pricing" navigates to `/settings/billing`
- "Maybe later" closes modal
- Modal is keyboard-accessible (Escape to close, focus trap)
- Commit: "Add free-user upgrade modal for Next.js export"

## Phase 7 — Mode C: Image Bundling

**Goal:** When checkbox checked, download Unsplash images and bundle in `/public/images/`.

### Files

- `[EDIT] src/lib/export/images.ts` — add `convertImagesModeC(jsx, fileMap)` that fetches each unique image URL (with 10s timeout), hashes filename, adds Buffer to fileMap, rewrites src
- `[EDIT] src/lib/export/translate.ts` — branch on `bundleImages` flag, call mode C path
- `[EDIT] src/lib/export/__tests__/translate.test.ts` — add fixtures for mode C; mock fetch in tests; verify file map contains image buffers
- `[EDIT] src/lib/export/zip.ts` — confirm Buffer-type entries handled correctly by jszip

### Acceptance criteria

- Translator with `bundleImages: true` produces file map with `public/images/{hash}.jpg` entries
- All `<Image src="https://images.unsplash.com/...">` rewritten to `<Image src="/images/{hash}.jpg">`
- Per-image timeout works (mock slow fetch in test)
- Image fetch failure → that image falls back to remote, others bundle, log warning
- > 50 images → first 50 bundle, rest remote, no error
- Commit: "Add image bundling mode for Next.js export"

## Phase 8 — Telemetry + Rate Limiting

**Goal:** Log every export. Soft-cap 30/user/hour.

### Files

- `[EDIT] src/app/api/export/nextjs/route.ts` — add `console.log` line after successful export with structured fields; add count check against `exports_log` before processing (return 429 if >30 in last hour)
- `[NEW] src/lib/export/rate-limit.ts` — `checkRateLimit(userId): Promise<{ allowed: boolean; remaining: number }>` wrapping the count query

### Acceptance criteria

- Successful export logs one line: `[Export] user=... project=... mode=... sections=... size=... time=...`
- 31st export within 1 hour returns 429 with friendly error
- Test: insert 30 exports_log rows for a user, attempt 31st → 429
- Commit: "Add telemetry and rate limiting to Next.js export"

## Phase 9 — Manual Verification + Launch

**Goal:** Real-world test before announcing.

### Tasks

1. Generate 3 fresh sites in different industries (restaurant, SaaS, portfolio)
2. Export each as Pro user with mode B (default)
3. Unzip each, run `npm install && npm run dev`, verify:
   - Site loads at `localhost:3000`
   - Visually matches the in-app preview
   - Scroll animations work
   - Mobile menu toggles correctly (resize browser)
   - Anchor links scroll smoothly
   - Accordions toggle (if site has them)
4. Re-export one with mode C (bundle images), verify offline behavior (disconnect WiFi, run dev server, images still load)
5. Free user: log in as free account, click export button → confirm modal appears
6. Old site: pick a pre-2026-04-22 site → confirm tooltip + disabled state
7. Edit `README.md` (project root) to mention Next.js export as a Pro feature
8. Commit: "v1: Next.js export ready for launch"

### Acceptance criteria

- All 3 manually exported sites build and run with zero errors
- Visual parity with in-app preview confirmed
- All 4 hooks behaviors work in the exported project
- Mode C produces working offline-capable build
- Free + old-site UI states verified

## Out of Scope (Tracked for v2)

- GitHub repo creation
- Multi-page routing (blog post collection sites, etc.)
- Custom Tailwind theme extraction
- Deploy-to-Vercel one-click button in README
- Sentry integration (use console logs in v1)

## Dependencies + Risks

- **`jszip`** — only new external dep. MIT licensed. ~50kb. Stable, widely used.
- **`htmlparser2`** — already in deps via runtime tooling.
- **Risk: AI generates HTML the translator can't handle.** Mitigation: snapshot fixtures + fail-soft transforms. Add new fixture every time we hit an unhandled case.
- **Risk: Pro user expects multi-page output and gets single-page.** Mitigation: README + popover label "Single-page Next.js export."
- **Risk: jszip Buffer handling differs in Vercel Edge runtime vs Node.** Mitigation: route runs Node runtime explicitly (`export const runtime = 'nodejs'`).

## Resume map

If implementation pauses mid-phase, the next session should:
1. Read this file
2. `git log --oneline | head -20` to see which phase commits exist
3. Resume at the next uncommitted phase
