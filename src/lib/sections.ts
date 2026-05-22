import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const BLOG_SECTIONS = {
  essay: {
    label: 'Essays',
    path: '/essays',
    eyebrow: 'Essay',
    description: 'Longer pieces on systems, craft, and ideas that need room to breathe.',
  },
  note: {
    label: 'Notes',
    path: '/notes',
    eyebrow: 'Note',
    description: 'Shorter updates, observations, and half-formed thoughts worth keeping.',
  },
  guide: {
    label: 'Guides',
    path: '/guides',
    eyebrow: 'Guide',
    description: 'Practical references and how-tos you can return to when building.',
  },
} as const;

export type BlogSection = keyof typeof BLOG_SECTIONS;

export const sectionSchema = ['essay', 'note', 'guide'] as const;

export async function getPublishedPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getPostsBySection(section: BlogSection) {
  return (await getPublishedPosts()).filter((post) => post.data.section === section);
}

export function groupPostsByYear(posts: CollectionEntry<'blog'>[]) {
  const groups = new Map<number, CollectionEntry<'blog'>[]>();

  for (const post of posts) {
    const year = post.data.pubDate.getFullYear();
    const list = groups.get(year) ?? [];
    list.push(post);
    groups.set(year, list);
  }

  return [...groups.entries()].sort(([a], [b]) => b - a);
}

export const NAV_ITEMS = [
  { href: '/blog', label: 'All', match: (path: string) => path === '/blog' },
  { href: '/essays', label: 'Essays', match: (path: string) => path.startsWith('/essays') },
  { href: '/notes', label: 'Notes', match: (path: string) => path.startsWith('/notes') },
  { href: '/guides', label: 'Guides', match: (path: string) => path.startsWith('/guides') },
  { href: '/archive', label: 'Archive', match: (path: string) => path.startsWith('/archive') },
  { href: '/setup', label: 'Setup', match: (path: string) => path.startsWith('/setup') },
  { href: '/about', label: 'About', match: (path: string) => path === '/about' },
] as const;

export function getActiveNavHref(pathname: string, postSection?: BlogSection) {
  if (pathname.startsWith('/blog/') && postSection) {
    return BLOG_SECTIONS[postSection].path;
  }

  const item = NAV_ITEMS.find(({ match }) => match(pathname));
  return item?.href;
}
