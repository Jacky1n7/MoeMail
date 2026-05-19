import { INDEXNOW_KEY, INDEXNOW_KEY_LOCATION, SITE_HOST, SITE_URL } from "@/config/site"

export type IndexNowPayload = {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

export function createIndexNowPayload(urls: string[]): IndexNowPayload {
  const sitePrefix = `${SITE_URL}/`
  const urlList = [...new Set(urls.filter((url) => url === SITE_URL || url.startsWith(sitePrefix)))]

  return {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  }
}
