"use client";

import { useWizardStore } from "@/stores/wizardStore";
import { FONT_STYLES } from "@/lib/constants";
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
    fontStyle,
    overallFeel,
    setFontStyle,
    setOverallFeel,
    setStep,
  } = useWizardStore();

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Choose your style</h2>
      <p className="text-white/60 text-base mb-7 leading-relaxed max-w-lg">
        Pick a font style and overall feel for your website.
      </p>

      <div className="flex-1 space-y-7">
        {/* Font style — pill chips */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-white/90">Font Style</label>
          <div className="flex flex-wrap gap-2">
            {FONT_STYLES.map((fs) => {
              const isSelected = fontStyle === fs.id;
              return (
                <button
                  key={fs.id}
                  onClick={() => setFontStyle(fs.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all",
                    isSelected
                      ? "border-blue-400/70 bg-blue-400/[0.08] text-white shadow-[0_0_0_1px_rgba(96,165,250,0.4)]"
                      : "border-white/10 bg-white/[0.02] text-white/75 hover:border-white/25 hover:text-white/90"
                  )}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" strokeWidth={3} />}
                  <span className="font-semibold" style={{ fontFamily: `'${fs.fonts.heading}', sans-serif` }}>
                    {fs.label}
                  </span>
                  <span className="text-[11px] text-white/40 font-normal">{fs.fonts.heading}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overall feel */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-white/90">Overall Feel</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {feels.map((f) => (
              <button
                key={f.id}
                onClick={() => setOverallFeel(f.id)}
                className={cn(
                  "p-4 rounded-xl border transition-all text-left cursor-pointer group",
                  overallFeel === f.id
                    ? "border-blue-400 bg-white/[0.03]"
                    : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                    overallFeel === f.id ? "border-blue-400" : "border-white/20 group-hover:border-white/40"
                  )}>
                    {overallFeel === f.id && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </div>
                  <span className={cn("text-sm font-semibold", overallFeel === f.id ? "text-white" : "text-white/80")}>{f.label}</span>
                </div>
                <span className="text-xs text-white/50 leading-snug block">{f.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-8 flex justify-between items-center pt-5 border-t border-white/5 shrink-0">
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
