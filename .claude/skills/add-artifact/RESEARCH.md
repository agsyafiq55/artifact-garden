# Research

Read this before you write any text for an artifact. Research does three jobs:
1. It gets the definitions and facts right.
2. It finds the best explanations and real examples to learn from.
3. It gives the reader 3 to 6 references at the end of the artifact.

## Tools
- Search with `WebSearch` in `standard` mode. Switch to `extended` only when results come back thin or off-topic.
- Read pages with `WebFetch`. Where it is missing, use the `web-fetch` agent. The `exa:search` skill also works when it is connected.
- Some environments block most hosts for fetching, while search still works. Then confirm each reference through a search result that shows its exact URL and title. Say in the report which references you could not open.
- Never write a URL from memory. Every URL you cite must come from a search result or a page you fetched.
- If search and fetch both fail, stop and tell the user in one line. `npm run check` needs at least 2 references.

## Where to look
Rank sources in three tiers. Cite tier 1 and tier 2. Use tier 3 to find better sources.

**Tier 1: the source of truth.**
- Specs and standards: IETF RFCs on `rfc-editor.org`, W3C, WHATWG, ECMAScript, POSIX.
- The official docs of the system: PostgreSQL, Redis, Kafka, Kubernetes, Nginx, AWS, the language's own docs. Link the current version, such as `/docs/current/`.
- The original paper, such as the Raft, Dynamo or MapReduce paper.

**Tier 2: sources that teach well.**
- MDN Web Docs for anything on the web platform.
- Books by known authors, such as "Designing Data-Intensive Applications" by Martin Kleppmann or the free "Operating Systems: Three Easy Pieces".
- University course pages, such as MIT OpenCourseWare or CMU 15-445 for databases.
- Learning centres with strong editing, such as the Cloudflare Learning Center, and martinfowler.com.
- Engineering blogs from the company that built or runs the thing, for real-world examples. Stripe on idempotency keys is one.

**Tier 3: leads only.**
- Wikipedia is good for the standard name and its synonyms. Follow its citations to tier 1.
- Stack Overflow answers point to edge cases. Confirm them in tier 1 before you use them.

**Never use:** content farms, listicles, "top interview questions" sites, AI-written pages, unsourced Medium posts, pages behind a login or paywall, and roadmap.sh. Its licence forbids reuse.

## Steps
1. **Name the concept.** Write its standard name and its synonyms. The synonyms become the term's `aka`.
2. **Find the definition.** Search for `"<term>" definition`, `<term> RFC`, `<term> spec` and `<term> site:<official docs host>`. Read 2 or more sources. When they disagree, follow the spec. If readers will meet both meanings, the page says so in one sentence. "REST" in casual use and in Fielding's thesis is one such case.
3. **Find the best explanation.** Search `<term> explained` and `<term> tutorial`. Pick the 1 or 2 pages that teach best. Note what makes them work: the example they open with, their diagram, the mistake they warn about. Use them for ideas only.
4. **Find a real example.** A real request and response, a config file, a query plan, a log line or a public postmortem. Search `<term> example`, `<term> postmortem` or `<term> in production`.
5. **Collect the mix-ups.** Search `<term> vs` and `<term> common mistakes`. Each mix-up feeds the "Common mix-up" box, a practice question and the term's `contrasts`.
6. **Check every fact.** Each number, default, limit, status code and name on the page traces to a source in your notes. Cut a claim that no source confirms, or hedge it with "may".
7. **Pick the references** for the reader, then record them as below.

Keep notes in the scratchpad as `research-<slug>.md`: each definition as the source words it, with its URL. Don't commit the notes.

## Your own words
Write every sentence and draw every diagram yourself. Never paste a paragraph, and never trace a figure from a source. A definition card restates the idea in plain English. It never copies the spec's sentence.

## Choosing the references
- Pick 3 to 6. Include at least one tier 1 source and at least one page a beginner can read in 10 minutes.
- Open each one, or confirm it through search, and check that it covers what the artifact teaches.
- Use the canonical URL over `https://`. Strip tracking parameters such as `utm_`, and never cite a search redirect or a cache. Prefer the English page, such as `/en-US/` on MDN.
- Order them as the reader should read them: the beginner page first, then the deeper ones, then the spec.

## Recording the references
List them in the artifact's `.md` frontmatter:
```yaml
references:
  - title: "Overview of HTTP"
    publisher: "MDN Web Docs"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
    kind: docs
    note: "A short tour of requests, responses and what HTTP controls."
```
- `kind` is one of `spec`, `docs`, `paper`, `book`, `course`, `article` or `video`.
- `title` is the source's own title. Keep its capitals, but replace curly quotes with straight ones and replace a dash with a comma, because `npm run check` rejects them.
- `note` is optional. It is one sentence on what the reader gets from the source, and it follows `WRITING.md`.

The artifact HTML ends with the same list in its Sources section. The template shows the markup. `npm run check` fails when the two lists differ, when a link lacks `target="_blank"`, or when an artifact has fewer than 2 references. The site shows the list again under the artifact.
