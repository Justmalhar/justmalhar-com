import { ContentGrid } from '@/components/content-grid';
import { PageHero } from '@/components/page-hero';
import { getContentByType } from '@/lib/content/collections';

export default function PlaybooksPage() {
  const items = getContentByType('playbook');

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="PLAYBOOKS"
        title="Actionable resources, templates, and free tactical downloads."
        description="Lead magnets and practical playbooks designed to turn operator knowledge into reusable assets, email capture, and future products."
      />
      <div className="container-shell">
        <ContentGrid items={items} />
      </div>
    </div>
  );
}
