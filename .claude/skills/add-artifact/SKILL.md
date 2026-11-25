---
name: add-artifact
description: Create a new interactive artifact for the artifact-garden site, extract vocabulary terms for the user to approve, then validate, commit to main and push. Use when the user asks to add, make, save or build an artifact, explainer, demo or visualisation of a concept, or runs /add-artifact.
---

# Add an artifact

The user is usually on their phone. Keep messages short, use numbered lists, and never ask them to edit files.

Input: `$ARGUMENTS` is what to explain or build. It might also be pasted HTML, or a description of an artifact they made elsewhere. If it's empty, ask in one line what concept they want.

## 1. Sync
```bash
git checkout main 2>/dev/null || true
git pull --ff-only origin main
npm ci --silent   # skip if node_modules already exists
```

## 2. Build the artifact
- Choose a kebab-case `slug` that isn't already in `public/artifacts/`.
- Copy `templates/artifact-template.html` to `public/artifacts/<slug>.html` and build the artifact inside it.
  - If the user pasted their own HTML, adapt it into the template instead: keep the behaviour, and swap colours and fonts for the template's tokens.
- What makes a good artifact here:
  - **Interactive first.** The reader should *do* something (toggle, step, drag, break things) and see the concept happen. Static text comes second.
  - Start with a one-sentence hook, then the interactive part, then a short verdict or explanation that reacts to what the reader did.
  - Mobile-first at 375px: one column, tap targets of at least 44px, no hover-only interactions, no horizontal scroll.
  - Support light and dark mode through the CSS variables. Keep the `?theme=` snippet.
  - Allowed external sources are only cdnjs.cloudflare.com, cdn.jsdelivr.net, unpkg.com, esm.sh and Google Fonts. Pin exact versions. Prefer vanilla JS.
- Write `src/content/artifacts/<slug>.md`:
  ```yaml
  ---
  title: "<Title>"
  summary: "<one sentence, ≤200 chars, says what the reader will try>"
  topic: <one topic id from CLAUDE.md>
  tags: [<2–4 kebab-case tags, reuse existing ones>]
  created: <today YYYY-MM-DD>
  terms: []          # filled in step 4
  prompt: "<the user's request, lightly cleaned up>"
  ---

  <2–4 sentences of notes: the one key takeaway, in plain words. Bold the core idea.>
  ```

## 3. Propose terms. STOP and wait.
- List existing terms first: `ls src/content/terms/`. Skim any that might overlap.
- Pick **3–8** terms the artifact teaches or relies on. Prefer the vocabulary a working engineer would use in a design review over trivial words.
- Reply in exactly this shape and then **end your turn**:

```
Artifact ready: <title> (<topic>)

Terms (reply e.g. "keep 1,3,4" or "all", edits welcome):
1. **Idempotency key** (new): A unique client-generated ID that lets the server spot duplicate requests.
   ↳ like: writing an order number on a cheque so it can't be cashed twice
2. **Exactly-once semantics** (already have → will link)
...
```

Existing terms are marked `already have → will link`. Keeping them only links them to the artifact; their files are not rewritten.

## 4. Write the approved terms
For each kept **new** term, create `src/content/terms/<term-slug>.md`:
```yaml
---
term: "<Display Name>"
aka: []                      # synonyms or abbreviations, if any
definition: "<one line, ≤180 chars, plain English>"
analogy: "<everyday, non-technical comparison>"
example: "<real usage sentence or snippet; `backticks` for code>"
related: [<existing or newly-added term slugs>]
contrasts: [<terms it's often confused with>]
topic: <topic id>
tags: [<kebab-case>]
added: <today YYYY-MM-DD>
---
```
- Then set `terms: [...]` in the artifact `.md` to every kept term slug, both new and existing.
- Link generously but truthfully. `related` means one term helps explain the other. `contrasts` means people mix them up.

## 5. Check
```bash
npm run check
```
If it fails, read the error, fix it, and run it again. Never commit while it's failing. Typical failures:
- unquoted YAML that contains `: `
- a `related` slug that doesn't exist
- a relative `src` in the HTML

## 6. Commit and push
```bash
git add -A
git commit -m "add: <title> (+<N new> terms)"
git push origin HEAD:main
```
**Fallback if pushing to main is rejected** (some Claude Code web sessions only allow their own branch):
1. Push the current branch: `git push -u origin HEAD`.
2. If `gh` is available, run `gh pr create --fill --base main` and then `gh pr merge --squash --delete-branch`.
3. Otherwise, give the user the PR/compare link and say one line: "Tap Merge in the GitHub app to publish."

## 7. Report (keep it short)
```
✓ Published (live in ~1 min): https://agsyafiq55.github.io/artifact-garden/a/<slug>
+N new terms, M linked. They're in today's review.
```
