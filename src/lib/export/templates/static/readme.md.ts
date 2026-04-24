// README.md for the exported project. Kept short on purpose — the user
// has just downloaded it and wants to run, not read.

interface Options {
  siteName: string;
}

export function readmeMd({ siteName }: Options): string {
  return `# ${siteName}

Single-page Next.js 16 project exported from [Weavo](https://weavo.site).

## Run locally

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000.

## Project layout

- \`app/\` — Next.js App Router (\`page.tsx\`, \`layout.tsx\`, \`globals.css\`)
- \`components/\` — one file per page section, plus \`ClientRuntime.tsx\`
- \`lib/\` — the four runtime hooks (scroll reveal, smooth scroll, mobile nav, accordion)

## Deploy

This is a vanilla Next.js project. Push to a Git repo and import it on
[Vercel](https://vercel.com/new) — no extra configuration needed.

## Customizing

- Tailwind v4 reads tokens from \`@theme\` blocks in \`app/globals.css\`
- Edit any section freely in \`components/\`
- Image domains are whitelisted in \`next.config.ts\` (Unsplash CDN by default)
`;
}
