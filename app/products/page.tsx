import { ContentGrid } from '@/components/content-grid';
import { PageHero } from '@/components/page-hero';

const items = [
  {
    title: 'Agent Systems in Production',
    description: 'A premium deep dive on orchestration, retries, verification, failure handling, and trust architecture.',
    meta: 'Premium guide',
  },
  {
    title: 'AI Outreach Engine Kit',
    description: 'Templates, prompts, CRM schema, and workflow diagrams for outbound automation.',
    meta: 'Digital product',
  },
  {
    title: 'Operator memo bundles',
    description: 'Curated premium notes and tactical breakdowns worth paying for.',
    meta: 'Bundle',
  },
];

export default function ProductsPage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="PRODUCTS"
        title="Premium kits, deep dives, and operator-grade digital products."
        description="Paid assets designed to monetize technical insight without turning the site into a low-rent creator bazaar."
      />
      <div className="container-shell">
        <ContentGrid items={items} />
      </div>
    </div>
  );
}
