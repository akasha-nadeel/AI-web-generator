"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  Plus,
  LayoutGrid,
  CreditCard,
  Settings,
  ChevronUp,
  Menu,
  ArrowUpRight,
  HelpCircle,
  LogOut,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { CreditCounter } from "@/components/ui/CreditCounter";
import { useCreditsStore } from "@/stores/creditsStore";
import { PLANS, type PlanType } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { balance, plan, refresh } = useCreditsStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (balance === null) refresh();
  }, [balance, refresh]);

  const planKey = (plan in PLANS ? plan : "free") as PlanType;
  const planConfig = PLANS[planKey];
  const totalCredits = planConfig.generations;
  const credits = balance ?? 0;
  const creditPercentage = totalCredits ? Math.min(100, (credits / totalCredits) * 100) : 0;

  const sidebarContent = (
    <>
      {/* Brand header */}
      <div className="p-4 flex items-center justify-between">
        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
          <span className="flex items-center gap-1 text-xl font-bold text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Weavo Logo"
              className="w-8 h-8 object-contain opacity-90 scale-[1.7] origin-center"
            />
            Weavo
          </span>
        </Link>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        <Link
          href="/wizard"
          onClick={() => setMobileOpen(false)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all bg-purple-500/10 text-foreground border border-purple-500/20 hover:bg-purple-500/15"
        >
          <Plus className="w-4 h-4 text-purple-400" />
          New Site
        </Link>
        <div className="my-1.5 mx-3 border-t border-white/[0.06]" />

        {NAV.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                isActive
                  ? "bg-white/[0.08] text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile dropdown */}
      <div className="mt-auto border-t border-white/[0.06]">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full focus:outline-none">
            <div className="flex items-center gap-3 p-3 hover:bg-white/[0.04] transition-colors cursor-pointer">
              {user?.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.imageUrl}
                  alt={user?.fullName || "User"}
                  className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/10"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {user?.fullName?.charAt(0)?.toUpperCase() ||
                    user?.primaryEmailAddress?.emailAddress?.charAt(0)?.toUpperCase() ||
                    "U"}
                </div>
              )}
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium truncate">{user?.fullName || "User"}</p>
                <p className="text-[11px] text-muted-foreground truncate capitalize">
                  {planConfig.name} plan
                </p>
              </div>
              <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            sideOffset={8}
            className="w-[calc(260px-1.5rem)] bg-[rgba(20,20,40,0.97)] backdrop-blur-xl border-white/[0.1] rounded-xl p-1"
          >
            <div className="px-3 py-2 text-xs text-muted-foreground truncate">
              {user?.primaryEmailAddress?.emailAddress}
            </div>
            <DropdownMenuSeparator className="bg-white/[0.06]" />

            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-3 text-sm">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/billing" className="flex items-center gap-3 text-sm">
                <CreditCard className="w-4 h-4" />
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-3 text-sm">
                <HelpCircle className="w-4 h-4" />
                Get help
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/[0.06]" />

            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-white/70" />
                  <span className="text-xs text-muted-foreground">Credits</span>
                </div>
                <span className="text-xs font-medium">
                  {credits}/{totalCredits}
                </span>
              </div>
              <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${creditPercentage}%` }}
                />
              </div>
            </div>

            <DropdownMenuSeparator className="bg-white/[0.06]" />
            <DropdownMenuItem asChild>
              <Link href="/billing" className="flex items-center gap-3 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                {planKey === "free" ? "Upgrade plan" : "Buy credits"}
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/[0.06]" />

            <DropdownMenuItem
              onClick={() => signOut({ redirectUrl: "/" })}
              className="flex items-center gap-3 text-sm text-red-400 focus:text-red-400"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[280px] p-0 bg-[rgba(10,10,25,0.97)] border-white/[0.06] flex flex-col"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          {sidebarContent}
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col border-r border-white/[0.06] bg-[rgba(10,10,25,0.5)] shrink-0 h-screen sticky top-0 w-[260px]">
        {sidebarContent}
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-white/[0.06] bg-[rgba(10,10,25,0.3)] flex items-center justify-between px-3 md:px-6 shrink-0">
          {/* Mobile: hamburger + brand */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 -ml-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/dashboard" className="flex items-center gap-1.5">
              <span className="text-base font-bold text-white">Weavo</span>
            </Link>
          </div>

          <div className="hidden md:block" />

          {/* Desktop: credits + new site */}
          <div className="hidden md:flex items-center gap-2">
            <CreditCounter />
            <Link
              href="/wizard"
              className="flex items-center gap-2 h-9 px-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
              New Site
            </Link>
          </div>

          {/* Mobile right: credits + new */}
          <div className="flex items-center gap-2 md:hidden">
            <CreditCounter compact />
            <Link
              href="/wizard"
              className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-white text-black text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              New
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-thin">{children}</main>
      </div>
    </div>
  );
}
