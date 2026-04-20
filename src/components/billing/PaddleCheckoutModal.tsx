"use client";

import { useEffect } from "react";
import { type Paddle } from "@paddle/paddle-js";
import { Zap, X, ShieldCheck, Lock, Check } from "lucide-react";
import { CREDIT_PACKS } from "@/lib/constants";

const ACCENT = "#C8E600";

type CreditPack = (typeof CREDIT_PACKS)[number];

export function PaddleCheckoutModal({
  paddle,
  pack,
  priceId,
  customerEmail,
  clerkId,
  onClose,
}: {
  paddle: Paddle;
  pack: CreditPack;
  priceId: string;
  customerEmail: string | null;
  clerkId: string;
  onClose: () => void;
}) {
  useEffect(() => {
    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: customerEmail ? { email: customerEmail } : undefined,
      customData: { clerkId, packId: pack.id },
      settings: {
        displayMode: "inline",
        theme: "dark",
        frameTarget: "paddle-checkout-frame",
        frameInitialHeight: 600,
        frameStyle:
          "width: 100%; min-height: 600px; background: transparent; border: none;",
        showAddDiscounts: false,
      },
    });

    return () => {
      try {
        paddle.Checkout.close();
      } catch {
        // ignore
      }
    };
  }, [paddle, priceId, customerEmail, clerkId, pack.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const subtotal = pack.price.toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#08081a] animate-in fade-in duration-150">
      <header className="h-14 shrink-0 border-b border-white/[0.06] bg-[rgba(10,10,25,0.85)] backdrop-blur-xl flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-white">Weavo Checkout</span>
        </div>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 h-9 pl-3 pr-3.5 rounded-full border border-white/15 bg-white/[0.08] text-white/90 hover:text-white hover:bg-white/[0.16] hover:border-white/25 transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-[13px] font-medium">Cancel</span>
        </button>
      </header>

      <div className="flex-1 overflow-hidden grid lg:grid-cols-[440px_1fr]">
        <aside className="bg-[#0e0e1d] border-r border-white/[0.06] flex flex-col overflow-y-auto">
          <div className="flex-1 px-6 md:px-8 py-7">
            <h2 className="text-[23px] font-bold text-white mb-1.5 tracking-tight">
              Order summary
            </h2>
            <div
              className="inline-flex items-center gap-2 mb-7 text-[18px] font-bold"
              style={{ color: ACCENT }}
            >
              <Zap className="w-5 h-5" strokeWidth={2.5} />
              <span>{pack.credits} credits</span>
            </div>

            <div className="flex items-start gap-3.5 pb-6 border-b border-white/[0.06]">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.04] border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo-infinity.png"
                  alt="Weavo"
                  className="w-12 h-12 object-contain scale-[1.35] origin-center"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14.5px] font-semibold text-white leading-snug">
                  {pack.name} pack
                </div>
                <div className="text-[12px] text-white/45 mt-0.5 truncate">
                  weavo.app · one-time purchase
                </div>
              </div>
              <div className="text-[14px] font-semibold text-white shrink-0">
                ${subtotal}
              </div>
            </div>

            <div className="pt-5 space-y-3">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-white/55">Subtotal</span>
                <span className="text-white/90 font-medium">${subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-white/55">Tax</span>
                <span className="text-white/45">Calculated at checkout</span>
              </div>
            </div>

            <div className="mt-7 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-[12px] text-white/65">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-white" />
                Credits never expire — use them whenever
              </div>
              <div className="flex items-center gap-2 text-[12px] text-white/65">
                <Lock className="w-3.5 h-3.5 shrink-0 text-white" />
                Encrypted payment, processed by Paddle
              </div>
              <div className="flex items-center gap-2 text-[12px] text-white/65">
                <Check className="w-3.5 h-3.5 shrink-0 text-white" strokeWidth={3} />
                Credits added instantly after payment
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 px-6 md:px-8 py-5 border-t border-white/[0.08] bg-[#0a0a17] flex items-center justify-between">
            <span className="text-[15px] font-semibold text-white">Due today</span>
            <span
              className="text-[22px] font-bold tracking-tight"
              style={{ color: ACCENT }}
            >
              ${subtotal}
            </span>
          </div>
        </aside>

        <main className="overflow-y-auto bg-[#08081a]">
          <div className="max-w-xl mx-auto px-4 md:px-8 py-6 md:py-10">
            <div className="paddle-checkout-frame" />
          </div>
        </main>
      </div>
    </div>
  );
}
