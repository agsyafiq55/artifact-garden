# artifact-garden

A public Astro site at https://agsyafiq55.github.io/artifact-garden that collects Claude-made interactive artifacts about software-engineering concepts, plus a glossary of every term they taught. The site has flashcards (spaced repetition) and a knowledge graph.

The owner mostly works from **Claude Code on the web, on a phone**. Keep replies short and scannable, and never ask them to edit files by hand.

## Workflows
- **New artifact:** use the `add-artifact` skill (`/add-artifact <what to explain>`).
- **New or edited term only:** use the `add-term` skill (`/add-term <term>`).

## Where things live
| What | Path |
| --- | --- |
| Artifact (self-contained HTML, served as-is) | `public/artifacts/<slug>.html` |
| Artifact metadata + notes | `src/content/artifacts/<slug>.md` |
| Vocab term (one card per file) | `src/content/terms/<slug>.md` |
| Starter HTML for new artifacts | `templates/artifact-template.html` |
| Schemas | `src/content.config.ts` |
| Topic list | `src/lib/topics.ts` |

Slugs are kebab-case and match between the `.md` and `.html` files. Term slugs are the term in kebab-case (`eventual-consistency`).

## Topics (fixed — use the id)
`systems-design`, `databases`, `networking`, `frontend`, `backend`, `devops-cloud`, `security`, `cs-fundamentals`, `ai-ml`, `other`.
Tags are free-form, lowercase, kebab-case. Reuse existing tags where they fit (`grep -h '^tags' src/content -r`).

## Rules
- **Commit straight to `main`.** No branches or PRs unless pushing to main is rejected (see the skill's fallback).
- **Never commit if `npm run check` fails.** Fix the error first. The check runs astro check, then `scripts/validate-artifacts.mjs`, then a full build.
- Artifacts are **one self-contained HTML file**. External scripts and styles may only come from cdnjs.cloudflare.com, cdn.jsdelivr.net, unpkg.com, esm.sh or Google Fonts. No relative paths, and nothing else in `public/`.
- Artifacts must be mobile-first: they must work at 375px wide, use tap targets of at least 44px, and never scroll horizontally. They must also support light and dark mode using the template's tokens and the `?theme=` snippet.
- Term definitions are **one line, ≤180 characters**, in plain English. The analogy is everyday and non-technical. The example shows the term used in real engineering talk or code (backticks for code).
- Every slug in `related` and `contrasts` must exist as a term file. Write `related`/`contrasts` on the new term; the site shows backlinks automatically, so you don't need to edit the other term.
- Quote YAML string values that contain `: ` (safest: always double-quote `definition`, `analogy`, `example`, `summary`, `title`, `prompt`).
- Commit message format: `add: <artifact title> (+N terms)`, `term: <term>`, or `fix: …`.

## Commands
```bash
npm run dev      # local dev server (search only works after build)
npm run check    # must pass before every commit
npm run build    # astro build + pagefind index into dist/
```
