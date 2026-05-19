"use client"

import { FormEvent, useMemo, useState } from "react"
import { AlertCircle, CheckCircle2, Loader2, MailCheck, Search, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type ToolMode = "mx" | "spf" | "dmarc"

type DnsRecord = {
  name: string
  type: "MX" | "TXT"
  ttl: number
  value: string
}

type CloudflareDnsAnswer = {
  name: string
  type: number
  TTL: number
  data: string
}

type DnsResponse = {
  domain: string
  type: "MX" | "TXT"
  status: number
  records: DnsRecord[]
  error?: string
}

const DNS_TYPE_CODES: Record<number, DnsRecord["type"]> = {
  15: "MX",
  16: "TXT",
}

const MODES: Array<{
  id: ToolMode
  label: string
  title: string
  hint: string
  icon: typeof MailCheck
}> = [
  {
    id: "mx",
    label: "MX",
    title: "MX records",
    hint: "Shows which mail servers receive email for this domain.",
    icon: MailCheck,
  },
  {
    id: "spf",
    label: "SPF",
    title: "SPF policy",
    hint: "Finds the v=spf1 TXT record used for sender authorization.",
    icon: ShieldCheck,
  },
  {
    id: "dmarc",
    label: "DMARC",
    title: "DMARC policy",
    hint: "Checks the _dmarc TXT record used for authentication policy.",
    icon: CheckCircle2,
  },
]

function normalizeInput(value: string) {
  return value
    .trim()
    .replace(/^https?:\/\//i, "")
    .split("/")[0]
    .split(":")[0]
    .replace(/\.$/, "")
}

function buildQuery(mode: ToolMode, domain: string) {
  const cleanDomain = normalizeInput(domain)

  return {
    domain: mode === "dmarc" ? `_dmarc.${cleanDomain}` : cleanDomain,
    type: mode === "mx" ? "MX" : "TXT",
  }
}

function stripTxtQuotes(value: string) {
  return value.replace(/^"|"$/g, "").replace(/"\s+"/g, "")
}

function filterRecords(mode: ToolMode, records: DnsRecord[]) {
  if (mode === "spf") {
    return records.filter((record) => stripTxtQuotes(record.value).toLowerCase().startsWith("v=spf1"))
  }

  if (mode === "dmarc") {
    return records.filter((record) => stripTxtQuotes(record.value).toLowerCase().startsWith("v=dmarc1"))
  }

  return records
}

export function DnsLookupTool({ defaultMode = "mx" }: { defaultMode?: ToolMode }) {
  const [mode, setMode] = useState<ToolMode>(defaultMode)
  const [domain, setDomain] = useState("7752177.xyz")
  const [result, setResult] = useState<DnsResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const currentMode = useMemo(() => MODES.find((item) => item.id === mode) || MODES[0], [mode])
  const visibleRecords = useMemo(
    () => filterRecords(mode, result?.records || []),
    [mode, result?.records]
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = buildQuery(mode, domain)

    if (!query.domain || !query.domain.includes(".")) {
      setError("Enter a domain such as example.com.")
      setResult(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        name: query.domain,
        type: query.type,
      })
      const response = await fetch(`https://cloudflare-dns.com/dns-query?${params.toString()}`, {
        headers: {
          accept: "application/dns-json",
        },
      })

      if (!response.ok) {
        setError("DNS resolver request failed.")
        setResult(null)
        return
      }

      const data = (await response.json()) as {
        Status: number
        Answer?: CloudflareDnsAnswer[]
      }
      const records = (data.Answer || [])
        .filter((answer) => DNS_TYPE_CODES[answer.type] === query.type)
        .map((answer) => ({
          name: answer.name.replace(/\.$/, ""),
          type: query.type as DnsRecord["type"],
          ttl: answer.TTL,
          value: answer.data,
        }))

      setResult({
        domain: query.domain,
        type: query.type as DnsRecord["type"],
        status: data.Status,
        records,
      })
    } catch {
      setError("Lookup failed. Check the domain and try again.")
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const Icon = currentMode.icon

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Icon className="h-4 w-4" />
              {currentMode.title}
            </div>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              {currentMode.hint}
            </p>
          </div>

          <div className="grid grid-cols-3 rounded-md border border-gray-200 p-1 dark:border-gray-800">
            {MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMode(item.id)
                  setResult(null)
                  setError(null)
                }}
                className={cn(
                  "h-8 min-w-16 rounded-sm px-3 text-sm font-medium transition-colors",
                  mode === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <Input
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            placeholder="example.com"
            aria-label="Domain"
            className="h-10"
          />
          <Button type="submit" className="h-10 gap-2 sm:w-36" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Lookup
          </Button>
        </form>

        {error && (
          <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
            <span>{error}</span>
          </div>
        )}

        {result && !error && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-medium text-gray-900 dark:text-white">
                {visibleRecords.length ? `${visibleRecords.length} record${visibleRecords.length === 1 ? "" : "s"} found` : "No matching records found"}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Query: {result.domain} / {result.type}
              </span>
            </div>

            {visibleRecords.length > 0 ? (
              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-[1fr_auto] gap-3 bg-gray-50 px-3 py-2 text-xs font-medium uppercase text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  <span>Value</span>
                  <span>TTL</span>
                </div>
                {visibleRecords.map((record) => (
                  <div
                    key={`${record.name}-${record.value}-${record.ttl}`}
                    className="grid grid-cols-[1fr_auto] gap-3 border-t border-gray-200 px-3 py-3 text-sm dark:border-gray-800"
                  >
                    <code className="break-all rounded bg-gray-100 px-2 py-1 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                      {stripTxtQuotes(record.value)}
                    </code>
                    <span className="whitespace-nowrap text-gray-500 dark:text-gray-400">{record.ttl}s</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm leading-6 text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                The domain resolved, but this checker did not find the expected record.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
