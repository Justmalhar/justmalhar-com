export type SocialLink = {
  label: string;
  href: string;
  icon: 'x' | 'linkedin';
};

export const socialLinks: SocialLink[] = [
  {
    label: 'X (Twitter)',
    href: 'https://www.x.com/justmalhar',
    icon: 'x',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/justmalhar',
    icon: 'linkedin',
  },
];
