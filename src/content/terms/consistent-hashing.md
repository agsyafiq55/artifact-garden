---
term: "Consistent hashing"
aka: [hash ring]
definition: "A way to spread keys across servers so that adding or removing one only moves about 1/N of the keys."
analogy: "Seats around a round table: a new guest only takes plates from the person next to them, not from everyone."
example: "We put the cache nodes on a hash ring, so scaling from 8 to 9 nodes only invalidated ~11% of keys instead of nearly all of them."
related: [virtual-nodes, sharding, rebalancing, cache-stampede]
contrasts: [modulo-hashing]
topic: systems-design
tags: [distributed-systems, caching, scalability]
added: 2026-11-25
---
