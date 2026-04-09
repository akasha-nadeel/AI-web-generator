"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUp,
  ChevronDown,
  Paperclip,
  Zap,
  Globe,
  Layout,
  User,
  ShoppingBag,
  FileText,
  Wand2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { INDUSTRIES, INDUSTRY_DEFAULT_PAGES } from "@/lib/constants";
import { fadeUp, ease } from "@/lib/animations";

/* ===== TYPES ===== */

interface AIChatSectionProps {
  credits: number;
  plan: "free" | "pro" | "business";
}

interface Category {
  id: string;
  label: string;
  icon: typeof Globe;
  industry: string;
  placeholder: string;
}

/* ===== CONSTANTS ===== */

const CATEGORIES: Category[] = [
  {
    id: "website",
    label: "Website",
    icon: Globe,
    industry: "auto",
    placeholder: "Describe the website you want to build...\ne.g. A modern restaurant site with online reservations, menu gallery, and chef profiles",
  },
  {
    id: "landing",
    label: "Landing Page",
    icon: Layout,
    industry: "saas",
    placeholder: "Describe your landing page...\ne.g. A SaaS product launch page with hero, features, pricing, and sign-up form",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: User,
    industry: "portfolio",
    placeholder: "Describe your portfolio site...\ne.g. A minimal creative portfolio showcasing photography and design work",
  },
  {
    id: "store",
    label: "Online Store",
    icon: ShoppingBag,
    industry: "ecommerce",
    placeholder: "Describe your online store...\ne.g. A fashion boutique with product listings, lookbook gallery, and about page",
  },
  {
    id: "blog",
    label: "Blog",
    icon: FileText,
    industry: "blog",
    placeholder: "Describe your blog site...\ne.g. A tech blog with featured articles, categories, and author profiles",
  },
  {
    id: "freeform",
    label: "Freeform",
    icon: Wand2,
    industry: "auto",
    placeholder: "Describe anything you want to build...\nBe as creative and detailed as you like — the AI will figure out the rest",
  },
];

const MOODS = [
  { id: "minimal", label: "Minimal" },
  { id: "bold", label: "Bold" },
  { id: "playful", label: "Playful" },
  { id: "classic", label: "Classic" },
  { id: "editorial", label: "Editorial" },
];

const GENERATION_PHASES = [
  "Understanding your vision...",
  "Choosing the perfect layout...",
  "Selecting components...",
  "Generating your website...",
];

/* ===== MAIN COMPONENT ===== */

