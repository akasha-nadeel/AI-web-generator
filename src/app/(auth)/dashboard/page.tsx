"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import {
  Plus,
  Sparkles,
  Search,
  LayoutGrid,
  List,
  Clock,
  FolderOpen,
  Trash2,
  FileText,
  Settings,
  CreditCard,
  ChevronUp,
  Globe,
  LogOut,
  HelpCircle,
  MoreVertical,
  Edit,
  Download,
  Zap,
  ArrowUpRight,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  PanelLeft,
  Infinity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PLANS, INDUSTRIES, COLOR_PALETTES, FONT_STYLES, INDUSTRY_DEFAULT_PAGES } from "@/lib/constants";
import { getTemplatePreview, getPreviewTheme } from "@/lib/templates/preview-data";
import { assemblePreviewHtml } from "@/lib/assembler/assembler";
import { TEMPLATE_DESIGN_DNA } from "@/lib/templates/design-dna";
import { useRouter } from "next/navigation";
import { Menu, Eye, ChevronRight, Sun, Moon } from "lucide-react";
import { CreditCounter } from "@/components/ui/CreditCounter";
import { AnnouncementBanner } from "@/components/shared/AnnouncementBanner";
import { useCreditsStore } from "@/stores/creditsStore";
import { useTheme } from "next-themes";
import { AIChatSection } from "@/components/dashboard/AIChatSection";
import { ExportButton } from "@/components/export/ExportButton";
import { useInViewport } from "@/hooks/useInViewport";

/* ===== TYPES ===== */

interface Site {
  id: string;
  name: string;
  industry: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  site_json?: { html?: string } | null;
}

type ViewMode = "grid" | "list";
type NavView = "Chat" | "Recents" | "All Projects" | "Templates" | "Trash";
type SortMode = "updated" | "created" | "name";

/* ===== INDUSTRY ICON MAP ===== */
const INDUSTRY_DESCRIPTIONS: Record<string, string> = {
  restaurant: "Menu, gallery, reservations & contact pages",
  portfolio: "Showcase your work with a clean personal site",
  agency: "Professional services, team & case studies",
  ecommerce: "Product listings, cart & checkout flow",
  blog: "Content-focused with categories & authors",
  fitness: "Programs, trainers & class schedules",
  realestate: "Property listings, agent profiles & tours",
  saas: "Features, pricing, testimonials & sign-up",
  education: "Courses, instructors & enrollment",
  photography: "Visual portfolio with lightbox gallery",
  medical: "Services, team bios & appointment booking",
  nonprofit: "Mission, programs, donate & volunteer",
};

