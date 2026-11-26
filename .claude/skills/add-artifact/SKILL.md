---
name: add-artifact
description: Research a concept online, then create a new interactive artifact for the artifact-garden site with its references, place it on the Backend roadmap, write the vocabulary terms it explains into the glossary, then validate, commit to main and push. This is the only way terms enter the glossary. Use when the user asks to add, make, save or build an artifact, explainer, demo or visualisation of a concept, asks what to learn next or for roadmap progress, or runs /add-artifact (also /add-artifact next and /add-artifact status).
---

# Add an artifact

The user is usually on their phone. Keep messages short, use numbered lists, and never ask them to edit files.

`$ARGUMENTS` is what to explain or build. It may also be pasted HTML, or a description of an artifact the user made elsewhere. If it is empty, ask in one line which concept they want.

## The roadmap
`src/content/tracks/backend.yaml` is the Backend roadmap: ordered sections of nodes. A node has an `id`, a `title`, a `level` (`core` or `extra`), and the `artifacts` and `terms` placed on it. A core node with no artifact is unfinished.

- **`$ARGUMENTS` is `status`:** read the track file, then reply in two lines: how many core nodes have an artifact out of the total, and the next 3 unfinished core nodes in order. Do nothing else.
- **`$ARGUMENTS` is `next`:** find the first 3 unfinished core nodes in order. Reply in one line, such as "Next on Backend: Clients and servers. Build it, or pick HTTP requests and responses or DNS?" Then end your turn. When the user answers, build that node's concept as the artifact, and remember the node for step 5.
- **Anything else:** after you build the artifact, place it on the node it belongs to in step 5. If no node fits, leave it off the roadmap and say so in the report.

Rules for the roadmap:
- The roadmap is written in our own words and order. Never fetch roadmap.sh, and never copy its node names, order or descriptions into any file. Its licence forbids publishing its content.
- Node titles follow `WRITING.md`. New node ids are kebab-case and unique in the track.

## 1. Sync
```bash
git checkout main 2>/dev/null || true
git pull --ff-only origin main
npm ci --silent   # skip this when node_modules already exists
```

## 2. Research
Read `.claude/skills/add-artifact/RESEARCH.md` and follow it before you write anything. You come out with:
- the standard definition of each key term, checked against 2 or more sources
- one real example, such as a request, a query, a config or a log line
- the mix-ups people make
- 3 to 6 references for the reader, each opened or confirmed through search

## 3. Build the artifact
Read these three files before you write any text or draw anything:
- `.claude/skills/add-artifact/TEACHING.md` sets the shape of the page and why.
- `.claude/skills/add-artifact/DIAGRAMS.md` sets how to draw figures, steppers and live figures.
- `.claude/skills/add-artifact/WRITING.md` covers every word the reader sees.

- Choose a kebab-case `slug` that `public/artifacts/` doesn't already use.
- Copy `templates/artifact-template.html` to `public/artifacts/<slug>.html` and build the artifact inside it.
  - If the user pasted their own HTML, adapt it into the template. Keep its behaviour, and replace its colors and fonts with the template's tokens.
- **Teach first, then let them try.** The reader may know nothing about the concept. Every artifact has these parts, in this order, as `TEACHING.md` describes:
  - **Opening.** 2 or 3 sentences on what the concept is and where the reader meets it, then one "Guess first" question.
  - **1. Overview of <concept>.** A concrete scenario, then the named parts with each key term bolded where it is defined. One everyday analogy and one "Common mix-up" box.
  - **2. How <the mechanism> works.** A stepper diagram of the mechanism, a worked real example, then the general rule.
  - **3. The simulation**, headed by what the reader does, such as "Simulate a restaurant app". 2 to 4 tasks, at least one "Predict, then check" and one that breaks something. Its messages name the concept at work and say why.
  - **4. Practice questions.** 3 to 5 tap-to-reveal questions first: recall, why, transfer, and a mix-up. Then 3 to 5 points to remember.
  - **Sources and further reading.** The references from step 2, in reading order.
