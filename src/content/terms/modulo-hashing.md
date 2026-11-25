---
term: "Modulo hashing"
aka: [hash mod N, "hash % N"]
definition: "Picking a server with hash(key) % N, which reshuffles almost every key whenever N changes."
analogy: "Lockers assigned by counting off the class size, so one new student moves everyone to a different locker."
example: "`server = servers[crc32(key) % len(servers)]` is fine for a fixed pool, but adding one cache box sends most lookups to the wrong node."
related: [sharding, cache-stampede]
contrasts: [consistent-hashing]
topic: systems-design
tags: [distributed-systems, caching]
added: 2026-11-25
---
