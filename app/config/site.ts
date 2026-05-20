export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://7752177.xyz").replace(/\/$/, "")

export const SITE_HOST = new URL(SITE_URL).host

export const INDEXNOW_KEY = "b08a74de962a2c12996f99b5aad60c09"

export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`

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
  {
    slug: "spf-generator",
    title: "SPF Generator",
    description: "Build a clean SPF TXT record for domains that send email through apps and providers.",
  },
  {
    slug: "dmarc-generator",
    title: "DMARC Generator",
    description: "Create a DMARC TXT record for monitoring, quarantine, or reject policies.",
  },
  {
    slug: "blacklist-checker",
    title: "Email Blacklist Checker",
    description: "Check whether an IPv4 address appears on common DNS blocklists used by mail receivers.",
  },
  {
    slug: "email-dns-health-check",
    title: "Email DNS Health Check",
    description: "Run one domain check for MX, SPF, DMARC, DKIM, and sender IP blacklist signals.",
  },
] as const

export type EmailToolPageSlug = (typeof EMAIL_TOOL_PAGES)[number]["slug"]

export const EMAIL_GUIDE_PAGES = [
  {
    slug: "how-to-read-email-headers",
  },
  {
    slug: "how-to-fix-spf-fail",
  },
  {
    slug: "what-is-dkim-selector",
  },
  {
    slug: "dmarc-policy-guide",
  },
  {
    slug: "why-email-goes-to-spam",
  },
  {
    slug: "spf-record-examples",
  },
  {
    slug: "dmarc-record-examples",
  },
  {
    slug: "remove-ip-from-email-blacklists",
  },
] as const

export type EmailGuidePageSlug = (typeof EMAIL_GUIDE_PAGES)[number]["slug"]
