import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { BlacklistCheckerTool } from "@/components/tools/blacklist-checker-tool"
import { DnsLookupTool } from "@/components/tools/dns-lookup-tool"
import { EmailHealthCheckTool } from "@/components/tools/email-health-check-tool"
import { EmailHeaderAnalyzerTool } from "@/components/tools/email-header-analyzer-tool"
import { EmailRecordGeneratorTool } from "@/components/tools/email-record-generator-tool"
import { AdSlot } from "@/components/monetization/ad-slot"
import { MonetizationCards } from "@/components/monetization/monetization-cards"
import { Header } from "@/components/layout/header"
import { EMAIL_TOOL_PAGES, type EmailToolPageSlug, SITE_NAME, SITE_URL } from "@/config/site"
import { i18n, type Locale } from "@/i18n/config"
import {
  createFaqJsonLd,
  getEmailGuideContent,
  createSoftwareApplicationJsonLd,
  getEmailToolContent,
  getLanguageAlternates,
  getSearchDescription,
  getSearchTitle,
} from "@/lib/seo-content"

export const runtime = "edge"

function isEmailToolSlug(slug: string): slug is EmailToolPageSlug {
  const meta = EMAIL_TOOL_PAGES.find((tool) => tool.slug === slug)

  return Boolean(meta)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>
}): Promise<Metadata> {
  const { locale, tool: slug } = await params
  if (!isEmailToolSlug(slug) || !i18n.locales.includes(locale as Locale)) {
    return {}
  }

  const tool = getEmailToolContent(locale as Locale, slug)
  const title = getSearchTitle(locale as Locale, "tool", tool.title)
  const description = getSearchDescription(locale as Locale, "tool", tool.description)

  const canonical = `${SITE_URL}/${locale}/tools/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(`tools/${slug}`),
    },
    openGraph: {
      type: "website",
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

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>
}) {
  const { locale: localeFromParams, tool: slug } = await params

  if (!isEmailToolSlug(slug) || !i18n.locales.includes(localeFromParams as Locale)) {
    notFound()
  }

  const locale = localeFromParams as Locale
  const tool = getEmailToolContent(locale, slug)
  const jsonLd = [
    createSoftwareApplicationJsonLd(tool, locale, `tools/${slug}`),
    createFaqJsonLd(tool.faq),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <Header />
        <main className="pt-28 pb-16">
          <div className="space-y-10">
            <section className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Link href={`/${locale}`} className="text-primary hover:underline">
                  {SITE_NAME}
                </Link>
                <span className="text-gray-400">/</span>
                <Link href={`/${locale}/tools`} className="text-primary hover:underline">
                  {tool.breadcrumb}
                </Link>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-normal text-gray-950 dark:text-white">
                {tool.title}
              </h1>
              <p className="max-w-3xl text-base md:text-lg text-gray-600 dark:text-gray-300">
                {tool.description}
              </p>
            </section>

            {tool.mode === "header" ? (
              <EmailHeaderAnalyzerTool copy={tool.headerCopy} />
            ) : tool.mode === "spf-generator" ? (
              <EmailRecordGeneratorTool kind="spf" locale={locale} />
            ) : tool.mode === "dmarc-generator" ? (
              <EmailRecordGeneratorTool kind="dmarc" locale={locale} />
            ) : tool.mode === "blacklist" ? (
              <BlacklistCheckerTool locale={locale} />
            ) : tool.mode === "health" ? (
              <EmailHealthCheckTool locale={locale} />
            ) : (
              <DnsLookupTool copy={tool.toolCopy} defaultMode={tool.mode} />
            )}

            <AdSlot placement="tool" />

            {tool.sections.map((section) => (
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

            <MonetizationCards placement="tool" locale={locale} />

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold tracking-normal text-gray-900 dark:text-white">
                {locale === "en" ? "Related guides" : locale === "ja" ? "関連ガイド" : locale === "ko" ? "관련 가이드" : locale === "zh-TW" ? "相關指南" : "相关指南"}
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {tool.relatedGuides.map((guideSlug) => {
                  const guide = getEmailGuideContent(locale, guideSlug)

                  return (
                    <Link
                      key={guide.slug}
                      href={`/${locale}/guides/${guide.slug}`}
                      className="group rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary/50 dark:border-gray-800 dark:bg-gray-950"
                    >
                      <h3 className="font-medium text-gray-950 dark:text-white">{guide.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{guide.description}</p>
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
                {tool.faq.map((item) => (
                  <div key={item.question} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
                    <h3 className="font-medium text-gray-950 dark:text-white">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
