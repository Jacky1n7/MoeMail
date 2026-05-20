import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import sitemap from "../app/sitemap"
import { SITE_URL, TRUST_AND_SEO_PAGES } from "../app/config/site"
import { i18n } from "../app/i18n/config"
import { ADSENSE_CLIENT, getAdSensePublisherId } from "../app/lib/monetization"
import { getMarketingPageContent } from "../app/lib/seo-content"

const EXPECTED_ADSENSE_CLIENT = "ca-pub-2544061304155027"

assert.equal(ADSENSE_CLIENT, EXPECTED_ADSENSE_CLIENT)
assert.equal(getAdSensePublisherId(), "pub-2544061304155027")
assert.ok(TRUST_AND_SEO_PAGES.includes("advertise"), "advertise page should be a trust and business page")

for (const locale of i18n.locales) {
  const homeMessages = JSON.parse(readFileSync(`app/i18n/messages/${locale}/home.json`, "utf8")) as {
    links?: Record<string, string>
  }

  assert.ok(homeMessages.links?.about, `${locale} about link is missing`)
  assert.ok(homeMessages.links?.advertise, `${locale} advertise link is missing`)

  const advertise = getMarketingPageContent(locale, "advertise")
  assert.equal(advertise.slug, "advertise")
  assert.ok(advertise.title.length > 0, `${locale}/advertise title is missing`)
  assert.ok(advertise.description.length > 0, `${locale}/advertise description is missing`)
  assert.ok(advertise.sections.length >= 3, `${locale}/advertise needs enough content for review`)
}

const sitemapUrls = sitemap().map((entry) => entry.url)
for (const locale of i18n.locales) {
  assert.ok(sitemapUrls.includes(`${SITE_URL}/${locale}/advertise`), `${locale}/advertise missing from sitemap`)
}
