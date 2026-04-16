"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizardStore";
import { INDUSTRY_DEFAULT_PAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Sparkles, Check, Plus } from "lucide-react";

export function StepPageSelection() {
  const router = useRouter();
  const {
    industry,
    selectedPages,
    setSelectedPages,
    togglePage,
    setStep,
    businessName,
    description,
    overallFeel,
    inspirationImages,
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

  const handleGenerate = () => {
    // Build a rich prompt from wizard data
    const prompt = `Build a ${overallFeel} ${industry} website for "${businessName}". ${description}`;

    // Store inspiration images in sessionStorage so the generate page picks them up
    if (inspirationImages.length > 0) {
      try {
        sessionStorage.setItem(
          "pixora_inspiration_images",
          JSON.stringify(inspirationImages)
        );
      } catch { /* storage full — proceed without images */ }
    }

    // Navigate to generate page with URL params — same flow as dashboard
    const params = new URLSearchParams({
      prompt: prompt.trim(),
      industry,
      mood: overallFeel || "modern",
      pages: selectedPages.join(","),
    });

    router.push(`/generate/new?${params.toString()}`);
  };

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Choose your pages</h2>
      <p className="text-white/60 text-base mb-10 leading-relaxed max-w-lg">
        Select the pages you need. We&apos;ve pre-selected recommended pages for
        your industry.
      </p>

      <div className="flex-1 space-y-8">
        {/* Page chips */}
        <div className="flex flex-wrap gap-3">
          {allPages.map((page) => {
            const isSelected = selectedPages.includes(page);
            return (
              <button
                key={page}
                onClick={() => togglePage(page)}
                className={cn(
                  "px-5 py-2.5 rounded-full border text-sm font-medium transition-all cursor-pointer flex items-center gap-2",
                  isSelected
                    ? "border-blue-400 bg-blue-400/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white/80"
                )}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                {page}
              </button>
            );
          })}
        </div>

        {/* Add custom page */}
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={customPage}
            onChange={(e) => setCustomPage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
            placeholder="Add custom page..."
            className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
          />
          <button
            onClick={handleAddCustom}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-white/60" />
          </button>
        </div>

        <p className="text-sm text-white/50">
          {selectedPages.length} page{selectedPages.length !== 1 ? "s" : ""}{" "}
          selected
        </p>
      </div>

      {/* Footer Buttons */}
      <div className="mt-12 flex justify-between items-center pt-6 border-t border-white/5 shrink-0">
        <button
          onClick={() => setStep(3)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/10 bg-transparent text-white hover:bg-white/5"
        >
          Back
        </button>
        <button
          onClick={handleGenerate}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 bg-white text-black hover:bg-white/90"
        >
          <Sparkles className="w-4 h-4" />
          Generate Website
        </button>
      </div>
    </div>
  );
}
