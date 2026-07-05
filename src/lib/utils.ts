import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'> | CollectionEntry<'links'> | CollectionEntry<'notes'> | CollectionEntry<'quotes'> | CollectionEntry<'guides'>;

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function sortPosts(posts: BlogPost[]): BlogPost[] {
  return posts
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return sortPosts(posts.filter(post => post.data.tags.includes(tag)));
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    if (!post.data.draft) {
      post.data.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

const COLLECTION_URL_SEGMENTS: Partial<Record<BlogPost['collection'], string>> = {
  links: 'inspiration',
};

const COLLECTION_LABELS: Partial<Record<BlogPost['collection'], string>> = {
  links: 'Inspiration',
};

const COLLECTION_ICONS: Partial<Record<BlogPost['collection'], string>> = {
  links: 'inspiration',
};

export function getPostUrl(post: BlogPost): string {
  const segment = COLLECTION_URL_SEGMENTS[post.collection] ?? post.collection;
  return `/${segment}/${post.id}/`;
}

export function getCollectionLabel(collection: BlogPost['collection']): string {
  return COLLECTION_LABELS[collection] ?? collection.charAt(0).toUpperCase() + collection.slice(1);
}

export function getCollectionIcon(collection: BlogPost['collection']): string {
  return COLLECTION_ICONS[collection] ?? collection;
}

export function getPopularTags(posts: BlogPost[], limit = 5): { tag: string; count: number }[] {
  return getAllTags(posts)
    .map(tag => ({
      tag,
      count: posts.filter(p => !p.data.draft && p.data.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '...';
}

export function getPlainTextExcerpt(body: string | undefined, maxLength = 220): string {
  if (!body) return '';

  const text = body
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`~>-]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  return truncate(text, maxLength);
}