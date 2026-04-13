"use client";

import { useWizardStore } from "@/stores/wizardStore";
import { COLOR_PALETTES, FONT_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Choose your style</h2>
      <p className="text-white/60 text-base mb-10 leading-relaxed max-w-lg">
        Pick a color palette, font style, and overall feel for your website.
      </p>

      <div className="flex-1 space-y-10 custom-scrollbar max-h-[60vh] overflow-y-auto pr-2">
        {/* Color palettes */}
        <div>
          <label className="text-base font-semibold mb-4 block text-white/90">Color Palette</label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {COLOR_PALETTES.map((palette) => (
              <button
                key={palette.id}
                onClick={() => setColorPalette(palette.colors)}
                className={cn(
                  "relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group",
                  selectedPaletteId === palette.id
                    ? "border-blue-400 bg-white/[0.03] shadow-[0_0_15px_rgba(96,165,250,0.1)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                )}
              >
                {selectedPaletteId === palette.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 text-[#0a0a0a] stroke-[3]" />
                  </div>
                )}
                <div className="flex gap-2">
                  {[
                    palette.colors.primary,
                    palette.colors.secondary,
                    palette.colors.accent,
                    palette.colors.bg,
                  ].map((color, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-7 h-7 md:w-8 md:h-8 rounded-full border shadow-inner",
                        color === '#ffffff' || color === '#f8fafc' 
                          ? "border-white/20" 
                          : "border-transparent" // Prevent invisible white borders
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  selectedPaletteId === palette.id ? "text-white" : "text-white/60 group-hover:text-white/80"
                )}>
                  {palette.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Font style */}
        <div>
          <label className="text-base font-semibold mb-4 block text-white/90">Font Style</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FONT_STYLES.map((fs) => (
              <button
                key={fs.id}
                onClick={() => setFontStyle(fs.id)}
                className={cn(
                  "p-4 rounded-xl border transition-all text-center cursor-pointer group",
                  fontStyle === fs.id
                    ? "border-blue-400 bg-white/[0.03]"
                    : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                )}
              >
                <span className={cn(
                  "text-lg font-bold block mb-1 transition-colors",
                  fontStyle === fs.id ? "text-white" : "text-white/70"
                )}>{fs.label}</span>
                <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                  {fs.fonts.heading}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Overall feel */}
        <div>
          <label className="text-base font-semibold mb-4 block text-white/90">Overall Feel</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {feels.map((f) => (
              <button
                key={f.id}
                onClick={() => setOverallFeel(f.id)}
                className={cn(
                  "p-5 rounded-xl border transition-all text-left cursor-pointer group flex items-center gap-4",
                  overallFeel === f.id
                    ? "border-blue-400 bg-white/[0.03]"
                    : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                  overallFeel === f.id ? "border-blue-400" : "border-white/20 group-hover:border-white/40"
                )}>
                  {overallFeel === f.id && <div className="w-2 h-2 rounded-full bg-blue-400" />}
                </div>
                <div>
                  <span className={cn("text-base font-medium block mb-0.5", overallFeel === f.id ? "text-white" : "text-white/80")}>{f.label}</span>
                  <span className="text-sm text-white/50">{f.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-12 flex justify-between items-center pt-6 border-t border-white/5 shrink-0">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/10 bg-transparent text-white hover:bg-white/5"
        >
          Back
        </button>
        <button
          onClick={() => setStep(4)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors bg-white text-black hover:bg-white/90"
        >
          Next
        </button>
      </div>
    </div>
  );
}
