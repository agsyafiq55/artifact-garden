import { getArtifacts, getTerms } from './content';
import { withBase } from './url';

export interface GNode { id: string; label: string; kind: 'term' | 'artifact'; topic: string; href: string; degree: number }
export interface GLink { source: string; target: string; kind: 'related' | 'contrast' | 'source' }

export async function buildGraph() {
  const terms = await getTerms();
  const artifacts = await getArtifacts();
  const nodes: GNode[] = [];
  const links: GLink[] = [];
  const seen = new Set<string>();
  const add = (l: GLink) => {
    const key = [l.kind, ...[l.source, l.target].sort()].join('|');
    if (l.source === l.target || seen.has(key)) return;
    seen.add(key);
    links.push(l);
  };

  for (const t of terms) {
    nodes.push({ id: `t:${t.id}`, label: t.data.term, kind: 'term', topic: t.data.topic, href: withBase(`/terms/${t.id}`), degree: 0 });
    t.data.related.forEach((r) => add({ source: `t:${t.id}`, target: `t:${r.id}`, kind: 'related' }));
    t.data.contrasts.forEach((r) => add({ source: `t:${t.id}`, target: `t:${r.id}`, kind: 'contrast' }));
  }
  for (const a of artifacts) {
    nodes.push({ id: `a:${a.id}`, label: a.data.title, kind: 'artifact', topic: a.data.topic, href: withBase(`/a/${a.id}`), degree: 0 });
    a.data.terms.forEach((r) => add({ source: `a:${a.id}`, target: `t:${r.id}`, kind: 'source' }));
  }

  const ids = new Set(nodes.map((n) => n.id));
  const valid = links.filter((l) => ids.has(l.source) && ids.has(l.target));
  const byId = new Map(nodes.map((n) => [n.id, n]));
  for (const l of valid) { byId.get(l.source)!.degree++; byId.get(l.target)!.degree++; }
  return { nodes, links: valid };
}
