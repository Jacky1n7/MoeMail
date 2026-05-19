import assert from "node:assert/strict"
import {
  buildDnsLookupQuery,
  filterDnsRecords,
  parseEmailHeaders,
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
