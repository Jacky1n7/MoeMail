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
