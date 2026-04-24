// Detection + planning + onclick-rewrite tests for the multi-page SPA path.
// Every assertion here is specifically guarding against a risk from the plan
// — false positives, aborted slugs, chrome ordering, dead nav links.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const { parse } = await import('../parser.ts');
const { detectSpaRoutes } = await import('../spa-routes.ts');

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, '..', '__fixtures__');

function plan(html) {
  return detectSpaRoutes(parse(html), html);
}

test('null when fewer than 2 page-section divs', () => {
  const html = `<html><body>
    <nav><button onclick="showPage('home')">Home</button></nav>
    <div id="homePage" class="page-section active"><h1>Home</h1></div>
  </body></html>`;
  assert.equal(plan(html), null);
});

test('null when no showPage() call references any detected section', () => {
  const html = `<html><body>
    <nav><button onclick="openCart()">Cart</button></nav>
    <div id="homePage" class="page-section active"><h1>Home</h1></div>
    <div id="shopPage" class="page-section"><h1>Shop</h1></div>
  </body></html>`;
  assert.equal(plan(html), null);
});

test('null when any page-section has no derivable slug', () => {
  const html = `<html><body>
    <nav><button onclick="showPage('home')">Home</button></nav>
    <div id="homePage" class="page-section active"><h1>Home</h1></div>
    <div class="page-section"><p>anonymous — no id and no heading</p></div>
  </body></html>`;
  assert.equal(plan(html), null);
});

test('null when two page-sections collide on the same slug', () => {
  const html = `<html><body>
    <nav><button onclick="showPage('home')">Home</button></nav>
    <div id="homePage" class="page-section active"><h1>Home</h1></div>
    <div id="home" class="page-section"><h1>Home again</h1></div>
  </body></html>`;
  assert.equal(plan(html), null);
});

test('existing non-SPA fixtures all return null (detects: false)', () => {
  const names = readdirSync(FIXTURES_DIR).filter((n) => n.endsWith('.html') && !n.startsWith('spa-'));
  assert.ok(names.length >= 5, `expected ≥5 non-spa fixtures, got ${names.length}`);
  for (const name of names) {
    const html = readFileSync(join(FIXTURES_DIR, name), 'utf8');
    assert.equal(plan(html), null, `${name} must not trigger SPA detection`);
  }
});

test('notflix: detects 3 routes, home by active class, nav + cart + footer as chrome', () => {
  const html = readFileSync(join(FIXTURES_DIR, 'spa-notflix.html'), 'utf8');
  const p = plan(html);
  assert.ok(p, 'detection must fire');
  const slugs = p.routes.map((r) => r.slug);
  assert.deepEqual(slugs, ['home', 'shop', 'gallery']);
  const home = p.routes.find((r) => r.isHome);
  assert.equal(home.slug, 'home');
  // Chrome: nav before, aside + footer after.
  assert.equal(p.chrome.length, 3);
  const chromeTags = p.chrome.map((c) => c.element.name);
  assert.deepEqual(chromeTags, ['nav', 'aside', 'footer']);
  assert.equal(p.chrome[0].position, 'before');
  assert.equal(p.chrome[1].position, 'after');
  assert.equal(p.chrome[2].position, 'after');
});

