---
term: "Broken object level authorization"
aka: [BOLA, IDOR, insecure direct object reference]
definition: "A bug where an API checks who the caller is but not whether they may touch the object named in the request, so changing an id exposes others' data."
analogy: "A hotel key card that opens every room once you are a guest."
example: "Ben sends `DELETE /photos/42` with his own valid token, and the API deletes Ana's photo because it never checked the owner."
related: [authorization, authentication]
contrasts: []
topic: security
tags: [auth, security, api-design]
added: 2026-11-27
---
