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

  const items = sortedPosts.map((post) => `
    <entry>
      <title>${post.data.title || `Quoting ${post.data.author || ''}`}</title>
      <link href="${new URL(getPostUrl(post), SITE.url)}" rel="alternate"/>
      <published>${post.data.pubDate.toISOString()}</published>
      <updated>${(post.data.updatedDate || post.data.pubDate).toISOString()}</updated>
      <id>${new URL(getPostUrl(post), SITE.url)}</id>
      <summary type="html"><![CDATA[${post.data.description || post.body?.slice(0, 200) || ''}]]></summary>
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
