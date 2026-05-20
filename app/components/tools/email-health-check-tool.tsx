"use client"

import { FormEvent, useState } from "react"
import { AlertCircle, CheckCircle2, Info, Loader2, Search, ShieldCheck, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  buildDnsblQueries,
  buildDnsLookupQuery,
  buildEmailHealthReport,
  filterDnsRecords,
  isValidIpv4,
  normalizeDomainInput,
  stripTxtQuotes,
  type DnsRecord,
  type EmailHealthReport,
  type EmailHealthStatus,
} from "@/lib/email-tools"
import type { Locale } from "@/i18n/config"

type HealthCopy = {
  title: string
  hint: string
  domainLabel: string
  selectorLabel: string
  senderIpLabel: string
  check: string
  invalidDomain: string
  invalidIp: string
  lookupFailed: string
  score: string
  grade: Record<EmailHealthReport["grade"], string>
  status: Record<EmailHealthStatus, string>
  query: string
}

type DnsAnswer = {
  name: string
  type: number
  TTL: number
  data: string
}

type BlacklistResult = {
  zone: string
  listed: boolean
}

const DNS_TYPE_CODES: Record<number, DnsRecord["type"]> = {
  15: "MX",
  16: "TXT",
}

const COPY: Record<Locale, HealthCopy> = {
  en: {
    title: "Health report",
    hint: "Check the records that decide whether a domain can receive mail, authenticate senders, and avoid reputation surprises.",
    domainLabel: "Domain",
    selectorLabel: "DKIM selector",
    senderIpLabel: "Sender IPv4 address",
    check: "Run check",
    invalidDomain: "Enter a domain such as example.com.",
    invalidIp: "Enter a valid IPv4 sender address or leave it blank.",
    lookupFailed: "The health check failed. Check the domain and try again.",
    score: "Score",
    grade: {
      excellent: "Excellent",
      good: "Good",
      "needs-work": "Needs work",
      poor: "Poor",
    },
    status: {
      pass: "Pass",
      warning: "Review",
      fail: "Fix",
      info: "Optional",
    },
    query: "Query",
  },
  "zh-CN": {
    title: "健康报告",
    hint: "检查影响收信、发信认证和发信信誉的核心记录。",
    domainLabel: "域名",
    selectorLabel: "DKIM selector",
    senderIpLabel: "IPv4 发信地址",
    check: "开始检查",
    invalidDomain: "请输入 example.com 这样的域名。",
    invalidIp: "请输入有效的 IPv4 发信地址，或留空。",
    lookupFailed: "健康检查失败，请检查域名后重试。",
    score: "评分",
    grade: {
      excellent: "优秀",
      good: "良好",
      "needs-work": "需要优化",
      poor: "风险较高",
    },
    status: {
      pass: "通过",
      warning: "需检查",
      fail: "需修复",
      info: "可选",
    },
    query: "查询",
  },
  "zh-TW": {
    title: "健康報告",
    hint: "檢查影響收信、寄信驗證和寄信信譽的核心記錄。",
    domainLabel: "網域",
    selectorLabel: "DKIM selector",
    senderIpLabel: "IPv4 寄信地址",
    check: "開始檢查",
    invalidDomain: "請輸入 example.com 這樣的網域。",
    invalidIp: "請輸入有效的 IPv4 寄信地址，或留空。",
    lookupFailed: "健康檢查失敗，請檢查網域後重試。",
    score: "評分",
    grade: {
      excellent: "優秀",
      good: "良好",
      "needs-work": "需要優化",
      poor: "風險較高",
    },
    status: {
      pass: "通過",
      warning: "需檢查",
      fail: "需修復",
      info: "選填",
    },
    query: "查詢",
  },
  ja: {
    title: "ヘルスレポート",
    hint: "受信、送信認証、送信元レピュテーションに関わる主要レコードを確認します。",
    domainLabel: "ドメイン",
    selectorLabel: "DKIM セレクター",
    senderIpLabel: "IPv4 送信元アドレス",
    check: "チェック",
    invalidDomain: "example.com のようなドメインを入力してください。",
    invalidIp: "有効な IPv4 送信元アドレスを入力するか、空欄にしてください。",
    lookupFailed: "ヘルスチェックに失敗しました。ドメインを確認して再試行してください。",
    score: "スコア",
    grade: {
      excellent: "優秀",
      good: "良好",
      "needs-work": "要改善",
      poor: "高リスク",
    },
    status: {
      pass: "合格",
      warning: "確認",
      fail: "修正",
      info: "任意",
    },
    query: "クエリ",
  },
  ko: {
    title: "상태 보고서",
    hint: "수신, 발신 인증, 발신 평판에 영향을 주는 핵심 레코드를 확인합니다.",
    domainLabel: "도메인",
    selectorLabel: "DKIM selector",
    senderIpLabel: "IPv4 발신 주소",
    check: "검사 실행",
    invalidDomain: "example.com 같은 도메인을 입력하세요.",
    invalidIp: "올바른 IPv4 발신 주소를 입력하거나 비워 두세요.",
    lookupFailed: "상태 검사에 실패했습니다. 도메인을 확인하고 다시 시도하세요.",
    score: "점수",
    grade: {
      excellent: "우수",
      good: "양호",
      "needs-work": "개선 필요",
      poor: "위험 높음",
    },
    status: {
      pass: "통과",
      warning: "확인",
      fail: "수정",
      info: "선택",
    },
    query: "쿼리",
  },
}

