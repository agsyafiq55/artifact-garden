---
title: "CAP theorem, hands on"
summary: "Cut the link between two replicas and decide whether to stay consistent or stay available."
topic: systems-design
tags: [distributed-systems, consistency]
created: 2026-11-24
terms: [cap-theorem, network-partition, strong-consistency, eventual-consistency, availability]
prompt: "Build an interactive CAP theorem demo with two replicas and a partition switch."
---

CAP describes **what a distributed store gives up during a partition**. While the network is healthy, a store can be both consistent and available. It has to choose only when its nodes can't reach each other.
