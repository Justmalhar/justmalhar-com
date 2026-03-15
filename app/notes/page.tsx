import { ContentGrid } from '@/components/content-grid';
import { PageHero } from '@/components/page-hero';
import { getContentByType } from '@/lib/content/collections';

export default function NotesPage() {
  const items = getContentByType('note');

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="NOTES"
        title="Short-form observations, build updates, and technical fragments."
        description="Smaller pieces that still deserve a home: quick operator notes, architecture fragments, and in-progress thinking."
      />
      <div className="container-shell">
        <ContentGrid items={items} />
      </div>
    </div>
  );
}
