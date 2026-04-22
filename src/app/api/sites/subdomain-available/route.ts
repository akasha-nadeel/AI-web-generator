import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  validateSubdomain,
  isSubdomainAvailable,
} from "@/lib/publishing/subdomain";

export async function GET(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";
  const excludeSiteId = searchParams.get("siteId") || undefined;

  const check = validateSubdomain(slug);
  if (!check.ok) {
    return NextResponse.json({ available: false, reason: check.reason });
  }

  const available = await isSubdomainAvailable(check.normalized, excludeSiteId);
  return NextResponse.json({
    available,
    reason: available ? null : "Already taken.",
    normalized: check.normalized,
  });
}
