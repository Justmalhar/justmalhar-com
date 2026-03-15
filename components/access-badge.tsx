import type { AccessLevel } from '@/lib/content/types';

const copy: Record<AccessLevel, { label: string; className: string }> = {
  public: { label: 'Public', className: 'bg-foreground text-background' },
  email_gated: { label: 'Email unlock', className: 'bg-accent text-white' },
  paid: { label: 'Paid product', className: 'bg-card text-foreground border border-border' },
  member_only: { label: 'Members', className: 'bg-card text-foreground border border-border' },
  bundle_only: { label: 'Bundle only', className: 'bg-card text-foreground border border-border' },
};

export function AccessBadge({ accessLevel }: { accessLevel: AccessLevel }) {
  const item = copy[accessLevel];
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] ${item.className}`}>{item.label}</span>;
}
