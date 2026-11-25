---
term: "CAP theorem"
aka: [Brewer's theorem]
definition: "When a network partition happens, a distributed data store must choose between consistency and availability."
analogy: "Two bank branches lose their phone line; either stop serving withdrawals (C) or keep serving and risk disagreeing balances (A)."
example: "During a partition, a CP system like etcd rejects writes on the minority side; an AP system like Cassandra accepts them and reconciles later."
related: [network-partition, strong-consistency, eventual-consistency, availability]
contrasts: []
topic: systems-design
tags: [distributed-systems]
added: 2026-11-25
---
