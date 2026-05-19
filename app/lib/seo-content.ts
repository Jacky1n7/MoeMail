import type { EmailGuidePageSlug, EmailToolPageSlug } from "@/config/site"
import { SITE_NAME, SITE_URL } from "@/config/site"
import { i18n, type Locale } from "@/i18n/config"
import type { DnsToolMode } from "@/lib/email-tools"
export { getMarketingPageContent } from "@/lib/marketing-content"
export type { MarketingPageContent } from "@/lib/marketing-content"

export type FaqItem = {
  question: string
  answer: string
}

export type ContentSection = {
  heading: string
  body: string[]
}

export type DnsLookupToolCopy = {
  modes: Record<DnsToolMode, {
    label: string
    title: string
    hint: string
  }>
  domainLabel: string
  selectorLabel: string
  lookup: string
  invalidDomain: string
  resolverFailed: string
  lookupFailed: string
  recordFound: string
  recordsFound: string
  noRecords: string
  query: string
  value: string
  ttl: string
  noRecordExplanation: string
}

export type EmailHeaderAnalyzerCopy = {
  title: string
  placeholder: string
  rawHeadersLabel: string
  receivedPath: string
  sampleHeaders: string
  summaryLabels: {
    from: string
    to: string
    subject: string
    date: string
    messageId: string
  }
  signals: Record<string, {
    label: string
    description: string
  }>
}

export type EmailToolContent = {
  slug: EmailToolPageSlug
  mode: "mx" | "spf" | "dmarc" | "dkim" | "header" | "spf-generator" | "dmarc-generator" | "blacklist"
  title: string
  description: string
  breadcrumb: string
  sections: ContentSection[]
  faq: FaqItem[]
  toolCopy: DnsLookupToolCopy
  headerCopy: EmailHeaderAnalyzerCopy
}

export type EmailGuideContent = {
  slug: EmailGuidePageSlug
  title: string
  description: string
  sections: ContentSection[]
  relatedTools: EmailToolPageSlug[]
  faq: FaqItem[]
}

export type ToolsIndexContent = {
  title: string
  description: string
  breadcrumb: string
  guidesTitle: string
  guidesDescription: string
}

export type SearchMetadataKind = "tool" | "guide" | "marketing" | "index"

const SEARCH_TITLE_SUFFIX: Record<Locale, Record<SearchMetadataKind, string>> = {
  en: {
    tool: "Free Email Tool",
    guide: "Email Deliverability Guide",
    marketing: "MoeMail",
    index: "Free Email Tools",
  },
  "zh-CN": {
    tool: "免费邮件工具",
    guide: "邮件投递指南",
    marketing: "MoeMail",
    index: "免费邮件工具",
  },
  "zh-TW": {
    tool: "免費郵件工具",
    guide: "郵件投遞指南",
    marketing: "MoeMail",
    index: "免費郵件工具",
  },
  ja: {
    tool: "無料メールツール",
    guide: "メール配信ガイド",
    marketing: "MoeMail",
    index: "無料メールツール",
  },
  ko: {
    tool: "무료 메일 도구",
    guide: "메일 전달 가이드",
    marketing: "MoeMail",
    index: "무료 메일 도구",
  },
}

const SEARCH_DESCRIPTION_PREFIX: Record<Locale, Partial<Record<SearchMetadataKind, string>>> = {
  en: {
    tool: "Free online checker.",
    guide: "Practical guide.",
    index: "Free online email tools.",
  },
  "zh-CN": {
    tool: "免费在线检查工具。",
    guide: "实用指南。",
    index: "免费的在线邮件工具。",
  },
  "zh-TW": {
    tool: "免費線上檢查工具。",
    guide: "實用指南。",
    index: "免費線上郵件工具。",
  },
  ja: {
    tool: "無料のオンラインチェックツール。",
    guide: "実用ガイド。",
    index: "無料のオンラインメールツール。",
  },
  ko: {
    tool: "무료 온라인 검사 도구.",
    guide: "실용 가이드.",
    index: "무료 온라인 메일 도구.",
  },
}

const DEFAULT_LOCALE = i18n.defaultLocale

const DNS_COPY: Record<Locale, DnsLookupToolCopy> = {
  en: {
    modes: {
      mx: {
        label: "MX",
        title: "MX records",
        hint: "Shows which mail servers receive email for this domain.",
      },
      spf: {
        label: "SPF",
        title: "SPF policy",
        hint: "Finds the v=spf1 TXT record used for sender authorization.",
      },
      dmarc: {
        label: "DMARC",
        title: "DMARC policy",
        hint: "Checks the _dmarc TXT record used for authentication policy.",
      },
      dkim: {
        label: "DKIM",
        title: "DKIM key",
        hint: "Checks a selector._domainkey TXT record for a DKIM public key.",
      },
    },
    domainLabel: "Domain",
    selectorLabel: "DKIM selector",
    lookup: "Lookup",
    invalidDomain: "Enter a domain such as example.com.",
    resolverFailed: "DNS resolver request failed.",
    lookupFailed: "Lookup failed. Check the domain and try again.",
    recordFound: "1 record found",
    recordsFound: "{count} records found",
    noRecords: "No matching records found",
    query: "Query",
    value: "Value",
    ttl: "TTL",
    noRecordExplanation: "The domain resolved, but this checker did not find the expected record.",
  },
  "zh-CN": {
    modes: {
      mx: {
        label: "MX",
        title: "MX 记录",
        hint: "查看这个域名由哪些邮件服务器接收来信。",
      },
      spf: {
        label: "SPF",
        title: "SPF 策略",
        hint: "查找用于声明发信授权的 v=spf1 TXT 记录。",
      },
      dmarc: {
        label: "DMARC",
        title: "DMARC 策略",
        hint: "检查用于邮件认证策略的 _dmarc TXT 记录。",
      },
      dkim: {
        label: "DKIM",
        title: "DKIM 公钥",
        hint: "检查 selector._domainkey TXT 记录中的 DKIM 公钥。",
      },
    },
    domainLabel: "域名",
    selectorLabel: "DKIM selector",
    lookup: "查询",
    invalidDomain: "请输入 example.com 这样的域名。",
    resolverFailed: "DNS 解析器请求失败。",
    lookupFailed: "查询失败，请检查域名后重试。",
    recordFound: "找到 1 条记录",
    recordsFound: "找到 {count} 条记录",
    noRecords: "没有找到匹配记录",
    query: "查询",
    value: "记录值",
    ttl: "TTL",
    noRecordExplanation: "域名可以解析，但没有找到这个检查器期望的记录。",
  },
  "zh-TW": {
    modes: {
      mx: {
        label: "MX",
        title: "MX 記錄",
        hint: "查看這個網域由哪些郵件伺服器接收來信。",
      },
      spf: {
        label: "SPF",
        title: "SPF 政策",
        hint: "查找用於聲明寄信授權的 v=spf1 TXT 記錄。",
      },
      dmarc: {
        label: "DMARC",
        title: "DMARC 政策",
        hint: "檢查用於郵件驗證政策的 _dmarc TXT 記錄。",
      },
      dkim: {
        label: "DKIM",
        title: "DKIM 公鑰",
        hint: "檢查 selector._domainkey TXT 記錄中的 DKIM 公鑰。",
      },
    },
    domainLabel: "網域",
    selectorLabel: "DKIM selector",
    lookup: "查詢",
    invalidDomain: "請輸入 example.com 這樣的網域。",
    resolverFailed: "DNS 解析器請求失敗。",
    lookupFailed: "查詢失敗，請檢查網域後重試。",
    recordFound: "找到 1 筆記錄",
    recordsFound: "找到 {count} 筆記錄",
    noRecords: "沒有找到符合記錄",
    query: "查詢",
    value: "記錄值",
    ttl: "TTL",
    noRecordExplanation: "網域可以解析，但沒有找到這個檢查器預期的記錄。",
  },
  ja: {
    modes: {
      mx: {
        label: "MX",
        title: "MX レコード",
        hint: "このドメイン宛のメールを受け取るメールサーバーを表示します。",
      },
      spf: {
        label: "SPF",
        title: "SPF ポリシー",
        hint: "送信元を許可する v=spf1 TXT レコードを探します。",
      },
      dmarc: {
        label: "DMARC",
        title: "DMARC ポリシー",
        hint: "認証ポリシーに使う _dmarc TXT レコードを確認します。",
      },
      dkim: {
        label: "DKIM",
        title: "DKIM キー",
        hint: "selector._domainkey TXT レコードの DKIM 公開鍵を確認します。",
      },
    },
    domainLabel: "ドメイン",
    selectorLabel: "DKIM セレクター",
    lookup: "検索",
    invalidDomain: "example.com のようなドメインを入力してください。",
    resolverFailed: "DNS リゾルバーへのリクエストに失敗しました。",
    lookupFailed: "検索に失敗しました。ドメインを確認して再試行してください。",
    recordFound: "1 件のレコードが見つかりました",
    recordsFound: "{count} 件のレコードが見つかりました",
    noRecords: "一致するレコードは見つかりません",
    query: "クエリ",
    value: "値",
    ttl: "TTL",
    noRecordExplanation: "ドメインは解決できましたが、期待されるレコードは見つかりませんでした。",
  },
  ko: {
    modes: {
      mx: {
        label: "MX",
        title: "MX 레코드",
        hint: "이 도메인의 메일을 수신하는 메일 서버를 보여줍니다.",
      },
      spf: {
        label: "SPF",
        title: "SPF 정책",
        hint: "발신 권한을 선언하는 v=spf1 TXT 레코드를 찾습니다.",
      },
      dmarc: {
        label: "DMARC",
        title: "DMARC 정책",
        hint: "메일 인증 정책에 쓰이는 _dmarc TXT 레코드를 확인합니다.",
      },
      dkim: {
        label: "DKIM",
        title: "DKIM 키",
        hint: "selector._domainkey TXT 레코드의 DKIM 공개키를 확인합니다.",
      },
    },
    domainLabel: "도메인",
    selectorLabel: "DKIM selector",
    lookup: "조회",
    invalidDomain: "example.com 같은 도메인을 입력하세요.",
    resolverFailed: "DNS 확인자 요청에 실패했습니다.",
    lookupFailed: "조회에 실패했습니다. 도메인을 확인하고 다시 시도하세요.",
    recordFound: "레코드 1개 발견",
    recordsFound: "레코드 {count}개 발견",
    noRecords: "일치하는 레코드 없음",
    query: "쿼리",
    value: "값",
    ttl: "TTL",
    noRecordExplanation: "도메인은 확인되었지만 예상한 레코드는 찾지 못했습니다.",
  },
}

const SAMPLE_HEADERS = `From: Example Sender <sender@example.com>
To: You <you@example.net>
Subject: Test message
Date: Tue, 19 May 2026 10:00:02 +0000
Message-ID: <abc123@example.com>
Authentication-Results: mx.example.net;
 spf=pass smtp.mailfrom=example.com;
 dkim=pass header.d=example.com;
 dmarc=pass header.from=example.com
Received: from mail.example.com by mx.example.net;
 Tue, 19 May 2026 10:00:00 +0000
Received: from app.example.com by mail.example.com;
 Tue, 19 May 2026 09:59:58 +0000`

