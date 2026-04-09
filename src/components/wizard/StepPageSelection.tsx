"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizardStore";
import { GradientButton } from "@/components/shared/GradientButton";
import { INDUSTRY_DEFAULT_PAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft, Sparkles, Check, Plus } from "lucide-react";
import { useState } from "react";

export function StepPageSelection() {
  const router = useRouter();
  const {
    industry,
    selectedPages,
    setSelectedPages,
    togglePage,
    setStep,
    isGenerating,
    setIsGenerating,
    businessName,
    description,
    colorPalette,
    fontStyle,
    overallFeel,
  } = useWizardStore();

  const [customPage, setCustomPage] = useState("");

  // Pre-select industry defaults on mount
  useEffect(() => {
    if (selectedPages.length <= 1 && industry) {
      const defaults = INDUSTRY_DEFAULT_PAGES[industry] || ["Home", "About", "Contact"];
      setSelectedPages(defaults);
    }
  }, [industry]);

  const allPages = [
    "Home",
    "About",
    "Services",
    "Products",
    "Portfolio",
    "Gallery",
    "Blog",
    "Team",
    "Pricing",
    "FAQ",
    "Contact",
    "Menu",
    "Testimonials",
    "Careers",
    "Events",
  ];

  const handleAddCustom = () => {
    if (customPage.trim() && !selectedPages.includes(customPage.trim())) {
      togglePage(customPage.trim());
      setCustomPage("");
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          industry,
          description,
          colorPalette,
          fontStyle,
          overallFeel,
          pages: selectedPages,
        }),
      });

      const data = await res.json();

      if (data.siteId) {
        router.push(`/editor/${data.siteId}`);
      } else {
        // If AI is not connected yet, redirect to dashboard
        router.push("/dashboard");
      }
    } catch {
      router.push("/dashboard");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Choose your pages</h2>
      <p className="text-muted-foreground mb-8">
        Select the pages you need. We&apos;ve pre-selected recommended pages for
        your industry.
      </p>

      {/* Page grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mb-6">
        {allPages.map((page) => (
          <button
            key={page}
            onClick={() => togglePage(page)}
            className={cn(
              "p-3 rounded-xl border transition-all text-sm cursor-pointer flex items-center justify-center gap-2",
              selectedPages.includes(page)
                ? "border-purple-500 bg-purple-500/10 text-foreground"
                : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20"
            )}
          >
            {selectedPages.includes(page) && <Check className="w-3 h-3" />}
            {page}
          </button>
        ))}
      </div>

      {/* Add custom page */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={customPage}
          onChange={(e) => setCustomPage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
          placeholder="Add custom page..."
          className="flex-1 px-4 py-2 rounded-xl glass-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
        <GradientButton variant="secondary" size="sm" onClick={handleAddCustom}>
          <Plus className="w-4 h-4" />
        </GradientButton>
      </div>

      <p className="text-xs text-muted-foreground mb-6">
        {selectedPages.length} page{selectedPages.length !== 1 ? "s" : ""}{" "}
        selected
      </p>

      <div className="flex justify-between">
        <GradientButton variant="secondary" onClick={() => setStep(3)}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </GradientButton>
        <GradientButton
          onClick={handleGenerate}
          className={cn(isGenerating && "opacity-70 pointer-events-none")}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Website
            </>
          )}
        </GradientButton>
      </div>
    </div>
  );
}
