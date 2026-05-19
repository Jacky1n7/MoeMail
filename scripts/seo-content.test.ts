import assert from "node:assert/strict"
import sitemap from "../app/sitemap"
import { EMAIL_GUIDE_PAGES, EMAIL_TOOL_PAGES, SITE_URL } from "../app/config/site"
import { i18n, type Locale } from "../app/i18n/config"
import {
  getEmailGuideContent,
  getEmailToolContent,
  getToolsIndexContent,
} from "../app/lib/seo-content"

for (const locale of i18n.locales) {
  const toolsIndex = getToolsIndexContent(locale)
  assert.ok(toolsIndex.title.length > 0, `${locale} tools index title is missing`)
  assert.ok(toolsIndex.description.length > 0, `${locale} tools index description is missing`)
  assert.equal(toolsIndex.breadcrumb, locale === "en" ? "Email Tools" : toolsIndex.breadcrumb)

  for (const tool of EMAIL_TOOL_PAGES) {
    const content = getEmailToolContent(locale, tool.slug)
    assert.equal(content.slug, tool.slug)
    assert.ok(content.title.length > 0, `${locale}/${tool.slug} title is missing`)
    assert.ok(content.description.length > 0, `${locale}/${tool.slug} description is missing`)
    assert.ok(content.sections.length >= 1, `${locale}/${tool.slug} sections are missing`)
    assert.ok(content.faq.length >= 2, `${locale}/${tool.slug} FAQ is missing`)
    assert.ok(content.toolCopy.lookup.length > 0, `${locale}/${tool.slug} lookup label is missing`)
  }

  for (const guide of EMAIL_GUIDE_PAGES) {
    const content = getEmailGuideContent(locale, guide.slug)
    assert.equal(content.slug, guide.slug)
    assert.ok(content.title.length > 0, `${locale}/${guide.slug} title is missing`)
    assert.ok(content.description.length > 0, `${locale}/${guide.slug} description is missing`)
    assert.ok(content.sections.length >= 2, `${locale}/${guide.slug} needs useful sections`)
    assert.ok(content.relatedTools.length >= 1, `${locale}/${guide.slug} related tools are missing`)
    assert.ok(content.faq.length >= 2, `${locale}/${guide.slug} FAQ is missing`)
  }
}

assert.notEqual(
  getEmailToolContent("zh-CN", "mx-lookup").description,
  getEmailToolContent("en", "mx-lookup").description,
  "zh-CN tool content should be localized"
)

assert.notEqual(
  getEmailGuideContent("ja", "how-to-read-email-headers").title,
  getEmailGuideContent("en", "how-to-read-email-headers").title,
  "ja guide content should be localized"
)

const sitemapUrls = sitemap().map((entry) => entry.url)

for (const locale of i18n.locales as readonly Locale[]) {
  assert.ok(sitemapUrls.includes(`${SITE_URL}/${locale}/tools`), `${locale} tools index missing from sitemap`)
  assert.ok(sitemapUrls.includes(`${SITE_URL}/${locale}/guides`), `${locale} guides index missing from sitemap`)

  for (const guide of EMAIL_GUIDE_PAGES) {
    assert.ok(
      sitemapUrls.includes(`${SITE_URL}/${locale}/guides/${guide.slug}`),
      `${locale}/${guide.slug} missing from sitemap`
    )
  }
}
