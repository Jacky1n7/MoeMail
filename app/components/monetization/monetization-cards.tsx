import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { MONETIZATION_CARDS, type MonetizationCard, type MonetizationPlacement } from "@/lib/monetization"
import type { Locale } from "@/i18n/config"

const TITLES: Record<Locale, string> = {
  en: "Recommended next steps",
  "zh-CN": "推荐下一步",
  "zh-TW": "推薦下一步",
  ja: "おすすめの次の手順",
  ko: "추천 다음 단계",
}

const LOCALIZED_CARDS: Partial<Record<Locale, Record<MonetizationPlacement, MonetizationCard[]>>> = {
  "zh-CN": {
    home: [
      {
        title: "邮件 DNS 健康检查",
        description: "一次检查域名的 MX、SPF、DMARC、DKIM 和黑名单状态。",
        href: "/tools/email-dns-health-check",
        label: "打开工具",
      },
      {
        title: "SPF 记录生成器",
        description: "用常见服务商预设生成干净的 SPF TXT 记录。",
        href: "/tools/spf-generator",
        label: "生成 SPF",
      },
    ],
    tool: [
      {
        title: "更快定位邮件投递问题",
        description: "当单条 DNS 记录解释不了进垃圾箱问题时，运行完整健康检查。",
        href: "/tools/email-dns-health-check",
        label: "开始检查",
      },
      {
        title: "继续修复下一步",
        description: "阅读 SPF、DMARC、DKIM 和黑名单清理指南。",
        href: "/guides",
        label: "查看指南",
      },
    ],
    guide: [
      {
        title: "现在检查你的域名",
        description: "把这篇指南变成针对你自己域名的 DNS 报告。",
        href: "/tools/email-dns-health-check",
        label: "运行检查",
      },
      {
        title: "生成 DNS 记录",
        description: "发布 DNS 修改前，先生成 SPF 和 DMARC 记录。",
        href: "/tools",
        label: "打开工具",
      },
    ],
  },
  "zh-TW": {
    home: [
      {
        title: "郵件 DNS 健康檢查",
        description: "一次檢查網域的 MX、SPF、DMARC、DKIM 與黑名單狀態。",
        href: "/tools/email-dns-health-check",
        label: "開啟工具",
      },
      {
        title: "SPF 記錄產生器",
        description: "用常見服務商預設產生乾淨的 SPF TXT 記錄。",
        href: "/tools/spf-generator",
        label: "產生 SPF",
      },
    ],
    tool: [
      {
        title: "更快定位郵件投遞問題",
        description: "當單條 DNS 記錄不足以解釋收件匣表現時，執行完整健康檢查。",
        href: "/tools/email-dns-health-check",
        label: "開始檢查",
      },
      {
        title: "繼續修復下一步",
        description: "閱讀 SPF、DMARC、DKIM 與黑名單清理指南。",
        href: "/guides",
        label: "查看指南",
      },
    ],
    guide: [
      {
        title: "現在檢查你的網域",
        description: "把這篇指南轉成針對你自己網域的 DNS 報告。",
        href: "/tools/email-dns-health-check",
        label: "執行檢查",
      },
      {
        title: "產生 DNS 記錄",
        description: "發布 DNS 修改前，先產生 SPF 和 DMARC 記錄。",
        href: "/tools",
        label: "開啟工具",
      },
    ],
  },
  ja: {
    home: [
      {
        title: "メール DNS ヘルスチェック",
        description: "MX、SPF、DMARC、DKIM、ブラックリスト状態をまとめて確認します。",
        href: "/tools/email-dns-health-check",
        label: "ツールを開く",
      },
      {
        title: "SPF レコード生成",
        description: "主要プロバイダーのプリセットから SPF TXT レコードを作成します。",
        href: "/tools/spf-generator",
        label: "SPF を生成",
      },
    ],
    tool: [
      {
        title: "メール到達率の問題を素早く特定",
        description: "1 つの DNS レコードだけでは原因が見えないときに、完全なヘルスチェックを実行します。",
        href: "/tools/email-dns-health-check",
        label: "チェックする",
      },
      {
        title: "次の修正手順を確認",
        description: "SPF、DMARC、DKIM、ブラックリスト対応のガイドを読みます。",
        href: "/guides",
        label: "ガイドを見る",
      },
    ],
    guide: [
      {
        title: "今すぐドメインを確認",
        description: "このガイドの内容を自分のドメイン向け DNS レポートに変換します。",
        href: "/tools/email-dns-health-check",
        label: "チェックを実行",
      },
      {
        title: "DNS レコードを作成",
        description: "DNS を変更する前に SPF と DMARC レコードを生成します。",
        href: "/tools",
        label: "ツールを開く",
      },
    ],
  },
  ko: {
    home: [
      {
        title: "이메일 DNS 상태 점검",
        description: "MX, SPF, DMARC, DKIM, 블랙리스트 상태를 한 번에 확인합니다.",
        href: "/tools/email-dns-health-check",
        label: "도구 열기",
      },
      {
        title: "SPF 레코드 생성기",
        description: "주요 제공업체 프리셋으로 깔끔한 SPF TXT 레코드를 만듭니다.",
        href: "/tools/spf-generator",
        label: "SPF 생성",
      },
    ],
    tool: [
      {
        title: "이메일 전달 문제를 더 빠르게 찾기",
        description: "DNS 레코드 하나만으로 원인을 알기 어려울 때 전체 상태 점검을 실행합니다.",
        href: "/tools/email-dns-health-check",
        label: "점검 실행",
      },
      {
        title: "다음 수정 단계 확인",
        description: "SPF, DMARC, DKIM, 블랙리스트 정리 가이드를 읽어보세요.",
        href: "/guides",
        label: "가이드 보기",
      },
    ],
    guide: [
      {
        title: "지금 도메인 확인",
        description: "이 가이드를 내 도메인에 맞춘 DNS 보고서로 바꿔봅니다.",
        href: "/tools/email-dns-health-check",
        label: "점검 실행",
      },
      {
        title: "DNS 레코드 만들기",
        description: "DNS 변경을 게시하기 전에 SPF와 DMARC 레코드를 생성합니다.",
        href: "/tools",
        label: "도구 열기",
      },
    ],
  },
}

export function MonetizationCards({
  placement,
  locale,
}: {
  placement: MonetizationPlacement
  locale: Locale
}) {
  const cards = LOCALIZED_CARDS[locale]?.[placement] || MONETIZATION_CARDS[placement]

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <Sparkles className="h-4 w-4" />
        {TITLES[locale] || TITLES.en}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={`/${locale}${card.href}`}
            className="group rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary/50 dark:border-gray-800 dark:bg-gray-950"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-950 dark:text-white">{card.title}</h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{card.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {card.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
