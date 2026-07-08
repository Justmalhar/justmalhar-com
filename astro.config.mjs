import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://justmalhar.com',
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
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
