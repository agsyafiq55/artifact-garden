---
term: "OpenID Connect"
aka: [OIDC]
definition: "An identity layer on top of OAuth 2.0. With the `openid` scope, the login also returns an ID token that tells the app who the user is."
analogy: "The guest register at a hotel front desk, kept next to the key cards it hands out."
example: "Our Log in with Google button uses OpenID Connect, so we read the user ID from the ID token's `sub` claim."
related: [id-token, authorization-server]
contrasts: [oauth-2]
topic: security
tags: [auth]
added: 2026-11-26
---
