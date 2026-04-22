"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTemplatePreview, getPreviewTheme } from "@/lib/templates/preview-data";
import { assemblePreviewHtml } from "@/lib/assembler/assembler";
import { INDUSTRIES, COLOR_PALETTES, FONT_STYLES, INDUSTRY_DEFAULT_PAGES } from "@/lib/constants";
import { useWizardStore } from "@/stores/wizardStore";
import {
  Monitor,
  Tablet,
  Smartphone,
  ArrowLeft,
  ArrowRight,
  Palette,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplatePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  industryId: string | null;
}

type PreviewDevice = "desktop" | "tablet" | "mobile";

export function TemplatePreviewModal({ open, onOpenChange, industryId }: TemplatePreviewModalProps) {
  const router = useRouter();
  const wizardStore = useWizardStore();
  const [device, setDevice] = useState<PreviewDevice>("desktop");

  const preview = industryId ? getTemplatePreview(industryId) : undefined;
  const theme = industryId ? getPreviewTheme(industryId) : undefined;
  const industry = INDUSTRIES.find((i) => i.id === industryId);
  const palette = preview ? COLOR_PALETTES.find((p) => p.id === preview.paletteId) : undefined;
  const font = preview ? FONT_STYLES.find((f) => f.id === preview.fontStyleId) : undefined;

  const previewHtml = useMemo(() => {
    if (!preview || !theme) return "";
    return assemblePreviewHtml(preview.sections, theme, preview.siteName);
  }, [preview, theme]);

  const deviceWidths: Record<PreviewDevice, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  const handleUseTemplate = () => {
    if (!preview || !theme) return;

    wizardStore.reset();
    wizardStore.setBusinessInfo("", preview.industryId, "");
    wizardStore.setColorPalette({
      primary: theme.primary,
      secondary: theme.secondary,
      accent: theme.accent,
      bg: theme.bg,
      text: theme.text,
    });
    wizardStore.setFontStyle(preview.fontStyleId);
    wizardStore.setOverallFeel(preview.overallFeel);
    const pages = INDUSTRY_DEFAULT_PAGES[preview.industryId] || ["Home", "About", "Contact"];
    wizardStore.setSelectedPages(pages);
    onOpenChange(false);
    router.push("/wizard");
  };

  if (!preview || !theme || !industry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[95vw] w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col bg-popover backdrop-blur-xl border-border"
      >
        <DialogTitle className="sr-only">{industry.label} Template Preview</DialogTitle>

        {/* Top bar */}
        <div className="flex items-center justify-between px-3 md:px-5 h-14 border-b border-border shrink-0">
          {/* Left: Back + info */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold truncate text-foreground">{preview.siteName}</h3>
              <p className="text-[11px] text-muted-foreground truncate hidden sm:block">{industry.label}</p>
            </div>

            {/* Palette badge */}
            {palette && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground/[0.04] border border-border">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: palette.colors.primary }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: palette.colors.secondary }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: palette.colors.accent }} />
                <span className="text-[10px] text-muted-foreground ml-1">{palette.name}</span>
              </div>
            )}

            {/* Font badge */}
            {font && (
              <span className="hidden lg:inline text-[10px] text-muted-foreground px-2 py-0.5 rounded-full bg-foreground/[0.04] border border-border">
                {font.label}
              </span>
            )}
          </div>

          {/* Center: Device toggle */}
          <div className="hidden sm:flex items-center gap-0.5 bg-foreground/[0.04] rounded-lg p-0.5 border border-border">
            {(["desktop", "tablet", "mobile"] as const).map((d) => {
              const Icon = { desktop: Monitor, tablet: Tablet, mobile: Smartphone }[d];
              return (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    device === d
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>

          {/* Right: Use Template + Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleUseTemplate}
              className="flex items-center gap-1.5 h-8 px-3 md:px-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Use Template
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all hidden sm:flex"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preview iframe */}
        <div className="flex-1 bg-muted/10 overflow-auto flex justify-center p-2 md:p-4">
          <div
            style={{ width: deviceWidths[device] }}
            className={cn(
              "transition-all duration-300 h-full",
              device !== "desktop" && "mx-auto"
            )}
          >
            <iframe
              srcDoc={previewHtml}
              className="w-full h-full rounded-lg border border-border shadow-2xl"
              sandbox="allow-same-origin"
              title={`${industry.label} template preview`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
