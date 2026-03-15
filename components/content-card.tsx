import Link from 'next/link';
import type { ContentItem } from '@/lib/content/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const accessCopy: Record<ContentItem['accessLevel'], string> = {
  public: 'Public',
  email_gated: 'Email gated',
  paid: 'Paid',
  member_only: 'Members',
  bundle_only: 'Bundle',
};

export function ContentCard({ item }: { item: ContentItem }) {
  return (
    <Card className="flex h-full flex-col justify-between border-border/80 bg-card/70 transition hover:-translate-y-0.5 hover:border-accent/50">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
          <span>{item.eyebrow ?? item.type}</span>
          <span>•</span>
          <span>{accessCopy[item.accessLevel]}</span>
        </div>
        <CardTitle className="text-2xl">
          <Link href={`/p/${item.slug}`} className="transition hover:text-accent">
            {item.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-base">{item.summary}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex items-center justify-between gap-3 text-sm text-muted">
        <span>{item.readingTime}</span>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/p/${item.slug}`}>Read</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
