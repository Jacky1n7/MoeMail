import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

const ALLOWED_TYPES = ["MX", "TXT"] as const

type DnsRecordType = (typeof ALLOWED_TYPES)[number]

type CloudflareDnsAnswer = {
  name: string
  type: number
  TTL: number
  data: string
}

type CloudflareDnsResponse = {
  Status: number
  Answer?: CloudflareDnsAnswer[]
  Authority?: CloudflareDnsAnswer[]
}

const DNS_TYPE_CODES: Record<number, DnsRecordType> = {
  15: "MX",
  16: "TXT",
}

function normalizeDomain(value: string | null): string | null {
  if (!value) {
    return null
  }

  const withoutProtocol = value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split(":")[0]
    .replace(/\.$/, "")

  if (withoutProtocol.length < 3 || withoutProtocol.length > 253) {
    return null
  }

  const labels = withoutProtocol.split(".")
  const labelPattern = /^_?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/

  if (labels.length < 2 || !labels.every((label) => labelPattern.test(label))) {
    return null
  }

  return withoutProtocol
}

function normalizeType(value: string | null): DnsRecordType | null {
  const type = value?.trim().toUpperCase()

  if (!type || !ALLOWED_TYPES.includes(type as DnsRecordType)) {
    return null
  }

  return type as DnsRecordType
}

export async function GET(request: NextRequest) {
  const domain = normalizeDomain(request.nextUrl.searchParams.get("domain"))
  const type = normalizeType(request.nextUrl.searchParams.get("type"))

  if (!domain || !type) {
    return NextResponse.json(
      { error: "Enter a valid domain and DNS record type." },
      { status: 400 }
    )
  }

  const url = new URL("https://cloudflare-dns.com/dns-query")
  url.searchParams.set("name", domain)
  url.searchParams.set("type", type)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/dns-json",
      },
      cache: "no-store",
      signal: controller.signal,
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "DNS resolver request failed." },
        { status: 502 }
      )
    }

    const data = (await response.json()) as CloudflareDnsResponse
    const records = (data.Answer || [])
      .filter((answer) => DNS_TYPE_CODES[answer.type] === type)
      .map((answer) => ({
        name: answer.name.replace(/\.$/, ""),
        type,
        ttl: answer.TTL,
        value: answer.data,
      }))

    return NextResponse.json({
      domain,
      type,
      status: data.Status,
      records,
    })
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "DNS lookup timed out."
        : "DNS lookup failed."

    return NextResponse.json({ error: message }, { status: 502 })
  } finally {
    clearTimeout(timeout)
  }
}
