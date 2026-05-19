import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { DnsLookupTool } from "@/components/tools/dns-lookup-tool"
import { EmailHeaderAnalyzerTool } from "@/components/tools/email-header-analyzer-tool"
import { Header } from "@/components/layout/header"
import { EMAIL_TOOL_PAGES, type EmailToolPageSlug, SITE_NAME, SITE_URL } from "@/config/site"
import { i18n, type Locale } from "@/i18n/config"

export const runtime = "edge"

const TOOL_CONTENT: Record<EmailToolPageSlug, {
  mode: "mx" | "spf" | "dmarc" | "dkim" | "header"
  heading: string
  body: string[]
}> = {
  "mx-lookup": {
    mode: "mx",
    heading: "When MX records matter",
    body: [
      "MX records tell the internet which servers accept mail for a domain. Broken or missing MX records can stop incoming mail completely.",
      "Use this when setting up a custom domain, moving mail providers, debugging verification emails, or checking whether a domain can receive mail.",
    ],
  },
  "spf-checker": {
    mode: "spf",
    heading: "What SPF protects",
    body: [
      "SPF lists the servers and services allowed to send mail for a domain. It helps receiving mail systems detect spoofed senders.",
      "A clean SPF record is especially important for transactional email, newsletters, and services that send account verification messages.",
    ],
  },
  "dmarc-checker": {
    mode: "dmarc",
    heading: "Why DMARC is useful",
    body: [
      "DMARC tells receivers how to handle messages that fail SPF or DKIM checks. It can also send reports about authentication results.",
      "Start with monitoring, then tighten policy once legitimate senders are aligned.",
    ],
  },
  "dkim-checker": {
    mode: "dkim",
    heading: "How DKIM selectors work",
    body: [
      "DKIM records are TXT records under selector._domainkey.example.com. The selector is chosen by the sending service.",
      "Check DKIM when setting up a mail provider, debugging authentication failures, or rotating signing keys.",
    ],
  },
  "email-header-analyzer": {
    mode: "header",
    heading: "What headers can reveal",
    body: [
      "Email headers show sender metadata, routing hops, authentication results, and identifiers that help explain how a message reached an inbox.",
      "They are useful for debugging delivery, investigating spoofing, and checking whether SPF, DKIM, and DMARC passed.",
    ],
  },
}

function getTool(slug: string) {
  const meta = EMAIL_TOOL_PAGES.find((tool) => tool.slug === slug)
  const content = TOOL_CONTENT[slug as EmailToolPageSlug]

  if (!meta || !content) {
    return null
  }

  return { ...meta, ...content }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>
}): Promise<Metadata> {
  const { locale, tool: slug } = await params
  const tool = getTool(slug)

  if (!tool) {
    return {}
  }

  const canonical = `${SITE_URL}/${locale}/tools/${slug}`

  return {
    title: `${tool.title} | ${SITE_NAME}`,
    description: tool.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary",
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
    },
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>
}) {
  const { locale: localeFromParams, tool: slug } = await params
  const tool = getTool(slug)

  if (!tool || !i18n.locales.includes(localeFromParams as Locale)) {
    notFound()
  }

  const locale = localeFromParams as Locale

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
                  Email Tools
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
              <EmailHeaderAnalyzerTool />
            ) : (
              <DnsLookupTool defaultMode={tool.mode} />
            )}

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-normal text-gray-900 dark:text-white">
                {tool.heading}
              </h2>
              {tool.body.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-gray-700 dark:text-gray-300">
                  {paragraph}
                </p>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
