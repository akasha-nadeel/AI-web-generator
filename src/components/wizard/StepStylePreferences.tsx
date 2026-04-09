"use client";

import { useWizardStore } from "@/stores/wizardStore";
import { GradientButton } from "@/components/shared/GradientButton";
import { COLOR_PALETTES, FONT_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const feels = [
  { id: "minimal", label: "Minimal", desc: "Clean, lots of whitespace" },
  { id: "rich", label: "Rich", desc: "Full, detailed sections" },
  { id: "corporate", label: "Corporate", desc: "Professional, trustworthy" },
  { id: "creative", label: "Creative", desc: "Bold, artistic, unique" },
];

export function StepStylePreferences() {
  const {
    colorPalette,
    fontStyle,
    overallFeel,
    setColorPalette,
    setFontStyle,
    setOverallFeel,
    setStep,
  } = useWizardStore();

  const selectedPaletteId = COLOR_PALETTES.find(
    (p) => p.colors.primary === colorPalette.primary
  )?.id;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Choose your style</h2>
      <p className="text-muted-foreground mb-8">
        Pick a color palette, font style, and overall feel for your website.
      </p>

      {/* Color palettes */}
      <div className="mb-8">
        <label className="text-sm font-medium mb-3 block">Color Palette</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {COLOR_PALETTES.map((palette) => (
            <button
              key={palette.id}
              onClick={() => setColorPalette(palette.colors)}
              className={cn(
                "relative p-4 rounded-xl border transition-all cursor-pointer",
                selectedPaletteId === palette.id
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              {selectedPaletteId === palette.id && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="flex gap-1 mb-2">
                {[
                  palette.colors.primary,
                  palette.colors.secondary,
                  palette.colors.accent,
                  palette.colors.bg,
                ].map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{palette.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font style */}
      <div className="mb-8">
        <label className="text-sm font-medium mb-3 block">Font Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FONT_STYLES.map((fs) => (
            <button
              key={fs.id}
              onClick={() => setFontStyle(fs.id)}
              className={cn(
                "p-4 rounded-xl border transition-all text-center cursor-pointer",
                fontStyle === fs.id
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <span className="text-lg font-semibold block mb-1">{fs.label}</span>
              <span className="text-xs text-muted-foreground">
                {fs.fonts.heading}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Overall feel */}
      <div className="mb-8">
        <label className="text-sm font-medium mb-3 block">Overall Feel</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {feels.map((f) => (
            <button
              key={f.id}
              onClick={() => setOverallFeel(f.id)}
              className={cn(
                "p-4 rounded-xl border transition-all text-left cursor-pointer",
                overallFeel === f.id
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <span className="text-sm font-semibold block mb-1">{f.label}</span>
              <span className="text-xs text-muted-foreground">{f.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <GradientButton variant="secondary" onClick={() => setStep(2)}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </GradientButton>
        <GradientButton onClick={() => setStep(4)}>
          Next
          <ArrowRight className="w-4 h-4" />
        </GradientButton>
      </div>
    </div>
  );
}
