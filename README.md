# Artifact garden

A collection of interactive Claude artifacts about software engineering, plus a glossary of the terms they taught me. The site has a Backend roadmap, flashcards by topic and a knowledge graph.

**Live:** https://agsyafiq55.github.io/artifact-garden

## Add things from your phone
1. Open [claude.ai/code](https://claude.ai/code) and start a session on this repo.
2. Run `/add-artifact explain <concept> interactively`.
3. Claude teaches the concept in the artifact, writes the terms it explains into the glossary, and places both on the Backend roadmap.
4. Claude runs the checks, commits to `main` and pushes. GitHub Pages redeploys in about a minute.

Run `/add-artifact next` for the next subject on the roadmap, and `/add-artifact status` for progress.

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
- `src/content/tracks/backend.yaml` holds the Backend roadmap.
- `.claude/skills/add-artifact/` holds the workflow and its writing rules.

