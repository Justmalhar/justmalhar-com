import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://justmalhar.com',
  integrations: [mdx(), sitemap()],
  redirects: {
    '/links': '/inspiration',
    '/links/[...slug]': '/inspiration/[...slug]',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
