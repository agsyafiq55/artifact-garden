# How an artifact teaches

Read this before you plan an artifact. Each rule below comes from learning research, and the sources are at the end. The reader is a working developer on a phone who may know nothing about the concept.

## The research in one screen
| Finding | What it means for an artifact |
| --- | --- |
| **Pretesting.** A guess before the lesson helps memory, even when the guess is wrong. | Open with one question the reader answers before you explain anything. |
| **Pre-training.** People follow a process better when they already know the names of its parts. | Name and define the parts in part 1, before the mechanism in part 2. |
| **Concreteness fading.** Abstract ideas stick when they start concrete and become abstract step by step. | Go from a scenario the reader knows, to a diagram, to the real code or protocol. |
| **Segmenting.** People learn more from a process they step through at their own pace. | Show a mechanism as a stepper with Back and Next, never as an autoplay animation. |
| **Spatial contiguity and signaling.** Words belong next to the picture they describe, and cues show what matters. | Put labels inside the diagram, not in a legend. Use the accent for the one thing to look at. |
| **Coherence and redundancy.** Extra material and repeated text both hurt learning. | Cut decoration and side facts. Don't repeat a label's words in the paragraph below it. |
| **Worked examples.** Novices learn more from studying a solved example than from solving the problem cold. | Walk through one real example in part 2 before the reader drives the demo in part 3. |
| **Self-explanation.** Explaining to yourself why a step happens deepens understanding. | Ask "why" in the demo prompts and in the questions. |
| **Refutation.** Naming a misconception and correcting it beats teaching the right idea alone. | Add one "Common mix-up" box that states the wrong idea and corrects it. |
| **Implicit scaffolding.** Good simulations guide through few controls, clear feedback and sensible limits, with few written instructions. | Give the demo 1 to 3 controls. Each action gets a reply that names the concept at work. |
| **Retrieval practice and spacing.** Recalling an answer beats rereading it, and recall spread over days beats one session. | End with questions before the summary. The site's flashcards handle spacing, so write terms worth recalling. |
| **Expertise reversal.** Guidance that helps a novice slows down someone who already knows the topic. | Keep the contents list, so an expert can jump to the simulation. Put extra depth in a `<details>`. |

## The shape of every artifact
The template has these parts, in this order.

**Opening.** The title, then 2 or 3 sentences: what the concept is and where the reader meets it. Then one "Guess first" question with 2 or 3 tap options. The reply says if the guess was right in one sentence, and tells the reader which part shows why. Pick a question whose answer surprises, such as "A request timed out. Did the server do the work?"

**1. Overview of <concept>.** Start from a situation the reader knows, then name what is going on.
- Open with the concrete scenario, in 2 or 3 sentences.
- Name each part and bold each key term where you first define it. This is the pre-training.
- Give one everyday analogy, and say in one sentence where the analogy stops working.
- Add one "Common mix-up" box. It states the wrong idea, then corrects it in one or two sentences.

**2. How <the mechanism> works.** Show the mechanism, then a real example.
- A stepper diagram, built to `DIAGRAMS.md`. Each step shows one change and has a one-sentence caption.
- One worked example from real life: a request and response, a query and its plan, a config, a log line. Annotate it, and tie each annotation to a step of the diagram.
- End with the general form, such as the syntax, the rule or a table of cases. This is the abstract step of concreteness fading.

**3. The simulation.** The reader drives the idea.
- One sentence on what the demo shows, then 2 to 4 tasks. Write at least one task as "Predict, then check": "Predict which client sees the order, then tap Refresh on the phone."
- Include one task that breaks something, such as a lost response, a full queue or a stale read. People remember what they saw fail.
- Each reply names the term at work and says why it happened. "The phone sees the order because the server holds the only copy" teaches more than "Order shown".
- Every term in the demo was defined in part 1 or part 2.

