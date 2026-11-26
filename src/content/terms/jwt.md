---
term: "JWT"
aka: [JSON Web Token]
definition: "A token made of a header, a payload of claims and a signature, base64url-encoded and joined by dots. Anyone can read it, and only the key holder can sign it."
analogy: "A festival wristband printed with your name and pass type, sealed with a hologram that only the organiser can make."
example: "Our API checks the JWT's signature and `exp` on every request, so it never queries the sessions table."
related: [claim, jwt-signature, base64url, access-token, id-token, refresh-token]
contrasts: [opaque-token]
topic: security
tags: [auth]
added: 2026-11-26
---
