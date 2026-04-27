"use client";

import { useWizardStore } from "@/stores/wizardStore";
import { cn } from "@/lib/utils";

const MIN_DESCRIPTION_LENGTH = 20;

export function StepBusinessInfo() {
  const { businessName, industry, description, setBusinessInfo, setStep } =
    useWizardStore();

  const trimmedName = businessName.trim();
  const trimmedDesc = description.trim();
  const descLength = trimmedDesc.length;
  const descTooShort = descLength > 0 && descLength < MIN_DESCRIPTION_LENGTH;
  const canProceed = trimmedName.length > 0 && descLength >= MIN_DESCRIPTION_LENGTH;

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-foreground">Let&apos;s get started</h2>
      <p className="text-muted-foreground text-base mb-7 leading-relaxed max-w-lg">
        We just need a couple of details. The clearer your description, the better the AI can match your industry, style, and content.
      </p>

      <div className="space-y-6 flex-1">
        <div>
          <label className="text-sm font-semibold mb-2 block text-foreground/90">What is your website called?</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessInfo(e.target.value, industry, description)}
            placeholder="ie. Acme Studios"
            className="w-full px-4 py-2.5 rounded-xl bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold block text-foreground/90">Tell us about your website</label>
            <span
              className={cn(
                "text-[11px] tabular-nums",
                descTooShort
                  ? "text-amber-600 dark:text-amber-400"
                  : descLength >= MIN_DESCRIPTION_LENGTH
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground/60"
              )}
            >
              {descLength}/{MIN_DESCRIPTION_LENGTH}+ chars
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setBusinessInfo(businessName, industry, e.target.value)}
            placeholder="e.g. Italian restaurant in Brooklyn — wood-fired pizza, fresh pasta, intimate candlelit dining. Warm cream and terracotta color scheme."
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
          />
          <p className="mt-2 text-xs text-muted-foreground/80 leading-relaxed">
            Mention your industry, location, and what makes you different. <span className="text-foreground/70">If you have a preferred color (e.g. &quot;red theme&quot;, &quot;sage green accents&quot;), include it — the AI will use it as the accent.</span>
          </p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-8 flex justify-between items-center pt-5 border-t border-border">
        <div />
        <button
          onClick={() => canProceed && setStep(2)}
          disabled={!canProceed}
          className={cn(
            "px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm",
            canProceed
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
}
