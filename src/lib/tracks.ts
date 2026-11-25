import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './url';

export type Track = CollectionEntry<'tracks'>;
export type TrackNode = Track['data']['sections'][number]['nodes'][number];
export type NodeStatus = 'not-started' | 'has-terms' | 'has-artifact';

export async function getTracks() {
  const list = await getCollection('tracks');
  return list.sort((a, b) => a.data.order - b.data.order);
}

export const nodeStatus = (n: TrackNode): NodeStatus =>
  n.artifacts.length > 0 ? 'has-artifact' : n.terms.length > 0 ? 'has-terms' : 'not-started';

export const allNodes = (t: Track) => t.data.sections.flatMap((s) => s.nodes.map((n) => ({ ...n, section: s.title })));

export function nextNodes(t: Track, count = 3) {
  return allNodes(t).filter((n) => n.level === 'core' && nodeStatus(n) !== 'has-artifact').slice(0, count);
}

export function trackProgress(t: Track) {
  const core = allNodes(t).filter((n) => n.level === 'core');
  return { done: core.filter((n) => nodeStatus(n) === 'has-artifact').length, total: core.length };
}

export async function nodeForArtifact(artifactId: string) {
  for (const t of await getTracks()) {
    for (const n of allNodes(t)) {
      if (n.artifacts.some((a) => a.id === artifactId)) return { track: t, node: n };
    }
  }
  return null;
}

export const trackHref = (t: Track, nodeId?: string) => withBase(`/materials/${t.id}${nodeId ? `#${nodeId}` : ''}`);

export const UNSORTED = 'unsorted';

/** Tracks, sections and nodes that hold at least one artifact, with the artifact entries resolved. */
export async function artifactTree() {
  const { getArtifacts } = await import('./content');
  const artifacts = await getArtifacts();
  const byId = new Map(artifacts.map((a) => [a.id, a]));
  const placed = new Set<string>();
  const tracks = (await getTracks())
    .map((t) => ({
      track: t,
      sections: t.data.sections
        .map((s) => ({
          section: s,
          concepts: s.nodes
            .map((n) => ({ node: n, artifacts: n.artifacts.map((r) => byId.get(r.id)).filter((a) => !!a) }))
            .filter((c) => c.artifacts.length > 0),
        }))
        .filter((s) => s.concepts.length > 0),
    }))
    .filter((t) => t.sections.length > 0);
  for (const t of tracks) for (const s of t.sections) for (const c of s.concepts) for (const a of c.artifacts) placed.add(a.id);
  const unsorted = artifacts.filter((a) => !placed.has(a.id));
  return { tracks, unsorted, total: artifacts.length };
}

export const countLabel = (n: number) => `${n} ${n === 1 ? 'artifact' : 'artifacts'}`;
