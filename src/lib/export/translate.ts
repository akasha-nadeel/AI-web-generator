// Orchestrates the HTML → Next.js translation. Pure: HTML in, in-memory file
// map out. Mode B (default): images keep remote Unsplash URLs and rely on
// next.config.ts remotePatterns. Mode C (Phase 7) bundles images into /public.

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "./parser.ts";
import { extractSections } from "./sections.ts";
import { htmlToJsx } from "./jsx.ts";
import { convertImagesModeB } from "./images.ts";
import { swapInlineSvgs } from "./icons.ts";
import { rewriteInternalLinks } from "./links.ts";
import { detectSpaRoutes } from "./spa-routes.ts";
import { detectHookNeeds, type HookNeeds } from "./runtime-detect.ts";
import { packageJson } from "./templates/static/package.json.ts";
import { tsconfigJson } from "./templates/static/tsconfig.json.ts";
import { tailwindConfigTs } from "./templates/static/tailwind.config.ts.ts";
import { nextConfigTs } from "./templates/static/next.config.ts.ts";
import { globalsCss } from "./templates/static/globals.css.ts";
import { readmeMd } from "./templates/static/readme.md.ts";
import { gitignore } from "./templates/static/gitignore.ts";
import { postcssConfigMjs } from "./templates/static/postcss.config.mjs.ts";

export interface TranslateOptions {
  /** Project-display name. Used for <title> fallback and friendly comments. */
  siteName?: string;
}

export type FileMap = Record<string, string>;

const HOOKS_DIR = join(dirname(fileURLToPath(import.meta.url)), "templates", "hooks");

const RUNTIME_BLOCK_RE = /<!--\s*WEAVO_RUNTIME\s*-->[\s\S]*?<!--\s*\/WEAVO_RUNTIME\s*-->/gi;

interface HeadInfo {
  title: string | null;
  description: string | null;
  fontLinks: string[];
  inlineStyles: string[];
}

export function translateHtmlToNextjs(rawHtml: string, opts: TranslateOptions = {}): FileMap {
  const html = rawHtml.replace(RUNTIME_BLOCK_RE, "");
  const parsed = parse(html);
  const headInfo = extractHeadInfo(parsed);
  const needs = detectHookNeeds(html);
  const siteName = opts.siteName || headInfo.title || "My Site";
  const bodyClass = parsed.body?.attribs?.class ?? "";

  const files: FileMap = {};
  const allInlineStyles: string[] = [...headInfo.inlineStyles];
  let hasLucide = false;

  // Multi-page SPA detection. When non-null, every page-section div becomes
  // its own route file and non-section body children (nav/footer/cart) become
  // shared chrome rendered inside app/layout.tsx. Detection is conservative
  // (see spa-routes.ts): when null we fall through to the single-page path
  // and output is byte-identical to before this feature landed.
  const plan = detectSpaRoutes(parsed, html);
  const chromeRefs: ChromeRef[] = [];
  if (plan) {
    for (const route of plan.routes) {
      const { code, inlineStyles, importsLucide } = renderSectionFile({
        name: route.componentName,
        html: route.html,
      });
      files[`components/${route.componentName}.tsx`] = code;
      allInlineStyles.push(...inlineStyles);
      if (importsLucide) hasLucide = true;

      const routePath = route.isHome ? "app/page.tsx" : `app/${route.slug}/page.tsx`;
      files[routePath] = renderRouteEntry(route.componentName);
    }
    for (const chrome of plan.chrome) {
      const { code, inlineStyles, importsLucide } = renderSectionFile({
        name: chrome.componentName,
        html: chrome.html,
      });
      files[`components/${chrome.componentName}.tsx`] = code;
      allInlineStyles.push(...inlineStyles);
      if (importsLucide) hasLucide = true;
      chromeRefs.push({ componentName: chrome.componentName, position: chrome.position });
    }
  } else {
    // Single-page path — unchanged from before.
    const sections = extractSections(parsed);
    const sectionMeta: Array<{ name: string; importPath: string }> = [];
    for (const section of sections) {
      const { code, importPath, inlineStyles, importsLucide } = renderSectionFile(section);
      files[`components/${section.name}.tsx`] = code;
      sectionMeta.push({ name: section.name, importPath });
      allInlineStyles.push(...inlineStyles);
      if (importsLucide) hasLucide = true;
    }
    files["app/page.tsx"] = renderPage(sectionMeta);
  }

  // Always-on client wrapper.
  files["components/ClientRuntime.tsx"] = renderClientRuntime(needs);

  // Hook source — copied verbatim from the templates dir (Phase 1 deliverable).
  for (const hook of HOOK_FILES) {
    files[`lib/${hook}.ts`] = readFileSync(join(HOOKS_DIR, `${hook}.ts`), "utf8");
  }

  // Layout + globals — shared by both paths.
  files["app/layout.tsx"] = renderLayout(headInfo, needs, siteName, bodyClass, chromeRefs);
  files["app/globals.css"] = globalsCss({ fontLinks: headInfo.fontLinks, customCss: allInlineStyles });

  // Project-root static templates.
  files["package.json"] = packageJson({ siteName, hasLucide });
  files["tsconfig.json"] = tsconfigJson();
  files["tailwind.config.ts"] = tailwindConfigTs();
  files["postcss.config.mjs"] = postcssConfigMjs();
  files["next.config.ts"] = nextConfigTs();
  files["README.md"] = readmeMd({ siteName });
  files[".gitignore"] = gitignore();

  return files;
}

