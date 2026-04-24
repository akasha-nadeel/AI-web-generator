// Section extraction behaviour — particularly the two looseness escape hatches:
//   1. <nav> counts as a top-level section tag (many AI-generated pages start
//      with <nav> before any <section>).
//   2. If the body has no sectioning tags at all (AI sometimes wraps
//      everything in plain <div>s, e.g. SPA-style page-section divs), the
//      whole body is packaged as a single <main> fallback — otherwise
//      app/page.tsx would be empty and the exported site would render blank.
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { parse } = await import('../parser.ts');
const { extractSections } = await import('../sections.ts');

test('extracts <nav> as a section when it is a top-level body child', () => {
  const html = `
    <html><body>
      <nav id="topnav"><a href="#">Home</a></nav>
      <section id="hero"><h1>Hello</h1></section>
    </body></html>
  `;
  const sections = extractSections(parse(html));
  const tags = sections.map((s) => s.tag);
  assert.deepEqual(tags, ['nav', 'section']);
});

test('fallback: wraps the entire body when no sectioning tags are present', () => {
  const html = `
    <html><body>
      <div id="homePage" class="page-section active">
        <h1>NOTFLIX</h1>
        <p>Some content</p>
      </div>
      <div id="shopPage" class="page-section"></div>
    </body></html>
  `;
  const sections = extractSections(parse(html));
  assert.equal(sections.length, 1, 'expected exactly one fallback section');
  assert.equal(sections[0].name, 'Main');
  assert.match(sections[0].html, /NOTFLIX/);
  assert.match(sections[0].html, /page-section/);
});

test('fallback: groups non-section content alongside real sections (NOTFLIX case)', () => {
  const html = `
    <html><body>
      <nav>Top</nav>
      <div class="page-section"><h1>Home</h1></div>
      <div class="page-section"><h1>Shop</h1></div>
      <footer>Foot</footer>
    </body></html>
  `;
  const sections = extractSections(parse(html));
  const names = sections.map((s) => s.name);
  assert.deepEqual(names, ['Nav', 'Main', 'Footer']);
  assert.match(sections[1].html, /Home/);
  assert.match(sections[1].html, /Shop/);
});

test('ignores top-level <script> and <style> tags', () => {
  const html = `
    <html><body>
      <script>window.foo=1</script>
      <div><h1>Hello</h1></div>
      <style>body{color:red}</style>
    </body></html>
  `;
  const sections = extractSections(parse(html));
  assert.equal(sections.length, 1);
  assert.equal(sections[0].name, 'Main');
  assert.doesNotMatch(sections[0].html, /window\.foo/);
  assert.doesNotMatch(sections[0].html, /color:red/);
});

test('fallback does not trigger when an empty body is passed', () => {
  const html = `<html><body></body></html>`;
  const sections = extractSections(parse(html));
  assert.equal(sections.length, 0);
});
