# justmalhar.com Personal Blog Rebuild

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Simon Willison-style personal blog/newsletter platform with Astro, supporting 5 content types (Essays, Links, Notes, Quotes, Guides), full SEO optimization, RSS/Atom feeds, and newsletter signup.

**Architecture:** Astro-based static site with content collections using YAML frontmatter. Each content type gets its own collection with type-specific schemas. The site generates static pages at build time with clean URL structure (`/type/YYYY/Mon/DD/slug/`). SEO handled via meta tags, Open Graph, JSON-LD, sitemap, and feeds.

**Tech Stack:** Astro 5.x, TypeScript, RSS/Atom feeds, Vercel deployment

---

## File Structure

```
justmalhar-com/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── og-default.png
├── src/
│   ├── content/
│   │   ├── config.ts                    # Content collection schemas
│   │   ├── essays/                      # Long-form blog posts
│   │   ├── links/                       # Short link posts with commentary
│   │   ├── notes/                       # Short thoughts/observations
│   │   ├── quotes/                      # Quoted content with attribution
│   │   └── guides/                      # Tutorial/how-to content
│   ├── layouts/
│   │   ├── BaseLayout.astro             # Base HTML with meta tags
│   │   └── PostLayout.astro             # Post-specific layout
│   ├── components/
│   │   ├── Head.astro                   # SEO meta, Open Graph, JSON-LD
│   │   ├── Header.astro                 # Site navigation
│   │   ├── Footer.astro                 # Site footer with newsletter
│   │   ├── PostCard.astro               # Reusable post card
│   │   ├── TagList.astro                # Tag display component
│   │   └── NewsletterForm.astro         # Email capture form
│   ├── lib/
│   │   ├── utils.ts                     # Helper functions
│   │   └── constants.ts                 # Site metadata
│   └── pages/
│       ├── index.astro                  # Home page
│       ├── about.astro                  # About page
│       ├── essays/
│       │   └── index.astro              # Essays listing
│       ├── links/
│       │   └── index.astro              # Links listing
│       ├── notes/
│       │   └── index.astro              # Notes listing
│       ├── quotes/
│       │   └── index.astro              # Quotes listing
│       ├── guides/
│       │   └── index.astro              # Guides listing
│       ├── tags/
│       │   ├── index.astro              # All tags
│       │   └── [tag].astro              # Posts by tag
│       ├── essays/
│       │   └── [...slug].astro          # Individual essay
│       ├── links/
│       │   └── [...slug].astro          # Individual link post
│       ├── notes/
│       │   └── [...slug].astro          # Individual note
│       ├── quotes/
│       │   └── [...slug].astro          # Individual quote
│       ├── guides/
│       │   └── [...slug].astro          # Individual guide
│       ├── rss.xml.ts                   # RSS feed
│       └── atom.xml.ts                  # Atom feed
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`

- [ ] **Step 1: Delete existing files**

```bash
cd /Users/malharujawane/Documents/Development/justmalhar-com
git rm -rf . || true
rm -rf .astro .vscode src public package-lock.json package.json astro.config.mjs tsconfig.json README.md
```

- [ ] **Step 2: Initialize Astro project**

```bash
npm create astro@latest . -- --template basics --no-install --typescript relaxed
```

- [ ] **Step 3: Install dependencies**

```bash
npm install
npm install @astrojs/rss @astrojs/sitemap
```

- [ ] **Step 4: Update package.json scripts**

```json
{
  "name": "justmalhar-com",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

- [ ] **Step 5: Configure astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://justmalhar.com',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
```

- [ ] **Step 6: Configure tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 7: Create .gitignore**

```
node_modules/
dist/
.astro/
.env
.env.local
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: initialize astro project with dependencies"
```

---

## Task 2: Content Collection Schemas

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Create content collection schemas**

```typescript
import { defineCollection, z } from 'astro:content';

const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
  }),
});

const links = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    externalUrl: z.string().url(),
    via: z.string().optional(),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const quotes = defineCollection({
  type: 'content',
  schema: z.object({
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    source: z.string(),
    sourceUrl: z.string().url().optional(),
    author: z.string(),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
  }),
});

export const collections = { essays, links, notes, quotes, guides };
```

