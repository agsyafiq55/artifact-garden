---
title: "Why retries need idempotency"
summary: "Tap \"Pay\" on a flaky network and watch duplicate charges appear, then fix it with an idempotency key."
topic: backend
tags: [api-design, reliability, payments]
created: 2026-11-25
terms: [idempotency, idempotency-key, retry-with-backoff, at-least-once-delivery, exactly-once-semantics]
prompt: "Make an interactive demo showing why payment APIs need idempotency keys when clients retry."
---

**Retries are only safe if the operation is idempotent.** A timeout doesn't tell the client whether the server did the work. So the client retries, and the server has to recognise the retry.
