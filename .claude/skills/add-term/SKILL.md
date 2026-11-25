---
name: add-term
description: Add a new vocabulary term, or edit an existing one, in the artifact-garden glossary without creating an artifact, then validate, commit to main and push. Use when the user wants to save, learn, define or fix a term, word or concept, or runs /add-term.
---

# Add or edit a term

`$ARGUMENTS` holds one or more terms. It may include the user's own definition or where they heard the term.

1. **Sync.** Run `git pull --ff-only origin main`. Run `npm ci --silent` if `node_modules` is missing.
2. **Check for duplicates.** Run `ls src/content/terms/` and grep the `aka:` lines. If the term or a synonym already has a file, this is an edit. Show the current card in four short lines and ask what to change, unless the user already said.
3. **Draft** each card with the schema in step 4 of `.claude/skills/add-artifact/SKILL.md`.
   - Write every field to `.claude/skills/add-artifact/WRITING.md`.
   - If the user gave their own definition, keep their wording and change only what breaks a writing rule. Their own words help them remember the term.
   - Pick `related` and `contrasts` only from existing term slugs.
   - Suggest the Backend roadmap node the term belongs to, from `src/content/tracks/backend.yaml`. Once the user confirms, add the slug to that node's `terms` list. A term may stay off the roadmap.
4. **Confirm.** Show each draft in the numbered format from step 3 of the add-artifact skill, then wait for "ok" or edits. Skip this step if the user said "just add it".
5. **Check.** Run `npm run check`, and fix any error before you go on.
6. **Commit and push.** Run `git commit -m "term: <term>[, <term>...]"`, then `git push origin HEAD:main`. If the push is rejected, use the fallback in step 6 of the add-artifact skill.
7. **Reply** in one line with the link: `https://agsyafiq55.github.io/artifact-garden/terms/<slug>`
