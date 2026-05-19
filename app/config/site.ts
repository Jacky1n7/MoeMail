export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://7752177.xyz").replace(/\/$/, "")

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
