// Orchestrates the HTML → Next.js translation. Pure: HTML in, in-memory file
// map out. Mode B (default): images keep remote Unsplash URLs and rely on
// next.config.ts remotePatterns. Mode C (Phase 7) bundles images into /public.

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "./parser.ts";
import { extractSections, type Section } from "./sections.ts";
import { htmlToJsx } from "./jsx.ts";
import { convertImagesModeB } from "./images.ts";
import { swapInlineSvgs } from "./icons.ts";
import { detectHookNeeds, type HookNeeds } from "./runtime-detect.ts";

export interface TranslateOptions {
  bundleImages?: boolean;
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
  const sections = extractSections(parsed);
  const needs = detectHookNeeds(html);

  const files: FileMap = {};

  // Per-section component files.
  const sectionMeta: Array<{ name: string; importPath: string }> = [];
  for (const section of sections) {
    const { code, importPath } = renderSectionFile(section);
    files[`components/${section.name}.tsx`] = code;
    sectionMeta.push({ name: section.name, importPath });
  }

  // Always-on client wrapper.
  files["components/ClientRuntime.tsx"] = renderClientRuntime(needs);

  // Hook source — copied verbatim from the templates dir (Phase 1 deliverable).
  for (const hook of HOOK_FILES) {
    files[`lib/${hook}.ts`] = readFileSync(join(HOOKS_DIR, `${hook}.ts`), "utf8");
  }

  // App router files.
  files["app/page.tsx"] = renderPage(sectionMeta);
  files["app/layout.tsx"] = renderLayout(headInfo, needs, opts.siteName);
  files["app/globals.css"] = renderGlobalsCss(headInfo, sections);

  return files;
}

const HOOK_FILES = ["useScrollReveal", "useSmoothScroll", "useMobileNav", "useAccordion"] as const;

function extractHeadInfo(parsed: ReturnType<typeof parse>): HeadInfo {
  const head = parsed.head;
  const info: HeadInfo = { title: null, description: null, fontLinks: [], inlineStyles: [] };
  if (!head) return info;
  for (const child of head.children) {
    if (child.type !== "tag") continue;
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
}

function renderSectionFile(section: Section): SectionFile {
  const { body: rawJsx } = htmlToJsx(section.html);
  const imageStep = convertImagesModeB(rawJsx);
  const iconStep = swapInlineSvgs(imageStep.jsx);

  const imports: string[] = [];
  if (imageStep.hasImages) imports.push(`import Image from "next/image";`);
  if (iconStep.imports.size > 0) {
    imports.push(`import { ${[...iconStep.imports].sort().join(", ")} } from "lucide-react";`);
  }

  const code =
    (imports.length ? imports.join("\n") + "\n\n" : "") +
    `export default function ${section.name}() {\n` +
    `  return (\n` +
    indentBlock(iconStep.jsx, 4) +
    `\n  );\n` +
    `}\n`;

  return { code, importPath: `@/components/${section.name}` };
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

function renderLayout(head: HeadInfo, needs: HookNeeds, siteName?: string): string {
  const title = head.title || siteName || "My Site";
  const description = head.description || "Built with Weavo.";
  const usesAnyHook = needs.scrollReveal || needs.smoothScroll || needs.mobileNav || needs.accordion;
  const runtimeMount = usesAnyHook ? "<ClientRuntime />\n        " : "";
  return (
    `import type { Metadata } from "next";\n` +
    `import "./globals.css";\n` +
    `import ClientRuntime from "@/components/ClientRuntime";\n\n` +
    `export const metadata: Metadata = {\n` +
    `  title: ${JSON.stringify(title)},\n` +
    `  description: ${JSON.stringify(description)},\n` +
    `};\n\n` +
    `export default function RootLayout({ children }: { children: React.ReactNode }) {\n` +
    `  return (\n` +
    `    <html lang="en">\n` +
    `      <body>\n` +
    `        ${runtimeMount}{children}\n` +
    `      </body>\n` +
    `    </html>\n` +
    `  );\n` +
    `}\n`
  );
}

function renderGlobalsCss(head: HeadInfo, sections: Section[]): string {
  // Tailwind v4 single import line. Custom CSS extracted from <style> blocks
  // (in <head> and inside section bodies) is appended below so the cascade
  // still favours later rules.
  const inlineStyles = [...head.inlineStyles];
  for (const section of sections) {
    const { inlineStyles: more } = htmlToJsx(section.html);
    inlineStyles.push(...more);
  }
  const fonts = head.fontLinks.length
    ? `/* Google Fonts (loaded statically; consider migrating to next/font/google):\n${head.fontLinks
        .map((f) => `   ${f}`)
        .join("\n")}\n*/\n\n`
    : "";
  const custom = inlineStyles.length ? `/* Extracted custom CSS */\n${inlineStyles.join("\n\n")}\n` : "";
  return `@import "tailwindcss";\n\n${fonts}${custom}`;
}

function indentBlock(text: string, spaces: number): string {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line.length ? pad + line : line))
    .join("\n");
}
