---
name: add-term
description: Add a new vocabulary term (or edit an existing one) in the artifact-garden glossary without creating an artifact, then validate, commit to main and push. Use when the user wants to save, learn, define or fix a term, word or concept, or runs /add-term.
---

# Add or edit a term

`$ARGUMENTS` holds one or more terms, possibly with the user's own definition or the context where they heard it.

1. **Sync:** run `git pull --ff-only origin main`. Run `npm ci --silent` if `node_modules` is missing.
2. **Check for duplicates:** `ls src/content/terms/` and grep `aka:` lines. If the term or a synonym already exists, this is an **edit**: show the current card in 4 short lines and ask what to change, unless the user already said.
3. **Draft** each card using the schema in `.claude/skills/add-artifact/SKILL.md` step 4.
   - If the user gave their own definition, keep their wording and only tighten it. Their own words help them remember.
   - Pick `related` and `contrasts` from the existing term slugs only.
4. **Confirm.** Show each draft in the compact numbered format from add-artifact step 3, then wait for "ok" or edits. Skip this step if the user said "just add it".
5. **Check:** `npm run check`. Fix any error before going on.
6. **Commit and push:** `git commit -m "term: <term>[, <term>…]"` then `git push origin HEAD:main`. Use the fallback in add-artifact step 6 if the push is rejected.
7. **Reply in one line** with the link: `https://agsyafiq55.github.io/artifact-garden/terms/<slug>`
