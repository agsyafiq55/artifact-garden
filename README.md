# Artifact garden

A collection of interactive Claude artifacts about software engineering, plus a glossary of the terms they taught me. The site has spaced-repetition flashcards and a knowledge graph.

**Live:** https://agsyafiq55.github.io/artifact-garden

## Add things from your phone
1. Open [claude.ai/code](https://claude.ai/code) and start a session on this repo.
2. Run `/add-artifact explain <concept> interactively`.
3. Reply with the terms you want to keep, such as `keep 1,3,4`.
4. Claude runs the checks, commits to `main` and pushes. GitHub Pages redeploys in about a minute.

To add a single term without an artifact, run `/add-term <term>`.

## Local development
```bash
npm install
npm run dev     # http://localhost:4321/artifact-garden
npm run check   # type check, artifact validator and build
```

## Layout
- `public/artifacts/*.html` holds the artifacts. Each one is a single self-contained file.
- `src/content/artifacts/*.md` holds artifact metadata and notes.
- `src/content/terms/*.md` holds the glossary, one term per file.
- `.claude/skills/` holds the `add-artifact` and `add-term` workflows.

The browser stores flashcard progress. To move it between devices, open Review, then Progress & sync, and use export and import.