- [ ] **Step 2: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: add content collection schemas for all post types"
```

---

## Task 3: Site Constants and Utilities

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create site constants**

```typescript
export const SITE = {
  title: "Malhar Ujawane",
  description: "Personal blog and digital garden of Malhar Ujawane - Staff Software Engineer, writing about AI, coding, and technology.",
  url: "https://justmalhar.com",
  author: "Malhar Ujawane",
  email: "malhar@justmalhar.com",
  social: {
    twitter: "https://twitter.com/justmalhar",
    github: "https://github.com/justmalhar",
    linkedin: "https://linkedin.com/in/justmalhar",
    instagram: "https://instagram.com/justmalhar",
    threads: "https://threads.net/@justmalhar",
    medium: "https://medium.com/justmalhar",
  }
} as const;

export const NAV_ITEMS = [
  { label: "Essays", href: "/essays" },
  { label: "Links", href: "/links" },
  { label: "Notes", href: "/notes" },
  { label: "Quotes", href: "/quotes" },
  { label: "Guides", href: "/guides" },
  { label: "Tags", href: "/tags" },
  { label: "About", href: "/about" },
] as const;
```

- [ ] **Step 2: Create utility functions**

```typescript
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
  const date = post.data.pubDate;
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const slug = post.slug || post.id;
  
  return `/${post.collection}/${year}/${month}/${day}/${slug}/`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '...';
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/
git commit -m "feat: add site constants and utility functions"
```

---

## Task 4: Base Layout and Components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Head.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Head component with SEO**

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  canonicalURL?: string;
  type?: string;
}

const { title, description, image, canonicalURL, type = 'website' } = Astro.props;
const { SITE } = await import('@/lib/constants');

const pageTitle = title === SITE.title ? title : `${title} | ${SITE.title}`;
const pageImage = image || '/og-default.png';
const pageURL = canonicalURL || new URL(Astro.url.pathname, SITE.url);
---

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="generator" content={Astro.generator} />
  
  <!-- Primary Meta Tags -->
  <title>{pageTitle}</title>
  <meta name="title" content={pageTitle} />
  <meta name="description" content={description} />
  <link rel="canonical" href={pageURL} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={pageURL} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(pageImage, SITE.url)} />
  <meta property="og:site_name" content={SITE.title} />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={pageURL} />
  <meta property="twitter:title" content={pageTitle} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={new URL(pageImage, SITE.url)} />
  <meta property="twitter:creator" content="@justmalhar" />
  
  <!-- RSS Feeds -->
  <link rel="alternate" type="application/rss+xml" title={`${SITE.title} RSS`} href="/rss.xml" />
  <link rel="alternate" type="application/atom+xml" title={`${SITE.title} Atom`} href="/atom.xml" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'Article' : 'WebSite',
    "name": pageTitle,
    "description": description,
    "url": pageURL,
    "author": {
      "@type": "Person",
      "name": SITE.author,
      "url": SITE.url
    }
  })} />
</head>
```

- [ ] **Step 2: Create Header component**

```astro
---
import { NAV_ITEMS } from '@/lib/constants';
---

<header class="site-header">
  <nav class="site-nav">
    <a href="/" class="site-logo">Malhar Ujawane</a>
    <ul class="nav-links">
      {NAV_ITEMS.map(item => (
        <li>
          <a href={item.href} class:list={[{ active: Astro.url.pathname.startsWith(item.href) }]}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</header>

<style>
  .site-header {
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem 0;
  }
  
  .site-nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .site-logo {
    font-size: 1.25rem;
    font-weight: 700;
    text-decoration: none;
    color: #111;
  }
  
  .nav-links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-links a {
    text-decoration: none;
    color: #666;
    font-size: 0.9rem;
  }
  
  .nav-links a:hover,
  .nav-links a.active {
    color: #111;
  }
  
  @media (max-width: 768px) {
    .site-nav {
      flex-direction: column;
      gap: 1rem;
    }
    
    .nav-links {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
```

- [ ] **Step 3: Create Footer component**

