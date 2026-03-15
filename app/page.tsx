import Link from 'next/link';
import { ContentGrid } from '@/components/content-grid';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { PageHero } from '@/components/page-hero';
import { SectionShell } from '@/components/section-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getContentByType, getFeaturedContent } from '@/lib/content/collections';

export default function HomePage() {
  const featuredContent = getFeaturedContent(3);
  const playbooks = getContentByType('playbook');
  const products = getContentByType('product');

  return (
    <div className="pb-20">
      <PageHero
        eyebrow="CANONICAL HOME BASE"
        title="Practical AI systems, operator notes, and monetizable playbooks."
        description="Essays, build logs, tactical downloads, and digital products for people building with AI beyond demo theater."
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
              <CardTitle className="text-3xl">{playbooks[0]?.title ?? 'Start with a free playbook'}</CardTitle>
              <CardDescription className="max-w-2xl text-base">
                {playbooks[0]?.summary ?? 'Tactical resources on AI workflows, product architecture, and operator-grade automation.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="accent">
                <Link href={playbooks[0] ? `/p/${playbooks[0].slug}` : '/playbooks'}>Unlock templates</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="eyebrow">DIRECT TO INBOX</p>
              <CardTitle className="text-2xl">Signal over sludge</CardTitle>
              <CardDescription className="text-base">
                Essays, notes, launches, and useful free resources. No spammy creator-funnel cosplay.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailCaptureForm source="homepage" buttonLabel="Join the list" compact />
            </CardContent>
          </Card>
        </div>
      </section>

      <SectionShell
        eyebrow="LATEST"
        title="Essays, notes, and tactical assets"
        description="A single content model underneath the site means writing, lead magnets, and products can all live on the same rails."
      >
        <ContentGrid items={featuredContent} />
      </SectionShell>

      <section className="reading-shell py-14">
        <Separator className="mb-10" />
        <div className="space-y-5 prose-friendly">
          <p className="eyebrow">POSITIONING</p>
          <h2>Build your audience on rented land if you must. Build your business on your own.</h2>
          <p className="text-muted">
            justmalhar.com is meant to hold the durable layer: essays, notes, lead magnets, and premium products. Social platforms can distribute ideas. The site should own the archive, the context, and the monetization.
          </p>
        </div>
      </section>

      <SectionShell
        eyebrow="PREMIUM LAYER"
        title="Products that feel like extensions of the writing"
        description="The best paid products on a site like this should feel like deeper access to hard-won systems, not random PDFs stapled onto a landing page."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {products.slice(0, 2).map((product) => (
            <Card key={product.slug}>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href={`/p/${product.slug}`}>View product</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
