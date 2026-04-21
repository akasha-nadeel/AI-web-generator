# Next.js Export — Design Document

**Date:** 2026-04-22
**Status:** Design approved, awaiting implementation plan
**Owner:** Akasha Nadeel
**Type:** Pro-tier monetized feature

## Summary

Pro users can export any new generated site as a complete, runnable Next.js 16 project (ZIP download). Free users keep HTML-only export. The HTML generator stays untouched — translation is a separate, deterministic, AI-free step that runs on demand.

## Motivation

Current state: Weavo generates beautiful HTML sites. Users can preview, chat-edit, and publish on `*.weavo.site`. They can also download raw HTML.

Gap: power users want a real codebase to own, customize in their IDE, and deploy to Vercel themselves. HTML is great as output, but not as a *starting point* for serious customization.

The Next.js export turns Weavo into "jumpstart tool, not final host" for users who want to graduate from no-code to code-with-AI-assist. It also creates a clear monetization moment — Pro plan unlocks codebase ownership.

## Goals

- Pro users export any site (generated post-2026-04-22) as a runnable Next.js 16 project
- Zero AI cost per export (deterministic translator, not LLM)
- Generator code completely untouched (quality moat preserved)
- Failure-isolated: translator breaks → only export errors, generation/preview/publish all keep working
- Discoverable monetization: free users see the Pro badge in two places

## Non-goals (v1)

