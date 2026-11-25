# Plan: use a roadmap as the template for what to learn

Status: draft for the owner to review. Nothing in `src/`, `public/` or `.claude/` has changed.

## Verdict

**Partly.** The idea works well here. An ordered path of subjects can drive what to build next, show progress, and tie the existing artifacts and terms together. It needs one new content collection, one page and small skill changes. But this site cannot copy roadmap.sh itself. Its licence allows personal use only and forbids publishing its content "in any form", and this repo and site are public. So the plan builds the track from the System Design Primer instead. The Primer is licensed CC BY 4.0, which allows copying with credit. Its topic list is close to the first half of the roadmap.sh System Design roadmap. The owner can still read roadmap.sh privately as a guide.

> **Assumption.** The owner said "this roadmap" with no link. This plan assumes they meant the developer roadmaps at https://roadmap.sh, such as Backend, System Design, Computer Science or DevOps. The section "If you meant a different roadmap" says what changes otherwise.

## What roadmap.sh is

### Structure
- Each roadmap is a drawn diagram. The data behind it is a list of nodes with x and y positions, plus edges.
- Node types include `topic`, `subtopic`, `section`, `label` and layout-only nodes such as `vertical` lines and buttons.
- The System Design roadmap has 27 topics and 120 subtopics. The Backend roadmap has 23 topics and 132 subtopics.
- Order comes from vertical position on the page. No field holds an explicit order. Subtopics sit next to their topic, and edges link only some of them.
- Some roadmaps mark nodes with a legend. Backend uses three markers: "Personal Recommendation / Opinion", "Alternative Option / Pick this or purple" and "Order not strict / Learn anytime". The System Design roadmap has no legend, so every node there has the same weight.
- Each node has a short description and a list of links in the public repo, at `roadmaps/<slug>/content/<node-name>@<node-id>.md`.

### Machine-readable data
- Repo: https://github.com/nilbuild/developer-roadmap. The old address `kamranahmedse/developer-roadmap` redirects there.
- Node descriptions are Markdown files in that repo.
- The diagram itself comes from an undocumented endpoint, `https://roadmap.sh/api/v1-official-roadmap/<slug>`. Their own sync scripts call it. It is not a public, supported API.

### Licence and terms
- **Repo licence.** A custom licence, not an open one. GitHub lists it as "Other". Link: https://github.com/nilbuild/developer-roadmap/blob/master/license. Copyright 2017 to present, Kamran Ahmed.
- What it allows:
  - personal use of the material
  - sharing links to the repository or to roadmap.sh
  - read-only GitHub forks made to contribute back
- What it forbids, without prior consent from the author:
  - publishing the images, project files or content "in any form", including textual and written forms
  - taking content out of the repo and sharing it through another medium, such as a blog or article
- **Site terms.** https://roadmap.sh/terms, last updated 27 March 2025. They limit use to personal, non-commercial use. They forbid reproducing the material or making derivative works. They forbid robots and scripts that access or copy the site. They allow links to the homepage only.

### What this means for artifact-garden
| Action | Allowed? |
| --- | --- |
| The owner reads roadmap.sh to decide what to study | Yes. That is personal use. |
| Copy node names, sections and order into a track file in this public repo | No, not without consent. That publishes their selection and arrangement in text form. |
| Copy node descriptions or resource lists | No. |
| Embed or redraw the diagram | No. |
| Claude fetches the roadmap JSON in each session to pick the next node | No. The terms forbid automated access. |
| Use a common concept name such as "CAP theorem" or "Sharding" | Yes. No one owns the name of an idea. The problem is copying the whole list and its order. |
| Link to roadmap.sh | The licence allows links to the site. The terms say homepage only. A link to `https://roadmap.sh` is safe. |
| Ask the author for consent | Possible. The licence names this route. |

This is a reading of the licence text, not legal advice.

## Which roadmap fits

All 3 artifacts and 17 terms are distributed-systems ideas. I searched four roadmap.sh roadmaps for them.