/* ===== MAIN COMPONENT ===== */

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoaded: userLoaded } = useUser();
  const { signOut } = useClerk();
  const [sites, setSites] = useState<Site[]>([]);
  const [trashedSites, setTrashedSites] = useState<Site[]>([]);
  const [credits, setCredits] = useState(999);
  const [plan, setPlan] = useState<"free" | "pro" | "business">("free");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeNav, setActiveNav] = useState<NavView>("Chat");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("updated");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K — focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Fetch active sites
  const fetchSites = useCallback(async () => {
    try {
      const res = await fetch("/api/sites");
      if (res.ok) {
        const data = await res.json();
        setSites(data.sites || []);
        setCredits(data.credits ?? 3);
        setPlan(data.plan || "free");
        // Keep the global credit counter in the navbar in sync with what
        // the dashboard just fetched. Avoids divergent readings between the
        // sidebar dropdown meter and the header badge.
        if (typeof data.credits === "number") {
          useCreditsStore.getState().setBalance(data.credits);
        }
        if (data.plan) {
          useCreditsStore.getState().setPlan(data.plan);
        }
      }
    } catch {
      // API not connected yet
    }
  }, []);

  // Fetch trashed sites
  const fetchTrashed = useCallback(async () => {
    try {
      const res = await fetch("/api/sites?status=archived");
      if (res.ok) {
        const data = await res.json();
        setTrashedSites(data.sites || []);
      }
    } catch {
      // API not connected yet
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      // Active sites block the loading flag — they're what's visible on
      // first paint. Trash fetches in the background and updates the
      // tab count once it returns; the user won't perceive a delay.
      await fetchSites();
      setLoading(false);
      fetchTrashed();
    }
    loadData();
  }, [fetchSites, fetchTrashed]);

  // Soft-delete: move to trash
  const handleMoveToTrash = async (id: string) => {
    try {
      await fetch(`/api/sites?id=${id}`, { method: "DELETE" });
      const site = sites.find((s) => s.id === id);
      setSites(sites.filter((s) => s.id !== id));
      if (site) setTrashedSites((prev) => [{ ...site, status: "archived" }, ...prev]);
    } catch {
      // Handle error
    }
  };

  // Restore from trash
  const handleRestore = async (id: string) => {
    try {
      await fetch("/api/sites", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "restore" }),
      });
      const site = trashedSites.find((s) => s.id === id);
      setTrashedSites(trashedSites.filter((s) => s.id !== id));
      if (site) setSites((prev) => [{ ...site, status: "draft" }, ...prev]);
    } catch {
      // Handle error
    }
  };

  // Rename a site
  const handleRename = useCallback(async (id: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    // Optimistic update
    setSites((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: trimmed } : s))
    );
    try {
      const res = await fetch("/api/sites", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "rename", name: trimmed }),
      });
      if (!res.ok) {
        // Roll back on failure
        await fetchSites();
      }
    } catch {
      await fetchSites();
    }
  }, [fetchSites]);

  // Permanent delete
  const handlePermanentDelete = async (id: string) => {
    if (!confirm("This will permanently delete this site. Are you sure?")) return;
    try {
      await fetch(`/api/sites?id=${id}&permanent=true`, { method: "DELETE" });
      setTrashedSites(trashedSites.filter((s) => s.id !== id));
    } catch {
      // Handle error
    }
  };

  // Empty trash
  const handleEmptyTrash = async () => {
    if (!confirm("Permanently delete all trashed sites? This cannot be undone.")) return;
    for (const site of trashedSites) {
      await fetch(`/api/sites?id=${site.id}&permanent=true`, { method: "DELETE" });
    }
    setTrashedSites([]);
  };

  // Sort and filter sites
  const displaySites = useMemo(() => {
    let result = [...sites];

    // Search filter
    if (searchQuery) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortMode === "updated") return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      if (sortMode === "created") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [sites, searchQuery, sortMode]);

  // Filtered trashed sites
  const displayTrashed = useMemo(() => {
    if (!searchQuery) return trashedSites;
    return trashedSites.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [trashedSites, searchQuery]);

  const totalCredits = PLANS[plan].generations;
  const planConfig = PLANS[plan];
  const creditPercentage = (credits / totalCredits) * 100;

  const sidebarNavItems: { label: NavView; icon: typeof Clock }[] = [
    { label: "Chat", icon: Sparkles },
    { label: "Recents", icon: Clock },
    { label: "All Projects", icon: FolderOpen },
    { label: "Templates", icon: FileText },
    { label: "Trash", icon: Trash2 },
  ];

  const { theme, setTheme } = useTheme();

  /* Sidebar content — shared between desktop sidebar and mobile drawer */
  const sidebarContent = (
    <>
      {/* Brand header */}
      <div className="p-4 flex items-center justify-between">
        <Link href="/dashboard" onClick={() => { setActiveNav("Chat"); setMobileMenuOpen(false); }}>
          <span className="flex items-center gap-1 text-xl font-bold text-foreground">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Weavo Logo" className="h-5 w-auto object-contain opacity-95 dark:invert-0 invert" />
          </span>
        </Link>
        <button
          onClick={() => { setSidebarCollapsed(true); setMobileMenuOpen(false); }}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all"
          title="Hide sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        {/* New Site — primary CTA */}
        <Link
          href="/wizard"
          onClick={() => setMobileMenuOpen(false)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all bg-purple-500/10 text-foreground border border-purple-500/20 hover:bg-purple-500/15"
        >
          <Plus className="w-4 h-4 text-purple-400" />
          New Site
        </Link>
        <div className="my-1.5 mx-3 border-t border-border" />

        {loading ? (
          <div className="space-y-0.5 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                <div className="w-4 h-4 rounded bg-foreground/[0.06]" />
                <div className="h-3.5 bg-foreground/[0.04] rounded w-24" />
              </div>
            ))}
          </div>
        ) : (
          sidebarNavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActiveNav(item.label); setSearchQuery(""); setMobileMenuOpen(false); if (item.label === "Templates") setSelectedTemplateId(null); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                activeNav === item.label
                  ? "bg-foreground/[0.08] text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.label === "Trash" && trashedSites.length > 0 && (
                <span className="ml-auto text-[10px] bg-foreground/[0.08] px-1.5 py-0.5 rounded-full">
                  {trashedSites.length}
                </span>
              )}
            </button>
          ))
        )}
      </nav>

      {/* Bottom profile section */}
      <div className="mt-auto border-t border-border">
        {!userLoaded ? (
          <div className="flex items-center gap-3 p-3 animate-pulse">
            <div className="w-9 h-9 rounded-full bg-foreground/[0.06] shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="h-3 bg-foreground/[0.06] rounded w-20 mb-2" />
              <div className="h-2 bg-foreground/[0.04] rounded w-12" />
            </div>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <div className="flex items-center gap-3 p-3 hover:bg-foreground/[0.04] transition-colors cursor-pointer">
                {/* Avatar */}
                {user?.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={user.imageUrl} alt={user?.fullName || "User"} className="w-9 h-9 rounded-full object-cover shrink-0 border border-border" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-foreground/[0.08] flex items-center justify-center text-foreground text-sm font-semibold shrink-0">
                    {user?.fullName?.charAt(0)?.toUpperCase() || user?.primaryEmailAddress?.emailAddress?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate capitalize">
                    {planConfig.name} plan
                  </p>
                </div>
                <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="center"
              sideOffset={12}
              className="w-[calc(260px-1.5rem)] bg-popover backdrop-blur-xl border-border rounded-xl p-1 shadow-2xl z-50"
            >
              {/* Email */}
              <div className="px-3 py-2 text-xs text-muted-foreground truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </div>
              <DropdownMenuSeparator className="bg-border" />

              {/* Settings */}
              <DropdownMenuItem asChild>
                <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-sm">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              {/* Billing */}
              <DropdownMenuItem asChild>
                <Link href="/billing/manage" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-sm">
                  <CreditCard className="w-4 h-4" />
                  Billing
                </Link>
              </DropdownMenuItem>

              {/* Help */}
              <DropdownMenuItem asChild>
                <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-sm">
                  <HelpCircle className="w-4 h-4" />
                  Get help
                </Link>
              </DropdownMenuItem>

              {/* Theme Switcher */}
              <DropdownMenuItem 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-3 text-sm cursor-pointer"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-4 h-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    Dark Mode
                  </>
                )}
              </DropdownMenuItem>

              {/* Upgrade plan / Buy more credits */}
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem asChild>
                <Link href="/billing" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  {plan === "free" ? "Upgrade plan" : "Buy credits"}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border" />

              {/* Log out */}
              <DropdownMenuItem
                onClick={() => signOut({ redirectUrl: "/" })}
                className="flex items-center gap-3 text-sm text-destructive focus:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden transition-colors duration-300">
      <AnnouncementBanner />
      <div className="flex-1 flex overflow-hidden bg-background">
          {/* ===== MOBILE SIDEBAR DRAWER ===== */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" showCloseButton={false} className="w-[280px] p-0 bg-card/95 border-border flex flex-col">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          {sidebarContent}
        </SheetContent>
      </Sheet>

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border bg-card/50 shrink-0 h-screen overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[width] relative",
          sidebarCollapsed ? "w-[52px]" : "w-[260px]"
        )}
      >
        {/* Layer 1: Collapsed Rail */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-[52px] flex flex-col items-center py-3 gap-1 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform z-20",
            sidebarCollapsed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
          )}
        >
          {/* ... (rest of collapsed rail) */}
          {/* Expand button */}
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all mb-2"
            title="Show sidebar"
          >
            <PanelLeft className="w-5 h-5" />
          </button>

          {/* New Site icon */}
          <Link
            href="/wizard"
            title="New Site"
            className="p-2 rounded-lg bg-purple-500/10 text-foreground hover:bg-purple-500/15 transition-all"
          >
            <Plus className="w-5 h-5 text-purple-400" />
          </Link>
          <div className="my-1 w-5 border-t border-border" />

          {/* Nav icons */}
          {sidebarNavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActiveNav(item.label); setSearchQuery(""); if (item.label === "Templates") setSelectedTemplateId(null); }}
              title={item.label}
              className={cn(
                "p-2 rounded-lg transition-all relative",
                activeNav === item.label
                  ? "bg-foreground/[0.08] text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label === "Trash" && trashedSites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-foreground/[0.15] text-[8px] flex items-center justify-center">
                  {trashedSites.length}
                </span>
              )}
            </button>
          ))}

          <div className="flex-1" />

          {/* Bottom avatar rail */}
          {!userLoaded ? (
            <div className="w-9 h-9 rounded-full bg-foreground/[0.06] animate-pulse shrink-0" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div
                  className="w-9 h-9 rounded-full bg-foreground/[0.08] flex items-center justify-center text-foreground text-sm font-semibold shrink-0 hover:bg-foreground/[0.12] transition-all cursor-pointer overflow-hidden border border-border"
                  title={user?.fullName || "Profile"}
                >
                  {user?.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={user.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    user?.fullName?.charAt(0)?.toUpperCase() || user?.primaryEmailAddress?.emailAddress?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                sideOffset={12}
                className="w-56 bg-popover backdrop-blur-xl border-border rounded-xl p-1 z-[100]"
              >
                {/* Email */}
                <div className="px-3 py-2 text-xs text-muted-foreground truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </div>
                <DropdownMenuSeparator className="bg-foreground/[0.06]" />

                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-3 text-sm">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/billing/manage" className="flex items-center gap-3 text-sm">
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

                {/* Theme Switcher */}
                <DropdownMenuItem 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-3 text-sm cursor-pointer"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-4 h-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" />
                      Dark Mode
                    </>
                  )}
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-foreground/[0.06]" />
                <DropdownMenuItem asChild>
                  <Link href="/billing" className="flex items-center gap-3 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    {plan === "free" ? "Upgrade plan" : "Buy credits"}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-foreground/[0.06]" />

                <DropdownMenuItem
                  onClick={() => signOut({ redirectUrl: "/" })}
                  className="flex items-center gap-3 text-sm text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Layer 2: Expanded Content */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-[260px] flex flex-col h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform z-10",
            sidebarCollapsed ? "opacity-0 -translate-x-4 pointer-events-none" : "opacity-100 translate-x-0"
          )}
        >
          {sidebarContent}
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col min-w-0 transition-[padding,margin] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[padding,margin]">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-background/50 flex items-center gap-4 px-3 md:px-6 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
          {/* Mobile: hamburger + logo */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/dashboard" className="flex items-center gap-1.5">
              <span className="text-base font-bold text-foreground">Weavo</span>
            </Link>
          </div>

          {/* Desktop: breadcrumb + dynamic logo on left */}
          <div className="hidden md:flex items-center gap-3 text-sm shrink-0">
            {/* Logo shown only when sidebar is collapsed */}
            <div className={cn(
              "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden flex items-center",
              sidebarCollapsed ? "w-32 opacity-100 translate-x-0 mr-1" : "w-0 opacity-0 -translate-x-4 pointer-events-none"
            )}>
              <Link href="/dashboard" className="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png" alt="Weavo Logo" className="h-7 w-auto object-contain opacity-95 dark:invert-0 invert" />
              </Link>
              <div className="h-4 w-px bg-border/60 mx-4 shrink-0" />
            </div>

            <span className="text-muted-foreground">Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
            <span className="text-foreground font-medium">{activeNav}</span>
            {activeNav !== "Templates" && activeNav !== "Chat" && (
              <span className="ml-1 text-[11px] text-muted-foreground bg-foreground/[0.05] border border-border rounded-full px-2 py-0.5 tabular-nums">
                {activeNav === "Trash" ? displayTrashed.length : displaySites.length}
              </span>
            )}
          </div>

          {/* Search bar — hidden on Chat view (nothing to search) */}
          {activeNav !== "Chat" && (
            <div className="hidden md:block flex-1 max-w-sm ml-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 text-xs bg-foreground/[0.04] border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/40 focus:bg-foreground/[0.06] transition-all"
                />
              </div>
            </div>
          )}

          <div className="flex-1 md:hidden" />

          {/* Desktop: Action pills — right side */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <CreditCounter />
          </div>

          {/* Mobile: avatar */}
          <div className="flex items-center gap-2 md:hidden">
            <CreditCounter compact />
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
              {activeNav === "Chat" ? (
                <AIChatSection />
              ) : activeNav === "Templates" ? (
                <TemplatesGallery selectedIndustry={selectedTemplateId} onSelectIndustry={setSelectedTemplateId} />
              ) : activeNav === "Trash" ? (
                <TrashView
                  sites={displayTrashed}
                  loading={loading}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  onRestore={handleRestore}
                  onPermanentDelete={handlePermanentDelete}
                  onEmptyTrash={handleEmptyTrash}
                  searchQuery={searchQuery}
                />
              ) : (
                <SitesView
                  sites={displaySites}
                  loading={loading}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  sortMode={sortMode}
                  setSortMode={setSortMode}
                  activeNav={activeNav}
                  setActiveNav={setActiveNav}
                  searchQuery={searchQuery}
                  onDelete={handleMoveToTrash}
                  onRename={handleRename}
                  plan={plan}
                />
              )}
            </div>
        </main>
      </div>
    </div>
    </div>
  );
}

