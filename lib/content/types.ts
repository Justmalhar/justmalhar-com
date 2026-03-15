export const contentTypes = ['essay', 'note', 'playbook', 'product'] as const;
export const accessLevels = ['public', 'email_gated', 'paid', 'member_only', 'bundle_only'] as const;

export type ContentType = (typeof contentTypes)[number];
export type AccessLevel = (typeof accessLevels)[number];

export type ContentFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  type: ContentType;
  status: 'draft' | 'published' | 'archived';
  accessLevel: AccessLevel;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  price?: string;
  deliveryMode?: 'email' | 'instant' | 'dashboard';
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type ContentItem = ContentFrontmatter & {
  body: string;
  filePath: string;
  collection: string;
  readingTime: string;
};