| Roadmap | Matching nodes | Fit |
| --- | --- | --- |
| System Design | CAP theorem, eventual and strong consistency, availability, replication, sharding, idempotent operations, retry, retry storm, cache-aside | Best. Covers every artifact. |
| API Design | Idempotency, error handling and retries | Good for the idempotency artifact only. |
| Backend | CAP theorem, sharding strategies, data replication, all near the end | Weak. Most of it is languages, tools and AI topics. |
| Computer Science | CAP theorem, sharding, replication, hashing | Weak. Mostly data structures and algorithms. |

**Recommendation.** Start with one track, **Systems design**. Build it from the System Design Primer by Donne Martin, https://github.com/donnemartin/system-design-primer, licensed CC BY 4.0. Its index is the same list the roadmap.sh System Design roadmap uses for its first half. Add a few nodes the Primer lacks, such as consistent hashing, which the Primer lists as "under development", idempotency and delivery guarantees. A second track, **Backend and APIs**, can come later. Write that one in our own words and order, because no open source exists for it.

## Content model

### A new `tracks` collection
One YAML file per track in `src/content/tracks/<slug>.yaml`. Array order is the learning order.

```yaml
title: "Systems design"
summary: "How large systems stay fast, available and correct, one trade-off at a time."
source:
  name: "The System Design Primer"
  author: "Donne Martin"
  url: "https://github.com/donnemartin/system-design-primer"
  license: "CC BY 4.0"
  changes: "Reworded, reordered in places, and extended with nodes marked added."
sections:
  - id: trade-offs
    title: "Trade-offs"
    nodes:
      - id: cap-theorem
        title: "CAP theorem"
        level: core          # core or extra
        added: false         # true when the node is not in the source
        artifacts: [cap-theorem]
        terms: [cap-theorem, network-partition, availability]
```

Schema notes:
- `artifacts` uses `reference('artifacts')` and `terms` uses `reference('terms')`. A typo then fails `npm run check`, as `related` does today.
- Node `id` is unique within a track. A node's full key is `<track>/<node>`, such as `systems-design/sharding`.
- `level: core` is the main path. `level: extra` is skippable. This replaces the roadmap.sh legend colours.
- No description field on nodes. Descriptions live in term cards and artifacts, which already follow `WRITING.md`.

### Which side holds the links
The track file holds them. Artifact and term schemas stay unchanged. Reasons:
- One file to edit when Claude places new work on the path.
- No change to the two schemas the redesign may also touch.
- An artifact or term can sit on more than one node, or on none.

### Progress
Each node gets one status. The build computes the first three. The browser adds the fourth.

| Status | Rule | Where it is computed |
| --- | --- | --- |
| Not started | No artifact and no terms linked | Build |
| Has terms | At least one term, no artifact | Build |
| Has artifact | At least one artifact | Build |
| Learned | Has an artifact, and every linked term has a flashcard interval of 7 days or more | Browser, from the existing `artifact-garden:srs:v1` store |

"Learned" lives in one browser's local storage. Claude cannot see it, and clearing site data resets it. So Claude's "next" logic uses the build statuses only.

### Topics stay
Nodes sit beside the fixed topic list. They do not replace it. A topic says what kind of thing a concept is. A track says when to learn it. The two answer different questions, and the glossary, graph colours and filters already depend on topics.

## Workflow changes

### `/add-artifact next`
1. Read the track file. If there is more than one track and none was named, ask which one in one line.
2. Pick the first `core` node whose status is "not started" or "has terms". Skip `extra` nodes unless the user says `next extra`.
3. Reply in one line, such as "Next on Systems design: Replication. Build it?" Wait for yes, or a node name.
4. Build the artifact as today.
5. After the user approves terms, add the artifact slug and the kept term slugs to that node.
6. Commit with the usual message, `add: <title> (+N terms)`.

### `/add-artifact <concept>`
Unchanged, plus one line in the term reply: "Track: Systems design, node Sharding. Reply 'no track' to skip." If no node fits, offer to add one marked `added: true`, or leave the artifact off the track.

