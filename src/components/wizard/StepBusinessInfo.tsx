"use client";

import { useWizardStore } from "@/stores/wizardStore";
import { INDUSTRIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UtensilsCrossed: Icons.UtensilsCrossed,
  User: Icons.User,
  Building2: Icons.Building2,
  ShoppingBag: Icons.ShoppingBag,
  FileText: Icons.FileText,
  Dumbbell: Icons.Dumbbell,
  Home: Icons.Home,
  Laptop: Icons.Laptop,
  GraduationCap: Icons.GraduationCap,
  Camera: Icons.Camera,
  Heart: Icons.Heart,
  HandHeart: Icons.Heart,
};

export function StepBusinessInfo() {
  const { businessName, industry, description, setBusinessInfo, setStep } =
    useWizardStore();

  const canProceed = businessName.trim() && industry && description.trim();

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Let's get started</h2>
      <p className="text-white/60 text-base mb-10 leading-relaxed max-w-lg">
        We just need a few details. These answers help us generate a starting point that feels right for you.
      </p>

      <div className="space-y-10 flex-1">
        {/* Business name */}
        <div>
          <label className="text-base font-semibold mb-3 block text-white/90">What is your website called?</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessInfo(e.target.value, industry, description)}
            placeholder="ie. Acme Studios"
            className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-base font-semibold mb-3 block text-white/90">
            What is your website about?
          </label>
          <textarea
            value={description}
            onChange={(e) => setBusinessInfo(businessName, industry, e.target.value)}
            placeholder="Describe your website in a sentence or two"
            rows={3}
            className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
          />
          <p className="text-xs text-white/40 mt-2">
            This won't be visible on the website but helps us understand your needs.
          </p>
        </div>

        {/* Industry selector */}
        <div>
          <label className="text-base font-semibold mb-1 block text-white/90">
            What category does your website fall under?
          </label>
          <p className="text-sm text-white/50 mb-4">Choose the category that best describes your website.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {INDUSTRIES.map((ind) => {
              const Icon = iconMap[ind.icon] || Icons.Globe;
              const isSelected = industry === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setBusinessInfo(businessName, ind.id, description)}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-xl border transition-all text-left cursor-pointer group",
                    isSelected
                      ? "border-white/40 bg-white/[0.03]"
                      : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                    isSelected ? "border-blue-400" : "border-white/20 group-hover:border-white/40"
                  )}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-blue-400" />}
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4", isSelected ? "text-blue-400" : "text-white/50")} />
                    <span className={cn("text-sm", isSelected ? "text-white" : "text-white/70")}>{ind.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-12 flex justify-between items-center pt-6 border-t border-white/5">
        <div /> {/* Placeholder for back button if needed in future */}
        <button
          onClick={() => canProceed && setStep(2)}
          disabled={!canProceed}
          className={cn(
            "px-6 py-2.5 rounded-lg text-sm font-medium transition-colors",
            canProceed 
              ? "bg-white text-black hover:bg-white/90" 
              : "bg-white/10 text-white/30 cursor-not-allowed"
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
}
