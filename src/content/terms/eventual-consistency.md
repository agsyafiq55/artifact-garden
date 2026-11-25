---
term: "Eventual consistency"
aka: []
definition: "If writes stop, all replicas will eventually converge to the same value, but reads in between may be stale."
analogy: "News spreading through a village: everyone hears it eventually, just not at the same moment."
example: "You update your profile photo, and a friend in another region still sees the old one for a few seconds."
related: [cap-theorem, availability]
contrasts: [strong-consistency]
topic: databases
tags: [distributed-systems, consistency]
added: 2026-11-25
---