- A good artifact also meets these rules:
  - **Every heading names its subject.** The owner dislikes vague labels such as "The idea", "How it works", "Try it" or "Check yourself", and `npm run check` rejects them. Use "Overview of client and server architecture" and "Practice questions" instead. `TEACHING.md` has the pattern.
  - Every new term in the interactive part was already explained above it.
  - Every fact on the page traces to a source in your research notes.
  - It works at 375px wide. It uses one column and tap targets of at least 44px. It has no hover-only interactions and no sideways scroll.
  - It supports light and dark mode through the CSS variables, and it keeps the template's `applyThemeFromQuery()` function and call.
  - External files come only from cdnjs.cloudflare.com, cdn.jsdelivr.net, unpkg.com, esm.sh and Google Fonts, pinned to exact versions. Prefer vanilla JS. Every outside link has `target="_blank" rel="noopener"`.
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
  references:
    - title: "<the source's own title>"
      publisher: "<MDN Web Docs, IETF, PostgreSQL docs, ...>"
      url: "<https URL from a search result or a fetched page>"
      kind: <spec, docs, paper, book, course, article or video>
      note: "<optional: one sentence on what the reader gets from it>"
  ---

  <2 to 4 sentences of notes that state the key takeaway in plain words. Bold the core idea.>
  ```
  Leave `terms` empty for now. Step 4 fills it. List `references` in the same order as the HTML Sources section.

## 4. Write the terms the artifact explains
Terms come only from artifacts. There is no separate command for adding terms, and you don't ask the user to approve them.

- First, reread the artifact's visible text, its script messages, the summary and the notes against `WRITING.md`. Fix every sentence that breaks a rule.
- Pick 3 to 8 terms that the artifact **explains**: each one is defined in part 1 or part 2 of the page. Put the synonyms you found in research in `aka`, and the mix-ups in `contrasts`. If a term matters but the page doesn't explain it, either add the explanation to the page or leave the term out. Prefer the words a working engineer uses in a design review over trivial ones.
- List the existing terms with `ls src/content/terms/`. If a term already exists, link it instead of writing a new card, and leave its file unchanged.
- For each new term, create `src/content/terms/<term-slug>.md`:
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
- The card's definition matches what the artifact says and the sources you checked. Write `definition`, `analogy` and `example` to `WRITING.md`, and reread each card against it before you save it.
- Link every true relation. `related` means one term helps explain the other. `contrasts` means people mix the two up.
- Set `terms: [...]` in the artifact's `.md` file to every term slug, new and existing. `npm run check` fails on a term that no artifact lists.

## 5. Place it on the roadmap
- Add the artifact's slug to its node's `artifacts` list in `src/content/tracks/backend.yaml`.
- Add each term slug to the `terms` list of the node it belongs to. That is usually the artifact's node. When a term has its own subject on the roadmap, such as "Timeouts" for `timeout`, put it there instead.
- A node written in flow style, like `{ id: dns, title: "DNS" }`, becomes block style when it gains lists.

## 6. Check
```bash
npm run check
```
If it fails, read the error, fix it, and run it again. Never commit while it fails. These are the common failures:
- unquoted YAML that contains `: `
- a `related` slug with no term file
- a term that no artifact lists in its `terms`
- a relative `src` in the HTML
- a track node that names a slug with no file
- fewer than 2 `references`, or a reference URL missing from the HTML Sources section
- an outside link without `target="_blank"`

## 7. Commit and push
```bash
git add -A
git commit -m "add: <title> (+<N new> terms)"
git push origin HEAD:main
```
Some Claude Code web sessions may only push to their own branch. If the push to main is rejected, do this instead:
1. Push the current branch with `git push -u origin HEAD`.
2. If `gh` is available, run `gh pr create --fill --base main`, then `gh pr merge --squash --delete-branch`.
3. Otherwise, give the user the PR or compare link and say one line: "Tap Merge in the GitHub app to publish."

## 8. Report
Keep the report to four lines:
```
Published, live in about a minute: https://agsyafiq55.github.io/artifact-garden/a/<slug>
Terms: <new term names>, plus <linked existing term names>. They're in Review under <section>.
Sources: <N> references, led by <publisher of the first>. <Any you could only confirm through search.>
Roadmap: <section>, <node title>. Next: <next unfinished core node>.
```
If the user then asks to drop or change a term, edit or delete its card and every list that names it, run the check, and commit as `fix: <what changed>`.
