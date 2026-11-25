---
term: "Virtual nodes"
aka: [vnodes]
definition: "Giving each server many points on the hash ring so keys spread out more evenly."
analogy: "One shop opening several small counters around a market instead of one big stall in a single corner."
example: "Cassandra defaults to multiple `num_tokens` per node so a new node takes a small slice from every peer, not one big slice from a single neighbour."
related: [consistent-hashing, hot-spot, rebalancing]
contrasts: []
topic: systems-design
tags: [distributed-systems, scalability]
added: 2026-11-25
---