### `/add-term`
Unchanged, plus an optional node suggestion in the confirm step. Terms off the track are fine.

### Status
`/add-artifact status` prints the next 3 core nodes and a count, such as "6 of 35 nodes have an artifact." This avoids a new skill.

### Rules for Claude
- Never fetch roadmap.sh data in a workflow.
- Never copy roadmap.sh descriptions into any file.
- Node titles follow `WRITING.md`, sentence case.

## Pages

Keep it small. One new page and two small additions.

1. **New: `/tracks/<slug>`.** Sections in order. Each node is one row with its title, a status chip, and links to its artifact and terms. The first unfinished core node shows "Next". `extra` nodes are visible but quieter. A footer credits the Primer with title, author, source link, licence link and the change note, as CC BY 4.0 requires. A small script reads the flashcard store and upgrades rows to "Learned".
2. **Home page.** One line: "Next on Systems design: Replication", linking to the track page, plus the count.
3. **Artifact page.** One line: "Part of Systems design, Databases section", with links to the previous and next nodes.

No change to the glossary, review page or graph in the first pass. The graph could later cluster by track.

## Mapping of existing content

Node names below are our own wording on the Primer's order. "Added" means the Primer has no node for it. The last column says whether roadmap.sh System Design has a similar node, for reference only.

### Artifacts
| Artifact | Track node | Section | Added? | On roadmap.sh System Design? |
| --- | --- | --- | --- | --- |
| `cap-theorem` | CAP theorem | Trade-offs | No | Yes |
| `consistent-hashing` | Consistent hashing | Databases | Yes | No |
| `idempotency` | Idempotency and retries | Communication | Yes | Yes, as idempotent operations and retry |

### Terms
| Term | Track node | Section | Added? |
| --- | --- | --- | --- |
| `cap-theorem` | CAP theorem | Trade-offs | No |
| `network-partition` | CAP theorem | Trade-offs | No |
| `availability` | CAP theorem | Trade-offs | No |
| `strong-consistency` | Strong consistency | Consistency patterns | No |
| `eventual-consistency` | Eventual consistency | Consistency patterns | No |
| `sharding` | Sharding | Databases | No |
| `hot-spot` | Sharding | Databases | No |
| `rebalancing` | Sharding | Databases | No |
| `consistent-hashing` | Consistent hashing | Databases | Yes |
| `virtual-nodes` | Consistent hashing | Databases | Yes |
| `modulo-hashing` | Consistent hashing | Databases | Yes |
| `cache-stampede` | When to update the cache | Caching | No |
| `at-least-once-delivery` | Delivery guarantees | Asynchronism | Yes |
| `exactly-once-semantics` | Delivery guarantees | Asynchronism | Yes |
| `idempotency` | Idempotency and retries | Communication | Yes |
| `idempotency-key` | Idempotency and retries | Communication | Yes |
| `retry-with-backoff` | Idempotency and retries | Communication | Yes |

Result: 7 nodes get content. CAP theorem, Consistent hashing and Idempotency and retries reach "has artifact". Strong consistency, Eventual consistency, Sharding, When to update the cache and Delivery guarantees reach "has terms".

### Draft section list
Taken from the Primer index, reworded, about 35 core nodes.

1. Trade-offs: performance and scalability, latency and throughput, CAP theorem
2. Consistency patterns: weak, eventual, strong
3. Availability patterns: fail-over, replication, availability in numbers
4. Traffic: DNS, CDN, load balancer, reverse proxy
5. Application layer: microservices, service discovery
6. Databases: leader-follower replication, multi-leader replication, federation, sharding, consistent hashing (added), denormalization, SQL tuning, NoSQL store types, SQL or NoSQL
7. Caching: cache layers, when to update the cache
8. Asynchronism: message queues, task queues, back pressure, delivery guarantees (added)
9. Communication: HTTP, TCP and UDP, RPC and REST, idempotency and retries (added)
10. Security basics
11. Practice, all `extra`: back-of-the-envelope maths, latency numbers, design a URL shortener

