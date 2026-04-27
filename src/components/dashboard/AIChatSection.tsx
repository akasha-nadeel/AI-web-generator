"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Sparkles,
  ChevronDown,
  ChevronRight,
  Wand2,
  Globe,
  ShoppingBag,
  Briefcase,
  Camera,
  Utensils,
  ImageIcon,
  Lock,
  Zap,
  Gem,
  Crown,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  INDUSTRIES,
  INDUSTRY_DEFAULT_PAGES,
  MODEL_COSTS,
  canUseModel,
  type ModelKey,
} from "@/lib/constants";
import { fadeUp, ease } from "@/lib/animations";
import { detectIndustryFromPrompt } from "@/lib/ai/prompts/modules/classifier";
import { useCreditsStore } from "@/stores/creditsStore";
import { PricingPopup } from "@/components/billing/PricingPopup";

// Aligned with wizardStore's overallFeel values so selection prefills cleanly
const MOODS = [
  { id: "minimal", label: "Minimal" },
  { id: "rich", label: "Rich" },
  { id: "corporate", label: "Corporate" },
  { id: "creative", label: "Creative" },
];

// Page count caps mirror StepPageSelection (free=5, paid=10). The auto-picked
// INDUSTRY_DEFAULT_PAGES list gets sliced to the user's plan cap so no page
// limit is silently bypassed by the dashboard chat fast-path.
const MAX_PAGES_FREE = 5;
const MAX_PAGES_PRO = 10;

// Model dropdown rendering data. ETA values are rough wall-clock targets
// from observed Sonnet ~80 t/s production: Haiku ~5x faster, Opus ~2x slower.
const MODEL_OPTIONS: Array<{
  key: ModelKey;
  label: string;
  icon: typeof Zap;
  etaSeconds: number;
}> = [
  { key: "haiku", label: "Fast", icon: Zap, etaSeconds: 30 },
  { key: "sonnet", label: "Balanced", icon: Gem, etaSeconds: 60 },
  { key: "opus", label: "Premium", icon: Crown, etaSeconds: 90 },
];

const SUGGESTION_CHIPS = [
  {
    icon: Globe,
    label: "SaaS landing page",
    prompt: "A modern SaaS landing page for a productivity tool with hero section, features grid, pricing plans, and testimonials",
    color: "text-blue-400"
  },
  {
    icon: ShoppingBag,
    label: "E-commerce store",
    prompt: "An elegant e-commerce fashion store with product showcase, lookbook gallery, shopping cart, and brand story section",
    color: "text-emerald-400"
  },
  {
    icon: Camera,
    label: "Portfolio website",
    prompt: "A creative portfolio website for a photographer with full-screen image galleries, about page, and contact form",
    color: "text-purple-400"
  },
  {
    icon: Utensils,
    label: "Restaurant website",
    prompt: "A stylish restaurant website with online menu, reservation system, chef profiles, and food gallery",
    color: "text-orange-400"
  },
  {
    icon: Briefcase,
    label: "Agency website",
    prompt: "A premium digital agency website with case studies, team section, services overview, and client testimonials",
    color: "text-cyan-400"
  },
];

/* ===== GEMINI-STYLE 4-POINT STAR ===== */

function GeminiStar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 4-point star like Google AI Studio */}
      <path
        d="M14 0L16.8 11.2L28 14L16.8 16.8L14 28L11.2 16.8L0 14L11.2 11.2L14 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ===== MAIN COMPONENT ===== */

interface AttachedImage {
  data: string; // base64 data URL
  name: string;
  type: string;
}

