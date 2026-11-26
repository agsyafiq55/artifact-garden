# Diagrams and interactive figures

Read this before you draw anything. The template's CSS and script run every pattern here. A figure exists to make one idea clear at a glance, and the words around it are captions.

## Rules for every figure
1. **One claim per figure.** Wrap it in `<figure>`. The `<figcaption>` states the claim in one sentence: "The cache answers before the database is asked."
2. **Draw the mechanism, not the name.** Draw the request going through the cache and missing, rather than a box labelled "cache".
3. **Every arrow has a verb:** `sends GET /menu`, `writes`, `retries after 2 s`.
4. **Labels live in the drawing.** No legend. If a paragraph describes what the figure shows, turn that sentence into a label.
5. **Show state with form as well as color.** A failed step is red, dashed and has a cross. Color alone fails for color-blind readers and in print.
6. **One accent.** The accent marks the one thing to look at now: the current step, the hot path or the number that matters. Everything else is ink and muted.
7. **A number that measures a span sits on that span.** Draw latency as a dimension line along the time axis, with the value in the middle.
8. **Cases become small multiples.** Draw the same small diagram once per case, at the same scale, so only the difference changes.
9. **Cut decoration.** No clip art, emoji, gradients or 3D. Every mark carries meaning.

## Which figure
| Content | Figure |
| --- | --- |
| A process in order: a request, a handshake, a write path | stepper |
| A setting the reader should feel: a timeout, a TTL, a pool size | live figure |
| Failure modes or options side by side | small multiples |
| Who talks to whom over time | sequence diagram in a stepper |
| One small part up close: a header's fields, a key's layout | a close-up, drawn large with the values on it |
| Many rows of facts | a plain `<table>` |

## Plan on a grid
Sketch in ASCII first, then turn columns and rows into coordinates.
```
x:  4          170         336     viewBox 0 0 340 150
    ┌───────┐  GET /menu  ┌───────┐
y:75│Client │────────────►│Server │
    └───────┘             └───────┘
```
- Use `viewBox="0 0 340 H"`. At 375px wide, one unit is about one pixel.
- SVG text is at least 13 units. It doesn't wrap, so keep a line to about 18 characters and add a second line with `<tspan x=".." dy="1.2em">`.
- Leave at least 24 units between boxes. Draw edges at right angles: `M x y H x V y`.
- Put a label 9 units above its line.
- Over about 8 boxes, the figure is too big for a phone. Draw an overview, then a second figure for the detail.
- Give the `<svg>` `role="img"` and an `aria-label` that says what the whole figure shows.

## Shapes say what a thing is
- `rect.box`: a service or a program.
- A cylinder for a datastore: a `path` for the body and an `ellipse` for the lid.
- A rect with 3 short dividers for a queue.
- A dashed rect for something optional or down. A dashed rect with a label in its top-left corner for a boundary, such as a network or a machine.
- `path.edge` is a sync call. `path.edge.async` is dashed, for async or optional.
- Arrowheads use a `<marker>` with `path.tip`. Give each marker an id that is unique on the page, such as `tip-how`.

## Stepper
Most figures in part 2, "How <the mechanism> works", are steppers. The reader taps Next to move one step at a time, and each step shows one change with a one-sentence caption.
```html
<figure class="stepper" data-stepper>
  <svg class="diagram" viewBox="0 0 340 150" role="img" aria-label="...">
    <g data-s="1">...</g>          <!-- appears at step 1 and stays -->
    <g data-s="2">...</g>          <!-- appears at step 2 -->
    <g data-only="3">...</g>       <!-- shown only on step 3, such as a moving token or a "lost" mark -->
  </svg>
  <ol class="captions">
    <li>Step 1 caption.</li>
    <li>Step 2 caption.</li>
    <li>Step 3 caption.</li>
  </ol>
  <figcaption>The claim of the whole figure.</figcaption>
</figure>
```
- The script adds Back, Next and "Step N of M". The number of steps is the number of `<li>` captions.
- Parts of the current step get the class `now`, which turns their `.box` and `.edge` to the accent.
- Use 3 to 7 steps. Something visible changes at every step, and the caption names it.
- The stepper opens on step 1 and never autoplays. Without JavaScript, every part and caption shows.
- The caption and the drawing use the same names as the prose.

## Live figure
A live figure recomputes when the reader moves a control, so they feel what a setting does.
- Use 1 to 3 controls: a range input or buttons with `aria-pressed`. Each control is at least 44px tall.
- Write one pure function, `model(settings)`, that returns every number the figure, the labels and the verdict sentence need. Draw from its result.
- Start at the real default value, such as a 30 s timeout, and mark it on the scale.
- Show the formula in a `<details>`. Label a simplified model "illustrative".

## Linked terms
A bold term in the prose can light up its part of the figure. Use it for 2 to 4 key terms per figure.
```html
<p>The <button class="ref" data-ref="cache">cache</button> answers first.</p>
<g data-ref="cache"><rect class="box" .../></g>
```
Tapping the term again turns it off. Never put meaning only in a hover.

## Motion
- Motion shows a change or a flow, and nothing else.
- Animate only `opacity` and `transform`. The template turns transitions off under `prefers-reduced-motion`.
- No autoplay loops, parallax or scroll effects.

## Where this differs from visual-explainer
These rules adapt the `visual-explainer` skill. Where they conflict, this repo wins:
- Fonts and colors come from the template's tokens. Don't load the visual-explainer kit or its fonts.
- Text follows `WRITING.md`: straight quotes, no dashes and no arrows in text, even though visual-explainer asks for typographic quotes and dashes.
- Steppers open on step 1, because a reader new to the concept learns from the build-up. visual-explainer opens on the full picture.

Adapted from `visual-explainer` by Nico Bailon, MIT License. The source is https://github.com/nicobailon/visual-explainer.
