"use client";

import { useState, useEffect, useRef, useCallback, useMemo, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    ArrowLeft,
    ArrowUp,
    Zap,
    Code2,
    AlertTriangle,
    Copy,
    ThumbsUp,
    ThumbsDown,
    RefreshCw,
    Share2,
    GitFork,
    Globe,
    History,
    Settings,
    Maximize2,
    ExternalLink,
    Flag,
    Eye,
    RotateCcw,
    X,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { assemblePage } from "@/lib/assembler/assembler";
import type { SiteJSON, ThemeConfig } from "@/lib/components/types";

/* ===== CONSTANTS ===== */

/* ===== TYPES ===== */

interface ChatMessage {
    role: "user" | "ai";
    content: string;
    status?: "loading" | "done" | "error";
    elapsed?: number;
}

/* ===== SUGGESTION CHIPS ===== */

const SUGGESTION_CHIPS: Record<string, string[]> = {
    default: [
        "Add a testimonials section",
        "Change the color scheme",
        "Make the hero section larger",
        "Add a pricing table",
        "Improve the footer layout",
    ],
    agency: [
        "Add client logos section",
        "Add team member profiles",
        "Include case studies",
        "Add a services grid",
        "Implement a contact form",
    ],
    restaurant: [
        "Add an online menu",
        "Include chef profiles",
        "Add reservation form",
        "Show food gallery",
        "Add opening hours section",
    ],
    ecommerce: [
        "Add product grid",
        "Include featured categories",
        "Add newsletter signup",
        "Show trust badges",
        "Add promotional banner",
    ],
    portfolio: [
        "Add project gallery",
        "Include skills section",
        "Add about me section",
        "Show work experience",
        "Add contact form",
    ],
    saas: [
        "Add pricing table",
        "Include feature comparison",
        "Add integration logos",
        "Show customer reviews",
        "Add FAQ section",
    ],
};

/* ===== SPINNER ===== */

function Spinner({ size = 40, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            className={cn("animate-spin text-muted-foreground/60", className)}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
        >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="50 14" />
        </svg>
    );
}

/* ===== MAIN PAGE ===== */

function GeneratePageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();

    // Status: loading (spinner) → generating (spinner + chat) → preparing (chat + "preparing..." in preview) → done (chat + preview)
    const [status, setStatus] = useState<"loading" | "generating" | "preparing" | "done" | "error">("loading");
    const [errorMsg, setErrorMsg] = useState("");
    const [siteId, setSiteId] = useState<string | null>(null);
    const [siteJson, setSiteJson] = useState<SiteJSON | null>(null);
    const [chatInput, setChatInput] = useState("");
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [prevSiteJson, setPrevSiteJson] = useState<SiteJSON | null>(null);
    const [showChanges, setShowChanges] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const hasStarted = useRef(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatStartTime = useRef(0);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const dragStartX = useRef(0);
    const dragStartW = useRef(0);

    // Resize: mousedown on the handle
    const onResizeStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const sidebar = sidebarRef.current;
        if (!sidebar) return;
        dragStartX.current = e.clientX;
        dragStartW.current = sidebar.getBoundingClientRect().width;
        setIsDragging(true);
    }, []);

    // Resize: double-click resets to default
    const onResizeReset = useCallback(() => {
        if (sidebarRef.current) {
            sidebarRef.current.style.width = "360px";
        }
    }, []);

    // Resize: mousemove + mouseup on document (not on the handle)
    useEffect(() => {
        if (!isDragging) return;

        const onMove = (e: MouseEvent) => {
            const sidebar = sidebarRef.current;
            if (!sidebar) return;
            const vw = window.innerWidth;
            const minW = Math.round(vw * 0.22);  // ~22% of viewport
            const maxW = Math.round(vw * 0.42);  // ~42% of viewport
            const newW = Math.min(Math.max(dragStartW.current + (e.clientX - dragStartX.current), minW), maxW);
            sidebar.style.width = `${newW}px`;
        };

        const onUp = () => setIsDragging(false);

        // Attach to document so we never lose the drag even if cursor leaves the handle
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);

        // Block pointer events on everything underneath (especially the iframe)
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
        if (overlayRef.current) overlayRef.current.style.display = "block";

        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
            if (overlayRef.current) overlayRef.current.style.display = "none";
        };
    }, [isDragging]);

    // Scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Build the live preview HTML from siteJson
    const previewHtml = useMemo(() => {
        if (!siteJson) return "";
        try {
            const firstPage = siteJson.pages[0];
            if (!firstPage) return "";
            return assemblePage(firstPage.name, "Preview", firstPage.sections, siteJson.theme);
        } catch {
            return "";
        }
    }, [siteJson]);

    const prompt = searchParams.get("prompt") || "";
    const industry = searchParams.get("industry") || "agency";
    const mood = searchParams.get("mood") || "minimal";
    const fontStyle = searchParams.get("fontStyle") || "modern";
    const pages = searchParams.get("pages")?.split(",") || ["Home", "About", "Contact"];
    const routeSiteId = params.siteId as string;

    // Generate a new site via API
    const startGeneration = useCallback(async () => {
        setStatus("generating");
        chatStartTime.current = Date.now();
        setMessages([{ role: "user", content: prompt }]);

        try {
            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    businessName: "My Website",
                    industry,
                    description: prompt,
                    colorPalette: {
                        primary: "#7c3aed",
                        secondary: "#4c1d95",
                        accent: "#a78bfa",
                        bg: "#0f0f23",
                        text: "#eef2ff",
                    },
                    fontStyle,
                    overallFeel: mood,
                    pages,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Generation failed");
            if (!data.siteId) throw new Error("No site returned");

            setSiteId(data.siteId);
            if (data.siteJson) setSiteJson(data.siteJson as SiteJSON);

            const genElapsed = Math.round((Date.now() - chatStartTime.current) / 1000);
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: `Your website has been generated successfully! Here's what was built:\n\n• **Layout**: A fully responsive ${pages.length}-page structure with navigation and footer.\n• **Sections**: Hero, features, testimonials, and more — tailored to your description.\n• **Animations**: Integrated \`framer-motion\` for smooth scroll animations as the user navigates down the page.\n• **Responsive**: Fully mobile-friendly with a collapsible hamburger menu for smaller screens.\n\nThe app is ready to view in the preview window! Let me know if you'd like to adjust the colors, add more sections, or customize the copy.`,
                    status: "done",
                    elapsed: genElapsed,
                },
            ]);

            // Transition: generating → preparing → done
            setStatus("preparing");
            // Update URL so refresh loads directly
            window.history.replaceState(null, "", `/generate/${data.siteId}`);
            // Brief "preparing" phase then show preview
            setTimeout(() => setStatus("done"), 2000);
        } catch (err) {
            const errMessage = err instanceof Error ? err.message : "Something went wrong";
            setErrorMsg(errMessage);
            setStatus("error");
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: errMessage, status: "error", elapsed: Math.round((Date.now() - chatStartTime.current) / 1000) },
            ]);
        }
    }, [prompt, industry, mood, fontStyle, pages]);

    // Load existing site from DB (for refresh/reload)
    const loadExistingSite = useCallback(async (id: string) => {
        setStatus("loading");
        try {
            const res = await fetch(`/api/sites?id=${id}`);
            const data = await res.json();
            if (data.site) {
                setSiteId(data.site.id);
                setSiteJson(data.site.site_json as SiteJSON);
                setMessages([
                    { role: "ai", content: "Welcome back! Your website is ready. Use the chat to make changes.", status: "done", elapsed: 0 },
                ]);
                setStatus("done");
            } else {
                router.push("/dashboard");
            }
        } catch {
            router.push("/dashboard");
        }
    }, [router]);

    // On mount: decide whether to generate or load existing
    useEffect(() => {
        if (hasStarted.current) return;
        hasStarted.current = true;

        if (routeSiteId === "new" && prompt) {
            // New generation from dashboard
            startGeneration();
        } else if (routeSiteId && routeSiteId !== "new") {
            // Reload/refresh — load existing site from DB
            loadExistingSite(routeSiteId);
        } else {
            router.push("/dashboard");
        }
    }, [routeSiteId, prompt, router, startGeneration, loadExistingSite]);

    const handleOpenEditor = () => {
        if (siteId) router.push(`/editor/${siteId}`);
    };

    const handleRetry = () => {
        hasStarted.current = false;
        setErrorMsg("");
        startGeneration();
    };

    // Follow-up chat — send message to modify the site
    const handleChatSend = async () => {
        if (!chatInput.trim() || !siteJson || isChatLoading) return;

        const userMsg = chatInput.trim();
        setChatInput("");
        setIsChatLoading(true);

        // Add user message
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        // Add loading AI message
        setMessages((prev) => [...prev, { role: "ai", content: "", status: "loading" }]);

        const start = Date.now();

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg, siteJson }),
            });

            const data = await res.json();
            const chatElapsed = Math.round((Date.now() - start) / 1000);

            if (!res.ok) {
                throw new Error(data.error || "Chat failed");
            }

            if (data.siteJson) {
                // Save current siteJson for Restore
                setPrevSiteJson(siteJson);
                setSiteJson(data.siteJson as SiteJSON);
                setShowChanges(false);

                // Also update the site in the database
                if (siteId) {
                    fetch("/api/sites", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: siteId, action: "updateJson", siteJson: data.siteJson }),
                    }).catch(() => {});
                }
            }

            // Replace loading message with done message
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: "ai",
                    content: "Done! I've updated the site based on your request. Check the preview to see the changes.",
                    status: "done",
                    elapsed: chatElapsed,
                };
                return updated;
            });
        } catch (err) {
            const chatElapsed = Math.round((Date.now() - start) / 1000);
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: "ai",
                    content: err instanceof Error ? err.message : "Something went wrong",
                    status: "error",
                    elapsed: chatElapsed,
                };
                return updated;
            });
        } finally {
            setIsChatLoading(false);
        }
    };

    const handleChatKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChatSend();
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).catch(() => {});
    };

    // Get suggestion chips based on industry
    const suggestions = useMemo(() => {
        const chips = SUGGESTION_CHIPS[industry] || SUGGESTION_CHIPS.default;
        return ["AI Features", ...chips.slice(0, 4)];
    }, [industry]);

    // Handle suggestion chip click
    const handleSuggestionClick = (suggestion: string) => {
        if (suggestion === "AI Features") return; // decorative chip
        setChatInput(suggestion);
    };

    // Handle restore to previous version
    const handleRestore = () => {
        if (prevSiteJson) {
            const current = siteJson;
            setSiteJson(prevSiteJson);
            setPrevSiteJson(current);
            setShowChanges(false);
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: "Restored to previous version. The preview has been updated.", status: "done", elapsed: 0 },
            ]);
        }
    };

    // Scroll suggestions
    const scrollSuggestions = () => {
        if (suggestionsRef.current) {
            suggestionsRef.current.scrollBy({ left: 150, behavior: "smooth" });
        }
    };

    const canChat = status === "done" && !isChatLoading;

    // Render markdown-like bold (**text**) and code (`text`)
    const renderContent = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*|`[^`]+`)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i} className="text-foreground/90">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith("`") && part.endsWith("`")) {
                return <code key={i} className="px-1 py-0.5 rounded bg-white/[0.06] text-xs font-mono text-foreground/80">{part.slice(1, -1)}</code>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    const siteName = siteJson?.pages?.[0]?.sections?.find(
        (s: { componentId: string; content: Record<string, unknown> }) => s.content?.brand
    )?.content?.brand as string || "My Website";

    // Full-screen spinner for initial load on refresh
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Spinner size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* ===== TOP HEADER BAR ===== */}
            <div className="h-12 border-b border-white/[0.06] bg-[rgba(10,10,25,0.6)] flex items-center justify-between px-3 md:px-5 shrink-0 z-20">
                {/* Left — Back */}
                <button
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center gap-2 h-8 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to start</span>
                </button>

                {/* Center — Site name */}
                <span className="text-sm font-medium text-foreground truncate max-w-[200px] md:max-w-xs">
                    {siteName}
                </span>

                {/* Right — Actions */}
                <div className="flex items-center gap-1">
                    <button className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all">
                        <GitFork className="w-3.5 h-3.5" />
                        Remix
                    </button>
                    <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs text-foreground bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] transition-all font-medium">
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Share</span>
                    </button>
                    <button
                        onClick={handleOpenEditor}
                        disabled={status !== "done"}
                        className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs bg-white text-black font-medium hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <span className="hidden sm:inline">Publish</span>
                        <span className="sm:hidden">Go</span>
                    </button>
                    <button className="hidden md:flex p-2 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.06] transition-all" title="History">
                        <History className="w-4 h-4" />
                    </button>
                    <button className="hidden md:flex p-2 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.06] transition-all" title="Settings">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* ===== MAIN LAYOUT — Sidebar + Content ===== */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                {/* Drag overlay — covers iframe so it can't steal mouse events */}
                <div ref={overlayRef} className="hidden absolute inset-0 z-40" />

                {/* ===== LEFT SIDEBAR — Chat ===== */}
                <div
                    ref={sidebarRef}
                    className="w-full lg:w-[360px] lg:h-[calc(100vh-3rem)] lg:sticky lg:top-12 border-b lg:border-b-0 bg-[rgba(10,10,25,0.5)] flex flex-col shrink-0"
                >
                    {/* Drag handle — sits between sidebar and content */}
                    <div
                        onMouseDown={onResizeStart}
                        onDoubleClick={onResizeReset}
                        className="hidden lg:flex absolute top-0 right-0 w-[6px] h-full cursor-col-resize z-50 items-center justify-center group translate-x-1/2"
                    >
                        {/* Visible bar */}
                        <div
                            className={cn(
                                "w-[3px] h-full transition-colors duration-100",
                                isDragging ? "bg-purple-500" : "bg-transparent group-hover:bg-purple-500/50"
                            )}
                        />
                    </div>
                    {/* AI model header */}
                    <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Weavo AI</span>
                    <button className="p-1 rounded-md text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.06] transition-all" title="Settings">
                        <Settings className="w-3.5 h-3.5" />
                    </button>
                    <div className="ml-auto flex items-center gap-1.5">
                        {status === "generating" && (
                            <span className="text-[11px] text-amber-400 font-medium">Generating...</span>
                        )}
                        {status === "preparing" && (
                            <span className="text-[11px] text-blue-400 font-medium">Preparing...</span>
                        )}
                        {status === "done" && !isChatLoading && (
                            <span className="text-[11px] text-emerald-400">Ready</span>
                        )}
                        {isChatLoading && (
                            <span className="text-[11px] text-amber-400 font-medium">Updating...</span>
                        )}
                        {status === "error" && (
                            <span className="text-[11px] text-red-400 font-medium">Failed</span>
                        )}
                    </div>
                </div>

                {/* Scrollable chat area */}
                <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3 space-y-3 min-h-0">
                    {messages.map((msg, i) => (
                        <div key={i}>
                            {msg.role === "user" ? (
                                /* User bubble */
                                <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                                    <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                                        {msg.content}
                                    </p>
                                </div>
                            ) : (
                                /* AI response */
                                <div className="space-y-2">
                                    {/* AI label + timing */}
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <span className="text-purple-400 font-medium">Weavo AI</span>
                                        <span>•</span>
                                        {msg.status === "loading" ? (
                                            <span className="text-amber-400">Running...</span>
                                        ) : msg.status === "error" ? (
                                            <span className="text-red-400">Failed after {msg.elapsed}s</span>
                                        ) : (
                                            <span className="text-emerald-400">Ran for {msg.elapsed}s</span>
                                        )}
                                    </div>

                                    {/* Loading indicator */}
                                    {msg.status === "loading" && (
                                        <div className="flex items-center gap-2">
                                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                            </motion.div>
                                            <span className="text-xs text-purple-400 font-medium">Processing your request...</span>
                                        </div>
                                    )}

                                    {/* Error */}
                                    {msg.status === "error" && (
                                        <div className="text-sm text-red-400/80 leading-relaxed">
                                            <p>{msg.content}</p>
                                            {i === messages.length - 1 && (
                                                <button
                                                    onClick={i === 1 ? handleRetry : undefined}
                                                    className="mt-3 flex items-center gap-2 h-8 px-4 rounded-full bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 transition-colors"
                                                >
                                                    <Zap className="w-3 h-3" />
                                                    Try Again
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {/* Content */}
                                    {msg.status === "done" && msg.content && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-sm text-foreground/80 leading-relaxed space-y-2"
                                        >
                                            {msg.content.split("\n").map((line, li) => {
                                                if (!line.trim()) return null;
                                                if (line.startsWith("• ")) {
                                                    return (
                                                        <div key={li} className="flex gap-2 text-foreground/70">
                                                            <span className="text-foreground/90 font-medium shrink-0">•</span>
                                                            <span>{renderContent(line.slice(2))}</span>
                                                        </div>
                                                    );
                                                }
                                                return <p key={li}>{renderContent(line)}</p>;
                                            })}

                                            {/* Action bar */}
                                            <div className="flex items-center gap-1 pt-2 border-t border-white/[0.06] mt-2 flex-wrap">
                                                {/* Left actions */}
                                                <button className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all">
                                                    <Flag className="w-3 h-3" />
                                                    Checkpoint
                                                </button>
                                                <button className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.06] transition-all" title="Good response">
                                                    <ThumbsUp className="w-3.5 h-3.5" />
                                                </button>
                                                <button className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.06] transition-all" title="Bad response">
                                                    <ThumbsDown className="w-3.5 h-3.5" />
                                                </button>

                                                {/* Right actions */}
                                                <div className="flex items-center gap-1 ml-auto">
                                                    {prevSiteJson && (
                                                        <>
                                                            <button
                                                                onClick={() => setShowChanges(!showChanges)}
                                                                className={cn(
                                                                    "flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs transition-all",
                                                                    showChanges
                                                                        ? "text-purple-400 bg-purple-500/10 border border-purple-500/20"
                                                                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                                                                )}
                                                            >
                                                                <Eye className="w-3 h-3" />
                                                                View changes
                                                            </button>
                                                            <button
                                                                onClick={handleRestore}
                                                                className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all"
                                                            >
                                                                <RotateCcw className="w-3 h-3" />
                                                                Restore
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => copyToClipboard(msg.content)}
                                                        className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.06] transition-all"
                                                        title="Copy response"
                                                    >
                                                        <Copy className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Suggestion chips */}
                {showSuggestions && status === "done" && (
                    <div className="px-3 pt-2 shrink-0">
                        <div className="flex items-center gap-1.5">
                            {/* Refresh suggestions */}
                            <button
                                className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.06] transition-all shrink-0"
                                title="Refresh suggestions"
                            >
                                <RefreshCw className="w-3 h-3" />
                            </button>

                            {/* Chips row */}
                            <div
                                ref={suggestionsRef}
                                className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1"
                            >
                                {suggestions.map((chip, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSuggestionClick(chip)}
                                        className={cn(
                                            "flex items-center gap-1.5 h-7 px-3 rounded-full text-xs whitespace-nowrap border transition-all shrink-0",
                                            i === 0
                                                ? "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
                                                : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:text-foreground hover:border-white/[0.15] hover:bg-white/[0.06]"
                                        )}
                                    >
                                        {i === 0 && <Sparkles className="w-3 h-3" />}
                                        {chip}
                                    </button>
                                ))}
                            </div>

                            {/* Scroll right */}
                            <button
                                onClick={scrollSuggestions}
                                className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.06] transition-all shrink-0"
                                title="More suggestions"
                            >
                                <ChevronRight className="w-3 h-3" />
                            </button>

                            {/* Dismiss */}
                            <button
                                onClick={() => setShowSuggestions(false)}
                                className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.06] transition-all shrink-0"
                                title="Dismiss suggestions"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Bottom chat input */}
                <div className="p-3 border-t border-white/[0.06] mt-auto shrink-0">
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden focus-within:border-purple-500/30 transition-colors">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={handleChatKeyDown}
                            placeholder="Make changes, add new features, ask for..."
                            disabled={!canChat}
                            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-40 px-3 py-2.5"
                        />
                        <div className="flex items-center justify-between px-2 py-1.5 border-t border-white/[0.04]">
                            <div className="flex items-center gap-1">
                                <button disabled={!canChat} className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.06] transition-all disabled:cursor-not-allowed" title="Attach image">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
                                </button>
                                <button disabled={!canChat} className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.06] transition-all disabled:cursor-not-allowed" title="Voice input">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                                </button>
                                <button disabled={!canChat} className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.06] transition-all disabled:cursor-not-allowed" title="Add">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                                </button>
                            </div>
                            <button
                                onClick={handleChatSend}
                                disabled={!canChat || !chatInput.trim()}
                                className={cn(
                                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all",
                                    canChat && chatInput.trim()
                                        ? "bg-white text-black hover:bg-white/90"
                                        : "bg-white/[0.06] text-muted-foreground/40 cursor-not-allowed"
                                )}
                                title="Send message"
                            >
                                <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== MAIN CONTENT — Preview / Code ===== */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Sub-bar: Preview/Code tabs + URL bar + actions */}
                <div className="h-11 border-b border-white/[0.06] flex items-center gap-3 px-3 md:px-4 shrink-0">
                    {/* Left — Preview / Code tabs */}
                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            onClick={() => setActiveTab("preview")}
                            className={cn(
                                "text-sm px-3 py-1 rounded-lg transition-colors",
                                activeTab === "preview"
                                    ? "font-medium text-foreground bg-white/[0.06] border border-white/[0.08]"
                                    : "text-muted-foreground hover:bg-white/[0.04]"
                            )}
                        >
                            {(status === "generating" || status === "preparing") && "• "}Preview
                        </button>
                        <button
                            onClick={() => setActiveTab("code")}
                            className={cn(
                                "text-sm px-3 py-1 rounded-lg transition-colors",
                                activeTab === "code"
                                    ? "font-medium text-foreground bg-white/[0.06] border border-white/[0.08]"
                                    : "text-muted-foreground hover:bg-white/[0.04]"
                            )}
                        >
                            Code
                        </button>
                    </div>

                    {/* Center — URL bar (like Google AI Studio) */}
                    <div className="hidden md:flex flex-1 items-center justify-end gap-2">
                        <div className="flex items-center gap-2 h-7 px-3 rounded-lg bg-white/[0.04] border border-white/[0.06] max-w-xs">
                            <ExternalLink className="w-3 h-3 text-muted-foreground/50 shrink-0" />
                            <span className="text-xs text-muted-foreground/60 truncate">
                                {siteId ? `/${siteId.slice(0, 8)}...` : "/preview"}
                            </span>
                        </div>

                        {/* Code toggle */}
                        <button
                            onClick={() => setActiveTab(activeTab === "code" ? "preview" : "code")}
                            className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.06] transition-all"
                            title="Toggle code view"
                        >
                            <Code2 className="w-4 h-4" />
                        </button>

                        {/* Fullscreen */}
                        <button
                            onClick={() => {
                                if (siteId) window.open(`/preview/${industry}`, "_blank");
                            }}
                            className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.06] transition-all"
                            title="Open fullscreen"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Content area */}
                <div className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* PREVIEW TAB */}
                        {activeTab === "preview" && (
                            <div className="flex-1 flex flex-col overflow-hidden">
                                {status === "generating" ? (
                                    /* Generating — clean centered spinner */
                                    <div className="flex-1 flex items-center justify-center">
                                        <Spinner size={44} />
                                    </div>
                                ) : status === "preparing" ? (
                                    /* Preparing — system resources text */
                                    <div className="flex-1 flex items-center justify-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-center"
                                        >
                                            <p className="text-sm text-muted-foreground mb-6">Preparing system resources ...</p>
                                            <Spinner size={36} className="mx-auto" />
                                        </motion.div>
                                    </div>
                                ) : status === "error" ? (
                                    /* Error state */
                                    <div className="flex-1 flex items-center justify-center p-8">
                                        <div className="text-center">
                                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-3">
                                                <AlertTriangle className="w-6 h-6 text-red-400" />
                                            </div>
                                            <h2 className="text-lg font-semibold">Generation failed</h2>
                                            <p className="text-sm text-red-400/80 mt-1 max-w-md">{errorMsg}</p>
                                            <button
                                                onClick={handleRetry}
                                                className="mt-4 flex items-center gap-2 mx-auto h-9 px-5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
                                            >
                                                <Zap className="w-3.5 h-3.5" />
                                                Try Again
                                            </button>
                                        </div>
                                    </div>
                                ) : previewHtml ? (
                                    /* Live preview iframe */
                                    <iframe
                                        srcDoc={previewHtml}
                                        title="Website Preview"
                                        className={cn("flex-1 w-full border-0 bg-white", isDragging && "pointer-events-none")}
                                        sandbox="allow-same-origin allow-scripts"
                                    />
                                ) : (
                                    /* Done but no preview */
                                    <div className="flex-1 flex items-center justify-center">
                                        <Spinner size={36} />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* CODE TAB */}
                        {activeTab === "code" && (
                            <div className="flex-1 overflow-auto scrollbar-thin bg-[#0d1117] p-4">
                                {previewHtml ? (
                                    <pre className="text-xs text-[#c9d1d9] font-mono leading-relaxed whitespace-pre-wrap break-all">
                                        <code>{previewHtml}</code>
                                    </pre>
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        {(status === "generating" || status === "preparing") ? (
                                            <Spinner size={36} />
                                        ) : (
                                            <span className="text-muted-foreground text-sm">No code generated yet.</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

/* ===== EXPORT WITH SUSPENSE ===== */

export default function GeneratePage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-500 flex items-center justify-center"
                        >
                            <Sparkles className="w-5 h-5 text-white" />
                        </motion.div>
                        <p className="text-sm text-muted-foreground">Loading...</p>
                    </div>
                </div>
            }
        >
            <GeneratePageContent />
        </Suspense>
    );
}
