"use client";

import { useEffect, useState } from "react";
import { useWizardStore } from "@/stores/wizardStore";
import { useCreditsStore } from "@/stores/creditsStore";
import { INDUSTRY_DEFAULT_PAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Plus, Lock, Sparkles } from "lucide-react";

const MAX_PAGES_FREE = 5;
const MAX_PAGES_PRO = 10;

export function StepPageSelection() {
  const {
    industry,
    selectedPages,
    setSelectedPages,
    togglePage,
    setStep,
  } = useWizardStore();

  const { plan, refresh } = useCreditsStore();
  const [customPage, setCustomPage] = useState("");

  // Refresh plan once so the cap is correct on first render after a
  // hard refresh (otherwise plan defaults to "free" and pro users get
  // unfairly capped until something else triggers a balance refresh).
  useEffect(() => {
    refresh();
  }, [refresh]);

  const isFree = plan === "free";
  const maxPages = isFree ? MAX_PAGES_FREE : MAX_PAGES_PRO;
  const atLimit = selectedPages.length >= maxPages;

  // Pre-select industry defaults on mount, but trim to the user's cap
  // so a free user landing here doesn't immediately exceed their quota.
  useEffect(() => {
    if (selectedPages.length <= 1 && industry) {
      const defaults = INDUSTRY_DEFAULT_PAGES[industry] || ["Home", "About", "Contact"];
      setSelectedPages(defaults.slice(0, maxPages));
    }
  }, [industry, selectedPages.length, setSelectedPages, maxPages]);

  // If the user's plan changed (e.g. downgrade after they had 8 pages),
  // trim back to the new cap so they can't sneak past it.
  useEffect(() => {
    if (selectedPages.length > maxPages) {
      setSelectedPages(selectedPages.slice(0, maxPages));
    }
  }, [maxPages, selectedPages, setSelectedPages]);

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

  const handleTogglePage = (page: string) => {
    const isSelected = selectedPages.includes(page);
    // Block adding a NEW page when already at cap; always allow removal.
    if (!isSelected && atLimit) return;
    togglePage(page);
  };

  const handleAddCustom = () => {
    const trimmed = customPage.trim();
    if (!trimmed) return;
    if (selectedPages.includes(trimmed)) return;
    if (atLimit) return;
    togglePage(trimmed);
    setCustomPage("");
  };

  const handleNext = () => setStep(5);

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-foreground">Choose your pages</h2>
      <p className="text-muted-foreground text-base mb-5 leading-relaxed max-w-lg">
        Select the pages you need. We&apos;ve pre-selected recommended pages for
        your industry.
      </p>

      {/* Hero + Footer auto-included notice */}
      <div className="mb-5 inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-muted/40 border border-border/60 text-xs text-muted-foreground">
        <Sparkles className="w-3 h-3 text-primary" />
        <span>
          <span className="text-foreground font-medium">Hero</span> &{" "}
          <span className="text-foreground font-medium">Footer</span> sections
          are added automatically — you don&apos;t need to pick them.
        </span>
      </div>

      <div className="flex-1 space-y-5">
        {/* Page chips */}
        <div className="flex flex-wrap gap-2">
          {allPages.map((page) => {
            const isSelected = selectedPages.includes(page);
            const isDisabled = !isSelected && atLimit;
            return (
              <button
                key={page}
                onClick={() => handleTogglePage(page)}
                disabled={isDisabled}
                title={isDisabled ? `Free plan limit: ${MAX_PAGES_FREE} pages. Upgrade for up to ${MAX_PAGES_PRO}.` : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 pl-3 pr-3.5 py-2 rounded-full border text-[13px] font-medium transition-all",
                  isSelected
                    ? "border-primary bg-primary/[0.08] text-primary shadow-[0_0_0_1px_rgba(96,165,250,0.4)] cursor-pointer"
                    : isDisabled
                      ? "border-border/40 bg-muted/10 text-muted-foreground/40 cursor-not-allowed"
                      : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:text-foreground cursor-pointer"
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
            disabled={atLimit}
            placeholder={atLimit ? "Page limit reached" : "Add custom page..."}
            className={cn(
              "flex-1 px-4 py-2.5 rounded-xl bg-transparent border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
              atLimit
                ? "border-border/40 text-muted-foreground/40 placeholder:text-muted-foreground/30 cursor-not-allowed"
                : "border-border text-foreground placeholder:text-muted-foreground/50"
            )}
          />
          <button
            onClick={handleAddCustom}
            disabled={atLimit}
            className={cn(
              "w-10 h-10 rounded-xl border flex items-center justify-center transition-colors shrink-0",
              atLimit
                ? "border-border/40 cursor-not-allowed"
                : "border-border hover:bg-muted cursor-pointer"
            )}
          >
            <Plus className={cn("w-4 h-4", atLimit ? "text-muted-foreground/40" : "text-muted-foreground")} />
          </button>
        </div>

        {/* Counter + cap status */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p
            className={cn(
              "text-xs tabular-nums",
              atLimit ? "text-amber-600 dark:text-amber-400 font-medium" : "text-muted-foreground"
            )}
          >
            <span className="font-semibold">{selectedPages.length}</span>
            <span className="text-muted-foreground/70"> / {maxPages}</span>{" "}
            page{selectedPages.length !== 1 ? "s" : ""} selected
          </p>
          {isFree && (
            <p className="text-xs text-muted-foreground/80 inline-flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              Upgrade to add up to{" "}
              <span className="text-foreground font-medium">{MAX_PAGES_PRO} pages</span>
            </p>
          )}
        </div>
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
