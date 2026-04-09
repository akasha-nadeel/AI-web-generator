"use client";

import { useWizardStore } from "@/stores/wizardStore";
import { INDUSTRIES } from "@/lib/constants";
import { GradientButton } from "@/components/shared/GradientButton";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";

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
    <div>
      <h2 className="text-2xl font-bold mb-2">Tell us about your business</h2>
      <p className="text-muted-foreground mb-8">
        This helps our AI generate the perfect website for you.
      </p>

      {/* Industry selector */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-3 block">
          What industry are you in?
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
          {INDUSTRIES.map((ind) => {
            const Icon = iconMap[ind.icon] || Icons.Globe;
            return (
              <button
                key={ind.id}
                onClick={() => setBusinessInfo(businessName, ind.id, description)}
                className={cn(
                  "flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl border transition-all text-center cursor-pointer",
                  industry === ind.id
                    ? "border-purple-500 bg-purple-500/10 text-foreground"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:bg-white/8"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{ind.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Business name */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-2 block">Business name</label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessInfo(e.target.value, industry, description)}
          placeholder="e.g. Sunrise Bakery"
          className="w-full px-4 py-3 rounded-xl glass-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      {/* Description */}
      <div className="mb-8">
        <label className="text-sm font-medium mb-2 block">
          Describe your business (1-2 sentences)
        </label>
        <textarea
          value={description}
          onChange={(e) => setBusinessInfo(businessName, industry, e.target.value)}
          placeholder="e.g. Family-owned bakery in Melbourne specializing in artisan breads and pastries"
          rows={3}
          className="w-full px-4 py-3 rounded-xl glass-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
        />
      </div>

      <div className="flex justify-end">
        <GradientButton
          onClick={() => canProceed && setStep(2)}
          className={cn(!canProceed && "opacity-50 cursor-not-allowed")}
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </GradientButton>
      </div>
    </div>
  );
}
