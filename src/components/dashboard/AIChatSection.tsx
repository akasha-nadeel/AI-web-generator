"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { INDUSTRIES, INDUSTRY_DEFAULT_PAGES } from "@/lib/constants";
import { fadeUp, ease } from "@/lib/animations";

const MOODS = [
  { id: "minimal", label: "Minimal" },
  { id: "bold", label: "Bold" },
  { id: "playful", label: "Playful" },
  { id: "classic", label: "Classic" },
  { id: "editorial", label: "Editorial" },
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

/* ===== TYPES ===== */

interface AIChatSectionProps {
  credits: number;
  plan: "free" | "pro" | "business";
}

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

export function AIChatSection({ credits, plan }: AIChatSectionProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("auto");
  const [selectedMood, setSelectedMood] = useState("minimal");
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);

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

  // Main generation handler — redirect to generate page
  const handleGenerate = () => {
    if (!prompt.trim() && attachedImages.length === 0) {
      setError("Please describe the website you want to build");
      inputRef.current?.focus();
      return;
    }

    const industry = selectedIndustry === "auto" ? "agency" : selectedIndustry;
    const pages = INDUSTRY_DEFAULT_PAGES[industry] || ["Home", "About", "Contact"];

    // Store images in sessionStorage so the generate page can pick them up
    if (attachedImages.length > 0) {
      try {
        sessionStorage.setItem(
          "pixora_inspiration_images",
          JSON.stringify(attachedImages.map((img) => img.data))
        );
      } catch { /* storage full — proceed without images */ }
    }

    const finalPrompt = prompt.trim() || "Generate a website that matches the uploaded reference image(s)";

    // Encode params and redirect to generate page
    const params = new URLSearchParams({
      prompt: finalPrompt,
      industry,
      mood: selectedMood,
      pages: pages.join(","),
    });

    router.push(`/generate/new?${params.toString()}`);
  };

  // "I'm feeling lucky" — generate with a random prompt
  const handleFeelingLucky = () => {
    const luckyPrompts = [
      "A modern portfolio for a creative designer with dark theme and smooth animations",
      "A SaaS landing page for an AI productivity tool with gradient hero section",
      "A restaurant website with online reservations, food gallery, and chef profiles",
      "A fitness studio website with class schedules, trainer bios, and membership plans",
      "A tech startup landing page with 3D illustrations and pricing section",
      "An e-commerce fashion store with lookbook gallery and product showcase",
      "A photography portfolio with full-screen image galleries and about page",
      "A travel agency website with destination showcases, tours, and booking forms",
    ];
    const randomPrompt = luckyPrompts[Math.floor(Math.random() * luckyPrompts.length)];

    const industry = selectedIndustry === "auto" ? "agency" : selectedIndustry;
    const pages = INDUSTRY_DEFAULT_PAGES[industry] || ["Home", "About", "Contact"];

    const params = new URLSearchParams({
      prompt: randomPrompt,
      industry,
      mood: selectedMood,
      pages: pages.join(","),
    });

    router.push(`/generate/new?${params.toString()}`);
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
          <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-normal tracking-tight leading-tight flex items-center justify-center gap-1"
            style={{ color: '#c4c7c5' }}
          >
            <span>Build your ideas with Weavo</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Weavo Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-70" />
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
                isFocused ? "bg-[#1c1a24]" : "bg-[#18161f]"
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
              className="w-full bg-transparent text-[15px] md:text-base resize-none focus:outline-none px-5 pt-5 pb-3 min-h-[88px] max-h-[200px] scrollbar-thin"
              style={{
                color: '#e3e3e3',
              }}
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
                        className="relative group flex items-center gap-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] pr-3 overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.data}
                          alt={img.name}
                          className="w-[52px] h-[52px] object-cover"
                        />
                        <div className="py-1.5 min-w-0">
                          <p className="text-[11px] text-white/70 truncate max-w-[120px]">{img.name}</p>
                          <p className="text-[10px] text-white/30 uppercase">{img.type.split("/")[1]}</p>
                        </div>
                        <button
                          onClick={() => removeAttachedImage(idx)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-2 px-4 py-3">
              <div className="flex items-center gap-1.5">
                {/* Image upload button */}
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg border transition-all",
                    attachedImages.length > 0
                      ? "border-blue-400/30 bg-blue-400/10 text-blue-400"
                      : "border-white/[0.08] bg-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-white/[0.1]"
                  )}
                  title="Upload reference image"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>

                {/* Industry dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs bg-white/[0.06] border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.1] transition-all">
                    <Sparkles className="w-3 h-3" />
                    <span className="hidden sm:inline max-w-[100px] truncate">
                      {selectedIndustry === "auto" ? "Auto-detect" : INDUSTRIES.find(i => i.id === selectedIndustry)?.label || "Auto-detect"}
                    </span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-52 bg-[rgba(20,20,40,0.95)] backdrop-blur-xl border-white/[0.1] max-h-64 overflow-y-auto"
                  >
                    <DropdownMenuItem
                      onClick={() => setSelectedIndustry("auto")}
                      className={cn("text-xs", selectedIndustry === "auto" && "bg-white/[0.08]")}
                    >
                      <Wand2 className="w-3.5 h-3.5 mr-2" />
                      Auto-detect
                    </DropdownMenuItem>
                    {INDUSTRIES.map((ind) => (
                      <DropdownMenuItem
                        key={ind.id}
                        onClick={() => setSelectedIndustry(ind.id)}
                        className={cn("text-xs", selectedIndustry === ind.id && "bg-white/[0.08]")}
                      >
                        {ind.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mood dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs bg-white/[0.06] border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.1] transition-all">
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
                        className={cn("text-xs", selectedMood === mood.id && "bg-white/[0.08]")}
                      >
                        {mood.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2">
                {/* Submit button (shows only when there's text) */}
                {canSubmit && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleGenerate}
                    className="flex items-center justify-center w-9 h-9 rounded-full transition-all hover:opacity-80"
                    style={{ backgroundColor: '#8ab4f8', color: '#1a1a1a' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                )}

                {/* I'm feeling lucky button — white pill like Google */}
                <button
                  onClick={handleFeelingLucky}
                  className="flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium transition-all hover:bg-white/[0.12] active:scale-[0.98] bg-white/[0.07] border border-white/[0.1] text-white/80"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span className="whitespace-nowrap">I&apos;m feeling lucky</span>
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
              className="text-xs text-red-400 mt-2 text-center"
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
                  className="flex items-center gap-2 shrink-0 h-9 px-4 rounded-full text-sm font-medium bg-white/[0.05] border border-white/[0.08] text-white/70 hover:bg-white/[0.1] hover:border-white/[0.15] hover:text-white/90 transition-all active:scale-[0.97]"
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
              className="absolute right-0 top-0 h-9 w-10 flex items-center justify-center bg-gradient-to-l from-[#0e0c15] via-[#0e0c15]/90 to-transparent opacity-0 group-hover/chips:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4 text-white/50" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
