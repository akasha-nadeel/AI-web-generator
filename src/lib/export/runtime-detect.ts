// Sniffs the source HTML for the data-* attribute conventions documented in
// weavo-runtime.ts and reports which client hooks the exported project
// actually needs. Each detection is a substring/regex check — cheap, safe
// to over-trigger.

export interface HookNeeds {
  scrollReveal: boolean;
  smoothScroll: boolean;
  mobileNav: boolean;
  accordion: boolean;
}

export function detectHookNeeds(html: string): HookNeeds {
  return {
    scrollReveal: /\bdata-reveal(?:-stagger)?\b/.test(html),
    smoothScroll: /href\s*=\s*["']#[^"'\s]+["']/.test(html),
    mobileNav: /\bdata-mobile-toggle\b/.test(html),
    accordion: /\bdata-accordion-trigger\b/.test(html),
  };
}
