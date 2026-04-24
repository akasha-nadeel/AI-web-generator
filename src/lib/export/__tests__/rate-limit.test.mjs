// Rate-limit helper tests. The helper takes a Supabase client and returns
// { allowed, remaining, count, since }. We stub just enough of the client
// chain to avoid mocking @supabase/supabase-js directly.
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { checkExportRateLimit, EXPORT_RATE_LIMIT_PER_HOUR } = await import('../rate-limit.ts');

/** Build a fake supabase chain that records what it was asked and returns
 *  `{ count, error }` on the terminal `.gte`. The chain shape matches what
 *  the helper calls: from().select().eq().gte() → Promise<{count, error}>. */
function fakeSupabase({ count, error, captured }) {
  const chain = {
    _table: null,
    from(table) { this._table = table; captured.table = table; return this; },
    select(_col, opts) { captured.select = { opts }; return this; },
    eq(col, val) { captured.eq = { col, val }; return this; },
    gte(col, val) {
      captured.gte = { col, val };
      return Promise.resolve({ count, error });
    },
  };
  return chain;
}

test('under the limit → allowed, remaining counts down', async () => {
  const captured = {};
  const supabase = fakeSupabase({ count: 5, error: null, captured });
  const r = await checkExportRateLimit(supabase, 'u1');
  assert.equal(r.allowed, true);
  assert.equal(r.count, 5);
  assert.equal(r.remaining, EXPORT_RATE_LIMIT_PER_HOUR - 5);
  assert.equal(captured.table, 'exports_log');
  assert.equal(captured.eq.col, 'user_id');
  assert.equal(captured.eq.val, 'u1');
  assert.equal(captured.gte.col, 'created_at');
  assert.ok(
    Date.now() - new Date(captured.gte.val).getTime() <= 60 * 60 * 1000 + 2000,
    'window filter stays within the last hour'
  );
});

test('at the limit → blocked, remaining=0', async () => {
  const captured = {};
  const supabase = fakeSupabase({ count: EXPORT_RATE_LIMIT_PER_HOUR, error: null, captured });
  const r = await checkExportRateLimit(supabase, 'u1');
  assert.equal(r.allowed, false);
  assert.equal(r.remaining, 0);
});

test('above the limit → blocked, remaining clamps to 0', async () => {
  const captured = {};
  const supabase = fakeSupabase({ count: EXPORT_RATE_LIMIT_PER_HOUR + 4, error: null, captured });
  const r = await checkExportRateLimit(supabase, 'u1');
  assert.equal(r.allowed, false);
  assert.equal(r.remaining, 0);
});

test('count error → fail-open: allowed, logged warning', async () => {
  const captured = {};
  const supabase = fakeSupabase({ count: null, error: { message: 'table missing' }, captured });
  const originalWarn = console.warn;
  let warned = '';
  console.warn = (...args) => { warned = args.join(' '); };
  try {
    const r = await checkExportRateLimit(supabase, 'u1');
    assert.equal(r.allowed, true);
    assert.equal(r.remaining, EXPORT_RATE_LIMIT_PER_HOUR);
    assert.match(warned, /rate-limit count failed/);
    assert.match(warned, /table missing/);
  } finally {
    console.warn = originalWarn;
  }
});

test('custom limit + windowMs honored', async () => {
  const captured = {};
  const supabase = fakeSupabase({ count: 3, error: null, captured });
  const fixedNow = new Date('2026-04-24T12:00:00.000Z');
  const r = await checkExportRateLimit(supabase, 'u1', {
    limit: 5,
    windowMs: 10 * 60 * 1000, // 10 minutes
    now: () => fixedNow,
  });
  assert.equal(r.allowed, true);
  assert.equal(r.remaining, 2);
  assert.equal(captured.gte.val, '2026-04-24T11:50:00.000Z');
});