/* ===== THUMBNAIL HELPERS ===== */

// Injects CSS into stored site HTML so the iframe naturally shows the top
// portion of the page (nav + hero) clipped to the thumbnail height — without
// any JS-based "find the hero" heuristic. The previous JS-driven approach
// was brittle: it broke for sites whose first body-child was a position:fixed
// nav (which the script misidentified as the hero). The CSS-only approach
// is deterministic and works for every layout structure the AI emits.
function buildHeroSrcDoc(html: string): string {
  if (!html) return "";
  const injection = `<style id="__weavo_thumb_style__">
    /* Reset margins and disable scrolling — the iframe already crops via overflow:hidden */
    html, body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: transparent !important; }

    /* Force fixed / sticky / absolute navs and headers into normal flow so they
       sit above the hero (in document order) instead of overlapping it. Without
       this, sites whose navs use position:fixed render as a thin floating bar
       in the thumbnail with empty space below. */
    nav, header,
    [class*="fixed"], [class*="sticky"], [class*="absolute"] {
      position: static !important;
    }

    /* Re-apply the most common in-flow layouts after the position reset above
       (which is intentionally aggressive). Anything that needs to stay
       absolutely positioned should add the position via inline style or via
       a more specific selector — generated sites don't do that. */

    /* Neutralize entrance animations / scroll-reveal hidden states. The
       weavo-runtime sets inline style="opacity:0; transform:translateY(28px)"
       on [data-reveal] elements that start below the viewport — that includes
       most of the hero in a small iframe. Force everything visible. */
    [data-reveal], [data-reveal-stagger] > *,
    .animate, .animate-fade, .animate-scale,
    [class*="opacity-0"] {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
      transition: none !important;
    }

    /* Belt-and-suspenders: any element with inline opacity:0 should become
       visible. Inline styles without !important lose to this CSS !important. */
    [style*="opacity: 0"], [style*="opacity:0"] {
      opacity: 1 !important;
    }

    /* Disable smooth scroll which can cause layout flicker on iframe load */
    html { scroll-behavior: auto !important; }
  </style>`;
  if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, `${injection}</head>`);
  if (/<body[^>]*>/i.test(html)) return html.replace(/<body[^>]*>/i, (m) => `${m}${injection}`);
  return injection + html;
}

