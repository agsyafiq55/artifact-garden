import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TOPIC_IDS } from './lib/topics';

const slugs = (collection: 'terms') => z.array(reference(collection)).default([]);

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

export const collections = { artifacts, terms };
