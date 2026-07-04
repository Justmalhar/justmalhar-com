import { defineCollection, z } from 'astro:content';

const essays = defineCollection({
  type: 'content',
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
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    externalUrl: z.string().url(),
    via: z.string().optional(),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const quotes = defineCollection({
  type: 'content',
  schema: z.object({
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    source: z.string(),
    sourceUrl: z.string().url().optional(),
    author: z.string(),
  }),
});

const guides = defineCollection({
  type: 'content',
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

export const collections = { essays, links, notes, quotes, guides };
