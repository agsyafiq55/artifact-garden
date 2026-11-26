import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TOPIC_IDS } from './lib/topics';

const slugs = (collection: 'terms') => z.array(reference(collection)).default([]);

const reference_ = z.object({
  title: z.string(),
  publisher: z.string(),
  url: z.string().regex(/^https:\/\/\S+$/, 'Reference URLs are full https links.'),
  kind: z.enum(['spec', 'docs', 'paper', 'book', 'course', 'article', 'video']),
  note: z.string().optional(),
});

const artifacts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/artifacts' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(200),
    topic: z.enum(TOPIC_IDS),
    tags: z.array(z.string()).default([]),
    created: z.coerce.date(),
    terms: slugs('terms'),
    prompt: z.string().optional(),
    references: z.array(reference_).default([]),
  }),
});

const terms = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/terms' }),
  schema: z.object({
    term: z.string(),
    aka: z.array(z.string()).default([]),
    definition: z
      .string()
      .max(180, 'Keep the definition to one line (≤180 chars).')
      .refine((s) => !s.includes('\n'), 'Definition must be a single line.'),
    analogy: z.string(),
    example: z.string(),
    related: slugs('terms'),
    contrasts: slugs('terms'),
    topic: z.enum(TOPIC_IDS),
    tags: z.array(z.string()).default([]),
    added: z.coerce.date(),
  }),
});

const node = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'Node ids are kebab-case.'),
  title: z.string(),
  level: z.enum(['core', 'extra']).default('core'),
  artifacts: z.array(reference('artifacts')).default([]),
  terms: slugs('terms'),
});

const tracks = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/tracks' }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string().max(200),
      order: z.number().default(1),
      sections: z.array(z.object({ id: z.string(), title: z.string(), nodes: z.array(node).min(1) })).min(1),
    })
    .refine((t) => {
      const ids = t.sections.flatMap((s) => s.nodes.map((n) => n.id));
      return new Set(ids).size === ids.length;
    }, 'Every node id in a track must be unique.'),
});

export const collections = { artifacts, terms, tracks };
