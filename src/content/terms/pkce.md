---
term: "PKCE"
aka: [Proof Key for Code Exchange]
definition: "An OAuth add-on where the app sends a hash of a secret at the start and the secret itself to redeem the code, so a stolen code is useless."
analogy: "Leaving a fingerprint of a secret word at the cloakroom, so only someone who knows the word can collect the coat."
example: "The token endpoint returned `invalid_grant`, because the attacker's request had no `code_verifier`."
related: [authorization-code-flow, oauth-2]
contrasts: []
topic: security
tags: [auth, security]
added: 2026-11-26
---
