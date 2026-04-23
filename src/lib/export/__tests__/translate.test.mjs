// Snapshot + validity test for the HTML → Next.js translator. For each fixture:
//   1. run translateHtmlToNextjs and assert the file map matches a stored snapshot
//   2. parse every emitted .ts/.tsx file via the TypeScript compiler API and
//      fail on any syntactic error (semantic errors are out of scope here)
//
// First run creates snapshot files alongside this test under
// `__tests__/snapshots/`. To intentionally update them after a translator
// change, run `node --test --test-update-snapshots …`.
import { test, snapshot } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, '..', '__fixtures__');

snapshot.setResolveSnapshotPath((testFile) => {
  const base = testFile.replace(/\.test\.mjs$/, '');
  return `${base}.snapshot.cjs`;
});

const { translateHtmlToNextjs } = await import('../translate.ts');

const fixtures = readdirSync(FIXTURES_DIR).filter((n) => n.endsWith('.html'));
assert.ok(fixtures.length >= 5, `expected ≥5 fixtures, got ${fixtures.length}`);

for (const fixture of fixtures) {
  const name = fixture.replace(/\.html$/, '');
  const html = readFileSync(join(FIXTURES_DIR, fixture), 'utf8');

  test(`${name}: translator emits a stable file map`, async (t) => {
    const files = translateHtmlToNextjs(html);
    const summary = summarize(files);
    await t.assert.snapshot(summary);
  });

  test(`${name}: every emitted .ts/.tsx file parses cleanly`, () => {
    const files = translateHtmlToNextjs(html);
    const required = ['app/page.tsx', 'app/layout.tsx', 'app/globals.css'];
    for (const r of required) assert.ok(r in files, `missing required output: ${r}`);
    const sectionFiles = Object.keys(files).filter((p) => p.startsWith('components/') && p.endsWith('.tsx'));
    assert.ok(sectionFiles.length >= 1, `expected at least one section component, got ${sectionFiles.length}`);

    const errors = [];
    for (const [path, source] of Object.entries(files)) {
      if (!path.endsWith('.tsx') && !path.endsWith('.ts')) continue;
      const sf = ts.createSourceFile(path, source, ts.ScriptTarget.ESNext, false, ts.ScriptKind.TSX);
      // ts.createSourceFile attaches parse diagnostics to a private property.
      // Cast to any to read it without paying for the full TS Program API.
      const diag = sf.parseDiagnostics ?? [];
      if (diag.length > 0) {
        errors.push(`${path}:\n  ${diag.map((d) => d.messageText).join('\n  ')}`);
      }
    }
    assert.equal(errors.length, 0, errors.join('\n\n'));
  });
}

/** A compact, snapshot-friendly view of the file map: paths + sizes + a short
 *  content fingerprint per file. We deliberately don't snapshot full sources —
 *  that would explode in size and make every cosmetic change a noisy diff. */
function summarize(files) {
  const out = {};
  for (const path of Object.keys(files).sort()) {
    const src = files[path];
    out[path] = {
      bytes: src.length,
      lines: src.split('\n').length,
      head: src.slice(0, 80).replace(/\s+/g, ' '),
    };
  }
  return out;
}
