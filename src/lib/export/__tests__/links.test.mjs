// Edge-case tests for the post-JSX <a> → <Link> rewriter.
import { test } from 'node:test';
import assert from 'node:assert/strict';

const { rewriteInternalLinks } = await import('../links.ts');

test('rewrites a single internal anchor and reports hasLink', () => {
  const { jsx, hasLink } = rewriteInternalLinks(`<a href="/shop">Shop</a>`);
  assert.equal(jsx, `<Link href="/shop">Shop</Link>`);
  assert.equal(hasLink, true);
});

test('does not rewrite external or protocol-relative URLs', () => {
  const inputs = [
    `<a href="https://example.com">Out</a>`,
    `<a href="http://example.com">Out</a>`,
    `<a href="//cdn.example.com/x">CDN</a>`,
    `<a href="mailto:hi@example.com">Mail</a>`,
    `<a href="tel:+1234">Call</a>`,
    `<a href="#section">Hash</a>`,
  ];
  for (const input of inputs) {
    const { jsx, hasLink } = rewriteInternalLinks(input);
    assert.equal(jsx, input, `untouched: ${input}`);
    assert.equal(hasLink, false, `hasLink=false: ${input}`);
  }
});

test('rewrites multiple anchors on one line independently', () => {
  const input = `<a href="/a">A</a> | <a href="https://ext">X</a> | <a href="/b">B</a>`;
  const { jsx, hasLink } = rewriteInternalLinks(input);
  assert.equal(jsx, `<Link href="/a">A</Link> | <a href="https://ext">X</a> | <Link href="/b">B</Link>`);
  assert.equal(hasLink, true);
});

test('preserves extra attributes on the anchor', () => {
  const { jsx } = rewriteInternalLinks(`<a className="nav-link" href="/shop" data-x="1">Shop</a>`);
  assert.equal(jsx, `<Link className="nav-link" href="/shop" data-x="1">Shop</Link>`);
});

test('handles nested elements inside the anchor', () => {
  const input = `<a href="/shop"><span className="icon">🛍</span> Shop</a>`;
  const { jsx } = rewriteInternalLinks(input);
  assert.equal(jsx, `<Link href="/shop"><span className="icon">🛍</span> Shop</Link>`);
});

test('leaves dynamic hrefs (href={expr}) alone', () => {
  const input = `<a href={url}>Dynamic</a>`;
  const { jsx, hasLink } = rewriteInternalLinks(input);
  assert.equal(jsx, input);
  assert.equal(hasLink, false);
});

test('leaves anchors with no href alone', () => {
  const input = `<a className="x">No href</a>`;
  const { jsx, hasLink } = rewriteInternalLinks(input);
  assert.equal(jsx, input);
  assert.equal(hasLink, false);
});

test('handles orphan closing </a> after a rewritten internal link safely', () => {
  // Malformed input — don't crash, just rewrite what we can.
  const input = `<a href="/x">X</a></a>`;
  const { jsx, hasLink } = rewriteInternalLinks(input);
  assert.equal(jsx, `<Link href="/x">X</Link></a>`);
  assert.equal(hasLink, true);
});
