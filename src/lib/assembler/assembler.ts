import { renderSection } from "@/lib/components/renderer";
import { ThemeConfig, SiteJSON } from "@/lib/components/types";

function generateThemeCSS(theme: ThemeConfig): string {
  return `
:root {
  --primary: ${theme.primary};
  --secondary: ${theme.secondary};
  --accent: ${theme.accent};
  --bg: ${theme.bg};
  --text: ${theme.text};
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { overflow-x: hidden; }
body {
  font-family: '${theme.fontBody}', sans-serif;
  background-color: ${theme.bg};
  color: ${theme.text};
  line-height: 1.6;
}
body::-webkit-scrollbar { display: none; }
body { -ms-overflow-style: none; scrollbar-width: none; }
a { transition: opacity 0.2s; }
a:hover { opacity: 0.85; }
img { max-width: 100%; height: auto; }
details summary::-webkit-details-marker { display: none; }
details summary { list-style: none; }
details[open] summary { margin-bottom: 8px; }

@media (max-width: 768px) {
  [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
  [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
  [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
  [style*="grid-template-columns: 2fr"] { grid-template-columns: 1fr !important; }
  [style*="font-size: 56px"] { font-size: 32px !important; }
  [style*="font-size: 48px"] { font-size: 28px !important; }
  [style*="font-size: 40px"] { font-size: 26px !important; }
  [style*="padding: 120px"] { padding: 80px 16px !important; }
  [style*="padding: 96px"] { padding: 64px 16px !important; }
  [style*="gap: 64px"] { gap: 32px !important; }
  nav [style*="display: flex"][style*="gap: 32px"] { display: none !important; }
}`;
}

function generateGoogleFontsLink(theme: ThemeConfig): string {
  const fonts = new Set([theme.fontHeading, theme.fontBody]);
  const fontParams = Array.from(fonts)
    .map((f) => `family=${f.replace(/\s+/g, "+")}:wght@400;500;600;700;800`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${fontParams}&display=swap`;
}

function generateHead(title: string, description: string, theme: ThemeConfig, cssContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${generateGoogleFontsLink(theme)}" rel="stylesheet">
  <style>${cssContent}</style>
</head>`;
}

export function assemblePage(
  pageTitle: string,
  siteTitle: string,
  sections: Array<{ componentId: string; content: Record<string, unknown> }>,
  theme: ThemeConfig
): string {
  const css = generateThemeCSS(theme);
  const head = generateHead(`${pageTitle} | ${siteTitle}`, siteTitle, theme, css);
  const body = sections
    .map((section) => renderSection(section, theme))
    .join("\n");

  return `${head}
<body>
${body}
</body>
</html>`;
}

export function assembleSite(siteJson: SiteJSON, siteName: string): Map<string, string> {
  const pages = new Map<string, string>();

  for (const page of siteJson.pages) {
    const html = assemblePage(
      page.name,
      siteName,
      page.sections,
      siteJson.theme
    );
    const filename = page.slug === "index" ? "index.html" : `${page.slug}.html`;
    pages.set(filename, html);
  }

  return pages;
}

export function assemblePreviewHtml(
  sections: Array<{ componentId: string; content: Record<string, unknown> }>,
  theme: ThemeConfig,
  siteName: string
): string {
  return assemblePage("Preview", siteName, sections, theme);
}
