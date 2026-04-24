"use client";

import { useState } from "react";
import { Download, Loader2, Package } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  projectId: string;
  siteName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ExportPopover({ projectId, siteName, onSuccess, onCancel }: Props) {
  const [bundleImages, setBundleImages] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    setBusy(true);
    try {
      const res = await fetch("/api/export/nextjs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, bundleImages }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Export failed (${res.status})`);
      }

      const blob = await res.blob();
      const cd = res.headers.get("content-disposition") || "";
      const match = cd.match(/filename="([^"]+)"/);
      const filename = match?.[1] || fallbackFilename(siteName);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast.success(`Downloaded ${filename}`, {
        description: "Unzip → npm install → npm run dev",
        duration: 6000,
      });
      onSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Export failed. Try again.";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-2">
        <Package className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground">
            Single-page Next.js 16 project — TypeScript, Tailwind v4, lucide-react. Runs with
            <code className="mx-1 rounded bg-muted px-1 py-0.5 text-[11px]">npm install &amp;&amp; npm run dev</code>.
          </p>
        </div>
      </div>

      <label className="flex items-start gap-2 text-xs cursor-pointer select-none">
        <input
          type="checkbox"
          checked={bundleImages}
          onChange={(e) => setBundleImages(e.target.checked)}
          className="mt-0.5"
        />
        <span className="text-muted-foreground">
          Bundle images for offline use <span className="opacity-60">(adds ~5MB, slower export)</span>
        </span>
      </label>

      <div className="flex items-center justify-end gap-2 pt-1">
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleDownload} disabled={busy}>
          {busy ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Building project…
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              Download ZIP
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function fallbackFilename(siteName: string): string {
  const slug =
    siteName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "site";
  const date = new Date().toISOString().slice(0, 10);
  return `weavo-${slug}-${date}.zip`;
}
