---
term: "Idempotency"
aka: [idempotent operation]
definition: "An operation is idempotent if doing it once or many times leaves the system in the same state."
analogy: "Pressing a lift's call button five times still brings exactly one lift."
example: "`PUT /users/42 {name: \"Ana\"}` is idempotent. `POST /payments` isn't, unless you add an idempotency key."
related: [idempotency-key, retry-with-backoff, at-least-once-delivery]
contrasts: [exactly-once-semantics]
topic: backend
tags: [api-design, reliability]
added: 2026-11-25
---
