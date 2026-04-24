// Mode C image-bundling tests. Covers the Phase 7 acceptance criteria:
//   - happy path: Unsplash URLs fetched, stored as Buffers, src rewrites
//   - fetch failure: that URL stays remote; others still bundle
//   - abort/timeout: falls back to remote
//   - >50 unique URLs: first 50 bundle, rest stay remote, no error
//   - non-Unsplash URLs are ignored
//
// Fetch is passed in through the options arg so the mocks don't touch global
// state and can't leak between tests.
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { convertImagesModeC } = await import('../images.ts');

const COMPONENT = (urls) => urls
  .map((u, i) => `<Image src="${u}" alt="a${i}" width={100} height={100} />`)
  .join('\n');

function okResponse(bytes) {
  return {
    ok: true,
    status: 200,
    arrayBuffer: async () => new Uint8Array(bytes).buffer,
  };
}

test('mode C: fetches Unsplash URLs and rewrites src to local path', async () => {
  const url = 'https://images.unsplash.com/photo-aaaaaaaa?w=1200';
  const files = {
    'components/Hero.tsx': COMPONENT([url]),
    'app/page.tsx': `import Hero from "@/components/Hero";\n`,
  };
  let calls = 0;
  const out = await convertImagesModeC(files, {
    fetch: async () => { calls++; return okResponse([1, 2, 3, 4]); },
  });
  assert.equal(calls, 1);
  const publicEntries = Object.keys(out).filter((p) => p.startsWith('public/images/'));
  assert.equal(publicEntries.length, 1, 'exactly one bundled image');
  assert.ok(publicEntries[0].endsWith('.jpg'), 'default ext is .jpg');
  assert.ok(Buffer.isBuffer(out[publicEntries[0]]), 'bundled entry is a Buffer');

  const hero = out['components/Hero.tsx'];
  assert.ok(!hero.includes('images.unsplash.com'), 'remote URL rewritten out');
  assert.match(hero, /src="\/images\/[0-9a-f]{12}\.jpg"/);
});

test('mode C: dedupes URLs across components (one fetch per unique URL)', async () => {
  const url = 'https://images.unsplash.com/photo-bbbbbbbb?w=800';
  const files = {
    'components/A.tsx': COMPONENT([url]),
    'components/B.tsx': COMPONENT([url, url]),
  };
  let calls = 0;
  await convertImagesModeC(files, {
    fetch: async () => { calls++; return okResponse([5, 6]); },
  });
  assert.equal(calls, 1, 'deduped: one fetch for three references');
});

test('mode C: failed fetch → URL stays remote, others still bundle', async () => {
  const good = 'https://images.unsplash.com/photo-good?w=800';
  const bad = 'https://images.unsplash.com/photo-bad?w=800';
  const files = {
    'components/Gallery.tsx': COMPONENT([good, bad]),
  };
  const out = await convertImagesModeC(files, {
    fetch: async (url) => {
      if (String(url).includes('photo-bad')) {
        return { ok: false, status: 500, arrayBuffer: async () => new ArrayBuffer(0) };
      }
      return okResponse([9]);
    },
  });
  const publicEntries = Object.keys(out).filter((p) => p.startsWith('public/images/'));
  assert.equal(publicEntries.length, 1, 'only the good one bundled');

  const gallery = out['components/Gallery.tsx'];
  assert.ok(!gallery.includes('photo-good'), 'good URL rewritten');
  assert.ok(gallery.includes('photo-bad'), 'failed URL left remote');
});

test('mode C: timeout → URL falls back to remote', async () => {
  const url = 'https://images.unsplash.com/photo-slow?w=800';
  const files = { 'components/Slow.tsx': COMPONENT([url]) };

  const slowFetch = (u, init) =>
    new Promise((_resolve, reject) => {
      // Reject immediately if the AbortController fires. Nothing else
      // resolves, so the only exit path is the timeout abort.
      init?.signal?.addEventListener('abort', () => reject(new Error('aborted')));
    });

  const out = await convertImagesModeC(files, { fetch: slowFetch, timeoutMs: 20 });
  const publicEntries = Object.keys(out).filter((p) => p.startsWith('public/images/'));
  assert.equal(publicEntries.length, 0, 'nothing bundled on timeout');
  assert.ok(out['components/Slow.tsx'].includes(url), 'src left as remote URL');
});

test('mode C: >max unique URLs → first N bundle, rest stay remote', async () => {
  const urls = Array.from({ length: 7 }, (_, i) => `https://images.unsplash.com/photo-${i}?w=100`);
  const files = { 'components/Many.tsx': COMPONENT(urls) };

  let calls = 0;
  const out = await convertImagesModeC(files, {
    fetch: async () => { calls++; return okResponse([0]); },
    maxImages: 3,
  });
  assert.equal(calls, 3, 'only the first 3 get fetched');
  const publicEntries = Object.keys(out).filter((p) => p.startsWith('public/images/'));
  assert.equal(publicEntries.length, 3);

  const body = out['components/Many.tsx'];
  // URLs 0..2 rewritten; URLs 3..6 still remote.
  for (let i = 0; i < 3; i++) {
    assert.ok(!body.includes(`photo-${i}?`), `photo-${i} should be rewritten`);
  }
  for (let i = 3; i < 7; i++) {
    assert.ok(body.includes(`photo-${i}?`), `photo-${i} should stay remote`);
  }
});

test('mode C: non-Unsplash URLs are ignored', async () => {
  const files = {
    'components/Other.tsx': COMPONENT([
      'https://cdn.example.com/a.jpg',
      'https://images.unsplash.com/photo-ok?w=400',
    ]),
  };
  let calls = 0;
  const out = await convertImagesModeC(files, {
    fetch: async () => { calls++; return okResponse([0]); },
  });
  assert.equal(calls, 1, 'non-Unsplash URL not fetched');
  const body = out['components/Other.tsx'];
  assert.ok(body.includes('cdn.example.com/a.jpg'), 'non-Unsplash src left alone');
  assert.ok(!body.includes('photo-ok'), 'Unsplash src rewritten');
});

test('mode C: preserves extension from URL path when present', async () => {
  const files = {
    'components/Png.tsx': `<Image src="https://images.unsplash.com/foo/bar.png?w=100" alt="a" width={100} height={100} />`,
  };
  const out = await convertImagesModeC(files, {
    fetch: async () => okResponse([0]),
  });
  const publicEntries = Object.keys(out).filter((p) => p.startsWith('public/images/'));
  assert.equal(publicEntries.length, 1);
  assert.ok(publicEntries[0].endsWith('.png'), 'extension honored');
});
