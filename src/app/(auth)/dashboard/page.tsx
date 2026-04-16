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
  Layers,
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
import { useRouter, useSearchParams } from "next/navigation";
import { Menu, Eye, ChevronRight } from "lucide-react";
import { AIChatSection } from "@/components/dashboard/AIChatSection";

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
  const searchParams = useSearchParams();
  const { user } = useUser();
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
  
  // Use a query parameter to determine if the modal should be shown.
  // This allows the browser's back button to function correctly.
  const [showFlowModal, setShowFlowModal] = useState(!searchParams.get("view"));

  useEffect(() => {
    setShowFlowModal(!searchParams.get("view"));
  }, [searchParams]);

  // Fetch active sites
  const fetchSites = useCallback(async () => {
    try {
      const res = await fetch("/api/sites");
      if (res.ok) {
        const data = await res.json();
        setSites(data.sites || []);
        setCredits(data.credits ?? 3);
        setPlan(data.plan || "free");
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
      await Promise.all([fetchSites(), fetchTrashed()]);
      setLoading(false);
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

  /* Sidebar content — shared between desktop sidebar and mobile drawer */
  const sidebarContent = (
    <>
      {/* Brand header */}
      <div className="p-4 flex items-center justify-between">
        <Link href="/dashboard?view=app" onClick={() => { setActiveNav("Chat"); setMobileMenuOpen(false); }}>
          <span className="flex items-center gap-1 text-xl font-bold text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Weavo Logo" className="w-8 h-8 object-contain opacity-90 scale-[1.7] origin-center" />
            Weavo
          </span>
        </Link>
        <button
          onClick={() => { setSidebarCollapsed(true); setMobileMenuOpen(false); }}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all"
          title="Hide sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-9 pr-3 text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.06] transition-all"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        {sidebarNavItems.map((item, idx) => (
          <div key={item.label}>
            <button
              onClick={() => { setActiveNav(item.label); setSearchQuery(""); setMobileMenuOpen(false); if (item.label === "Templates") setSelectedTemplateId(null); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                item.label === "Chat" && activeNav === "Chat"
                  ? "bg-purple-500/10 text-foreground border border-purple-500/20"
                  : activeNav === item.label
                    ? "bg-white/[0.08] text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
              )}
            >
              <item.icon className={cn("w-4 h-4", item.label === "Chat" && "text-purple-400")} />
              {item.label === "Chat" ? "AI Builder" : item.label}
              {item.label === "Trash" && trashedSites.length > 0 && (
                <span className="ml-auto text-[10px] bg-white/[0.08] px-1.5 py-0.5 rounded-full">
                  {trashedSites.length}
                </span>
              )}
            </button>
            {idx === 0 && <div className="my-1.5 mx-3 border-t border-white/[0.06]" />}
          </div>
        ))}
      </nav>

      {/* Bottom profile section */}
      <div className="mt-auto border-t border-white/[0.06]">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full focus:outline-none">
            <div className="flex items-center gap-3 p-3 hover:bg-white/[0.04] transition-colors cursor-pointer">
              {/* Avatar */}
              {user?.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={user.imageUrl} alt={user?.fullName || "User"} className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/10" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
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
            align="start"
            sideOffset={8}
            className="w-[calc(260px-1.5rem)] bg-[rgba(20,20,40,0.97)] backdrop-blur-xl border-white/[0.1] rounded-xl p-1"
          >
            {/* Email */}
            <div className="px-3 py-2 text-xs text-muted-foreground truncate">
              {user?.primaryEmailAddress?.emailAddress}
            </div>
            <DropdownMenuSeparator className="bg-white/[0.06]" />

            {/* Settings */}
            <DropdownMenuItem asChild>
              <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-sm">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>

            {/* Billing */}
            <DropdownMenuItem asChild>
              <Link href="/billing" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-sm">
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

            <DropdownMenuSeparator className="bg-white/[0.06]" />

            {/* Credits info */}
            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-white/70" />
                  <span className="text-xs text-muted-foreground">Credits</span>
                </div>
                <span className="text-xs font-medium">{credits}/{totalCredits}</span>
              </div>
              <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${creditPercentage}%` }}
                />
              </div>
            </div>

            {/* Upgrade plan */}
            {plan === "free" && (
              <>
                <DropdownMenuSeparator className="bg-white/[0.06]" />
                <DropdownMenuItem asChild>
                  <Link href="/billing" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    Upgrade plan
                  </Link>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator className="bg-white/[0.06]" />

            {/* Log out */}
            <DropdownMenuItem
              onClick={() => signOut(() => window.location.href = "/")}
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
    <>
      {showFlowModal ? (
        <FlowSelectionScreen 
          onSelect={(flow) => {
            if (flow === "chat") {
              setShowFlowModal(false);
              router.push("/dashboard?view=app");
              setActiveNav("Chat");
            } else {
              router.push("/wizard");
            }
          }} 
        />
      ) : (
        <div className="min-h-screen bg-background flex">
          {/* ===== MOBILE SIDEBAR DRAWER ===== */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" showCloseButton={false} className="w-[280px] p-0 bg-[rgba(10,10,25,0.97)] border-white/[0.06] flex flex-col">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          {sidebarContent}
        </SheetContent>
      </Sheet>

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-white/[0.06] bg-[rgba(10,10,25,0.5)] shrink-0 h-screen sticky top-0 overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          sidebarCollapsed ? "w-[52px]" : "w-[260px]"
        )}
      >
        {/* Collapsed icon rail */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center py-3 gap-1 transition-opacity duration-200",
            sidebarCollapsed ? "opacity-100 delay-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          {/* Expand button */}
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all mb-2"
            title="Show sidebar"
          >
            <PanelLeft className="w-5 h-5" />
          </button>

          {/* Nav icons */}
          {sidebarNavItems.map((item, idx) => (
            <div key={item.label} className="flex flex-col items-center">
              <button
                onClick={() => { setActiveNav(item.label); setSearchQuery(""); if (item.label === "Templates") setSelectedTemplateId(null); }}
                title={item.label === "Chat" ? "AI Builder" : item.label}
                className={cn(
                  "p-2 rounded-lg transition-all relative",
                  item.label === "Chat" && activeNav === "Chat"
                    ? "bg-purple-500/10 text-foreground"
                    : activeNav === item.label
                      ? "bg-white/[0.08] text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                )}
              >
                <item.icon className={cn("w-5 h-5", item.label === "Chat" && "text-purple-400")} />
                {item.label === "Trash" && trashedSites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white/[0.15] text-[8px] flex items-center justify-center">
                    {trashedSites.length}
                  </span>
                )}
              </button>
              {idx === 0 && <div className="my-1 w-5 border-t border-white/[0.06]" />}
            </div>
          ))}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom avatar */}
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold shrink-0 hover:ring-2 hover:ring-white/20 transition-all"
            title={user?.fullName || "Profile"}
          >
            {user?.fullName?.charAt(0)?.toUpperCase() || user?.primaryEmailAddress?.emailAddress?.charAt(0)?.toUpperCase() || "U"}
          </button>
        </div>

        {/* Expanded full sidebar */}
        <div
          className={cn(
            "flex flex-col h-full min-w-[260px] transition-opacity duration-200",
            sidebarCollapsed ? "opacity-0 pointer-events-none" : "opacity-100 delay-100 pointer-events-auto"
          )}
        >
          {sidebarContent}
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-white/[0.06] bg-[rgba(10,10,25,0.3)] flex items-center justify-between px-3 md:px-6 shrink-0">
          {/* Mobile: hamburger + logo */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/dashboard?view=app" className="flex items-center gap-1.5">
              <span className="text-base font-bold text-white">Weavo</span>
            </Link>
          </div>

          {/* Desktop: spacer on left */}
          <div className="hidden md:block" />

          {/* Desktop: Action pills — right side */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => { setActiveNav("Templates"); setSelectedTemplateId(null); }}
              className={cn(
                "flex items-center gap-2 h-9 px-4 rounded-full text-sm transition-all border",
                activeNav === "Templates"
                  ? "bg-white/[0.1] text-foreground border-white/[0.12]"
                  : "bg-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-white/[0.1] border-white/[0.08]"
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              Templates
            </button>
            <Link
              href="/wizard"
              className="flex items-center gap-2 h-9 px-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
              New Site
            </Link>
          </div>

          {/* Mobile: avatar + new site */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold"
            >
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </button>
            <Link
              href="/wizard"
              className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-white text-black text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              New
            </Link>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {activeNav === "Chat" ? (
            <AIChatSection credits={credits} plan={plan} />
          ) : (
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
              {activeNav === "Templates" ? (
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
                  searchQuery={searchQuery}
                  onDelete={handleMoveToTrash}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
      )}
    </>
  );
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
  searchQuery,
  onDelete,
}: {
  sites: Site[];
  loading: boolean;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  sortMode: SortMode;
  setSortMode: (s: SortMode) => void;
  activeNav: NavView;
  searchQuery: string;
  onDelete: (id: string) => void;
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
      {/* Recommended templates banner */}
      {showRecommended && activeNav === "Recents" && (
        <div className="mb-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white/70">
              Recommended templates
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowRecommended(false)}
                className="text-white/30 hover:text-white/60 transition-colors p-1"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommendedTemplates.map((t) => (
              <RecommendedTemplateCard key={t.id} t={t} />
            ))}
          </div>
        </div>
      )}

      {/* Header row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">
            {activeNav === "Recents" ? "Recently Edited" : "All Projects"}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {sites.length} site{sites.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs bg-white/[0.03] border border-white/[0.06] text-muted-foreground hover:text-foreground transition-all">
              {sortMode === "updated" ? "Last edited" : sortMode === "created" ? "Date created" : "Name A-Z"}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[rgba(20,20,40,0.95)] backdrop-blur-xl border-white/[0.1]">
              <DropdownMenuItem onClick={() => setSortMode("updated")} className="text-xs">Last edited</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortMode("created")} className="text-xs">Date created</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortMode("name")} className="text-xs">Name A-Z</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View toggle */}
          <div className="flex items-center bg-white/[0.03] rounded-lg p-0.5 border border-white/[0.06]">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-1.5 rounded-md transition-all", viewMode === "grid" ? "bg-white/[0.1] text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-1.5 rounded-md transition-all", viewMode === "list" ? "bg-white/[0.1] text-foreground" : "text-muted-foreground hover:text-foreground")}
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
            <SiteGridCard key={site.id} site={site} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {sites.map((site) => (
            <SiteListRow key={site.id} site={site} onDelete={onDelete} />
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
              <h2 className="text-lg font-semibold">Templates</h2>
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
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-colors"
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
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: palette.colors.primary }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: palette.colors.secondary }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: palette.colors.accent }} />
                <span className="text-[11px] text-muted-foreground ml-0.5">{palette.name}</span>
              </div>
            )}
            {font && (
              <span className="text-[11px] text-muted-foreground px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                {font.fonts.heading} / {font.fonts.body}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              {preview.sections.length} sections
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`/preview/${industryId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-10 px-5 rounded-full bg-white/[0.08] text-foreground text-sm font-medium hover:bg-white/[0.12] transition-colors border border-white/[0.08]"
          >
            <Eye className="w-4 h-4" />
            Preview
          </a>
          <button
            onClick={handleUseTemplate}
            className="flex items-center gap-2 h-10 px-5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
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
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#111118] hover:border-white/[0.12] transition-colors">
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
      <div className="rounded-lg overflow-hidden border border-white/[0.06] bg-[#1e1e22] hover:border-white/[0.12] transition-colors duration-200">
        <div
          ref={containerRef}
          className="relative overflow-hidden bg-[#2a2a2e]"
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
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2e] to-[#1e1e22]" />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
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
      <div className="rounded-lg overflow-hidden border border-white/[0.06] bg-[#1e1e22] hover:border-white/[0.12] transition-colors duration-200">
        <div
          ref={containerRef}
          className="relative overflow-hidden bg-[#2a2a2e]"
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
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2e] to-[#1e1e22]" />
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
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
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs text-red-400 hover:text-red-300 bg-red-500/[0.08] hover:bg-red-500/[0.12] border border-red-500/[0.15] transition-all"
            >
              <AlertTriangle className="w-3 h-3" />
              Empty Trash
            </button>
          )}

          <div className="flex items-center bg-white/[0.03] rounded-lg p-0.5 border border-white/[0.06]">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-1.5 rounded-md transition-all", viewMode === "grid" ? "bg-white/[0.1] text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-1.5 rounded-md transition-all", viewMode === "list" ? "bg-white/[0.1] text-foreground" : "text-muted-foreground hover:text-foreground")}
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
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5">
            <Trash2 className="w-7 h-7 text-muted-foreground/40" />
          </div>
          <h3 className="text-base font-medium mb-1">Trash is empty</h3>
          <p className="text-xs text-muted-foreground max-w-xs">
            Sites you delete will appear here. You can restore them or permanently remove them.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
  const formattedDate = new Date(site.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group rounded-xl border border-white/[0.06] bg-white/[0.02] opacity-70 hover:opacity-100 transition-all duration-200">
      <div className="p-3 pb-0">
        <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-red-900/10 via-gray-900/10 to-gray-900/5 border border-white/[0.04] flex items-center justify-center relative">
          <Globe className="w-8 h-8 text-white/10" />
        </div>
      </div>

      <div className="p-3 pt-2.5">
        <h3 className="text-sm font-medium truncate line-through decoration-white/20">{site.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Deleted {formattedDate}</p>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => onRestore(site.id)}
            className="flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs text-foreground bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            Restore
          </button>
          <button
            onClick={() => onPermanentDelete(site.id)}
            className="flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs text-red-400 hover:text-red-300 bg-red-500/[0.06] hover:bg-red-500/[0.1] transition-all"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
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
    <div className="group flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors opacity-70 hover:opacity-100">
      <div className="w-14 h-10 rounded-md bg-gradient-to-br from-red-900/15 via-gray-900/10 to-gray-900/5 border border-white/[0.06] flex items-center justify-center shrink-0">
        <Globe className="w-4 h-4 text-white/15" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium truncate line-through decoration-white/20">{site.name}</h3>
      </div>

      <span className="text-xs text-muted-foreground">{formattedDate}</span>

      <div className="flex items-center gap-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onRestore(site.id)}
          className="flex items-center gap-1 h-7 px-2 rounded-md text-xs text-foreground bg-white/[0.06] hover:bg-white/[0.1] transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          Restore
        </button>
        <button
          onClick={() => onPermanentDelete(site.id)}
          className="flex items-center gap-1 h-7 px-2 rounded-md text-xs text-red-400 bg-red-500/[0.06] hover:bg-red-500/[0.1] transition-all"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

/* ===== SITE GRID CARD ===== */

function SiteGridCard({ site, onDelete }: { site: Site; onDelete: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const siteHtml = site.site_json?.html || "";

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

  // Scale: render at 1440px, shrink to fit card width
  const iframeRenderWidth = 1440;
  const scale = containerWidth > 0 ? containerWidth / iframeRenderWidth : 0;
  // Thumbnail area height (Figma-style ~180px)
  const thumbHeight = 180;
  // Iframe needs to be tall enough so that when scaled, it fills the thumbHeight
  const iframeHeight = scale > 0 ? Math.ceil(thumbHeight / scale) : 900;

  return (
    <div className="group rounded-lg overflow-hidden border border-white/[0.06] bg-[#1e1e22] hover:border-white/[0.12] transition-colors duration-200">
      {/* Thumbnail */}
      <Link href={`/editor/${site.id}`} className="block">
        <div
          ref={containerRef}
          className="relative overflow-hidden bg-[#2a2a2e]"
          style={{ height: thumbHeight }}
        >
          {siteHtml && scale > 0 ? (
            <iframe
              srcDoc={siteHtml}
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
              sandbox="allow-same-origin"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2e] to-[#1e1e22] flex items-center justify-center">
              <Globe className="w-8 h-8 text-white/10" />
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
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

        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 rounded-md hover:bg-white/[0.08] transition-colors opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 shrink-0 focus:outline-none">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-[rgba(20,20,40,0.95)] backdrop-blur-xl border-white/[0.1]">
            <DropdownMenuItem asChild>
              <Link href={`/editor/${site.id}`} className="flex items-center gap-2 text-xs">
                <Edit className="w-3.5 h-3.5" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/editor/${site.id}?export=true`} className="flex items-center gap-2 text-xs">
                <Download className="w-3.5 h-3.5" /> Export
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(site.id)} className="text-red-400 focus:text-red-400 text-xs">
              <Trash2 className="w-3.5 h-3.5 mr-2" /> Move to Trash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

/* ===== SITE LIST ROW ===== */

function SiteListRow({ site, onDelete }: { site: Site; onDelete: (id: string) => void }) {
  const siteHtml = site.site_json?.html || "";
  const formattedDate = new Date(site.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors">
      <Link
        href={`/editor/${site.id}`}
        className="w-16 h-11 rounded-md border border-white/[0.06] overflow-hidden shrink-0 relative"
      >
        {siteHtml ? (
          <iframe
            srcDoc={siteHtml}
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
            sandbox="allow-same-origin"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/25 via-blue-900/15 to-cyan-900/10 flex items-center justify-center">
            <Globe className="w-4 h-4 text-white/15" />
          </div>
        )}
      </Link>

      <Link href={`/editor/${site.id}`} className="flex-1 min-w-0">
        <h3 className="text-sm font-medium truncate">{site.name}</h3>
      </Link>

      <span className="hidden sm:block text-xs text-muted-foreground capitalize w-28 truncate">
        {site.industry || "\u2014"}
      </span>

      <Badge variant="secondary" className="hidden sm:flex text-[10px] capitalize bg-white/[0.04] border-white/[0.08] h-5">
        {site.status}
      </Badge>

      <span className="text-xs text-muted-foreground w-24 text-right">{formattedDate}</span>

      <DropdownMenu>
        <DropdownMenuTrigger className="p-1 rounded-md hover:bg-white/[0.08] transition-colors md:opacity-0 md:group-hover:opacity-100 data-[state=open]:opacity-100 focus:outline-none">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-[rgba(20,20,40,0.95)] backdrop-blur-xl border-white/[0.1]">
          <DropdownMenuItem asChild>
            <Link href={`/editor/${site.id}`} className="flex items-center gap-2 text-xs">
              <Edit className="w-3.5 h-3.5" /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/editor/${site.id}?export=true`} className="flex items-center gap-2 text-xs">
              <Download className="w-3.5 h-3.5" /> Export
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(site.id)} className="text-red-400 focus:text-red-400 text-xs">
            <Trash2 className="w-3.5 h-3.5 mr-2" /> Move to Trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/* ===== SHARED COMPONENTS ===== */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-6">
        <Sparkles className="w-9 h-9 text-white/50" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No websites yet</h2>
      <p className="text-muted-foreground text-sm mb-8 max-w-sm">
        Create your first AI-generated website in seconds. Describe your business and let Weavo handle the rest.
      </p>
      <Link
        href="/wizard"
        className="flex items-center gap-2 h-10 px-6 rounded-xl bg-transparent text-white text-sm font-medium border-2 border-white/40 hover:border-white/60 hover:bg-white/[0.06] transition-colors"
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
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        : "flex flex-col gap-2"
    )}>
      {[1, 2, 3, 4, 5, 6].map((i) =>
        viewMode === "grid" ? (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 animate-pulse">
            <div className="aspect-[4/3] rounded-lg bg-white/[0.04] mb-3" />
            <div className="h-3.5 bg-white/[0.04] rounded w-3/4 mb-2" />
            <div className="h-3 bg-white/[0.04] rounded w-1/2" />
          </div>
        ) : (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] animate-pulse">
            <div className="w-16 h-12 rounded-lg bg-white/[0.04] shrink-0" />
            <div className="flex-1">
              <div className="h-3.5 bg-white/[0.04] rounded w-1/3 mb-2" />
              <div className="h-3 bg-white/[0.04] rounded w-1/4" />
            </div>
          </div>
        )
      )}
    </div>
  );
}

/* ===== FLOW SELECTION SCREEN ===== */

function FlowSelectionScreen({ onSelect }: { onSelect: (flow: 'chat' | 'wizard') => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleSelect = (flow: 'chat' | 'wizard') => {
    setIsExiting(true);
    setTimeout(() => {
      onSelect(flow);
    }, 400); // Wait for animation to complete
  };

  return (
    <div className={cn(
      "fixed inset-0 z-[100] bg-[#0a0a0a] text-white flex flex-col overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      isExiting ? "opacity-0 scale-105 pointer-events-none filter blur-sm" : "opacity-100 scale-100 filter-none"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Weavo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-xl tracking-tight">Weavo</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-6xl mx-auto w-full relative">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center">Choose your creative flow.</h1>
        <p className="text-muted-foreground text-center mb-12">No pressure. Switch anytime in Settings.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {/* Card 1: Chat AI */}
          <div 
            onClick={() => handleSelect('chat')}
            className="group cursor-pointer rounded-2xl border border-white/[0.08] bg-[#111111] p-8 hover:border-white/[0.2] transition-all hover:bg-[#161616] flex flex-col relative overflow-hidden"
          >
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.05] text-xs font-medium mb-6 self-start relative z-10">
              Chat AI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 relative z-10">Conversational Builder</h2>
            {/* Mock Visual */}
            <div className="h-56 mt-auto rounded-xl bg-[#0a0a0a] border border-white/[0.04] flex items-center justify-center relative overflow-hidden z-10">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:16px_16px]" />
               {/* Abstract Chat Representation */}
               <div className="flex flex-col gap-4 w-full px-8 opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105">
                 <div className="w-3/4 h-10 rounded-2xl rounded-bl-sm bg-gradient-to-r from-purple-500/20 to-purple-500/10 border border-purple-500/20 self-start backdrop-blur-sm" />
                 <div className="w-2/3 h-10 rounded-2xl rounded-br-sm bg-white/[0.06] border border-white/[0.08] self-end backdrop-blur-sm" />
                 <div className="w-5/6 h-10 rounded-2xl rounded-bl-sm bg-gradient-to-r from-purple-500/20 to-purple-500/10 border border-purple-500/20 self-start backdrop-blur-sm" />
               </div>
            </div>
          </div>

          {/* Card 2: Wizard */}
          <div 
            onClick={() => handleSelect('wizard')}
            className="group cursor-pointer rounded-2xl border border-white/[0.08] bg-[#111111] p-8 hover:border-white/[0.2] transition-all hover:bg-[#161616] flex flex-col relative overflow-hidden"
          >
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.05] text-xs font-medium mb-6 self-start relative z-10">
              Wizard
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 relative z-10">Guided Setup Wizard</h2>
            {/* Mock Visual */}
            <div className="h-56 mt-auto rounded-xl bg-[#0a0a0a] border border-white/[0.04] flex items-center justify-center relative overflow-hidden z-10">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:16px_16px]" />
               {/* Abstract Wizard Representation */}
               <div className="flex items-center justify-center gap-4 opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105 w-full">
                 <div className="w-20 h-28 rounded-lg bg-white/[0.04] border border-white/[0.08] shadow-lg transform -rotate-12 translate-y-4 backdrop-blur-sm" />
                 <div className="w-24 h-32 rounded-lg bg-gradient-to-b from-white/[0.15] to-white/[0.05] border border-white/[0.2] shadow-2xl z-10 backdrop-blur-sm" />
                 <div className="w-20 h-28 rounded-lg bg-white/[0.04] border border-white/[0.08] shadow-lg transform rotate-12 translate-y-4 backdrop-blur-sm" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
