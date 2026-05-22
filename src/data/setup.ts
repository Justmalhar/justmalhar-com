export type SetupItem = {
  name: string;
  detail?: string;
  href?: string;
};

export type SetupCategory = {
  title: string;
  description?: string;
  items: SetupItem[];
};

/** Edit this file to reflect your actual gear and software. */
export const setupCategories: SetupCategory[] = [
  {
    title: 'Daily driver',
    description: 'The machine and display I actually work on.',
    items: [
      { name: 'MacBook Pro', detail: '14-inch · Apple Silicon' },
      { name: 'Studio Display', detail: 'Single monitor, no ultrawide' },
      { name: 'Magic Keyboard', detail: 'with Touch ID' },
      { name: 'Magic Trackpad', detail: 'no mouse' },
    ],
  },
  {
    title: 'Editor & terminal',
    description: 'Where code gets written and shipped.',
    items: [
      { name: 'Cursor', detail: 'primary IDE', href: 'https://cursor.com' },
      { name: 'Ghostty', detail: 'terminal', href: 'https://ghostty.org' },
      { name: 'Zsh', detail: 'shell' },
      { name: 'Homebrew', detail: 'macOS packages', href: 'https://brew.sh' },
    ],
  },
  {
    title: 'Languages & runtimes',
    items: [
      { name: 'TypeScript', detail: 'default for app work' },
      { name: 'Node.js', detail: 'LTS via nvm' },
      { name: 'Python', detail: 'scripts, ML tooling, automation' },
    ],
  },
  {
    title: 'Stack I reach for',
    description: 'Frameworks and services on repeat projects.',
    items: [
      { name: 'Astro', detail: 'this site', href: 'https://astro.build' },
      { name: 'Next.js', detail: 'product apps & APIs' },
      { name: 'PostgreSQL', detail: 'Neon / Supabase' },
      { name: 'Vercel', detail: 'deployments', href: 'https://vercel.com' },
    ],
  },
  {
    title: 'AI & automation',
    items: [
      { name: 'Claude', detail: 'long-form reasoning & code review' },
      { name: 'OpenAI API', detail: 'structured tasks in apps' },
      { name: 'Playwright', detail: 'browser testing', href: 'https://playwright.dev' },
    ],
  },
  {
    title: 'Notes & capture',
    items: [
      { name: 'Obsidian', detail: 'drafts & research', href: 'https://obsidian.md' },
      { name: 'Apple Notes', detail: 'quick capture' },
      { name: 'Raycast', detail: 'launcher & snippets', href: 'https://raycast.com' },
    ],
  },
];

export const setupIntro =
  'Tools change. Principles do not: fast feedback, boring infrastructure, and a desk setup that disappears while you work.';

export const setupUpdated = 'May 2026';
