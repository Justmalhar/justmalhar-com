import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
  }),
});

const links = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/links' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    externalUrl: z.string(),
    ogImage: z.string().optional(),
    via: z.string().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const quotes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/quotes' }),
  schema: z.object({
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    source: z.string(),
    sourceUrl: z.string().optional(),
    author: z.string(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
  }),
});

const setup = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/setup' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['hardware', 'os', 'editor', 'terminal', 'ai', 'browser', 'productivity', 'deploy']),
    description: z.string(),
    url: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, links, notes, quotes, guides, setup };
