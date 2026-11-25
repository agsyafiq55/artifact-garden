---
title: "Consistent hashing, hands on"
summary: "Add or remove a cache server and count how many keys move, comparing hash % N against a hash ring with virtual nodes."
topic: systems-design
tags: [distributed-systems, caching, scalability]
created: 2026-11-25
terms: [consistent-hashing, virtual-nodes, modulo-hashing, sharding, rebalancing, cache-stampede, hot-spot]
prompt: "Explain consistent hashing interactively."
---

With `hash % N`, changing N reshuffles almost every key. **Consistent hashing puts servers and keys on the same ring, so adding or removing a server only moves the keys in its arc, about 1/N of them.** Virtual nodes give each server many points on the ring, which evens out the load.
