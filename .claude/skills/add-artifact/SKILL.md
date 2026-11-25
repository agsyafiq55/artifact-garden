---
name: add-artifact
description: Create a new interactive artifact for the artifact-garden site, place it on the Backend roadmap, extract vocabulary terms for the user to approve, then validate, commit to main and push. Use when the user asks to add, make, save or build an artifact, explainer, demo or visualisation of a concept, asks what to learn next or for roadmap progress, or runs /add-artifact (also /add-artifact next and /add-artifact status).
---

# Add an artifact

The user is usually on their phone. Keep messages short, use numbered lists, and never ask them to edit files.

`$ARGUMENTS` is what to explain or build. It may also be pasted HTML, or a description of an artifact the user made elsewhere. If it is empty, ask in one line which concept they want.

## The roadmap
`src/content/tracks/backend.yaml` is the Backend roadmap: ordered sections of nodes. A node has an `id`, a `title`, a `level` (`core` or `extra`), and the `artifacts` and `terms` placed on it. A core node with no artifact is unfinished.

- **`$ARGUMENTS` is `status`:** read the track file, then reply in two lines: how many core nodes have an artifact out of the total, and the next 3 unfinished core nodes in order. Do nothing else.
- **`$ARGUMENTS` is `next`:** find the first 3 unfinished core nodes in order. Reply in one line, such as "Next on Backend: Clients and servers. Build it, or pick HTTP requests and responses or DNS?" Then end your turn. When the user answers, build that node's concept as the artifact, and remember the node for step 4.
- **Anything else:** after you build the artifact, find the node it belongs to. Add one line to the step 3 reply: "Roadmap: <section>, <node title>. Reply 'no roadmap' to skip." If no node fits, say "Roadmap: no node fits. Reply 'add node <title> to <section>' to add one."

Rules for the roadmap:
- The roadmap is written in our own words and order. Never fetch roadmap.sh, and never copy its node names, order or descriptions into any file. Its licence forbids publishing its content.
- Node titles follow `WRITING.md`. New node ids are kebab-case and unique in the track.

## 1. Sync
```bash
git checkout main 2>/dev/null || true
git pull --ff-only origin main
npm ci --silent   # skip this when node_modules already exists
```

## 2. Build the artifact
Read `.claude/skills/add-artifact/WRITING.md` before you write any text. Every word the reader sees follows it.

- Choose a kebab-case `slug` that `public/artifacts/` doesn't already use.
- Copy `templates/artifact-template.html` to `public/artifacts/<slug>.html` and build the artifact inside it.
  - If the user pasted their own HTML, adapt it into the template. Keep its behaviour, and replace its colors and fonts with the template's tokens.
- **Teach first, then let them try.** The reader may know nothing about the concept. Never open with the demo. Every artifact has these four parts, in this order, using the template's sections and contents list:
  1. **The idea.** The intro says in 2 or 3 sentences what the concept is and where the reader meets it. Then explain the core concepts in plain words, and bold each key term where you first define it. Give one everyday analogy.
  2. **How it works.** Walk through the mechanism step by step with a small inline SVG diagram. Show a real example wherever one exists: a request and response, a query, a config, a log line, a table of cases.
  3. **Try it.** The interactive part, introduced by one sentence and a short numbered list of things to try. Its messages respond to what the reader did and name the concept at work, using the terms from parts 1 and 2.
  4. **Check yourself.** 3 to 5 points to remember, and 3 or 4 questions with tap-to-reveal answers in `<details>`. At least one question applies the idea to a new situation instead of repeating the page.
- A good artifact also meets these rules:
  - Every new term in the interactive part was already explained above it.
  - It works at 375px wide. It uses one column and tap targets of at least 44px. It has no hover-only interactions and no sideways scroll.
  - It supports light and dark mode through the CSS variables, and it keeps the template's `applyThemeFromQuery()` function and call.
  - External files come only from cdnjs.cloudflare.com, cdn.jsdelivr.net, unpkg.com, esm.sh and Google Fonts, pinned to exact versions. Prefer vanilla JS.
- Write `src/content/artifacts/<slug>.md`:
  ```yaml
  ---
  title: "<Title>"
  summary: "<one sentence of at most 200 characters that says what the reader will try>"
  topic: <one topic id from CLAUDE.md>
  tags: [<2 to 4 kebab-case tags, reusing existing ones>]
  created: <today as YYYY-MM-DD>
  terms: []
  prompt: "<the user's request, lightly cleaned up>"
  ---

  <2 to 4 sentences of notes that state the key takeaway in plain words. Bold the core idea.>
  ```
  Leave `terms` empty for now. Step 4 fills it.

## 3. Propose terms, then stop and wait
- First, reread the artifact's visible text, its script messages, the summary and the notes against `WRITING.md`. Fix every sentence that breaks a rule.
- List the existing terms with `ls src/content/terms/`, and read any that may overlap.
- Pick 3 to 8 terms that the artifact teaches or relies on. Prefer the words a working engineer uses in a design review over trivial ones.
- Reply in exactly this shape, then end your turn:

```
Artifact ready: <title>, <topic>

Terms. Reply with e.g. "keep 1,3,4" or "all". Edits are welcome.
1. **Idempotency key** (new): A unique client-generated ID that lets the server spot duplicate requests.
   Like: writing an order number on a cheque so the bank can't cash it twice.
2. **Exactly-once semantics** (already have, will link)
...
```

Mark existing terms `already have, will link`. Keeping one links it to the artifact and leaves its file unchanged.

## 4. Write the approved terms
For each new term the user kept, create `src/content/terms/<term-slug>.md`:
```yaml
---
term: "<Display Name>"
aka: []
definition: "<one line of plain English, at most 180 characters>"
analogy: "<an everyday, non-technical comparison>"
example: "<a real usage sentence or snippet, with code in `backticks`>"
related: [<existing or new term slugs>]
contrasts: [<terms people mix it up with>]
topic: <topic id>
tags: [<kebab-case tags>]
added: <today as YYYY-MM-DD>
---
```
- `aka` lists synonyms and abbreviations, and it may stay empty.
- Then set `terms: [...]` in the artifact's `.md` file to every kept term slug, new and existing.
- Write `definition`, `analogy` and `example` to `WRITING.md`, and reread each card against it before you save it.
- Link every true relation. `related` means one term helps explain the other. `contrasts` means people mix the two up.
- Unless the user said "no roadmap", add the artifact's slug to that node's `artifacts` list in `src/content/tracks/backend.yaml`, and add every kept term slug to its `terms` list. A node written in flow style, like `{ id: dns, title: "DNS" }`, becomes block style when it gains lists.

## 5. Check
```bash
npm run check
```
If it fails, read the error, fix it, and run it again. Never commit while it fails. These are the common failures:
- unquoted YAML that contains `: `
- a `related` slug with no term file
- a relative `src` in the HTML
- a track node that names a slug with no file

## 6. Commit and push
```bash
git add -A
git commit -m "add: <title> (+<N new> terms)"
git push origin HEAD:main
```
Some Claude Code web sessions may only push to their own branch. If the push to main is rejected, do this instead:
1. Push the current branch with `git push -u origin HEAD`.
2. If `gh` is available, run `gh pr create --fill --base main`, then `gh pr merge --squash --delete-branch`.
3. Otherwise, give the user the PR or compare link and say one line: "Tap Merge in the GitHub app to publish."

## 7. Report
Keep the report to two lines:
```
Published, live in about a minute: https://agsyafiq55.github.io/artifact-garden/a/<slug>
N new terms and M linked terms are in today's review. Next on the roadmap: <next unfinished core node>.
```
