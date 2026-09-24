import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const changelogEntry = z.object({
  version: z.string(),
  date: z.string(),
  summary: z.string(),
});

const client = z.object({
  name: z.string(),
  logo: z.string(),
  url: z.string().url().optional(),
});

// One directory per product: src/content/products/<slug>/index.md is the
// overview, changelog.md is the long-form changelog. The id is the directory
// name, so the slug stays exactly what it was before the migration.
const products = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/products',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    name: z.string(),
    status: z.enum(['Live', 'Beta', 'In Progress']),
    category: z.string(),
    year: z.string(),
    description: z.string(),
    client: client.optional(),
    tags: z.array(z.string()).min(1),
    changelog: z.array(changelogEntry).min(1),
  }),
});

const productChangelogs = defineCollection({
  loader: glob({
    pattern: '*/changelog.md',
    base: './src/content/products',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({}).passthrough(),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.string(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { products, productChangelogs, posts, projects };
