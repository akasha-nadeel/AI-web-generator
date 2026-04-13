"use client";

import { useEffect, useState, useCallback, use } from "react";
import { AuthNavbar } from "@/components/dashboard/AuthNavbar";
import { GradientButton } from "@/components/shared/GradientButton";
import { cn } from "@/lib/utils";
import {
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Save,
  Download,
  Send,
  MessageSquare,
  X,
  Sparkles,
  ArrowLeft,
  Copy,
} from "lucide-react";
import Link from "next/link";

export default function EditorPage({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = use(params);

  const [siteName, setSiteName] = useState("");
  const [siteHtml, setSiteHtml] = useState("");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

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

  // Push to undo stack
  const pushUndo = useCallback((currentHtml: string) => {
    setUndoStack((prev) => [...prev.slice(-19), currentHtml]);
    setRedoStack([]);
    setIsDirty(true);
  }, []);

  // Undo
  const undo = useCallback(() => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [siteHtml, ...prev]);
    setUndoStack((prev) => prev.slice(0, -1));
    setSiteHtml(previous);
    setIsDirty(true);
  }, [undoStack, siteHtml]);

  // Redo
  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setUndoStack((prev) => [...prev, siteHtml]);
    setRedoStack((prev) => prev.slice(1));
    setSiteHtml(next);
    setIsDirty(true);
  }, [redoStack, siteHtml]);

  // Save handler
  const handleSave = useCallback(async () => {
    if (!siteHtml || !siteId) return;
    setIsSaving(true);
    try {
      await fetch(`/api/sites`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: siteId, site_json: { html: siteHtml } }),
      });
      setIsDirty(false);
    } catch {
      // Handle error
    } finally {
      setIsSaving(false);
    }
  }, [siteHtml, siteId]);

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

  // Chat handler
  const handleChat = async () => {
    if (!chatMessage.trim() || !siteHtml) return;
    setChatLoading(true);
    setChatHistory((prev) => [...prev, { role: "user", content: chatMessage }]);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatMessage, html: siteHtml }),
      });

      const data = await res.json();
      if (data.html) {
        pushUndo(siteHtml);
        setSiteHtml(data.html);
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: "Done! I've updated your website." },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Something went wrong." },
        ]);
      }
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Failed to process your request." },
      ]);
    } finally {
      setChatMessage("");
      setChatLoading(false);
    }
  };



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
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Site not found</h2>
            <p className="text-muted-foreground mb-4">This site doesn&apos;t exist or you don&apos;t have access.</p>
            <GradientButton href="/dashboard">Back to Dashboard</GradientButton>
          </div>
        </div>
      </div>
    );
  }

  /* Chat panel content — shared between desktop inline panel and mobile overlay */
  const chatPanelContent = (
    <>
      <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium">AI Assistant</span>
        </div>
        <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-white/10 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {chatHistory.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Ask me to modify your website. Try &quot;change the color scheme to blue&quot; or &quot;add a testimonials section&quot;.
          </p>
        )}
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "p-3 rounded-xl text-xs",
              msg.role === "user"
                ? "bg-purple-500/15 ml-6"
                : "bg-white/5 mr-6"
            )}
          >
            {msg.content}
          </div>
        ))}
        {chatLoading && (
          <div className="bg-white/5 p-3 rounded-xl mr-6 flex items-center gap-2">
            <div className="w-3 h-3 border border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <span className="text-xs text-muted-foreground">Thinking...</span>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/5 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleChat()}
            placeholder="Ask AI to modify..."
            className="flex-1 px-3 py-2 rounded-lg glass-input text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500/50"
          />
          <button
            onClick={handleChat}
            disabled={chatLoading}
            className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 disabled:opacity-50"
          >
            <Send className="w-3 h-3 text-purple-300" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* ===== TOOLBAR ===== */}
      <div className="glass-nav px-2 md:px-4 h-12 md:h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-sm font-medium truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">{siteName}</span>
          {isDirty && (
            <span className="hidden sm:inline text-xs text-yellow-400 shrink-0">Unsaved</span>
          )}
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Preview/Code toggle */}
          <div className="flex items-center gap-1 mr-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={cn(
                "px-2 py-1 rounded-lg text-xs transition-colors",
                activeTab === "preview"
                  ? "bg-white/10 text-foreground"
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
                  ? "bg-white/10 text-foreground"
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
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
            <div className="w-px h-6 bg-white/10 mx-1" />
          </div>

          {/* Undo/Redo */}
          <button
            onClick={undo}
            disabled={undoStack.length === 0}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Save */}
          <button
            onClick={handleSave}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <Save className="w-4 h-4" />
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 h-8 px-2 md:px-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex overflow-hidden">
        {/* Preview / Code (center) */}
        <div className="flex-1 bg-neutral-950 overflow-auto flex flex-col">
          {activeTab === "preview" ? (
            <div className="flex-1 p-2 md:p-4 flex justify-center items-start overflow-auto">
              {previewDevice === "desktop" ? (
                /* ===== DESKTOP — full width, no frame ===== */
                <div className="w-full h-full">
                  <iframe
                    srcDoc={siteHtml}
                    className="w-full h-full min-h-[400px] md:min-h-[600px] rounded-lg border border-white/5"
                    sandbox="allow-scripts allow-same-origin"
                    style={{ height: "calc(100vh - 100px)" }}
                  />
                </div>
              ) : previewDevice === "tablet" ? (
                /* ===== TABLET — CSS iPad Pro frame ===== */
                <div className="flex-1 flex justify-center items-center">
                  <div
                    className="relative bg-[#1d1d1f] shadow-2xl shadow-black/60"
                    style={{ borderRadius: 24, padding: "18px 18px" }}
                  >
                    {/* Camera dot */}
                    <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#333] ring-1 ring-[#444]" />
                    {/* Power button */}
                    <div className="absolute top-[80px] -right-[2px] w-[2px] h-[30px] bg-[#333] rounded-r-sm" />
                    {/* Screen */}
                    <div
                      className="overflow-hidden bg-black"
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
                    className="relative shadow-2xl shadow-black/60"
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
                      className="overflow-hidden bg-black relative"
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

        {/* AI Chat — desktop inline panel */}
        {chatOpen && (
          <div className="hidden md:flex w-80 border-l border-white/5 flex-col shrink-0">
            {chatPanelContent}
          </div>
        )}
      </div>

      {/* ===== AI CHAT — MOBILE FULLSCREEN OVERLAY ===== */}
      {chatOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[rgba(10,10,25,0.98)] flex flex-col">
          {chatPanelContent}
        </div>
      )}

      {/* Chat toggle FAB */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all z-50"
        >
          <MessageSquare className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}