```astro
---
import { SITE } from '@/lib/constants';
---

<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-section">
      <h3>Subscribe</h3>
      <p>Get updates via RSS or email.</p>
      <form class="newsletter-form" action="#" method="POST">
        <input type="email" name="email" placeholder="your@email.com" required />
        <button type="submit">Subscribe</button>
      </form>
      <div class="feed-links">
        <a href="/rss.xml">RSS</a>
        <a href="/atom.xml">Atom</a>
      </div>
    </div>
    
    <div class="footer-section">
      <h3>Connect</h3>
      <ul class="social-links">
        <li><a href={SITE.social.twitter} target="_blank" rel="noopener">Twitter</a></li>
        <li><a href={SITE.social.github} target="_blank" rel="noopener">GitHub</a></li>
        <li><a href={SITE.social.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a href={SITE.social.instagram} target="_blank" rel="noopener">Instagram</a></li>
      </ul>
    </div>
    
    <div class="footer-section">
      <p>&copy; {new Date().getFullYear()} {SITE.author}. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    border-top: 1px solid #e5e7eb;
    padding: 3rem 0;
    margin-top: 4rem;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .footer-section h3 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
  
  .newsletter-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .newsletter-form input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
  }
  
  .newsletter-form button {
    padding: 0.5rem 1rem;
    background: #111;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .feed-links {
    display: flex;
    gap: 1rem;
  }
  
  .feed-links a {
    color: #666;
    text-decoration: none;
  }
  
  .social-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .social-links li {
    margin-bottom: 0.5rem;
  }
  
  .social-links a {
    color: #666;
    text-decoration: none;
  }
  
  .social-links a:hover {
    color: #111;
  }
</style>
```

- [ ] **Step 4: Create BaseLayout**

```astro
---
import Head from '@/components/Head.astro';
import Header from '@/components/Header.astro';
import Footer from '@/components/Footer.astro';
import { SITE } from '@/lib/constants';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const {
  title = SITE.title,
  description = SITE.description,
  image,
  type
} = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <Head title={title} description={description} image={image} type={type} />
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>

<style is:global>
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    line-height: 1.6;
    color: #111;
    margin: 0;
    padding: 0;
  }
  
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    min-height: calc(100vh - 200px);
  }
  
  a {
    color: #111;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  .prose {
    max-width: 720px;
  }
  
  .prose h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  
  .prose h2 {
    font-size: 1.75rem;
    line-height: 1.3;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .prose h3 {
    font-size: 1.25rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .prose p {
    margin-bottom: 1.25rem;
  }
  
  .prose blockquote {
    border-left: 3px solid #e5e7eb;
    margin: 1.5rem 0;
    padding: 0.5rem 1.5rem;
    color: #555;
  }
  
  .prose code {
    background: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
  }
  
  .prose pre {
    background: #1a1a1a;
    color: #fff;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }
  
  .prose pre code {
    background: none;
    padding: 0;
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/layouts/ src/components/
git commit -m "feat: add base layout, header, footer, and SEO components"
```

---

## Task 5: Home Page

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create home page**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PostCard from '@/components/PostCard.astro';
import { SITE } from '@/lib/constants';
import { getCollection } from 'astro:content';
import { sortPosts, getPostUrl } from '@/lib/utils';

const essays = await getCollection('essays');
const links = await getCollection('links');
const notes = await getCollection('notes');
const quotes = await getCollection('quotes');
const guides = await getCollection('guides');

const allPosts = [...essays, ...links, ...notes, ...quotes, ...guides];
const recentPosts = sortPosts(allPosts).slice(0, 10);
---

<BaseLayout title={SITE.title} description={SITE.description}>
  <section class="hero">
    <h1>Malhar Ujawane</h1>
    <p class="lead">Staff Software Engineer writing about AI, coding, and technology.</p>
    <div class="hero-links">
      <a href="/about">About</a>
      <a href="/essays">Essays</a>
      <a href="/tags">Tags</a>
    </div>
  </section>
  
  <section class="recent-posts">
    <h2>Recent Writing</h2>
    <div class="post-list">
      {recentPosts.map(post => (
        <PostCard post={post} />
      ))}
    </div>
  </section>
</BaseLayout>

