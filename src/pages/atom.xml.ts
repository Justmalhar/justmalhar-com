import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '@/lib/constants';
import { sortPosts, getPostUrl } from '@/lib/utils';
import type { APIContext } from 'astro';

type Post = CollectionEntry<'essays'> | CollectionEntry<'links'> | CollectionEntry<'notes'> | CollectionEntry<'quotes'> | CollectionEntry<'guides'>;

function getPostTitle(post: Post): string {
  if ('title' in post.data && typeof post.data.title === 'string') {
    return post.data.title;
  }
  if ('author' in post.data && typeof post.data.author === 'string') {
    return `Quoting ${post.data.author}`;
  }
  return 'Untitled';
}

function getPostDescription(post: Post): string {
  if ('description' in post.data && typeof post.data.description === 'string') {
    return post.data.description;
  }
  return post.body?.slice(0, 200) || '';
}

function getPostUpdatedDate(post: Post): Date {
  if ('updatedDate' in post.data && post.data.updatedDate instanceof Date) {
    return post.data.updatedDate;
  }
  return post.data.pubDate;
}

export async function GET(_context: APIContext) {
  const essays = await getCollection('essays');
  const links = await getCollection('links');
  const notes = await getCollection('notes');
  const quotes = await getCollection('quotes');
  const guides = await getCollection('guides');

  const allPosts = [...essays, ...links, ...notes, ...quotes, ...guides];
  const sortedPosts = sortPosts(allPosts);

  const items = sortedPosts.map((post) => `
    <entry>
      <title>${getPostTitle(post)}</title>
      <link href="${new URL(getPostUrl(post), SITE.url)}" rel="alternate"/>
      <published>${post.data.pubDate.toISOString()}</published>
      <updated>${getPostUpdatedDate(post).toISOString()}</updated>
      <id>${new URL(getPostUrl(post), SITE.url)}</id>
      <summary type="html"><![CDATA[${getPostDescription(post)}]]></summary>
      ${post.data.tags.map(tag => `<category term="${tag}"/>`).join('\n      ')}
    </entry>
  `).join('\n');

  const atomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xml:lang="en-us" xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE.title}</title>
  <link href="${new URL('/rss.xml', SITE.url)}" rel="alternate"/>
  <link href="${new URL('/atom.xml', SITE.url)}" rel="self"/>
  <id>${SITE.url}</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>${SITE.author}</name>
  </author>
  ${items}
</feed>`;

  return new Response(atomFeed, {
    headers: {
      'Content-Type': 'application/atom+xml',
    },
  });
}