const HEADER_COPY: Record<Locale, EmailHeaderAnalyzerCopy> = {
  en: {
    title: "Header analyzer",
    placeholder: "Paste raw email headers here",
    rawHeadersLabel: "Raw email headers",
    receivedPath: "Received path",
    sampleHeaders: SAMPLE_HEADERS,
    summaryLabels: {
      from: "From",
      to: "To",
      subject: "Subject",
      date: "Date",
      messageId: "Message-ID",
    },
    signals: {
      "Authentication passed": {
        label: "Authentication passed",
        description: "SPF, DKIM, and DMARC all show pass in the Authentication-Results header.",
      },
      "Authentication needs review": {
        label: "Authentication needs review",
        description: "One or more authentication checks did not pass or are missing from the headers.",
      },
      "No SPF pass found": {
        label: "No SPF pass found",
        description: "SPF did not show pass. Check the sending service and SPF record for this domain.",
      },
      "No DKIM pass found": {
        label: "No DKIM pass found",
        description: "DKIM did not show pass. Check the selector and signing configuration.",
      },
      "No DMARC pass found": {
        label: "No DMARC pass found",
        description: "DMARC did not show pass. Check alignment between the visible From domain and SPF or DKIM.",
      },
      "Received hops": {
        label: "Received hops",
        description: "Received headers show the path the message took before reaching the mailbox.",
      },
    },
  },
  "zh-CN": {
    title: "邮件头分析器",
    placeholder: "在这里粘贴原始邮件头",
    rawHeadersLabel: "原始邮件头",
    receivedPath: "Received 路径",
    sampleHeaders: SAMPLE_HEADERS,
    summaryLabels: {
      from: "发件人",
      to: "收件人",
      subject: "主题",
      date: "日期",
      messageId: "Message-ID",
    },
    signals: {
      "Authentication passed": {
        label: "认证通过",
        description: "Authentication-Results 中 SPF、DKIM、DMARC 都显示 pass。",
      },
      "Authentication needs review": {
        label: "认证需要检查",
        description: "至少一项邮件认证没有通过，或者邮件头里缺少相关结果。",
      },
      "No SPF pass found": {
        label: "没有 SPF pass",
        description: "SPF 没有显示通过。请检查发信服务和域名的 SPF 记录。",
      },
      "No DKIM pass found": {
        label: "没有 DKIM pass",
        description: "DKIM 没有显示通过。请检查 selector 和签名配置。",
      },
      "No DMARC pass found": {
        label: "没有 DMARC pass",
        description: "DMARC 没有显示通过。请检查 From 域名与 SPF 或 DKIM 的对齐关系。",
      },
      "Received hops": {
        label: "Received 跳数",
        description: "Received 邮件头展示了邮件到达邮箱前经过的路径。",
      },
    },
  },
  "zh-TW": {
    title: "郵件標頭分析器",
    placeholder: "在這裡貼上原始郵件標頭",
    rawHeadersLabel: "原始郵件標頭",
    receivedPath: "Received 路徑",
    sampleHeaders: SAMPLE_HEADERS,
    summaryLabels: {
      from: "寄件人",
      to: "收件人",
      subject: "主旨",
      date: "日期",
      messageId: "Message-ID",
    },
    signals: {
      "Authentication passed": {
        label: "驗證通過",
        description: "Authentication-Results 中 SPF、DKIM、DMARC 都顯示 pass。",
      },
      "Authentication needs review": {
        label: "驗證需要檢查",
        description: "至少一項郵件驗證沒有通過，或郵件標頭缺少相關結果。",
      },
      "No SPF pass found": {
        label: "沒有 SPF pass",
        description: "SPF 沒有顯示通過。請檢查寄信服務與網域 SPF 記錄。",
      },
      "No DKIM pass found": {
        label: "沒有 DKIM pass",
        description: "DKIM 沒有顯示通過。請檢查 selector 與簽名設定。",
      },
      "No DMARC pass found": {
        label: "沒有 DMARC pass",
        description: "DMARC 沒有顯示通過。請檢查 From 網域與 SPF 或 DKIM 的對齊關係。",
      },
      "Received hops": {
        label: "Received 跳數",
        description: "Received 郵件標頭展示了郵件到達信箱前經過的路徑。",
      },
    },
  },
  ja: {
    title: "メールヘッダー分析",
    placeholder: "ここに生のメールヘッダーを貼り付けます",
    rawHeadersLabel: "生のメールヘッダー",
    receivedPath: "Received 経路",
    sampleHeaders: SAMPLE_HEADERS,
    summaryLabels: {
      from: "From",
      to: "To",
      subject: "件名",
      date: "日付",
      messageId: "Message-ID",
    },
    signals: {
      "Authentication passed": {
        label: "認証は通過",
        description: "Authentication-Results で SPF、DKIM、DMARC がすべて pass になっています。",
      },
      "Authentication needs review": {
        label: "認証の確認が必要",
        description: "一部の認証が pass ではない、またはヘッダーに結果がありません。",
      },
      "No SPF pass found": {
        label: "SPF pass がありません",
        description: "SPF が pass ではありません。送信サービスと SPF レコードを確認してください。",
      },
      "No DKIM pass found": {
        label: "DKIM pass がありません",
        description: "DKIM が pass ではありません。セレクターと署名設定を確認してください。",
      },
      "No DMARC pass found": {
        label: "DMARC pass がありません",
        description: "DMARC が pass ではありません。From ドメインと SPF または DKIM の整合を確認してください。",
      },
      "Received hops": {
        label: "Received ホップ",
        description: "Received ヘッダーはメールがメールボックスに届くまでの経路を示します。",
      },
    },
  },
  ko: {
    title: "메일 헤더 분석기",
    placeholder: "원본 메일 헤더를 여기에 붙여넣으세요",
    rawHeadersLabel: "원본 메일 헤더",
    receivedPath: "Received 경로",
    sampleHeaders: SAMPLE_HEADERS,
    summaryLabels: {
      from: "보낸 사람",
      to: "받는 사람",
      subject: "제목",
      date: "날짜",
      messageId: "Message-ID",
    },
    signals: {
      "Authentication passed": {
        label: "인증 통과",
        description: "Authentication-Results에서 SPF, DKIM, DMARC가 모두 pass입니다.",
      },
      "Authentication needs review": {
        label: "인증 확인 필요",
        description: "하나 이상의 인증 결과가 통과하지 않았거나 헤더에 없습니다.",
      },
      "No SPF pass found": {
        label: "SPF pass 없음",
        description: "SPF가 pass가 아닙니다. 발신 서비스와 SPF 레코드를 확인하세요.",
      },
      "No DKIM pass found": {
        label: "DKIM pass 없음",
        description: "DKIM이 pass가 아닙니다. selector와 서명 설정을 확인하세요.",
      },
      "No DMARC pass found": {
        label: "DMARC pass 없음",
        description: "DMARC가 pass가 아닙니다. From 도메인과 SPF 또는 DKIM 정렬을 확인하세요.",
      },
      "Received hops": {
        label: "Received 홉",
        description: "Received 헤더는 메일함에 도착하기 전 메시지 경로를 보여줍니다.",
      },
    },
  },
}

const TOOLS_INDEX: Record<Locale, ToolsIndexContent> = {
  en: {
    title: "Email Tools",
    description: "Check the records that affect email delivery, sender authentication, and domain trust.",
    breadcrumb: "Email Tools",
    guidesTitle: "Email deliverability guides",
    guidesDescription: "Learn what the records mean, then use the tools to verify your domain.",
  },
  "zh-CN": {
    title: "邮件工具",
    description: "检查影响邮件投递、发件认证和域名信誉的关键记录。",
    breadcrumb: "邮件工具",
    guidesTitle: "邮件投递指南",
    guidesDescription: "先理解记录含义，再用工具验证你的域名配置。",
  },
  "zh-TW": {
    title: "郵件工具",
    description: "檢查影響郵件投遞、寄件驗證與網域信譽的關鍵記錄。",
    breadcrumb: "郵件工具",
    guidesTitle: "郵件投遞指南",
    guidesDescription: "先理解記錄含義，再用工具驗證你的網域設定。",
  },
  ja: {
    title: "メールツール",
    description: "メール配信、送信者認証、ドメイン信頼性に関わるレコードを確認します。",
    breadcrumb: "メールツール",
    guidesTitle: "メール配信ガイド",
    guidesDescription: "レコードの意味を理解してから、ツールでドメイン設定を確認しましょう。",
  },
  ko: {
    title: "메일 도구",
    description: "메일 전달, 발신자 인증, 도메인 신뢰도에 영향을 주는 레코드를 확인합니다.",
    breadcrumb: "메일 도구",
    guidesTitle: "메일 전달 가이드",
    guidesDescription: "레코드의 의미를 이해한 뒤 도구로 도메인 설정을 확인하세요.",
  },
}

type EmailToolContentEntry = Omit<EmailToolContent, "slug" | "toolCopy" | "headerCopy">

