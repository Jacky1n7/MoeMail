"use client"

import { useMemo, useState } from "react"
import { Copy, FileCog, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { buildDmarcRecord, buildSpfRecord, type DmarcRecordInput, type SpfRecordInput } from "@/lib/email-tools"
import type { Locale } from "@/i18n/config"

type GeneratorKind = "spf" | "dmarc"

type GeneratorCopy = {
  title: string
  hint: string
  domainLabel: string
  includesLabel: string
  ip4Label: string
  allowALabel: string
  allowMxLabel: string
  allLabel: string
  policyLabel: string
  ruaLabel: string
  pctLabel: string
  resultLabel: string
  copy: string
  copied: string
  policies: Record<DmarcRecordInput["policy"], string>
}

const COPY: Record<Locale, GeneratorCopy> = {
  en: {
    title: "Record builder",
    hint: "Adjust the fields and copy the TXT value into your DNS provider.",
    domainLabel: "Domain",
    includesLabel: "Include mechanisms",
    ip4Label: "IPv4 senders",
    allowALabel: "Allow domain A record",
    allowMxLabel: "Allow MX servers",
    allLabel: "Default result",
    policyLabel: "Policy",
    ruaLabel: "Report email",
    pctLabel: "Enforcement percent",
    resultLabel: "TXT value",
    copy: "Copy",
    copied: "Copied",
    policies: {
      none: "Monitor only",
      quarantine: "Send failures to spam",
      reject: "Reject failures",
    },
  },
  "zh-CN": {
    title: "记录生成器",
    hint: "调整字段后，把 TXT 值复制到你的 DNS 服务商。",
    domainLabel: "域名",
    includesLabel: "include 机制",
    ip4Label: "IPv4 发信地址",
    allowALabel: "允许域名 A 记录发信",
    allowMxLabel: "允许 MX 服务器发信",
    allLabel: "默认结果",
    policyLabel: "策略",
    ruaLabel: "报告邮箱",
    pctLabel: "执行比例",
    resultLabel: "TXT 值",
    copy: "复制",
    copied: "已复制",
    policies: {
      none: "仅监控",
      quarantine: "失败邮件进垃圾箱",
      reject: "拒收失败邮件",
    },
  },
  "zh-TW": {
    title: "記錄產生器",
    hint: "調整欄位後，把 TXT 值複製到你的 DNS 服務商。",
    domainLabel: "網域",
    includesLabel: "include 機制",
    ip4Label: "IPv4 寄信地址",
    allowALabel: "允許網域 A 記錄寄信",
    allowMxLabel: "允許 MX 伺服器寄信",
    allLabel: "預設結果",
    policyLabel: "政策",
    ruaLabel: "報告信箱",
    pctLabel: "執行比例",
    resultLabel: "TXT 值",
    copy: "複製",
    copied: "已複製",
    policies: {
      none: "僅監控",
      quarantine: "失敗郵件進垃圾信",
      reject: "拒收失敗郵件",
    },
  },
  ja: {
    title: "レコード作成",
    hint: "項目を調整し、TXT 値を DNS プロバイダーにコピーします。",
    domainLabel: "ドメイン",
    includesLabel: "include メカニズム",
    ip4Label: "IPv4 送信元",
    allowALabel: "ドメインの A レコードを許可",
    allowMxLabel: "MX サーバーを許可",
    allLabel: "デフォルト結果",
    policyLabel: "ポリシー",
    ruaLabel: "レポート用メール",
    pctLabel: "適用率",
    resultLabel: "TXT 値",
    copy: "コピー",
    copied: "コピー済み",
    policies: {
      none: "監視のみ",
      quarantine: "失敗メールを迷惑メールへ",
      reject: "失敗メールを拒否",
    },
  },
  ko: {
    title: "레코드 생성기",
    hint: "필드를 조정한 뒤 TXT 값을 DNS 제공업체에 복사하세요.",
    domainLabel: "도메인",
    includesLabel: "include 메커니즘",
    ip4Label: "IPv4 발신 주소",
    allowALabel: "도메인 A 레코드 허용",
    allowMxLabel: "MX 서버 허용",
    allLabel: "기본 결과",
    policyLabel: "정책",
    ruaLabel: "보고서 이메일",
    pctLabel: "적용 비율",
    resultLabel: "TXT 값",
    copy: "복사",
    copied: "복사됨",
    policies: {
      none: "모니터링만",
      quarantine: "실패 메일을 스팸으로",
      reject: "실패 메일 거부",
    },
  },
}

export function EmailRecordGeneratorTool({
  kind,
  locale,
}: {
  kind: GeneratorKind
  locale: Locale
}) {
  const copy = COPY[locale] || COPY.en
  const [allowA, setAllowA] = useState(true)
  const [allowMx, setAllowMx] = useState(true)
  const [includes, setIncludes] = useState("_spf.google.com")
  const [ip4, setIp4] = useState("")
  const [all, setAll] = useState<SpfRecordInput["all"]>("~all")
  const [policy, setPolicy] = useState<DmarcRecordInput["policy"]>("none")
  const [rua, setRua] = useState("dmarc@example.com")
  const [pct, setPct] = useState(100)
  const [copied, setCopied] = useState(false)

  const record = useMemo(() => {
    if (kind === "spf") {
      return buildSpfRecord({ allowA, allowMx, includes, ip4, all })
    }

    return buildDmarcRecord({ policy, rua, pct })
  }, [allowA, allowMx, all, includes, ip4, kind, pct, policy, rua])

  async function copyRecord() {
    await navigator.clipboard?.writeText(record)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const Icon = kind === "spf" ? ShieldCheck : FileCog

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-6">
      <div className="space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Icon className="h-4 w-4" />
            {copy.title}
          </div>
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{copy.hint}</p>
        </div>

        {kind === "spf" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>{copy.includesLabel}</Label>
              <Input value={includes} onChange={(event) => setIncludes(event.target.value)} placeholder="_spf.google.com, sendgrid.net" />
            </div>
            <div className="space-y-2">
              <Label>{copy.ip4Label}</Label>
              <Input value={ip4} onChange={(event) => setIp4(event.target.value)} placeholder="192.0.2.10, 198.51.100.7" />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Checkbox checked={allowA} onChange={setAllowA} />
              {copy.allowALabel}
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Checkbox checked={allowMx} onChange={setAllowMx} />
              {copy.allowMxLabel}
            </label>
            <div className="space-y-2">
              <Label>{copy.allLabel}</Label>
              <Select value={all} onValueChange={(value) => setAll(value as SpfRecordInput["all"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="~all">~all</SelectItem>
                  <SelectItem value="-all">-all</SelectItem>
                  <SelectItem value="?all">?all</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>{copy.policyLabel}</Label>
              <Select value={policy} onValueChange={(value) => setPolicy(value as DmarcRecordInput["policy"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["none", "quarantine", "reject"] as const).map((value) => (
                    <SelectItem key={value} value={value}>{copy.policies[value]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{copy.ruaLabel}</Label>
              <Input value={rua} onChange={(event) => setRua(event.target.value)} placeholder="dmarc@example.com" />
            </div>
            <div className="space-y-2">
              <Label>{copy.pctLabel}</Label>
              <Input type="number" min={1} max={100} value={pct} onChange={(event) => setPct(Number(event.target.value))} />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label>{copy.resultLabel}</Label>
            <Button type="button" variant="outline" size="sm" className="gap-2" onClick={copyRecord}>
              <Copy className="h-4 w-4" />
              {copied ? copy.copied : copy.copy}
            </Button>
          </div>
          <code className="block break-all rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
            {record}
          </code>
        </div>
      </div>
    </section>
  )
}
