"use client";

import Link from "next/link";

const linkColumns = [
  {
    title: "PRODUCT",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Templates", href: "/sign-up" },
      { label: "AI Builder", href: "/sign-up" },
    ],
  },
  {
    title: "PAGES",
    links: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
  {
    title: "SOCIAL",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Youtube", href: "#" },
    ],
  },
];

const galleryImages = [
  "/images/restaurant-hero.png",
  "/images/portfolio-hero.png",
  "/images/agency-hero-bg.png",
  "/images/fitness-hero-bg.png",
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Section — Brand + Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 py-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-white">Weavo</span>
            </Link>
            <p className="text-sm text-white/40 mb-6 max-w-[200px]">
              AI-powered website generation for everyone.
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              {/* Google Play */}
              <a href="#" className="inline-flex items-center gap-2 bg-white rounded px-3 py-1.5 hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
                <svg viewBox="30 336.7 120.9 129.2" className="w-5 h-5 shrink-0">
                  <path fill="#FFD900" d="M119.2 421.2c15.3-8.4 27-14.8 28-15.3 3.2-1.7 6.5-6.2 0-9.7-2.1-1.2-21.6-12.3-28-15.3l-22.6 20.2 22.6 20.1z"/>
                  <path fill="#FF3333" d="M99.1 401.1l-64.2 64.7c1.5.2 3.2-.2 5.2-1.3 4.2-2.3 48.8-26.7 79.1-43.3L99.1 401.1z"/>
                  <path fill="#48FF48" d="M99.1 401.1l20.1-18.5c-29.4-16.1-75.1-41.2-79.1-43.3-1.8-1-3.5-1.5-5.2-1.3l64.2 63.1z"/>
                  <path fill="#3BCCFF" d="M99.1 401.1L35 338c-1.5-.2-3.2.2-5.2 1.3-4.2 2.3-13.7 7.5-13.7 7.5 0 0-6.2 3.5 0 9.7l82.9 44.6.1 0z" opacity="0"/>
                  <path fill="#3BCCFF" d="M35 338l64.1 63.1-20.1-18.5c0 0-57.5-31.5-61.7-33.8C13.1 346.4 30 336.7 35 338z"/>
                </svg>
                <div className="leading-none">
                  <p className="text-[8px] text-black/60 leading-none">GET IT ON</p>
                  <p className="text-sm font-semibold text-black leading-tight -mt-px">Google Play</p>
                </div>
              </a>
              {/* App Store */}
              <a href="#" className="inline-flex items-center gap-2 bg-white rounded px-3 py-1.5 hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
                <svg viewBox="0 0 384 512" className="w-5 h-5 shrink-0 text-black" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-74.3-19.7C63.1 141.2 0 184.8 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-62.1 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <div className="leading-none">
                  <p className="text-[8px] text-black/60 leading-none">Download on the</p>
                  <p className="text-sm font-semibold text-black leading-tight -mt-px">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {linkColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle Section — Contact + Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 pb-16">
          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-5">
              CONTACT
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-white/40">support@weavo.com</li>
              <li className="text-sm text-white/40">partnership@weavo.com</li>
              <li className="text-sm text-white/40">enterprise@weavo.com</li>
            </ul>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden ${i === 0 ? "row-span-1" : ""}`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Copyright */}
        <div className="border-t border-white/[0.08] py-6">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Weavo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
