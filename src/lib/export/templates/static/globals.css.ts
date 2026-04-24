// Generates app/globals.css for the exported project: a Tailwind v4
// `@import` plus any custom CSS pulled out of the original document's
// <style> blocks.

interface Options {
  /** Google Fonts hrefs collected from the original <head>. Re-emitted as
   *  `@import url(…)` at the top of the stylesheet so the fonts actually
   *  load — otherwise the exported site falls back to the browser default,
   *  which renders heavier and shifts line heights. */
  fontLinks: string[];
  /** CSS pulled out of inline <style> blocks, in document order. */
  customCss: string[];
}

export function globalsCss({ fontLinks, customCss }: Options): string {
  // `@import url(...)` rules must precede any other at-rules, so emit font
  // imports first, then the Tailwind v3 layer directives.
  const fontImports = fontLinks.map((href) => `@import url("${href}");`);
  const parts: string[] = [
    ...fontImports,
    `@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
  ];

  if (customCss.length > 0) {
    parts.push(`/* Extracted custom CSS */\n${customCss.join("\n\n")}`);
  }

  return parts.join("\n\n") + "\n";
}
