import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { SiteFooter } from "@/components/layout/site-footer"
import { AdSlot } from "@/components/monetization/ad-slot"
import { MonetizationCards } from "@/components/monetization/monetization-cards"
import { EMAIL_GUIDE_PAGES, SITE_NAME, SITE_URL, type EmailGuidePageSlug } from "@/config/site"
import { i18n, type Locale } from "@/i18n/config"
import {
  createFaqJsonLd,
  getEmailGuideContent,
  getEmailToolContent,
  getLanguageAlternates,
  getSearchDescription,
  getSearchTitle,
  getToolsIndexContent,
} from "@/lib/seo-content"

export const runtime = "edge"

function isGuideSlug(slug: string): slug is EmailGuidePageSlug {
  return EMAIL_GUIDE_PAGES.some((guide) => guide.slug === slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; guide: string }>
}): Promise<Metadata> {
  const { locale, guide: slug } = await params

  if (!isGuideSlug(slug) || !i18n.locales.includes(locale as Locale)) {
    return {}
  }

  const content = getEmailGuideContent(locale as Locale, slug)
  const canonical = `${SITE_URL}/${locale}/guides/${slug}`
  const title = getSearchTitle(locale as Locale, "guide", content.title)
  const description = getSearchDescription(locale as Locale, "guide", content.description)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(`guides/${slug}`),
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

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; guide: string }>
}) {
  const { locale: localeFromParams, guide: slug } = await params

  if (!isGuideSlug(slug) || !i18n.locales.includes(localeFromParams as Locale)) {
    notFound()
  }

  const locale = localeFromParams as Locale
  const content = getEmailGuideContent(locale, slug)
  const toolsIndex = getToolsIndexContent(locale)
  const faqJsonLd = createFaqJsonLd(content.faq)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <Header />
        <main className="pt-28 pb-16">
          <article className="space-y-10">
            <section className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Link href={`/${locale}`} className="text-primary hover:underline">
                  {SITE_NAME}
                </Link>
                <span className="text-gray-400">/</span>
                <Link href={`/${locale}/guides`} className="text-primary hover:underline">
                  {toolsIndex.guidesTitle}
                </Link>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-normal text-gray-950 dark:text-white">
                {content.title}
              </h1>
              <p className="max-w-3xl text-base md:text-lg text-gray-600 dark:text-gray-300">
                {content.description}
              </p>
            </section>

            <div className="space-y-8">
              {content.sections.map((section) => (
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

            <AdSlot placement="guide" />
            <MonetizationCards placement="guide" locale={locale} />

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold tracking-normal text-gray-900 dark:text-white">
                {toolsIndex.title}
              </h2>
              <div className="grid gap-3 md:grid-cols-3">
                {content.relatedTools.map((toolSlug) => {
                  const tool = getEmailToolContent(locale, toolSlug)

                  return (
                    <Link
                      key={tool.slug}
                      href={`/${locale}/tools/${tool.slug}`}
                      className="group rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary/50 dark:border-gray-800 dark:bg-gray-950"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className="font-medium text-gray-950 dark:text-white">{tool.title}</h3>
                          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{tool.description}</p>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 flex-none text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold tracking-normal text-gray-900 dark:text-white">
                FAQ
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {content.faq.map((item) => (
                  <div key={item.question} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
                    <h3 className="font-medium text-gray-950 dark:text-white">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </main>
        <SiteFooter locale={locale} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}
