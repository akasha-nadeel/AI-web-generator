import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://weavo.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard", "/editor/", "/wizard", "/settings", "/billing"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