/* ===== SITES VIEW (Recents / All Projects) ===== */

function SitesView({
  sites,
  loading,
  viewMode,
  setViewMode,
  sortMode,
  setSortMode,
  activeNav,
  setActiveNav,
  searchQuery,
  onDelete,
  onRename,
  plan,
}: {
  sites: Site[];
  loading: boolean;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  sortMode: SortMode;
  setSortMode: (s: SortMode) => void;
  activeNav: NavView;
  setActiveNav: (v: NavView) => void;
  searchQuery: string;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  plan: "free" | "pro" | "business";
}) {
  const [showRecommended, setShowRecommended] = useState(true);

  const recommendedTemplates = [
    {
      id: "restaurant",
      title: "Restaurant Template",
      desc: "Menu, reservations & gallery",
    },
    {
      id: "portfolio",
      title: "Portfolio Template",
      desc: "Showcase your creative work",
    },
    {
      id: "fitness",
      title: "Fitness Template",
      desc: "Programs, trainers & membership",
    },
  ];

  return (
    <>
      {/* Recommended templates */}
      {showRecommended && activeNav === "Recents" && (
        <section className="mb-10">
          <div className="flex items-end justify-between mb-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#C8E600", boxShadow: "0 0 8px #C8E600" }}
                />
                <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground">
                  Curated for you
                </span>
              </div>
              <h2 className="text-xl font-semibold text-foreground tracking-tight">
                Start from a template
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveNav("Templates")}
                className="text-xs font-medium text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-md hover:bg-foreground/[0.05] transition-colors"
              >
                View all
              </button>
              <button
                onClick={() => setShowRecommended(false)}
                className="text-xs font-medium text-muted-foreground/40 hover:text-foreground px-2.5 py-1.5 rounded-md hover:bg-foreground/[0.05] transition-colors"
                title="Hide this section"
              >
                Hide
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommendedTemplates.map((t) => (
              <RecommendedTemplateCard key={t.id} t={t} />
            ))}
          </div>
        </section>
      )}

      {/* Header row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {activeNav === "Recents" ? "Recently Edited" : "All Projects"}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {sites.length} site{sites.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs bg-foreground/[0.03] border border-border text-muted-foreground hover:text-foreground transition-all focus:outline-none">
              {sortMode === "updated" ? "Last edited" : sortMode === "created" ? "Date created" : "Name A-Z"}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover backdrop-blur-xl border-border">
              <DropdownMenuItem onClick={() => setSortMode("updated")} className="text-xs">Last edited</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortMode("created")} className="text-xs">Date created</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortMode("name")} className="text-xs">Name A-Z</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View toggle */}
          <div className="flex items-center bg-foreground/[0.03] rounded-lg p-0.5 border border-border">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-1.5 rounded-md transition-all", viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-1.5 rounded-md transition-all", viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <SkeletonGrid viewMode={viewMode} />
      ) : sites.length === 0 && !searchQuery ? (
        <EmptyState />
      ) : sites.length === 0 && searchQuery ? (
        <SearchEmpty query={searchQuery} />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <SiteGridCard
              key={site.id}
              site={site}
              onDelete={onDelete}
              onRename={onRename}
              plan={plan}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {sites.map((site) => (
            <SiteListRow
              key={site.id}
              site={site}
              onDelete={onDelete}
              onRename={onRename}
              plan={plan}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ===== TEMPLATES GALLERY ===== */

function TemplatesGallery({ selectedIndustry, onSelectIndustry }: { selectedIndustry: string | null; onSelectIndustry: (id: string | null) => void }) {
  const [templateSearch, setTemplateSearch] = useState("");

  const filteredIndustries = useMemo(() => {
    if (!templateSearch.trim()) return INDUSTRIES;
    const q = templateSearch.toLowerCase();
    return INDUSTRIES.filter((i) => i.label.toLowerCase().includes(q) || i.id.toLowerCase().includes(q));
  }, [templateSearch]);

  return (
    <>
      {selectedIndustry ? (
        <TemplateDetailView
          industryId={selectedIndustry}
          onBack={() => onSelectIndustry(null)}
        />
      ) : (
        <>
          <div className="flex items-start sm:items-center justify-between gap-4 mb-6 flex-col sm:flex-row">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Templates</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Pick a design you love — we&apos;ll generate a unique site inspired by its style
              </p>
            </div>
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search templates..."
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-foreground/[0.03] border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
              />
            </div>
          </div>

          {filteredIndustries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIndustries.map((industry) => (
                <TemplateCard
                  key={industry.id}
                  industry={industry}
                  onPreview={() => onSelectIndustry(industry.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">No templates match &quot;{templateSearch}&quot;</p>
            </div>
          )}
          <p className="text-center text-sm text-muted-foreground mt-8">More templates coming soon — new industries & styles added regularly.</p>
        </>
      )}

    </>
  );
}

/* ===== TEMPLATE DETAIL VIEW ===== */

function TemplateDetailView({
  industryId,
  onBack,
}: {
  industryId: string;
  onBack: () => void;
}) {
  const router = useRouter();
  const preview = getTemplatePreview(industryId);
  const theme = getPreviewTheme(industryId);
  const industry = INDUSTRIES.find((i) => i.id === industryId);
  const palette = preview ? COLOR_PALETTES.find((p) => p.id === preview.paletteId) : undefined;
  const font = preview ? FONT_STYLES.find((f) => f.id === preview.fontStyleId) : undefined;
  const dna = TEMPLATE_DESIGN_DNA[industryId];

  // Group sections into pairs for display cards.
  // Nav/marquee sections are always prepended to the next content section
  // so they never appear as standalone cards with empty space.
  const groupedHtmls = useMemo(() => {
    if (!preview || !theme) return [];
    const isNavLike = (id: string) =>
      /nav|marquee|announcement/i.test(id);

    // First pass: merge nav-like sections with the next content section
    const merged: { componentId: string; content: Record<string, unknown> }[][] = [];
    let pendingNavs: { componentId: string; content: Record<string, unknown> }[] = [];
    for (const section of preview.sections) {
      if (isNavLike(section.componentId)) {
        pendingNavs.push(section);
      } else {
        merged.push([...pendingNavs, section]);
        pendingNavs = [];
      }
    }
    // If there are trailing nav-only sections, push them as a group
    if (pendingNavs.length > 0) merged.push(pendingNavs);

    // Second pass: pair the merged groups into cards of ~2
    const groups: { componentId: string; content: Record<string, unknown> }[][] = [];
    for (let i = 0; i < merged.length; i += 2) {
      const pair = [...merged[i]];
      if (i + 1 < merged.length) pair.push(...merged[i + 1]);
      groups.push(pair);
    }
    return groups.map((group) =>
      assemblePreviewHtml(group, theme, preview.siteName)
    );
  }, [preview, theme]);

  const handleUseTemplate = () => {
    if (!preview) return;
    const pages = INDUSTRY_DEFAULT_PAGES[preview.industryId] || ["Home", "About", "Contact"];
    const params = new URLSearchParams({
      prompt: `Create a stunning ${industry?.label || industryId} website. ${preview.description}`,
      industry: preview.industryId,
      mood: preview.overallFeel || "modern",
      pages: pages.join(","),
      templateId: industryId,
    });
    router.push(`/generate/new?${params.toString()}`);
  };

  if (!preview || !theme || !industry) return null;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <button onClick={onBack} className="hover:text-foreground transition-colors">Templates</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{industry.label}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-foreground">{preview.siteName}</span>
            <span className="text-muted-foreground font-normal"> — {industry.label} Template</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{preview.description}</p>
          {dna && (
            <p className="text-xs text-muted-foreground/60 mt-1.5 max-w-2xl italic">
              AI will generate a unique site inspired by {dna.name}&apos;s style
            </p>
          )}

          {/* Meta pills */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {palette && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground/[0.04] border border-border">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: palette.colors.primary }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: palette.colors.secondary }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: palette.colors.accent }} />
                <span className="text-[11px] text-muted-foreground ml-0.5">{palette.name}</span>
              </div>
            )}
            {font && (
              <span className="text-[11px] text-muted-foreground px-2.5 py-1 rounded-full bg-foreground/[0.04] border border-border">
                {font.fonts.heading} / {font.fonts.body}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground px-2.5 py-1 rounded-full bg-foreground/[0.04] border border-border">
              {preview.sections.length} sections
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`/preview/${industryId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-10 px-5 rounded-full bg-foreground/[0.08] text-foreground text-sm font-medium hover:bg-foreground/[0.12] transition-colors border border-border"
          >
            <Eye className="w-4 h-4" />
            Preview
          </a>
          <button
            onClick={handleUseTemplate}
            className="flex items-center gap-2 h-10 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Generate Like This
          </button>
        </div>
      </div>

      {/* Section screenshots grid */}
      <div className="columns-1 lg:columns-2 gap-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
        {groupedHtmls.map((html, i) => (
          <SectionScreenshot key={i} html={html} cardIndex={i} />
        ))}
      </div>
    </div>
  );
}

/* ===== SECTION SCREENSHOT ===== */

function SectionScreenshot({ html, cardIndex }: { html: string; cardIndex: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(0);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  // Replace 100vh with a fixed px value so sections don't balloon in the iframe
  const patchedHtml = useMemo(() => {
    return html.replace(/min-height:\s*100vh/g, "min-height:700px").replace(/height:\s*100vh/g, "height:700px");
  }, [html]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1440);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleLoad = useCallback(() => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc?.body) {
        let h = 0;
        const children = doc.body.children;
        if (children.length > 0) {
          for (let i = 0; i < children.length; i++) {
            const rect = children[i].getBoundingClientRect();
            h = Math.max(h, Math.ceil(rect.bottom));
          }
        }
        if (h <= 0) h = doc.body.scrollHeight;
        if (h > 0) setContentHeight(h);
      }
    } catch {
      // fallback
    }
  }, []);

  const iframeH = contentHeight || 800;
  const scaledH = scale > 0 ? iframeH * scale : 0;
  const cappedH = scaledH > 0 ? Math.max(120, scaledH) : undefined;

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card hover:border-border transition-colors">
      <div
        ref={containerRef}
        className="overflow-hidden relative"
        style={{ height: cappedH || "auto", minHeight: 120 }}
      >
        {scale > 0 && (
          <iframe
            ref={iframeRef}
            srcDoc={patchedHtml}
            title={`Section ${cardIndex + 1}`}
            className="border-0 pointer-events-none select-none block"
            scrolling="no"
            onLoad={handleLoad}
            style={{
              width: "1440px",
              height: `${iframeH}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              overflow: "hidden",
            }}
            tabIndex={-1}
            loading="lazy"
            sandbox="allow-same-origin"
          />
        )}
      </div>
    </div>
  );
}

function RecommendedTemplateCard({ t }: { t: { id: string; title: string; desc: string } }) {
  const preview = getTemplatePreview(t.id);
  const theme = getPreviewTheme(t.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const previewHtml = useMemo(() => {
    if (!preview || !theme) return "";
    const heroSections: typeof preview.sections = [];
    for (const s of preview.sections) {
      heroSections.push(s);
      if (!/nav|marquee|announcement/i.test(s.componentId)) break;
    }
    return assemblePreviewHtml(heroSections, theme, preview.siteName);
  }, [preview, theme]);

  const iframeRenderWidth = 1440;
  const scale = containerWidth > 0 ? containerWidth / iframeRenderWidth : 0;
  const thumbHeight = 180;
  const iframeHeight = scale > 0 ? Math.ceil(thumbHeight / scale) : 900;

  return (
    <Link href={`/wizard?template=${t.id}`} className="block group cursor-pointer">
      <div className="rounded-lg overflow-hidden border border-border bg-card hover:border-border transition-colors duration-200">
        <div
          ref={containerRef}
          className="relative overflow-hidden bg-muted/30"
          style={{ height: thumbHeight }}
        >
          {previewHtml && scale > 0 ? (
            <iframe
              srcDoc={previewHtml}
              title={t.title}
              className="border-0 pointer-events-none select-none block"
              scrolling="no"
              style={{
                width: `${iframeRenderWidth}px`,
                height: `${iframeHeight}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                overflow: "hidden",
              }}
              tabIndex={-1}
              loading="lazy"
              sandbox="allow-same-origin"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted/30 to-card" />
          )}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-foreground/5 transition-colors duration-200" />
        </div>

        <div className="px-3 py-2.5 flex flex-col justify-end">
          <p className="text-[13px] font-medium text-foreground/90 truncate">{t.title}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{t.desc}</p>
        </div>
      </div>
    </Link>
  );
}

function TemplateCard({
  industry,
  onPreview,
}: {
  industry: (typeof INDUSTRIES)[number];
  onPreview: () => void;
}) {
  const preview = getTemplatePreview(industry.id);
  const theme = getPreviewTheme(industry.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const previewHtml = useMemo(() => {
    if (!preview || !theme) return "";
    const heroSections: typeof preview.sections = [];
    for (const s of preview.sections) {
      heroSections.push(s);
      if (!/nav|marquee|announcement/i.test(s.componentId)) break;
    }
    return assemblePreviewHtml(heroSections, theme, preview.siteName);
  }, [preview, theme]);

  const iframeRenderWidth = 1440;
  const scale = containerWidth > 0 ? containerWidth / iframeRenderWidth : 0;
  const thumbHeight = 180;
  const iframeHeight = scale > 0 ? Math.ceil(thumbHeight / scale) : 900;

  return (
    <div className="group cursor-pointer" onClick={onPreview}>
      <div className="rounded-lg overflow-hidden border border-border bg-card hover:border-border transition-colors duration-200">
        <div
          ref={containerRef}
          className="relative overflow-hidden bg-muted/30"
          style={{ height: thumbHeight }}
        >
          {previewHtml && scale > 0 ? (
            <iframe
              srcDoc={previewHtml}
              title={industry.label}
              className="border-0 pointer-events-none select-none block"
              scrolling="no"
              style={{
                width: `${iframeRenderWidth}px`,
                height: `${iframeHeight}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                overflow: "hidden",
              }}
              tabIndex={-1}
              loading="lazy"
              sandbox="allow-same-origin"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted/30 to-card" />
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-foreground/5 transition-colors duration-200" />
        </div>

        {/* Info row — matching SiteGridCard */}
        <div className="px-3 py-2.5">
          <h3 className="text-[13px] font-medium truncate text-foreground/90">{industry.label}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Free</p>
        </div>
      </div>
    </div>
  );
}

/* ===== TRASH VIEW ===== */

function TrashView({
  sites,
  loading,
  viewMode,
  setViewMode,
  onRestore,
  onPermanentDelete,
  onEmptyTrash,
  searchQuery,
}: {
  sites: Site[];
  loading: boolean;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
  onEmptyTrash: () => void;
  searchQuery: string;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-muted-foreground" />
            Trash
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {sites.length} site{sites.length !== 1 ? "s" : ""} in trash
          </p>
        </div>

        <div className="flex items-center gap-2">
          {sites.length > 0 && (
            <button
              onClick={onEmptyTrash}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs text-destructive hover:text-red-300 bg-red-500/[0.08] hover:bg-red-500/[0.12] border border-red-500/[0.15] transition-all"
            >
              <AlertTriangle className="w-3 h-3" />
              Empty Trash
            </button>
          )}

          <div className="flex items-center bg-foreground/[0.03] rounded-lg p-0.5 border border-border">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-1.5 rounded-md transition-all", viewMode === "grid" ? "bg-foreground/[0.1] text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-1.5 rounded-md transition-all", viewMode === "list" ? "bg-foreground/[0.1] text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <SkeletonGrid viewMode={viewMode} />
      ) : sites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-foreground/[0.04] border border-border flex items-center justify-center mb-5">
            <Trash2 className="w-7 h-7 text-muted-foreground/40" />
          </div>
          <h3 className="text-base font-medium mb-1">Trash is empty</h3>
          <p className="text-xs text-muted-foreground max-w-xs">
            Sites you delete will appear here. You can restore them or permanently remove them.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <TrashedGridCard
              key={site.id}
              site={site}
              onRestore={onRestore}
              onPermanentDelete={onPermanentDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {sites.map((site) => (
            <TrashedListRow
              key={site.id}
              site={site}
              onRestore={onRestore}
              onPermanentDelete={onPermanentDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ===== TRASHED SITE GRID CARD ===== */

function TrashedGridCard({
  site,
  onRestore,
  onPermanentDelete,
}: {
  site: Site;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const inView = useInViewport(containerRef);

  const siteHtml = site.site_json?.html || "";
  const heroSrcDoc = useMemo(
    () => (inView ? buildHeroSrcDoc(siteHtml) : ""),
    [siteHtml, inView]
  );

  const formattedDate = new Date(site.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const iframeRenderWidth = 1440;
  const scale = containerWidth > 0 ? containerWidth / iframeRenderWidth : 0;
  const thumbHeight = 180;
  const iframeHeight = scale > 0 ? Math.ceil(thumbHeight / scale) : 900;

  return (
    <div className="group rounded-lg overflow-hidden border border-border bg-card hover:border-border transition-colors duration-200">
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-muted/30"
        style={{ height: thumbHeight }}
      >
        {heroSrcDoc && scale > 0 ? (
          <iframe
            srcDoc={heroSrcDoc}
            title={site.name}
            className="border-0 pointer-events-none select-none block grayscale opacity-60 group-hover:opacity-80 transition-opacity"
            scrolling="no"
            style={{
              width: `${iframeRenderWidth}px`,
              height: `${iframeHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              overflow: "hidden",
            }}
            tabIndex={-1}
            loading="lazy"
            sandbox="allow-scripts"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted/30 to-card flex items-center justify-center">
            <Globe className="w-8 h-8 text-foreground/10" />
          </div>
        )}
      </div>

      <div className="px-3 py-2.5 flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-[13px] font-medium truncate text-foreground/90">{site.name}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Deleted {formattedDate}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 rounded-md hover:bg-foreground/[0.08] transition-colors opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 shrink-0 focus:outline-none">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 bg-popover backdrop-blur-xl border-border">
            <DropdownMenuItem onClick={() => onRestore(site.id)} className="flex items-center gap-2 text-xs">
              <RotateCcw className="w-3.5 h-3.5" /> Restore
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPermanentDelete(site.id)} className="text-destructive focus:text-destructive text-xs">
              <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Permanently
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

/* ===== TRASHED SITE LIST ROW ===== */

function TrashedListRow({
  site,
  onRestore,
  onPermanentDelete,
}: {
  site: Site;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}) {
  const formattedDate = new Date(site.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-foreground/[0.03] transition-colors opacity-70 hover:opacity-100">
      <div className="w-14 h-10 rounded-md bg-gradient-to-br from-red-900/15 via-gray-900/10 to-gray-900/5 border border-border flex items-center justify-center shrink-0">
        <Globe className="w-4 h-4 text-foreground/15" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium truncate line-through decoration-foreground/20">{site.name}</h3>
      </div>

      <span className="text-xs text-muted-foreground">{formattedDate}</span>

      <div className="flex items-center gap-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onRestore(site.id)}
          className="flex items-center gap-1 h-7 px-2 rounded-md text-xs text-foreground bg-foreground/[0.06] hover:bg-foreground/[0.1] transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          Restore
        </button>
        <button
          onClick={() => onPermanentDelete(site.id)}
          className="flex items-center gap-1 h-7 px-2 rounded-md text-xs text-destructive bg-red-500/[0.06] hover:bg-red-500/[0.1] transition-all"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

/* ===== RENAME DIALOG ===== */

function RenameDialog({
  open,
  initialName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  initialName: string;
  onClose: () => void;
  onConfirm: (newName: string) => void;
}) {
  const [value, setValue] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setValue(initialName);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [open, initialName]);

  if (!open) return null;

  const submit = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== initialName) {
      onConfirm(trimmed);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border bg-popover p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-foreground">Rename site</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Pick a short, memorable name. This is what shows up on your dashboard.
        </p>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if (e.key === "Escape") onClose();
          }}
          maxLength={100}
          className="mt-4 w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25"
        />
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="h-8 px-3 rounded-md text-xs text-muted-foreground hover:bg-foreground/[0.05] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!value.trim() || value.trim() === initialName}
            className="h-8 px-3 rounded-md text-xs font-medium bg-foreground text-background hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== SITE GRID CARD ===== */

function SiteGridCard({
  site,
  onDelete,
  onRename,
  plan,
}: {
  site: Site;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  plan: "free" | "pro" | "business";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [renameOpen, setRenameOpen] = useState(false);
  const inView = useInViewport(containerRef);

  const siteHtml = site.site_json?.html || "";
  // Defer the (expensive) HTML transform until the card is actually visible.
  const heroSrcDoc = useMemo(
    () => (inView ? buildHeroSrcDoc(siteHtml) : ""),
    [siteHtml, inView]
  );

  const formattedDate = new Date(site.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Render the iframe at a width of 1440 and set the viewport height equal
  // to the visible crop area (thumbHeight / scale). Combined with the
  // isolation script that forces the hero to min-h-100vh, the hero fills
  // the iframe exactly — no leakage from sections below.
  const iframeRenderWidth = 1440;
  const scale = containerWidth > 0 ? containerWidth / iframeRenderWidth : 0;
  const thumbHeight = 180;
  const iframeHeight = scale > 0 ? Math.ceil(thumbHeight / scale) : 900;

  return (
    <div className="group rounded-lg overflow-hidden border border-border bg-card hover:border-border transition-colors duration-200">
      {/* Thumbnail */}
      <Link href={`/editor/${site.id}`} className="block">
        <div
          ref={containerRef}
          className="relative overflow-hidden bg-muted/30"
          style={{ height: thumbHeight }}
        >
          {heroSrcDoc && scale > 0 ? (
            <iframe
              srcDoc={heroSrcDoc}
              title={site.name}
              className="border-0 pointer-events-none select-none block"
              scrolling="no"
              style={{
                width: `${iframeRenderWidth}px`,
                height: `${iframeHeight}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                overflow: "hidden",
              }}
              tabIndex={-1}
              loading="lazy"
              sandbox="allow-scripts"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted/30 to-card flex items-center justify-center">
              <Globe className="w-8 h-8 text-foreground/10" />
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-foreground/5 transition-colors duration-200" />
        </div>
      </Link>

      {/* Info row — Figma style */}
      <div className="px-3 py-2.5 flex items-center justify-between gap-2">
        <Link href={`/editor/${site.id}`} className="min-w-0 flex-1">
          <h3 className="text-[13px] font-medium truncate text-foreground/90">{site.name}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {site.industry && <span className="capitalize">{site.industry}</span>}
            {site.industry && " \u00B7 "}
            {formattedDate}
          </p>
        </Link>

        <div className="flex items-center gap-1 shrink-0">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ExportButton
              projectId={site.id}
              userPlan={plan}
              siteCreatedAt={site.created_at}
              siteName={site.name}
              compact
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 rounded-md hover:bg-foreground/[0.08] transition-colors opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 shrink-0 focus:outline-none">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-popover backdrop-blur-xl border-border">
              <DropdownMenuItem asChild>
                <Link href={`/editor/${site.id}`} className="flex items-center gap-2 text-xs">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setRenameOpen(true)}
                className="flex items-center gap-2 text-xs"
              >
                <FileText className="w-3.5 h-3.5" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/editor/${site.id}?export=true`} className="flex items-center gap-2 text-xs">
                  <Download className="w-3.5 h-3.5" /> Export HTML
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(site.id)} className="text-destructive focus:text-destructive text-xs">
                <Trash2 className="w-3.5 h-3.5 mr-2" /> Move to Trash
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <RenameDialog
        open={renameOpen}
        initialName={site.name}
        onClose={() => setRenameOpen(false)}
        onConfirm={(newName) => onRename(site.id, newName)}
      />
    </div>
  );
}

/* ===== SITE LIST ROW ===== */

function SiteListRow({
  site,
  onDelete,
  onRename,
  plan,
}: {
  site: Site;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  plan: "free" | "pro" | "business";
}) {
  const thumbRef = useRef<HTMLAnchorElement>(null);
  const inView = useInViewport(thumbRef);
  const [renameOpen, setRenameOpen] = useState(false);
  const siteHtml = site.site_json?.html || "";
  const heroSrcDoc = useMemo(
    () => (inView ? buildHeroSrcDoc(siteHtml) : ""),
    [siteHtml, inView]
  );
  const formattedDate = new Date(site.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-foreground/[0.03] transition-colors">
      <Link
        ref={thumbRef}
        href={`/editor/${site.id}`}
        className="w-16 h-11 rounded-md border border-border overflow-hidden shrink-0 relative"
      >
        {heroSrcDoc ? (
          <iframe
            srcDoc={heroSrcDoc}
            title={site.name}
            className="border-0 pointer-events-none select-none block"
            scrolling="no"
            style={{
              width: "1440px",
              height: "990px",
              transform: "scale(0.0444)",
              transformOrigin: "top left",
              overflow: "hidden",
            }}
            tabIndex={-1}
            loading="lazy"
            sandbox="allow-scripts"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/25 via-blue-900/15 to-cyan-900/10 flex items-center justify-center">
            <Globe className="w-4 h-4 text-foreground/15" />
          </div>
        )}
      </Link>

      <Link href={`/editor/${site.id}`} className="flex-1 min-w-0">
        <h3 className="text-sm font-medium truncate">{site.name}</h3>
      </Link>

      <span className="hidden sm:block text-xs text-muted-foreground capitalize w-28 truncate">
        {site.industry || "\u2014"}
      </span>

      <Badge variant="secondary" className="hidden sm:flex text-[10px] capitalize bg-foreground/[0.04] border-border h-5">
        {site.status}
      </Badge>

      <span className="text-xs text-muted-foreground w-24 text-right">{formattedDate}</span>

      <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <ExportButton
          projectId={site.id}
          userPlan={plan}
          siteCreatedAt={site.created_at}
          siteName={site.name}
          compact
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="p-1 rounded-md hover:bg-foreground/[0.08] transition-colors md:opacity-0 md:group-hover:opacity-100 data-[state=open]:opacity-100 focus:outline-none">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-popover backdrop-blur-xl border-border">
          <DropdownMenuItem asChild>
            <Link href={`/editor/${site.id}`} className="flex items-center gap-2 text-xs">
              <Edit className="w-3.5 h-3.5" /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setRenameOpen(true)}
            className="flex items-center gap-2 text-xs"
          >
            <FileText className="w-3.5 h-3.5" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/editor/${site.id}?export=true`} className="flex items-center gap-2 text-xs">
              <Download className="w-3.5 h-3.5" /> Export HTML
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(site.id)} className="text-destructive focus:text-destructive text-xs">
            <Trash2 className="w-3.5 h-3.5 mr-2" /> Move to Trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RenameDialog
        open={renameOpen}
        initialName={site.name}
        onClose={() => setRenameOpen(false)}
        onConfirm={(newName) => onRename(site.id, newName)}
      />
    </div>
  );
}

/* ===== SHARED COMPONENTS ===== */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-2xl bg-foreground/[0.06] border border-border flex items-center justify-center mb-6">
        <Sparkles className="w-9 h-9 text-muted-foreground/60" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No websites yet</h2>
      <p className="text-muted-foreground text-sm mb-8 max-w-sm">
        Create your first AI-generated website in seconds. Describe your business and let Weavo handle the rest.
      </p>
      <Link
        href="/wizard"
        className="flex items-center gap-2 h-10 px-6 rounded-xl bg-transparent text-foreground text-sm font-medium border-2 border-foreground/40 hover:border-foreground/60 hover:bg-foreground/[0.06] transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Create Your First Website
      </Link>
    </div>
  );
}

function SearchEmpty({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Search className="w-10 h-10 text-muted-foreground/40 mb-4" />
      <p className="text-muted-foreground text-sm">
        No sites matching &ldquo;{query}&rdquo;
      </p>
    </div>
  );
}

function SkeletonGrid({ viewMode }: { viewMode: ViewMode }) {
  return (
    <div className={cn(
      viewMode === "grid"
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        : "flex flex-col gap-1.5"
    )}>
      {[1, 2, 3, 4, 5, 6].map((i) =>
        viewMode === "grid" ? (
          <div key={i} className="rounded-lg overflow-hidden border border-border bg-card animate-pulse">
            {/* Thumbnail area */}
            <div className="bg-muted/30" style={{ height: 180 }} />
            
            {/* Info row */}
            <div className="px-3 py-2.5 flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="h-4 bg-foreground/[0.04] rounded w-3/4 mb-2" />
                <div className="h-3 bg-foreground/[0.04] rounded w-1/2" />
              </div>
              <div className="w-6 h-6 rounded bg-foreground/[0.04] shrink-0" />
            </div>
          </div>
        ) : (
          <div key={i} className="flex items-center gap-4 px-3 py-2.5 rounded-lg border border-transparent bg-foreground/[0.01] animate-pulse">
            {/* Thumbnail */}
            <div className="w-16 h-11 rounded-md border border-border bg-foreground/[0.04] shrink-0" />
            
            {/* Name */}
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-foreground/[0.04] rounded w-1/4" />
            </div>

            {/* Industry */}
            <div className="hidden sm:block w-28 shrink-0">
              <div className="h-3 bg-foreground/[0.04] rounded w-3/4" />
            </div>

            {/* Status */}
            <div className="hidden sm:flex w-12 shrink-0">
              <div className="h-5 bg-foreground/[0.04] rounded-full w-full" />
            </div>

            {/* Date */}
            <div className="w-24 shrink-0 flex justify-end">
              <div className="h-3 bg-foreground/[0.04] rounded w-20" />
            </div>

            {/* Action */}
            <div className="w-6 h-6 rounded bg-foreground/[0.04] shrink-0" />
          </div>
        )
      )}
    </div>
  );
}

