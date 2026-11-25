# Writing rules

Every word a reader sees follows these rules. That covers:
- the artifact's visible text, including button labels and the messages its script writes
- the artifact's `title`, `summary` and notes
- every term field: `term`, `definition`, `analogy` and `example`

Code inside backticks or `<code>` is exempt.

`npm run check` fails on the rules marked **(checked)**. Apply the rest by rereading every sentence before you show the user anything.

## Punctuation and symbols
1. **(checked)** No em dashes or en dashes. Use a period or a comma. Write ranges in words: "A to M", "2 to 4".
2. Don't use parentheses or a hyphen in place of a dash.
3. **(checked)** No arrows in text. "One tap → charged once" becomes "One tap, one charge". "Write x → A" becomes "Write x to A".
4. **(checked)** Straight quotes only.
5. A colon goes before a list or an example. It never joins two clauses mid-sentence. "Lucky: no responses were lost" becomes "No responses were lost this time."
6. No decorative emojis or symbols such as ✓, ✕ or ✂ in text. Icon buttons that have an `aria-label` are fine.
7. Spell out abbreviations and symbols in prose. "~11%" becomes "about 11%". "±" becomes "plus or minus".

## Words
8. **(checked)** None of these words: additionally, crucial, delve, enhance, foster, landscape, pivotal, showcase, testament, underscore, vibrant, leverage, utilize, seamless.
9. **(checked)** None of these phrases: "serves as", "stands as", "not just", "in order to", "it is important to note". Say "is" or "has". Say "to".
10. Use the plain word. Say "use", not "employ".
11. No abstract nouns used as metaphors, such as substrate, vector, surface, harness, scaffolding, paradigm or north star. Use the concrete word. "Surface the error" becomes "return the error".
12. Cut adverbs such as "really", "usually" or "simply", or give the number instead.
13. Use at most one hedge per sentence, and make it "may".

## Sentences
14. One idea per sentence. Split a sentence at a semicolon.
15. Write whole sentences with their articles and verbs. "Available, but stale." becomes "B stayed available, but its answer is stale."
16. Use the active voice and name the actor. "The request is retried" becomes "The client retries the request."
17. Say what happens and give the number. "Load is more balanced" is fine because the bars show it. "Performance improves a lot" is not.
18. No trailing "-ing" phrase that adds no fact, such as "ensuring reliability" or "highlighting the trade-off".
19. No "not X, but Y" framing. State the point.
20. Don't force ideas into groups of three.
21. Use one name per thing, and repeat it. If the demo says "replica", don't switch to "node" halfway through.

## Tone
22. Sentence case for every heading and label: "Load per server", not "Load Per Server".
23. No vague sources such as "experts say". Name the system or the source, as in "Kafka" or "Stripe".
24. No generic conclusions such as "consistent hashing is a powerful tool". End on the specific fact the reader just saw.
25. No chatbot phrases, praise or filler in anything shown to the user.

Adapted from the `unslop` skill in pstack by Lauren Tan, MIT License. The source is https://github.com/cursor/plugins/tree/main/pstack.
