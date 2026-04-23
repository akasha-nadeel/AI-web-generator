// Validity check for the four exported runtime hooks. Acceptance for Phase 1
// of the Next.js export plan: each hook file exists, opens with 'use client',
// uses useEffect, and registers a cleanup function. tsc --noEmit (run as part
// of `npm test`) covers strict-mode type validity for the same files.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const HOOKS_DIR = join(HERE, '..', 'templates', 'hooks');

const HOOKS = ['useScrollReveal', 'useSmoothScroll', 'useMobileNav', 'useAccordion'];

for (const hook of HOOKS) {
  test(`${hook} is a valid client hook`, () => {
    const src = readFileSync(join(HOOKS_DIR, `${hook}.ts`), 'utf8');
    const head = src.split('\n').find((l) => l.trim().length > 0) ?? '';
    assert.match(head, /^'use client';?$/, "first non-blank line must be 'use client'");
    assert.match(src, /import\s+\{[^}]*\buseEffect\b[^}]*\}\s+from\s+['"]react['"]/, 'must import useEffect from react');
    assert.match(src, new RegExp(`export function ${hook}\\b`), `must export function ${hook}`);
    assert.match(src, /useEffect\s*\(\s*\(\s*\)\s*=>/, 'must call useEffect');
    assert.match(src, /return\s*\(?\s*\)?\s*=>/, 'effect must return a cleanup function');
  });
}
