"use client";

import { useEffect, useState } from "react";
import { useWizardStore } from "@/stores/wizardStore";
import { INDUSTRY_DEFAULT_PAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Plus } from "lucide-react";

export function StepPageSelection() {
  const {
    industry,
    selectedPages,
    setSelectedPages,
    togglePage,
    setStep,
  } = useWizardStore();

  const [customPage, setCustomPage] = useState("");

  // Pre-select industry defaults on mount
  useEffect(() => {
    if (selectedPages.length <= 1 && industry) {
      const defaults = INDUSTRY_DEFAULT_PAGES[industry] || ["Home", "About", "Contact"];
      setSelectedPages(defaults);
    }
  }, [industry, selectedPages.length, setSelectedPages]);

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

  const handleNext = () => setStep(5);

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-foreground">Choose your pages</h2>
      <p className="text-muted-foreground text-base mb-7 leading-relaxed max-w-lg">
        Select the pages you need. We&apos;ve pre-selected recommended pages for
        your industry.
      </p>

      <div className="flex-1 space-y-5">
        {/* Page chips */}
        <div className="flex flex-wrap gap-2">
          {allPages.map((page) => {
            const isSelected = selectedPages.includes(page);
            return (
              <button
                key={page}
                onClick={() => togglePage(page)}
                className={cn(
                  "inline-flex items-center gap-1.5 pl-3 pr-3.5 py-2 rounded-full border text-[13px] font-medium transition-all cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/[0.08] text-primary shadow-[0_0_0_1px_rgba(96,165,250,0.4)]"
                    : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />}
                {page}
              </button>
            );
          })}
        </div>

        {/* Add custom page */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={customPage}
            onChange={(e) => setCustomPage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
            placeholder="Add custom page..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-transparent border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button
            onClick={handleAddCustom}
            className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          {selectedPages.length} page{selectedPages.length !== 1 ? "s" : ""}{" "}
          selected
        </p>
      </div>

      {/* Footer Buttons */}
      <div className="mt-8 flex justify-between items-center pt-5 border-t border-border shrink-0">
        <button
          onClick={() => setStep(3)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border border-border bg-transparent text-foreground hover:bg-muted"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
