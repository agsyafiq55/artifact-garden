---
term: "Rebalancing"
aka: [resharding]
definition: "Moving data between nodes when the cluster grows or shrinks, so the load stays even."
analogy: "Redistributing students across classrooms when a new room opens, so no class stays overcrowded."
example: "Adding a Kafka broker doesn't move any partitions to it. You run a partition reassignment to rebalance them onto the new broker."
related: [sharding, consistent-hashing, virtual-nodes]
contrasts: []
topic: systems-design
tags: [distributed-systems, scalability]
added: 2026-11-25
---
