---
term: "Authentication"
aka: [authn]
definition: "Checking that a caller is who they claim to be, using a credential such as a password, a cookie or a token. It runs before authorization."
analogy: "A passport check at the airport, which proves who you are but not which plane you may board."
example: "The middleware verifies the JWT's signature and expiry, sets `req.user = 'ana'`, or returns `401 Unauthorized`."
related: [credential, access-token, status-code, openid-connect]
contrasts: [authorization]
topic: security
tags: [auth, http]
added: 2026-11-27
---
