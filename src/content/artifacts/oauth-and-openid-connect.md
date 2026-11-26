---
title: "OAuth 2.0 and OpenID Connect"
summary: "Follow one Log in with PhotoCloud login message by message, then play the attacker who steals the code and see what PKCE and scopes stop."
topic: security
tags: [auth, http, api-design]
created: 2026-11-26
terms: [oauth-2, openid-connect, authorization-server, access-token, scope, id-token, authorization-code-flow, pkce]
prompt: "Create an artifact for OAuth 2.0 and OpenID Connect."
references:
  - title: "Authorization Code Grant"
    publisher: "OAuth 2.0 Simplified"
    url: "https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/"
    kind: article
    note: "A plain walkthrough of each request in the authorization code flow."
  - title: "Authorization vs Authentication"
    publisher: "OAuth 2.0 Simplified"
    url: "https://www.oauth.com/oauth2-servers/openid-connect/authorization-vs-authentication/"
    kind: article
    note: "Why OAuth alone is not a login, and what OpenID Connect adds."
  - title: "RFC 6749: The OAuth 2.0 Authorization Framework"
    publisher: "IETF"
    url: "https://www.rfc-editor.org/rfc/rfc6749.html"
    kind: spec
    note: "The original standard, with the four roles and the authorization code grant."
  - title: "RFC 7636: Proof Key for Code Exchange by OAuth Public Clients"
    publisher: "IETF"
    url: "https://www.rfc-editor.org/rfc/rfc7636.html"
    kind: spec
    note: "The PKCE standard, including the code interception attack it stops."
  - title: "OpenID Connect Core 1.0"
    publisher: "OpenID Foundation"
    url: "https://openid.net/specs/openid-connect-core-1_0.html"
    kind: spec
    note: "The ID token and its claims, defined on top of OAuth 2.0."
  - title: "RFC 9700: Best Current Practice for OAuth 2.0 Security"
    publisher: "IETF"
    url: "https://rfc-editor.org/rfc/rfc9700.html"
    kind: spec
    note: "The current security advice, including PKCE for every client and no implicit flow."
---

**OAuth 2.0 gives an app limited access to your data without your password, and OpenID Connect adds an ID token that says who you are.** The access token goes to the API and the ID token stays with the app. In the authorization code flow, PKCE ties the one-time code to the app that started the login, so a stolen code is useless.
