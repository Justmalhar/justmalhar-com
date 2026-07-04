import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/lib/constants';
import { sortPosts, getPostUrl } from '@/lib/utils';
import type { APIContext } from 'astro';

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
      title: post.data.title || `Quoting ${post.data.author || ''}`,
      pubDate: post.data.pubDate,
      description: post.data.description || post.body?.slice(0, 200),
      link: getPostUrl(post),
    })),
    customData: `<language>en-us</language>`,
  });
}
