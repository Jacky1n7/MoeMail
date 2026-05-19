"use client"

import { FormEvent, useMemo, useState } from "react"
import { AlertCircle, CheckCircle2, KeyRound, Loader2, MailCheck, Search, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  buildDnsLookupQuery,
  filterDnsRecords,
  stripTxtQuotes,
  type DnsRecord,
  type DnsToolMode,
} from "@/lib/email-tools"
import type { DnsLookupToolCopy } from "@/lib/seo-content"
import { cn } from "@/lib/utils"

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

const MODE_ORDER: DnsToolMode[] = ["mx", "spf", "dmarc", "dkim"]

const MODE_ICONS: Record<DnsToolMode, typeof MailCheck> = {
  mx: MailCheck,
  spf: ShieldCheck,
  dmarc: CheckCircle2,
  dkim: KeyRound,
}

export function DnsLookupTool({
  copy,
  defaultMode = "mx",
}: {
  copy: DnsLookupToolCopy
  defaultMode?: DnsToolMode
}) {
  const [mode, setMode] = useState<DnsToolMode>(defaultMode)
  const [domain, setDomain] = useState("7752177.xyz")
  const [selector, setSelector] = useState("default")
  const [result, setResult] = useState<DnsResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const currentMode = useMemo(() => copy.modes[mode] || copy.modes.mx, [copy.modes, mode])
  const visibleRecords = useMemo(
    () => filterDnsRecords(mode, result?.records || []),
    [mode, result?.records]
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = buildDnsLookupQuery(mode, domain, selector)

    if (!query.domain || !query.domain.includes(".")) {
      setError(copy.invalidDomain)
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
        setError(copy.resolverFailed)
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
          type: query.type,
          ttl: answer.TTL,
          value: answer.data,
        }))

      setResult({
        domain: query.domain,
        type: query.type,
        status: data.Status,
        records,
      })
    } catch {
      setError(copy.lookupFailed)
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const Icon = MODE_ICONS[mode]
  const resultLabel =
    visibleRecords.length === 0
      ? copy.noRecords
      : visibleRecords.length === 1
        ? copy.recordFound
        : copy.recordsFound.replace("{count}", String(visibleRecords.length))

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

          <div className="grid grid-cols-4 rounded-md border border-gray-200 p-1 dark:border-gray-800">
            {MODE_ORDER.map((modeId) => (
              <button
                key={modeId}
                type="button"
                onClick={() => {
                  setMode(modeId)
                  setResult(null)
                  setError(null)
                }}
                className={cn(
                  "h-8 min-w-16 rounded-sm px-3 text-sm font-medium transition-colors",
                  mode === modeId
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                )}
              >
                {copy.modes[modeId].label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="grid flex-1 gap-3 sm:grid-cols-[1fr_auto]">
            <Input
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              placeholder="example.com"
              aria-label={copy.domainLabel}
              className="h-10"
            />
            {mode === "dkim" && (
              <Input
                value={selector}
                onChange={(event) => setSelector(event.target.value)}
                placeholder="selector"
                aria-label={copy.selectorLabel}
                className="h-10 sm:w-40"
              />
            )}
          </div>
          <Button type="submit" className="h-10 gap-2 sm:w-36" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {copy.lookup}
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
                {resultLabel}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {copy.query}: {result.domain} / {result.type}
              </span>
            </div>

            {visibleRecords.length > 0 ? (
              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-[1fr_auto] gap-3 bg-gray-50 px-3 py-2 text-xs font-medium uppercase text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  <span>{copy.value}</span>
                  <span>{copy.ttl}</span>
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
                {copy.noRecordExplanation}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
