import type { ContentItem } from '@/lib/content/types';
import { ContentCard } from '@/components/content-card';

export function ContentGrid({ items }: { items: ContentItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ContentCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
