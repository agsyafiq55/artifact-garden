---
term: "Deny by default"
aka: [default deny]
definition: "A rule that the server refuses every action unless a policy rule allows it, so a new endpoint stays closed until someone opens it."
analogy: "A guest list at a party door, where anyone not on the list stays outside."
example: "The `can()` function checks the admin and owner rules, then ends with `return false;`."
related: [authorization, permission]
contrasts: []
topic: security
tags: [auth, security]
added: 2026-11-27
---
