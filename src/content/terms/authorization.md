---
term: "Authorization"
aka: [authz, access control]
definition: "Deciding whether a known caller may take an action on a resource, by checking a policy such as ownership or role. It runs after authentication."
analogy: "A boarding pass, which says which plane you may board once the passport check is done."
example: "`if (photo.ownerId !== user.id && user.role !== 'admin') return res.status(403).end();`"
related: [permission, deny-by-default, scope, oauth-2]
contrasts: [authentication]
topic: security
tags: [auth, api-design]
added: 2026-11-27
---