const TOOL_CONTENT: Record<Locale, Partial<Record<EmailToolPageSlug, EmailToolContentEntry>>> = {
  en: {
    "mx-lookup": {
      mode: "mx",
      title: "MX Lookup",
      description: "Check the mail exchange records that receive email for a domain.",
      breadcrumb: "Email Tools",
      sections: [
        {
          heading: "When MX records matter",
          body: [
            "MX records tell the internet which servers accept mail for a domain. Broken or missing MX records can stop incoming mail completely.",
            "Use this when setting up a custom domain, moving mail providers, debugging verification emails, or checking whether a domain can receive mail.",
          ],
        },
      ],
      faq: [
        {
          question: "What does an MX record do?",
          answer: "It points a domain to the mail servers that should receive incoming email.",
        },
        {
          question: "Can a domain receive email without MX records?",
          answer: "Sometimes receivers fall back to an A record, but modern mail setups should publish clear MX records.",
        },
      ],
    },
    "spf-checker": {
      mode: "spf",
      title: "SPF Checker",
      description: "Find the SPF TXT record that controls which senders can mail for a domain.",
      breadcrumb: "Email Tools",
      sections: [
        {
          heading: "What SPF protects",
          body: [
            "SPF lists the servers and services allowed to send mail for a domain. It helps receiving mail systems detect spoofed senders.",
            "A clean SPF record is especially important for transactional email, newsletters, and services that send account verification messages.",
          ],
        },
      ],
      faq: [
        {
          question: "How many SPF records should a domain have?",
          answer: "A domain should publish one SPF TXT record. Multiple SPF records can cause a permanent error.",
        },
        {
          question: "Why does SPF fail?",
          answer: "Common causes include missing include mechanisms, a changed sending service, or the message being forwarded.",
        },
      ],
    },
    "dmarc-checker": {
      mode: "dmarc",
      title: "DMARC Checker",
      description: "Inspect a domain's DMARC policy for email authentication and reporting.",
      breadcrumb: "Email Tools",
      sections: [
        {
          heading: "Why DMARC is useful",
          body: [
            "DMARC tells receivers how to handle messages that fail SPF or DKIM checks. It can also send reports about authentication results.",
            "Start with monitoring, then tighten policy once legitimate senders are aligned.",
          ],
        },
      ],
      faq: [
        {
          question: "What DMARC policy should I start with?",
          answer: "Start with p=none to monitor results, then move toward quarantine or reject when legitimate senders pass alignment.",
        },
        {
          question: "Does DMARC require both SPF and DKIM?",
          answer: "A message can pass DMARC through aligned SPF or aligned DKIM. DKIM is usually more reliable when mail is forwarded.",
        },
      ],
    },
    "dkim-checker": {
      mode: "dkim",
      title: "DKIM Checker",
      description: "Look up a DKIM selector record and inspect the public key published for a domain.",
      breadcrumb: "Email Tools",
      sections: [
        {
          heading: "How DKIM selectors work",
          body: [
            "DKIM records are TXT records under selector._domainkey.example.com. The selector is chosen by the sending service.",
            "Check DKIM when setting up a mail provider, debugging authentication failures, or rotating signing keys.",
          ],
        },
      ],
      faq: [
        {
          question: "Where do I find my DKIM selector?",
          answer: "Your mail provider usually shows it in setup instructions. It may look like default, google, s1, selector1, or a date-based value.",
        },
        {
          question: "Why does a DKIM lookup return no record?",
          answer: "The selector may be wrong, the DNS record may not have propagated, or DKIM may not be enabled for that sender.",
        },
      ],
    },
    "email-header-analyzer": {
      mode: "header",
      title: "Email Header Analyzer",
      description: "Paste raw email headers to inspect routing hops, authentication results, and message metadata.",
      breadcrumb: "Email Tools",
      sections: [
        {
          heading: "What headers can reveal",
          body: [
            "Email headers show sender metadata, routing hops, authentication results, and identifiers that help explain how a message reached an inbox.",
            "They are useful for debugging delivery, investigating spoofing, and checking whether SPF, DKIM, and DMARC passed.",
          ],
        },
      ],
      faq: [
        {
          question: "Is it safe to paste email headers?",
          answer: "Headers can contain IPs, message IDs, domains, and routing details. Remove private information before sharing results.",
        },
        {
          question: "Which header matters most for authentication?",
          answer: "Authentication-Results usually summarizes SPF, DKIM, and DMARC results from the receiving mail system.",
        },
      ],
    },
  },
  "zh-CN": {
    "mx-lookup": {
      mode: "mx",
      title: "MX 查询",
      description: "检查域名用于接收邮件的邮件交换记录。",
      breadcrumb: "邮件工具",
      sections: [
        {
          heading: "什么时候需要检查 MX",
          body: [
            "MX 记录告诉互联网哪些服务器负责接收某个域名的邮件。MX 缺失或配置错误，可能会让来信完全无法送达。",
            "配置自定义域名、迁移邮箱服务商、排查验证码邮件或确认域名能否收信时，都可以先查 MX。",
          ],
        },
      ],
      faq: [
        {
          question: "MX 记录有什么作用？",
          answer: "它把域名指向应该接收来信的邮件服务器。",
        },
        {
          question: "没有 MX 记录还能收邮件吗？",
          answer: "少数情况下会回退到 A 记录，但现代邮箱配置应该明确发布 MX 记录。",
        },
      ],
    },
    "spf-checker": {
      mode: "spf",
      title: "SPF 检查",
      description: "查找控制哪些服务可以代表域名发信的 SPF TXT 记录。",
      breadcrumb: "邮件工具",
      sections: [
        {
          heading: "SPF 保护什么",
          body: [
            "SPF 列出允许代表域名发信的服务器和服务，帮助收件方识别伪造发件人。",
            "事务邮件、订阅邮件、验证码邮件尤其需要干净的 SPF 记录。",
          ],
        },
      ],
      faq: [
        {
          question: "一个域名应该有几条 SPF 记录？",
          answer: "应该只有一条 SPF TXT 记录，多条 SPF 记录可能导致 permanent error。",
        },
        {
          question: "SPF 为什么会失败？",
          answer: "常见原因包括漏掉 include、发信服务变化，或者邮件被转发。",
        },
      ],
    },
    "dmarc-checker": {
      mode: "dmarc",
      title: "DMARC 检查",
      description: "检查域名的 DMARC 策略、认证对齐和报告配置。",
      breadcrumb: "邮件工具",
      sections: [
        {
          heading: "为什么 DMARC 有用",
          body: [
            "DMARC 告诉收件方如何处理 SPF 或 DKIM 失败的邮件，也可以发送认证结果报告。",
            "建议先用监控模式，确认合法发信源都对齐后再逐步收紧策略。",
          ],
        },
      ],
      faq: [
        {
          question: "DMARC 应该从什么策略开始？",
          answer: "通常从 p=none 监控开始，确认合法邮件都通过对齐后，再考虑 quarantine 或 reject。",
        },
        {
          question: "DMARC 必须同时通过 SPF 和 DKIM 吗？",
          answer: "不必。只要对齐的 SPF 或对齐的 DKIM 通过，就可以通过 DMARC。转发场景下 DKIM 通常更可靠。",
        },
      ],
    },
    "dkim-checker": {
      mode: "dkim",
      title: "DKIM 检查",
      description: "查询 DKIM selector 记录并检查域名发布的公钥。",
      breadcrumb: "邮件工具",
      sections: [
        {
          heading: "DKIM selector 如何工作",
          body: [
            "DKIM 记录是 selector._domainkey.example.com 下的 TXT 记录，selector 由发信服务商决定。",
            "配置邮箱服务、排查认证失败或轮换签名密钥时，都应该检查 DKIM。",
          ],
        },
      ],
      faq: [
        {
          question: "DKIM selector 在哪里找？",
          answer: "邮件服务商通常会在域名配置说明里给出，常见值包括 default、google、s1、selector1 或日期格式。",
        },
        {
          question: "为什么 DKIM 查不到记录？",
          answer: "可能是 selector 不对、DNS 尚未生效，或该发信服务还没有启用 DKIM。",
        },
      ],
    },
    "email-header-analyzer": {
      mode: "header",
      title: "邮件头分析器",
      description: "粘贴原始邮件头，检查投递路径、认证结果和邮件元数据。",
      breadcrumb: "邮件工具",
      sections: [
        {
          heading: "邮件头能看出什么",
          body: [
            "邮件头包含发件元数据、路由跳点、认证结果和消息标识，可以解释邮件如何到达收件箱。",
            "它适合排查投递问题、检查伪造邮件，以及确认 SPF、DKIM、DMARC 是否通过。",
          ],
        },
      ],
      faq: [
        {
          question: "粘贴邮件头安全吗？",
          answer: "邮件头可能包含 IP、Message-ID、域名和路由信息。分享结果前最好移除隐私内容。",
        },
        {
          question: "认证结果主要看哪一行？",
          answer: "Authentication-Results 通常汇总收件系统判断的 SPF、DKIM 和 DMARC 结果。",
        },
      ],
    },
  },
  "zh-TW": {
    "mx-lookup": {
      mode: "mx",
      title: "MX 查詢",
      description: "檢查網域用於接收郵件的郵件交換記錄。",
      breadcrumb: "郵件工具",
      sections: [
        {
          heading: "什麼時候需要檢查 MX",
          body: [
            "MX 記錄告訴網際網路哪些伺服器負責接收某個網域的郵件。MX 缺失或設定錯誤，可能讓來信完全無法送達。",
            "設定自訂網域、搬移郵件服務商、排查驗證信或確認網域能否收信時，都可以先查 MX。",
          ],
        },
      ],
      faq: [
        {
          question: "MX 記錄有什麼作用？",
          answer: "它把網域指向應該接收來信的郵件伺服器。",
        },
        {
          question: "沒有 MX 記錄還能收信嗎？",
          answer: "少數情況會回退到 A 記錄，但現代郵件設定應該明確發布 MX 記錄。",
        },
      ],
    },
    "spf-checker": {
      mode: "spf",
      title: "SPF 檢查",
      description: "查找控制哪些服務可以代表網域寄信的 SPF TXT 記錄。",
      breadcrumb: "郵件工具",
      sections: [
        {
          heading: "SPF 保護什麼",
          body: [
            "SPF 列出允許代表網域寄信的伺服器和服務，幫助收件方識別偽造寄件人。",
            "交易郵件、訂閱郵件、驗證碼郵件尤其需要乾淨的 SPF 記錄。",
          ],
        },
      ],
      faq: [
        {
          question: "一個網域應該有幾筆 SPF 記錄？",
          answer: "應該只有一筆 SPF TXT 記錄，多筆 SPF 記錄可能導致 permanent error。",
        },
        {
          question: "SPF 為什麼會失敗？",
          answer: "常見原因包括漏掉 include、寄信服務變更，或郵件被轉寄。",
        },
      ],
    },
    "dmarc-checker": {
      mode: "dmarc",
      title: "DMARC 檢查",
      description: "檢查網域的 DMARC 政策、驗證對齊與報告設定。",
      breadcrumb: "郵件工具",
      sections: [
        {
          heading: "為什麼 DMARC 有用",
          body: [
            "DMARC 告訴收件方如何處理 SPF 或 DKIM 失敗的郵件，也可以寄送驗證結果報告。",
            "建議先用監控模式，確認合法寄信來源都對齊後再逐步收緊政策。",
          ],
        },
      ],
      faq: [
        {
          question: "DMARC 應該從什麼政策開始？",
          answer: "通常從 p=none 監控開始，確認合法郵件都通過對齊後，再考慮 quarantine 或 reject。",
        },
        {
          question: "DMARC 必須同時通過 SPF 和 DKIM 嗎？",
          answer: "不必。只要對齊的 SPF 或 DKIM 通過，就可以通過 DMARC。轉寄場景下 DKIM 通常更可靠。",
        },
      ],
    },
    "dkim-checker": {
      mode: "dkim",
      title: "DKIM 檢查",
      description: "查詢 DKIM selector 記錄並檢查網域發布的公鑰。",
      breadcrumb: "郵件工具",
      sections: [
        {
          heading: "DKIM selector 如何運作",
          body: [
            "DKIM 記錄是 selector._domainkey.example.com 下的 TXT 記錄，selector 由寄信服務商決定。",
            "設定郵件服務、排查驗證失敗或輪換簽名金鑰時，都應該檢查 DKIM。",
          ],
        },
      ],
      faq: [
        {
          question: "DKIM selector 在哪裡找？",
          answer: "郵件服務商通常會在網域設定說明裡給出，常見值包括 default、google、s1、selector1 或日期格式。",
        },
        {
          question: "為什麼 DKIM 查不到記錄？",
          answer: "可能是 selector 不對、DNS 尚未生效，或該寄信服務還沒有啟用 DKIM。",
        },
      ],
    },
    "email-header-analyzer": {
      mode: "header",
      title: "郵件標頭分析器",
      description: "貼上原始郵件標頭，檢查投遞路徑、驗證結果和郵件中繼資料。",
      breadcrumb: "郵件工具",
      sections: [
        {
          heading: "郵件標頭能看出什麼",
          body: [
            "郵件標頭包含寄件中繼資料、路由跳點、驗證結果和訊息識別，可以解釋郵件如何到達收件匣。",
            "它適合排查投遞問題、檢查偽造郵件，以及確認 SPF、DKIM、DMARC 是否通過。",
          ],
        },
      ],
      faq: [
        {
          question: "貼上郵件標頭安全嗎？",
          answer: "郵件標頭可能包含 IP、Message-ID、網域和路由資訊。分享結果前最好移除隱私內容。",
        },
        {
          question: "驗證結果主要看哪一行？",
          answer: "Authentication-Results 通常彙總收件系統判斷的 SPF、DKIM 和 DMARC 結果。",
        },
      ],
    },
  },
  ja: {
    "mx-lookup": {
      mode: "mx",
      title: "MX ルックアップ",
      description: "ドメインがメール受信に使うメール交換レコードを確認します。",
      breadcrumb: "メールツール",
      sections: [
        {
          heading: "MX レコードが重要な場面",
          body: [
            "MX レコードは、そのドメイン宛のメールをどのサーバーが受け取るかを示します。壊れていたり不足していたりすると、受信メールが届かないことがあります。",
            "独自ドメイン設定、メールプロバイダー移行、確認メールの調査、受信可否の確認に使えます。",
          ],
        },
      ],
      faq: [
        {
          question: "MX レコードは何をしますか？",
          answer: "ドメインを、受信メールを処理するメールサーバーへ向けます。",
        },
        {
          question: "MX なしでメールを受信できますか？",
          answer: "A レコードへフォールバックする場合もありますが、現代的な構成では明確な MX レコードを公開すべきです。",
        },
      ],
    },
    "spf-checker": {
      mode: "spf",
      title: "SPF チェッカー",
      description: "ドメインの送信許可を制御する SPF TXT レコードを探します。",
      breadcrumb: "メールツール",
      sections: [
        {
          heading: "SPF が守るもの",
          body: [
            "SPF は、そのドメインとして送信できるサーバーやサービスを列挙します。受信側がなりすましを検出する助けになります。",
            "トランザクションメール、ニュースレター、確認メールを送るサービスでは特に重要です。",
          ],
        },
      ],
      faq: [
        {
          question: "SPF レコードはいくつ必要ですか？",
          answer: "ドメインには 1 つの SPF TXT レコードだけを公開します。複数あると permanent error になることがあります。",
        },
        {
          question: "SPF が失敗する理由は？",
          answer: "include の不足、送信サービスの変更、メール転送などがよくある原因です。",
        },
      ],
    },
    "dmarc-checker": {
      mode: "dmarc",
      title: "DMARC チェッカー",
      description: "ドメインの DMARC ポリシー、認証整合、レポート設定を確認します。",
      breadcrumb: "メールツール",
      sections: [
        {
          heading: "DMARC が役立つ理由",
          body: [
            "DMARC は SPF または DKIM が失敗したメールをどう扱うかを受信側に伝えます。認証結果のレポートも受け取れます。",
            "まず監視から始め、正当な送信元が整合していることを確認してからポリシーを強めます。",
          ],
        },
      ],
      faq: [
        {
          question: "最初の DMARC ポリシーは？",
          answer: "まず p=none で監視し、正当なメールが整合して通過することを確認してから quarantine や reject に進みます。",
        },
        {
          question: "DMARC は SPF と DKIM の両方が必要ですか？",
          answer: "いいえ。整合した SPF または DKIM のどちらかが通れば DMARC は通過できます。転送では DKIM の方が安定しやすいです。",
        },
      ],
    },
    "dkim-checker": {
      mode: "dkim",
      title: "DKIM チェッカー",
      description: "DKIM セレクターのレコードを検索し、公開鍵を確認します。",
      breadcrumb: "メールツール",
      sections: [
        {
          heading: "DKIM セレクターの仕組み",
          body: [
            "DKIM レコードは selector._domainkey.example.com 配下の TXT レコードです。セレクターは送信サービスが決めます。",
            "メールプロバイダー設定、認証失敗の調査、署名鍵のローテーション時に確認します。",
          ],
        },
      ],
      faq: [
        {
          question: "DKIM セレクターはどこで見つかりますか？",
          answer: "メールプロバイダーの設定手順に表示されます。default、google、s1、selector1、日付形式などがあります。",
        },
        {
          question: "DKIM レコードが見つからない理由は？",
          answer: "セレクターが違う、DNS がまだ反映されていない、またはその送信元で DKIM が有効化されていない可能性があります。",
        },
      ],
    },
    "email-header-analyzer": {
      mode: "header",
      title: "メールヘッダー分析",
      description: "生のメールヘッダーを貼り付けて、経路、認証結果、メタデータを確認します。",
      breadcrumb: "メールツール",
      sections: [
        {
          heading: "ヘッダーから分かること",
          body: [
            "メールヘッダーには送信者メタデータ、経路、認証結果、識別子が含まれ、メールがどう届いたかを説明します。",
            "配信調査、なりすまし調査、SPF・DKIM・DMARC の通過確認に役立ちます。",
          ],
        },
      ],
      faq: [
        {
          question: "メールヘッダーを貼り付けても安全ですか？",
          answer: "ヘッダーには IP、Message-ID、ドメイン、経路情報が含まれます。共有前に個人情報を削除してください。",
        },
        {
          question: "認証結果ではどのヘッダーを見るべきですか？",
          answer: "Authentication-Results は通常、受信システムが判定した SPF、DKIM、DMARC の結果をまとめています。",
        },
      ],
    },
  },
  ko: {
    "mx-lookup": {
      mode: "mx",
      title: "MX 조회",
      description: "도메인의 메일 수신에 쓰이는 메일 교환 레코드를 확인합니다.",
      breadcrumb: "메일 도구",
      sections: [
        {
          heading: "MX 레코드가 중요한 순간",
          body: [
            "MX 레코드는 도메인의 메일을 어떤 서버가 받을지 알려줍니다. 누락되거나 잘못되면 수신 메일이 완전히 멈출 수 있습니다.",
            "사용자 지정 도메인 설정, 메일 제공업체 이전, 인증 메일 문제 해결, 수신 가능 여부 확인에 유용합니다.",
          ],
        },
      ],
      faq: [
        {
          question: "MX 레코드는 무엇을 하나요?",
          answer: "도메인을 수신 메일을 처리할 메일 서버로 연결합니다.",
        },
        {
          question: "MX 없이 메일을 받을 수 있나요?",
          answer: "일부는 A 레코드로 대체될 수 있지만, 최신 메일 구성은 명확한 MX 레코드를 게시해야 합니다.",
        },
      ],
    },
    "spf-checker": {
      mode: "spf",
      title: "SPF 검사",
      description: "도메인을 대신해 메일을 보낼 수 있는 발신자를 제어하는 SPF TXT 레코드를 찾습니다.",
      breadcrumb: "메일 도구",
      sections: [
        {
          heading: "SPF가 보호하는 것",
          body: [
            "SPF는 도메인 이름으로 메일을 보낼 수 있는 서버와 서비스를 나열합니다. 수신 시스템이 위조 발신자를 감지하는 데 도움을 줍니다.",
            "트랜잭션 메일, 뉴스레터, 계정 인증 메일을 보내는 서비스에 특히 중요합니다.",
          ],
        },
      ],
      faq: [
        {
          question: "도메인에는 SPF 레코드가 몇 개 있어야 하나요?",
          answer: "SPF TXT 레코드는 하나만 있어야 합니다. 여러 개면 permanent error가 발생할 수 있습니다.",
        },
        {
          question: "SPF가 실패하는 이유는 무엇인가요?",
          answer: "include 누락, 발신 서비스 변경, 메일 전달이 흔한 원인입니다.",
        },
      ],
    },
    "dmarc-checker": {
      mode: "dmarc",
      title: "DMARC 검사",
      description: "도메인의 DMARC 정책, 인증 정렬, 보고 설정을 확인합니다.",
      breadcrumb: "메일 도구",
      sections: [
        {
          heading: "DMARC가 유용한 이유",
          body: [
            "DMARC는 SPF 또는 DKIM이 실패한 메시지를 어떻게 처리할지 수신자에게 알려줍니다. 인증 결과 보고서도 받을 수 있습니다.",
            "먼저 모니터링으로 시작하고, 정상 발신자가 정렬되는 것을 확인한 뒤 정책을 강화하세요.",
          ],
        },
      ],
      faq: [
        {
          question: "처음 DMARC 정책은 무엇이 좋나요?",
          answer: "p=none으로 모니터링을 시작하고, 정상 메일이 정렬되어 통과하는 것을 확인한 뒤 quarantine 또는 reject로 이동하세요.",
        },
        {
          question: "DMARC는 SPF와 DKIM이 모두 필요하나요?",
          answer: "아닙니다. 정렬된 SPF 또는 정렬된 DKIM 중 하나만 통과해도 DMARC를 통과할 수 있습니다. 전달된 메일에서는 DKIM이 더 안정적입니다.",
        },
      ],
    },
    "dkim-checker": {
      mode: "dkim",
      title: "DKIM 검사",
      description: "DKIM selector 레코드를 조회하고 도메인이 게시한 공개키를 확인합니다.",
      breadcrumb: "메일 도구",
      sections: [
        {
          heading: "DKIM selector 작동 방식",
          body: [
            "DKIM 레코드는 selector._domainkey.example.com 아래의 TXT 레코드입니다. selector는 발신 서비스가 정합니다.",
            "메일 제공업체 설정, 인증 실패 조사, 서명 키 교체 시 DKIM을 확인하세요.",
          ],
        },
      ],
      faq: [
        {
          question: "DKIM selector는 어디서 찾나요?",
          answer: "메일 제공업체의 설정 안내에 표시됩니다. default, google, s1, selector1 또는 날짜 형식일 수 있습니다.",
        },
        {
          question: "DKIM 조회에서 레코드가 없는 이유는?",
          answer: "selector가 틀렸거나 DNS가 아직 전파되지 않았거나 해당 발신자에서 DKIM이 활성화되지 않았을 수 있습니다.",
        },
      ],
    },
    "email-header-analyzer": {
      mode: "header",
      title: "메일 헤더 분석기",
      description: "원본 메일 헤더를 붙여넣어 라우팅 경로, 인증 결과, 메시지 메타데이터를 확인합니다.",
      breadcrumb: "메일 도구",
      sections: [
        {
          heading: "헤더로 알 수 있는 것",
          body: [
            "메일 헤더는 발신자 메타데이터, 라우팅 홉, 인증 결과, 식별자를 담고 있어 메시지가 어떻게 도착했는지 설명합니다.",
            "전달 문제 해결, 위조 조사, SPF·DKIM·DMARC 통과 여부 확인에 유용합니다.",
          ],
        },
      ],
      faq: [
        {
          question: "메일 헤더를 붙여넣어도 안전한가요?",
          answer: "헤더에는 IP, Message-ID, 도메인, 경로 정보가 포함될 수 있습니다. 공유 전 개인 정보를 제거하세요.",
        },
        {
          question: "인증 결과는 어떤 헤더를 봐야 하나요?",
          answer: "Authentication-Results는 보통 수신 시스템이 판단한 SPF, DKIM, DMARC 결과를 요약합니다.",
        },
      ],
    },
  },
}

