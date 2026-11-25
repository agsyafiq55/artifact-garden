---
term: "Exponential backoff"
aka: [retry with backoff, jittered backoff]
definition: "Retrying a failed call after waits that grow exponentially, usually with random jitter, to avoid overwhelming a struggling service."
analogy: "Knocking on a door, then waiting a little longer before each next knock instead of hammering it."
example: "Retry after 100ms, 200ms, 400ms and 800ms, each plus or minus some random jitter, then give up and return the error."
related: [idempotency, at-least-once-delivery]
contrasts: []
topic: systems-design
tags: [reliability]
added: 2026-11-25
---
