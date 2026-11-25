import { getCollection, type CollectionEntry } from 'astro:content';

export type Artifact = CollectionEntry<'artifacts'>;
export type Term = CollectionEntry<'terms'>;

export async function getArtifacts() {
  const list = await getCollection('artifacts');
  return list.sort((a, b) => b.data.created.getTime() - a.data.created.getTime());
}

export async function getTerms() {
  const list = await getCollection('terms');
  return list.sort((a, b) => a.data.term.localeCompare(b.data.term, 'en', { sensitivity: 'base' }));
}

/** term id → artifacts that introduced it */
export async function getTermSources() {
  const map = new Map<string, Artifact[]>();
  for (const a of await getArtifacts()) {
    for (const ref of a.data.terms) {
      if (!map.has(ref.id)) map.set(ref.id, []);
      map.get(ref.id)!.push(a);
    }
  }
  return map;
}

/** Terms that point at this term via related/contrasts (so links show both ways). */
export function backlinks(terms: Term[], id: string) {
  const related = new Set<string>();
  const contrasts = new Set<string>();
  for (const t of terms) {
    if (t.data.related.some((r) => r.id === id)) related.add(t.id);
    if (t.data.contrasts.some((r) => r.id === id)) contrasts.add(t.id);
  }
  return { related, contrasts };
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
