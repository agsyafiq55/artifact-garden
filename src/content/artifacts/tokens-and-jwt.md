---
title: "Tokens and JWT"
summary: "Take a real JWT apart, follow the checks an API runs on it, then try to forge an admin token by editing claims, guessing keys and stripping the signature."
topic: security
tags: [auth, http]
created: 2026-11-26
terms: [jwt, claim, jwt-signature, base64url, opaque-token, refresh-token, access-token, stateless-protocol]
prompt: "Create an artifact for tokens and JWT."
references:
  - title: "Introduction to JSON Web Tokens"
    publisher: "jwt.io"
    url: "https://jwt.io/introduction"
    kind: article
    note: "A short tour of the three parts, with a decoder you can paste tokens into."
  - title: "JSON Web Token Cheat Sheet"
    publisher: "OWASP"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html"
    kind: docs
    note: "The common attacks on JWTs and how to defend against each, including revocation."
  - title: "Refreshing Access Tokens"
    publisher: "OAuth 2.0 Simplified"
    url: "https://www.oauth.com/oauth2-servers/access-tokens/refreshing-access-tokens"
    kind: article
    note: "How a client trades a refresh token for a new access token."
  - title: "RFC 7519: JSON Web Token (JWT)"
    publisher: "IETF"
    url: "https://www.rfc-editor.org/info/rfc7519/"
    kind: spec
    note: "The JWT standard and its registered claims."
  - title: "RFC 7515: JSON Web Signature (JWS)"
    publisher: "IETF"
    url: "https://www.rfc-editor.org/rfc/rfc7515.html"
    kind: spec
    note: "How the header, payload and signature are encoded and signed."
  - title: "RFC 8725: JSON Web Token Best Current Practices"
    publisher: "IETF"
    url: "https://rfc-editor.org/rfc/rfc8725.html"
    kind: spec
    note: "The checks every API should make, such as fixing the algorithm and validating aud."
---

**A JWT is a header, a payload of claims and a signature, and anyone can read the claims but only the key holder can sign them.** An API checks the algorithm, the signature and the expiry before it trusts any claim, with no database lookup. That makes a JWT hard to revoke early, so access tokens expire fast and a refresh token gets new ones.
