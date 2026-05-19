"use client"

import { FormEvent, useState } from "react"
import { AlertCircle, CheckCircle2, Loader2, Search, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { buildDnsblQueries, isValidIpv4 } from "@/lib/email-tools"
import type { Locale } from "@/i18n/config"

type BlacklistCopy = {
  title: string
  hint: string
  inputLabel: string
  placeholder: string
  check: string
  invalidIp: string
  resolverFailed: string
  listed: string
  clear: string
  noAnswer: string
}

type DnsAnswer = {
  type: number
  data: string
}

type CheckResult = {
  zone: string
  query: string
  listed: boolean
  answers: string[]
}

const COPY: Record<Locale, BlacklistCopy> = {
  en: {
    title: "DNSBL lookup",
    hint: "Enter the IPv4 sender address from your email headers.",
    inputLabel: "IPv4 address",
    placeholder: "192.0.2.10",
    check: "Check",
    invalidIp: "Enter a valid IPv4 address.",
    resolverFailed: "DNSBL lookup failed. Try again later.",
    listed: "Listed",
    clear: "Not listed",
    noAnswer: "No listing response",
  },
  "zh-CN": {
    title: "DNSBL 查询",
    hint: "输入邮件头里的 IPv4 发信地址。",
    inputLabel: "IPv4 地址",
    placeholder: "192.0.2.10",
    check: "检查",
    invalidIp: "请输入有效的 IPv4 地址。",
    resolverFailed: "DNSBL 查询失败，请稍后重试。",
    listed: "已列入",
    clear: "未列入",
    noAnswer: "没有列入响应",
  },
  "zh-TW": {
    title: "DNSBL 查詢",
    hint: "輸入郵件標頭裡的 IPv4 寄信地址。",
    inputLabel: "IPv4 地址",
    placeholder: "192.0.2.10",
    check: "檢查",
    invalidIp: "請輸入有效的 IPv4 地址。",
    resolverFailed: "DNSBL 查詢失敗，請稍後重試。",
    listed: "已列入",
    clear: "未列入",
    noAnswer: "沒有列入回應",
  },
  ja: {
    title: "DNSBL 検索",
    hint: "メールヘッダーにある IPv4 送信元アドレスを入力します。",
    inputLabel: "IPv4 アドレス",
    placeholder: "192.0.2.10",
    check: "確認",
    invalidIp: "有効な IPv4 アドレスを入力してください。",
    resolverFailed: "DNSBL 検索に失敗しました。後でもう一度お試しください。",
    listed: "掲載あり",
    clear: "掲載なし",
    noAnswer: "掲載応答なし",
  },
  ko: {
    title: "DNSBL 조회",
    hint: "메일 헤더의 IPv4 발신 주소를 입력하세요.",
    inputLabel: "IPv4 주소",
    placeholder: "192.0.2.10",
    check: "검사",
    invalidIp: "올바른 IPv4 주소를 입력하세요.",
    resolverFailed: "DNSBL 조회에 실패했습니다. 잠시 후 다시 시도하세요.",
    listed: "등재됨",
    clear: "등재 안 됨",
    noAnswer: "등재 응답 없음",
  },
}

export function BlacklistCheckerTool({ locale }: { locale: Locale }) {
  const copy = COPY[locale] || COPY.en
  const [ip, setIp] = useState("8.8.8.8")
  const [results, setResults] = useState<CheckResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isValidIpv4(ip)) {
      setError(copy.invalidIp)
      setResults([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const checks = await Promise.all(
        buildDnsblQueries(ip).map(async (item) => {
          const params = new URLSearchParams({
            name: item.query,
            type: "A",
          })
          const response = await fetch(`https://cloudflare-dns.com/dns-query?${params.toString()}`, {
            headers: {
              accept: "application/dns-json",
            },
          })

          if (!response.ok) {
            throw new Error("resolver failed")
          }

          const data = (await response.json()) as { Answer?: DnsAnswer[] }
          const answers = (data.Answer || [])
            .filter((answer) => answer.type === 1)
            .map((answer) => answer.data)

          return {
            ...item,
            listed: answers.length > 0,
            answers,
          }
        })
      )

      setResults(checks)
    } catch {
      setError(copy.resolverFailed)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-6">
      <div className="space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <ShieldAlert className="h-4 w-4" />
            {copy.title}
          </div>
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{copy.hint}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <Input
            value={ip}
            onChange={(event) => setIp(event.target.value)}
            placeholder={copy.placeholder}
            aria-label={copy.inputLabel}
            className="h-10"
          />
          <Button type="submit" className="h-10 gap-2 sm:w-32" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {copy.check}
          </Button>
        </form>

        {error && (
          <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
            <span>{error}</span>
          </div>
        )}

        {results.length > 0 && (
          <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
            {results.map((result) => (
              <div key={result.zone} className="grid gap-2 border-t border-gray-200 px-3 py-3 text-sm first:border-t-0 dark:border-gray-800 sm:grid-cols-[1fr_auto]">
                <div className="min-w-0">
                  <div className="font-medium text-gray-950 dark:text-white">{result.zone}</div>
                  <code className="break-all text-xs text-gray-500 dark:text-gray-400">{result.query}</code>
                </div>
                <div className={result.listed ? "text-red-600 dark:text-red-300" : "text-green-600 dark:text-green-300"}>
                  <span className="inline-flex items-center gap-1 font-medium">
                    {result.listed ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                    {result.listed ? copy.listed : copy.clear}
                  </span>
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                    {result.answers.join(", ") || copy.noAnswer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
