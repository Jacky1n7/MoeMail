import Script from "next/script"
import { AD_PLACEMENTS, ADSENSE_CLIENT, isAdSenseConfigured, type MonetizationPlacement } from "@/lib/monetization"
import { cn } from "@/lib/utils"

export function AdSlot({
  placement,
  className,
}: {
  placement: MonetizationPlacement
  className?: string
}) {
  const slot = AD_PLACEMENTS[placement]

  if (!isAdSenseConfigured(ADSENSE_CLIENT, slot)) {
    return null
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-950", className)}>
      <Script
        id="adsense-script"
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id={`adsense-push-${placement}-${slot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  )
}
