// Generates the package.json for the exported Next.js project. Versions are
// pinned to whatever the Weavo host runs against, so the exported site
// behaves identically to its in-app preview.

interface Options {
  /** Friendly project name that becomes the npm package name (slug-ified). */
  siteName: string;
  /** Whether any section imports lucide-react; controls inclusion of that dep. */
  hasLucide: boolean;
}

export function packageJson({ siteName, hasLucide }: Options): string {
  const pkg = {
    name: toNpmName(siteName),
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      next: "16.2.1",
      react: "19.2.4",
      "react-dom": "19.2.4",
      ...(hasLucide ? { "lucide-react": "^1.7.0" } : {}),
    },
    devDependencies: {
      typescript: "^5",
      "@types/node": "^20",
      "@types/react": "^19",
      "@types/react-dom": "^19",
      tailwindcss: "^4",
      "@tailwindcss/postcss": "^4",
    },
  };
  return JSON.stringify(pkg, null, 2) + "\n";
}

function toNpmName(input: string): string {
  const cleaned = input
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return cleaned || "weavo-site";
}
