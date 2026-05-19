"use client"

import { useMemo, useState } from "react"
import { AlertTriangle, CheckCircle2, Info, MailSearch } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { parseEmailHeaders, type HeaderSignal } from "@/lib/email-tools"
import type { EmailHeaderAnalyzerCopy } from "@/lib/seo-content"
import { cn } from "@/lib/utils"

function SignalIcon({ kind }: { kind: HeaderSignal["kind"] }) {
  if (kind === "good") {
    return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
  }

  if (kind === "warning") {
    return <AlertTriangle className="h-4 w-4 text-amber-500" />
  }

  return <Info className="h-4 w-4 text-sky-500" />
}

function AuthBadge({ label, value }: { label: string; value: string }) {
  const passed = value === "pass"

  return (
    <div
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        passed
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300"
          : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300"
      )}
    >
      <span className="font-medium">{label}</span>
      <span className="ml-2 uppercase">{value}</span>
    </div>
  )
}

export function EmailHeaderAnalyzerTool({ copy }: { copy: EmailHeaderAnalyzerCopy }) {
  const [rawHeaders, setRawHeaders] = useState(copy.sampleHeaders)
  const parsed = useMemo(() => parseEmailHeaders(rawHeaders), [rawHeaders])
  const summary = [
    [copy.summaryLabels.from, parsed.summary.from],
    [copy.summaryLabels.to, parsed.summary.to],
    [copy.summaryLabels.subject, parsed.summary.subject],
    [copy.summaryLabels.date, parsed.summary.date],
    [copy.summaryLabels.messageId, parsed.summary.messageId],
  ].filter(([, value]) => value)

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-6">
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <MailSearch className="h-4 w-4" />
          {copy.title}
        </div>

        <Textarea
          value={rawHeaders}
          onChange={(event) => setRawHeaders(event.target.value)}
          className="min-h-64 resize-y font-mono text-sm leading-6"
          placeholder={copy.placeholder}
          aria-label={copy.rawHeadersLabel}
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <AuthBadge label="SPF" value={parsed.authentication.spf} />
          <AuthBadge label="DKIM" value={parsed.authentication.dkim} />
          <AuthBadge label="DMARC" value={parsed.authentication.dmarc} />
        </div>

        {summary.length > 0 && (
          <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
            {summary.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 border-t border-gray-200 px-3 py-3 text-sm first:border-t-0 dark:border-gray-800 sm:grid-cols-[8rem_1fr]"
              >
                <span className="font-medium text-gray-500 dark:text-gray-400">{label}</span>
                <span className="break-all text-gray-900 dark:text-gray-100">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          {parsed.signals.map((signal) => {
            const localizedSignal = copy.signals[signal.label] || signal

            return (
              <div key={`${signal.label}-${signal.kind}`} className="rounded-md border border-gray-200 p-3 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                  <SignalIcon kind={signal.kind} />
                  {localizedSignal.label}
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{localizedSignal.description}</p>
              </div>
            )
          })}
        </div>

        {parsed.received.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">{copy.receivedPath}</h2>
            <div className="space-y-2">
              {parsed.received.map((hop, index) => (
                <code
                  key={`${hop}-${index}`}
                  className="block break-all rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs leading-5 text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
                >
                  {index + 1}. {hop}
                </code>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
