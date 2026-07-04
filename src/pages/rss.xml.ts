import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/lib/constants';
import { sortPosts, getPostUrl } from '@/lib/utils';
import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';

function getPostTitle(post: CollectionEntry<'essays'> | CollectionEntry<'links'> | CollectionEntry<'notes'> | CollectionEntry<'quotes'> | CollectionEntry<'guides'>): string {
  if ('title' in post.data && typeof post.data.title === 'string') {
    return post.data.title;
  }
  if ('author' in post.data && typeof post.data.author === 'string') {
    return `Quoting ${post.data.author}`;
  }
  return 'Untitled';
}

function getPostDescription(post: CollectionEntry<'essays'> | CollectionEntry<'links'> | CollectionEntry<'notes'> | CollectionEntry<'quotes'> | CollectionEntry<'guides'>): string {
  if ('description' in post.data && typeof post.data.description === 'string') {
    return post.data.description;
  }
  return post.body?.slice(0, 200) || '';
}

export async function GET(context: APIContext) {
  const essays = await getCollection('essays');
  const links = await getCollection('links');
  const notes = await getCollection('notes');
  const quotes = await getCollection('quotes');
  const guides = await getCollection('guides');

  const allPosts = [...essays, ...links, ...notes, ...quotes, ...guides];
  const sortedPosts = sortPosts(allPosts);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site || SITE.url,
    items: sortedPosts.map((post) => ({
      title: getPostTitle(post),
      pubDate: post.data.pubDate,
      description: getPostDescription(post),
      link: getPostUrl(post),
    })),
    customData: `<language>en-us</language>`,
  });
}
