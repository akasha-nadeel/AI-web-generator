"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Select all sections that have IDs matching our nav links
    const sections = navLinks.map(link => 
      document.getElementById(link.href.replace('#', ''))
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section with the highest intersection ratio
        const visibleSection = entries.find(entry => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(`#${visibleSection.target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when passing the upper-middle part of viewport
        threshold: 0 // trigger as soon as it crosses the margin
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // Also clear hash from URL without scrolling
              window.history.pushState('', document.title, window.location.pathname);
            }
          }}
          className="flex items-center gap-1 group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Weavo Logo" className="w-8 h-8 object-contain opacity-90 scale-[1.7] origin-center" />
          <span className="text-xl font-bold text-white">Weavo</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                activeSection === link.href ? "text-white font-medium" : "text-white/50 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center bg-white text-black font-semibold px-5 py-2 rounded-full text-sm hover:bg-white/90 transition-colors"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white/60 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-black/95 backdrop-blur-xl",
          mobileOpen ? "max-h-96 border-t border-white/[0.06]" : "max-h-0"
        )}
      >
        <div className="px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-sm transition-colors py-2",
                activeSection === link.href ? "text-white font-medium pl-2 border-l-2 border-white" : "text-white/50 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
            <Link
              href="/sign-in"
              className="text-sm text-white/50 hover:text-white py-2"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center bg-white text-black font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-white/90 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
