import type { MetadataRoute } from "next"
import { i18n } from "@/i18n/config"
import { EMAIL_GUIDE_PAGES, EMAIL_TOOL_PAGES, SITE_URL, TRUST_AND_SEO_PAGES } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const paths = [
    "",
    ...TRUST_AND_SEO_PAGES,
    "tools",
    ...EMAIL_TOOL_PAGES.map((tool) => `tools/${tool.slug}`),
    "guides",
    ...EMAIL_GUIDE_PAGES.map((guide) => `guides/${guide.slug}`),
  ]

  return i18n.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: path ? `${SITE_URL}/${locale}/${path}` : `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: path ? "monthly" : "weekly",
      priority: path ? 0.7 : 1,
    }))
  )
}
