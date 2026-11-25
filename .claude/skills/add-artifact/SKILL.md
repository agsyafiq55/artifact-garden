---
name: add-artifact
description: Create a new interactive artifact for the artifact-garden site, extract vocabulary terms for the user to approve, then validate, commit to main and push. Use when the user asks to add, make, save or build an artifact, explainer, demo or visualisation of a concept, or runs /add-artifact.
---

# Add an artifact

The user is usually on their phone. Keep messages short, use numbered lists, and never ask them to edit files.

`$ARGUMENTS` is what to explain or build. It may also be pasted HTML, or a description of an artifact the user made elsewhere. If it is empty, ask in one line which concept they want.

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
- A good artifact here meets these rules:
  - **The reader acts first.** They toggle, step, drag or break something and watch the concept happen. Static text comes second.
  - The page opens with a one-sentence hook, then the interactive part, then a short verdict that responds to what the reader did.
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

## 5. Check
```bash
npm run check
```
If it fails, read the error, fix it, and run it again. Never commit while it fails. These are the common failures:
- unquoted YAML that contains `: `
- a `related` slug with no term file
- a relative `src` in the HTML

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
N new terms and M linked terms are in today's review.
```