const ADDITIONAL_TOOL_CONTENT: Record<Locale, Record<"spf-generator" | "dmarc-generator" | "blacklist-checker", EmailToolContentEntry>> = {
  en: {
    "spf-generator": {
      mode: "spf-generator",
      title: "SPF Generator",
      description: "Build a clean SPF TXT record for domains that send email through apps and providers.",
      breadcrumb: "Email Tools",
      sections: [
        {
          heading: "Create one publishable SPF record",
          body: [
            "SPF records should stay readable and singular: one TXT record beginning with v=spf1, followed by the services that are allowed to send.",
            "Use this generator when adding a newsletter platform, transactional mail provider, support desk, or self-hosted mail server.",
          ],
        },
      ],
      faq: [
        {
          question: "Should I publish more than one SPF record?",
          answer: "No. Merge all senders into one SPF record to avoid permanent errors at receivers.",
        },
        {
          question: "Should I choose ~all or -all?",
          answer: "Use ~all while testing. Move to -all only after every legitimate sender is included.",
        },
      ],
    },
    "dmarc-generator": {
      mode: "dmarc-generator",
      title: "DMARC Generator",
      description: "Create a DMARC TXT record for monitoring, quarantine, or reject policies.",
      breadcrumb: "Email Tools",
      sections: [
        {
          heading: "Start with reporting, then enforce",
          body: [
            "A DMARC record tells receivers what to do when messages fail authentication alignment and where to send aggregate reports.",
            "Most domains should start with p=none, review reports, then move to quarantine or reject after legitimate senders pass SPF or DKIM alignment.",
          ],
        },
      ],
      faq: [
        {
          question: "Where do I publish the DMARC record?",
          answer: "Publish it as a TXT record at _dmarc.yourdomain.com.",
        },
        {
          question: "Do I need a report email?",
          answer: "A rua mailbox is strongly recommended because reports reveal unknown senders and authentication failures.",
        },
      ],
    },
    "blacklist-checker": {
      mode: "blacklist",
      title: "Email Blacklist Checker",
      description: "Check whether an IPv4 address appears on common DNS blocklists used by mail receivers.",
      breadcrumb: "Email Tools",
      sections: [
        {
          heading: "Check sender reputation signals",
          body: [
            "DNS blocklists are one signal mail receivers can use when deciding whether to accept or filter a message.",
            "A listing does not always mean every inbox will block you, but it is a useful starting point when mail suddenly goes to spam.",
          ],
        },
      ],
      faq: [
        {
          question: "Does this check every blacklist?",
          answer: "No. It checks a focused set of common DNSBL zones and should be combined with provider-specific postmaster tools.",
        },
        {
          question: "Can I check a domain name?",
          answer: "This checker is for IPv4 sender addresses. Look up the sending IP from your mail headers first.",
        },
      ],
    },
  },
  "zh-CN": {
    "spf-generator": {
      mode: "spf-generator",
      title: "SPF 生成器",
      description: "为通过应用和服务商发信的域名生成干净的 SPF TXT 记录。",
      breadcrumb: "邮件工具",
      sections: [
        {
          heading: "生成一条可发布的 SPF 记录",
          body: [
            "SPF 应该保持清晰且只有一条：以 v=spf1 开头，再列出允许发信的服务。",
            "添加群发平台、事务邮件服务、客服系统或自建邮件服务器时，可以用它快速生成初稿。",
          ],
        },
      ],
      faq: [
        {
          question: "可以发布多条 SPF 记录吗？",
          answer: "不建议。应把所有发信源合并到一条 SPF 里，否则收件方可能返回 permanent error。",
        },
        {
          question: "应该选 ~all 还是 -all？",
          answer: "测试期用 ~all。确认所有合法发信源都包含后，再切到 -all。",
        },
      ],
    },
    "dmarc-generator": {
      mode: "dmarc-generator",
      title: "DMARC 生成器",
      description: "生成用于监控、隔离或拒收策略的 DMARC TXT 记录。",
      breadcrumb: "邮件工具",
      sections: [
        {
          heading: "先收报告，再逐步强制",
          body: [
            "DMARC 记录会告诉收件方认证对齐失败时如何处理邮件，以及把汇总报告发到哪里。",
            "多数域名应先从 p=none 开始，查看报告，确认合法发信源通过 SPF 或 DKIM 对齐后再切到 quarantine 或 reject。",
          ],
        },
      ],
      faq: [
        {
          question: "DMARC 记录发布在哪里？",
          answer: "作为 TXT 记录发布在 _dmarc.yourdomain.com。",
        },
        {
          question: "一定要填写报告邮箱吗？",
          answer: "强烈建议填写 rua 邮箱，因为报告能发现未知发信源和认证失败。",
        },
      ],
    },
    "blacklist-checker": {
      mode: "blacklist",
      title: "邮件黑名单检查",
      description: "检查 IPv4 发信地址是否出现在常见 DNS 黑名单中。",
      breadcrumb: "邮件工具",
      sections: [
        {
          heading: "检查发信信誉信号",
          body: [
            "DNS 黑名单是收件方判断邮件是否接收或过滤时可能参考的信号之一。",
            "被列入并不代表所有邮箱都会拦截，但当邮件突然进垃圾箱时，它是很值得先查的一项。",
          ],
        },
      ],
      faq: [
        {
          question: "这个工具会检查所有黑名单吗？",
          answer: "不会。它检查一组常见 DNSBL 区域，仍建议结合邮件服务商的 postmaster 工具一起看。",
        },
        {
          question: "可以检查域名吗？",
          answer: "这个检查器面向 IPv4 发信地址。请先从邮件头里找到实际发信 IP。",
        },
      ],
    },
  },
  "zh-TW": {
    "spf-generator": {
      mode: "spf-generator",
      title: "SPF 產生器",
      description: "為透過應用程式和服務商寄信的網域產生乾淨的 SPF TXT 記錄。",
      breadcrumb: "郵件工具",
      sections: [
        {
          heading: "產生一筆可發布的 SPF 記錄",
          body: [
            "SPF 應保持清晰且只有一筆：以 v=spf1 開頭，再列出允許寄信的服務。",
            "新增群發平台、交易郵件服務、客服系統或自架郵件伺服器時，可以用它快速產生初稿。",
          ],
        },
      ],
      faq: [
        {
          question: "可以發布多筆 SPF 記錄嗎？",
          answer: "不建議。應把所有寄信來源合併到一筆 SPF，否則收件方可能返回 permanent error。",
        },
        {
          question: "應該選 ~all 還是 -all？",
          answer: "測試期用 ~all。確認所有合法寄信來源都包含後，再切到 -all。",
        },
      ],
    },
    "dmarc-generator": {
      mode: "dmarc-generator",
      title: "DMARC 產生器",
      description: "產生用於監控、隔離或拒收政策的 DMARC TXT 記錄。",
      breadcrumb: "郵件工具",
      sections: [
        {
          heading: "先收報告，再逐步強制",
          body: [
            "DMARC 記錄會告訴收件方驗證對齊失敗時如何處理郵件，以及把彙總報告寄到哪裡。",
            "多數網域應先從 p=none 開始，查看報告，確認合法寄信來源通過 SPF 或 DKIM 對齊後再切到 quarantine 或 reject。",
          ],
        },
      ],
      faq: [
        {
          question: "DMARC 記錄發布在哪裡？",
          answer: "作為 TXT 記錄發布在 _dmarc.yourdomain.com。",
        },
        {
          question: "一定要填報告信箱嗎？",
          answer: "強烈建議填 rua 信箱，因為報告能發現未知寄信來源和驗證失敗。",
        },
      ],
    },
    "blacklist-checker": {
      mode: "blacklist",
      title: "郵件黑名單檢查",
      description: "檢查 IPv4 寄信地址是否出現在常見 DNS 黑名單中。",
      breadcrumb: "郵件工具",
      sections: [
        {
          heading: "檢查寄信信譽信號",
          body: [
            "DNS 黑名單是收件方判斷郵件是否接收或過濾時可能參考的信號之一。",
            "被列入不代表所有信箱都會攔截，但郵件突然進垃圾信時，它很值得先查。",
          ],
        },
      ],
      faq: [
        {
          question: "這個工具會檢查所有黑名單嗎？",
          answer: "不會。它檢查一組常見 DNSBL 區域，仍建議搭配郵件服務商的 postmaster 工具。",
        },
        {
          question: "可以檢查網域嗎？",
          answer: "這個檢查器面向 IPv4 寄信地址。請先從郵件標頭找到實際寄信 IP。",
        },
      ],
    },
  },
  ja: {
    "spf-generator": {
      mode: "spf-generator",
      title: "SPF ジェネレーター",
      description: "アプリやプロバイダー経由で送信するドメイン向けに、整理された SPF TXT レコードを作成します。",
      breadcrumb: "メールツール",
      sections: [
        {
          heading: "公開しやすい SPF レコードを作る",
          body: [
            "SPF は v=spf1 で始まる 1 つの TXT レコードにまとめ、送信を許可するサービスを列挙します。",
            "ニュースレター、トランザクションメール、サポートデスク、自前のメールサーバーを追加するときに使えます。",
          ],
        },
      ],
      faq: [
        {
          question: "SPF レコードを複数公開してもよいですか？",
          answer: "いいえ。送信元は 1 つの SPF レコードに統合しないと permanent error になることがあります。",
        },
        {
          question: "~all と -all のどちらを選ぶべきですか？",
          answer: "テスト中は ~all を使い、正当な送信元をすべて含めてから -all に進みます。",
        },
      ],
    },
    "dmarc-generator": {
      mode: "dmarc-generator",
      title: "DMARC ジェネレーター",
      description: "監視、隔離、拒否ポリシー向けの DMARC TXT レコードを作成します。",
      breadcrumb: "メールツール",
      sections: [
        {
          heading: "レポートから始めて段階的に強化",
          body: [
            "DMARC レコードは、認証整合に失敗したメールの扱いと集計レポートの送信先を受信側に伝えます。",
            "多くのドメインでは p=none で監視し、正当な送信元が SPF または DKIM で整合することを確認してから quarantine や reject に進みます。",
          ],
        },
      ],
      faq: [
        {
          question: "DMARC レコードはどこに公開しますか？",
          answer: "_dmarc.yourdomain.com に TXT レコードとして公開します。",
        },
        {
          question: "レポート用メールアドレスは必要ですか？",
          answer: "rua の設定を強く推奨します。未知の送信元や認証失敗を見つけられます。",
        },
      ],
    },
    "blacklist-checker": {
      mode: "blacklist",
      title: "メールブラックリストチェック",
      description: "IPv4 送信元アドレスが一般的な DNS ブラックリストに掲載されているか確認します。",
      breadcrumb: "メールツール",
      sections: [
        {
          heading: "送信元レピュテーションの信号を確認",
          body: [
            "DNS ブラックリストは、受信側がメールを受け入れるかフィルタするかを判断する材料の一つです。",
            "掲載されてもすべての受信箱で拒否されるわけではありませんが、急に迷惑メールに入る場合の重要な確認点です。",
          ],
        },
      ],
      faq: [
        {
          question: "すべてのブラックリストを確認しますか？",
          answer: "いいえ。よく使われる DNSBL を絞って確認します。プロバイダーの postmaster ツールも併用してください。",
        },
        {
          question: "ドメイン名を確認できますか？",
          answer: "このツールは IPv4 送信元アドレス向けです。まずメールヘッダーから送信 IP を確認してください。",
        },
      ],
    },
  },
  ko: {
    "spf-generator": {
      mode: "spf-generator",
      title: "SPF 생성기",
      description: "앱과 제공업체를 통해 메일을 보내는 도메인을 위한 깔끔한 SPF TXT 레코드를 만듭니다.",
      breadcrumb: "메일 도구",
      sections: [
        {
          heading: "게시 가능한 SPF 레코드 만들기",
          body: [
            "SPF는 v=spf1로 시작하는 하나의 TXT 레코드에 허용된 발신 서비스를 정리해야 합니다.",
            "뉴스레터, 트랜잭션 메일, 고객지원 도구, 자체 메일 서버를 추가할 때 초안을 빠르게 만들 수 있습니다.",
          ],
        },
      ],
      faq: [
        {
          question: "SPF 레코드를 여러 개 게시해도 되나요?",
          answer: "아니요. 모든 발신자를 하나의 SPF 레코드로 합쳐야 permanent error를 피할 수 있습니다.",
        },
        {
          question: "~all과 -all 중 무엇을 써야 하나요?",
          answer: "테스트 중에는 ~all을 쓰고, 모든 정상 발신자가 포함된 뒤 -all로 이동하세요.",
        },
      ],
    },
    "dmarc-generator": {
      mode: "dmarc-generator",
      title: "DMARC 생성기",
      description: "모니터링, 격리, 거부 정책에 사용할 DMARC TXT 레코드를 만듭니다.",
      breadcrumb: "메일 도구",
      sections: [
        {
          heading: "보고서로 시작해 점진적으로 강화",
          body: [
            "DMARC 레코드는 인증 정렬에 실패한 메일을 어떻게 처리할지와 집계 보고서를 어디로 보낼지 수신자에게 알려줍니다.",
            "대부분의 도메인은 p=none으로 시작해 보고서를 확인하고, 정상 발신자가 SPF 또는 DKIM 정렬을 통과한 뒤 quarantine이나 reject로 이동합니다.",
          ],
        },
      ],
      faq: [
        {
          question: "DMARC 레코드는 어디에 게시하나요?",
          answer: "_dmarc.yourdomain.com에 TXT 레코드로 게시합니다.",
        },
        {
          question: "보고서 이메일이 필요한가요?",
          answer: "rua 메일함을 권장합니다. 알 수 없는 발신자와 인증 실패를 발견하는 데 도움이 됩니다.",
        },
      ],
    },
    "blacklist-checker": {
      mode: "blacklist",
      title: "메일 블랙리스트 검사",
      description: "IPv4 발신 주소가 일반적인 DNS 차단 목록에 있는지 확인합니다.",
      breadcrumb: "메일 도구",
      sections: [
        {
          heading: "발신 평판 신호 확인",
          body: [
            "DNS 차단 목록은 수신자가 메일을 허용하거나 필터링할 때 참고할 수 있는 신호 중 하나입니다.",
            "등재가 모든 받은편지함 차단을 의미하지는 않지만, 메일이 갑자기 스팸함으로 갈 때 먼저 확인할 가치가 있습니다.",
          ],
        },
      ],
      faq: [
        {
          question: "모든 블랙리스트를 확인하나요?",
          answer: "아니요. 일반적인 DNSBL 일부를 확인하며, 제공업체별 postmaster 도구와 함께 보는 것이 좋습니다.",
        },
        {
          question: "도메인도 확인할 수 있나요?",
          answer: "이 검사는 IPv4 발신 주소용입니다. 먼저 메일 헤더에서 실제 발신 IP를 확인하세요.",
        },
      ],
    },
  },
}

