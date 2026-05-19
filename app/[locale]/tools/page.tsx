import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, BookOpen, CheckCircle2, FileCog, FileText, KeyRound, MailCheck, ShieldAlert, ShieldCheck } from "lucide-react"
import { Header } from "@/components/layout/header"
import { EMAIL_GUIDE_PAGES, EMAIL_TOOL_PAGES, SITE_NAME, SITE_URL } from "@/config/site"
import { i18n, type Locale } from "@/i18n/config"
import {
  getEmailGuideContent,
  getEmailToolContent,
  getLanguageAlternates,
  getSearchDescription,
  getSearchTitle,
  getToolsIndexContent,
} from "@/lib/seo-content"

export const runtime = "edge"

const ICONS = [MailCheck, ShieldCheck, CheckCircle2, KeyRound, FileText, FileCog, CheckCircle2, ShieldAlert]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const canonical = `${SITE_URL}/${locale}/tools`
  const content = getToolsIndexContent(locale as Locale)
  const title = getSearchTitle(locale as Locale, "index", content.title)
  const description = getSearchDescription(locale as Locale, "index", content.description)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates("tools"),
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
    },
  }
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: localeFromParams } = await params
  const locale = i18n.locales.includes(localeFromParams as Locale) ? localeFromParams : i18n.defaultLocale
  const content = getToolsIndexContent(locale as Locale)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <Header />
        <main className="pt-28 pb-16">
          <div className="space-y-10">
            <section className="space-y-4">
              <Link href={`/${locale}`} className="text-sm text-primary hover:underline">
                {SITE_NAME}
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold tracking-normal text-gray-950 dark:text-white">
                {content.title}
              </h1>
              <p className="max-w-3xl text-base md:text-lg text-gray-600 dark:text-gray-300">
                {content.description}
              </p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {EMAIL_TOOL_PAGES.map((toolMeta, index) => {
                const Icon = ICONS[index] || MailCheck
                const tool = getEmailToolContent(locale as Locale, toolMeta.slug)

                return (
                  <Link
                    key={tool.slug}
                    href={`/${locale}/tools/${tool.slug}`}
                    className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-primary/50 dark:border-gray-800 dark:bg-gray-950"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-lg font-semibold text-gray-950 dark:text-white">{tool.title}</h2>
                        <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{tool.description}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </section>

            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-normal text-gray-950 dark:text-white">
                  {content.guidesTitle}
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {content.guidesDescription}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {EMAIL_GUIDE_PAGES.map((guideMeta) => {
                  const guide = getEmailGuideContent(locale as Locale, guideMeta.slug)

                  return (
                    <Link
                      key={guide.slug}
                      href={`/${locale}/guides/${guide.slug}`}
                      className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-primary/50 dark:border-gray-800 dark:bg-gray-950"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-primary/10 text-primary">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 space-y-2">
                          <h3 className="text-base font-semibold text-gray-950 dark:text-white">{guide.title}</h3>
                          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{guide.description}</p>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 flex-none text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
