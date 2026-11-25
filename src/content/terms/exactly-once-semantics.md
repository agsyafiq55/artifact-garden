---
term: "Exactly-once semantics"
aka: [EOS, effectively-once]
definition: "Each message's effect is applied exactly once, built from at-least-once delivery plus idempotent or transactional processing."
analogy: "The courier may knock twice, but you only sign for and unpack the parcel once."
example: "Kafka achieves exactly-once processing with idempotent producers and transactions, not by never redelivering."
related: [idempotency]
contrasts: [at-least-once-delivery]
topic: systems-design
tags: [messaging]
added: 2026-11-25
---
