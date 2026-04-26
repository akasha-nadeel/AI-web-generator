# Weavo demo video (Remotion sub-package)

Programmatic 72-second landing-page demo video for Weavo. Built with [Remotion](https://remotion.dev).

See `docs/plans/2026-04-26-weavo-demo-video-design.md` (design) and `docs/plans/2026-04-26-weavo-demo-video-implementation.md` (plan) at the repo root.

## Spec

- 72 seconds, 60fps, 2560×1440 (1440p, 16:9)
- White background, silent + captions, ambient pad music
- 7 beats: cold open → prompt → build → refine → publish → payoff → CTA close

## Scripts

```bash
cd remotion
npm install
npm run preview        # Open Remotion Studio at http://localhost:3002
npm run render         # Render MP4 to out/weavo-demo.mp4 (~10-15 min)
npm run render:webm    # Render WebM/VP9 fallback for landing page
```

## Layout

```
remotion/
├── package.json
├── tsconfig.json
├── remotion.config.ts
└── src/
    ├── index.ts            # entry point — registerRoot
    ├── Root.tsx            # <Composition> registration + spec constants
    ├── MainComposition.tsx # top-level scene assembling all 7 beats
    ├── beats/              # one component per beat (added in later phases)
    ├── components/         # UI mocks: dashboard, editor, modal, code editor
    ├── primitives/         # browser frame, cursor, caption, typewriter
    ├── lib/                # timing / easing / colors constants
    └── data/               # static data: HTML snippet for code stream, etc.
```

## Output

Final renders go to `out/` (gitignored). Copy the final MP4 + WebM to `public/videos/` in the main repo when shipping.
