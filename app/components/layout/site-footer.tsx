import Link from "next/link"
import { SITE_NAME } from "@/config/site"
import type { Locale } from "@/i18n/config"

const COPY: Record<Locale, {
  description: string
  product: string
  trust: string
  business: string
  links: Record<string, string>
}> = {
  en: {
    description: "Temporary email, email DNS tools, and practical deliverability guides for safer email workflows.",
    product: "Product",
    trust: "Trust",
    business: "Business",
    links: {
      tools: "Email Tools",
      guides: "Guides",
      temporaryEmail: "Temporary Email",
      about: "About",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      advertise: "Advertise",
    },
  },
  "zh-CN": {
    description: "临时邮箱、邮件 DNS 工具和邮件投递指南，帮助你更安全地处理邮件流程。",
    product: "产品",
    trust: "信任",
    business: "商务",
    links: {
      tools: "邮件工具",
      guides: "邮件指南",
      temporaryEmail: "临时邮箱",
      about: "关于",
      privacy: "隐私政策",
      terms: "服务条款",
      contact: "联系我们",
      advertise: "广告合作",
    },
  },
  "zh-TW": {
    description: "臨時信箱、郵件 DNS 工具和郵件投遞指南，協助你更安全地處理郵件流程。",
    product: "產品",
    trust: "信任",
    business: "商務",
    links: {
      tools: "郵件工具",
      guides: "郵件指南",
      temporaryEmail: "臨時信箱",
      about: "關於",
      privacy: "隱私政策",
      terms: "服務條款",
      contact: "聯絡我們",
      advertise: "廣告合作",
    },
  },
  ja: {
    description: "一時メール、メール DNS ツール、配信改善ガイドで安全なメール運用を支援します。",
    product: "プロダクト",
    trust: "信頼",
    business: "ビジネス",
    links: {
      tools: "メールツール",
      guides: "ガイド",
      temporaryEmail: "一時メール",
      about: "概要",
      privacy: "プライバシー",
      terms: "利用規約",
      contact: "お問い合わせ",
      advertise: "広告掲載",
    },
  },
  ko: {
    description: "임시 이메일, 메일 DNS 도구, 실용적인 전달성 가이드로 더 안전한 메일 흐름을 지원합니다.",
    product: "제품",
    trust: "신뢰",
    business: "비즈니스",
    links: {
      tools: "메일 도구",
      guides: "가이드",
      temporaryEmail: "임시 이메일",
      about: "소개",
      privacy: "개인정보",
      terms: "약관",
      contact: "문의",
      advertise: "광고 문의",
    },
  },
}

const LINK_GROUPS = [
  {
    title: "product",
    links: [
      ["tools", "tools"],
      ["guides", "guides"],
      ["temporaryEmail", "temporary-email"],
    ],
  },
  {
    title: "trust",
    links: [
      ["about", "about"],
      ["privacy", "privacy"],
      ["terms", "terms"],
      ["contact", "contact"],
    ],
  },
  {
    title: "business",
    links: [["advertise", "advertise"]],
  },
] as const

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = COPY[locale] || COPY.en

  return (
    <footer className="border-t border-gray-200 py-8 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-300">
      <div className="grid gap-8 md:grid-cols-[1.5fr_2fr]">
        <div className="space-y-3">
          <Link href={`/${locale}`} className="font-semibold text-gray-950 hover:text-primary dark:text-white">
            {SITE_NAME}
          </Link>
          <p className="max-w-md leading-6">{copy.description}</p>
        </div>
        <nav className="grid gap-6 sm:grid-cols-3">
          {LINK_GROUPS.map((group) => (
            <div key={group.title} className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-normal text-gray-500 dark:text-gray-400">
                {copy[group.title]}
              </h2>
              <div className="space-y-2">
                {group.links.map(([label, href]) => (
                  <Link key={href} href={`/${locale}/${href}`} className="block hover:text-primary hover:underline">
                    {copy.links[label]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  )
}