**4. Practice questions.** Retrieval first, then the summary.
- 3 to 5 questions with tap-to-reveal answers in `<details>`. Mix these kinds:
  - one recall question on the core idea
  - one "why" question
  - one transfer question that applies the idea to a new situation
  - one mix-up question built from a `contrasts` term
  - when the roadmap has an earlier artifact, one question that links back to it
- Each answer says why in one or two sentences.
- Then "What to remember": 3 to 5 points. It comes after the questions, so the reader recalls before they reread.

**Sources and further reading.** The references from `RESEARCH.md`, in reading order.

## Headings
Every heading names its subject, so a reader skimming the contents list knows what each part teaches. This is the owner's preference.

| Part | Heading pattern | Example |
| --- | --- | --- |
| 1 | Overview of <concept> | Overview of client and server architecture |
| 2 | How <the mechanism> works | How a request and response work |
| 3 | What the reader does in the demo | Simulate a restaurant app |
| 4 | Practice questions | Practice questions |
| End | Sources and further reading | Sources and further reading |

- Never use the vague labels "The idea", "How it works", "Try it" or "Check yourself". `npm run check` rejects them as `<h2>` text.
- Headings are in sentence case, as `WRITING.md` rule 22 says.
- The contents list uses the same words as the headings.
- `<h3>` subheadings are specific too: "Reading a status code", not "Details".

## Pace and size
- Each part fits in about 2 or 3 phone screens. If a part runs longer, split the concept into two artifacts.
- Paragraphs have 1 to 3 sentences.
- Keep to one concept per artifact. If you need a second concept to explain the first, define it in one sentence and link it to the later roadmap topic.
- Use one name per thing on the whole page, in the diagram, the demo and the questions. `WRITING.md` rule 21 says the same.

## Sources
- Dunlosky, Rawson, Marsh, Nathan and Willingham (2013). Improving students' learning with effective learning techniques. Psychological Science in the Public Interest, 14(1). https://doi.org/10.1177/1529100612453266
- Weinstein, Madan and Sumeracki (2018). Teaching the science of learning. Cognitive Research: Principles and Implications, 3. https://doi.org/10.1186/s41235-017-0087-y
- Mayer (2020). Multimedia Learning, third edition. Cambridge University Press. Source of the pre-training, segmenting, signaling, contiguity, coherence and redundancy principles.
- Sweller, van Merriënboer and Paas (2019). Cognitive architecture and instructional design, 20 years later. Educational Psychology Review, 31. https://doi.org/10.1007/s10648-019-09465-5
- Richland, Kornell and Kao (2009). The pretesting effect. Journal of Experimental Psychology: Applied, 15(3). https://doi.org/10.1037/a0016496
- Fyfe, McNeil, Son and Goldstone (2014). Concreteness fading in mathematics and science instruction. Educational Psychology Review, 26. https://doi.org/10.1007/s10648-014-9249-3
- Atkinson, Derry, Renkl and Wortham (2000). Learning from examples. Review of Educational Research, 70(2). https://doi.org/10.3102/00346543070002181
- Chi, de Leeuw, Chiu and LaVancher (1994). Eliciting self-explanations improves understanding. Cognitive Science, 18(3). https://doi.org/10.1207/s15516709cog1803_3
- Tippett (2010). Refutation text in science education, a review of two decades of research. International Journal of Science and Mathematics Education, 8. https://doi.org/10.1007/s10763-010-9203-x
- Podolefsky, Moore and Perkins (2013). Implicit scaffolding in interactive simulations. The PhET group's design paper. https://arxiv.org/abs/1306.6544
- Roediger and Karpicke (2006). Test-enhanced learning. Psychological Science, 17(3). https://doi.org/10.1111/j.1467-9280.2006.01693.x
- Kalyuga (2007). Expertise reversal effect and its implications for learner-tailored instruction. Educational Psychology Review, 19. https://doi.org/10.1007/s10648-007-9054-3
