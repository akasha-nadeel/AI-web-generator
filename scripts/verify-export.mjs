#!/usr/bin/env node
// Phase 9 automated smoke test: take a fixture, translate + (optional mode C) +
// ZIP, extract into a temp dir, run `npm install` + `npm run build`. Catches
// translator emitted-invalid-TSX issues that the per-file parse check
// doesn't (missing deps, type errors, runtime crashes during prerender).
//
// Run:  node --experimental-strip-types --no-warnings scripts/verify-export.mjs [fixtureName] [--bundle]
// Default fixture: restaurant (matches the manual check from Phase 3).
// Multi-page SPA fixtures: spa-notflix, spa-dashboard — pass one to verify
// the routes branch actually produces a next-build-clean project.
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import JSZip from 'jszip';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const FIXTURES = join(ROOT, 'src', 'lib', 'export', '__fixtures__');

const { translateHtmlToNextjs } = await import(
  pathToFileURL(join(ROOT, 'src', 'lib', 'export', 'translate.ts')).href
);
const { buildZip } = await import(
  pathToFileURL(join(ROOT, 'src', 'lib', 'export', 'zip.ts')).href
);
const { convertImagesModeC } = await import(
  pathToFileURL(join(ROOT, 'src', 'lib', 'export', 'images.ts')).href
);

const args = process.argv.slice(2);
const bundleImages = args.includes('--bundle');
const requested = args.find((a) => !a.startsWith('--'));

const available = readdirSync(FIXTURES)
  .filter((n) => n.endsWith('.html'))
  .map((n) => n.replace(/\.html$/, ''));

if (requested && !available.includes(requested)) {
  console.error(`Unknown fixture "${requested}". Available: ${available.join(', ')}`);
  process.exit(2);
}

const fixture = requested || 'restaurant';
const html = readFileSync(join(FIXTURES, `${fixture}.html`), 'utf8');

console.log(`\n[verify-export] translating fixture: ${fixture} (mode ${bundleImages ? 'C — bundle images' : 'B — remote images'})`);
const start = Date.now();
let files = translateHtmlToNextjs(html, { siteName: `${fixture} demo` });
if (bundleImages) {
  // Stub fetch so we don't actually hit Unsplash. Produces tiny fake JPEGs
  // so next/image's build-time metadata inspection doesn't care. We just
  // need the rewrite path + public/images/ files to be present.
  const tinyJpeg = Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
    0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xff, 0xd9,
  ]);
  files = await convertImagesModeC(files, {
    fetch: async () => ({
      ok: true,
      status: 200,
      arrayBuffer: async () => tinyJpeg.buffer.slice(
        tinyJpeg.byteOffset,
        tinyJpeg.byteOffset + tinyJpeg.byteLength
      ),
    }),
  });
}
const buf = await buildZip(files);
console.log(`[verify-export] translate + zip: ${((Date.now() - start) / 1000).toFixed(2)}s, ${(buf.length / 1024).toFixed(1)}KB`);

const scratch = join(tmpdir(), `weavo-verify-${fixture}-${Date.now()}`);
mkdirSync(scratch, { recursive: true });
console.log(`[verify-export] scratch dir: ${scratch}`);

const zip = await JSZip.loadAsync(buf);
await Promise.all(
  Object.entries(zip.files).map(async ([path, file]) => {
    if (file.dir) return;
    const out = join(scratch, path);
    mkdirSync(dirname(out), { recursive: true });
    const content = await file.async('nodebuffer');
    writeFileSync(out, content);
  })
);

function run(cmd, subargs) {
  console.log(`[verify-export] $ ${cmd} ${subargs.join(' ')}`);
  const r = spawnSync(cmd, subargs, {
    cwd: scratch,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (r.status !== 0) {
    console.error(`[verify-export] FAIL: ${cmd} exited ${r.status}`);
    process.exit(r.status ?? 1);
  }
}

const skipInstall = process.env.SKIP_INSTALL === '1';
const skipBuild = process.env.SKIP_BUILD === '1';

if (!skipInstall) run('npm', ['install', '--silent', '--no-audit', '--no-fund']);
if (!skipBuild) run('npm', ['run', 'build']);

console.log(`\n[verify-export] OK — ${fixture} exported project builds cleanly.`);
console.log(`[verify-export] scratch left at: ${scratch}`);
console.log(`[verify-export] to clean up later:  rm -rf "${scratch}"`);

process.exit(0);
