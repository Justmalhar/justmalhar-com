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
    medium: "https://medium.com/justmalhar",
  }
} as const;

export const NAV_ITEMS = [
  { label: "Blog", href: "/blog" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Quotes", href: "/quotes" },
  { label: "Papers", href: "/papers" },
  { label: "Work", href: "/work" },
  { label: "Setup", href: "/setup" },
  { label: "About", href: "/about" },
] as const;

export const NAV_SECTIONS = [
  {
    label: "Content",
    items: [
      { label: "Home", href: "/", icon: "home" },
      { label: "Blog", href: "/blog", icon: "blog", collection: "blog" as const },
      { label: "Inspiration", href: "/inspiration", icon: "inspiration", collection: "links" as const },
      { label: "Quotes", href: "/quotes", icon: "quotes", collection: "quotes" as const },
    ],
  },
  {
    label: "Explore",
    items: [
      { label: "Papers", href: "/papers", icon: "papers" },
      { label: "Work", href: "/work", icon: "work" },
      { label: "Setup", href: "/setup", icon: "setup" },
      { label: "About", href: "/about", icon: "about" },
    ],
  },
] as const;

export const SIDEBAR_TAGS = [
  { label: 'ai', slug: 'ai' },
  { label: 'software engineering', slug: 'software-engineering' },
  { label: 'books', slug: 'books' },
  { label: 'guides', slug: 'guides' },
] as const;