async function lookupDns(name: string, type: "MX" | "TXT"): Promise<DnsRecord[]> {
  const params = new URLSearchParams({ name, type })
  const response = await fetch(`https://cloudflare-dns.com/dns-query?${params.toString()}`, {
    headers: {
      accept: "application/dns-json",
    },
  })

  if (!response.ok) {
    throw new Error("resolver failed")
  }

  const data = (await response.json()) as { Answer?: DnsAnswer[] }

  return (data.Answer || [])
    .filter((answer) => DNS_TYPE_CODES[answer.type] === type)
    .map((answer) => ({
      name: answer.name.replace(/\.$/, ""),
      type,
      ttl: answer.TTL,
      value: answer.data,
    }))
}

async function lookupBlacklist(ipv4: string): Promise<BlacklistResult[] | undefined> {
  if (!ipv4.trim()) {
    return undefined
  }

  return Promise.all(
    buildDnsblQueries(ipv4).map(async (item) => {
      const params = new URLSearchParams({ name: item.query, type: "A" })
      const response = await fetch(`https://cloudflare-dns.com/dns-query?${params.toString()}`, {
        headers: { accept: "application/dns-json" },
      })
      const data = response.ok ? (await response.json()) as { Answer?: DnsAnswer[] } : { Answer: [] }
      const records = (data.Answer || []).filter((answer) => answer.type === 1)

      return {
        zone: item.zone,
        listed: records.length > 0,
      }
    })
  )
}

function statusIcon(status: EmailHealthStatus) {
  if (status === "pass") {
    return CheckCircle2
  }

  if (status === "fail") {
    return AlertCircle
  }

  if (status === "warning") {
    return TriangleAlert
  }

  return Info
}

export function EmailHealthCheckTool({ locale }: { locale: Locale }) {
  const copy = COPY[locale] || COPY.en
  const [domain, setDomain] = useState("7752177.xyz")
  const [selector, setSelector] = useState("default")
  const [senderIp, setSenderIp] = useState("")
  const [report, setReport] = useState<EmailHealthReport | null>(null)
  const [records, setRecords] = useState<Record<string, DnsRecord[]>>({})
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanDomain = normalizeDomainInput(domain)
    const cleanIp = senderIp.trim()

    if (!cleanDomain || !cleanDomain.includes(".")) {
      setError(copy.invalidDomain)
      setReport(null)
      return
    }

    if (cleanIp && !isValidIpv4(cleanIp)) {
      setError(copy.invalidIp)
      setReport(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const mxQuery = buildDnsLookupQuery("mx", cleanDomain)
      const spfQuery = buildDnsLookupQuery("spf", cleanDomain)
      const dmarcQuery = buildDnsLookupQuery("dmarc", cleanDomain)
      const dkimQuery = buildDnsLookupQuery("dkim", cleanDomain, selector)
      const [mxRecords, txtRecords, dmarcTxtRecords, dkimTxtRecords, blacklistResults] = await Promise.all([
        lookupDns(mxQuery.domain, mxQuery.type),
        lookupDns(spfQuery.domain, spfQuery.type),
        lookupDns(dmarcQuery.domain, dmarcQuery.type),
        lookupDns(dkimQuery.domain, dkimQuery.type),
        lookupBlacklist(cleanIp),
      ])
      const spfRecords = filterDnsRecords("spf", txtRecords)
      const dmarcRecords = filterDnsRecords("dmarc", dmarcTxtRecords)
      const dkimRecords = filterDnsRecords("dkim", dkimTxtRecords)

      setRecords({
        mx: mxRecords,
        spf: spfRecords,
        dmarc: dmarcRecords,
        dkim: dkimRecords,
      })
      setReport(buildEmailHealthReport({ mxRecords, spfRecords, dmarcRecords, dkimRecords, blacklistResults }))
    } catch {
      setError(copy.lookupFailed)
      setReport(null)
      setRecords({})
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-6">
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" />
            {copy.title}
          </div>
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{copy.hint}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto]">
          <Input value={domain} onChange={(event) => setDomain(event.target.value)} placeholder="example.com" aria-label={copy.domainLabel} />
          <Input value={selector} onChange={(event) => setSelector(event.target.value)} placeholder="default" aria-label={copy.selectorLabel} />
          <Input value={senderIp} onChange={(event) => setSenderIp(event.target.value)} placeholder="192.0.2.10" aria-label={copy.senderIpLabel} />
          <Button type="submit" className="gap-2" disabled={isLoading}>
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

        {report && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{copy.score}</div>
                <div className="text-4xl font-bold tracking-normal text-gray-950 dark:text-white">{report.score}</div>
              </div>
              <div className="rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                {copy.grade[report.grade]}
              </div>
            </div>

            <div className="grid gap-3">
              {report.items.map((item) => {
                const Icon = statusIcon(item.status)

                return (
                  <div key={item.id} className="rounded-md border border-gray-200 p-4 dark:border-gray-800">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <Icon className={item.status === "pass" ? "mt-1 h-5 w-5 flex-none text-green-600" : item.status === "fail" ? "mt-1 h-5 w-5 flex-none text-red-600" : "mt-1 h-5 w-5 flex-none text-amber-600"} />
                        <div className="space-y-1">
                          <h3 className="font-medium text-gray-950 dark:text-white">{item.label}</h3>
                          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{item.detail}</p>
                          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">{item.recommendation}</p>
                        </div>
                      </div>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        {copy.status[item.status]} · {item.score}/{item.weight}
                      </span>
                    </div>

                    {records[item.id]?.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {records[item.id].map((record) => (
                          <code key={`${record.name}-${record.value}`} className="block break-all rounded bg-gray-50 px-2 py-1 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-200">
                            {stripTxtQuotes(record.value)}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
