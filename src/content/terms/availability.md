---
term: "Availability (CAP)"
aka: []
definition: "In CAP, every request to a non-failing node gets a non-error response, even if the data might be stale."
analogy: "A shop that always serves you, even if the price list it's using hasn't been updated yet."
example: "During a partition, an AP database still answers reads and writes on both sides of the split."
related: [cap-theorem, eventual-consistency]
contrasts: [strong-consistency]
topic: systems-design
tags: [distributed-systems]
added: 2026-11-25
---
