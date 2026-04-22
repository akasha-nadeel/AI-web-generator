"use client";

import Link from "next/link";
import { UserProfile, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ArrowLeft, ArrowRight, Plus, Zap, Mail, User as UserIcon, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { CreditCounter } from "@/components/ui/CreditCounter";
import { useCreditsStore } from "@/stores/creditsStore";
import { useTheme } from "next-themes";

const ACCENT = "#C8E600";

function formatMemberSince(date: Date | null | undefined): string {
  if (!date) return "—";
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function SettingsPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, isLoaded } = useUser();
  const { balance, plan, refresh } = useCreditsStore();

  useEffect(() => {
    setMounted(true);
    if (balance === null) refresh();
  }, [balance, refresh]);

  const isDark = theme === "dark";

  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "—";
  const primaryEmail = user?.primaryEmailAddress?.emailAddress ?? "—";
  const memberSince = formatMemberSince(user?.createdAt);
  const isPro = plan !== "free";

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      {/* Top bar — identical to /billing */}
      <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shrink-0">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-border bg-foreground/[0.04] text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/[0.08] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <CreditCounter />
          <Link
            href="/wizard"
            className="hidden sm:flex items-center gap-2 h-9 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" />
            New Site
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 md:px-8 py-8 md:py-10">
        {/* Page header */}
        <div className="flex items-start justify-between gap-6 mb-8 md:mb-10 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground transition-colors">Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your profile, account, and security preferences.
            </p>
          </div>
          <div className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-foreground/[0.04] px-4 py-2.5 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-300" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-base font-semibold text-foreground leading-tight transition-colors">
                {balance ?? "…"} credits
              </div>
              <div className="text-[11px] text-muted-foreground capitalize leading-tight">
                {plan} plan
              </div>
            </div>
          </div>
        </div>

        {/* Account summary card */}
        <div className="rounded-2xl border border-border bg-foreground/[0.03] p-6 md:p-7 mb-6 md:mb-8 transition-colors">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border bg-foreground/[0.04] shrink-0 flex items-center justify-center transition-colors">
              {user?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.imageUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-7 h-7 text-muted-foreground/40" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-2.5 mb-1.5">
                <h2 className="text-lg md:text-xl font-bold text-foreground tracking-tight transition-colors">
                  {isLoaded ? displayName : "Loading…"}
                </h2>
                {isPro ? (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      color: isDark ? ACCENT : "#6b21a8",
                      backgroundColor: isDark ? `${ACCENT}1A` : "#f3e8ff",
                      border: `1px solid ${isDark ? `${ACCENT}4D` : "#e9d5ff"}`,
                    }}
                  >
                    Pro
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-muted-foreground bg-foreground/[0.06] border border-border transition-colors">
                    Free
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5 text-[13px] text-muted-foreground transition-colors">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-muted-foreground/40" />
                  <span className="truncate">{primaryEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 shrink-0 text-muted-foreground/40" />
                  <span>Member since {memberSince}</span>
                </div>
              </div>
            </div>

            {/* Manage billing link */}
            <Link
              href="/billing"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground px-4 py-2 rounded-full border border-border hover:bg-foreground/[0.04] transition-colors whitespace-nowrap"
            >
              Manage billing
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Clerk UserProfile — handles all edit flows (name, email, password, OAuth, 2FA, delete) */}
        <div className="rounded-2xl border border-border bg-foreground/[0.02] p-1 md:p-2 overflow-hidden transition-colors">
          {mounted && (
            <UserProfile
              appearance={isDark ? {
                baseTheme: dark,
                variables: {
                  colorPrimary: ACCENT,
                  colorBackground: "#0f0f10",
                  colorText: "#ffffff",
                  colorTextSecondary: "rgba(255,255,255,0.85)",
                  colorInputBackground: "rgba(255,255,255,0.05)",
                  colorInputText: "#ffffff",
                  colorNeutral: "#ffffff",
                  borderRadius: "0.75rem",
                  fontFamily: "var(--font-sans, system-ui)",
                },
                elements: {
                  rootBox: "w-full",
                  cardBox: "w-full shadow-none bg-transparent",
                  card: "bg-transparent shadow-none border-0 w-full",
                  navbar: "bg-transparent border-r border-white/[0.06]",
                  navbarButton:
                    "!text-white/80 hover:!text-white hover:!bg-white/[0.05]",
                  navbarButtonActive: "!text-white !bg-white/[0.08]",
                  headerTitle: "!text-white",
                  headerSubtitle: "!text-white/70",
                  profileSectionTitle: "!text-white",
                  profileSectionTitleText: "!text-white !font-semibold",
                  profileSectionSubtitle: "!text-white/70",
                  profileSectionContent: "!text-white",
                  profileSectionPrimaryButton: "!text-white",
                  profileSectionItem: "!text-white",
                  accordionTriggerButton: "!text-white",
                  menuButton: "!text-white/80 hover:!text-white",
                  formFieldLabel: "!text-white",
                  formFieldHintText: "!text-white/60",
                  formFieldInput:
                    "!bg-white/[0.05] !border-white/10 !text-white focus:!border-white/30",
                  formButtonPrimary: "!text-black hover:!opacity-90",
                  badge: "!bg-white/[0.08] !text-white !border-white/15",
                  pageScrollBox: "p-0",
                  page: "!text-white",
                },
              } : {
                // Original Clerk White UI
                variables: {
                  colorPrimary: "#000000",
                  borderRadius: "0.75rem",
                  fontFamily: "var(--font-sans, system-ui)",
                },
                elements: {
                  rootBox: "w-full",
                  cardBox: "w-full shadow-none",
                  card: "shadow-none border-0 w-full",
                  pageScrollBox: "p-0",
                  formButtonPrimary: "bg-black hover:bg-black/90 text-white transition-colors",
                }
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
