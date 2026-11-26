---
term: "JWT signature"
aka: [JWS signature]
definition: "The third part of a JWT, computed over the header and payload with a key. Changing any claim makes it stop matching."
analogy: "A hologram on a ticket that no copy shop can reproduce."
example: "The API returned `401` with `invalid_token`, because the HMAC it computed didn't match the token's signature."
related: [jwt, base64url]
contrasts: []
topic: security
tags: [auth, security]
added: 2026-11-26
---
