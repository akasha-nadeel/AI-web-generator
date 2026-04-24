// Tailwind v3 config. The `content` globs drive JIT class extraction, so
// they must cover every file that can reference utility classes.

export function tailwindConfigTs(): string {
  return `import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
};

export default config;
`;
}
