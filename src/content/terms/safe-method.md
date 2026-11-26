---
term: "Safe method"
aka: []
definition: "An HTTP method that asks the server only to read, such as GET, HEAD or OPTIONS, so browsers, caches and crawlers may send it freely."
analogy: "Looking at a shop's window display, which changes nothing inside the shop."
example: "Never put a delete action behind a `GET` link, because crawlers treat `GET` as a safe method and follow every link."
related: [http-method]
contrasts: []
topic: backend
tags: [http, api-design]
added: 2026-11-26
---
