---
term: "Content-Type"
aka: [media type, MIME type]
definition: "The HTTP header that names the format of the message body, such as `application/json`, so the reader knows how to parse it."
analogy: "A note on a document that says which language it is written in, so the reader picks up the right dictionary."
example: "The API returned `415 Unsupported Media Type` because the client sent JSON without `Content-Type: application/json`."
related: [http-header, message-body]
contrasts: []
topic: backend
tags: [http, api-design]
added: 2026-11-26
---
