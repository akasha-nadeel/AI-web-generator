import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/wizard(.*)",
  "/editor(.*)",
  "/sites(.*)",
  "/generate(.*)",
  "/settings(.*)",
  "/billing(.*)",
]);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

// The apex that serves published user sites. Anything that isn't the app
// host (or a Vercel preview) and ends in this suffix is treated as a
// published-site request.
const PUBLISH_APEX = process.env.NEXT_PUBLIC_PUBLISH_APEX || "weavo.site";

// Hosts that should bypass subdomain routing and fall through to Clerk.
// Covers local dev, Vercel preview deployments, and the main app domain.
function isAppHost(host: string): boolean {
  const h = host.toLowerCase().split(":")[0];
  if (h === "localhost" || h === "127.0.0.1") return true;
  if (h.endsWith(".vercel.app")) return true;
  if (h === PUBLISH_APEX) return true; // apex itself = marketing/app
  if (h === `www.${PUBLISH_APEX}`) return true;
  return false;
}

function extractSubdomain(host: string): string | null {
  const h = host.toLowerCase().split(":")[0];
  if (!h.endsWith(`.${PUBLISH_APEX}`)) return null;
  const sub = h.slice(0, -(`.${PUBLISH_APEX}`).length);
  if (!sub || sub === "www") return null;
  return sub;
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const host = request.headers.get("host") || "";

  if (!isAppHost(host)) {
    const subdomain = extractSubdomain(host);
    if (subdomain) {
      // Rewrite to the public renderer. We intentionally bypass Clerk for
      // these — published sites must be viewable by anonymous visitors.
      // Folder cannot start with "_" (Next.js treats those as private),
      // hence "site-render".
      const url = request.nextUrl.clone();
      url.pathname = `/site-render/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return clerkHandler(request, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
