"use client";

import { useEffect, useState, useCallback, use } from "react";
import { AuthNavbar } from "@/components/dashboard/AuthNavbar";
import { GradientButton } from "@/components/shared/GradientButton";
import { cn } from "@/lib/utils";
import {
  Monitor,
  Tablet,
  Smartphone,
  Download,
  ArrowLeft,
  LayoutDashboard,
  Copy,
  Globe,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { PublishDialog } from "@/components/editor/PublishDialog";

export default function EditorPage({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = use(params);

  const [siteName, setSiteName] = useState("");
  const [siteHtml, setSiteHtml] = useState("");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [publishOpen, setPublishOpen] = useState(false);
  const [subdomain, setSubdomain] = useState<string | null>(null);

  // Load site data
  useEffect(() => {
    async function loadSite() {
      try {
        const res = await fetch(`/api/sites?id=${siteId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.site) {
            setSiteName(data.site.name);
            // Support both new format (html in site_json) and legacy
            const html = data.site.site_json?.html || "";
            setSiteHtml(html);
            setSubdomain(data.site.subdomain ?? null);
          }
        }
      } catch {
        // Handle error
      } finally {
        setLoading(false);
      }
    }
    loadSite();
  }, [siteId]);

  // Export handler — download as single HTML file
  const handleExport = useCallback(async () => {
    if (!siteHtml) return;
    const blob = new Blob([siteHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${siteName.toLowerCase().replace(/\s+/g, "-") || "website"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [siteHtml, siteName]);

  // Copy HTML to clipboard
  const handleCopyCode = useCallback(() => {
    if (siteHtml) {
      navigator.clipboard.writeText(siteHtml).catch(() => {});
    }
  }, [siteHtml]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <span className="text-muted-foreground">Loading editor...</span>
        </div>
      </div>
    );
  }

  if (!siteHtml) {
    return (
      <div className="min-h-screen bg-background">
        <AuthNavbar />
        <div className="flex flex-col items-center justify-center py-32 px-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-3">Site not found</h2>
            <p className="text-muted-foreground mb-8">
              This site doesn&apos;t exist or you don&apos;t have access to it.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-[#bef264] text-black font-bold hover:bg-[#d9f99d] transition-all transform hover:scale-105"
            >
              <LayoutDashboard className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* ===== TOOLBAR ===== */}
      <div className="glass-nav px-2 md:px-4 h-12 md:h-14 flex items-center justify-between shrink-0 relative">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 h-9 px-4 rounded-full bg-foreground/[0.06] border border-foreground/[0.08] text-muted-foreground hover:text-foreground hover:bg-foreground/[0.12] transition-all shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        </div>

        {/* Middle group — preview/code + device toggles, absolutely centered */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 md:gap-2">
          {/* Preview/Code toggle */}
          <div className="flex items-center gap-1 mr-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={cn(
                "px-2 py-1 rounded-lg text-xs transition-colors",
                activeTab === "preview"
                  ? "bg-foreground/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={cn(
                "px-2 py-1 rounded-lg text-xs transition-colors",
                activeTab === "code"
                  ? "bg-foreground/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Code
            </button>
          </div>

          {/* Device toggle — desktop only */}
          <div className="hidden md:flex items-center">
            {(["desktop", "tablet", "mobile"] as const).map((device) => {
              const Icon = { desktop: Monitor, tablet: Tablet, mobile: Smartphone }[device];
              return (
                <button
                  key={device}
                  onClick={() => setPreviewDevice(device)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    previewDevice === device
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Edit with AI chat — flips to the /generate page */}
          <Link
            href={`/generate/${siteId}`}
            className="flex items-center gap-1.5 h-8 px-2 md:px-3 rounded-lg bg-lime-400/10 hover:bg-lime-400/20 text-lime-600 dark:text-lime-300 hover:text-lime-700 dark:hover:text-lime-200 text-xs font-medium transition-colors"
            title="Refine with AI chat"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </Link>

          {/* Export */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 h-8 px-2 md:px-3 rounded-lg bg-foreground/[0.08] hover:bg-foreground/[0.14] text-foreground/90 hover:text-foreground text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Publish */}
          <button
            onClick={() => setPublishOpen(true)}
            className={cn(
              "flex items-center gap-1.5 h-8 px-2 md:px-3 rounded-lg text-xs font-medium transition-colors",
              subdomain
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/30"
                : "bg-foreground text-background hover:bg-foreground/90"
            )}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{subdomain ? "Live" : "Publish"}</span>
          </button>
        </div>
      </div>

      <PublishDialog
        siteId={siteId}
        currentSubdomain={subdomain}
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        onPublished={(sub) => setSubdomain(sub)}
        onUnpublished={() => setSubdomain(null)}
      />

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex overflow-hidden">
        {/* Preview / Code (center) */}
        <div className="flex-1 bg-slate-50 dark:bg-neutral-950 flex flex-col overflow-hidden">
          {activeTab === "preview" ? (
            <div className={cn(
              "flex-1 flex justify-center items-start min-h-0",
              // Desktop: no padding, iframe fills; tablet/mobile: pad so the
              // device frame doesn't touch the edges, and let the container
              // scroll if the frame is taller than the viewport.
              previewDevice === "desktop" ? "p-0" : "p-2 md:p-4 overflow-auto"
            )}>
              {previewDevice === "desktop" ? (
                /* ===== DESKTOP — full width, no frame ===== */
                <iframe
                  srcDoc={siteHtml}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : previewDevice === "tablet" ? (
                /* ===== TABLET — CSS iPad Pro frame ===== */
                <div className="flex-1 flex justify-center items-center">
                  <div
                    className="relative bg-[#1d1d1f] dark:bg-[#111] shadow-2xl shadow-black/20 dark:shadow-black/60"
                    style={{ borderRadius: 24, padding: "18px 18px" }}
                  >
                    {/* Camera dot */}
                    <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#333] ring-1 ring-[#444]" />
                    {/* Power button */}
                    <div className="absolute top-[80px] -right-[2px] w-[2px] h-[30px] bg-[#333] rounded-r-sm" />
                    {/* Screen */}
                    <div
                      className="overflow-hidden bg-black shadow-inner"
                      style={{ borderRadius: 8, width: 560, height: "calc(100vh - 180px)", maxHeight: 740 }}
                    >
                      <iframe
                        srcDoc={siteHtml}
                        className="border-0"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ width: "768px", height: "137.2%", transform: "scale(0.729)", transformOrigin: "top left" }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* ===== MOBILE — CSS iPhone 12 Pro frame ===== */
                <div className="flex-1 flex justify-center items-center">
                  <div
                    className="relative shadow-2xl shadow-black/20 dark:shadow-black/60"
                    style={{ borderRadius: 32, padding: "10px 10px", background: "linear-gradient(145deg, #2c3e4a 0%, #1a2c35 50%, #1d2d36 100%)" }}
                  >
                    {/* Notch — classic iPhone 12 style */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-[6px]"
                      style={{ width: 100, height: 22, background: "linear-gradient(180deg, #1a2c35 0%, #1d2d36 100%)", borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}
                    >
                      {/* Speaker grille */}
                      <div className="w-[28px] h-[2.5px] rounded-full bg-[#0a0f12]" style={{ boxShadow: "inset 0 0.5px 1px rgba(0,0,0,0.5)" }} />
                      {/* Camera lens */}
                      <div className="w-[6px] h-[6px] rounded-full bg-[#0e1519] ring-1 ring-[#253540]" />
                    </div>
                    {/* Frame highlight edge */}
                    <div className="absolute inset-0 rounded-[32px] border border-white/[0.08] pointer-events-none" />
                    {/* Power button */}
                    <div className="absolute top-[100px] -right-[2.5px] w-[2.5px] h-[28px] rounded-r-sm" style={{ background: "linear-gradient(90deg, #2c3e4a, #3a5060)" }} />
                    {/* Silent switch */}
                    <div className="absolute top-[70px] -left-[2.5px] w-[2.5px] h-[12px] rounded-l-sm" style={{ background: "linear-gradient(270deg, #2c3e4a, #3a5060)" }} />
                    {/* Volume up */}
                    <div className="absolute top-[92px] -left-[2.5px] w-[2.5px] h-[24px] rounded-l-sm" style={{ background: "linear-gradient(270deg, #2c3e4a, #3a5060)" }} />
                    {/* Volume down */}
                    <div className="absolute top-[122px] -left-[2.5px] w-[2.5px] h-[24px] rounded-l-sm" style={{ background: "linear-gradient(270deg, #2c3e4a, #3a5060)" }} />
                    {/* Screen */}
                    <div
                      className="overflow-hidden bg-black relative shadow-inner"
                      style={{ borderRadius: 22, width: 230, height: "calc(100vh - 160px)", maxHeight: 500 }}
                    >
                      <iframe
                        srcDoc={siteHtml}
                        className="border-0"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ width: "375px", height: "163.1%", transform: "scale(0.6133)", transformOrigin: "top left" }}
                      />
                    </div>
                    {/* Home indicator */}
                    <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[70px] h-[3px] rounded-full bg-white/15" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-auto scrollbar-thin bg-[#0d1117] p-4">
              <div className="relative">
                <button
                  onClick={handleCopyCode}
                  className="absolute top-2 right-2 flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs text-muted-foreground bg-white/[0.06] hover:bg-white/[0.1] transition-all"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
                <pre className="text-xs text-[#c9d1d9] font-mono leading-relaxed whitespace-pre-wrap break-all">
                  <code>{siteHtml}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
