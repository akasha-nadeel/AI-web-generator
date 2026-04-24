// Tailwind v4 defaults to CSS-first configuration via @theme blocks in
// globals.css, so this file is mostly a marker for editors and tooling that
// look for it. Customize freely.

export function tailwindConfigTs(): string {
  return `import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
};

export default config;
`;
}
