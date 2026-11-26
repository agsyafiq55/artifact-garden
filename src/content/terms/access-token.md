---
term: "Access token"
aka: [bearer token]
definition: "A string an app sends to an API in the Authorization header to use the access a user approved. It carries a scope and expires."
analogy: "A hotel key card that opens your room and the gym until checkout."
example: "`Authorization: Bearer SlAV32hkKG` lets PrintShop call `GET /v1/photos` for one hour."
related: [scope, http-header, authorization-server]
contrasts: [id-token]
topic: security
tags: [auth, http]
added: 2026-11-26
---
