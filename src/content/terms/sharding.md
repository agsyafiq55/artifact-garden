---
term: "Sharding"
aka: [horizontal partitioning]
definition: "Splitting one dataset across several machines, with each machine holding only part of it."
analogy: "A library putting books A to M on one floor and N to Z on another, so no single floor holds everything."
example: "We shard the `orders` table by `customer_id`, so each Postgres instance stores roughly a quarter of the customers."
related: [consistent-hashing, rebalancing, hot-spot]
contrasts: []
topic: databases
tags: [distributed-systems, scalability]
added: 2026-11-25
---
