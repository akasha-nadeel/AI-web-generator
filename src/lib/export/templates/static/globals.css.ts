// Generates app/globals.css for the exported project: a Tailwind v4
// `@import` plus any custom CSS pulled out of the original document's
// <style> blocks.

interface Options {
  /** Google Fonts hrefs collected from the original <head>. Recorded as a
   *  comment so the user can migrate to next/font/google later. */
  fontLinks: string[];
  /** CSS pulled out of inline <style> blocks, in document order. */
  customCss: string[];
}

export function globalsCss({ fontLinks, customCss }: Options): string {
  const parts: string[] = [`@import "tailwindcss";`];

  if (fontLinks.length > 0) {
    const lines = fontLinks.map((href) => `   ${href}`).join("\n");
    parts.push(`/* Google Fonts (loaded statically; consider migrating to next/font/google):\n${lines}\n*/`);
  }

  if (customCss.length > 0) {
    parts.push(`/* Extracted custom CSS */\n${customCss.join("\n\n")}`);
  }

  return parts.join("\n\n") + "\n";
}
