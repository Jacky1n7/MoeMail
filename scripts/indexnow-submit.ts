import sitemap from "../app/sitemap"
import { createIndexNowPayload } from "../app/lib/indexnow"

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

async function main() {
  const payload = createIndexNowPayload(sitemap().map((entry) => entry.url))
  const dryRun = process.argv.includes("--dry-run")

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  })
  const body = await response.text()

  if (!response.ok) {
    throw new Error(`IndexNow submission failed: ${response.status} ${body}`)
  }

  console.log(`Submitted ${payload.urlList.length} URLs to IndexNow: ${response.status}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