interface ChromeRef {
  componentName: string;
  position: "before" | "after";
}

function renderRouteEntry(componentName: string): string {
  return (
    `import ${componentName} from "@/components/${componentName}";\n\n` +
    `export default function Page() {\n` +
    `  return <${componentName} />;\n` +
    `}\n`
  );
}

const HOOK_FILES = ["useScrollReveal", "useSmoothScroll", "useMobileNav", "useAccordion"] as const;

function extractHeadInfo(parsed: ReturnType<typeof parse>): HeadInfo {
  const head = parsed.head;
  const info: HeadInfo = { title: null, description: null, fontLinks: [], inlineStyles: [] };
  if (!head) return info;
  for (const child of head.children) {
    // htmlparser2 tags <style> as type "style" and <script> as type "script",
    // not the generic "tag". Accept all three so head styles don't get
    // silently dropped.
    if (child.type !== "tag" && child.type !== "style" && child.type !== "script") continue;
    const el = child;
    if (el.name === "title") {
      const text = el.children.map((c) => (c.type === "text" ? (c as unknown as { data: string }).data : "")).join("");
      info.title = text.trim() || null;
    } else if (el.name === "meta") {
      const name = (el.attribs.name || el.attribs.property || "").toLowerCase();
      if (name === "description" && el.attribs.content) info.description = el.attribs.content;
    } else if (el.name === "link" && el.attribs.rel === "stylesheet") {
      const href = el.attribs.href || "";
      if (href.includes("fonts.googleapis.com") || href.includes("fonts.gstatic.com")) {
        info.fontLinks.push(href);
      }
    } else if (el.name === "style") {
      const css = el.children
        .filter((c) => c.type === "text")
        .map((c) => (c as unknown as { data: string }).data)
        .join("");
      if (css.trim()) info.inlineStyles.push(css);
    }
  }
  return info;
}

interface SectionFile {
  code: string;
  importPath: string;
  inlineStyles: string[];
  importsLucide: boolean;
}

function renderSectionFile(section: { name: string; html: string }): SectionFile {
  const { body: rawJsx, inlineStyles } = htmlToJsx(section.html);
  const imageStep = convertImagesModeB(rawJsx);
  const iconStep = swapInlineSvgs(imageStep.jsx);
  const linkStep = rewriteInternalLinks(iconStep.jsx);

  const imports: string[] = [];
  if (imageStep.hasImages) imports.push(`import Image from "next/image";`);
  if (iconStep.imports.size > 0) {
    imports.push(`import { ${[...iconStep.imports].sort().join(", ")} } from "lucide-react";`);
  }
  if (linkStep.hasLink) imports.push(`import Link from "next/link";`);

  const code =
    (imports.length ? imports.join("\n") + "\n\n" : "") +
    `export default function ${section.name}() {\n` +
    `  return (\n` +
    indentBlock(linkStep.jsx, 4) +
    `\n  );\n` +
    `}\n`;

  return {
    code,
    importPath: `@/components/${section.name}`,
    inlineStyles,
    importsLucide: iconStep.imports.size > 0,
  };
}

