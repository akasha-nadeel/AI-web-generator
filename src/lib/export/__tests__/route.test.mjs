// Eligibility + filename tests for the /api/export/nextjs route.
// The route handler itself is thin IO glue (Clerk auth + Supabase fetch +
// translator + zip + stream). All non-IO decision branches listed in the
// Phase 4 acceptance criteria are implemented in the pure helper below,
// which is what we exercise here.
import { test } from 'node:test';
import assert from 'node:assert/strict';

const {
  checkExportEligibility,
  buildExportFilename,
  EXPORT_AVAILABILITY_DATE,
} = await import('../response.ts');

const proUser = { id: 'u1', plan: 'pro' };
const freeUser = { id: 'u1', plan: 'free' };
const businessUser = { id: 'u1', plan: 'business' };

function siteOwnedByU1(overrides = {}) {
  return {
    id: 's1',
    user_id: 'u1',
    name: 'Test Site',
    site_json: { html: '<!doctype html><html><body></body></html>' },
    created_at: '2026-04-23T10:00:00Z',
    ...overrides,
  };
}

test('unknown user → 404', () => {
  const d = checkExportEligibility(null, siteOwnedByU1());
  assert.equal(d.ok, false);
  assert.equal(d.status, 404);
});

test('free user → 403 with PRO_REQUIRED code', () => {
  const d = checkExportEligibility(freeUser, siteOwnedByU1());
  assert.equal(d.ok, false);
  assert.equal(d.status, 403);
  assert.equal(d.code, 'PRO_REQUIRED');
});

test('pro user, missing project → 404', () => {
  const d = checkExportEligibility(proUser, null);
  assert.equal(d.ok, false);
  assert.equal(d.status, 404);
});

test('pro user, project owned by someone else → 403', () => {
  const d = checkExportEligibility(proUser, siteOwnedByU1({ user_id: 'u2' }));
  assert.equal(d.ok, false);
  assert.equal(d.status, 403);
});

test('pro user, owned but site_json.html missing → 400', () => {
  const d = checkExportEligibility(proUser, siteOwnedByU1({ site_json: null }));
  assert.equal(d.ok, false);
  assert.equal(d.status, 400);
});

test('pro user, owned site generated before 2026-04-22 → 400 with SITE_TOO_OLD', () => {
  const d = checkExportEligibility(
    proUser,
    siteOwnedByU1({ created_at: '2026-04-21T23:59:59Z' })
  );
  assert.equal(d.ok, false);
  assert.equal(d.status, 400);
  assert.equal(d.code, 'SITE_TOO_OLD');
  assert.match(d.error ?? '', /regenerate/i);
});

test('pro user, owned site generated at or after 2026-04-22 → 200', () => {
  const d = checkExportEligibility(proUser, siteOwnedByU1());
  assert.equal(d.ok, true);
  assert.equal(d.status, 200);
});

test('business-plan user is eligible same as pro', () => {
  const d = checkExportEligibility(businessUser, siteOwnedByU1());
  assert.equal(d.ok, true);
});

test('EXPORT_AVAILABILITY_DATE pins to the 2026-04-22 cutoff', () => {
  assert.equal(EXPORT_AVAILABILITY_DATE.toISOString(), '2026-04-22T00:00:00.000Z');
});

test('buildExportFilename slugifies the site name and stamps the date', () => {
  const f = buildExportFilename('My Awesome Portfolio!', new Date('2026-05-10T00:00:00Z'));
  assert.equal(f, 'weavo-my-awesome-portfolio-2026-05-10.zip');
});

test('buildExportFilename falls back to "site" when the name has no usable chars', () => {
  const f = buildExportFilename('!!!', new Date('2026-05-10T00:00:00Z'));
  assert.equal(f, 'weavo-site-2026-05-10.zip');
});

test('buildExportFilename caps slug length at 40 chars', () => {
  const longName = 'a'.repeat(80);
  const f = buildExportFilename(longName, new Date('2026-05-10T00:00:00Z'));
  const slug = f.replace(/^weavo-|-2026-05-10\.zip$/g, '');
  assert.equal(slug.length, 40);
});
