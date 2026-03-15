import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AccessBadge } from '@/components/access-badge';
import { ContentGrid } from '@/components/content-grid';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllContent, getContentBySlug, getRelatedContent } from '@/lib/content/collections';
import { renderMdx } from '@/lib/content/mdx';

export async function generateStaticParams() {
  return getAllContent().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug(slug);

  if (!item) return {};

  return {
    title: item.seoTitle ?? item.title,
    description: item.seoDescription ?? item.summary,
  };
}

function CtaCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="border-border/80 bg-card/80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getContentBySlug(slug);
  if (!item) notFound();

  const related = getRelatedContent(item, 3);
  const mdxContent = await renderMdx(item.body);

  return (
    <div className="pb-20">
      <section className="reading-shell py-16 sm:py-20">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <AccessBadge accessLevel={item.accessLevel} />
            <span>{item.type}</span>
            <span>•</span>
            <span>{item.readingTime}</span>
            <span>•</span>
            <span>{new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="space-y-4">
            <p className="eyebrow">{item.eyebrow ?? item.collection}</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{item.title}</h1>
            <p className="text-lg leading-8 text-muted sm:text-xl">{item.summary}</p>
          </div>
          {item.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className="reading-shell grid gap-10 lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_320px] lg:px-6">
        <article className="prose-friendly max-w-none">{mdxContent}</article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          {item.accessLevel === 'email_gated' ? (
            <CtaCard
              title="Unlock the full resource"
              description="Drop your email and this becomes the entry point for lead magnet delivery, follow-ups, and future reader perks."
            >
              <EmailCaptureForm source="content-page" contentSlug={item.slug} />
            </CtaCard>
          ) : null}

          {item.accessLevel === 'paid' ? (
            <CtaCard
              title={item.price ? `${item.price} — product access` : 'Premium product'}
              description="Checkout wiring stays abstracted so Gumroad, Razorpay links, or a future custom flow can slot in without rewriting the content model."
            >
              <div className="space-y-3">
                <Button asChild variant="accent" className="w-full">
                  <Link href={item.ctaHref ?? '/subscribe'}>{item.ctaLabel ?? 'Buy this product'}</Link>
                </Button>
                <p className="text-sm text-muted">Current CTA is a placeholder hook, ready to be replaced by a hosted checkout URL.</p>
              </div>
            </CtaCard>
          ) : null}

          <CtaCard
            title="Want future essays and playbooks?"
            description="The email flow is intentionally simple in v1: capture cleanly now, connect delivery/auth later."
          >
            <EmailCaptureForm source="sidebar" contentSlug={item.slug} buttonLabel="Get updates" compact />
          </CtaCard>
        </aside>
      </div>

      {related.length ? (
        <section className="container-shell mt-20">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">KEEP READING</p>
            <h2 className="text-3xl font-semibold tracking-tight">Related writing and offers</h2>
          </div>
          <ContentGrid items={related} />
        </section>
      ) : null}
    </div>
  );
}