const GUIDE_CONTENT: Record<Locale, Record<EmailGuidePageSlug, EmailGuideContent>> = {
  en: {
    "how-to-read-email-headers": {
      slug: "how-to-read-email-headers",
      title: "How to Read Email Headers",
      description: "Learn which email headers explain sender identity, delivery path, and authentication results.",
      sections: [
        {
          heading: "Start with Authentication-Results",
          body: [
            "Authentication-Results is the quickest summary of SPF, DKIM, and DMARC. If one of them is missing or failing, delivery and trust can suffer.",
            "Look for pass, fail, neutral, or none values, then compare the domains shown next to each result.",
          ],
        },
        {
          heading: "Read Received from bottom to top",
          body: [
            "Each Received line is added by a mail server. The oldest hop is usually near the bottom and the newest hop is near the top.",
            "Unexpected hops, private relays, or mismatched hostnames can explain delays or suspicious routing.",
          ],
        },
      ],
      relatedTools: ["email-header-analyzer", "spf-checker", "dkim-checker"],
      faq: [
        {
          question: "Can headers prove who sent an email?",
          answer: "They provide useful evidence, but spoofed or incomplete headers still need careful interpretation.",
        },
        {
          question: "Which header is best for spam troubleshooting?",
          answer: "Start with Authentication-Results and Received, then compare SPF, DKIM, DMARC, From, and return-path domains.",
        },
      ],
    },
    "how-to-fix-spf-fail": {
      slug: "how-to-fix-spf-fail",
      title: "How to Fix SPF Fail",
      description: "A practical checklist for fixing SPF failures without breaking legitimate email senders.",
      sections: [
        {
          heading: "Find the real sending service",
          body: [
            "SPF fails when the server that delivered the message is not authorized by the domain's SPF record.",
            "Check your mail provider, newsletter tool, CRM, support desk, and transactional email provider before editing DNS.",
          ],
        },
        {
          heading: "Keep one clean SPF record",
          body: [
            "Publish one TXT record that starts with v=spf1. Merge includes instead of creating multiple SPF records.",
            "After changes, test again and watch for DNS lookup limits if the record has many include mechanisms.",
          ],
        },
      ],
      relatedTools: ["spf-checker", "email-header-analyzer"],
      faq: [
        {
          question: "Does forwarding break SPF?",
          answer: "Forwarding often breaks SPF because the forwarding server is not listed in the original sender's SPF record.",
        },
        {
          question: "Should I use -all or ~all?",
          answer: "Use ~all while testing. Move to -all only after you know every legitimate sender is included.",
        },
      ],
    },
    "what-is-dkim-selector": {
      slug: "what-is-dkim-selector",
      title: "What Is a DKIM Selector?",
      description: "Understand DKIM selectors and how they point receivers to the right public signing key.",
      sections: [
        {
          heading: "Selector plus domain equals a DNS name",
          body: [
            "A DKIM selector is a label chosen by the sender. Receivers combine it with _domainkey and the signing domain.",
            "For example, selector google on example.com becomes google._domainkey.example.com.",
          ],
        },
        {
          heading: "Selectors make key rotation possible",
          body: [
            "Providers can publish a new selector before retiring an old one. That keeps signed mail valid during rotation.",
            "If a selector lookup fails, check the provider instructions and make sure the TXT record is published exactly.",
          ],
        },
      ],
      relatedTools: ["dkim-checker", "email-header-analyzer"],
      faq: [
        {
          question: "Can one domain have multiple DKIM selectors?",
          answer: "Yes. Different services often use different selectors for the same domain.",
        },
        {
          question: "Is the selector secret?",
          answer: "No. The selector is visible in email headers and points to a public DNS record.",
        },
      ],
    },
    "dmarc-policy-guide": {
      slug: "dmarc-policy-guide",
      title: "DMARC Policy Guide",
      description: "Learn how p=none, quarantine, and reject affect domain protection and email delivery.",
      sections: [
        {
          heading: "Use p=none to observe",
          body: [
            "p=none asks receivers to send reports without changing message handling. It is the safest way to discover legitimate senders.",
            "During this phase, fix SPF and DKIM alignment before enforcing stricter policy.",
          ],
        },
        {
          heading: "Move enforcement gradually",
          body: [
            "quarantine sends failing mail toward spam. reject asks receivers to refuse failing mail.",
            "Use pct to phase in enforcement if your domain has many senders or legacy systems.",
          ],
        },
      ],
      relatedTools: ["dmarc-checker", "spf-checker", "dkim-checker"],
      faq: [
        {
          question: "Does p=reject stop all spoofing?",
          answer: "It helps receivers reject unauthenticated mail that claims your domain, but only when receivers honor DMARC.",
        },
        {
          question: "Do I need reports?",
          answer: "Reports help discover unknown senders and authentication failures before you enforce policy.",
        },
      ],
    },
    "why-email-goes-to-spam": {
      slug: "why-email-goes-to-spam",
      title: "Why Email Goes to Spam",
      description: "Common technical reasons legitimate email lands in spam and how to investigate them.",
      sections: [
        {
          heading: "Authentication is the first checkpoint",
          body: [
            "Missing or failing SPF, DKIM, and DMARC makes a message look less trustworthy.",
            "Check DNS records and headers together because a record can be correct while a specific sender still fails alignment.",
          ],
        },
        {
          heading: "Reputation and content still matter",
          body: [
            "New domains, shared IPs, spammy copy, broken unsubscribe links, and user complaints can all hurt placement.",
            "Fix the technical foundation first, then measure engagement and complaint signals.",
          ],
        },
      ],
      relatedTools: ["email-header-analyzer", "spf-checker", "dmarc-checker"],
      faq: [
        {
          question: "Can DNS records alone guarantee inbox placement?",
          answer: "No. They are necessary trust signals, but reputation, content, engagement, and recipient policy also matter.",
        },
        {
          question: "What should I check first?",
          answer: "Start with headers from an actual spam-folder message, then verify SPF, DKIM, DMARC, and sender reputation.",
        },
      ],
    },
  },
  "zh-CN": {
    "how-to-read-email-headers": {
      slug: "how-to-read-email-headers",
      title: "如何阅读邮件头",
      description: "了解哪些邮件头可以解释发件身份、投递路径和认证结果。",
      sections: [
        {
          heading: "先看 Authentication-Results",
          body: [
            "Authentication-Results 是 SPF、DKIM、DMARC 最快的汇总。如果其中一项缺失或失败，投递和信任都会受影响。",
            "先找 pass、fail、neutral、none 这些值，再比较每项结果旁边的域名。",
          ],
        },
        {
          heading: "Received 要从下往上读",
          body: [
            "每一行 Received 都由一台邮件服务器添加。最早的跳点通常在底部，最新的跳点通常在顶部。",
            "异常跳点、私有转发或主机名不匹配，都可能解释延迟或可疑路径。",
          ],
        },
      ],
      relatedTools: ["email-header-analyzer", "spf-checker", "dkim-checker"],
      faq: [
        {
          question: "邮件头能证明是谁发的吗？",
          answer: "它能提供重要证据，但伪造或不完整的邮件头仍然需要谨慎解读。",
        },
        {
          question: "排查进垃圾箱先看哪几项？",
          answer: "先看 Authentication-Results 和 Received，再比较 SPF、DKIM、DMARC、From 和 return-path 域名。",
        },
      ],
    },
    "how-to-fix-spf-fail": {
      slug: "how-to-fix-spf-fail",
      title: "如何修复 SPF Fail",
      description: "一个修复 SPF 失败、又不误伤合法发信源的实用清单。",
      sections: [
        {
          heading: "找到真正的发信服务",
          body: [
            "当投递邮件的服务器没有被域名 SPF 记录授权时，SPF 就会失败。",
            "修改 DNS 前，先确认邮箱服务、群发工具、CRM、客服系统和事务邮件服务商。",
          ],
        },
        {
          heading: "保持一条干净的 SPF 记录",
          body: [
            "只发布一条以 v=spf1 开头的 TXT 记录。需要合并 include，而不是创建多条 SPF。",
            "修改后重新测试；如果 include 很多，还要注意 DNS 查询次数限制。",
          ],
        },
      ],
      relatedTools: ["spf-checker", "email-header-analyzer"],
      faq: [
        {
          question: "邮件转发会破坏 SPF 吗？",
          answer: "经常会。因为转发服务器通常不在原发件域名的 SPF 记录里。",
        },
        {
          question: "应该用 -all 还是 ~all？",
          answer: "测试期建议用 ~all。确认所有合法发信源都包含后，再考虑 -all。",
        },
      ],
    },
    "what-is-dkim-selector": {
      slug: "what-is-dkim-selector",
      title: "什么是 DKIM Selector",
      description: "理解 DKIM selector 如何帮助收件方找到正确的公开签名密钥。",
      sections: [
        {
          heading: "selector 加域名等于 DNS 名称",
          body: [
            "DKIM selector 是发信方选择的标签。收件方会把它与 _domainkey 和签名域名组合起来。",
            "例如 example.com 上的 google selector，会变成 google._domainkey.example.com。",
          ],
        },
        {
          heading: "selector 让密钥轮换更安全",
          body: [
            "服务商可以先发布新的 selector，再下线旧的 selector，这样轮换期间已签名邮件仍然有效。",
            "如果 selector 查询失败，请核对服务商说明，并确认 TXT 记录完全正确。",
          ],
        },
      ],
      relatedTools: ["dkim-checker", "email-header-analyzer"],
      faq: [
        {
          question: "一个域名可以有多个 DKIM selector 吗？",
          answer: "可以。不同发信服务经常会为同一个域名使用不同 selector。",
        },
        {
          question: "selector 是秘密吗？",
          answer: "不是。selector 会出现在邮件头里，并指向公开 DNS 记录。",
        },
      ],
    },
    "dmarc-policy-guide": {
      slug: "dmarc-policy-guide",
      title: "DMARC 策略指南",
      description: "了解 p=none、quarantine、reject 如何影响域名保护和邮件投递。",
      sections: [
        {
          heading: "用 p=none 先观察",
          body: [
            "p=none 会请求收件方发送报告，但不改变邮件处理方式，是发现合法发信源最安全的方式。",
            "这个阶段应该先修复 SPF 和 DKIM 对齐，再执行更严格策略。",
          ],
        },
        {
          heading: "逐步进入强制执行",
          body: [
            "quarantine 会让失败邮件更可能进入垃圾箱，reject 会请求收件方拒收失败邮件。",
            "如果域名有很多发信源或旧系统，可以用 pct 分阶段放量。",
          ],
        },
      ],
      relatedTools: ["dmarc-checker", "spf-checker", "dkim-checker"],
      faq: [
        {
          question: "p=reject 能阻止所有伪造吗？",
          answer: "它能帮助收件方拒收声称来自你域名但未认证的邮件，但前提是收件方支持并执行 DMARC。",
        },
        {
          question: "我需要 DMARC 报告吗？",
          answer: "报告能在强制执行前帮助发现未知发信源和认证失败。",
        },
      ],
    },
    "why-email-goes-to-spam": {
      slug: "why-email-goes-to-spam",
      title: "为什么邮件会进垃圾箱",
      description: "合法邮件进入垃圾箱的常见技术原因，以及如何排查。",
      sections: [
        {
          heading: "认证是第一道检查",
          body: [
            "SPF、DKIM、DMARC 缺失或失败，会让邮件看起来不够可信。",
            "要把 DNS 记录和真实邮件头放在一起看，因为记录正确不代表某个发信源一定对齐通过。",
          ],
        },
        {
          heading: "信誉和内容仍然重要",
          body: [
            "新域名、共享 IP、垃圾感强的文案、坏掉的退订链接和用户投诉，都会影响进箱。",
            "先修好技术基础，再看打开率、投诉和互动信号。",
          ],
        },
      ],
      relatedTools: ["email-header-analyzer", "spf-checker", "dmarc-checker"],
      faq: [
        {
          question: "DNS 记录能保证进收件箱吗？",
          answer: "不能。它们是必要的信任信号，但信誉、内容、互动和收件方策略也会影响结果。",
        },
        {
          question: "应该先检查什么？",
          answer: "先拿一封真实进入垃圾箱的邮件头，再检查 SPF、DKIM、DMARC 和发信信誉。",
        },
      ],
    },
  },
  "zh-TW": {} as Record<EmailGuidePageSlug, EmailGuideContent>,
  ja: {} as Record<EmailGuidePageSlug, EmailGuideContent>,
  ko: {} as Record<EmailGuidePageSlug, EmailGuideContent>,
}

