import assert from "node:assert/strict"
import {
  buildDmarcRecord,
  buildDnsLookupQuery,
  buildDnsblQueries,
  buildEmailHealthReport,
  buildSpfRecord,
  filterDnsRecords,
  getSpfPresetIncludes,
  parseEmailHeaders,
  SPF_PROVIDER_PRESETS,
  stripTxtQuotes,
} from "../app/lib/email-tools"

const dkimQuery = buildDnsLookupQuery("dkim", "example.com", "google")
assert.deepEqual(dkimQuery, {
  domain: "google._domainkey.example.com",
  type: "TXT",
})

const dmarcQuery = buildDnsLookupQuery("dmarc", "https://example.com/path")
assert.deepEqual(dmarcQuery, {
  domain: "_dmarc.example.com",
  type: "TXT",
})

assert.equal(stripTxtQuotes('"v=spf1 include:_spf.example.com" " ~all"'), "v=spf1 include:_spf.example.com ~all")

const filteredDkim = filterDnsRecords("dkim", [
  { name: "google._domainkey.example.com", type: "TXT", ttl: 300, value: '"v=DKIM1; k=rsa; p=abc123"' },
  { name: "example.com", type: "TXT", ttl: 300, value: '"v=spf1 -all"' },
])
assert.equal(filteredDkim.length, 1)
assert.equal(filteredDkim[0].value, '"v=DKIM1; k=rsa; p=abc123"')

const parsed = parseEmailHeaders(`From: Example Sender <sender@example.com>
To: You <you@example.net>
Subject: Test message
Authentication-Results: mx.example.net;
 spf=pass smtp.mailfrom=example.com;
 dkim=pass header.d=example.com;
 dmarc=pass header.from=example.com
Received: from mail.example.com by mx.example.net;
 Tue, 19 May 2026 10:00:00 +0000
Received: from app.example.com by mail.example.com;
 Tue, 19 May 2026 09:59:58 +0000
Message-ID: <abc123@example.com>
`)

assert.equal(parsed.summary.from, "Example Sender <sender@example.com>")
assert.equal(parsed.summary.subject, "Test message")
assert.equal(parsed.authentication.spf, "pass")
assert.equal(parsed.authentication.dkim, "pass")
assert.equal(parsed.authentication.dmarc, "pass")
assert.equal(parsed.received.length, 2)
assert.equal(parsed.signals.some((signal) => signal.kind === "good" && signal.label === "Authentication passed"), true)

const missingAuth = parseEmailHeaders(`From: Bad <bad@example.com>
Subject: No auth
Received: from unknown by mx.example.net
`)

assert.equal(missingAuth.authentication.spf, "unknown")
assert.equal(missingAuth.signals.some((signal) => signal.kind === "warning" && signal.label === "No SPF pass found"), true)

const spfRecord = buildSpfRecord({
  allowA: true,
  allowMx: true,
  includes: " _spf.google.com,sendgrid.net ",
  ip4: "192.0.2.10, 198.51.100.7",
  all: "~all",
})
assert.equal(spfRecord, "v=spf1 a mx include:_spf.google.com include:sendgrid.net ip4:192.0.2.10 ip4:198.51.100.7 ~all")

const dmarcRecord = buildDmarcRecord({
  policy: "quarantine",
  rua: "dmarc@example.com, mailto:reports@example.net",
  pct: 50,
})
assert.equal(dmarcRecord, "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com,mailto:reports@example.net; pct=50")

const dnsblQueries = buildDnsblQueries("192.0.2.10")
assert.deepEqual(dnsblQueries.slice(0, 2), [
  {
    zone: "zen.spamhaus.org",
    query: "10.2.0.192.zen.spamhaus.org",
  },
  {
    zone: "bl.spamcop.net",
    query: "10.2.0.192.bl.spamcop.net",
  },
])

assert.ok(SPF_PROVIDER_PRESETS.some((preset) => preset.id === "google-workspace" && preset.include === "_spf.google.com"))
assert.ok(SPF_PROVIDER_PRESETS.some((preset) => preset.id === "microsoft-365" && preset.include === "spf.protection.outlook.com"))
assert.ok(SPF_PROVIDER_PRESETS.some((preset) => preset.id === "amazon-ses" && preset.include === "amazonses.com"))
assert.deepEqual(getSpfPresetIncludes(["google-workspace", "sendgrid", "missing"]), ["_spf.google.com", "sendgrid.net"])

const presetSpfRecord = buildSpfRecord({
  allowA: false,
  allowMx: false,
  includes: getSpfPresetIncludes(["google-workspace", "microsoft-365"]).join(","),
  ip4: "",
  all: "~all",
})
assert.equal(presetSpfRecord, "v=spf1 include:_spf.google.com include:spf.protection.outlook.com ~all")

const healthyReport = buildEmailHealthReport({
  mxRecords: [{ name: "example.com", type: "MX", ttl: 300, value: "10 mx.example.com." }],
  spfRecords: [{ name: "example.com", type: "TXT", ttl: 300, value: '"v=spf1 include:_spf.google.com ~all"' }],
  dmarcRecords: [{ name: "_dmarc.example.com", type: "TXT", ttl: 300, value: '"v=DMARC1; p=reject; rua=mailto:dmarc@example.com"' }],
  dkimRecords: [{ name: "default._domainkey.example.com", type: "TXT", ttl: 300, value: '"v=DKIM1; k=rsa; p=abc123"' }],
  blacklistResults: [{ zone: "zen.spamhaus.org", listed: false }],
})
assert.equal(healthyReport.score, 100)
assert.equal(healthyReport.items.every((item) => item.status === "pass"), true)

const riskyReport = buildEmailHealthReport({
  mxRecords: [{ name: "example.com", type: "MX", ttl: 300, value: "10 mx.example.com." }],
  spfRecords: [],
  dmarcRecords: [],
  dkimRecords: [],
  blacklistResults: [{ zone: "zen.spamhaus.org", listed: true }],
})
assert.equal(riskyReport.score, 30)
assert.equal(riskyReport.grade, "poor")
assert.equal(riskyReport.items.some((item) => item.id === "spf" && item.status === "fail"), true)
assert.equal(riskyReport.items.some((item) => item.id === "blacklist" && item.status === "fail"), true)

const duplicateSpfReport = buildEmailHealthReport({
  mxRecords: [{ name: "example.com", type: "MX", ttl: 300, value: "10 mx.example.com." }],
  spfRecords: [
    { name: "example.com", type: "TXT", ttl: 300, value: '"v=spf1 include:_spf.example.com ~all"' },
    { name: "example.com", type: "TXT", ttl: 300, value: '"v=spf1 include:sendgrid.net ~all"' },
  ],
  dmarcRecords: [{ name: "_dmarc.example.com", type: "TXT", ttl: 300, value: '"v=DMARC1; p=none; rua=mailto:dmarc@example.com"' }],
  dkimRecords: [],
})
assert.equal(duplicateSpfReport.items.find((item) => item.id === "spf")?.status, "warning")
assert.equal(duplicateSpfReport.items.find((item) => item.id === "dmarc")?.status, "warning")
