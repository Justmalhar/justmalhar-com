import { PageHero } from '@/components/page-hero';

export default function AboutPage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="ABOUT"
        title="A home for technical writing, operator notes, and monetizable systems."
        description="justmalhar.com is where essays, notes, playbooks, and products should converge into one durable publishing and business layer."
      />
      <div className="reading-shell prose-friendly">
        <p>
          The site is meant to hold the depth that social platforms cannot: the long-form reasoning, the system diagrams, the playbooks, and the products that emerge from real work.
        </p>
        <p>
          Over time this should evolve into a publication, a library, and a product shelf — all without feeling like a generic creator storefront.
        </p>
      </div>
    </div>
  );
}
