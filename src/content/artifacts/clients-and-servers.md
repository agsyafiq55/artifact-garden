---
title: "Clients and servers"
summary: "Learn what clients and servers do, read a real request and response, then run a restaurant app with two clients and one server."
topic: backend
tags: [http, api-design, client-server]
created: 2026-11-25
terms: [client, server, request-response-model, http-method, status-code, timeout, single-source-of-truth]
prompt: "Create an artifact to study clients and servers, explaining the core concepts before the example."
references:
  - title: "Client-server overview"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview"
    kind: course
    note: "Follows one request from the browser to the server and back, with a worked example."
  - title: "Overview of HTTP"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
    kind: docs
    note: "A short tour of HTTP messages, connections and what the protocol controls."
  - title: "HTTP response status codes"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status"
    kind: docs
    note: "Every standard status code, grouped into its five classes."
  - title: "RFC 9110: HTTP Semantics"
    publisher: "IETF"
    url: "https://www.rfc-editor.org/rfc/rfc9110.html"
    kind: spec
    note: "The standard behind HTTP methods and status codes."
---

**A client asks and a server answers, one request and one response at a time.** The client always starts the conversation. The server holds the shared data, so every client sees the same state. Client and server are roles, so a server becomes a client when it calls another service.
