---
term: "Strong consistency"
aka: [linearizability]
definition: "Every read sees the most recent completed write, as if there were a single copy of the data."
analogy: "A single shared whiteboard, where everyone who looks sees the latest scribble."
example: "After `SET x=5` is acknowledged, any client anywhere reading `x` gets 5, never an older value."
related: [cap-theorem]
contrasts: [eventual-consistency]
topic: databases
tags: [distributed-systems, consistency]
added: 2026-11-25
---
