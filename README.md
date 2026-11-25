# ❦ artifact garden

A garden of Claude-made interactive artifacts about software engineering, plus the vocabulary they taught me. The site has spaced-repetition flashcards and a knowledge graph.

**Live:** https://agsyafiq55.github.io/artifact-garden

## Adding things (from a phone)
1. Open [claude.ai/code](https://claude.ai/code) and start a session on this repo.
2. Run `/add-artifact explain <concept> interactively`.
3. Reply with the terms you want to keep, e.g. `keep 1,3,4`.
4. Claude checks everything, commits to `main` and pushes. GitHub Pages redeploys in about a minute.

To add a single word without an artifact, run `/add-term <term>`.

## Local dev
```bash
npm install
npm run dev     # http://localhost:4321/artifact-garden
npm run check   # type check + artifact validator + build
```

## Layout
- `public/artifacts/*.html` holds the artifacts. Each is one self-contained file.
- `src/content/artifacts/*.md` holds artifact metadata and notes.
- `src/content/terms/*.md` holds the glossary, one term per file.
- `.claude/skills/` holds the `add-artifact` and `add-term` workflows.

Flashcard progress is stored in your browser. Use **Review → Progress & sync** to export or import it between devices.