GUIDE_CONTENT["zh-TW"] = {
  "how-to-read-email-headers": {
    ...GUIDE_CONTENT["zh-CN"]["how-to-read-email-headers"],
    title: "如何閱讀郵件標頭",
    description: "了解哪些郵件標頭可以解釋寄件身分、投遞路徑和驗證結果。",
    sections: GUIDE_CONTENT["zh-CN"]["how-to-read-email-headers"].sections.map((section) => ({
      heading: section.heading.replace("先看", "先看").replace("从下往上", "從下往上"),
      body: section.body.map((text) =>
        text
          .replaceAll("邮件", "郵件")
          .replaceAll("汇总", "彙總")
          .replaceAll("缺失", "缺少")
          .replaceAll("投递", "投遞")
          .replaceAll("域名", "網域")
          .replaceAll("底部", "底部")
          .replaceAll("顶部", "頂部")
          .replaceAll("异常", "異常")
          .replaceAll("转发", "轉寄")
          .replaceAll("路径", "路徑")
      ),
    })),
    faq: GUIDE_CONTENT["zh-CN"]["how-to-read-email-headers"].faq.map((item) => ({
      question: item.question.replaceAll("邮件", "郵件").replaceAll("垃圾箱", "垃圾郵件匣"),
      answer: item.answer
        .replaceAll("邮件", "郵件")
        .replaceAll("证据", "證據")
        .replaceAll("谨慎", "謹慎")
        .replaceAll("域名", "網域"),
    })),
  },
  "how-to-fix-spf-fail": {
    ...GUIDE_CONTENT["zh-CN"]["how-to-fix-spf-fail"],
    title: "如何修復 SPF Fail",
    description: "一個修復 SPF 失敗、又不誤傷合法寄信來源的實用清單。",
    sections: [
      {
        heading: "找到真正的寄信服務",
        body: [
          "當投遞郵件的伺服器沒有被網域 SPF 記錄授權時，SPF 就會失敗。",
          "修改 DNS 前，先確認郵件服務、群發工具、CRM、客服系統和交易郵件服務商。",
        ],
      },
      {
        heading: "保持一筆乾淨的 SPF 記錄",
        body: [
          "只發布一筆以 v=spf1 開頭的 TXT 記錄。需要合併 include，而不是建立多筆 SPF。",
          "修改後重新測試；如果 include 很多，還要注意 DNS 查詢次數限制。",
        ],
      },
    ],
    faq: [
      {
        question: "郵件轉寄會破壞 SPF 嗎？",
        answer: "經常會。因為轉寄伺服器通常不在原寄件網域的 SPF 記錄裡。",
      },
      {
        question: "應該用 -all 還是 ~all？",
        answer: "測試期建議用 ~all。確認所有合法寄信來源都包含後，再考慮 -all。",
      },
    ],
  },
  "what-is-dkim-selector": {
    ...GUIDE_CONTENT["zh-CN"]["what-is-dkim-selector"],
    title: "什麼是 DKIM Selector",
    description: "理解 DKIM selector 如何幫助收件方找到正確的公開簽名金鑰。",
    sections: [
      {
        heading: "selector 加網域等於 DNS 名稱",
        body: [
          "DKIM selector 是寄件方選擇的標籤。收件方會把它與 _domainkey 和簽名網域組合起來。",
          "例如 example.com 上的 google selector，會變成 google._domainkey.example.com。",
        ],
      },
      {
        heading: "selector 讓金鑰輪換更安全",
        body: [
          "服務商可以先發布新的 selector，再下線舊的 selector，這樣輪換期間已簽名郵件仍然有效。",
          "如果 selector 查詢失敗，請核對服務商說明，並確認 TXT 記錄完全正確。",
        ],
      },
    ],
    faq: [
      {
        question: "一個網域可以有多個 DKIM selector 嗎？",
        answer: "可以。不同寄信服務經常會為同一個網域使用不同 selector。",
      },
      {
        question: "selector 是秘密嗎？",
        answer: "不是。selector 會出現在郵件標頭裡，並指向公開 DNS 記錄。",
      },
    ],
  },
  "dmarc-policy-guide": {
    ...GUIDE_CONTENT["zh-CN"]["dmarc-policy-guide"],
    title: "DMARC 政策指南",
    description: "了解 p=none、quarantine、reject 如何影響網域保護和郵件投遞。",
    sections: [
      {
        heading: "用 p=none 先觀察",
        body: [
          "p=none 會請求收件方寄送報告，但不改變郵件處理方式，是發現合法寄信來源最安全的方式。",
          "這個階段應該先修復 SPF 和 DKIM 對齊，再執行更嚴格政策。",
        ],
      },
      {
        heading: "逐步進入強制執行",
        body: [
          "quarantine 會讓失敗郵件更可能進入垃圾郵件匣，reject 會請求收件方拒收失敗郵件。",
          "如果網域有很多寄信來源或舊系統，可以用 pct 分階段放量。",
        ],
      },
    ],
    faq: [
      {
        question: "p=reject 能阻止所有偽造嗎？",
        answer: "它能幫助收件方拒收聲稱來自你網域但未驗證的郵件，但前提是收件方支援並執行 DMARC。",
      },
      {
        question: "我需要 DMARC 報告嗎？",
        answer: "報告能在強制執行前幫助發現未知寄信來源和驗證失敗。",
      },
    ],
  },
  "why-email-goes-to-spam": {
    ...GUIDE_CONTENT["zh-CN"]["why-email-goes-to-spam"],
    title: "為什麼郵件會進垃圾郵件匣",
    description: "合法郵件進入垃圾郵件匣的常見技術原因，以及如何排查。",
    sections: [
      {
        heading: "驗證是第一道檢查",
        body: [
          "SPF、DKIM、DMARC 缺少或失敗，會讓郵件看起來不夠可信。",
          "要把 DNS 記錄和真實郵件標頭放在一起看，因為記錄正確不代表某個寄信來源一定對齊通過。",
        ],
      },
      {
        heading: "信譽和內容仍然重要",
        body: [
          "新網域、共享 IP、垃圾感強的文案、壞掉的退訂連結和使用者投訴，都會影響進信箱。",
          "先修好技術基礎，再看開啟率、投訴和互動信號。",
        ],
      },
    ],
    faq: [
      {
        question: "DNS 記錄能保證進收件匣嗎？",
        answer: "不能。它們是必要的信任信號，但信譽、內容、互動和收件方政策也會影響結果。",
      },
      {
        question: "應該先檢查什麼？",
        answer: "先拿一封真實進入垃圾郵件匣的郵件標頭，再檢查 SPF、DKIM、DMARC 和寄信信譽。",
      },
    ],
  },
}

