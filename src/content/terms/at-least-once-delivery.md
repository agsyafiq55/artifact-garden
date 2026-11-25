---
term: "At-least-once delivery"
aka: []
definition: "A messaging guarantee that every message arrives, but some may arrive more than once."
analogy: "A courier who re-delivers whenever unsure you got the parcel, so you sometimes get two."
example: "SQS standard queues are at-least-once, so consumers must be idempotent to cope with duplicates."
related: [idempotency, retry-with-backoff]
contrasts: [exactly-once-semantics]
topic: systems-design
tags: [messaging, reliability]
added: 2026-11-25
---
