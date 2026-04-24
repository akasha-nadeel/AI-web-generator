"use client";

import { useState } from "react";
import { Code2, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { EXPORT_AVAILABILITY_DATE } from "@/lib/export/response";
import { ExportPopover } from "./ExportPopover";
import { UpgradeModal } from "./UpgradeModal";

interface Props {
  projectId: string;
  userPlan: "free" | "pro" | "business";
  siteCreatedAt: string;
  siteName: string;
  className?: string;
  /** Icon-only rendering for tight spots like dashboard cards. */
  compact?: boolean;
}

export function ExportButton({
  projectId,
  userPlan,
  siteCreatedAt,
  siteName,
  className,
  compact = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const isFree = userPlan === "free";
  const isOld = new Date(siteCreatedAt) < EXPORT_AVAILABILITY_DATE;
  // Pro-plan user on a pre-launch site: button is inert with a tooltip.
  // Free users bypass this because the click falls through to the upgrade
  // modal regardless of site age — the upsell is the point, not the file.
  const proOnOldSite = !isFree && isOld;

  function handleClick() {
    if (isFree) {
      setUpgradeOpen(true);
      return;
    }
    if (proOnOldSite) return;
    setOpen(true);
  }

  const base =
    "inline-flex items-center gap-1.5 rounded-lg font-bold transition-all shadow-sm hover:shadow";
  const size = compact ? "h-7 px-2 text-[11px]" : "h-8 px-3 text-xs";
  const theme = isFree
    ? "bg-foreground/[0.06] text-muted-foreground hover:bg-foreground/[0.1] hover:text-foreground"
    : "bg-[#bef264] text-black hover:bg-[#d9f99d]";
  const disabledLook = proOnOldSite ? "opacity-50 cursor-not-allowed" : "";
  const Icon = isFree ? Lock : Code2;

  const button = (
    <button
      type="button"
      onClick={handleClick}
      disabled={proOnOldSite}
      className={cn(base, size, theme, disabledLook, className)}
      aria-label="Export to Next.js"
      title={compact ? "Export to Next.js" : undefined}
    >
      <Icon className="w-3.5 h-3.5" />
      {!compact && <span className="hidden sm:inline">Next.js</span>}
    </button>
  );

  return (
    <>
      {proOnOldSite ? (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex">{button}</span>
            </TooltipTrigger>
            <TooltipContent>Regenerate this site to enable Next.js export</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        button
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Export to Next.js</DialogTitle>
            <DialogDescription>
              Download a runnable Next.js 16 project for {siteName}.
            </DialogDescription>
          </DialogHeader>
          <ExportPopover
            projectId={projectId}
            siteName={siteName}
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </>
  );
}