GUIDE_CONTENT.ja = {
  "how-to-read-email-headers": {
    slug: "how-to-read-email-headers",
    title: "メールヘッダーの読み方",
    description: "送信者、配信経路、認証結果を説明するメールヘッダーを理解します。",
    sections: [
      {
        heading: "まず Authentication-Results を見る",
        body: [
          "Authentication-Results は SPF、DKIM、DMARC の最も早い要約です。欠落や失敗があると配信と信頼性に影響します。",
          "pass、fail、neutral、none を確認し、それぞれの結果に表示されるドメインを比較します。",
        ],
      },
      {
        heading: "Received は下から上へ読む",
        body: [
          "Received 行はメールサーバーごとに追加されます。古いホップは下に、新しいホップは上にあります。",
          "想定外のホップ、プライベートリレー、ホスト名の不一致は遅延や不審な経路の手がかりです。",
        ],
      },
    ],
    relatedTools: ["email-header-analyzer", "spf-checker", "dkim-checker"],
    faq: [
      {
        question: "ヘッダーだけで送信者を証明できますか？",
        answer: "有力な証拠になりますが、偽装や不完全なヘッダーは慎重に読む必要があります。",
      },
      {
        question: "迷惑メール調査では何を先に見ますか？",
        answer: "Authentication-Results と Received から始め、SPF、DKIM、DMARC、From、return-path を比較します。",
      },
    ],
  },
  "how-to-fix-spf-fail": {
    slug: "how-to-fix-spf-fail",
    title: "SPF Fail の直し方",
    description: "正当な送信元を壊さずに SPF 失敗を修正するチェックリストです。",
    sections: [
      {
        heading: "実際の送信サービスを特定する",
        body: [
          "メッセージを配信したサーバーが SPF レコードで許可されていないと SPF は失敗します。",
          "DNS を編集する前に、メールプロバイダー、配信ツール、CRM、サポートデスク、トランザクションメールを確認します。",
        ],
      },
      {
        heading: "SPF レコードは 1 つに保つ",
        body: [
          "v=spf1 で始まる TXT レコードを 1 つだけ公開します。複数作るのではなく include を統合します。",
          "変更後に再テストし、include が多い場合は DNS ルックアップ制限にも注意します。",
        ],
      },
    ],
    relatedTools: ["spf-checker", "email-header-analyzer"],
    faq: [
      {
        question: "転送は SPF を壊しますか？",
        answer: "壊すことが多いです。転送サーバーは元の送信者の SPF に含まれていないためです。",
      },
      {
        question: "-all と ~all のどちらを使うべきですか？",
        answer: "テスト中は ~all を使い、すべての正当な送信元を確認してから -all を検討します。",
      },
    ],
  },
  "what-is-dkim-selector": {
    slug: "what-is-dkim-selector",
    title: "DKIM セレクターとは",
    description: "DKIM セレクターが受信者を正しい公開鍵へ導く仕組みを理解します。",
    sections: [
      {
        heading: "セレクターとドメインで DNS 名が決まる",
        body: [
          "DKIM セレクターは送信側が選ぶラベルです。受信側はそれを _domainkey と署名ドメインに組み合わせます。",
          "たとえば example.com の google セレクターは google._domainkey.example.com になります。",
        ],
      },
      {
        heading: "セレクターは鍵ローテーションを助ける",
        body: [
          "プロバイダーは古いセレクターを止める前に新しいセレクターを公開できます。",
          "セレクター検索が失敗する場合は、プロバイダーの手順と TXT レコードを確認してください。",
        ],
      },
    ],
    relatedTools: ["dkim-checker", "email-header-analyzer"],
    faq: [
      {
        question: "1 つのドメインに複数の DKIM セレクターはありますか？",
        answer: "あります。異なる送信サービスが同じドメインで別々のセレクターを使うことがあります。",
      },
      {
        question: "セレクターは秘密ですか？",
        answer: "いいえ。セレクターはメールヘッダーに表示され、公開 DNS レコードを指します。",
      },
    ],
  },
  "dmarc-policy-guide": {
    slug: "dmarc-policy-guide",
    title: "DMARC ポリシーガイド",
    description: "p=none、quarantine、reject がドメイン保護と配信へ与える影響を学びます。",
    sections: [
      {
        heading: "p=none で観察する",
        body: [
          "p=none は処理を変えずにレポートを依頼します。正当な送信元を見つける安全な出発点です。",
          "この段階で SPF と DKIM の整合を直し、強いポリシーへ進む準備をします。",
        ],
      },
      {
        heading: "段階的に強制する",
        body: [
          "quarantine は失敗メールを迷惑メール寄りにし、reject は受信拒否を依頼します。",
          "送信元や古いシステムが多い場合は pct で段階的に適用できます。",
        ],
      },
    ],
    relatedTools: ["dmarc-checker", "spf-checker", "dkim-checker"],
    faq: [
      {
        question: "p=reject はすべてのなりすましを止めますか？",
        answer: "受信側が DMARC を尊重する場合、未認証でドメインを名乗るメールの拒否に役立ちます。",
      },
      {
        question: "レポートは必要ですか？",
        answer: "強制前に未知の送信元や認証失敗を発見するために役立ちます。",
      },
    ],
  },
  "why-email-goes-to-spam": {
    slug: "why-email-goes-to-spam",
    title: "メールが迷惑メールになる理由",
    description: "正当なメールが迷惑メールに入る技術的な理由と調査方法です。",
    sections: [
      {
        heading: "認証が最初のチェックポイント",
        body: [
          "SPF、DKIM、DMARC の欠落や失敗は、メッセージの信頼性を下げます。",
          "DNS が正しくても特定の送信元で整合に失敗することがあるため、実際のヘッダーと一緒に確認します。",
        ],
      },
      {
        heading: "評判と内容も重要",
        body: [
          "新しいドメイン、共有 IP、スパムらしい文面、壊れた配信停止リンク、苦情はすべて配置に影響します。",
          "まず技術的な土台を直し、その後エンゲージメントと苦情のシグナルを測ります。",
        ],
      },
    ],
    relatedTools: ["email-header-analyzer", "spf-checker", "dmarc-checker"],
    faq: [
      {
        question: "DNS レコードだけで受信箱入りを保証できますか？",
        answer: "できません。必要な信頼シグナルですが、評判、内容、反応、受信側ポリシーも重要です。",
      },
      {
        question: "最初に何を確認すべきですか？",
        answer: "迷惑メールに入った実際のヘッダーを見て、SPF、DKIM、DMARC、送信者評判を確認します。",
      },
    ],
  },
}

