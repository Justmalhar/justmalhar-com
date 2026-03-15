import { ContentGrid } from '@/components/content-grid';
import { PageHero } from '@/components/page-hero';
import { getContentByType } from '@/lib/content/collections';

export default function ProductsPage() {
  const items = getContentByType('product');

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
