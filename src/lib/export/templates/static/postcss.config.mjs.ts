// Tailwind v3 + autoprefixer wired through PostCSS. Without this file,
// the @tailwind directives in globals.css never expand and the exported
// page renders unstyled.

export function postcssConfigMjs(): string {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
}