test('notflix: onclick="showPage(\'shop\')" rewritten to href="/shop", button→a, home→"/"', () => {
  const html = readFileSync(join(FIXTURES_DIR, 'spa-notflix.html'), 'utf8');
  const p = plan(html);
  const navHtml = p.chrome[0].html;
  // All three routing clicks survived as anchors with correct hrefs.
  assert.match(navHtml, /<a\s[^>]*href="\/"[^>]*>Home<\/a>/);
  assert.match(navHtml, /<a\s[^>]*href="\/shop"[^>]*>Shop<\/a>/);
  assert.match(navHtml, /<a\s[^>]*href="\/gallery"[^>]*>Gallery<\/a>/);
  // showPage onclicks are gone.
  assert.doesNotMatch(navHtml, /showPage\(/);
  assert.doesNotMatch(navHtml, /onclick="showPage/);
  // Unknown handlers (openCart) kept — will be stripped downstream by jsx.ts.
  assert.match(navHtml, /onclick="openCart/);
});

test('dashboard: heading-derived slugs + cart-between-sections hoisted to "after"', () => {
  const html = readFileSync(join(FIXTURES_DIR, 'spa-dashboard.html'), 'utf8');
  const p = plan(html);
  assert.ok(p, 'detection must fire on dashboard fixture');
  const slugs = p.routes.map((r) => r.slug);
  assert.deepEqual(slugs, ['overview', 'analytics', 'settings']);
  // Header is "before"; the cart sidebar sits between page-sections in the
  // source but must hoist to "after" since it follows the first page-section.
  // Footer is "after".
  const positions = Object.fromEntries(p.chrome.map((c) => [c.element.name, c.position]));
  assert.equal(positions.header, 'before');
  assert.equal(positions.aside, 'after');
  assert.equal(positions.footer, 'after');
});

test('real AI convention: id="page-home" + showPage("home") resolves correctly', () => {
  // The AI in the wild emits id="page-xxx" prefix form, but showPage() calls
  // use the stripped form (no `page-`). Detector must match both conventions.
  const html = `<html><body>
    <nav>
      <button onclick="showPage('home')">Home</button>
      <button onclick="showPage('products')">Shop</button>
      <button onclick="showPage('gallery')">Gallery</button>
    </nav>
    <div id="page-home" class="page-section active"><h1>Home</h1></div>
    <div id="page-products" class="page-section"><h1>Shop</h1></div>
    <div id="page-gallery" class="page-section"><h1>Gallery</h1></div>
  </body></html>`;
  const p = plan(html);
  assert.ok(p, 'detection must fire on page-* prefix convention');
  assert.deepEqual(p.routes.map((r) => r.slug), ['home', 'products', 'gallery']);
  // The nav links must have been rewritten to clean paths (no "/page-home").
  const navHtml = p.chrome.find((c) => c.element.name === 'nav').html;
  assert.match(navHtml, /href="\/"/);
  assert.match(navHtml, /href="\/products"/);
  assert.match(navHtml, /href="\/gallery"/);
  assert.doesNotMatch(navHtml, /href="\/page-/);
});

test('every route outer div carries .active so .page-section.active { display: block } matches', () => {
  // Regression for the /products blank-page bug. The source CSS hides
  // every .page-section and only shows .page-section.active. When routes
  // are split, only the original home page carried .active — all other
  // routes rendered blank in the browser despite their content being in
  // the emitted files. The detector must stamp .active onto every page
  // before capturing its HTML so all routes render.
  const html = readFileSync(join(FIXTURES_DIR, 'spa-notflix.html'), 'utf8');
  const p = plan(html);
  for (const route of p.routes) {
    assert.match(
      route.html,
      /class="[^"]*\bactive\b[^"]*"/,
      `route ${route.slug} must have .active on its outer page-section`,
    );
  }
});

test('dashboard: showPage(\'modal\') — unmapped target — left unrewritten', () => {
  const html = readFileSync(join(FIXTURES_DIR, 'spa-dashboard.html'), 'utf8');
  const p = plan(html);
  const headerHtml = p.chrome.find((c) => c.element.name === 'header').html;
  // The three real routes are rewritten.
  assert.match(headerHtml, /href="\/"/);
  assert.match(headerHtml, /href="\/analytics"/);
  assert.match(headerHtml, /href="\/settings"/);
  // The bogus modal target is left as an onclick, to be stripped downstream.
  // domutils escapes the single quotes as &apos; when serialising attributes.
  assert.match(headerHtml, /onclick="showPage\((?:'|&apos;)modal(?:'|&apos;)\)"/);
});
