// Spaced-repetition store (simplified SM-2). Runs in the browser only.
// Progress lives in localStorage on each device; export/import moves it between devices.

export type Grade = 0 | 1 | 2 | 3; // again, hard, good, easy
export interface CardState {
  ease: number; // ease factor, ≥ 1.3
  interval: number; // days
  reps: number; // successful reviews in a row
  lapses: number;
  due: number; // epoch ms
  last: number; // epoch ms
}
export interface Store {
  v: 1;
  cards: Record<string, CardState>;
  newIntroduced: Record<string, number>; // 'YYYY-MM-DD' → count of new cards started that day
  newPerDay: number;
}

const KEY = 'artifact-garden:srs:v1';
const DAY = 86_400_000;
const MIN = 60_000;

const empty = (): Store => ({ v: 1, cards: {}, newIntroduced: {}, newPerDay: 10 });
export const today = (d = new Date()) => d.toLocaleDateString('en-CA'); // YYYY-MM-DD, local time

export function load(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const s = JSON.parse(raw);
    return s && s.v === 1 ? { ...empty(), ...s } : empty();
  } catch {
    return empty();
  }
}

export function save(s: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage blocked: progress lasts for this page only */
  }
}

/** Preview of the next interval for each grade, for button labels. */
export function schedule(prev: CardState | undefined, grade: Grade, now = Date.now()): CardState {
  const c: CardState = prev
    ? { ...prev }
    : { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: now, last: now };
  c.last = now;
  if (grade === 0) {
    c.reps = 0;
    c.lapses += 1;
    c.interval = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.due = now + 10 * MIN;
    return c;
  }
  let next: number;
  if (c.reps === 0) next = grade === 1 ? 1 : grade === 2 ? 1 : 3;
  else if (c.reps === 1) next = grade === 1 ? 2 : grade === 2 ? 3 : 5;
  else next = c.interval * (grade === 1 ? 1.2 : grade === 2 ? c.ease : c.ease * 1.3);
  if (grade === 1) c.ease = Math.max(1.3, c.ease - 0.15);
  if (grade === 3) c.ease += 0.15;
  c.interval = Math.max(1, Math.round(next));
  c.reps += 1;
  c.due = startOfDay(now) + c.interval * DAY;
  return c;
}

const startOfDay = (t: number) => {
  const d = new Date(t);
  d.setHours(4, 0, 0, 0); // a "day" rolls over at 4am, so late-night reviews count for that day
  return d.getTime() > t ? d.getTime() - DAY : d.getTime();
};

export function formatInterval(c: CardState, now = Date.now()) {
  const ms = c.due - now;
  if (ms < 60 * MIN) return `${Math.max(1, Math.round(ms / MIN))}m`;
  const d = Math.max(1, Math.round(ms / DAY)); // anything scheduled for a later day shows at least "1d"
  if (d < 31) return `${d}d`;
  if (d < 365) return `${Math.round(d / 30)}mo`;
  return `${(d / 365).toFixed(1)}y`;
}

/** Cards due now plus however many new cards today's budget still allows. */
export function queue(s: Store, ids: string[], now = Date.now()) {
  const due = ids
    .filter((id) => s.cards[id] && s.cards[id].due <= now)
    .sort((a, b) => s.cards[a].due - s.cards[b].due);
  const fresh = ids.filter((id) => !s.cards[id]);
  const budget = Math.max(0, s.newPerDay - (s.newIntroduced[today()] ?? 0));
  return { due, fresh: fresh.slice(0, budget), totalNew: fresh.length };
}

export function grade(s: Store, id: string, g: Grade, now = Date.now()) {
  if (!s.cards[id]) s.newIntroduced[today()] = (s.newIntroduced[today()] ?? 0) + 1;
  s.cards[id] = schedule(s.cards[id], g, now);
  save(s);
}

export function exportJson(s: Store) {
  return JSON.stringify({ ...s, exportedAt: new Date().toISOString() }, null, 2);
}

/** Merge an imported file: for each card keep whichever copy was reviewed most recently. */
export function importJson(s: Store, text: string): { added: number; updated: number } {
  const data = JSON.parse(text);
  if (!data || data.v !== 1 || typeof data.cards !== 'object') throw new Error('Not an artifact-garden progress file.');
  let added = 0;
  let updated = 0;
  for (const [id, c] of Object.entries<CardState>(data.cards)) {
    if (typeof c?.due !== 'number' || typeof c?.last !== 'number') continue;
    const mine = s.cards[id];
    if (!mine) { s.cards[id] = c; added++; }
    else if (c.last > mine.last) { s.cards[id] = c; updated++; }
  }
  for (const [d, n] of Object.entries<number>(data.newIntroduced ?? {})) {
    s.newIntroduced[d] = Math.max(s.newIntroduced[d] ?? 0, n);
  }
  if (typeof data.newPerDay === 'number') s.newPerDay = data.newPerDay;
  save(s);
  return { added, updated };
}

export function reset() {
  try { localStorage.removeItem(KEY); } catch {}
}
