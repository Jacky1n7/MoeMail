import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, MailCheck, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/layout/header"
import { EMAIL_TOOL_PAGES, SITE_NAME, SITE_URL } from "@/config/site"
import { i18n, type Locale } from "@/i18n/config"

export const runtime = "edge"

const ICONS = [MailCheck, ShieldCheck, CheckCircle2]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const canonical = `${SITE_URL}/${locale}/tools`

  return {
    title: `Email Tools | ${SITE_NAME}`,
    description: "Free email DNS tools for checking MX, SPF, and DMARC records.",
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: `Email Tools | ${SITE_NAME}`,
      description: "Free email DNS tools for checking MX, SPF, and DMARC records.",
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
                Email Tools
              </h1>
              <p className="max-w-3xl text-base md:text-lg text-gray-600 dark:text-gray-300">
                Check the records that affect email delivery, sender authentication, and domain trust.
              </p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {EMAIL_TOOL_PAGES.map((tool, index) => {
                const Icon = ICONS[index] || MailCheck

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
          </div>
        </main>
      </div>
    </div>
  )
}
