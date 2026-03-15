import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { cache } from 'react';
import type { ContentFrontmatter, ContentItem, ContentType } from '@/lib/content/types';

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const COLLECTIONS = ['essays', 'notes', 'playbooks', 'products'] as const;

type CollectionName = (typeof COLLECTIONS)[number];

function assertFrontmatter(data: Record<string, unknown>, filePath: string): ContentFrontmatter {
  const frontmatter = data as Partial<ContentFrontmatter>;

  if (!frontmatter.title || !frontmatter.slug || !frontmatter.summary || !frontmatter.type || !frontmatter.status || !frontmatter.accessLevel || !frontmatter.publishedAt) {
    throw new Error(`Missing required frontmatter in ${filePath}`);
  }

  return {
    title: frontmatter.title,
    slug: frontmatter.slug,
    summary: frontmatter.summary,
    type: frontmatter.type,
    status: frontmatter.status,
    accessLevel: frontmatter.accessLevel,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    tags: frontmatter.tags ?? [],
    eyebrow: frontmatter.eyebrow,
    ctaLabel: frontmatter.ctaLabel,
    ctaHref: frontmatter.ctaHref,
    price: frontmatter.price,
    deliveryMode: frontmatter.deliveryMode,
    coverImage: frontmatter.coverImage,
    seoTitle: frontmatter.seoTitle,
    seoDescription: frontmatter.seoDescription,
  };
}

function readCollection(collection: CollectionName): ContentItem[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((fileName) => {
      const filePath = path.join(dir, fileName);
      const source = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(source);
      const frontmatter = assertFrontmatter(data, filePath);

      return {
        ...frontmatter,
        body: content,
        filePath,
        collection,
        readingTime: readingTime(content).text,
      };
    })
    .filter((item) => item.status === 'published')
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export const getAllContent = cache(() => COLLECTIONS.flatMap((collection) => readCollection(collection)));

export const getContentByType = cache((type: ContentType) => getAllContent().filter((item) => item.type === type));

export const getContentBySlug = cache((slug: string) => getAllContent().find((item) => item.slug === slug));

export function getFeaturedContent(count = 3) {
  return getAllContent().slice(0, count);
}

export function getRelatedContent(item: ContentItem, count = 3) {
  return getAllContent()
    .filter((candidate) => candidate.slug !== item.slug)
    .filter((candidate) => candidate.tags?.some((tag) => item.tags?.includes(tag)) || candidate.type === item.type)
    .slice(0, count);
}
