export const Grade = { Again: 0, Hard: 1, Good: 2, Easy: 3 } as const;
export type Grade = (typeof Grade)[keyof typeof Grade];

type Days = number;
type EpochMs = number;
type DayKey = string;

export interface CardState {
  ease: number;
  interval: Days;
  reps: number;
  lapses: number;
  due: EpochMs;
  last: EpochMs;
}
export interface Store {
  v: 1;
  cards: Record<string, CardState>;
  newIntroduced: Record<DayKey, number>;
  newPerDay: number;
}

const KEY = 'artifact-garden:srs:v1';
const DAY = 86_400_000;
const MIN = 60_000;
const MIN_EASE = 1.3;
const DAY_ROLLOVER_HOUR = 4;

const empty = (): Store => ({ v: 1, cards: {}, newIntroduced: {}, newPerDay: 10 });
export const localDayKey = (d = new Date()): DayKey => d.toLocaleDateString('en-CA');

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
  } catch {}
}

export function schedule(prev: CardState | undefined, grade: Grade, now: EpochMs = Date.now()): CardState {
  const c: CardState = prev
    ? { ...prev }
    : { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: now, last: now };
  c.last = now;
  if (grade === Grade.Again) {
    c.reps = 0;
    c.lapses += 1;
    c.interval = 0;
    c.ease = Math.max(MIN_EASE, c.ease - 0.2);
    c.due = now + 10 * MIN;
    return c;
  }
  let next: Days;
  if (c.reps === 0) next = grade === Grade.Easy ? 3 : 1;
  else if (c.reps === 1) next = grade === Grade.Hard ? 2 : grade === Grade.Good ? 3 : 5;
  else next = c.interval * (grade === Grade.Hard ? 1.2 : grade === Grade.Good ? c.ease : c.ease * 1.3);
  if (grade === Grade.Hard) c.ease = Math.max(MIN_EASE, c.ease - 0.15);
  if (grade === Grade.Easy) c.ease += 0.15;
  c.interval = Math.max(1, Math.round(next));
  c.reps += 1;
  c.due = startOfReviewDay(now) + c.interval * DAY;
  return c;
}

const startOfReviewDay = (t: EpochMs): EpochMs => {
  const d = new Date(t);
  d.setHours(DAY_ROLLOVER_HOUR, 0, 0, 0);
  return d.getTime() > t ? d.getTime() - DAY : d.getTime();
};

export function formatInterval(c: CardState, now: EpochMs = Date.now()) {
  const ms = c.due - now;
  if (ms < 60 * MIN) return `${Math.max(1, Math.round(ms / MIN))}m`;
  const d = Math.max(1, Math.round(ms / DAY));
  if (d < 31) return `${d}d`;
  if (d < 365) return `${Math.round(d / 30)}mo`;
  return `${(d / 365).toFixed(1)}y`;
}

export function queue(s: Store, ids: string[], now: EpochMs = Date.now()) {
  const due = ids
    .filter((id) => s.cards[id] && s.cards[id].due <= now)
    .sort((a, b) => s.cards[a].due - s.cards[b].due);
  const fresh = ids.filter((id) => !s.cards[id]);
  const budget = Math.max(0, s.newPerDay - (s.newIntroduced[localDayKey()] ?? 0));
  return { due, fresh: fresh.slice(0, budget), totalNew: fresh.length };
}

export function grade(s: Store, id: string, g: Grade, now: EpochMs = Date.now()) {
  const day = localDayKey();
  if (!s.cards[id]) s.newIntroduced[day] = (s.newIntroduced[day] ?? 0) + 1;
  s.cards[id] = schedule(s.cards[id], g, now);
  save(s);
}

export function allowMoreNew(s: Store, count: number) {
  const day = localDayKey();
  s.newIntroduced[day] = Math.max(0, (s.newIntroduced[day] ?? 0) - count);
  save(s);
}

export function exportJson(s: Store) {
  return JSON.stringify({ ...s, exportedAt: new Date().toISOString() }, null, 2);
}

export function mergeImport(s: Store, text: string): { added: number; updated: number } {
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
