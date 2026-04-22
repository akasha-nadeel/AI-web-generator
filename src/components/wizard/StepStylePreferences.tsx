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
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-foreground">Choose your style</h2>
      <p className="text-muted-foreground text-base mb-7 leading-relaxed max-w-lg">
        Pick a font style and overall feel for your website.
      </p>

      <div className="flex-1 space-y-7">
        {/* Font style — pill chips */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-foreground/90">Font Style</label>
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
                      ? "border-primary bg-primary/[0.08] text-primary shadow-[0_0_0_1px_rgba(96,165,250,0.4)]"
                      : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={3} />}
                  <span className="font-semibold" style={{ fontFamily: `'${fs.fonts.heading}', sans-serif` }}>
                    {fs.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground/50 font-normal">{fs.fonts.heading}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overall feel */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-foreground/90">Overall Feel</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {feels.map((f) => (
              <button
                key={f.id}
                onClick={() => setOverallFeel(f.id)}
                className={cn(
                  "p-4 rounded-xl border transition-all text-left cursor-pointer group",
                  overallFeel === f.id
                    ? "border-primary bg-primary/[0.04]"
                    : "border-border bg-muted/20 hover:border-primary/30 hover:bg-muted/40"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                    overallFeel === f.id ? "border-primary" : "border-muted-foreground/30 group-hover:border-primary/50"
                  )}>
                    {overallFeel === f.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </div>
                  <span className={cn("text-sm font-semibold", overallFeel === f.id ? "text-primary" : "text-foreground/80")}>{f.label}</span>
                </div>
                <span className="text-xs text-muted-foreground leading-snug block">{f.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-8 flex justify-between items-center pt-5 border-t border-border shrink-0">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border border-border bg-transparent text-foreground hover:bg-muted"
        >
          Back
        </button>
        <button
          onClick={() => setStep(4)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm bg-primary text-primary-foreground hover:opacity-90"
        >
          Next
        </button>
      </div>
    </div>
  );
}
