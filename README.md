# Weavo

AI website generator. Describe your business, pick a style, and Weavo writes a full site — beautiful HTML + Tailwind + subtle scroll/interactivity — in about a minute. Preview, chat-edit, and publish on a `*.weavo.site` subdomain.

Built on Next.js 16 (Turbopack), React 19, Tailwind v4, Clerk, Supabase, Paddle.

## Features

- **AI generation** — Claude (Haiku/Sonnet/Opus) writes mobile-first HTML from a mood + industry prompt. Optional reference-image analysis extracts a design brief before generation.
- **Design pattern library** — curated Supabase briefs injected at generation time based on industry + mood.
- **Chat edits** — iterate on the generated site with natural language; intent router splits CHAT questions from HTML rewrites.
- **Subdomain publishing** — one click to push to `yoursite.weavo.site` with bandwidth caps (10 GB free, 100 GB paid).
- **Credits + Paddle** — pack-based pricing, atomic deduction, webhook-driven plan upgrades.
- **HTML export** — single-file download for every user.
- **Next.js export (Pro)** — exports any site generated after 2026-04-22 as a runnable Next.js 16 project ZIP (TypeScript, Tailwind v3 to match the generator's CDN, lucide-react, `next/image`, Google Fonts via `@import`, 4 hand-written React hooks for scroll reveal / smooth scroll / mobile nav / accordion). Multi-page SPAs are split into real Next.js routes. Optional image bundling downloads Unsplash assets to `public/images/` for offline builds. Deterministic translator — zero per-export AI cost.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Environment variables (`.env.local`): Clerk keys, Supabase URL + service-role key, Paddle sandbox keys, at least one of `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `GEMINI_API_KEY`.

Supabase migrations live at `supabase/migrations/*.sql` — run them in order via the Supabase SQL editor. Migration `006_exports_log.sql` backs the Pro Next.js export's audit log + rate limit.

## Tests

```bash
npm test
```

Runs `tsc --noEmit` plus the Node test runner against the export module (snapshot + per-file parse checks on five industry fixtures, hook validity, static-template shape, API eligibility logic, image bundling, rate limit).

To smoke-test an exported project end-to-end (translate → ZIP → `npm install` → `next build` on a real fixture):

```bash
node --experimental-strip-types --no-warnings scripts/verify-export.mjs restaurant
# or for the image-bundling path (mode C) with a stubbed fetch:
node --experimental-strip-types --no-warnings scripts/verify-export.mjs agency --bundle
```

## Directory layout

- `src/app/` — Next.js routes. `(auth)/` is the signed-in area, `api/` is server routes.
- `src/lib/ai/` — prompts, classifier, design library, image validator, runtime injector.
- `src/lib/export/` — the Pro Next.js exporter: translator, mode-B/mode-C image handling, static templates, hooks library, rate limit.
- `src/components/` — UI. `export/` hosts the Pro export button + dialogs.
- `supabase/migrations/` — append-only schema.

## Deployment

Production runs on Vercel at https://ai-web-generator-dusky.vercel.app. Paddle sandbox webhook is verified; Clerk webhook URL registration is the one remaining wiring step.
