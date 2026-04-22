"use client";

import { useState, useEffect, useRef, useCallback, useMemo, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    ArrowLeft,
    ArrowUp,
    Zap,
    AlertTriangle,
    Copy,
    ThumbsUp,
    ThumbsDown,
    RefreshCw,
    Globe,
    Maximize2,
    Monitor,
    Tablet,
    Smartphone,
    LayoutDashboard,
    Flag,
    Eye,
    RotateCcw,
    X,
    ChevronRight,
    ImageIcon,
    History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreditsStore } from "@/stores/creditsStore";
import { CreditCounter } from "@/components/ui/CreditCounter";
import { PublishDialog } from "@/components/editor/PublishDialog";

/* ===== TYPES ===== */

interface ChatImage {
    data: string; // base64 data URL
    name: string;
    type: string; // e.g. "image/png"
}

interface ChatMessage {
    role: "user" | "ai";
    content: string;
    images?: ChatImage[];
    status?: "loading" | "done" | "error";
    elapsed?: number;
}

/* ===== SUGGESTION CHIPS ===== */

const SUGGESTION_CHIPS: Record<string, string[]> = {
    default: [
        "Add a testimonials section",
        "Change the color scheme to dark mode",
        "Make the hero section larger with a background image",
        "Add a pricing table",
        "Improve the footer with social links",
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

/* ===== GENERATION PROGRESS — Google AI Studio style ===== */

const GENERATION_PHASES = [
    { label: "Thinking", delay: 0 },
    { label: "Designing", delay: 4000 },
    { label: "Blueprinting", delay: 9000 },
    { label: "Coding", delay: 15000 },
    { label: "Tweaking", delay: 22000 },
    { label: "Polishing", delay: 30000 },
];

const GENERATION_STEPS = [
    { label: "Analyzing your prompt and requirements", delay: 0 },
    { label: "Selecting optimal layout and structure", delay: 3000 },
    { label: "Designing responsive components", delay: 7000 },
    { label: "Applying design tokens and typography", delay: 11000 },
    { label: "Building interactive elements and animations", delay: 16000 },
    { label: "Generating production-ready code", delay: 22000 },
    { label: "Running quality checks and optimization", delay: 28000 },
];

function GenerationProgress({ startTime }: { startTime: number }) {
    const [currentPhase, setCurrentPhase] = useState(GENERATION_PHASES[0].label);
    const [visibleSteps, setVisibleSteps] = useState(0);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now() - startTime;
            setElapsed(now);

            // Phase word
            let phase = GENERATION_PHASES[0].label;
            for (const p of GENERATION_PHASES) {
                if (now >= p.delay) phase = p.label;
            }
            setCurrentPhase(phase);

            // Step checklist
            let count = 0;
            for (const step of GENERATION_STEPS) {
                if (now >= step.delay) count++;
            }
            setVisibleSteps(count);
        }, 300);

        return () => clearInterval(timer);
    }, [startTime]);

    return (
        <div className="space-y-3">
            {/* Model name + elapsed time */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-foreground/70 font-medium">Weavo AI</span>
                <span>•</span>
                <span className="text-foreground/50">Running for {Math.floor(elapsed / 1000)}s</span>
            </div>

            {/* Animated phase word — single line like Google */}
            <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentPhase}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-foreground/60"
                    >
                        {currentPhase}...
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Step-by-step checklist */}
            <div className="space-y-1.5 pl-1 pt-1 border-t border-white/[0.04]">
                {GENERATION_STEPS.slice(0, visibleSteps).map((step, i) => {
                    const isLast = i === visibleSteps - 1;
                    const isCompleted = i < visibleSteps - 1;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex items-center gap-2"
                        >
                            {isCompleted ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"
                                >
                                    <svg className="w-2 h-2 text-emerald-400" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M2 6l3 3 5-5" />
                                    </svg>
                                </motion.div>
                            ) : (
                                <svg className="w-3.5 h-3.5 animate-spin text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="50 14" />
                                </svg>
                            )}

                            <span className={cn(
                                "text-xs",
                                isCompleted ? "text-foreground/40" : isLast ? "text-foreground/70" : "text-foreground/40"
                            )}>
                                {step.label}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            {/* Progress bar */}
            <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min((visibleSteps / GENERATION_STEPS.length) * 100, 95)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}

/* ===== MAIN PAGE ===== */

function GeneratePageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();

    const [status, setStatus] = useState<"loading" | "generating" | "preparing" | "done" | "error">("loading");
    const [errorMsg, setErrorMsg] = useState("");
    const [siteId, setSiteId] = useState<string | null>(null);
    const [siteHtml, setSiteHtml] = useState<string>("");
    const [subdomain, setSubdomain] = useState<string | null>(null);
    const [publishOpen, setPublishOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [versions, setVersions] = useState<Array<{ id: string; source: string; summary: string | null; created_at: string }>>([]);
    const [versionsLoading, setVersionsLoading] = useState(false);
    const [restoringId, setRestoringId] = useState<string | null>(null);
    const [chatInput, setChatInput] = useState("");
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [prevHtml, setPrevHtml] = useState<string>("");
    const [showChanges, setShowChanges] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [attachedImages, setAttachedImages] = useState<ChatImage[]>([]);
    const hasStarted = useRef(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatStartTime = useRef(0);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
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

    // Resize: mousemove + mouseup on document
    useEffect(() => {
        if (!isDragging) return;

        const onMove = (e: MouseEvent) => {
            const sidebar = sidebarRef.current;
            if (!sidebar) return;
            const vw = window.innerWidth;
            const minW = Math.round(vw * 0.22);
            const maxW = Math.round(vw * 0.42);
            const newW = Math.min(Math.max(dragStartW.current + (e.clientX - dragStartX.current), minW), maxW);
            sidebar.style.width = `${newW}px`;
        };

        const onUp = () => setIsDragging(false);

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
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

    const prompt = searchParams.get("prompt") || "";
    const industry = searchParams.get("industry") || "agency";
    const mood = searchParams.get("mood") || "minimal";
    const pages = searchParams.get("pages")?.split(",") || ["Home", "About", "Contact"];
    const templateId = searchParams.get("templateId") || "";
    const model = searchParams.get("model") || "";
    const routeSiteId = params.siteId as string;

    // Generate a new site via API
    const startGeneration = useCallback(async (initialImages?: ChatImage[]) => {
        setStatus("generating");
        chatStartTime.current = Date.now();
        setMessages([{ role: "user", content: prompt, images: initialImages }]);

        try {
            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt,
                    industry,
                    mood,
                    pages,
                    ...(templateId && { templateId }),
                    ...(model && { model }),
                    ...(initialImages && initialImages.length > 0 && {
                        images: initialImages.map((img) => ({
                            data: img.data,
                            type: img.type,
                        })),
                    }),
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                if (res.status === 402 && data.code === "INSUFFICIENT_CREDITS") {
                    useCreditsStore.getState().openOutOfCredits({
                        required: data.required ?? 0,
                        balance: data.balance ?? 0,
                        model: data.model,
                    });
                    useCreditsStore.getState().refresh();
                }
                throw new Error(data.error || "Generation failed");
            }
            if (!data.siteId) throw new Error("No site returned");

            setSiteId(data.siteId);
            if (data.html) setSiteHtml(data.html);
            if (typeof data.creditsRemaining === "number") {
                useCreditsStore.getState().setBalance(data.creditsRemaining);
            }

            const genElapsed = Math.round((Date.now() - chatStartTime.current) / 1000);
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: `Your website has been generated successfully! Here's what was built:\n\n• **Design**: A stunning, production-ready website with a "${mood}" mood.\n• **Typography**: Custom Google Font pairing with bold headings and readable body text.\n• **Layout**: Fully responsive design that looks great on mobile, tablet, and desktop.\n• **Animations**: Smooth scroll animations, hover effects, and micro-interactions.\n• **Content**: Professional, context-aware copy tailored to your request.\n\nThe site is ready to view in the preview window! Use the chat to make any changes.`,
                    status: "done",
                    elapsed: genElapsed,
                },
            ]);

            setStatus("preparing");
            // After a fresh generation, jump straight to the editor where the
            // user can preview/export/publish. The AI-chat refine loop is
            // reachable from the editor's Edit button.
            setTimeout(() => {
                router.replace(`/editor/${data.siteId}`);
            }, 1200);
        } catch (err) {
            const errMessage = err instanceof Error ? err.message : "Something went wrong";
            setErrorMsg(errMessage);
            setStatus("error");
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: errMessage, status: "error", elapsed: Math.round((Date.now() - chatStartTime.current) / 1000) },
            ]);
        }
    }, [prompt, industry, mood, pages, templateId]);

    // Load existing site from DB (for refresh/reload)
    const loadExistingSite = useCallback(async (id: string) => {
        setStatus("loading");
        try {
            const res = await fetch(`/api/sites?id=${id}`);
            const data = await res.json();
            if (data.site) {
                setSiteId(data.site.id);
                // Support both new format (html in site_json) and raw site_json
                const html = data.site.site_json?.html || "";
                setSiteHtml(html);
                setSubdomain(data.site.subdomain ?? null);
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
            // Check if there are inspiration images in sessionStorage (from wizard)
            let wizardImages: ChatImage[] | undefined;
            try {
                const stored = sessionStorage.getItem("pixora_inspiration_images");
                if (stored) {
                    const parsed = JSON.parse(stored) as string[];
                    wizardImages = parsed.map((dataUrl, i) => ({
                        data: dataUrl,
                        name: `inspiration-${i + 1}.png`,
                        type: "image/png",
                    }));
                    sessionStorage.removeItem("pixora_inspiration_images");
                }
            } catch { /* ignore parse errors */ }

            startGeneration(wizardImages);
        } else if (routeSiteId && routeSiteId !== "new") {
            loadExistingSite(routeSiteId);
        } else {
            router.push("/dashboard");
        }
    }, [routeSiteId, prompt, router, startGeneration, loadExistingSite]);

    const handleRetry = () => {
        hasStarted.current = false;
        setErrorMsg("");
        startGeneration();
    };

    // Follow-up chat — send message to modify the site
    const handleChatSend = async () => {
        if ((!chatInput.trim() && attachedImages.length === 0) || !siteHtml || isChatLoading) return;

        const userMsg = chatInput.trim();
        const imagesToSend = [...attachedImages];
        setChatInput("");
        setAttachedImages([]);
        setIsChatLoading(true);

        // Capture prior turns BEFORE we append the new ones so the history
        // we send reflects only completed conversation (no empty loading bubble).
        const priorTurns = messages
            .filter((m) => m.status !== "error" && m.status !== "loading" && m.content.trim())
            .slice(-10) // keep the last ~5 exchanges; each exchange is user+ai
            .map((m) => ({ role: m.role === "ai" ? "assistant" : "user", content: m.content }));

        setMessages((prev) => [...prev, { role: "user", content: userMsg, images: imagesToSend.length > 0 ? imagesToSend : undefined }]);
        setMessages((prev) => [...prev, { role: "ai", content: "", status: "loading" }]);

        const start = Date.now();

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg,
                    html: siteHtml,
                    siteId,
                    history: priorTurns,
                    images: imagesToSend.map((img) => ({
                        data: img.data,
                        type: img.type,
                    })),
                }),
            });

            // Error responses still come back as JSON (e.g. 401, 402, 429).
            const contentType = res.headers.get("content-type") || "";
            if (!res.ok) {
                const errData = contentType.includes("json")
                    ? await res.json().catch(() => ({}))
                    : { error: await res.text().catch(() => "Chat failed") };
                if (res.status === 402 && errData.code === "INSUFFICIENT_CREDITS") {
                    useCreditsStore.getState().openOutOfCredits({
                        required: errData.required ?? 0,
                        balance: errData.balance ?? 0,
                        model: errData.model,
                    });
                    useCreditsStore.getState().refresh();
                }
                throw new Error(errData.error || "Chat failed");
            }

            // Success → NDJSON stream. Walk it line by line.
            if (!res.body) throw new Error("Empty stream");
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            // Mode starts unknown. Once we get mode=chat, tokens stream live
            // into the last AI message. Once we get mode=html, we keep the
            // placeholder and swap in the final HTML on `done`.
            let mode: "chat" | "html" | null = null;
            let liveText = "";

            // Helper: update the last AI message by patching its content.
            const patchLast = (updater: (prev: string) => string, status: "loading" | "done" | "error" = "loading") => {
                setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (!last || last.role !== "ai") return prev;
                    updated[updated.length - 1] = {
                        ...last,
                        content: updater(last.content),
                        status,
                        elapsed: Math.round((Date.now() - start) / 1000),
                    };
                    return updated;
                });
            };

            let finalHtml: string | null = null;
            let finalReply: string | null = null;
            let streamError: string | null = null;

            outer: while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";
                for (const line of lines) {
                    if (!line.trim()) continue;
                    let evt: { type: string; [k: string]: unknown };
                    try {
                        evt = JSON.parse(line);
                    } catch {
                        continue;
                    }
                    if (evt.type === "mode") {
                        mode = evt.mode as "chat" | "html";
                        if (mode === "html") {
                            patchLast(() => "Applying your change…", "loading");
                        } else {
                            patchLast(() => "", "loading");
                        }
                    } else if (evt.type === "token" && typeof evt.text === "string") {
                        if (mode === "chat") {
                            liveText += evt.text;
                            const snapshot = liveText;
                            patchLast(() => snapshot, "loading");
                        }
                    } else if (evt.type === "progress" && typeof evt.chars === "number") {
                        // HTML mode heartbeat — show live char count so user sees the stream is alive.
                        if (mode === "html") {
                            const chars = evt.chars as number;
                            patchLast(() => `Applying your change… ${chars.toLocaleString()} chars`, "loading");
                        }
                    } else if (evt.type === "scope" && Array.isArray(evt.targets)) {
                        // Server picked specific sections — tell the user we're doing a targeted edit.
                        const n = evt.targets.length;
                        patchLast(() => `Editing ${n === 1 ? "1 section" : `${n} sections`}…`, "loading");
                    } else if (evt.type === "done") {
                        if (typeof evt.creditsRemaining === "number") {
                            useCreditsStore.getState().setBalance(evt.creditsRemaining);
                        }
                        if (typeof evt.html === "string") finalHtml = evt.html;
                        if (typeof evt.reply === "string") finalReply = evt.reply;
                        break outer;
                    } else if (evt.type === "error" && typeof evt.message === "string") {
                        streamError = evt.message;
                        break outer;
                    }
                }
            }

            if (streamError) throw new Error(streamError);

            if (finalHtml) {
                setPrevHtml(siteHtml);
                setSiteHtml(finalHtml);
                setShowChanges(false);

                // Auto-save to database
                if (siteId) {
                    fetch("/api/sites", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: siteId,
                            site_json: { html: finalHtml },
                            source: "chat",
                            summary: userMsg.slice(0, 140),
                        }),
                    }).catch(() => {});
                }

                patchLast(
                    () => `Done! I've applied your changes: **"${userMsg.slice(0, 80)}${userMsg.length > 80 ? "..." : ""}"**. Check the preview to see the update.`,
                    "done"
                );
            } else if (finalReply) {
                patchLast(() => finalReply!, "done");
            } else if (liveText) {
                // Stream ended but no explicit done payload — use what we streamed.
                patchLast(() => liveText, "done");
            } else {
                patchLast(() => "I didn't catch that. Could you rephrase as a specific change?", "done");
            }
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

    // Image upload handling
    const handleImageUpload = useCallback((files: FileList | null) => {
        if (!files) return;
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];

        Array.from(files).forEach((file) => {
            if (!allowed.includes(file.type)) return;
            if (file.size > maxSize) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setAttachedImages((prev) => [
                        ...prev,
                        {
                            data: e.target!.result as string,
                            name: file.name,
                            type: file.type,
                        },
                    ]);
                }
            };
            reader.readAsDataURL(file);
        });

        if (imageInputRef.current) imageInputRef.current.value = "";
    }, []);

    const removeAttachedImage = useCallback((index: number) => {
        setAttachedImages((prev) => prev.filter((_, i) => i !== index));
    }, []);

    // Paste image from clipboard
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;

            const imageFiles: File[] = [];
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.startsWith("image/")) {
                    const file = items[i].getAsFile();
                    if (file) imageFiles.push(file);
                }
            }

            if (imageFiles.length > 0) {
                const dt = new DataTransfer();
                imageFiles.forEach((f) => dt.items.add(f));
                handleImageUpload(dt.files);
            }
        };

        document.addEventListener("paste", handlePaste);
        return () => document.removeEventListener("paste", handlePaste);
    }, [handleImageUpload]);

    // Get suggestion chips based on industry
    const suggestions = useMemo(() => {
        const chips = SUGGESTION_CHIPS[industry] || SUGGESTION_CHIPS.default;
        return ["AI Features", ...chips.slice(0, 4)];
    }, [industry]);

    const pendingSuggestionRef = useRef<string | null>(null);

    const handleSuggestionClick = (suggestion: string) => {
        if (suggestion === "AI Features") return;
        pendingSuggestionRef.current = suggestion;
        setChatInput(suggestion);
    };

    // Auto-send when a suggestion chip sets chatInput
    useEffect(() => {
        if (pendingSuggestionRef.current && chatInput === pendingSuggestionRef.current && canChat) {
            pendingSuggestionRef.current = null;
            handleChatSend();
        }
    }, [chatInput]); // eslint-disable-line react-hooks/exhaustive-deps

    // Handle restore to previous version
    const handleRestore = () => {
        if (prevHtml) {
            const current = siteHtml;
            setSiteHtml(prevHtml);
            setPrevHtml(current);
            setShowChanges(false);
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: "Restored to previous version. The preview has been updated.", status: "done", elapsed: 0 },
            ]);
        }
    };

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

    // Extract site name from prompt
    const siteName = prompt.slice(0, 40) || "My Website";

    // Full-screen spinner for initial load on refresh
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Spinner size={48} />
            </div>
        );
    }

    return (
        <div className="h-screen bg-background flex flex-col overflow-hidden">
            {/* ===== TOP HEADER BAR ===== */}
            <div className="h-12 border-b border-white/[0.06] bg-[rgba(10,10,25,0.6)] flex items-center justify-between px-3 md:px-5 shrink-0 z-20">
                <div className="flex items-center gap-2">
                    <Link
                        href={`/editor/${siteId}`}
                        className="flex items-center gap-2 h-8 px-4 rounded-full bg-white/[0.06] border border-white/[0.08] text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.12] transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back</span>
                    </Link>
                </div>

                <div className="flex items-center gap-1.5">
                    <button
                        onClick={async () => {
                            setHistoryOpen(true);
                            if (!siteId) return;
                            setVersionsLoading(true);
                            try {
                                const r = await fetch(`/api/sites/${siteId}/versions`);
                                const d = await r.json();
                                setVersions(d.versions || []);
                            } finally {
                                setVersionsLoading(false);
                            }
                        }}
                        disabled={!siteId}
                        className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium bg-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-white/[0.1] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Version history"
                    >
                        <History className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">History</span>
                    </button>
                    <button
                        onClick={() => setPublishOpen(true)}
                        disabled={status !== "done" || !siteId}
                        className={cn(
                            "flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed",
                            subdomain
                                ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                                : "bg-white text-black hover:bg-white/90"
                        )}
                        title={subdomain ? `Live at ${subdomain}` : "Publish site"}
                    >
                        <Globe className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{subdomain ? "Live" : "Publish"}</span>
                        <span className="sm:hidden">{subdomain ? "Live" : "Go"}</span>
                    </button>
                </div>
            </div>

            {/* ===== MAIN LAYOUT — Sidebar + Content ===== */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                <div ref={overlayRef} className="hidden absolute inset-0 z-40" />

                {/* ===== LEFT SIDEBAR — Chat ===== */}
                <div
                    ref={sidebarRef}
                    className="relative w-full lg:w-[360px] lg:h-full border-b lg:border-b-0 bg-[rgba(10,10,25,0.5)] flex flex-col shrink-0"
                >
                    {/* Drag handle */}
                    <div
                        onMouseDown={onResizeStart}
                        onDoubleClick={onResizeReset}
                        className="hidden lg:flex absolute top-0 right-0 w-[6px] h-full cursor-col-resize z-50 items-center justify-center group translate-x-1/2"
                    >
                        <div
                            className={cn(
                                "w-[2px] h-full transition-colors duration-100",
                                isDragging ? "bg-white/80" : "bg-transparent group-hover:bg-white/40"
                            )}
                        />
                    </div>

                    {/* AI model header */}
                    <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2 h-14 shrink-0">
                    <span className="text-sm font-medium text-foreground">Weavo AI</span>
                    <div className="ml-auto flex items-center gap-1.5">
                        {status === "generating" && (
                            <span className="text-[11px] text-amber-400 font-medium">Generating...</span>
                        )}
                        {status === "preparing" && (
                            <span className="text-[11px] text-blue-400 font-medium">Preparing...</span>
                        )}
                        {status === "done" && !isChatLoading && (
                            <CreditCounter className="scale-[0.9] origin-right" />
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
                                <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                                    {/* Attached images — Gemini-style thumbnails */}
                                    {msg.images && msg.images.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {msg.images.map((img, imgIdx) => (
                                                <div
                                                    key={imgIdx}
                                                    className="relative group w-[120px] rounded-lg overflow-hidden border border-white/[0.08] bg-white/[0.03]"
                                                >
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={img.data}
                                                        alt={img.name}
                                                        className="w-full h-[72px] object-cover"
                                                    />
                                                    <div className="px-2 py-1.5">
                                                        <p className="text-[10px] text-foreground/70 truncate">{img.name}</p>
                                                        <p className="text-[10px] text-muted-foreground/50 uppercase">{img.type.split("/")[1]}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {msg.content && (
                                        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                                            {msg.content}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-2">
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

                                    {msg.status === "loading" && !msg.content && (
                                        <div className="flex items-center gap-2">
                                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                            </motion.div>
                                            <span className="text-xs text-purple-400 font-medium">Processing your request...</span>
                                        </div>
                                    )}

                                    {msg.status === "loading" && msg.content && (
                                        // Streaming — show content as it builds, with a subtle
                                        // cursor so the user knows it's still going.
                                        <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                                            {msg.content}
                                            <span className="inline-block w-[2px] h-[1em] align-text-bottom bg-purple-400 ml-0.5 animate-pulse" />
                                        </div>
                                    )}

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

                                            <div className="flex items-center gap-1 pt-2 border-t border-white/[0.06] mt-2 flex-wrap">
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

                                                <div className="flex items-center gap-1 ml-auto">
                                                    {prevHtml && (
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
                    ))}{/* Generation progress — shows animated steps during generation */}
                    {(status === "generating" || status === "preparing") && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3"
                        >
                            <GenerationProgress startTime={chatStartTime.current} />
                        </motion.div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Suggestion chips */}
                {showSuggestions && status === "done" && (
                    <div className="px-3 pt-2 shrink-0">
                        <div className="flex items-center gap-1.5">
                            <button
                                className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.06] transition-all shrink-0"
                                title="Refresh suggestions"
                            >
                                <RefreshCw className="w-3 h-3" />
                            </button>

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

                            <button
                                onClick={scrollSuggestions}
                                className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.06] transition-all shrink-0"
                                title="More suggestions"
                            >
                                <ChevronRight className="w-3 h-3" />
                            </button>

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
                <div
                    className="p-3 border-t border-white/[0.06] mt-auto shrink-0"
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleImageUpload(e.dataTransfer.files);
                    }}
                >
                    {/* Hidden file input */}
                    <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                        multiple
                        className="hidden"
                        onChange={(e) => handleImageUpload(e.target.files)}
                    />

                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden focus-within:border-purple-500/30 transition-colors">
                        {/* Attached images preview — shown above the input */}
                        {attachedImages.length > 0 && (
                            <div className="flex flex-wrap gap-2 px-3 pt-3 pb-1">
                                {attachedImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative group w-[100px] rounded-lg overflow-hidden border border-white/[0.1] bg-white/[0.04]"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={img.data}
                                            alt={img.name}
                                            className="w-full h-[60px] object-cover"
                                        />
                                        <div className="px-1.5 py-1">
                                            <p className="text-[9px] text-foreground/60 truncate">{img.name}</p>
                                            <p className="text-[9px] text-muted-foreground/40 uppercase">{img.type.split("/")[1]}</p>
                                        </div>
                                        <button
                                            onClick={() => removeAttachedImage(idx)}
                                            className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-2.5 h-2.5 text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={handleChatKeyDown}
                            placeholder={attachedImages.length > 0 ? "Describe what you want based on the image..." : "Make changes, add new features, ask for..."}
                            disabled={!canChat}
                            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-40 px-3 py-2.5"
                        />
                        <div className="flex items-center justify-between px-2 py-1.5 border-t border-white/[0.04]">
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => imageInputRef.current?.click()}
                                    disabled={!canChat}
                                    className={cn(
                                        "p-1.5 rounded-lg transition-all disabled:cursor-not-allowed",
                                        attachedImages.length > 0
                                            ? "text-purple-400 bg-purple-500/10"
                                            : "text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.06]"
                                    )}
                                    title="Attach reference image"
                                >
                                    <ImageIcon className="w-4 h-4" />
                                </button>
                                <button disabled={!canChat} className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.06] transition-all disabled:cursor-not-allowed" title="Voice input">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                                </button>
                                <button
                                    onClick={() => imageInputRef.current?.click()}
                                    disabled={!canChat}
                                    className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.06] transition-all disabled:cursor-not-allowed"
                                    title="Add file"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                                </button>
                            </div>
                            <button
                                onClick={handleChatSend}
                                disabled={!canChat || (!chatInput.trim() && attachedImages.length === 0)}
                                className={cn(
                                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all",
                                    canChat && (chatInput.trim() || attachedImages.length > 0)
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
                {/* Sub-bar */}
                <div className="h-11 border-b border-white/[0.06] flex items-center justify-between px-3 md:px-4 shrink-0 relative">
                    {/* Left group — Preview/Code toggle */}
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

                    {/* Middle group — Device toggle, absolutely centered */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center">
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
                    </div>

                    {/* Right group */}
                    <div className="hidden md:flex items-center gap-2 ml-auto">
                        <a
                            href={siteId ? `/preview/${siteId}` : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/[0.08] transition-all inline-flex items-center justify-center"
                            title="Open fullscreen"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Content area */}
                <div className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* PREVIEW TAB */}
                        {activeTab === "preview" && (
                            <div className={cn(
                                "flex-1 flex justify-center items-start min-h-0",
                                // Desktop: no padding, iframe fills; tablet/mobile: pad so the
                                // device frame doesn't touch the edges, and let the container
                                // scroll if the frame is taller than the viewport.
                                previewDevice === "desktop" ? "p-0" : "p-2 md:p-4 overflow-auto"
                            )}>
                                {status === "generating" ? (
                                    <div className="flex-1 flex items-center justify-center">
                                        <Spinner size={44} />
                                    </div>
                                ) : status === "preparing" ? (
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
                                ) : siteHtml ? (
                                    previewDevice === "desktop" ? (
                                        <iframe
                                            srcDoc={siteHtml}
                                            title="Website Preview"
                                            className={cn("flex-1 w-full h-full border-0 bg-white", isDragging && "pointer-events-none")}
                                            sandbox="allow-same-origin allow-scripts"
                                        />
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
                                                        className={cn("border-0 bg-white", isDragging && "pointer-events-none")}
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
                                                        className={cn("border-0 bg-white", isDragging && "pointer-events-none")}
                                                        sandbox="allow-scripts allow-same-origin"
                                                        style={{ width: "375px", height: "163.1%", transform: "scale(0.6133)", transformOrigin: "top left" }}
                                                    />
                                                </div>
                                                {/* Home indicator */}
                                                <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[70px] h-[3px] rounded-full bg-white/15" />
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex-1 flex items-center justify-center">
                                        <Spinner size={36} />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* CODE TAB */}
                        {activeTab === "code" && (
                            <div className="flex-1 overflow-auto scrollbar-thin bg-[#0d1117] p-4">
                                {siteHtml ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => copyToClipboard(siteHtml)}
                                            className="absolute top-2 right-2 flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs text-muted-foreground bg-white/[0.06] hover:bg-white/[0.1] transition-all"
                                        >
                                            <Copy className="w-3 h-3" />
                                            Copy
                                        </button>
                                        <pre className="text-xs text-[#c9d1d9] font-mono leading-relaxed whitespace-pre-wrap break-all">
                                            <code>{siteHtml}</code>
                                        </pre>
                                    </div>
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

            {siteId && (
                <PublishDialog
                    siteId={siteId}
                    currentSubdomain={subdomain}
                    open={publishOpen}
                    onClose={() => setPublishOpen(false)}
                    onPublished={(sub) => setSubdomain(sub)}
                    onUnpublished={() => setSubdomain(null)}
                />
            )}

            {/* ===== HISTORY DRAWER ===== */}
            <AnimatePresence>
                {historyOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setHistoryOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 280 }}
                            className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-[rgba(12,12,28,0.98)] border-l border-white/10 z-[100] flex flex-col"
                        >
                            <div className="h-12 px-4 border-b border-white/10 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2">
                                    <History className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Version history</span>
                                </div>
                                <button
                                    onClick={() => setHistoryOpen(false)}
                                    className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-3">
                                {versionsLoading ? (
                                    <div className="flex items-center justify-center h-32 text-xs text-muted-foreground">Loading…</div>
                                ) : versions.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-32 text-xs text-muted-foreground text-center px-6">
                                        No previous versions yet. Every edit from now on will be saved here so you can roll back.
                                    </div>
                                ) : (
                                    <ul className="flex flex-col gap-2">
                                        {versions.map((v) => (
                                            <li
                                                key={v.id}
                                                className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 hover:border-white/[0.15] transition-all"
                                            >
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div className="min-w-0">
                                                        <div className="text-xs font-medium text-foreground capitalize">
                                                            {v.source} edit
                                                        </div>
                                                        <div className="text-[11px] text-muted-foreground mt-0.5">
                                                            {new Date(v.created_at).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                {v.summary && (
                                                    <div className="text-[11px] text-muted-foreground truncate mb-2">{v.summary}</div>
                                                )}
                                                <button
                                                    disabled={restoringId === v.id}
                                                    onClick={async () => {
                                                        if (!siteId) return;
                                                        setRestoringId(v.id);
                                                        try {
                                                            const r = await fetch(`/api/sites/${siteId}/restore`, {
                                                                method: "POST",
                                                                headers: { "Content-Type": "application/json" },
                                                                body: JSON.stringify({ versionId: v.id }),
                                                            });
                                                            const d = await r.json();
                                                            if (r.ok && d.site_json?.html) {
                                                                setPrevHtml(siteHtml);
                                                                setSiteHtml(d.site_json.html);
                                                                setHistoryOpen(false);
                                                                // Refresh list so the "before restore" snapshot appears
                                                                const lr = await fetch(`/api/sites/${siteId}/versions`);
                                                                const ld = await lr.json();
                                                                setVersions(ld.versions || []);
                                                            }
                                                        } finally {
                                                            setRestoringId(null);
                                                        }
                                                    }}
                                                    className="w-full flex items-center justify-center gap-1.5 h-7 rounded-md text-[11px] font-medium bg-white/[0.06] hover:bg-white/[0.12] text-foreground disabled:opacity-50 transition-all"
                                                >
                                                    <RotateCcw className="w-3 h-3" />
                                                    {restoringId === v.id ? "Restoring…" : "Restore this version"}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
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
