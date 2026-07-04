import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'essays'> | CollectionEntry<'links'> | CollectionEntry<'notes'> | CollectionEntry<'quotes'> | CollectionEntry<'guides'>;

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

export function getPostUrl(post: BlogPost): string {
  const slug = post.slug || post.id;
  return `/${post.collection}/${slug}/`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '...';
}