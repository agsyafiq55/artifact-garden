---
title: "HTTP requests and responses"
summary: "Read the four parts of every HTTP message, step through how a server reads one, then build requests and see which status code each one earns."
topic: backend
tags: [http, api-design]
created: 2026-11-26
terms: [start-line, http-header, message-body, content-type, safe-method, stateless-protocol, http-method, status-code]
prompt: "Create an artifact for HTTP requests and responses."
references:
  - title: "HTTP messages"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages"
    kind: docs
    note: "The four parts of requests and responses, with examples of each."
  - title: "Content-Type header"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type"
    kind: docs
    note: "What the header means in requests and responses, and its common values."
  - title: "HTTP headers"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers"
    kind: docs
    note: "Every standard header, grouped by what it does."
  - title: "Safe (HTTP Methods)"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP"
    kind: docs
    note: "Which methods are safe, and how safe differs from idempotent."
  - title: "RFC 9112: HTTP/1.1"
    publisher: "IETF"
    url: "https://www.rfc-editor.org/rfc/rfc9112.html"
    kind: spec
    note: "The standard for the text layout of HTTP/1.1 messages."
  - title: "RFC 9110: HTTP Semantics"
    publisher: "IETF"
    url: "https://www.rfc-editor.org/rfc/rfc9110.html"
    kind: spec
    note: "The standard behind methods, headers and status codes in every HTTP version."
---

**Every HTTP message has a start line, headers, a blank line and an optional body.** The server reads the headers to learn how to read the body, so a missing or wrong Content-Type earns a 4xx code. GET only reads, and every request carries what the server needs, because HTTP is stateless.
