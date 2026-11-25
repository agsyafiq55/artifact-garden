---
term: "Hot spot"
aka: [hot partition, hot key]
definition: "One node or partition getting far more traffic or data than the others."
analogy: "One checkout lane with a long queue while the other lanes stand empty."
example: "Sharding by `country` made the US shard a hot spot, so we switched to hashing `user_id` instead."
related: [sharding, virtual-nodes]
contrasts: []
topic: systems-design
tags: [distributed-systems, scalability, failure-modes]
added: 2026-11-25
---
