// Validity checks for the static template emitters: each must produce
// well-formed contents that the standard tooling (Node JSON parser, TSC,
// next dev) won't choke on.
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { packageJson } = await import('../templates/static/package.json.ts');
const { tsconfigJson } = await import('../templates/static/tsconfig.json.ts');
const { tailwindConfigTs } = await import('../templates/static/tailwind.config.ts.ts');
const { nextConfigTs } = await import('../templates/static/next.config.ts.ts');
const { globalsCss } = await import('../templates/static/globals.css.ts');
const { readmeMd } = await import('../templates/static/readme.md.ts');
const { gitignore } = await import('../templates/static/gitignore.ts');
const { postcssConfigMjs } = await import('../templates/static/postcss.config.mjs.ts');

test('package.json parses as JSON and slug-ifies the site name', () => {
  const out = packageJson({ siteName: 'My Awesome Site!', hasLucide: true });
  const parsed = JSON.parse(out);
  assert.equal(parsed.name, 'my-awesome-site');
  assert.equal(parsed.private, true);
  assert.ok(parsed.dependencies.next, 'next pinned');
  assert.ok(parsed.dependencies.react, 'react pinned');
  assert.ok(parsed.dependencies['lucide-react'], 'lucide included when requested');
  assert.ok(parsed.devDependencies.tailwindcss, 'tailwind devDep present');
});

test('package.json omits lucide-react when not used', () => {
  const out = packageJson({ siteName: 'site', hasLucide: false });
  const parsed = JSON.parse(out);
  assert.equal(parsed.dependencies['lucide-react'], undefined);
});

test('tsconfig.json parses as JSON and points @/* at the project root', () => {
  const parsed = JSON.parse(tsconfigJson());
  assert.equal(parsed.compilerOptions.strict, true);
  assert.deepEqual(parsed.compilerOptions.paths['@/*'], ['./*']);
  assert.equal(parsed.compilerOptions.jsx, 'react-jsx');
});

test('tailwind.config.ts contains the typed export shape with content globs', () => {
  const out = tailwindConfigTs();
  assert.match(out, /import type \{ Config \} from "tailwindcss"/);
  assert.match(out, /content:\s*\[/);
  assert.match(out, /export default config/);
});

test('next.config.ts whitelists Unsplash hostnames', () => {
  const out = nextConfigTs();
  assert.match(out, /images\.unsplash\.com/);
  assert.match(out, /plus\.unsplash\.com/);
  assert.match(out, /export default config/);
});

test('globals.css always includes the Tailwind v3 layer directives', () => {
  const out = globalsCss({ fontLinks: [], customCss: [] });
  assert.match(out, /@tailwind base;/);
  assert.match(out, /@tailwind components;/);
  assert.match(out, /@tailwind utilities;/);
});

test('globals.css splices in font links and custom CSS when present', () => {
  const out = globalsCss({
    fontLinks: ['https://fonts.googleapis.com/css2?family=Inter'],
    customCss: ['.foo { color: red }'],
  });
  assert.match(out, /Inter/);
  assert.match(out, /\.foo \{ color: red \}/);
});

test('globals.css emits fonts as @import url(...) so they actually load', () => {
  // Regression: fonts used to be written as a comment only, so exported sites
  // fell back to the browser default — rendering heavier and shifting line
  // heights. Must be real @import rules, AND must come before the Tailwind
  // layer directives (CSS requires all @import at the top of the file).
  const href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
  const out = globalsCss({ fontLinks: [href], customCss: [] });
  assert.match(out, new RegExp(`@import url\\("${href.replace(/[.?*+^$()|[\\\]{}]/g, '\\$&')}"\\);`));
  const fontIdx = out.indexOf('@import url(');
  const tailwindIdx = out.indexOf('@tailwind base');
  assert.ok(fontIdx >= 0 && tailwindIdx >= 0 && fontIdx < tailwindIdx,
    'font @import must precede @tailwind directives');
});

test('README.md mentions the install + dev commands', () => {
  const out = readmeMd({ siteName: 'Acme' });
  assert.match(out, /^# Acme/m);
  assert.match(out, /npm install/);
  assert.match(out, /npm run dev/);
});

test('.gitignore covers node_modules and the .next build output', () => {
  const out = gitignore();
  assert.match(out, /\/node_modules/);
  assert.match(out, /\/\.next\//);
});

test('postcss.config.mjs wires Tailwind + autoprefixer', () => {
  const out = postcssConfigMjs();
  assert.match(out, /tailwindcss:\s*\{\}/);
  assert.match(out, /autoprefixer:\s*\{\}/);
  assert.match(out, /export default/);
});

test('package.json pins Tailwind v3 to match the preview CDN', () => {
  // The generated HTML is authored against the Tailwind v3 Play CDN; v4 has
  // different default line-heights/spacing that cause visible drift between
  // preview and exported site. Keep these in sync.
  const out = packageJson({ siteName: 'site', hasLucide: false });
  const parsed = JSON.parse(out);
  assert.match(parsed.devDependencies.tailwindcss, /^\^3\./);
  assert.ok(parsed.devDependencies.postcss, 'postcss present');
  assert.ok(parsed.devDependencies.autoprefixer, 'autoprefixer present');
  assert.equal(parsed.devDependencies['@tailwindcss/postcss'], undefined,
    'v4 PostCSS plugin should no longer be declared');
});
