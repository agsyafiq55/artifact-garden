---
term: "Cache stampede"
aka: [thundering herd, dog-piling]
definition: "Many requests miss the cache at once and all hit the database together, often overloading it."
analogy: "A shop's shelves empty and every customer rushes the stockroom at the same moment."
example: "When the popular key expired, 5,000 requests recomputed it in parallel; we added request coalescing and jittered TTLs to stop the stampede."
related: [modulo-hashing, consistent-hashing, retry-with-backoff]
contrasts: []
topic: systems-design
tags: [caching, reliability, failure-modes]
added: 2026-11-25
---
