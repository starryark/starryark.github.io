import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const artifact = z.object({ label: z.string(), url: z.url() });
const author = z.object({
  name: z.string(),
  affiliation: z.string().optional(),
  orcid: z.url().optional(),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    kind: z.enum(['Essay', 'How-to', 'Research', 'Note']).default('Essay'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    authors: z
      .array(author)
      .min(1)
      .default([{ name: 'Yangyi Liu' }]),
    abstract: z.string().optional(),
    venue: z.string().optional(),
    status: z.string().optional(),
    doi: z.string().optional(),
    arxiv: z.string().optional(),
    pdf: z.url().optional(),
    artifacts: z.array(artifact).default([]),
    license: z.string().optional(),
    version: z.string().optional(),
    math: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string(), description: z.string() }),
});

export const collections = { writing, pages };
