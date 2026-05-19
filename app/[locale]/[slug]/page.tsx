import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { i18n, type Locale } from "@/i18n/config"
import { SITE_NAME, SITE_URL, TRUST_AND_SEO_PAGES, type TrustAndSeoPageSlug } from "@/config/site"

export const runtime = "edge"

type PageContent = {
  title: string
  description: string
  sections: Array<{
    heading: string
    body: string[]
  }>
  cta?: {
    label: string
    href: string
  }
}

const PAGES: Record<TrustAndSeoPageSlug, PageContent> = {
  about: {
    title: "About MoeMail",
    description: "MoeMail is a privacy-focused temporary email and email testing service for everyday users, developers, and automation workflows.",
    sections: [
      {
        heading: "What we are building",
        body: [
          "MoeMail helps people create disposable inboxes, receive verification emails, share temporary mailboxes, and test email workflows without exposing a personal inbox.",
          "The service is built on Cloudflare infrastructure and designed to stay fast, simple, and transparent.",
        ],
      },
      {
        heading: "Who it is for",
        body: [
          "Privacy-conscious users can keep their primary email address away from one-time signups and untrusted forms.",
          "Developers can use MoeMail for product testing, webhook workflows, API automation, and disposable inbox experiments.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description: "How MoeMail handles temporary email data, account information, cookies, analytics, and third-party services.",
    sections: [
      {
        heading: "Data we process",
        body: [
          "MoeMail stores temporary email addresses, received messages, account identifiers, API keys, and configuration required to provide the service.",
          "Temporary inboxes may expire automatically depending on the retention option selected by the user.",
        ],
      },
      {
        heading: "Analytics and advertising",
        body: [
          "We may use privacy-conscious analytics, Cloudflare security features, and advertising partners to understand traffic and support the service.",
          "If advertising is enabled, partners may use cookies or similar technologies according to their own policies and applicable law.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "For privacy questions, abuse reports, or data requests, contact the site operator through the contact page.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    description: "Acceptable use terms for MoeMail temporary email, email testing, sharing, webhook, and API features.",
    sections: [
      {
        heading: "Acceptable use",
        body: [
          "Use MoeMail only for lawful purposes, privacy protection, software testing, and legitimate automation workflows.",
          "Do not use MoeMail for fraud, spam, abuse, harassment, credential theft, evasion of platform rules, or illegal activity.",
        ],
      },
      {
        heading: "Service limitations",
        body: [
          "Temporary mailboxes are not a replacement for a permanent email account. Messages may expire, be removed, or become unavailable.",
          "We may limit, suspend, or remove access when activity threatens the service, violates these terms, or creates legal or security risk.",
        ],
      },
      {
        heading: "No warranty",
        body: [
          "MoeMail is provided as a best-effort service. Do not rely on it for sensitive, financial, medical, legal, or mission-critical communication.",
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    description: "Contact MoeMail for support, abuse reports, security issues, business inquiries, and API questions.",
    sections: [
      {
        heading: "Support and abuse reports",
        body: [
          "If you need help, want to report abuse, or found a security concern, include the relevant email address, message ID, timestamp, and a short description.",
          "For urgent abuse reports, include enough detail for us to investigate without exposing unnecessary personal information.",
        ],
      },
      {
        heading: "Business and API",
        body: [
          "We are interested in useful integrations around email testing, disposable email detection, webhook inboxes, and developer workflows.",
        ],
      },
    ],
    cta: {
      label: "Open MoeMail",
      href: "/",
    },
  },
  "temporary-email": {
    title: "Temporary Email",
    description: "Create a temporary email address to receive verification codes, test signups, and keep your personal inbox private.",
    sections: [
      {
        heading: "What is a temporary email?",
        body: [
          "A temporary email address is an inbox you can use for a short period of time instead of exposing your personal address.",
          "It is useful for one-time signups, product testing, download forms, and situations where you do not trust the sender yet.",
        ],
      },
      {
        heading: "Common use cases",
        body: [
          "Receive account verification messages, test email delivery, inspect HTML email content, or create a clean inbox for automation.",
          "For permanent accounts, banking, school, work, and recovery emails, use a normal mailbox you control long term.",
        ],
      },
    ],
    cta: {
      label: "Create a temporary inbox",
      href: "/",
    },
  },
  "disposable-email": {
    title: "Disposable Email",
    description: "Use disposable email addresses to reduce spam, protect identity, and test email workflows safely.",
    sections: [
      {
        heading: "Disposable email vs permanent email",
        body: [
          "Disposable email is designed for short-lived communication. Permanent email is designed for identity, recovery, and long-term records.",
          "Using the right type of inbox helps reduce spam while keeping important accounts recoverable.",
        ],
      },
      {
        heading: "Best practices",
        body: [
          "Use disposable addresses for testing and low-trust forms. Avoid using them for services where account ownership matters.",
          "Delete or let mailboxes expire when you no longer need them.",
        ],
      },
    ],
  },
  "temporary-email-api": {
    title: "Temporary Email API",
    description: "Use MoeMail's API to generate inboxes, retrieve messages, create share links, and automate email testing workflows.",
    sections: [
      {
        heading: "Developer workflows",
        body: [
          "A temporary email API lets developers create disposable inboxes during tests, wait for verification messages, and extract links or codes.",
          "This is useful for QA automation, onboarding tests, webhook demos, and integration pipelines.",
        ],
      },
      {
        heading: "API access",
        body: [
          "MoeMail supports API keys for authenticated OpenAPI access. Higher limits and developer-focused endpoints can be added as the service grows.",
        ],
      },
    ],
    cta: {
      label: "View your API keys",
      href: "/profile",
    },
  },
  "email-privacy": {
    title: "Email Privacy",
    description: "Practical ways to protect your inbox, reduce spam, and choose when to use temporary email.",
    sections: [
      {
        heading: "Why email privacy matters",
        body: [
          "Your email address often becomes a durable identity across websites, newsletters, data brokers, and marketing systems.",
          "Separating personal, work, shopping, and temporary email usage reduces exposure and makes spam easier to contain.",
        ],
      },
      {
        heading: "Simple habits",
        body: [
          "Use aliases or temporary inboxes for low-trust forms, enable two-factor authentication on important accounts, and avoid reusing passwords.",
          "Check sender domains and links before interacting with unexpected messages.",
        ],
      },
    ],
  },
  "email-testing": {
    title: "Email Testing",
    description: "Test signup flows, verification emails, templates, and transactional email delivery with disposable inboxes.",
    sections: [
      {
        heading: "What to test",
        body: [
          "Developers should test subject lines, sender names, HTML rendering, plain text fallbacks, links, verification codes, and delivery timing.",
          "A disposable inbox keeps test traffic away from personal or production mailboxes.",
        ],
      },
      {
        heading: "Automation ideas",
        body: [
          "Create an inbox, submit a signup form, poll messages through the API, extract the verification link, and finish the test automatically.",
        ],
      },
    ],
  },
  "webhook-email-testing": {
    title: "Webhook Email Testing",
    description: "Receive email events through webhooks and build automation around temporary inboxes.",
    sections: [
      {
        heading: "Why webhooks help",
        body: [
          "Polling works, but webhooks are cleaner for automation. Your app receives an event when a new message arrives.",
          "Webhook inboxes are useful for QA, demos, low-code tools, agent workflows, and integration tests.",
        ],
      },
      {
        heading: "What to validate",
        body: [
          "Validate signatures when available, handle retries safely, store only the data you need, and avoid logging secrets from email content.",
        ],
      },
    ],
  },
}

function getPage(slug: string): PageContent | null {
  if (!TRUST_AND_SEO_PAGES.includes(slug as TrustAndSeoPageSlug)) {
    return null
  }

  return PAGES[slug as TrustAndSeoPageSlug]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const page = getPage(slug)

  if (!page) {
    return {}
  }

  const canonical = `${SITE_URL}/${locale}/${slug}`

  return {
    title: `${page.title} | ${SITE_NAME}`,
    description: page.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${page.title} | ${SITE_NAME}`,
      description: page.description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary",
      title: `${page.title} | ${SITE_NAME}`,
      description: page.description,
    },
  }
}

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const page = getPage(slug)

  if (!page || !i18n.locales.includes(locale as Locale)) {
    notFound()
  }

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
      </div>
    </div>
  )
}
