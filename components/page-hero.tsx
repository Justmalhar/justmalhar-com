import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="container-shell py-20 sm:py-24">
      <div className="max-w-4xl space-y-6">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted sm:text-xl">{description}</p>
        {(primaryHref || secondaryHref) && (
          <div className="flex flex-wrap gap-4 pt-2">
            {primaryHref && primaryLabel ? (
              <Button asChild>
                <Link href={primaryHref}>{primaryLabel}</Link>
              </Button>
            ) : null}
            {secondaryHref && secondaryLabel ? (
              <Button asChild variant="outline">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
