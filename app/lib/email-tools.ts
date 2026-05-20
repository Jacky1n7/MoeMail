export type DnsToolMode = "mx" | "spf" | "dmarc" | "dkim"

export type DnsRecord = {
  name: string
  type: "MX" | "TXT"
  ttl: number
  value: string
}

export type DnsLookupQuery = {
  domain: string
  type: "MX" | "TXT"
}

export type SpfRecordInput = {
  allowA: boolean
  allowMx: boolean
  includes: string
  ip4: string
  all: "~all" | "-all" | "?all"
}

export type DmarcRecordInput = {
  policy: "none" | "quarantine" | "reject"
  rua: string
  pct: number
}

export const DNSBL_ZONES = [
  "zen.spamhaus.org",
  "bl.spamcop.net",
  "b.barracudacentral.org",
  "dnsbl.sorbs.net",
] as const

export const SPF_PROVIDER_PRESETS = [
  {
    id: "google-workspace",
    name: "Google Workspace",
    include: "_spf.google.com",
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    include: "spf.protection.outlook.com",
  },
  {
    id: "zoho-mail",
    name: "Zoho Mail",
    include: "zohomail.com",
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    include: "sendgrid.net",
  },
  {
    id: "mailgun",
    name: "Mailgun",
    include: "mailgun.org",
  },
  {
    id: "amazon-ses",
    name: "Amazon SES",
    include: "amazonses.com",
  },
] as const

export type SpfProviderPresetId = (typeof SPF_PROVIDER_PRESETS)[number]["id"]

export type HeaderSignal = {
  kind: "good" | "warning" | "info"
  label: string
  description: string
}

export type ParsedEmailHeaders = {
  summary: {
    from: string
    to: string
    subject: string
    date: string
    messageId: string
  }
  authentication: {
    spf: string
    dkim: string
    dmarc: string
  }
  received: string[]
  headers: Array<{
    name: string
    value: string
  }>
  signals: HeaderSignal[]
}

export function normalizeDomainInput(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//i, "")
    .split("/")[0]
    .split(":")[0]
    .replace(/\.$/, "")
}

export function buildDnsLookupQuery(mode: DnsToolMode, domain: string, selector = "default"): DnsLookupQuery {
  const cleanDomain = normalizeDomainInput(domain)
  const cleanSelector = normalizeDomainInput(selector).split(".")[0] || "default"

  if (mode === "dmarc") {
    return {
      domain: `_dmarc.${cleanDomain}`,
      type: "TXT",
    }
  }

  if (mode === "dkim") {
    return {
      domain: `${cleanSelector}._domainkey.${cleanDomain}`,
      type: "TXT",
    }
  }

  return {
    domain: cleanDomain,
    type: mode === "mx" ? "MX" : "TXT",
  }
}

export function stripTxtQuotes(value: string) {
  return value.replace(/^"|"$/g, "").replace(/"\s+"/g, "")
}

export function filterDnsRecords(mode: DnsToolMode, records: DnsRecord[]) {
  if (mode === "spf") {
    return records.filter((record) => stripTxtQuotes(record.value).toLowerCase().startsWith("v=spf1"))
  }

  if (mode === "dmarc") {
    return records.filter((record) => stripTxtQuotes(record.value).toLowerCase().startsWith("v=dmarc1"))
  }

  if (mode === "dkim") {
    return records.filter((record) => {
      const value = stripTxtQuotes(record.value).toLowerCase()
      return value.startsWith("v=dkim1") || value.includes(" p=") || value.includes("; p=")
    })
  }

  return records
}

function splitRecordTokens(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

export function buildSpfRecord(input: SpfRecordInput) {
  const mechanisms = [
    input.allowA ? "a" : "",
    input.allowMx ? "mx" : "",
    ...splitRecordTokens(input.includes).map((include) => `include:${include.replace(/^include:/i, "")}`),
    ...splitRecordTokens(input.ip4).map((ip) => `ip4:${ip.replace(/^ip4:/i, "")}`),
    input.all,
  ].filter(Boolean)

  return `v=spf1 ${mechanisms.join(" ")}`
}

export function getSpfPresetIncludes(ids: readonly string[]) {
  const selected = new Set(ids)

  return SPF_PROVIDER_PRESETS
    .filter((preset) => selected.has(preset.id))
    .map((preset) => preset.include)
}

export function buildDmarcRecord(input: DmarcRecordInput) {
  const pct = Math.min(100, Math.max(1, Math.round(input.pct || 100)))
  const parts = [`v=DMARC1`, `p=${input.policy}`]
  const rua = splitRecordTokens(input.rua)
    .map((address) => address.startsWith("mailto:") ? address : `mailto:${address}`)
    .join(",")

  if (rua) {
    parts.push(`rua=${rua}`)
  }

  parts.push(`pct=${pct}`)

  return parts.join("; ")
}

export function isValidIpv4(value: string) {
  const parts = value.trim().split(".")

  return parts.length === 4 && parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) {
      return false
    }

    const number = Number(part)
    return number >= 0 && number <= 255 && String(number) === String(Number.parseInt(part, 10))
  })
}

