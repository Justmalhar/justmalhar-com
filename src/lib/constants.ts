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
  { label: "Essays", href: "/essays" },
  { label: "Links", href: "/links" },
  { label: "Quotes", href: "/quotes" },
  { label: "Guides", href: "/guides" },
  { label: "Setup", href: "/setup" },
  { label: "Tags", href: "/tags" },
  { label: "About", href: "/about" },
] as const;