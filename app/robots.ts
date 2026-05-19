import type { MetadataRoute } from "next"
import { SITE_HOST, SITE_URL } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/en/profile", "/zh-CN/profile", "/zh-TW/profile", "/ja/profile", "/ko/profile"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_HOST,
  }
}
