---
term: "Refresh token"
aka: []
definition: "A long-lived token an app sends only to the login server's token endpoint, to get a new access token when the old one expires."
analogy: "A season pass you show at the box office to get today's ticket."
example: "When the API answers `401` for an expired token, the app posts `grant_type=refresh_token` to `/token`."
related: [access-token, jwt]
contrasts: [access-token]
topic: security
tags: [auth]
added: 2026-11-26
---
