import { ContentGrid } from '@/components/content-grid';
import { PageHero } from '@/components/page-hero';

const items = [
  {
    title: 'LLM system notes',
    description: 'Short technical observations on architecture, tools, tradeoffs, and workflow patterns.',
    meta: 'Note',
  },
  {
    title: 'Build updates',
    description: 'Fragments from shipping, debugging, and turning technical work into reusable knowledge.',
    meta: 'Build log',
  },
  {
    title: 'Operator fragments',
    description: 'Concise notes with more signal than a social post and less ceremony than an essay.',
    meta: 'Short-form',
  },
];

export default function NotesPage() {
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
