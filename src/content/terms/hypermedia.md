---
term: "Hypermedia"
aka: [HATEOAS, hypermedia controls]
definition: "Links inside a representation that point to related resources and next actions, so a client follows them instead of building URLs."
analogy: "Signs in a building that point to the next room, so you never need the floor plan."
example: "The order's representation includes `\"links\": {\"self\": \"/orders/7\"}`, so the client never hardcodes the URL pattern."
related: [representation, rest]
contrasts: []
topic: backend
tags: [http, api-design]
added: 2026-11-26
---
