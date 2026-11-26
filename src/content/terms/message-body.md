---
term: "Message body"
aka: [body, payload]
definition: "The optional data after the blank line in an HTTP message, such as an order written as JSON. Headers say its format and length."
analogy: "The contents of a parcel, as opposed to the labels on the outside."
example: "A `POST /orders` request carries `{\"dish\": \"Laksa\"}` as its body, with `Content-Length: 17`."
related: [http-header, content-type, start-line]
contrasts: []
topic: backend
tags: [http]
added: 2026-11-26
---