export function AIChatSection({ credits, plan }: AIChatSectionProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [prompt, setPrompt] = useState("");
  const [activeCategory, setActiveCategory] = useState("website");
  const [selectedIndustry, setSelectedIndustry] = useState("auto");
  const [selectedMood, setSelectedMood] = useState("minimal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState(0);
  const [error, setError] = useState("");

  // Cycle generation phase text
  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setGenerationPhase((prev) => (prev + 1) % GENERATION_PHASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Auto-resize textarea
  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
      setError("");
      const el = e.target;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
    },
    []
  );

  // Get active category config
  const category = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  // Resolve the effective industry
  const getEffectiveIndustry = useCallback(() => {
    if (selectedIndustry !== "auto") return selectedIndustry;
    if (category.industry !== "auto") return category.industry;
    return "agency"; // fallback
  }, [selectedIndustry, category.industry]);

  // Handle category change
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.industry !== "auto") {
      setSelectedIndustry(cat.industry);
    } else {
      setSelectedIndustry("auto");
    }
  };

  // Handle Ctrl+Enter submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  // Map mood to font style
  const getMoodFontStyle = () => {
    const map: Record<string, string> = {
      minimal: "modern",
      bold: "bold",
      playful: "playful",
      classic: "classic",
      editorial: "editorial",
    };
    return map[selectedMood] || "modern";
  };

  // Main generation handler
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please describe the website you want to build");
      textareaRef.current?.focus();
      return;
    }

    if (credits <= 0) {
      setError("No credits remaining. Please upgrade your plan.");
      return;
    }

    setIsGenerating(true);
    setGenerationPhase(0);
    setError("");

    const industry = getEffectiveIndustry();
    const pages =
      INDUSTRY_DEFAULT_PAGES[industry] || ["Home", "About", "Contact"];

    // For landing pages, only use Home
    const effectivePages =
      activeCategory === "landing" ? ["Home"] : pages;

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: "My Website",
          industry,
          description: prompt.trim(),
          colorPalette: {
            primary: "#7c3aed",
            secondary: "#4c1d95",
            accent: "#a78bfa",
            bg: "#0f0f23",
            text: "#eef2ff",
          },
          fontStyle: getMoodFontStyle(),
          overallFeel: selectedMood,
          pages: effectivePages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      if (data.siteId) {
        router.push(`/editor/${data.siteId}`);
      } else {
        throw new Error("No site returned");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setIsGenerating(false);
    }
  };

  // Get industry label for dropdown display
  const getIndustryLabel = () => {
    if (selectedIndustry === "auto") return "Auto-detect";
    const ind = INDUSTRIES.find((i) => i.id === selectedIndustry);
    return ind?.label || "Auto-detect";
  };

  const canSubmit = prompt.trim().length > 0 && credits > 0 && !isGenerating;

  return (
    <div className="relative flex-1 flex flex-col">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={ease.smooth}
        className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-12 min-h-[calc(100vh-3.5rem)]"
      >
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />

        {/* Hero heading */}
        <div className="relative z-10 text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
            <span className="italic font-light text-white/60">Build </span>
            <span className="gradient-text">with ideas</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Describe your vision and let AI craft your website
          </p>
        </div>

        {/* Main input area */}
        <div className="relative z-10 w-full max-w-2xl">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[24px] overflow-hidden transition-all focus-within:border-purple-500/30 focus-within:bg-white/[0.04]">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={category.placeholder}
              disabled={isGenerating}
              rows={3}
              className="w-full bg-transparent text-foreground text-sm md:text-base placeholder:text-muted-foreground/60 resize-none focus:outline-none p-4 pb-2 min-h-[120px] max-h-[240px] disabled:opacity-50"
            />

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-2 px-3 py-2.5 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                {/* Industry dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs bg-white/[0.06] border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.1] transition-all">
                    <Sparkles className="w-3 h-3" />
                    <span className="hidden sm:inline max-w-[100px] truncate">
                      {getIndustryLabel()}
                    </span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-52 bg-[rgba(20,20,40,0.95)] backdrop-blur-xl border-white/[0.1] max-h-64 overflow-y-auto"
                  >
                    <DropdownMenuItem
                      onClick={() => setSelectedIndustry("auto")}
                      className={cn(
                        "text-xs",
                        selectedIndustry === "auto" && "bg-white/[0.08]"
                      )}
                    >
                      <Wand2 className="w-3.5 h-3.5 mr-2" />
                      Auto-detect
                    </DropdownMenuItem>
                    {INDUSTRIES.map((ind) => (
                      <DropdownMenuItem
                        key={ind.id}
                        onClick={() => setSelectedIndustry(ind.id)}
                        className={cn(
                          "text-xs",
                          selectedIndustry === ind.id && "bg-white/[0.08]"
                        )}
                      >
                        {ind.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mood/style dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs bg-white/[0.06] border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.1] transition-all">
                    <span className="capitalize">{selectedMood}</span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-[rgba(20,20,40,0.95)] backdrop-blur-xl border-white/[0.1]"
                  >
                    {MOODS.map((mood) => (
                      <DropdownMenuItem
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        className={cn(
                          "text-xs",
                          selectedMood === mood.id && "bg-white/[0.08]"
                        )}
                      >
                        {mood.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Attachment button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-muted-foreground/40 cursor-not-allowed"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Image upload coming soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center gap-2">
                {/* Credits badge */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Zap className="w-3 h-3" />
                  <span>{credits}</span>
                </div>

                {/* Send button */}
                <button
                  onClick={handleGenerate}
                  disabled={!canSubmit}
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-full transition-all",
                    canSubmit
                      ? "bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95"
                      : "bg-white/[0.06] text-muted-foreground/40 cursor-not-allowed"
                  )}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 mt-2 text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Ctrl+Enter hint */}
          <p className="text-[11px] text-muted-foreground/40 text-center mt-2">
            Press <kbd className="px-1 py-0.5 rounded bg-white/[0.06] text-muted-foreground/60 font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-white/[0.06] text-muted-foreground/60 font-mono text-[10px]">Enter</kbd> to generate
          </p>
        </div>

        {/* Category pills */}
        <div className="relative z-10 flex items-center gap-2 mt-8 overflow-x-auto pb-1 px-4 md:px-0 max-w-full scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              disabled={isGenerating}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-all shrink-0",
                activeCategory === cat.id
                  ? "border-purple-500 bg-purple-500/10 text-foreground"
                  : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-white/[0.15] hover:text-foreground"
              )}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Generating overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            {/* Pulsing icon */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20"
            >
              <Sparkles className="w-7 h-7 text-white" />
            </motion.div>

            {/* Phase text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={generationPhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-foreground font-medium mb-4"
              >
                {GENERATION_PHASES[generationPhase]}
              </motion.p>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: "90%" }}
                transition={{ duration: 15, ease: "easeOut" }}
              />
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              This may take a moment...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
