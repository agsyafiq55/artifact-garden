---
title: "REST"
summary: "Learn how REST names resources and uses one set of methods for all of them, then drive an orders API and compare PUT, PATCH, 405 and a verb in the URL."
topic: backend
tags: [http, api-design]
created: 2026-11-26
terms: [rest, resource, representation, uniform-interface, hypermedia, http-method, stateless-protocol, status-code]
prompt: "Create an artifact for REST."
references:
  - title: "REST"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Glossary/REST"
    kind: docs
    note: "A short definition, and a note on how loosely people use the word."
  - title: "Web API Design Best Practices"
    publisher: "Microsoft Azure Architecture Center"
    url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design"
    kind: docs
    note: "Practical rules for resource URLs, methods and collections."
  - title: "Richardson Maturity Model"
    publisher: "martinfowler.com"
    url: "https://martinfowler.com/articles/richardsonMaturityModel.html"
    kind: article
    note: "The steps from one endpoint to resources, methods and hypermedia."
  - title: "405 Method Not Allowed"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/405"
    kind: docs
    note: "When to send 405, and why it needs an Allow header."
  - title: "RFC 5789: PATCH Method for HTTP"
    publisher: "IETF"
    url: "https://rfc-editor.org/rfc/rfc5789.html"
    kind: spec
    note: "The standard for partial changes, and how PATCH differs from PUT."
  - title: "Representational State Transfer, chapter 5"
    publisher: "Roy Fielding, UC Irvine"
    url: "https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm"
    kind: paper
    note: "The dissertation chapter that defined REST and its constraints."
---

**In REST, the URL names a resource and the method names the action.** Every resource answers the same methods with the same meanings, so clients and tools work with any of them. Clients exchange representations such as JSON, follow the links inside them, and send everything the server needs with each request.
