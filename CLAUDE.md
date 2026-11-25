# artifact-garden

A public Astro site at https://agsyafiq55.github.io/artifact-garden. It collects interactive Claude artifacts about software engineering concepts, plus a glossary of every term they taught. The site has spaced-repetition flashcards and a knowledge graph.

The owner mostly works from Claude Code on the web, on a phone. Keep replies short and easy to scan, and never ask them to edit files by hand.

## Workflows
- To add an artifact, use the `add-artifact` skill: `/add-artifact <what to explain>`.
- To add or edit a single term, use the `add-term` skill: `/add-term <term>`.

## Where things live
| What | Path |
| --- | --- |
| Artifact, one self-contained HTML file served as is | `public/artifacts/<slug>.html` |
| Artifact metadata and notes | `src/content/artifacts/<slug>.md` |
| Vocab term, one card per file | `src/content/terms/<slug>.md` |
| Starter HTML for new artifacts | `templates/artifact-template.html` |
| Writing rules for all reader-facing text | `.claude/skills/add-artifact/WRITING.md` |
| Schemas | `src/content.config.ts` |
| Topic list | `src/lib/topics.ts` |

Slugs are kebab-case, and an artifact's `.md` and `.html` files share one slug. A term's slug is the term in kebab-case, such as `eventual-consistency`.

## Topics
Use one of these ids. The list is fixed.

`systems-design`, `databases`, `networking`, `frontend`, `backend`, `devops-cloud`, `security`, `cs-fundamentals`, `ai-ml`, `other`.

Tags are free-form, lowercase and kebab-case. Reuse existing tags where they fit. To list them, run `grep -h '^tags' src/content -r`.

## Rules
- **Commit straight to `main`.** Don't open branches or PRs. If pushing to main is rejected, follow the fallback in the `add-artifact` skill.
- **Never commit while `npm run check` fails.** Fix the error first. The check runs `astro check`, then `scripts/validate-artifacts.mjs`, then a full build.
- An artifact is one self-contained HTML file. External scripts and styles may only come from cdnjs.cloudflare.com, cdn.jsdelivr.net, unpkg.com, esm.sh or Google Fonts. Don't use relative paths, and don't add other files to `public/`.
- Artifacts are mobile-first. They work at 375px wide, use tap targets of at least 44px, and never scroll sideways. They support light and dark mode with the template's color tokens and its `?theme=` snippet.
- Everything a reader sees follows `.claude/skills/add-artifact/WRITING.md`: artifact text, script messages, summaries, notes and term fields. `npm run check` enforces its mechanical rules.
- A term definition is one line of plain English, at most 180 characters. The analogy is everyday and non-technical. The example shows the term in real engineering talk or code. Wrap code in backticks.
- Every slug in `related` and `contrasts` must have a term file. Set `related` and `contrasts` on the new term only. The site shows backlinks, so the other term needs no edit.
- Double-quote the YAML values `definition`, `analogy`, `example`, `summary`, `title` and `prompt`. An unquoted value that contains `: ` breaks the build.
- Commit messages use one of these formats: `add: <artifact title> (+N terms)`, `term: <term>`, or `fix: <what changed>`.

## Commands
```bash
npm run dev      # local dev server; search works only after a build
npm run check    # must pass before every commit
npm run build    # astro build, then the Pagefind index, into dist/
```