function renderClientRuntime(needs: HookNeeds): string {
  const wanted: string[] = [];
  if (needs.scrollReveal) wanted.push("useScrollReveal");
  if (needs.smoothScroll) wanted.push("useSmoothScroll");
  if (needs.mobileNav) wanted.push("useMobileNav");
  if (needs.accordion) wanted.push("useAccordion");

  if (wanted.length === 0) {
    return `'use client';\n\nexport default function ClientRuntime() {\n  return null;\n}\n`;
  }

  const importLines = wanted.map((h) => `import { ${h} } from "@/lib/${h}";`).join("\n");
  const calls = wanted.map((h) => `  ${h}();`).join("\n");
  return (
    `'use client';\n` +
    `${importLines}\n\n` +
    `export default function ClientRuntime() {\n` +
    `${calls}\n` +
    `  return null;\n` +
    `}\n`
  );
}

function renderPage(sections: Array<{ name: string; importPath: string }>): string {
  const imports = sections.map((s) => `import ${s.name} from "${s.importPath}";`).join("\n");
  const renders = sections.map((s) => `      <${s.name} />`).join("\n");
  return (
    `${imports}\n\n` +
    `export default function Page() {\n` +
    `  return (\n` +
    `    <>\n` +
    `${renders}\n` +
    `    </>\n` +
    `  );\n` +
    `}\n`
  );
}

function renderLayout(
  head: HeadInfo,
  needs: HookNeeds,
  siteName: string,
  bodyClass: string,
  chrome: ChromeRef[] = [],
): string {
  const title = head.title || siteName;
  const description = head.description || "Built with Weavo.";
  const usesAnyHook = needs.scrollReveal || needs.smoothScroll || needs.mobileNav || needs.accordion;
  const runtimeMount = usesAnyHook ? "<ClientRuntime />\n        " : "";
  const trimmed = bodyClass.trim();
  const bodyAttr = trimmed ? ` className=${JSON.stringify(trimmed)}` : "";

  // Imports: baseline 3, plus one per chrome component in original DOM order.
  // When chrome is empty the joined string equals today's output exactly.
  const importLines = [
    `import type { Metadata } from "next";`,
    `import "./globals.css";`,
    `import ClientRuntime from "@/components/ClientRuntime";`,
    ...chrome.map((c) => `import ${c.componentName} from "@/components/${c.componentName}";`),
  ].join("\n");

  const beforeTags = chrome
    .filter((c) => c.position === "before")
    .map((c) => `<${c.componentName} />`)
    .join("\n        ");
  const afterTags = chrome
    .filter((c) => c.position === "after")
    .map((c) => `<${c.componentName} />`)
    .join("\n        ");
  const beforeBlock = beforeTags ? `${beforeTags}\n        ` : "";
  const afterBlock = afterTags ? `\n        ${afterTags}` : "";

  return (
    `${importLines}\n\n` +
    `export const metadata: Metadata = {\n` +
    `  title: ${JSON.stringify(title)},\n` +
    `  description: ${JSON.stringify(description)},\n` +
    `};\n\n` +
    `export default function RootLayout({ children }: { children: React.ReactNode }) {\n` +
    `  return (\n` +
    `    <html lang="en">\n` +
    `      <body${bodyAttr}>\n` +
    `        ${runtimeMount}${beforeBlock}{children}${afterBlock}\n` +
    `      </body>\n` +
    `    </html>\n` +
    `  );\n` +
    `}\n`
  );
}

function indentBlock(text: string, spaces: number): string {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line.length ? pad + line : line))
    .join("\n");
}
