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

export const trackHref = (t: Track, nodeId?: string) => withBase(`/tracks/${t.id}${nodeId ? `#${nodeId}` : ''}`);
