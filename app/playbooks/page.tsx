import { ContentGrid } from '@/components/content-grid';
import { PageHero } from '@/components/page-hero';

const items = [
  {
    title: 'Local Business AI Outreach Engine',
    description: 'A free tactical resource on sourcing leads, enrichment, outreach asset generation, and CRM tracking.',
    meta: 'Free playbook',
  },
  {
    title: 'AI Operator Stack',
    description: 'Templates, workflows, and architecture patterns for practical automation and technical leverage.',
    meta: 'Template pack',
  },
  {
    title: 'Productized workflow kits',
    description: 'Lead magnets that can evolve into paid products, bundles, and premium notes.',
    meta: 'System',
  },
];

export default function PlaybooksPage() {
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
