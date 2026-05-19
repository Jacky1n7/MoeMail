export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://7752177.xyz").replace(/\/$/, "")

export const SITE_HOST = new URL(SITE_URL).host

export const SITE_NAME = "MoeMail"

export const DEFAULT_EMAIL_DOMAIN =
  process.env.NEXT_PUBLIC_DEFAULT_EMAIL_DOMAIN || "7752177.xyz"

export const TRUST_AND_SEO_PAGES = [
  "about",
  "privacy",
  "terms",
  "contact",
  "temporary-email",
  "disposable-email",
  "temporary-email-api",
  "email-privacy",
  "email-testing",
  "webhook-email-testing",
] as const

export type TrustAndSeoPageSlug = (typeof TRUST_AND_SEO_PAGES)[number]

export const EMAIL_TOOL_PAGES = [
  {
    slug: "mx-lookup",
    title: "MX Lookup",
    description: "Check the mail exchange records that receive email for a domain.",
  },
  {
    slug: "spf-checker",
    title: "SPF Checker",
    description: "Find the SPF TXT record that controls which senders can mail for a domain.",
  },
  {
    slug: "dmarc-checker",
    title: "DMARC Checker",
    description: "Inspect a domain's DMARC policy for email authentication and reporting.",
  },
  {
    slug: "dkim-checker",
    title: "DKIM Checker",
    description: "Look up a DKIM selector record and inspect the public key published for a domain.",
  },
  {
    slug: "email-header-analyzer",
    title: "Email Header Analyzer",
    description: "Paste raw email headers to inspect routing hops, authentication results, and message metadata.",
  },
] as const

export type EmailToolPageSlug = (typeof EMAIL_TOOL_PAGES)[number]["slug"]
