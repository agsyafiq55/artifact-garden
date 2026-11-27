---
title: "Authentication and authorization"
summary: "Follow a request through the authentication and authorization checks, then send requests as different users and turn off the ownership check to see who can delete a photo."
topic: security
tags: [auth, http, api-design]
created: 2026-11-27
terms: [authentication, authorization, credential, permission, deny-by-default, broken-object-level-authorization, status-code, access-token, oauth-2, openid-connect]
prompt: "Authentication and Authorization"
references:
  - title: "Authn vs. authz: How are they different?"
    publisher: "Cloudflare Learning Center"
    url: "https://www.cloudflare.com/learning/access-management/authn-vs-authz/"
    kind: article
    note: "A short beginner page on the two checks and the common ways to do each."
  - title: "HTTP authentication"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/authentication"
    kind: docs
    note: "How the 401 challenge, the WWW-Authenticate header and the Authorization header fit together."
  - title: "Authorization Cheat Sheet"
    publisher: "OWASP"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
    kind: docs
    note: "Deny by default, least privilege and checking permissions on every request."
  - title: "API1:2023 Broken Object Level Authorization"
    publisher: "OWASP API Security Project"
    url: "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/"
    kind: docs
    note: "The top API risk, with attack examples and how to prevent it."
  - title: "RFC 9110: HTTP Semantics"
    publisher: "IETF"
    url: "https://www.rfc-editor.org/rfc/rfc9110.txt"
    kind: spec
    note: "Sections 11 and 15.5 define the authentication headers, 401 and 403."
---

**Authentication finds out who sent a request, and authorization decides what that caller may do to a resource.** A failed authentication returns 401, and a failed authorization returns 403 or 404. A valid token grants no permission by itself, so an API checks the owner or role for every object a request touches, and refuses anything no rule allows.