## Implementation steps

Do these after the redesign lands, because steps 4 to 6 touch pages and styles. Each step ends with `npm run check` passing.

1. **Confirm decisions.** The owner answers the open questions below. Done when the answers are written at the top of this file.
2. **Add the schema.** Add the `tracks` collection to `src/content.config.ts` with a glob loader for `*.yaml`. Done when the check passes with one stub track file.
3. **Write the track file.** Create `src/content/tracks/systems-design.yaml` from the draft section list, with the `source` block. Link the 3 artifacts and 17 terms from the mapping tables. Done when the check passes, and a deliberate typo in a term slug makes it fail.
4. **Add status logic.** Create `src/lib/tracks.ts` with `nodeStatus()` and `nextNode()`. Done when a build log or test prints the 7 linked nodes with the statuses above, and `nextNode()` returns "Performance and scalability".
5. **Add the track page.** Create `src/pages/tracks/[slug].astro`. Done when it renders at 375px in light and dark mode, shows the credit footer, and a reviewed term flips its row to "Learned".
6. **Add the two one-line links.** Home page and artifact page. Done when both links resolve in the build.
7. **Extend the validator.** Make `scripts/validate-artifacts.mjs` run the writing rules over node titles and reject duplicate node ids. Done when a node title with an em dash fails the check.
8. **Update the skills.** Add `next`, `status` and the node-linking step to `.claude/skills/add-artifact/SKILL.md`. Add the optional node step to `add-term`. Add the tracks path to the table in `CLAUDE.md`. Done when a dry run of `/add-artifact next` proposes the right node and touches only the track file and the new artifact.
9. **Commit** as `fix: add learning tracks` after the check passes.

## Risks

- **Licence drift.** A later session may paste roadmap.sh text into the track. The skill rule above and the source block guard against this. The validator could also reject `roadmap.sh` URLs other than the homepage.
- **Long path.** About 35 core nodes at one artifact per session is months of work. It may start to feel like homework. The `extra` level and free skipping keep it light.
- **"Learned" is fragile.** It depends on one browser's local storage. A new phone or cleared data shows everything as unlearned. Build statuses still show.
- **Primer age.** Parts of the Primer are dated and interview-focused. The `added` nodes fill the gaps, and the owner can reorder freely.
- **Merge clash with the redesign.** Steps 4 to 6 touch layout and pages. Wait for the redesign to merge.
- **Attribution.** CC BY 4.0 needs title, author, source, licence link and a note of changes on the page that shows the track. Missing it breaks the licence.

## Open questions for the owner

1. Did you mean roadmap.sh? If yes, which roadmap? If not, send the link.
2. Is a Primer-based track with our own wording acceptable, or do you want to ask roadmap.sh's author for consent to use theirs?
3. One track to start, Systems design, or two, adding Backend and APIs?
4. What counts as "learned"? The draft rule is an artifact plus every linked term at a 7-day flashcard interval.
5. Should `next` follow the order strictly, or offer the next 3 core nodes to choose from?
6. Link to roadmap.sh from the site at all? The terms allow the homepage only.

## If you meant a different roadmap

| Kind of roadmap | What changes |
| --- | --- |
| Another roadmap.sh roadmap, such as DevOps or Backend | Same licence. Write the track in our own words and order. Read roadmap.sh privately. |
| An openly licensed list, such as the System Design Primer (CC BY 4.0) or OSSU Computer Science (MIT) | Copy names and order directly. Add the credit footer the licence asks for. |
| A list you wrote, or a course syllabus you own | Import it as is. Drop the `source` block. |
| A company or paid course roadmap | Treat it like roadmap.sh. Keep it out of the public repo, or write our own version. |
| A roadmap with explicit priorities, such as "must know" and "nice to have" | Map those to `level: core` and `level: extra`. Add a third level only if needed. |

The content model, pages and workflow stay the same in every case. Only the track file and its `source` block change.
