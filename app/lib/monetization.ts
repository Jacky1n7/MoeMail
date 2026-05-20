export type MonetizationPlacement = "home" | "tool" | "guide"

export type MonetizationCard = {
  title: string
  description: string
  href: string
  label: string
}

export const DEFAULT_ADSENSE_CLIENT = "ca-pub-2544061304155027"

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || DEFAULT_ADSENSE_CLIENT

export const AD_PLACEMENTS: Record<MonetizationPlacement, string> = {
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || "",
  tool: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL || "",
  guide: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE || "",
}

export const MONETIZATION_CARDS: Record<MonetizationPlacement, MonetizationCard[]> = {
  home: [
    {
      title: "Email DNS Health Check",
      description: "Run a full MX, SPF, DMARC, DKIM, and blacklist report for your domain.",
      href: "/tools/email-dns-health-check",
      label: "Open tool",
    },
    {
      title: "SPF Record Generator",
      description: "Build a clean SPF TXT record with common provider presets.",
      href: "/tools/spf-generator",
      label: "Generate SPF",
    },
  ],
  tool: [
    {
      title: "Fix email delivery faster",
      description: "Use the full health check when one DNS record is not enough to explain inbox placement.",
      href: "/tools/email-dns-health-check",
      label: "Run health check",
    },
    {
      title: "Learn the next repair step",
      description: "Read the guides for SPF, DMARC, DKIM, and blacklist cleanup.",
      href: "/guides",
      label: "Read guides",
    },
  ],
  guide: [
    {
      title: "Check your domain now",
      description: "Turn this guide into a concrete DNS report for your own domain.",
      href: "/tools/email-dns-health-check",
      label: "Run check",
    },
    {
      title: "Build DNS records",
      description: "Generate SPF and DMARC records before publishing DNS changes.",
      href: "/tools",
      label: "Open tools",
    },
  ],
}

export function normalizeAdSensePublisherId(value: string) {
  return value.trim().replace(/^ca-/, "")
}

export function getAdSensePublisherId(client = ADSENSE_CLIENT) {
  const normalized = normalizeAdSensePublisherId(client)

  return /^pub-\d{10,}$/.test(normalized) ? normalized : ""
}

export function isAdSenseConfigured(client = ADSENSE_CLIENT, slot = "") {
  return Boolean(getAdSensePublisherId(client) && slot)
}

export function getAdsTxt(client = ADSENSE_CLIENT) {
  const publisherId = getAdSensePublisherId(client)

  if (!publisherId) {
    return [
      "# Add NEXT_PUBLIC_ADSENSE_CLIENT after Google AdSense approval.",
      "# Example:",
      "# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0",
      "",
    ].join("\n")
  }

  return `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
}