export function buildDnsblQueries(ipv4: string) {
  const cleanIp = ipv4.trim()

  if (!isValidIpv4(cleanIp)) {
    return []
  }

  const reversed = cleanIp.split(".").reverse().join(".")

  return DNSBL_ZONES.map((zone) => ({
    zone,
    query: `${reversed}.${zone}`,
  }))
}

function unfoldHeaders(rawHeaders: string) {
  return rawHeaders
    .replace(/\r\n/g, "\n")
    .split("\n")
    .reduce<string[]>((lines, line) => {
      if (/^\s/.test(line) && lines.length > 0) {
        lines[lines.length - 1] = `${lines[lines.length - 1]} ${line.trim()}`
        return lines
      }

      if (line.trim()) {
        lines.push(line.trimEnd())
      }

      return lines
    }, [])
}

function getFirstHeader(headers: ParsedEmailHeaders["headers"], name: string) {
  return headers.find((header) => header.name.toLowerCase() === name.toLowerCase())?.value || ""
}

function getAuthStatus(authResults: string[], key: "spf" | "dkim" | "dmarc") {
  const pattern = new RegExp(`${key}=([a-z0-9_-]+)`, "i")

  for (const result of authResults) {
    const match = result.match(pattern)
    if (match?.[1]) {
      return match[1].toLowerCase()
    }
  }

  return "unknown"
}

export function parseEmailHeaders(rawHeaders: string): ParsedEmailHeaders {
  const headers = unfoldHeaders(rawHeaders)
    .map((line) => {
      const index = line.indexOf(":")

      if (index === -1) {
        return null
      }

      return {
        name: line.slice(0, index).trim(),
        value: line.slice(index + 1).trim(),
      }
    })
    .filter((header): header is { name: string; value: string } => Boolean(header))

  const authResults = headers
    .filter((header) => header.name.toLowerCase() === "authentication-results")
    .map((header) => header.value)
  const authentication = {
    spf: getAuthStatus(authResults, "spf"),
    dkim: getAuthStatus(authResults, "dkim"),
    dmarc: getAuthStatus(authResults, "dmarc"),
  }
  const received = headers
    .filter((header) => header.name.toLowerCase() === "received")
    .map((header) => header.value)
  const signals: HeaderSignal[] = []

  if (authentication.spf === "pass" && authentication.dkim === "pass" && authentication.dmarc === "pass") {
    signals.push({
      kind: "good",
      label: "Authentication passed",
      description: "SPF, DKIM, and DMARC all report pass in the Authentication-Results header.",
    })
  } else {
    if (authentication.spf !== "pass") {
      signals.push({
        kind: "warning",
        label: "No SPF pass found",
        description: "SPF did not report pass, or the header is missing.",
      })
    }
    if (authentication.dkim !== "pass") {
      signals.push({
        kind: "warning",
        label: "No DKIM pass found",
        description: "DKIM did not report pass, or the header is missing.",
      })
    }
    if (authentication.dmarc !== "pass") {
      signals.push({
        kind: "warning",
        label: "No DMARC pass found",
        description: "DMARC did not report pass, or the header is missing.",
      })
    }
  }

  signals.push({
    kind: "info",
    label: `${received.length} received hop${received.length === 1 ? "" : "s"}`,
    description: "Received headers show the mail path from sender systems to the final mailbox.",
  })

  return {
    summary: {
      from: getFirstHeader(headers, "from"),
      to: getFirstHeader(headers, "to"),
      subject: getFirstHeader(headers, "subject"),
      date: getFirstHeader(headers, "date"),
      messageId: getFirstHeader(headers, "message-id"),
    },
    authentication,
    received,
    headers,
    signals,
  }
}
