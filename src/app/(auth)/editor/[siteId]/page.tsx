"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useEditorStore } from "@/stores/editorStore";
import { assemblePreviewHtml } from "@/lib/assembler/assembler";
import { AuthNavbar } from "@/components/dashboard/AuthNavbar";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientButton } from "@/components/shared/GradientButton";
import { getComponent, getAllComponents, getCategories } from "@/lib/components/registry";
import { cn } from "@/lib/utils";
import {
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Save,
  Download,
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
  Send,
  MessageSquare,
  X,
  Sparkles,
  Layers,
  ArrowLeft,
} from "lucide-react";
import JSZip from "jszip";
import { assembleSite } from "@/lib/assembler/assembler";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export default function EditorPage({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = use(params);
  const {
    siteJson,
    siteName,
    currentPageIndex,
    previewDevice,
    isDirty,
    isSaving,
    undoStack,
    redoStack,
    setSiteId,
    setSiteName,
    setSiteJson,
    updateSiteJson,
    setCurrentPageIndex,
    setPreviewDevice,
    setIsSaving,
    undo,
    redo,
    removeSection,
    addSection,
    moveSection,
  } = useEditorStore();

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [addSectionOpen, setAddSectionOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load site data
  useEffect(() => {
    async function loadSite() {
      try {
        const res = await fetch(`/api/sites?id=${siteId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.site) {
            setSiteId(siteId);
            setSiteName(data.site.name);
            setSiteJson(data.site.site_json);
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

  // Save handler
  const handleSave = useCallback(async () => {
    if (!siteJson || !siteId) return;
    setIsSaving(true);
    try {
      await fetch(`/api/sites`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: siteId, site_json: siteJson }),
      });
    } catch {
      // Handle error
    } finally {
      setIsSaving(false);
    }
  }, [siteJson, siteId]);

  // Export handler
  const handleExport = useCallback(async () => {
    if (!siteJson) return;
    const pages = assembleSite(siteJson, siteName);
    const zip = new JSZip();

    pages.forEach((html, filename) => {
      zip.file(filename, html);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${siteName.toLowerCase().replace(/\s+/g, "-")}-website.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }, [siteJson, siteName]);

  // Chat handler
  const handleChat = async () => {
    if (!chatMessage.trim() || !siteJson) return;
    setChatLoading(true);
    setChatHistory((prev) => [...prev, { role: "user", content: chatMessage }]);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatMessage, siteJson }),
      });

      const data = await res.json();
      if (data.siteJson) {
        updateSiteJson(data.siteJson);
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

  // Generate preview HTML
  const previewHtml =
    siteJson && siteJson.pages[currentPageIndex]
      ? assemblePreviewHtml(
          siteJson.pages[currentPageIndex].sections,
          siteJson.theme,
          siteName
        )
      : "";

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
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

  if (!siteJson) {
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

  const currentPage = siteJson.pages[currentPageIndex];

  /* Sections panel content — shared between desktop sidebar and mobile drawer */
  const sectionsPanelContent = (
    <>
      {/* Page tabs */}
      <div className="mb-4">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">
          Pages
        </label>
        <div className="flex flex-wrap gap-1">
          {siteJson.pages.map((page, i) => (
            <button
              key={i}
              onClick={() => { setCurrentPageIndex(i); setSectionsOpen(false); }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs transition-colors",
                currentPageIndex === i
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
            >
              {page.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sections list */}
      <label className="text-xs font-medium text-muted-foreground mb-2 block">
        Sections
      </label>
      <div className="space-y-1.5">
        {currentPage?.sections.map((section, i) => {
          const comp = getComponent(section.componentId);
          return (
            <div
              key={i}
              className="glass-card p-3 flex items-center justify-between group"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">
                  {comp?.name || section.componentId}
                </p>
                <p className="text-[10px] text-muted-foreground capitalize">
                  {comp?.category}
                </p>
              </div>
              <div className="flex gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => i > 0 && moveSection(currentPageIndex, i, i - 1)}
                  className="p-1.5 hover:bg-white/10 rounded"
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() =>
                    i < currentPage.sections.length - 1 &&
                    moveSection(currentPageIndex, i, i + 1)
                  }
                  className="p-1.5 hover:bg-white/10 rounded"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeSection(currentPageIndex, i)}
                  className="p-1.5 hover:bg-red-500/20 rounded text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add section button */}
      <button
        onClick={() => { setAddSectionOpen(true); setSectionsOpen(false); }}
        className="w-full mt-3 p-3 border border-dashed border-white/15 rounded-xl text-xs text-muted-foreground hover:border-purple-500/40 hover:text-foreground transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-3 h-3" />
        Add Section
      </button>
    </>
  );

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
            Ask me to modify your website. Try &quot;make the hero section darker&quot; or &quot;add a testimonials section&quot;.
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
      {/* ===== MOBILE SECTIONS DRAWER ===== */}
      <Sheet open={sectionsOpen} onOpenChange={setSectionsOpen}>
        <SheetContent side="left" showCloseButton={false} className="w-[280px] p-3 bg-[rgba(10,10,25,0.97)] border-white/[0.06] overflow-y-auto">
          <SheetTitle className="sr-only">Sections</SheetTitle>
          {sectionsPanelContent}
        </SheetContent>
      </Sheet>

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
          {/* Sections toggle — mobile only */}
          <button
            onClick={() => setSectionsOpen(true)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground md:hidden"
          >
            <Layers className="w-4 h-4" />
          </button>

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
        {/* Section Panel — desktop only */}
        <div className="hidden md:block w-64 border-r border-white/5 overflow-y-auto p-3 shrink-0">
          {sectionsPanelContent}
        </div>

        {/* Preview (center) */}
        <div className="flex-1 bg-neutral-950 p-2 md:p-4 overflow-auto flex justify-center">
          <div
            style={{ width: deviceWidths[previewDevice] }}
            className="transition-all duration-300"
          >
            <iframe
              srcDoc={previewHtml}
              className="w-full h-full min-h-[400px] md:min-h-[600px] rounded-lg border border-white/5"
              sandbox="allow-scripts"
              style={{ height: "calc(100vh - 100px)" }}
            />
          </div>
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

      {/* Add Section Modal */}
      {addSectionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-panel p-4 md:p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg font-bold">Add Section</h3>
              <button
                onClick={() => setAddSectionOpen(false)}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {getCategories().map((category) => {
              const components = getAllComponents().filter(
                (c) => c.category === category
              );
              if (components.length === 0) return null;
              return (
                <div key={category} className="mb-4 md:mb-6">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {components.map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => {
                          addSection(
                            currentPageIndex,
                            currentPage.sections.length - 1,
                            comp.id,
                            comp.defaultContent
                          );
                          setAddSectionOpen(false);
                        }}
                        className="p-3 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all text-left"
                      >
                        <p className="text-xs font-medium">{comp.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {comp.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