<style>
  .hero {
    padding: 4rem 0;
    text-align: center;
  }
  
  .hero h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
  
  .lead {
    font-size: 1.25rem;
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  .hero-links {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }
  
  .hero-links a {
    color: #666;
    text-decoration: none;
  }
  
  .hero-links a:hover {
    color: #111;
  }
  
  .recent-posts {
    padding: 2rem 0;
  }
  
  .recent-posts h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .post-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add home page with recent posts"
```

---

## Task 6: Post Card Component

**Files:**
- Create: `src/components/PostCard.astro`

- [ ] **Step 1: Create PostCard component**

```astro
---
import type { CollectionEntry } from 'astro:content';
import { formatDate, getPostUrl } from '@/lib/utils';

type Post = CollectionEntry<'essays'> | CollectionEntry<'links'> | CollectionEntry<'notes'> | CollectionEntry<'quotes'> | CollectionEntry<'guides'>;

interface Props {
  post: Post;
}

const { post } = Astro.props;
const url = getPostUrl(post);
const collectionLabel = post.collection.charAt(0).toUpperCase() + post.collection.slice(1);
---

<article class="post-card">
  <div class="post-meta">
    <span class="post-type">{collectionLabel}</span>
    <time datetime={post.data.pubDate.toISOString()}>
      {formatDate(post.data.pubDate)}
    </time>
  </div>
  
  {post.data.title ? (
    <h3 class="post-title">
      <a href={url}>{post.data.title}</a>
    </h3>
  ) : null}
  
  {post.collection === 'quotes' ? (
    <blockquote class="post-quote">
      <p>{post.body?.slice(0, 200)}...</p>
      <cite>— {post.data.author}</cite>
    </blockquote>
  ) : post.collection === 'links' ? (
    <div class="post-link">
      <a href={post.data.externalUrl} target="_blank" rel="noopener">
        {post.data.title || post.data.externalUrl}
      </a>
      {post.data.via && (
        <span class="post-via">via {post.data.via}</span>
      )}
    </div>
  ) : (
    <p class="post-excerpt">{post.data.description}</p>
  )}
  
  {post.data.tags.length > 0 && (
    <div class="post-tags">
      {post.data.tags.map(tag => (
        <a href={`/tags/${tag}`} class="tag">#{tag}</a>
      ))}
    </div>
  )}
</article>

<style>
  .post-card {
    padding: 1.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .post-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: #666;
  }
  
  .post-type {
    background: #f3f4f6;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
  }
  
  .post-title {
    font-size: 1.25rem;
    margin: 0.5rem 0;
  }
  
  .post-title a {
    text-decoration: none;
  }
  
  .post-title a:hover {
    text-decoration: underline;
  }
  
  .post-excerpt {
    color: #555;
    margin: 0.5rem 0;
  }
  
  .post-quote {
    border-left: 3px solid #e5e7eb;
    margin: 0.5rem 0;
    padding: 0 1rem;
    color: #555;
  }
  
  .post-quote cite {
    display: block;
    margin-top: 0.5rem;
    font-style: normal;
    color: #666;
  }
  
  .post-link {
    margin: 0.5rem 0;
  }
  
  .post-link a {
    color: #111;
  }
  
  .post-via {
    color: #666;
    margin-left: 0.5rem;
  }
  
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  
  .tag {
    font-size: 0.875rem;
    color: #666;
    text-decoration: none;
  }
  
  .tag:hover {
    color: #111;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PostCard.astro
git commit -m "feat: add post card component for all content types"
```

---

## Task 7: Content Collection Pages

**Files:**
- Create: `src/pages/essays/index.astro`
- Create: `src/pages/links/index.astro`
- Create: `src/pages/notes/index.astro`
- Create: `src/pages/quotes/index.astro`
- Create: `src/pages/guides/index.astro`

- [ ] **Step 1: Create Essays listing page**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PostCard from '@/components/PostCard.astro';
import { getCollection } from 'astro:content';
import { sortPosts } from '@/lib/utils';

const posts = sortPosts(await getCollection('essays'));
---

<BaseLayout title="Essays" description="Long-form essays and articles by Malhar Ujawane.">
  <h1>Essays</h1>
  <p>Long-form writing about technology, AI, and software engineering.</p>
  
  <div class="post-list">
    {posts.map(post => (
      <PostCard post={post} />
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 2: Create Links listing page**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PostCard from '@/components/PostCard.astro';
import { getCollection } from 'astro:content';
import { sortPosts } from '@/lib/utils';

const posts = sortPosts(await getCollection('links'));
---

<BaseLayout title="Links" description="Curated links and bookmarks by Malhar Ujawane.">
  <h1>Links</h1>
  <p>Interesting links I've found around the web.</p>
  
  <div class="post-list">
    {posts.map(post => (
      <PostCard post={post} />
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 3: Create Notes listing page**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PostCard from '@/components/PostCard.astro';
import { getCollection } from 'astro:content';
import { sortPosts } from '@/lib/utils';

const posts = sortPosts(await getCollection('notes'));
---

<BaseLayout title="Notes" description="Short notes and observations by Malhar Ujawane.">
  <h1>Notes</h1>
  <p>Quick thoughts and observations.</p>
  
  <div class="post-list">
    {posts.map(post => (
      <PostCard post={post} />
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 4: Create Quotes listing page**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PostCard from '@/components/PostCard.astro';
import { getCollection } from 'astro:content';
import { sortPosts } from '@/lib/utils';

const posts = sortPosts(await getCollection('quotes'));
---

<BaseLayout title="Quotes" description="Notable quotes curated by Malhar Ujawane.">
  <h1>Quotes</h1>
  <p>Quotes that resonated with me.</p>
  
  <div class="post-list">
    {posts.map(post => (
      <PostCard post={post} />
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 5: Create Guides listing page**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PostCard from '@/components/PostCard.astro';
import { getCollection } from 'astro:content';
import { sortPosts } from '@/lib/utils';

const posts = sortPosts(await getCollection('guides'));
---

<BaseLayout title="Guides" description="Technical guides and tutorials by Malhar Ujawane.">
  <h1>Guides</h1>
  <p>Tutorials and how-to guides.</p>
  
  <div class="post-list">
    {posts.map(post => (
      <PostCard post={post} />
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 6: Commit**

```bash
git add src/pages/essays/ src/pages/links/ src/pages/notes/ src/pages/quotes/ src/pages/guides/
git commit -m "feat: add listing pages for all content types"
```

---

## Task 8: Individual Post Pages

**Files:**
- Create: `src/pages/essays/[...slug].astro`
- Create: `src/pages/links/[...slug].astro`
- Create: `src/pages/notes/[...slug].astro`
- Create: `src/pages/quotes/[...slug].astro`
- Create: `src/pages/guides/[...slug].astro`
- Create: `src/layouts/PostLayout.astro`

- [ ] **Step 1: Create PostLayout**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import TagList from '@/components/TagList.astro';
import { formatDate } from '@/lib/utils';

interface Props {
  title: string;
  description?: string;
  pubDate: Date;
  updatedDate?: Date;
  tags?: string[];
  heroImage?: string;
  type: string;
}

const { title, description, pubDate, updatedDate, tags = [], heroImage, type } = Astro.props;
---

<BaseLayout title={title} description={description || title} image={heroImage} type="article">
  <article class="post">
    <header class="post-header">
      <div class="post-meta">
        <span class="post-type">{type}</span>
        <time datetime={pubDate.toISOString()}>
          {formatDate(pubDate)}
        </time>
        {updatedDate && (
          <span class="updated">(updated {formatDate(updatedDate)})</span>
        )}
      </div>
      <h1>{title}</h1>
      {description && <p class="description">{description}</p>}
    </header>
    
    {heroImage && (
      <img src={heroImage} alt={title} class="hero-image" />
    )}
    
    <div class="post-content prose">
      <slot />
    </div>
    
    {tags.length > 0 && (
      <footer class="post-footer">
        <TagList tags={tags} />
      </footer>
    )}
  </article>
</BaseLayout>

<style>
  .post {
    max-width: 720px;
  }
  
  .post-header {
    margin-bottom: 2rem;
  }
  
  .post-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #666;
  }
  
  .post-type {
    background: #f3f4f6;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
  }
  
  .description {
    font-size: 1.25rem;
    color: #555;
    margin-top: 0.5rem;
  }
  
  .hero-image {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 2rem;
  }
  
  .post-footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
</style>
```

- [ ] **Step 2: Create Essay post page**

```astro
---
import PostLayout from '@/layouts/PostLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('essays');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PostLayout
  title={post.data.title}
  description={post.data.description}
  pubDate={post.data.pubDate}
  updatedDate={post.data.updatedDate}
  tags={post.data.tags}
  heroImage={post.data.heroImage}
  type="Essay"
>
  <Content />
</PostLayout>
```

- [ ] **Step 3: Create Link post page**

```astro
---
import PostLayout from '@/layouts/PostLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('links');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PostLayout
  title={post.data.title}
  description={post.data.description}
  pubDate={post.data.pubDate}
  tags={post.data.tags}
  type="Link"
>
  <div class="external-link">
    <a href={post.data.externalUrl} target="_blank" rel="noopener">
      {post.data.externalUrl} ↗
    </a>
    {post.data.via && (
      <span class="via">via {post.data.via}</span>
    )}
  </div>
  <Content />
</PostLayout>

<style>
  .external-link {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }
  
  .external-link a {
    color: #2563eb;
  }
  
  .via {
    display: block;
    margin-top: 0.5rem;
    color: #666;
    font-size: 0.875rem;
  }
</style>
```

- [ ] **Step 4: Create Note post page**

```astro
---
import PostLayout from '@/layouts/PostLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('notes');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PostLayout
  title={post.data.title || 'Note'}
  pubDate={post.data.pubDate}
  tags={post.data.tags}
  type="Note"
>
  <Content />
</PostLayout>
```

- [ ] **Step 5: Create Quote post page**

```astro
---
import PostLayout from '@/layouts/PostLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('quotes');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PostLayout
  title={`Quoting ${post.data.author}`}
  pubDate={post.data.pubDate}
  tags={post.data.tags}
  type="Quote"
>
  <blockquote>
    <Content />
  </blockquote>
  <p class="attribution">
    — {post.data.author}
    {post.data.sourceUrl ? (
      <>, <a href={post.data.sourceUrl} target="_blank" rel="noopener">{post.data.source}</a></>
    ) : (
      <>, {post.data.source}</>
    )}
  </p>
</PostLayout>

<style>
  blockquote {
    border-left: 3px solid #111;
    margin: 2rem 0;
    padding: 1rem 1.5rem;
    font-size: 1.25rem;
  }
  
  .attribution {
    color: #666;
    font-style: italic;
  }
  
  .attribution a {
    color: #2563eb;
  }
</style>
```

- [ ] **Step 6: Create Guide post page**

```astro
---
import PostLayout from '@/layouts/PostLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('guides');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PostLayout
  title={post.data.title}
  description={post.data.description}
  pubDate={post.data.pubDate}
  updatedDate={post.data.updatedDate}
  tags={post.data.tags}
  heroImage={post.data.heroImage}
  type="Guide"
>
  <Content />
</PostLayout>
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/essays/\[...slug\].astro src/pages/links/\[...slug\].astro src/pages/notes/\[...slug\].astro src/pages/quotes/\[...slug\].astro src/pages/guides/\[...slug\].astro src/layouts/PostLayout.astro
git commit -m "feat: add individual post pages for all content types"
```

---

## Task 9: Tag System

**Files:**
- Create: `src/components/TagList.astro`
- Create: `src/pages/tags/index.astro`
- Create: `src/pages/tags/[tag].astro`

- [ ] **Step 1: Create TagList component**

```astro
---
interface Props {
  tags: string[];
}

const { tags } = Astro.props;
---

<div class="tag-list">
  {tags.map(tag => (
    <a href={`/tags/${tag}`} class="tag">#{tag}</a>
  ))}
</div>

<style>
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    font-size: 0.875rem;
    color: #666;
    text-decoration: none;
    background: #f3f4f6;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
  }
  
  .tag:hover {
    background: #e5e7eb;
    color: #111;
  }
</style>
```

- [ ] **Step 2: Create Tags index page**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import { getAllTags } from '@/lib/utils';

const essays = await getCollection('essays');
const links = await getCollection('links');
const notes = await getCollection('notes');
const quotes = await getCollection('quotes');
const guides = await getCollection('guides');

const allPosts = [...essays, ...links, ...notes, ...quotes, ...guides];
const tags = getAllTags(allPosts);

// Count posts per tag
const tagCounts = tags.map(tag => {
  const count = allPosts.filter(post => 
    !post.data.draft && post.data.tags.includes(tag)
  ).length;
  return { tag, count };
});
---

<BaseLayout title="Tags" description="Browse all tags on Malhar Ujawane's blog.">
  <h1>Tags</h1>
  
  <div class="tag-cloud">
    {tagCounts.map(({ tag, count }) => (
      <a href={`/tags/${tag}`} class="tag-item">
        <span class="tag-name">#{tag}</span>
        <span class="tag-count">({count})</span>
      </a>
    ))}
  </div>
</BaseLayout>

<style>
  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .tag-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
    background: #f9fafb;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.2s;
  }
  
  .tag-item:hover {
    background: #f3f4f6;
  }
  
  .tag-name {
    color: #111;
  }
  
  .tag-count {
    color: #666;
    font-size: 0.875rem;
  }
</style>
```

- [ ] **Step 3: Create individual tag page**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PostCard from '@/components/PostCard.astro';
import { getCollection } from 'astro:content';
import { getPostsByTag } from '@/lib/utils';

export async function getStaticPaths() {
  const essays = await getCollection('essays');
  const links = await getCollection('links');
  const notes = await getCollection('notes');
  const quotes = await getCollection('quotes');
  const guides = await getCollection('guides');
  
  const allPosts = [...essays, ...links, ...notes, ...quotes, ...guides];
  const allTags = new Set(allPosts.flatMap(post => post.data.tags));
  
  return Array.from(allTags).map(tag => ({
    params: { tag },
    props: { tag, posts: getPostsByTag(allPosts, tag) },
  }));
}

const { tag, posts } = Astro.props;
---

<BaseLayout title={`#${tag}`} description={`Posts tagged with #${tag}`}>
  <h1>#{tag}</h1>
  <p>{posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with #{tag}</p>
  
  <div class="post-list">
    {posts.map(post => (
      <PostCard post={post} />
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/TagList.astro src/pages/tags/
git commit -m "feat: add tag system with tag pages and post filtering"
```

---

## Task 10: RSS and Atom Feeds

**Files:**
- Create: `src/pages/rss.xml.ts`
- Create: `src/pages/atom.xml.ts`

- [ ] **Step 1: Create RSS feed**

```typescript
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
```

- [ ] **Step 2: Create Atom feed**

```typescript
import { getCollection } from 'astro:content';
import { SITE } from '@/lib/constants';
import { sortPosts, getPostUrl, formatDate } from '@/lib/utils';
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
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/rss.xml.ts src/pages/atom.xml.ts
git commit -m "feat: add RSS and Atom feeds"
```

---

## Task 11: About Page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create About page**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { SITE } from '@/lib/constants';
---

<BaseLayout title="About" description="About Malhar Ujawane - Staff Software Engineer.">
  <article class="about">
    <h1>About Malhar Ujawane</h1>
    
    <div class="about-content prose">
      <p>Staff Software Engineer with a PhD in Computer Science from Syracuse University. Previously at Walmart Inc (4 years), Williams Sonoma (2.5 years), and Amorepacific.</p>
      
      <p>Writing about AI, coding agents, software architecture, and technology. Based in Surat, Gujarat, India.</p>
      
      <h2>Connect</h2>
      <ul>
        <li><a href={SITE.social.twitter} target="_blank" rel="noopener">Twitter/X</a></li>
        <li><a href={SITE.social.github} target="_blank" rel="noopener">GitHub</a></li>
        <li><a href={SITE.social.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a href={SITE.social.instagram} target="_blank" rel="noopener">Instagram</a></li>
        <li><a href={SITE.social.threads} target="_blank" rel="noopener">Threads</a></li>
        <li><a href={SITE.social.medium} target="_blank" rel="noopener">Medium</a></li>
      </ul>
      
      <h2>Subscribe</h2>
      <p>Get updates via RSS or email:</p>
      <div class="subscribe-links">
        <a href="/rss.xml">RSS Feed</a>
        <a href="/atom.xml">Atom Feed</a>
      </div>
    </div>
  </article>
</BaseLayout>

<style>
  .about {
    max-width: 720px;
  }
  
  .about h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
  
  .subscribe-links {
    display: flex;
    gap: 1rem;
  }
  
  .subscribe-links a {
    color: #2563eb;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add about page with social links"
```

---

## Task 12: Sample Content

**Files:**
- Create: `src/content/essays/hello-world.mdx`
- Create: `src/content/links/example-link.mdx`
- Create: `src/content/notes/first-note.mdx`
- Create: `src/content/quotes/example-quote.mdx`
- Create: `src/content/guides/getting-started.mdx`

- [ ] **Step 1: Create sample essay**

```markdown
---
title: "Hello World: Rebuilding My Digital Home"
description: "Why I'm starting fresh with a new blog built on Astro, inspired by Simon Willison's Weblog."
pubDate: 2026-07-04
tags: ["meta", "web", "astro"]
---

I've been thinking about my online presence for a while now. My previous iterations used Next.js, then Astro, but neither felt quite right.

Today I'm starting fresh. This site is built on Astro, inspired by [Simon Willison's Weblog](https://simonwillison.net) — a masterclass in personal publishing.

## Why Astro?

- **Content-first**: Markdown with YAML frontmatter
- **Fast**: Static site generation
- **Simple**: No JavaScript by default
- **RSS built-in**: Essential for a blog

## What's Coming

I'll be writing about:
- AI and coding agents
- Software architecture
- Tools and workflows
- Life in tech

Stay tuned.
```

- [ ] **Step 2: Create sample link post**

```markdown
---
title: "Simon Willison's Weblog"
description: "The gold standard for personal blogs."
pubDate: 2026-07-04
tags: ["inspiration", "web"]
externalUrl: "https://simonwillison.net"
via: "Twitter"
---

Simon Willison's blog is the inspiration for this site. It demonstrates how a personal blog can be both simple and powerful.

Key features I'm borrowing:
- Clean URL structure
- Multiple content types
- Tag-based taxonomy
- RSS/Atom feeds
- No unnecessary complexity
```

- [ ] **Step 3: Create sample note**

```markdown
---
pubDate: 2026-07-04
tags: ["meta"]
---

Started rebuilding my personal site today. Using Astro this time — it feels right for a content-focused blog.
```

- [ ] **Step 4: Create sample quote**

```markdown
---
pubDate: 2026-07-04
author: "Simon Willison"
source: "Simon Willison's Weblog"
tags: ["writing", "web"]
---

The best personal websites are the ones that are actually used. Don't overthink it — just write.
```

- [ ] **Step 5: Create sample guide**

```markdown
---
title: "Getting Started with Astro"
description: "A quick guide to setting up your first Astro site."
pubDate: 2026-07-04
tags: ["tutorial", "astro"]
---

Astro makes it easy to build fast, content-focused websites.

## Installation

```bash
npm create astro@latest my-site
```

## Creating Content

Add markdown files to `src/content/` and Astro handles the rest.

## Deployment

Deploy to Vercel with zero configuration.
```

- [ ] **Step 6: Commit**

```bash
git add src/content/
git commit -m "feat: add sample content for all post types"
```

---

## Task 13: Static Assets and Final Config

**Files:**
- Create: `public/robots.txt`
- Create: `public/favicon.ico` (placeholder)

- [ ] **Step 1: Create robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://justmalhar.com/sitemap-index.xml
```

- [ ] **Step 2: Update .gitignore**

```
node_modules/
dist/
.astro/
.env
.env.local
```

- [ ] **Step 3: Commit**

```bash
git add public/ .gitignore
git commit -m "chore: add robots.txt and update gitignore"
```

---

## Task 14: Build and Verify

- [ ] **Step 1: Run build**

```bash
npm run build
```

- [ ] **Step 2: Run dev server**

```bash
npm run dev
```

- [ ] **Step 3: Verify all pages render**

- [ ] **Step 4: Verify RSS feed at /rss.xml**

- [ ] **Step 5: Verify Atom feed at /atom.xml**

- [ ] **Step 6: Verify sitemap at /sitemap-index.xml**

- [ ] **Step 7: Run type check**

```bash
npm run check
```

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "chore: verify build and fix any issues"
```

---

## Task 15: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin git@github.com:justmalhar/justmalhar-com.git
git push -u origin main
```

- [ ] **Step 2: Connect to Vercel**

1. Go to vercel.com
2. Import the GitHub repository
3. Configure:
   - Framework Preset: Astro
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add custom domain: justmalhar.com

- [ ] **Step 3: Verify deployment**

- [ ] **Step 4: Update DNS records**

Point justmalhar.com to Vercel's nameservers.

---

## Success Criteria

- [ ] All 5 content types working (Essays, Links, Notes, Quotes, Guides)
- [ ] RSS and Atom feeds generating correctly
- [ ] Sitemap generating correctly
- [ ] SEO meta tags on all pages
- [ ] Open Graph images working
- [ ] Tag system working
- [ ] Newsletter signup form present
- [ ] Deployed to Vercel with custom domain
- [ ] All pages pass type checking
- [ ] Mobile responsive design
