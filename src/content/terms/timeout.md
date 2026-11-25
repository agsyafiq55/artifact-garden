---
term: "Timeout"
aka: []
definition: "How long a client waits for a response before it gives up and reports an error."
analogy: "Hanging up after the phone has rung for a minute with no answer."
example: "The payment call has a 3 second timeout. When it fires, the client can't tell whether the charge went through, so the retry needs an idempotency key."
related: [request-response-model, retry-with-backoff, idempotency-key]
contrasts: []
topic: systems-design
tags: [reliability, failure-modes]
added: 2026-11-25
---
