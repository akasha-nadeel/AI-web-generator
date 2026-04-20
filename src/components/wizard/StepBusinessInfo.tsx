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
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Let&apos;s get started</h2>
      <p className="text-white/60 text-base mb-7 leading-relaxed max-w-lg">
        We just need a few details. These answers help us generate a starting point that feels right for you.
      </p>

      <div className="space-y-6 flex-1">
        {/* Name + Description — side-by-side on md+ to save vertical space */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold mb-2 block text-white/90">What is your website called?</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessInfo(e.target.value, industry, description)}
              placeholder="ie. Acme Studios"
              className="w-full px-4 py-2.5 rounded-xl bg-transparent border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block text-white/90">What is your website about?</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setBusinessInfo(businessName, industry, e.target.value)}
              placeholder="Describe it in one sentence"
              className="w-full px-4 py-2.5 rounded-xl bg-transparent border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        {/* Industry selector */}
        <div>
          <label className="text-sm font-semibold mb-1 block text-white/90">
            What category does your website fall under?
          </label>
          <p className="text-xs text-white/50 mb-3">Choose the category that best describes your website.</p>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => {
              const Icon = iconMap[ind.icon] || Icons.Globe;
              const isSelected = industry === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setBusinessInfo(businessName, ind.id, description)}
                  className={cn(
                    "inline-flex items-center gap-1.5 pl-3 pr-3.5 py-2 rounded-full border text-[13px] transition-all",
                    isSelected
                      ? "border-blue-400/70 bg-blue-400/[0.08] text-white shadow-[0_0_0_1px_rgba(96,165,250,0.4)]"
                      : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/25 hover:text-white/90"
                  )}
                >
                  {isSelected ? (
                    <Icons.Check className="w-3.5 h-3.5 text-blue-400" strokeWidth={3} />
                  ) : (
                    <Icon className="w-3.5 h-3.5 text-white/45" />
                  )}
                  <span className="font-medium">{ind.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-8 flex justify-between items-center pt-5 border-t border-white/5">
        <div />
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