GUIDE_CONTENT.ko = {
  "how-to-read-email-headers": {
    slug: "how-to-read-email-headers",
    title: "메일 헤더 읽는 법",
    description: "발신자 신원, 전달 경로, 인증 결과를 설명하는 메일 헤더를 이해합니다.",
    sections: [
      {
        heading: "Authentication-Results부터 보기",
        body: [
          "Authentication-Results는 SPF, DKIM, DMARC의 가장 빠른 요약입니다. 누락되거나 실패하면 전달과 신뢰에 영향을 줍니다.",
          "pass, fail, neutral, none 값을 보고 각 결과 옆의 도메인을 비교하세요.",
        ],
      },
      {
        heading: "Received는 아래에서 위로 읽기",
        body: [
          "각 Received 줄은 메일 서버가 추가합니다. 오래된 홉은 보통 아래쪽, 최신 홉은 위쪽에 있습니다.",
          "예상치 못한 홉, 개인 릴레이, 호스트 이름 불일치는 지연이나 의심스러운 경로의 단서가 됩니다.",
        ],
      },
    ],
    relatedTools: ["email-header-analyzer", "spf-checker", "dkim-checker"],
    faq: [
      {
        question: "헤더만으로 누가 보냈는지 증명할 수 있나요?",
        answer: "중요한 증거가 되지만 위조되거나 불완전한 헤더는 신중하게 해석해야 합니다.",
      },
      {
        question: "스팸 문제는 무엇부터 봐야 하나요?",
        answer: "Authentication-Results와 Received부터 보고 SPF, DKIM, DMARC, From, return-path 도메인을 비교하세요.",
      },
    ],
  },
  "how-to-fix-spf-fail": {
    slug: "how-to-fix-spf-fail",
    title: "SPF Fail 고치는 법",
    description: "정상 발신자를 망가뜨리지 않고 SPF 실패를 해결하는 실용 체크리스트입니다.",
    sections: [
      {
        heading: "실제 발신 서비스 찾기",
        body: [
          "메시지를 전달한 서버가 도메인의 SPF 레코드에 허용되지 않으면 SPF가 실패합니다.",
          "DNS를 수정하기 전에 메일 제공업체, 뉴스레터 도구, CRM, 고객지원 도구, 트랜잭션 메일 서비스를 확인하세요.",
        ],
      },
      {
        heading: "SPF 레코드는 하나로 유지",
        body: [
          "v=spf1로 시작하는 TXT 레코드를 하나만 게시하세요. 여러 SPF를 만들지 말고 include를 병합하세요.",
          "변경 후 다시 테스트하고 include가 많다면 DNS 조회 제한도 확인하세요.",
        ],
      },
    ],
    relatedTools: ["spf-checker", "email-header-analyzer"],
    faq: [
      {
        question: "메일 전달은 SPF를 깨뜨리나요?",
        answer: "자주 그렇습니다. 전달 서버가 원래 발신자의 SPF 레코드에 포함되지 않기 때문입니다.",
      },
      {
        question: "-all과 ~all 중 무엇을 써야 하나요?",
        answer: "테스트 중에는 ~all을 쓰고, 모든 정상 발신자를 확인한 뒤 -all을 고려하세요.",
      },
    ],
  },
  "what-is-dkim-selector": {
    slug: "what-is-dkim-selector",
    title: "DKIM Selector란?",
    description: "DKIM selector가 수신자를 올바른 공개 서명 키로 안내하는 방식을 이해합니다.",
    sections: [
      {
        heading: "selector와 도메인이 DNS 이름을 만듭니다",
        body: [
          "DKIM selector는 발신자가 선택하는 라벨입니다. 수신자는 이를 _domainkey와 서명 도메인에 결합합니다.",
          "예를 들어 example.com의 google selector는 google._domainkey.example.com이 됩니다.",
        ],
      },
      {
        heading: "selector는 키 교체를 가능하게 합니다",
        body: [
          "제공업체는 기존 selector를 내리기 전에 새 selector를 게시할 수 있습니다.",
          "selector 조회가 실패하면 제공업체 안내와 TXT 레코드가 정확한지 확인하세요.",
        ],
      },
    ],
    relatedTools: ["dkim-checker", "email-header-analyzer"],
    faq: [
      {
        question: "한 도메인에 여러 DKIM selector가 있을 수 있나요?",
        answer: "네. 서로 다른 발신 서비스가 같은 도메인에서 다른 selector를 사용하는 경우가 많습니다.",
      },
      {
        question: "selector는 비밀인가요?",
        answer: "아닙니다. selector는 메일 헤더에 보이며 공개 DNS 레코드를 가리킵니다.",
      },
    ],
  },
  "dmarc-policy-guide": {
    slug: "dmarc-policy-guide",
    title: "DMARC 정책 가이드",
    description: "p=none, quarantine, reject가 도메인 보호와 메일 전달에 미치는 영향을 배웁니다.",
    sections: [
      {
        heading: "p=none으로 관찰하기",
        body: [
          "p=none은 메시지 처리를 바꾸지 않고 보고서만 요청합니다. 정상 발신자를 찾는 가장 안전한 시작점입니다.",
          "이 단계에서 SPF와 DKIM 정렬을 고친 뒤 더 강한 정책으로 이동하세요.",
        ],
      },
      {
        heading: "점진적으로 강제 적용",
        body: [
          "quarantine은 실패 메일을 스팸 쪽으로 보내고, reject는 수신 거부를 요청합니다.",
          "발신자가 많거나 오래된 시스템이 있다면 pct로 단계적으로 적용할 수 있습니다.",
        ],
      },
    ],
    relatedTools: ["dmarc-checker", "spf-checker", "dkim-checker"],
    faq: [
      {
        question: "p=reject가 모든 위조를 막나요?",
        answer: "수신자가 DMARC를 따를 때, 인증되지 않은 도메인 사칭 메일을 거부하는 데 도움을 줍니다.",
      },
      {
        question: "보고서가 필요한가요?",
        answer: "강제 적용 전에 알 수 없는 발신자와 인증 실패를 찾는 데 도움이 됩니다.",
      },
    ],
  },
  "why-email-goes-to-spam": {
    slug: "why-email-goes-to-spam",
    title: "메일이 스팸함으로 가는 이유",
    description: "정상 메일이 스팸함에 들어가는 기술적 이유와 조사 방법입니다.",
    sections: [
      {
        heading: "인증이 첫 번째 체크포인트",
        body: [
          "SPF, DKIM, DMARC가 없거나 실패하면 메시지가 덜 신뢰받습니다.",
          "DNS 레코드가 맞아도 특정 발신자가 정렬에 실패할 수 있으므로 실제 헤더와 함께 확인하세요.",
        ],
      },
      {
        heading: "평판과 내용도 중요합니다",
        body: [
          "새 도메인, 공유 IP, 스팸처럼 보이는 문구, 깨진 수신거부 링크, 사용자 신고는 모두 받은편지함 배치에 영향을 줍니다.",
          "먼저 기술 기반을 고친 뒤 참여도와 신고 신호를 측정하세요.",
        ],
      },
    ],
    relatedTools: ["email-header-analyzer", "spf-checker", "dmarc-checker"],
    faq: [
      {
        question: "DNS 레코드만으로 받은편지함 도착을 보장할 수 있나요?",
        answer: "아닙니다. 필요한 신뢰 신호지만 평판, 내용, 참여도, 수신자 정책도 중요합니다.",
      },
      {
        question: "무엇부터 확인해야 하나요?",
        answer: "실제로 스팸함에 들어간 메시지의 헤더를 보고 SPF, DKIM, DMARC, 발신자 평판을 확인하세요.",
      },
    ],
  },
}

export function getToolsIndexContent(locale: Locale): ToolsIndexContent {
  return TOOLS_INDEX[locale] || TOOLS_INDEX[DEFAULT_LOCALE]
}

export function getSearchTitle(locale: Locale, kind: SearchMetadataKind, title: string): string {
  const suffix = SEARCH_TITLE_SUFFIX[locale]?.[kind] || SEARCH_TITLE_SUFFIX[DEFAULT_LOCALE][kind]

  if (kind === "marketing") {
    return `${title} | ${suffix}`
  }

  return `${title} - ${suffix} | ${SITE_NAME}`
}

export function getSearchDescription(locale: Locale, kind: SearchMetadataKind, description: string): string {
  const prefix = SEARCH_DESCRIPTION_PREFIX[locale]?.[kind]

  if (!prefix || description.startsWith(prefix)) {
    return description
  }

  return `${prefix} ${description}`
}

export function getEmailToolContent(locale: Locale, slug: EmailToolPageSlug): EmailToolContent {
  const localized =
    TOOL_CONTENT[locale]?.[slug] ||
    ADDITIONAL_TOOL_CONTENT[locale]?.[slug as keyof (typeof ADDITIONAL_TOOL_CONTENT)[Locale]] ||
    TOOL_CONTENT[DEFAULT_LOCALE][slug] ||
    ADDITIONAL_TOOL_CONTENT[DEFAULT_LOCALE][slug as keyof (typeof ADDITIONAL_TOOL_CONTENT)[Locale]]

  return {
    slug,
    ...localized,
    toolCopy: DNS_COPY[locale] || DNS_COPY[DEFAULT_LOCALE],
    headerCopy: HEADER_COPY[locale] || HEADER_COPY[DEFAULT_LOCALE],
  }
}

export function getEmailGuideContent(locale: Locale, slug: EmailGuidePageSlug): EmailGuideContent {
  return GUIDE_CONTENT[locale]?.[slug] || GUIDE_CONTENT[DEFAULT_LOCALE][slug]
}

export function getLanguageAlternates(path: string) {
  const normalizedPath = path.replace(/^\/+/, "")

  return Object.fromEntries(
    i18n.locales.map((locale) => [
      locale,
      normalizedPath ? `${SITE_URL}/${locale}/${normalizedPath}` : `${SITE_URL}/${locale}`,
    ])
  )
}

export function createFaqJsonLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function createSoftwareApplicationJsonLd(content: EmailToolContent, locale: Locale, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${content.title} - ${SITE_NAME}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    url: `${SITE_URL}/${locale}/${path.replace(/^\/+/, "")}`,
    description: content.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }
}
