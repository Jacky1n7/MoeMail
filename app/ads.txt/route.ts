import { getAdsTxt } from "@/lib/monetization"

export const runtime = "edge"

export function GET() {
  return new Response(getAdsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  })
}
