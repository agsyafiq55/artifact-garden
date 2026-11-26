---
term: "ID token"
aka: []
definition: "A signed JWT from OpenID Connect that tells the app who logged in, who issued it, which app it is for and when it expires."
analogy: "The registration slip at a hotel that records who checked in."
example: "We check that the ID token's `aud` is our client ID before we trust its `sub` claim."
related: [openid-connect, authorization-server]
contrasts: []
topic: security
tags: [auth]
added: 2026-11-26
---
