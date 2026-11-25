---
term: "Idempotency key"
aka: [request id, dedupe key]
definition: "A unique client-generated ID sent with a request so the server can recognise and ignore duplicates."
analogy: "Writing an order number on a cheque so the bank won't cash the same cheque twice."
example: "Stripe accepts an `Idempotency-Key` header and returns the original response if the same key is retried."
related: [idempotency, retry-with-backoff]
contrasts: []
topic: backend
tags: [api-design, payments]
added: 2026-11-25
---
