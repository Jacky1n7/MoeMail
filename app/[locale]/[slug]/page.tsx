import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { SiteFooter } from "@/components/layout/site-footer"
import { i18n, type Locale } from "@/i18n/config"
import { SITE_NAME, SITE_URL, TRUST_AND_SEO_PAGES, type TrustAndSeoPageSlug } from "@/config/site"
import { getLanguageAlternates, getMarketingPageContent, getSearchDescription, getSearchTitle } from "@/lib/seo-content"

export const runtime = "edge"

function isMarketingSlug(slug: string): slug is TrustAndSeoPageSlug {
  return TRUST_AND_SEO_PAGES.includes(slug as TrustAndSeoPageSlug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  if (!isMarketingSlug(slug) || !i18n.locales.includes(locale as Locale)) {
    return {}
  }

  const page = getMarketingPageContent(locale as Locale, slug)
  const canonical = `${SITE_URL}/${locale}/${slug}`
  const title = getSearchTitle(locale as Locale, "marketing", page.title)
  const description = getSearchDescription(locale as Locale, "marketing", page.description)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(slug),
    },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: localeFromParams, slug } = await params

  if (!isMarketingSlug(slug) || !i18n.locales.includes(localeFromParams as Locale)) {
    notFound()
  }

  const locale = localeFromParams as Locale
  const page = getMarketingPageContent(locale, slug)
  const ctaHref = page.cta?.href.startsWith("/")
    ? `/${locale}${page.cta.href === "/" ? "" : page.cta.href}`
    : page.cta?.href

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <Header />
        <main className="pt-28 pb-16">
          <article className="space-y-10">
            <div className="space-y-4">
              <Link href={`/${locale}`} className="text-sm text-primary hover:underline">
                {SITE_NAME}
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold tracking-normal text-gray-950 dark:text-white">
                {page.title}
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                {page.description}
              </p>
            </div>

            <div className="space-y-8">
              {page.sections.map((section) => (
                <section key={section.heading} className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-semibold tracking-normal text-gray-900 dark:text-white">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-7 text-gray-700 dark:text-gray-300">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {page.cta && ctaHref && (
              <div className="pt-2">
                <Link
                  href={ctaHref}
                  className="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  {page.cta.label}
                </Link>
              </div>
            )}
          </article>
        </main>
        <SiteFooter locale={locale} />
      </div>
    </div>
  )
}
