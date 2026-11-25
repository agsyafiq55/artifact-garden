---
title: "CAP theorem, hands on"
summary: "Cut the link between two replicas and decide whether to stay consistent or stay available."
topic: systems-design
tags: [distributed-systems, consistency]
created: 2026-11-24
terms: [cap-theorem, network-partition, strong-consistency, eventual-consistency, availability]
prompt: "Build an interactive CAP theorem demo with two replicas and a partition switch."
---

CAP is really a statement about **what you give up during a partition**. When the network is healthy you can have both consistency and availability; the choice only bites when nodes can't talk.
