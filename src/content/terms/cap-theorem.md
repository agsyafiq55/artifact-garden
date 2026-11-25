---
term: "CAP theorem"
aka: [Brewer's theorem]
definition: "When a network partition happens, a distributed data store must choose between consistency and availability."
analogy: "Two bank branches lose their phone line. They either stop serving withdrawals to stay consistent, or keep serving and risk different balances to stay available."
example: "During a partition, a CP system like etcd rejects writes on the minority side. An AP system like Cassandra accepts them and reconciles later."
related: [network-partition, strong-consistency, eventual-consistency, availability]
contrasts: []
topic: systems-design
tags: [distributed-systems]
added: 2026-11-25
---