export function AIChatSection() {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Live plan + balance from credits store. Drives:
  //  - Default model (paid → sonnet, free → haiku)
  //  - Lock state of paid models in the dropdown
  // Refresh once on mount so a hard page-load doesn't lock paid users out
  // of Sonnet/Opus until something else triggers a balance refresh.
  const { plan, refresh: refreshCredits } = useCreditsStore();
  useEffect(() => {
    refreshCredits();
  }, [refreshCredits]);
  const isFreePlan = plan === "free";
  const maxPages = isFreePlan ? MAX_PAGES_FREE : MAX_PAGES_PRO;

  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("auto");
  const [selectedMood, setSelectedMood] = useState("minimal");
  const [selectedModel, setSelectedModel] = useState<ModelKey>("haiku");
  const [pricingOpen, setPricingOpen] = useState(false);
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);

  // Default the model to "sonnet" the moment we learn the user is paid.
  // Free users stay on haiku (the only model they can submit anyway).
  useEffect(() => {
    if (!isFreePlan && selectedModel === "haiku") {
      setSelectedModel("sonnet");
    }
    if (isFreePlan && selectedModel !== "haiku") {
      setSelectedModel("haiku");
    }
    // Intentionally only react to plan changes; user can still pick any
    // other model after this default fires.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFreePlan]);

  const selectedModelMeta = useMemo(
    () => MODEL_OPTIONS.find((m) => m.key === selectedModel) ?? MODEL_OPTIONS[0],
    [selectedModel]
  );

  // Auto-resize textarea
  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
      setError("");
      const el = e.target;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    },
    []
  );

  // Handle Enter submit (Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
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
            { data: e.target!.result as string, name: file.name, type: file.type },
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

  // One-click generation — bypasses the wizard. Mirrors the EXACT contract
  // StepModelSelection.handleGenerate uses (URL params + sessionStorage for
  // images + same prompt-string format) so quality is identical to the
  // wizard path. Anything that breaks parity here will silently degrade
  // generation quality vs the wizard's output. See plan §3 (Quality parity).
  const generateDirectly = useCallback(
    (description: string) => {
      // Industry resolution mirrors StepModelSelection.tsx:79-80:
      //   explicit dropdown → auto-detect → "general" fallback.
      const effectiveIndustry =
        selectedIndustry !== "auto"
          ? selectedIndustry
          : detectIndustryFromPrompt(description) || "general";

      // Build the SAME prompt string the wizard's model step builds, minus
      // the business-name fragment (dashboard chat doesn't collect one).
      // The "Build a … website" framing is load-bearing — the AI uses it as
      // the implicit "this is a website request" cue.
      const industryWord =
        effectiveIndustry && effectiveIndustry !== "general"
          ? `${effectiveIndustry} `
          : "";
      const finalPrompt = `Build a ${selectedMood} ${industryWord}website. ${description}`;

      // Auto-pick pages from the detected industry. Fall back to a sane
      // generic set when the industry has no defaults entry. Slice to the
      // user's plan cap so the page-count limit is respected (mirrors
      // StepPageSelection — free=5, paid=10).
      const defaultPages =
        INDUSTRY_DEFAULT_PAGES[effectiveIndustry] || [
          "Home",
          "About",
          "Services",
          "Pricing",
          "Contact",
        ];
      const pages = defaultPages.slice(0, maxPages);

      // Inspiration images travel via sessionStorage — same key the
      // /generate/[siteId] page reads on mount (StepModelSelection.tsx:90-97).
      if (attachedImages.length > 0) {
        try {
          sessionStorage.setItem(
            "pixora_inspiration_images",
            JSON.stringify(attachedImages.map((img) => img.data))
          );
        } catch {
          /* sessionStorage full — proceed without images rather than block */
        }
      }

      // Confirmation toast — runs BEFORE navigate so the user always sees
      // it. Per cost guard, paid users about to spend ~$0.30 on Sonnet (or
      // ~$1.20 on Opus) deserve to see what's happening.
      toast.success(
        `Generating with ${selectedModelMeta && MODEL_COSTS[selectedModel]?.name} — ~${selectedModelMeta?.etaSeconds}s`,
        {
          description: `${MODEL_COSTS[selectedModel].credits} credits will be deducted on success.`,
          duration: 4000,
        }
      );

      const params = new URLSearchParams({
        prompt: finalPrompt.trim(),
        industry: effectiveIndustry,
        mood: selectedMood || "modern",
        pages: pages.join(","),
        model: selectedModel,
      });

      router.push(`/generate/new?${params.toString()}`);
    },
    [
      attachedImages,
      maxPages,
      router,
      selectedIndustry,
      selectedModel,
      selectedModelMeta,
      selectedMood,
    ]
  );

  const handleGenerate = () => {
    if (!prompt.trim() && attachedImages.length === 0) {
      setError("Please describe the website you want to build");
      inputRef.current?.focus();
      return;
    }
    // Block free users from accidentally submitting on a locked model
    // (this shouldn't happen via UI since we lock the dropdown, but is
    // a defense against state races).
    if (!canUseModel(plan, selectedModel)) {
      setPricingOpen(true);
      return;
    }
    const description =
      prompt.trim() ||
      "A website inspired by the uploaded reference image(s)";
    generateDirectly(description);
  };


  const canSubmit = prompt.trim().length > 0 || attachedImages.length > 0;

  return (
    <div className="relative flex-1 flex flex-col">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={ease.smooth}
        className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-12 min-h-[calc(100vh-3.5rem)]"
      >
        {/* Hero heading — Google AI Studio style */}
        <div className="relative z-10 text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-medium tracking-tight leading-tight flex items-center justify-center gap-2 text-foreground/70">
            <span>Build your ideas with</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Weavo Logo" className="h-[1.6rem] md:h-[2rem] lg:h-[2.2rem] w-auto object-contain opacity-70 dark:invert-0 invert" />
          </h1>
        </div>

        {/* Main input area */}
        <div className="relative z-10 w-full max-w-[780px]">
          {/* Animated rainbow border wrapper — Google AI Studio style */}
          <div
            className={cn(
              "gemini-border-wrap rounded-[18px] p-[2px] transition-opacity duration-500",
              isFocused || canSubmit ? "opacity-100" : "opacity-70"
            )}
          >
            {/* Inner card — solid bg so gradient only shows as border */}
            <div
              className={cn(
                "relative z-10 rounded-[16px] overflow-hidden transition-all duration-300",
                isFocused ? "bg-card" : "bg-card"
              )}
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

            {/* Textarea */}
            <textarea
              ref={inputRef}
              value={prompt}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={attachedImages.length > 0 ? "Describe what you want based on the image..." : "Describe an app and let Weavo do the rest"}
              rows={2}
              className="w-full bg-transparent text-[15px] md:text-base resize-none focus:outline-none px-5 pt-5 pb-3 min-h-[88px] max-h-[200px] scrollbar-thin text-foreground"
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleImageUpload(e.dataTransfer.files);
              }}
            />

            {/* Attached images preview — Gemini style */}
            <AnimatePresence>
              {attachedImages.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 px-4 pb-2">
                    {attachedImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative group flex items-center gap-2.5 rounded-xl bg-foreground/[0.06] border border-border pr-3 overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.data}
                          alt={img.name}
                          className="w-[52px] h-[52px] object-cover"
                        />
                        <div className="py-1.5 min-w-0">
                          <p className="text-[11px] text-foreground/70 truncate max-w-[120px]">{img.name}</p>
                          <p className="text-[10px] text-foreground/30 uppercase">{img.type.split("/")[1]}</p>
                        </div>
                        <button
                          onClick={() => removeAttachedImage(idx)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3 text-foreground" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toolbar — Gemini-style: ghost pills, theme-aware, compact.
                All 4 controls (image, industry, model, mood) preserved;
                only the styling changed to match Gemini's bar. */}
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex items-center gap-1.5">
                {/* Image upload — circular ghost button (Gemini's `+` style) */}
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-full transition-all",
                    attachedImages.length > 0
                      ? "bg-blue-500/15 text-blue-500 dark:text-blue-400 hover:bg-blue-500/20"
                      : "text-foreground/85 hover:text-foreground hover:bg-foreground/[0.07]"
                  )}
                  title="Upload reference image"
                >
                  <ImageIcon className="w-[17px] h-[17px]" strokeWidth={2} />
                </button>

                {/* Industry dropdown — ghost pill */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 h-9 px-3 rounded-full text-[13px] font-medium text-foreground/85 hover:text-foreground hover:bg-foreground/[0.07] transition-all focus:outline-none">
                    <Sparkles className="w-3.5 h-3.5 opacity-90" />
                    <span className="hidden sm:inline max-w-[110px] truncate">
                      {selectedIndustry === "auto" ? "Auto-detect" : INDUSTRIES.find(i => i.id === selectedIndustry)?.label || "Auto-detect"}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-52 bg-popover backdrop-blur-xl border-border max-h-64 overflow-y-auto rounded-2xl shadow-lg"
                  >
                    <DropdownMenuItem
                      onClick={() => setSelectedIndustry("auto")}
                      className={cn("text-xs rounded-lg", selectedIndustry === "auto" && "bg-foreground/[0.08]")}
                    >
                      <Wand2 className="w-3.5 h-3.5 mr-2" />
                      Auto-detect
                    </DropdownMenuItem>
                    {INDUSTRIES.map((ind) => (
                      <DropdownMenuItem
                        key={ind.id}
                        onClick={() => setSelectedIndustry(ind.id)}
                        className={cn("text-xs rounded-lg", selectedIndustry === ind.id && "bg-foreground/[0.08]")}
                      >
                        {ind.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mood dropdown — ghost pill */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 h-9 px-3 rounded-full text-[13px] font-medium text-foreground/85 hover:text-foreground hover:bg-foreground/[0.07] transition-all focus:outline-none">
                    <span className="capitalize">{selectedMood}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-popover backdrop-blur-xl border-border rounded-2xl shadow-lg"
                  >
                    {MOODS.map((mood) => (
                      <DropdownMenuItem
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        className={cn("text-xs rounded-lg", selectedMood === mood.id && "bg-foreground/[0.08]")}
                      >
                        {mood.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Right group — Model dropdown sits IMMEDIATELY left of Send,
                  matching Gemini's "Fast ▾ + 🎤" arrangement (we use a Send
                  arrow instead of the mic). Right-aligned dropdown content
                  so it doesn't get clipped at the edge of the chat card. */}
              <div className="flex items-center gap-1.5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 h-9 px-3 rounded-full text-[13px] font-medium text-foreground/85 hover:text-foreground hover:bg-foreground/[0.07] transition-all focus:outline-none">
                    <selectedModelMeta.icon className="w-3.5 h-3.5 opacity-90" />
                    <span className="hidden sm:inline">
                      {selectedModelMeta.label}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 bg-popover backdrop-blur-xl border-border rounded-2xl shadow-lg"
                  >
                    {MODEL_OPTIONS.map((m) => {
                      const cost = MODEL_COSTS[m.key];
                      const isLocked = !canUseModel(plan, m.key);
                      const Icon = m.icon;
                      return (
                        <DropdownMenuItem
                          key={m.key}
                          onClick={() => {
                            if (isLocked) {
                              setPricingOpen(true);
                            } else {
                              setSelectedModel(m.key);
                            }
                          }}
                          className={cn(
                            "text-xs flex items-start gap-2.5 py-2 rounded-lg",
                            selectedModel === m.key && "bg-foreground/[0.08]"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-foreground/90">
                                {cost.name.replace("Claude ", "")}
                              </span>
                              <span className="text-foreground/40">·</span>
                              <span className="text-muted-foreground tabular-nums">
                                {cost.credits} credits
                              </span>
                              {isLocked && (
                                <Lock className="w-2.5 h-2.5 ml-auto text-muted-foreground/60" />
                              )}
                            </div>
                            <p className="text-[10px] text-muted-foreground/80 mt-0.5">
                              {cost.detail}
                            </p>
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Send button — Gemini-style circular submit. Active state
                    when prompt has text or images attached; soft-disabled
                    otherwise but still clickable (shows the friendly error). */}
                <button
                  onClick={handleGenerate}
                  aria-label="Send"
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-full transition-all",
                    canSubmit
                      ? "bg-foreground text-background hover:opacity-90 active:scale-95"
                      : "bg-foreground/[0.08] text-foreground/40 hover:bg-foreground/[0.12] cursor-pointer"
                  )}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          </div>

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive mt-2 text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Suggestion chips — Gemini style */}
          <div className="relative mt-4 group/chips">
            <div
              className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1 scroll-smooth"
              id="suggestion-chips-scroll"
            >
              {SUGGESTION_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => {
                    setPrompt(chip.prompt);
                    setError("");
                    // Auto-resize textarea
                    setTimeout(() => {
                      if (inputRef.current) {
                        inputRef.current.style.height = "auto";
                        inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 160)}px`;
                        inputRef.current.focus();
                      }
                    }, 0);
                  }}
                  className="flex items-center gap-2 shrink-0 h-9 px-4 rounded-full text-sm font-medium bg-foreground/[0.05] border border-border text-foreground/70 hover:bg-foreground/[0.1] hover:border-foreground/20 hover:text-foreground transition-all active:scale-[0.97]"
                >
                  <chip.icon className={cn("w-3.5 h-3.5", chip.color)} />
                  <span className="whitespace-nowrap">{chip.label}</span>
                </button>
              ))}
            </div>
            {/* Scroll arrow indicator */}
            <button
              onClick={() => {
                const el = document.getElementById('suggestion-chips-scroll');
                if (el) el.scrollBy({ left: 200, behavior: 'smooth' });
              }}
              className="absolute right-0 top-0 h-9 w-10 flex items-center justify-center bg-gradient-to-l from-background via-background/90 to-transparent opacity-0 group-hover/chips:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4 text-foreground/50" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Pricing popup — opens when free user picks a locked model from the
          dropdown. Same component the wizard's StepModelSelection uses. */}
      <PricingPopup
        open={pricingOpen}
        onClose={() => setPricingOpen(false)}
        title="Unlock premium models"
        subtitle="Sonnet and Opus produce richer designs and full library matching. Upgrade to a credit pack to use them."
      />
    </div>
  );
}
