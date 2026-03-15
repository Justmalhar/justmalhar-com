import Link from 'next/link';
import { ContentGrid } from '@/components/content-grid';
import { PageHero } from '@/components/page-hero';
import { SectionShell } from '@/components/section-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const featuredEssays = [
  {
    title: 'Why most AI products break after the demo',
    description: 'System design, retries, observability, and the unglamorous engineering behind trustworthy agent workflows.',
    meta: 'Essay',
  },
  {
    title: 'Local vs frontier models is an architecture decision',
    description: 'Latency, privacy, eval quality, and operational control — where each stack actually wins.',
    meta: 'Operator note',
  },
  {
    title: 'Building monetizable playbooks from technical work',
    description: 'How essays, build logs, and operator notes become lead magnets, products, and premium content.',
    meta: 'Playbook',
  },
];

export default function HomePage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="CANONICAL HOME BASE"
        title="Practical AI systems, operator notes, and monetizable playbooks."
        description="Essays, build logs, and tactical resources on agents in production, workflow design, LLM systems, and products that work outside demos."
        primaryHref="/playbooks"
        primaryLabel="Get free playbooks"
        secondaryHref="/essays"
        secondaryLabel="Read essays"
      />

      <section className="container-shell py-4">
        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <Card className="border-border/70 bg-card/60">
            <CardHeader>
              <p className="eyebrow">FEATURED LEAD MAGNET</p>
              <CardTitle className="text-3xl">Start with a free playbook</CardTitle>
              <CardDescription className="max-w-2xl text-base">
                Tactical resources on AI workflows, outreach systems, product architecture, and operator-grade automation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="accent">
                <Link href="/playbooks">Unlock templates</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="eyebrow">WHAT YOU’LL FIND HERE</p>
              <CardTitle className="text-2xl">Signal over sludge</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-7 text-muted">
                <li>AI systems explained clearly</li>
                <li>Build logs and operator notes</li>
                <li>Lead magnets and templates</li>
                <li>Premium playbooks worth paying for</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionShell
        eyebrow="LATEST"
        title="Essays and operator notes"
        description="Long-form writing on AI systems, build logs, model/tool tradeoffs, and what breaks when you move from demo theater to real workflows."
      >
        <ContentGrid items={featuredEssays} />
      </SectionShell>

      <section className="reading-shell py-14">
        <Separator className="mb-10" />
        <div className="space-y-5 prose-friendly">
          <p className="eyebrow">POSITIONING</p>
          <h2>Build your audience on rented land if you must. Build your business on your own.</h2>
          <p className="text-muted">
            justmalhar.com should be the canonical publishing layer: essays, notes, lead magnets, and premium products.
            X, LinkedIn, and email can distribute the ideas. The site should own the depth, the archives, and the monetization.
          </p>
        </div>
      </section>

      <SectionShell
        eyebrow="PREMIUM LAYER"
        title="Premium playbooks and products"
        description="Tactical kits, implementation guides, and monetizable workflows for people who want more than surface-level AI content."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Playbooks</CardTitle>
              <CardDescription>Operator-grade downloads, tactical systems, and implementation guides.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="/products">Explore products</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Future membership layer</CardTitle>
              <CardDescription>Premium essays, private archives, and deeper operator notes once the content engine is humming.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost">
                <Link href="/subscribe">Get updates</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SectionShell>
    </div>
  );
}