- Multi-page Next.js routing — single-page with component extraction only
- GitHub repo creation — ZIP download only
- Re-translation of pre-2026-04-22 sites — these need regeneration
- Custom hooks beyond the 4 needed (`useScrollReveal`, `useSmoothScroll`, `useMobileNav`, `useAccordion`)
- TypeScript-vs-JavaScript toggle — TypeScript only (matches Weavo's own stack)
- shadcn/ui, framer-motion, clsx, react-icons, state libraries
- Background job queue — synchronous API route only

## Key Decisions

| # | Decision | Why |
|---|---|---|
| Q1 | Goal = give Pro users a real codebase | "Own your code" is a monetization-aligned promise |
| Q2 | Free → HTML export. Pro → Next.js export | Existing free flow untouched. Pro adds value. |
| Q3 | Single-page Next.js with component extraction | Each `<section>` → one `.tsx` file. Realistic for a marketing site. |
| Q4 | Programmatic translator (TS function), not AI | Zero per-export AI cost. Generator quality moat preserved. |
| Q5 | Runtime = 4 React hooks | Idiomatic for "real codebase" promise. Not a minified script blob. |
| Q6 | Images: `<Image>` + `remotePatterns` (default), bundle-to-public (opt-in) | Next.js-idiomatic by default; offline-friendly available |
| Q7 | Delivery: ZIP download | Simple, no external deps, no OAuth flow |
| Q8 | Export button on dashboard cards AND preview screen | Maximum discoverability for monetization |
| Q9 | Block export for pre-2026-04-22 sites | No real users yet; old sites are tests |
| Q10 | Free-user click → upgrade modal | Highest-intent moment for upgrade pitch |

## Architecture

```
[ AI generates HTML ]  ──→  [ Stored in Supabase ]  ──→  [ Pro user clicks Export ]  ──→  [ Translator ]  ──→  [ ZIP download ]
       (UNCHANGED)              (UNCHANGED)                  (NEW button)             (NEW module)        (NEW route)
```

### What's new (3 things)

1. `src/lib/export/` — translator module (~500 lines: hooks templates + HTML→Next.js converter + ZIP builder)
2. `src/app/api/export/nextjs/route.ts` — POST endpoint, Pro-gated, streams ZIP
3. UI: 2 buttons (dashboard + preview) + 1 free-user upgrade modal + 1 Pro options popover

### What's NOT touched

- `src/app/api/ai/generate/route.ts` (generator)
- `src/app/api/ai/chat/route.ts` (chat edits)
- `src/lib/ai/runtime/weavo-runtime.ts` (runtime script)
- `src/lib/ai/runtime/post-process.ts` (HTML enhancer)
- System prompt, design library, image validator

### Failure isolation

Translator and generator share zero state. If the translator breaks, only the export button errors. Generation, preview, chat edits, publishing all keep working. Reversal cost: delete the route + button.

## Translator Algorithm

**Input:** raw HTML string (from Supabase, already enhanced with `data-reveal`, section IDs, etc.)
**Output:** in-memory file map `{ "app/page.tsx": "...", ... }` ready for ZIP.

### 8-step pipeline

1. **Parse `<head>`** — extract `<title>`, meta description, Google Fonts `<link>` tags, inline `<style>` blocks
2. **Walk `<body>`, split into sections** — using existing tag-stack walker. Each top-level `<header>`/`<section>`/`<footer>` becomes one component file. Filename from section's `id` attribute.
3. **Convert HTML → JSX per component** —
   - `class=` → `className=`
   - `for=` → `htmlFor=`
   - Self-close void tags
   - Inline `style="..."` → `style={{ }}`
   - Strip event handlers (hooks handle these)
   - Wrap in `export default function ComponentName() { return ( ... ); }`
4. **Replace `<img>` with `<Image>`** —
   - Default mode B: `<Image>` with width/height from URL params (default 1200x800), Unsplash whitelisted in `next.config.ts`
   - Opt-in mode C (checkbox): download images, save to `public/images/{hash}.jpg`, rewrite src
5. **Convert inline SVGs to lucide-react** (best-effort lookup table for Menu, X, ArrowRight, Check, ChevronDown, Star, Mail, Phone, etc.). Unmatched SVGs stay as raw inline.
6. **Detect runtime needs, wire hooks** —
   - `data-reveal` present → mount `useScrollReveal()` in `layout.tsx`
   - `a[href^="#"]` present → mount `useSmoothScroll()` in `layout.tsx`
   - `data-mobile-toggle` in `Nav.tsx` → mount `useMobileNav()` in `Nav.tsx`
   - `data-accordion-trigger` in any section → mount `useAccordion()` in that section
7. **Generate `app/page.tsx` and `app/layout.tsx`** —
   - `page.tsx` imports + renders all sections in original order
   - `layout.tsx` mounts always-on hooks, defines metadata from `<title>`/meta description, wires Google Fonts via `next/font/google`
8. **Emit static templates** — `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `globals.css`, `README.md`, `.gitignore`

**Total: ~150 lines orchestration + ~350 lines static templates and hooks = ~500 lines. Runs in <2s for typical sites.**

## Hooks Library

Four files in `lib/`. Pre-written once in our codebase. Copied verbatim into every export.

### `lib/useScrollReveal.ts` (~40 lines)

- Finds `[data-reveal]` and `[data-reveal-stagger]` elements on mount
- Skips elements already in viewport (no flash)
- Initial state: `opacity: 0; translateY(28px)` with `cubic-bezier(.22, 1, .36, 1)` transition
- IntersectionObserver: `rootMargin: '0px 0px -60px 0px'`
- Stagger children at 70ms intervals
- Mounted in `layout.tsx`

### `lib/useSmoothScroll.ts` (~25 lines)

- One delegated `click` listener on `document`
- For `a[href^="#"]`: prevents default, computes header offset, scrolls smoothly with 8px breathing room
- Auto-closes any open `[data-mobile-menu]` after navigation
- Mounted in `layout.tsx`

### `lib/useMobileNav.ts` (~20 lines)

- Toggles `hidden` class on `[data-mobile-menu]` when `[data-mobile-toggle]` clicked
- Mounted in `Nav.tsx` only

### `lib/useAccordion.ts` (~25 lines)

- Delegated click listener on `document`
- Toggles `hidden` on `[data-accordion-content]`
- Rotates `[data-accordion-icon]` 180° when open
- Mounted in sections that contain accordions

**Common shape:**
```ts
'use client';
import { useEffect } from 'react';

export function useXxx() {
  useEffect(() => {
    // setup
    return () => { /* cleanup */ };
  }, []);
}
```

**Total: ~110 lines across 4 files.**

## Exported Project Structure

```
my-site/
├── app/
│   ├── layout.tsx          # next/font + metadata + always-on hooks
│   ├── page.tsx            # imports + renders all sections
│   ├── globals.css         # Tailwind v4 imports + extracted custom CSS
│   └── favicon.ico
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── About.tsx
│   ├── Pricing.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   ├── useScrollReveal.ts
│   ├── useSmoothScroll.ts
│   ├── useMobileNav.ts
│   └── useAccordion.ts
├── public/
│   └── images/             # only if "Bundle images" checked
├── package.json            # next 16, react 19, tailwind v4, lucide-react, typescript
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts          # Unsplash in remotePatterns
└── README.md               # `npm install && npm run dev`
```

## UX Flow

### Button states

| User type | Site type | Button label | Click behavior |
|---|---|---|---|
| Free | Any | "Export Next.js 🔒" | Opens upgrade modal |
| Pro | New (post-2026-04-22) | "Export Next.js" | Opens export options popover |
| Pro | Old (pre-2026-04-22) | "Export Next.js" (disabled) | Tooltip: "Regenerate this site to enable Next.js export" |

### Pro export popover

```
┌─────────────────────────────────────┐
│  Export to Next.js                  │
│                                     │
│  ☐ Bundle images for offline use    │
│    (adds ~5MB to download size)     │
│                                     │
│         [ Download ZIP ]            │
└─────────────────────────────────────┘
```

### Loading state

Button text → "Building project... (~2s)" with spinner. Other UI stays interactive.

### Success state

Browser auto-downloads `weavo-{slug}-{date}.zip`. Toast slides in:

```
✓ Downloaded my-portfolio-2026-04-22.zip
  Unzip → npm install → npm run dev
```

Auto-dismisses after 6s.

### Free-user modal

```
┌──────────────────────────────────────────┐
│  Export to Next.js is a Pro feature     │
│                                          │
│  Get the full Weavo experience:          │
│  • Export sites as Next.js projects      │
│  • Own your code, deploy anywhere        │
│  • Customize freely in your own IDE      │
│                                          │
│  [ See Pricing ]    [ Maybe later ]      │
└──────────────────────────────────────────┘
```

"See Pricing" → `/settings/billing`. "Maybe later" → close.

### Error state

Toast: `✗ Export failed. Try again or contact support.`

## Server-Side Execution

### Route: `POST /api/export/nextjs`

**Request:**
```json
{
  "projectId": "uuid",
  "bundleImages": false
}
```

**Response:** binary `application/zip` stream with `Content-Disposition: attachment; filename="weavo-{slug}-{date}.zip"`

### Handler flow

1. **Auth gate** — `auth()` from Clerk → 401 if missing. Look up user → 403 if `plan !== 'pro'`.
2. **Project fetch + ownership** — query Supabase, verify `user_id` match, else 403.
3. **Pre-flight: site age check** — if `created_at < '2026-04-22'`, return 400 (UI also gates this).
4. **Run translator** — `translateHtmlToNextjs(html, { bundleImages })`. Mode C does parallel image fetches with 10s per-image timeout.
5. **Build ZIP in memory** — `jszip` (one new dep, ~50kb, MIT). Compress with DEFLATE.
6. **Stream response** — `new Response(buffer, { headers })`.

### Why synchronous, no queue

| Mode | Time | Acceptable to block? |
|---|---|---|
| B (default) | 1-2s | Yes |
| C (bundle images) | 5-15s | Yes |

No AI calls. No background job complexity needed.

### Abuse prevention

- Pro plan paywall = baseline anti-abuse
- Soft rate limit: max 30 exports/user/hour via `exports_log` table count check
- Image bundle cap: max 50 unique images per export (silent partial bundle for more)

### Telemetry

One log line per export:
```
[Export] user=abc123 project=xyz456 mode=B sections=7 size=87KB time=1.4s
```

## Edge Cases & Failure Handling

The principle: every step is **fail-soft**. The export should never produce a broken Next.js project — at worst, an aesthetically imperfect one.

| Edge case | Handling |
|---|---|
| Malformed HTML | Forgiving parser (`htmlparser2`). If throws: 500 with friendly message + Sentry log. |
| Section without `id` | Derive from heading text or fall back to `Section1`, `Section2`. |
| Duplicate ids | Append numeric suffix (`Features.tsx`, `Features2.tsx`). |
| Unknown SVG icon | Keep raw `<svg>` inline. Conservative — never breaks. |
| Inline `<style>` blocks | Extract → append to `globals.css`. |
| Custom Google Fonts | Translate to `next/font/google`. Fallback: keep raw `<link>`. |
| Tailwind dynamic classes | N/A in v1 — generated HTML is static. |
| Image fetch 404/timeout (mode C) | Skip, fall back to remote `<Image>` for that image only. Toast user. |
| >50 unique images (mode C) | First 50 bundle, rest use remote. Silent partial. |
| ZIP >50MB | 413 error: "Project too large. Disable image bundling." |
| Pro user downgrades mid-export | Auth checked at request start. Response completes. |
| Browser cancels download | No cleanup needed (no temp files). User can re-click. |
| Translator throws unexpectedly | Top-level try/catch → 500 + Sentry. UI shows generic toast. |
| Concurrent exports (same user) | No locks. Each independent. Worst case: 2 ZIPs. |

## Dependencies

**One new package:** `jszip` (MIT, ~50kb, zero transitive deps).

**Tailwind v4 already in stack** — no version mismatch concern.

**No queue lib, no S3, no temp files on disk.**

## Migration Plan for Existing Sites

**Pre-2026-04-22 sites: blocked from export.** Display "Regenerate this site to enable Next.js export" tooltip. Justified: no real users yet, all current sites are tests.

After v1 ships, all newly generated sites are exportable forever.

## Testing Strategy

**Snapshot fixtures:** keep 5-10 representative generated HTML files in `src/lib/export/__fixtures__/`. Each represents a different industry (restaurant, SaaS, portfolio, agency, ecommerce). Translator runs against each in CI; resulting file maps are snapshot-compared. Catches translator regressions before Pro users hit them.

**Smoke test exported projects:** for each fixture, after translation, run `npm install && npm run build` against the resulting project in a Docker scratch — confirm it builds with zero errors. Catches "translator emitted invalid TSX" issues.

**Manual verification before launch:** export 3 real sites I've generated this week, unzip, `npm run dev`, click around, confirm interactivity works.

## Open Questions

- Should Tailwind config extract custom theme colors from generated HTML's inline styles? (v1: no — keep `tailwind.config.ts` minimal, let users customize)
- Should `README.md` include deploy-to-Vercel one-click button? (v1: skip, link to Vercel docs in README)
- Telemetry: send to Sentry or just console.log? (v1: console.log; add Sentry if abuse becomes a problem)

## Out of Scope (Tracked for Later)

- Forms with Resend integration + email templates + abuse rate limiting (separate ticket)
- Matcher false-positive fix in `findBestPattern` (mood-only matches like "minimal" → portfolio for gym sites)
- Image validator category-aware fallback
- Pixora → Weavo rename (deferred until after Paddle prod integration)
- GitHub repo creation as v2 export option

## Implementation Order

When `writing-plans` skill creates the implementation plan, suggested phasing:

1. Hooks library (4 files) + snapshot tests
2. Translator core: parse, split sections, JSX conversion, image swap (mode B only)
3. Static template emission + ZIP builder
4. API route + Pro gate + ownership check
5. UI: dashboard button + preview button + Pro options popover
6. UI: free-user upgrade modal + tooltip for old sites
7. Mode C (image bundling) — added after mode B is stable
8. Telemetry + rate limiting
9. Manual verification with 3 real exports
