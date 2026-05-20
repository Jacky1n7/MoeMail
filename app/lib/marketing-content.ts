import type { TrustAndSeoPageSlug } from "@/config/site"
import { i18n, type Locale } from "@/i18n/config"
import type { ContentSection } from "@/lib/seo-content"

export type MarketingPageContent = {
  slug: TrustAndSeoPageSlug
  title: string
  description: string
  sections: ContentSection[]
  cta?: {
    label: string
    href: string
  }
}

const DEFAULT_LOCALE = i18n.defaultLocale

const CONTENT: Record<Locale, Record<TrustAndSeoPageSlug, Omit<MarketingPageContent, "slug">>> = {
  en: {
    about: {
      title: "About MoeMail",
      description: "MoeMail is a privacy-focused temporary email and email testing service for everyday users, developers, and automation workflows.",
      sections: [
        {
          heading: "What we are building",
          body: [
            "MoeMail helps people create disposable inboxes, receive verification emails, share temporary mailboxes, and test email workflows without exposing a personal inbox.",
            "The service is built on Cloudflare infrastructure and designed to stay fast, simple, and transparent.",
          ],
        },
        {
          heading: "Who it is for",
          body: [
            "Privacy-conscious users can keep their primary email address away from one-time signups and untrusted forms.",
            "Developers can use MoeMail for product testing, webhook workflows, API automation, and disposable inbox experiments.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      description: "How MoeMail handles temporary email data, account information, cookies, analytics, and third-party services.",
      sections: [
        {
          heading: "Data we process",
          body: [
            "MoeMail stores temporary email addresses, received messages, account identifiers, API keys, and configuration required to provide the service.",
            "Temporary inboxes may expire automatically depending on the retention option selected by the user.",
          ],
        },
        {
          heading: "Analytics and advertising",
          body: [
            "We may use privacy-conscious analytics, Cloudflare security features, and advertising partners to understand traffic and support the service.",
            "If advertising is enabled, partners may use cookies or similar technologies according to their own policies and applicable law.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      description: "Acceptable use terms for MoeMail temporary email, email testing, sharing, webhook, and API features.",
      sections: [
        {
          heading: "Acceptable use",
          body: [
            "Use MoeMail only for lawful purposes, privacy protection, software testing, and legitimate automation workflows.",
            "Do not use MoeMail for fraud, spam, abuse, harassment, credential theft, evasion of platform rules, or illegal activity.",
          ],
        },
        {
          heading: "Service limitations",
          body: [
            "Temporary mailboxes are not a replacement for a permanent email account. Messages may expire, be removed, or become unavailable.",
            "MoeMail is provided as a best-effort service and should not be used for sensitive or mission-critical communication.",
          ],
        },
      ],
    },
    contact: {
      title: "Contact",
      description: "Contact MoeMail for support, abuse reports, security issues, business inquiries, and API questions.",
      sections: [
        {
          heading: "Support and abuse reports",
          body: [
            "If you need help, want to report abuse, or found a security concern, include the relevant email address, message ID, timestamp, and a short description.",
            "For urgent abuse reports, include enough detail for us to investigate without exposing unnecessary personal information.",
          ],
        },
        {
          heading: "Business and API",
          body: [
            "We are interested in useful integrations around email testing, disposable email detection, webhook inboxes, and developer workflows.",
          ],
        },
      ],
      cta: {
        label: "Open MoeMail",
        href: "/",
      },
    },
    advertise: {
      title: "Advertise and Sponsorship",
      description: "Partner with MoeMail to reach people who care about email privacy, DNS health, deliverability, and developer email testing.",
      sections: [
        {
          heading: "Audience",
          body: [
            "MoeMail attracts users who need disposable inboxes, email privacy guidance, DNS troubleshooting tools, and practical deliverability education.",
            "The site is useful for developers, indie builders, domain owners, small businesses, and privacy-conscious users who want a cleaner email workflow.",
          ],
        },
        {
          heading: "Suitable partners",
          body: [
            "Relevant partners include email service providers, domain registrars, DNS platforms, privacy tools, deliverability products, hosting providers, and developer SaaS tools.",
            "We prefer useful, clearly labeled placements that do not interrupt the mailbox experience or mislead visitors.",
          ],
        },
        {
          heading: "Ad placement principles",
          body: [
            "Advertising is intended for public content pages such as guides, tools, and educational resources.",
            "We avoid placing ads inside private message views or areas where visitors are reading mailbox content.",
          ],
        },
      ],
      cta: {
        label: "Contact us",
        href: "/contact",
      },
    },
    "temporary-email": {
      title: "Temporary Email",
      description: "Create a temporary email address to receive verification codes, test signups, and keep your personal inbox private.",
      sections: [
        {
          heading: "What is a temporary email?",
          body: [
            "A temporary email address is an inbox you can use for a short period of time instead of exposing your personal address.",
            "It is useful for one-time signups, product testing, download forms, and situations where you do not trust the sender yet.",
          ],
        },
        {
          heading: "Common use cases",
          body: [
            "Receive account verification messages, test email delivery, inspect HTML email content, or create a clean inbox for automation.",
            "For permanent accounts, banking, school, work, and recovery emails, use a normal mailbox you control long term.",
          ],
        },
      ],
      cta: {
        label: "Create a temporary inbox",
        href: "/",
      },
    },
    "disposable-email": {
      title: "Disposable Email",
      description: "Use disposable email addresses to reduce spam, protect identity, and test email workflows safely.",
      sections: [
        {
          heading: "Disposable email vs permanent email",
          body: [
            "Disposable email is designed for short-lived communication. Permanent email is designed for identity, recovery, and long-term records.",
            "Using the right type of inbox helps reduce spam while keeping important accounts recoverable.",
          ],
        },
        {
          heading: "Best practices",
          body: [
            "Use disposable addresses for testing and low-trust forms. Avoid using them for services where account ownership matters.",
            "Delete or let mailboxes expire when you no longer need them.",
          ],
        },
      ],
    },
    "temporary-email-api": {
      title: "Temporary Email API",
      description: "Use MoeMail's API to generate inboxes, retrieve messages, create share links, and automate email testing workflows.",
      sections: [
        {
          heading: "Developer workflows",
          body: [
            "A temporary email API lets developers create disposable inboxes during tests, wait for verification messages, and extract links or codes.",
            "This is useful for QA automation, onboarding tests, webhook demos, and integration pipelines.",
          ],
        },
        {
          heading: "API access",
          body: [
            "MoeMail supports API keys for authenticated OpenAPI access. Higher limits and developer-focused endpoints can be added as the service grows.",
          ],
        },
      ],
      cta: {
        label: "View your API keys",
        href: "/profile",
      },
    },
    "email-privacy": {
      title: "Email Privacy",
      description: "Practical ways to protect your inbox, reduce spam, and choose when to use temporary email.",
      sections: [
        {
          heading: "Why email privacy matters",
          body: [
            "Your email address often becomes a durable identity across websites, newsletters, data brokers, and marketing systems.",
            "Separating personal, work, shopping, and temporary email usage reduces exposure and makes spam easier to contain.",
          ],
        },
        {
          heading: "Simple habits",
          body: [
            "Use aliases or temporary inboxes for low-trust forms, enable two-factor authentication on important accounts, and avoid reusing passwords.",
            "Check sender domains and links before interacting with unexpected messages.",
          ],
        },
      ],
    },
    "email-testing": {
      title: "Email Testing",
      description: "Test signup flows, verification emails, templates, and transactional email delivery with disposable inboxes.",
      sections: [
        {
          heading: "What to test",
          body: [
            "Developers should test subject lines, sender names, HTML rendering, plain text fallbacks, links, verification codes, and delivery timing.",
            "A disposable inbox keeps test traffic away from personal or production mailboxes.",
          ],
        },
        {
          heading: "Automation ideas",
          body: [
            "Create an inbox, submit a signup form, poll messages through the API, extract the verification link, and finish the test automatically.",
          ],
        },
      ],
    },
    "webhook-email-testing": {
      title: "Webhook Email Testing",
      description: "Receive email events through webhooks and build automation around temporary inboxes.",
      sections: [
        {
          heading: "Why webhooks help",
          body: [
            "Polling works, but webhooks are cleaner for automation. Your app receives an event when a new message arrives.",
            "Webhook inboxes are useful for QA, demos, low-code tools, agent workflows, and integration tests.",
          ],
        },
        {
          heading: "What to validate",
          body: [
            "Validate signatures when available, handle retries safely, store only the data you need, and avoid logging secrets from email content.",
          ],
        },
      ],
    },
  },
  "zh-CN": {
    about: {
      title: "关于 MoeMail",
      description: "MoeMail 是面向普通用户、开发者和自动化流程的临时邮箱与邮件测试服务，重点关注隐私和易用性。",
      sections: [
        {
          heading: "我们在做什么",
          body: [
            "MoeMail 可以创建一次性收件箱、接收验证码邮件、分享临时邮箱，并在不暴露个人邮箱的情况下测试邮件流程。",
            "服务基于 Cloudflare 基础设施构建，目标是保持快速、简单和透明。",
          ],
        },
        {
          heading: "适合谁使用",
          body: [
            "注重隐私的用户可以用它隔离一次性注册和低信任表单，减少真实邮箱暴露。",
            "开发者可以用它做产品测试、Webhook 流程、API 自动化和临时收件箱实验。",
          ],
        },
      ],
    },
    privacy: {
      title: "隐私政策",
      description: "说明 MoeMail 如何处理临时邮箱数据、账号信息、Cookie、统计分析和第三方服务。",
      sections: [
        {
          heading: "我们处理的数据",
          body: [
            "MoeMail 会存储提供服务所需的临时邮箱地址、收到的邮件、账号标识、API Key 和相关配置。",
            "临时邮箱可能会根据用户选择的保留时间自动过期。",
          ],
        },
        {
          heading: "统计与广告",
          body: [
            "我们可能使用注重隐私的统计分析、Cloudflare 安全能力和广告合作方来理解流量并支持服务运行。",
            "如果启用广告，合作方可能会按照自身政策和适用法律使用 Cookie 或类似技术。",
          ],
        },
      ],
    },
    terms: {
      title: "服务条款",
      description: "MoeMail 临时邮箱、邮件测试、分享、Webhook 和 API 功能的可接受使用条款。",
      sections: [
        {
          heading: "可接受使用",
          body: [
            "请仅将 MoeMail 用于合法用途、隐私保护、软件测试和正当自动化流程。",
            "不得用于诈骗、垃圾邮件、骚扰、凭证窃取、规避平台规则或任何违法活动。",
          ],
        },
        {
          heading: "服务限制",
          body: [
            "临时邮箱不能替代长期邮箱。邮件可能过期、被删除或变得不可访问。",
            "MoeMail 以尽力服务方式提供，不应用于敏感、金融、医疗、法律或关键通信。",
          ],
        },
      ],
    },
    contact: {
      title: "联系我们",
      description: "联系 MoeMail 获取支持、提交滥用报告、安全问题、商务合作和 API 咨询。",
      sections: [
        {
          heading: "支持与滥用报告",
          body: [
            "如需帮助、举报滥用或反馈安全问题，请包含相关邮箱地址、邮件 ID、时间戳和简短说明。",
            "紧急滥用报告请提供足够排查的信息，同时避免暴露不必要的个人隐私。",
          ],
        },
        {
          heading: "商务与 API",
          body: [
            "我们欢迎围绕邮件测试、一次性邮箱识别、Webhook 收件箱和开发者流程的有用集成。",
          ],
        },
      ],
      cta: {
        label: "打开 MoeMail",
        href: "/",
      },
    },
    advertise: {
      title: "广告与赞助合作",
      description: "与 MoeMail 合作，触达关注邮件隐私、DNS 健康、邮件投递和开发者邮件测试的人群。",
      sections: [
        {
          heading: "网站受众",
          body: [
            "MoeMail 的访问者通常需要临时收件箱、邮件隐私建议、DNS 排查工具和实用的邮件投递知识。",
            "这个网站适合开发者、独立产品作者、域名持有者、小型企业，以及希望更干净管理邮箱流程的隐私用户。",
          ],
        },
        {
          heading: "适合的合作方",
          body: [
            "适合的合作方向包括邮件服务商、域名注册商、DNS 平台、隐私工具、邮件投递产品、主机服务商和开发者 SaaS 工具。",
            "我们更倾向有用且清晰标注的展示方式，不打断收件箱体验，也不误导访问者点击。",
          ],
        },
        {
          heading: "广告展示原则",
          body: [
            "广告优先放在指南、工具和公开教育内容页面。",
            "我们避免在私人邮件内容、邮件详情或用户正在阅读收件箱内容的位置展示广告。",
          ],
        },
      ],
      cta: {
        label: "联系我们",
        href: "/contact",
      },
    },
    "temporary-email": {
      title: "临时邮箱",
      description: "创建临时邮箱来接收验证码、测试注册流程，并保护你的个人邮箱。",
      sections: [
        {
          heading: "什么是临时邮箱？",
          body: [
            "临时邮箱是在短时间内使用的收件箱，可以避免直接暴露个人邮箱地址。",
            "它适合一次性注册、产品测试、下载表单，以及你还不信任发送方的场景。",
          ],
        },
        {
          heading: "常见用途",
          body: [
            "你可以接收账号验证邮件、测试邮件投递、检查 HTML 邮件内容，或为自动化创建干净的收件箱。",
            "银行、学校、工作、找回账号等长期重要场景，应使用你长期控制的正式邮箱。",
          ],
        },
      ],
      cta: {
        label: "创建临时收件箱",
        href: "/",
      },
    },
    "disposable-email": {
      title: "一次性邮箱",
      description: "使用一次性邮箱减少垃圾邮件、保护身份，并安全测试邮件流程。",
      sections: [
        {
          heading: "一次性邮箱与长期邮箱",
          body: [
            "一次性邮箱适合短期通信，长期邮箱适合身份、找回账号和长期记录。",
            "区分使用不同类型的收件箱，可以减少垃圾邮件，同时保留重要账号的可恢复性。",
          ],
        },
        {
          heading: "最佳实践",
          body: [
            "低信任表单和测试场景可以使用一次性地址；账号所有权重要的服务则应避免使用。",
            "不再需要时，可以删除邮箱或让它自然过期。",
          ],
        },
      ],
    },
    "temporary-email-api": {
      title: "临时邮箱 API",
      description: "使用 MoeMail API 生成收件箱、读取邮件、创建分享链接，并自动化邮件测试流程。",
      sections: [
        {
          heading: "开发者流程",
          body: [
            "临时邮箱 API 可以在测试中创建一次性收件箱、等待验证码邮件，并提取链接或验证码。",
            "它适合 QA 自动化、注册流程测试、Webhook 演示和集成流水线。",
          ],
        },
        {
          heading: "API 访问",
          body: [
            "MoeMail 支持使用 API Key 访问 OpenAPI。随着服务增长，可以继续扩展更高限额和开发者端点。",
          ],
        },
      ],
      cta: {
        label: "查看 API Key",
        href: "/profile",
      },
    },
    "email-privacy": {
      title: "邮件隐私",
      description: "保护收件箱、减少垃圾邮件，并判断何时使用临时邮箱的实用方法。",
      sections: [
        {
          heading: "为什么邮件隐私重要",
          body: [
            "邮箱地址经常会成为网站、订阅、数据经纪和营销系统中的长期身份标识。",
            "区分个人、工作、购物和临时邮箱使用，可以降低暴露范围，让垃圾邮件更容易隔离。",
          ],
        },
        {
          heading: "简单习惯",
          body: [
            "低信任表单使用别名或临时邮箱，重要账号启用双重认证，并避免重复使用密码。",
            "遇到意外邮件时，先检查发件域名和链接再操作。",
          ],
        },
      ],
    },
    "email-testing": {
      title: "邮件测试",
      description: "使用一次性收件箱测试注册流程、验证码邮件、模板和事务邮件投递。",
      sections: [
        {
          heading: "应该测试什么",
          body: [
            "开发者应测试主题、发件人名称、HTML 渲染、纯文本回退、链接、验证码和投递延迟。",
            "一次性收件箱可以让测试邮件远离个人邮箱和生产邮箱。",
          ],
        },
        {
          heading: "自动化思路",
          body: [
            "创建收件箱、提交注册表单、通过 API 轮询邮件、提取验证链接，并自动完成测试。",
          ],
        },
      ],
    },
    "webhook-email-testing": {
      title: "Webhook 邮件测试",
      description: "通过 Webhook 接收邮件事件，并围绕临时收件箱构建自动化。",
      sections: [
        {
          heading: "为什么 Webhook 有用",
          body: [
            "轮询可以工作，但 Webhook 更适合自动化。新邮件到达时，你的应用会收到事件。",
            "Webhook 收件箱适合 QA、演示、低代码工具、代理流程和集成测试。",
          ],
        },
        {
          heading: "应该验证什么",
          body: [
            "可用时验证签名，安全处理重试，只保存必要数据，并避免把邮件内容中的密钥写入日志。",
          ],
        },
      ],
    },
  },
  "zh-TW": {} as Record<TrustAndSeoPageSlug, Omit<MarketingPageContent, "slug">>,
  ja: {} as Record<TrustAndSeoPageSlug, Omit<MarketingPageContent, "slug">>,
  ko: {} as Record<TrustAndSeoPageSlug, Omit<MarketingPageContent, "slug">>,
}

CONTENT["zh-TW"] = {
  about: {
    title: "關於 MoeMail",
    description: "MoeMail 是面向一般使用者、開發者和自動化流程的臨時信箱與郵件測試服務，重視隱私與易用性。",
    sections: [
      {
        heading: "我們在做什麼",
        body: [
          "MoeMail 可以建立一次性收件匣、接收驗證信、分享臨時信箱，並在不暴露個人信箱的情況下測試郵件流程。",
          "服務基於 Cloudflare 基礎設施建置，目標是保持快速、簡單和透明。",
        ],
      },
      {
        heading: "適合誰使用",
        body: [
          "注重隱私的使用者可以用它隔離一次性註冊和低信任表單，減少真實信箱暴露。",
          "開發者可以用它做產品測試、Webhook 流程、API 自動化和臨時收件匣實驗。",
        ],
      },
    ],
  },
  privacy: {
    title: "隱私政策",
    description: "說明 MoeMail 如何處理臨時信箱資料、帳號資訊、Cookie、統計分析和第三方服務。",
    sections: [
      {
        heading: "我們處理的資料",
        body: [
          "MoeMail 會儲存提供服務所需的臨時信箱地址、收到的郵件、帳號識別、API Key 和相關設定。",
          "臨時信箱可能會根據使用者選擇的保留時間自動過期。",
        ],
      },
      {
        heading: "統計與廣告",
        body: [
          "我們可能使用注重隱私的統計分析、Cloudflare 安全能力和廣告合作方來理解流量並支援服務運作。",
          "如果啟用廣告，合作方可能會按照自身政策和適用法律使用 Cookie 或類似技術。",
        ],
      },
    ],
  },
  terms: {
    title: "服務條款",
    description: "MoeMail 臨時信箱、郵件測試、分享、Webhook 和 API 功能的可接受使用條款。",
    sections: [
      {
        heading: "可接受使用",
        body: [
          "請僅將 MoeMail 用於合法用途、隱私保護、軟體測試和正當自動化流程。",
          "不得用於詐騙、垃圾郵件、騷擾、憑證竊取、規避平台規則或任何違法活動。",
        ],
      },
      {
        heading: "服務限制",
        body: [
          "臨時信箱不能替代長期信箱。郵件可能過期、被刪除或變得無法存取。",
          "MoeMail 以盡力服務方式提供，不應用於敏感、金融、醫療、法律或關鍵通信。",
        ],
      },
    ],
  },
  contact: {
    title: "聯絡我們",
    description: "聯絡 MoeMail 取得支援、提交濫用報告、安全問題、商務合作和 API 諮詢。",
    sections: [
      {
        heading: "支援與濫用報告",
        body: [
          "如需協助、舉報濫用或回報安全問題，請包含相關信箱地址、郵件 ID、時間戳和簡短說明。",
          "緊急濫用報告請提供足夠排查的資訊，同時避免暴露不必要的個人隱私。",
        ],
      },
      {
        heading: "商務與 API",
        body: [
          "我們歡迎圍繞郵件測試、一次性信箱識別、Webhook 收件匣和開發者流程的有用整合。",
        ],
      },
    ],
    cta: {
      label: "開啟 MoeMail",
      href: "/",
    },
  },
  advertise: {
    title: "廣告與贊助合作",
    description: "與 MoeMail 合作，觸達關注郵件隱私、DNS 健康、郵件投遞和開發者郵件測試的人群。",
    sections: [
      {
        heading: "網站受眾",
        body: [
          "MoeMail 的訪客通常需要臨時收件匣、郵件隱私建議、DNS 排查工具和實用的郵件投遞知識。",
          "這個網站適合開發者、獨立產品作者、網域持有者、小型企業，以及希望更乾淨管理信箱流程的隱私使用者。",
        ],
      },
      {
        heading: "適合的合作方",
        body: [
          "適合的合作方向包括郵件服務商、網域註冊商、DNS 平台、隱私工具、郵件投遞產品、主機服務商和開發者 SaaS 工具。",
          "我們更傾向有用且清楚標示的展示方式，不打斷收件匣體驗，也不誤導訪客點擊。",
        ],
      },
      {
        heading: "廣告展示原則",
        body: [
          "廣告優先放在指南、工具和公開教育內容頁面。",
          "我們避免在私人郵件內容、郵件詳情或使用者正在閱讀收件匣內容的位置展示廣告。",
        ],
      },
    ],
    cta: {
      label: "聯絡我們",
      href: "/contact",
    },
  },
  "temporary-email": {
    title: "臨時信箱",
    description: "建立臨時信箱來接收驗證碼、測試註冊流程，並保護你的個人信箱。",
    sections: [
      {
        heading: "什麼是臨時信箱？",
        body: [
          "臨時信箱是在短時間內使用的收件匣，可以避免直接暴露個人信箱地址。",
          "它適合一次性註冊、產品測試、下載表單，以及你還不信任寄件方的場景。",
        ],
      },
      {
        heading: "常見用途",
        body: [
          "你可以接收帳號驗證信、測試郵件投遞、檢查 HTML 郵件內容，或為自動化建立乾淨的收件匣。",
          "銀行、學校、工作、找回帳號等長期重要場景，應使用你長期控制的正式信箱。",
        ],
      },
    ],
    cta: {
      label: "建立臨時收件匣",
      href: "/",
    },
  },
  "disposable-email": {
    title: "一次性信箱",
    description: "使用一次性信箱減少垃圾郵件、保護身分，並安全測試郵件流程。",
    sections: [
      {
        heading: "一次性信箱與長期信箱",
        body: [
          "一次性信箱適合短期通信，長期信箱適合身分、找回帳號和長期記錄。",
          "區分使用不同類型的收件匣，可以減少垃圾郵件，同時保留重要帳號的可恢復性。",
        ],
      },
      {
        heading: "最佳實踐",
        body: [
          "低信任表單和測試場景可以使用一次性地址；帳號所有權重要的服務則應避免使用。",
          "不再需要時，可以刪除信箱或讓它自然過期。",
        ],
      },
    ],
  },
  "temporary-email-api": {
    title: "臨時信箱 API",
    description: "使用 MoeMail API 產生收件匣、讀取郵件、建立分享連結，並自動化郵件測試流程。",
    sections: [
      {
        heading: "開發者流程",
        body: [
          "臨時信箱 API 可以在測試中建立一次性收件匣、等待驗證信，並擷取連結或驗證碼。",
          "它適合 QA 自動化、註冊流程測試、Webhook 示範和整合流水線。",
        ],
      },
      {
        heading: "API 存取",
        body: [
          "MoeMail 支援使用 API Key 存取 OpenAPI。隨著服務成長，可以繼續擴展更高限額和開發者端點。",
        ],
      },
    ],
    cta: {
      label: "查看 API Key",
      href: "/profile",
    },
  },
  "email-privacy": {
    title: "郵件隱私",
    description: "保護收件匣、減少垃圾郵件，並判斷何時使用臨時信箱的實用方法。",
    sections: [
      {
        heading: "為什麼郵件隱私重要",
        body: [
          "信箱地址經常會成為網站、訂閱、資料經紀和行銷系統中的長期身分識別。",
          "區分個人、工作、購物和臨時信箱使用，可以降低暴露範圍，讓垃圾郵件更容易隔離。",
        ],
      },
      {
        heading: "簡單習慣",
        body: [
          "低信任表單使用別名或臨時信箱，重要帳號啟用雙重驗證，並避免重複使用密碼。",
          "遇到意外郵件時，先檢查寄件網域和連結再操作。",
        ],
      },
    ],
  },
  "email-testing": {
    title: "郵件測試",
    description: "使用一次性收件匣測試註冊流程、驗證信、範本和交易郵件投遞。",
    sections: [
      {
        heading: "應該測試什麼",
        body: [
          "開發者應測試主旨、寄件人名稱、HTML 渲染、純文字備援、連結、驗證碼和投遞延遲。",
          "一次性收件匣可以讓測試郵件遠離個人信箱和正式環境信箱。",
        ],
      },
      {
        heading: "自動化思路",
        body: [
          "建立收件匣、提交註冊表單、透過 API 輪詢郵件、擷取驗證連結，並自動完成測試。",
        ],
      },
    ],
  },
  "webhook-email-testing": {
    title: "Webhook 郵件測試",
    description: "透過 Webhook 接收郵件事件，並圍繞臨時收件匣建立自動化。",
    sections: [
      {
        heading: "為什麼 Webhook 有用",
        body: [
          "輪詢可以運作，但 Webhook 更適合自動化。新郵件到達時，你的應用會收到事件。",
          "Webhook 收件匣適合 QA、示範、低程式碼工具、代理流程和整合測試。",
        ],
      },
      {
        heading: "應該驗證什麼",
        body: [
          "可用時驗證簽名，安全處理重試，只保存必要資料，並避免把郵件內容中的金鑰寫入日誌。",
        ],
      },
    ],
  },
}

CONTENT.ja = {
  about: {
    title: "MoeMail について",
    description: "MoeMail は、一般ユーザー、開発者、自動化ワークフロー向けのプライバシー重視の一時メール・メールテストサービスです。",
    sections: [
      {
        heading: "何を作っているか",
        body: [
          "MoeMail は使い捨て受信箱の作成、確認メールの受信、一時メールボックスの共有、個人メールを公開しないメールテストを支援します。",
          "Cloudflare インフラ上に構築され、速く、シンプルで、透明なサービスを目指しています。",
        ],
      },
      {
        heading: "誰のためのサービスか",
        body: [
          "プライバシーを重視するユーザーは、一回限りの登録や信頼度の低いフォームから本物のメールを守れます。",
          "開発者は製品テスト、Webhook、API 自動化、一時受信箱の実験に利用できます。",
        ],
      },
    ],
  },
  privacy: {
    title: "プライバシーポリシー",
    description: "MoeMail が一時メールデータ、アカウント情報、Cookie、分析、第三者サービスをどのように扱うかを説明します。",
    sections: [
      {
        heading: "処理するデータ",
        body: [
          "MoeMail はサービス提供に必要な一時メールアドレス、受信メッセージ、アカウント識別子、API Key、設定を保存します。",
          "一時受信箱は、選択された保持期間に応じて自動的に期限切れになることがあります。",
        ],
      },
      {
        heading: "分析と広告",
        body: [
          "トラフィック理解とサービス維持のため、プライバシーに配慮した分析、Cloudflare の安全機能、広告パートナーを利用する場合があります。",
          "広告が有効な場合、パートナーは各自のポリシーと適用法に従って Cookie などを使用することがあります。",
        ],
      },
    ],
  },
  terms: {
    title: "利用規約",
    description: "MoeMail の一時メール、メールテスト、共有、Webhook、API 機能の利用条件です。",
    sections: [
      {
        heading: "許可される利用",
        body: [
          "MoeMail は合法的な目的、プライバシー保護、ソフトウェアテスト、正当な自動化にのみ使用してください。",
          "詐欺、スパム、嫌がらせ、認証情報の窃取、規約回避、違法行為には使用できません。",
        ],
      },
      {
        heading: "サービスの制限",
        body: [
          "一時メールボックスは恒久的なメールアカウントの代替ではありません。メッセージは期限切れ、削除、または利用不可になることがあります。",
          "MoeMail はベストエフォートで提供され、機密性の高い通信や重要な通信には使用しないでください。",
        ],
      },
    ],
  },
  contact: {
    title: "お問い合わせ",
    description: "サポート、不正利用報告、セキュリティ問題、ビジネス相談、API に関する問い合わせはこちらです。",
    sections: [
      {
        heading: "サポートと不正利用報告",
        body: [
          "ヘルプ、不正利用報告、セキュリティ上の懸念がある場合は、関連するメールアドレス、メッセージ ID、時刻、短い説明を含めてください。",
          "緊急の不正利用報告では、不要な個人情報を避けつつ調査に必要な情報を提供してください。",
        ],
      },
      {
        heading: "ビジネスと API",
        body: [
          "メールテスト、使い捨てメール検出、Webhook 受信箱、開発者ワークフローに関する有用な連携を歓迎します。",
        ],
      },
    ],
    cta: {
      label: "MoeMail を開く",
      href: "/",
    },
  },
  advertise: {
    title: "広告掲載とスポンサーシップ",
    description: "メールプライバシー、DNS 健全性、配信到達性、開発者向けメールテストに関心のあるユーザーへ届けます。",
    sections: [
      {
        heading: "オーディエンス",
        body: [
          "MoeMail の訪問者は、一時受信箱、メールプライバシーの知識、DNS トラブルシューティング、実用的な配信ガイドを求めています。",
          "開発者、個人開発者、ドメイン所有者、小規模事業者、メール運用を整理したいプライバシー重視のユーザーに役立ちます。",
        ],
      },
      {
        heading: "相性のよいパートナー",
        body: [
          "メールサービス、ドメイン登録、DNS プラットフォーム、プライバシーツール、配信改善サービス、ホスティング、開発者向け SaaS と相性があります。",
          "訪問者を誤解させず、メールボックス体験を妨げない、明確に表示された有用な掲載を優先します。",
        ],
      },
      {
        heading: "広告掲載の考え方",
        body: [
          "広告はガイド、ツール、教育コンテンツなどの公開ページを中心に掲載します。",
          "個人のメール本文、メッセージ詳細、受信箱の閲覧中に広告を置くことは避けます。",
        ],
      },
    ],
    cta: {
      label: "問い合わせる",
      href: "/contact",
    },
  },
  "temporary-email": {
    title: "一時メール",
    description: "確認コードの受信、登録フローのテスト、個人メールの保護に使える一時メールアドレスを作成します。",
    sections: [
      {
        heading: "一時メールとは？",
        body: [
          "一時メールアドレスは、個人アドレスを公開せず短時間だけ使える受信箱です。",
          "一回限りの登録、製品テスト、ダウンロードフォーム、まだ信頼できない送信者に便利です。",
        ],
      },
      {
        heading: "よくある用途",
        body: [
          "アカウント確認メールの受信、配信テスト、HTML メール確認、自動化用のクリーンな受信箱作成に使えます。",
          "銀行、学校、仕事、アカウント復旧など重要な用途には長期管理できる通常のメールを使ってください。",
        ],
      },
    ],
    cta: {
      label: "一時受信箱を作成",
      href: "/",
    },
  },
  "disposable-email": {
    title: "使い捨てメール",
    description: "使い捨てメールでスパムを減らし、身元を守り、メールワークフローを安全にテストします。",
    sections: [
      {
        heading: "使い捨てメールと恒久メール",
        body: [
          "使い捨てメールは短期通信向けで、恒久メールは身元確認、復旧、長期記録向けです。",
          "用途に応じて受信箱を分けることで、スパムを抑えつつ重要アカウントを復旧可能に保てます。",
        ],
      },
      {
        heading: "ベストプラクティス",
        body: [
          "テストや信頼度の低いフォームには使い捨てアドレスを使い、所有権が重要なサービスでは避けてください。",
          "不要になったら削除するか、期限切れに任せます。",
        ],
      },
    ],
  },
  "temporary-email-api": {
    title: "一時メール API",
    description: "MoeMail API で受信箱生成、メッセージ取得、共有リンク作成、メールテスト自動化を行います。",
    sections: [
      {
        heading: "開発者ワークフロー",
        body: [
          "一時メール API はテスト中に使い捨て受信箱を作成し、確認メールを待ち、リンクやコードを抽出できます。",
          "QA 自動化、オンボーディングテスト、Webhook デモ、統合パイプラインに役立ちます。",
        ],
      },
      {
        heading: "API アクセス",
        body: [
          "MoeMail は認証済み OpenAPI アクセス用の API Key をサポートしています。サービスの成長に合わせて上限や開発者向けエンドポイントを拡張できます。",
        ],
      },
    ],
    cta: {
      label: "API Key を見る",
      href: "/profile",
    },
  },
  "email-privacy": {
    title: "メールプライバシー",
    description: "受信箱を守り、スパムを減らし、一時メールを使うべき場面を判断する実用的な方法です。",
    sections: [
      {
        heading: "メールプライバシーが重要な理由",
        body: [
          "メールアドレスは、Web サイト、ニュースレター、データブローカー、マーケティングシステムで長期的な識別子になりがちです。",
          "個人、仕事、買い物、一時メールを分けると露出を減らし、スパムを隔離しやすくなります。",
        ],
      },
      {
        heading: "簡単な習慣",
        body: [
          "信頼度の低いフォームにはエイリアスや一時受信箱を使い、重要アカウントでは二要素認証を有効にし、パスワードの再利用を避けます。",
          "予期しないメールでは、リンクを操作する前に送信元ドメインを確認してください。",
        ],
      },
    ],
  },
  "email-testing": {
    title: "メールテスト",
    description: "使い捨て受信箱で登録フロー、確認メール、テンプレート、トランザクションメール配信をテストします。",
    sections: [
      {
        heading: "何をテストするか",
        body: [
          "件名、送信者名、HTML 表示、プレーンテキスト、リンク、確認コード、配信時間を確認します。",
          "使い捨て受信箱はテストメールを個人用や本番用メールボックスから切り離します。",
        ],
      },
      {
        heading: "自動化のアイデア",
        body: [
          "受信箱を作成し、登録フォームを送信し、API でメッセージを取得し、確認リンクを抽出してテストを完了します。",
        ],
      },
    ],
  },
  "webhook-email-testing": {
    title: "Webhook メールテスト",
    description: "Webhook でメールイベントを受信し、一時受信箱を中心に自動化を構築します。",
    sections: [
      {
        heading: "Webhook が役立つ理由",
        body: [
          "ポーリングも使えますが、自動化には Webhook の方がきれいです。新しいメッセージが届くとアプリがイベントを受け取ります。",
          "Webhook 受信箱は QA、デモ、ローコードツール、エージェントワークフロー、統合テストに便利です。",
        ],
      },
      {
        heading: "検証すべきこと",
        body: [
          "可能な場合は署名を検証し、リトライを安全に処理し、必要なデータだけ保存し、メール内の秘密情報をログに残さないでください。",
        ],
      },
    ],
  },
}

CONTENT.ko = {
  about: {
    title: "MoeMail 소개",
    description: "MoeMail은 일반 사용자, 개발자, 자동화 워크플로를 위한 개인정보 중심의 임시 이메일 및 메일 테스트 서비스입니다.",
    sections: [
      {
        heading: "우리가 만드는 것",
        body: [
          "MoeMail은 일회용 받은편지함 생성, 인증 메일 수신, 임시 메일함 공유, 개인 메일 노출 없는 메일 테스트를 지원합니다.",
          "Cloudflare 인프라 위에서 빠르고 단순하며 투명한 서비스를 목표로 합니다.",
        ],
      },
      {
        heading: "누구를 위한 서비스인가요",
        body: [
          "개인정보를 중시하는 사용자는 일회성 가입과 신뢰도가 낮은 폼에서 실제 이메일 주소를 보호할 수 있습니다.",
          "개발자는 제품 테스트, Webhook 워크플로, API 자동화, 임시 받은편지함 실험에 사용할 수 있습니다.",
        ],
      },
    ],
  },
  privacy: {
    title: "개인정보 처리방침",
    description: "MoeMail이 임시 이메일 데이터, 계정 정보, 쿠키, 분석, 제3자 서비스를 처리하는 방식을 설명합니다.",
    sections: [
      {
        heading: "처리하는 데이터",
        body: [
          "MoeMail은 서비스 제공에 필요한 임시 이메일 주소, 수신 메시지, 계정 식별자, API Key, 설정을 저장합니다.",
          "임시 받은편지함은 사용자가 선택한 보관 옵션에 따라 자동으로 만료될 수 있습니다.",
        ],
      },
      {
        heading: "분석과 광고",
        body: [
          "트래픽 이해와 서비스 지원을 위해 개인정보를 고려한 분석, Cloudflare 보안 기능, 광고 파트너를 사용할 수 있습니다.",
          "광고가 활성화되면 파트너는 자체 정책과 적용 법률에 따라 쿠키 또는 유사 기술을 사용할 수 있습니다.",
        ],
      },
    ],
  },
  terms: {
    title: "서비스 약관",
    description: "MoeMail 임시 이메일, 메일 테스트, 공유, Webhook, API 기능의 허용 가능한 사용 조건입니다.",
    sections: [
      {
        heading: "허용되는 사용",
        body: [
          "MoeMail은 합법적인 목적, 개인정보 보호, 소프트웨어 테스트, 정당한 자동화 워크플로에만 사용하세요.",
          "사기, 스팸, 괴롭힘, 인증정보 탈취, 플랫폼 규칙 우회, 불법 활동에는 사용할 수 없습니다.",
        ],
      },
      {
        heading: "서비스 제한",
        body: [
          "임시 메일함은 영구 이메일 계정을 대체하지 않습니다. 메시지는 만료, 삭제 또는 접근 불가가 될 수 있습니다.",
          "MoeMail은 최선 노력 기반으로 제공되며 민감하거나 중요한 통신에는 사용하지 마세요.",
        ],
      },
    ],
  },
  contact: {
    title: "문의하기",
    description: "지원, 악용 신고, 보안 문제, 비즈니스 문의, API 질문은 MoeMail에 연락하세요.",
    sections: [
      {
        heading: "지원과 악용 신고",
        body: [
          "도움이 필요하거나 악용을 신고하거나 보안 문제를 발견했다면 관련 이메일 주소, 메시지 ID, 시간, 간단한 설명을 포함하세요.",
          "긴급 신고에는 조사에 필요한 충분한 정보를 제공하되 불필요한 개인정보 노출은 피하세요.",
        ],
      },
      {
        heading: "비즈니스와 API",
        body: [
          "메일 테스트, 일회용 이메일 감지, Webhook 받은편지함, 개발자 워크플로와 관련된 유용한 연동을 환영합니다.",
        ],
      },
    ],
    cta: {
      label: "MoeMail 열기",
      href: "/",
    },
  },
  advertise: {
    title: "광고 및 스폰서십",
    description: "이메일 개인정보 보호, DNS 상태, 전달성, 개발자 메일 테스트에 관심 있는 사용자에게 다가가세요.",
    sections: [
      {
        heading: "방문자",
        body: [
          "MoeMail 방문자는 임시 받은편지함, 이메일 개인정보 보호 안내, DNS 문제 해결 도구, 실용적인 메일 전달 지식을 찾습니다.",
          "개발자, 인디 빌더, 도메인 소유자, 소규모 비즈니스, 더 깔끔한 이메일 흐름을 원하는 개인정보 중심 사용자에게 유용합니다.",
        ],
      },
      {
        heading: "적합한 파트너",
        body: [
          "메일 서비스 제공업체, 도메인 등록기관, DNS 플랫폼, 개인정보 보호 도구, 전달성 제품, 호스팅 제공업체, 개발자 SaaS 도구와 잘 맞습니다.",
          "방문자를 오도하지 않고 메일함 경험을 방해하지 않는, 명확하게 표시된 유용한 배치를 선호합니다.",
        ],
      },
      {
        heading: "광고 배치 원칙",
        body: [
          "광고는 가이드, 도구, 교육 콘텐츠 같은 공개 페이지를 중심으로 배치합니다.",
          "개인 메시지 보기, 메일 상세, 사용자가 받은편지함 내용을 읽는 영역에는 광고 배치를 피합니다.",
        ],
      },
    ],
    cta: {
      label: "문의하기",
      href: "/contact",
    },
  },
  "temporary-email": {
    title: "임시 이메일",
    description: "인증 코드 수신, 가입 흐름 테스트, 개인 이메일 보호를 위해 임시 이메일 주소를 만듭니다.",
    sections: [
      {
        heading: "임시 이메일이란?",
        body: [
          "임시 이메일 주소는 개인 주소를 노출하지 않고 짧은 기간 사용할 수 있는 받은편지함입니다.",
          "일회성 가입, 제품 테스트, 다운로드 폼, 아직 신뢰하지 않는 발신자에게 유용합니다.",
        ],
      },
      {
        heading: "일반적인 사용 사례",
        body: [
          "계정 인증 메일 수신, 메일 전달 테스트, HTML 메일 확인, 자동화를 위한 깨끗한 받은편지함 생성에 사용할 수 있습니다.",
          "은행, 학교, 업무, 계정 복구 등 장기적으로 중요한 용도에는 직접 관리하는 일반 메일함을 사용하세요.",
        ],
      },
    ],
    cta: {
      label: "임시 받은편지함 만들기",
      href: "/",
    },
  },
  "disposable-email": {
    title: "일회용 이메일",
    description: "일회용 이메일 주소로 스팸을 줄이고 신원을 보호하며 메일 워크플로를 안전하게 테스트합니다.",
    sections: [
      {
        heading: "일회용 이메일과 영구 이메일",
        body: [
          "일회용 이메일은 단기 커뮤니케이션용이고, 영구 이메일은 신원, 복구, 장기 기록용입니다.",
          "용도에 맞는 받은편지함을 사용하면 스팸을 줄이면서 중요한 계정의 복구 가능성을 유지할 수 있습니다.",
        ],
      },
      {
        heading: "권장 사용법",
        body: [
          "테스트와 신뢰도가 낮은 폼에는 일회용 주소를 사용하고, 계정 소유권이 중요한 서비스에는 피하세요.",
          "더 이상 필요하지 않으면 삭제하거나 만료되도록 두세요.",
        ],
      },
    ],
  },
  "temporary-email-api": {
    title: "임시 이메일 API",
    description: "MoeMail API로 받은편지함 생성, 메시지 조회, 공유 링크 생성, 메일 테스트 자동화를 수행합니다.",
    sections: [
      {
        heading: "개발자 워크플로",
        body: [
          "임시 이메일 API는 테스트 중 일회용 받은편지함을 만들고 인증 메시지를 기다리며 링크나 코드를 추출할 수 있게 합니다.",
          "QA 자동화, 온보딩 테스트, Webhook 데모, 통합 파이프라인에 유용합니다.",
        ],
      },
      {
        heading: "API 접근",
        body: [
          "MoeMail은 인증된 OpenAPI 접근을 위한 API Key를 지원합니다. 서비스가 성장하면 더 높은 한도와 개발자 엔드포인트를 추가할 수 있습니다.",
        ],
      },
    ],
    cta: {
      label: "API Key 보기",
      href: "/profile",
    },
  },
  "email-privacy": {
    title: "이메일 개인정보 보호",
    description: "받은편지함을 보호하고 스팸을 줄이며 언제 임시 이메일을 사용할지 판단하는 실용적인 방법입니다.",
    sections: [
      {
        heading: "이메일 개인정보가 중요한 이유",
        body: [
          "이메일 주소는 웹사이트, 뉴스레터, 데이터 브로커, 마케팅 시스템에서 오래 지속되는 식별자가 되기 쉽습니다.",
          "개인, 업무, 쇼핑, 임시 이메일 사용을 분리하면 노출을 줄이고 스팸을 격리하기 쉬워집니다.",
        ],
      },
      {
        heading: "간단한 습관",
        body: [
          "신뢰도가 낮은 폼에는 별칭이나 임시 받은편지함을 사용하고, 중요한 계정에는 2단계 인증을 켜고 비밀번호 재사용을 피하세요.",
          "예상치 못한 메시지는 링크를 누르기 전에 발신 도메인을 확인하세요.",
        ],
      },
    ],
  },
  "email-testing": {
    title: "메일 테스트",
    description: "일회용 받은편지함으로 가입 흐름, 인증 메일, 템플릿, 트랜잭션 메일 전달을 테스트합니다.",
    sections: [
      {
        heading: "무엇을 테스트해야 하나요",
        body: [
          "제목, 발신자 이름, HTML 렌더링, 일반 텍스트 대체, 링크, 인증 코드, 전달 시간을 테스트해야 합니다.",
          "일회용 받은편지함은 테스트 트래픽을 개인 또는 운영 메일함에서 분리합니다.",
        ],
      },
      {
        heading: "자동화 아이디어",
        body: [
          "받은편지함을 만들고 가입 폼을 제출한 뒤 API로 메시지를 조회하고 인증 링크를 추출해 테스트를 완료합니다.",
        ],
      },
    ],
  },
  "webhook-email-testing": {
    title: "Webhook 메일 테스트",
    description: "Webhook으로 메일 이벤트를 수신하고 임시 받은편지함 중심의 자동화를 구축합니다.",
    sections: [
      {
        heading: "Webhook이 유용한 이유",
        body: [
          "폴링도 가능하지만 자동화에는 Webhook이 더 깔끔합니다. 새 메시지가 도착하면 앱이 이벤트를 받습니다.",
          "Webhook 받은편지함은 QA, 데모, 로우코드 도구, 에이전트 워크플로, 통합 테스트에 유용합니다.",
        ],
      },
      {
        heading: "검증해야 할 것",
        body: [
          "가능하면 서명을 검증하고 재시도를 안전하게 처리하며 필요한 데이터만 저장하고 메일 내용의 비밀값을 로그에 남기지 마세요.",
        ],
      },
    ],
  },
}

export function getMarketingPageContent(locale: Locale, slug: TrustAndSeoPageSlug): MarketingPageContent {
  const content = CONTENT[locale]?.[slug] || CONTENT[DEFAULT_LOCALE][slug]

  return {
    slug,
    ...content,
  }
}
