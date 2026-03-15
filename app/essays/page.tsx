import { ContentGrid } from '@/components/content-grid';
import { PageHero } from '@/components/page-hero';
import { getContentByType } from '@/lib/content/collections';

export default function EssaysPage() {
  const items = getContentByType('essay');

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="ESSAYS"
        title="Technical essays on AI systems that work outside demos."
        description="Long-form writing on agents in production, workflow design, model/tool tradeoffs, and the engineering behind trustworthy AI products."
      />
      <div className="container-shell">
        <ContentGrid items={items} />
      </div>
    </div>
  );
}
