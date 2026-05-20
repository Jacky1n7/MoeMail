import assert from "node:assert/strict"
import {
  AD_PLACEMENTS,
  getAdsTxt,
  getAdSensePublisherId,
  isAdSenseConfigured,
  MONETIZATION_CARDS,
} from "../app/lib/monetization"

assert.equal(getAdSensePublisherId("ca-pub-1234567890123456"), "pub-1234567890123456")
assert.equal(getAdSensePublisherId("pub-1234567890123456"), "pub-1234567890123456")
assert.equal(getAdSensePublisherId("not-valid"), "")

assert.equal(
  getAdsTxt("ca-pub-1234567890123456"),
  "google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n"
)
assert.match(getAdsTxt(""), /NEXT_PUBLIC_ADSENSE_CLIENT/)
assert.equal(isAdSenseConfigured("ca-pub-1234567890123456", "1234567890"), true)
assert.equal(isAdSenseConfigured("ca-pub-1234567890123456", ""), false)

assert.deepEqual(Object.keys(AD_PLACEMENTS).sort(), ["guide", "home", "tool"])
assert.ok(MONETIZATION_CARDS.home.length >= 1)
assert.ok(MONETIZATION_CARDS.tool.some((card) => card.href === "/tools/email-dns-health-check"))
assert.ok(MONETIZATION_CARDS.guide.some((card) => card.href === "/tools/email-dns-health-check"))
