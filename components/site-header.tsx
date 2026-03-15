import Link from 'next/link';
import { Button } from '@/components/ui/button';

const nav = [
  { href: '/essays', label: 'Essays' },
  { href: '/playbooks', label: 'Playbooks' },
  { href: '/products', label: 'Products' },
  { href: '/notes', label: 'Notes' },
  { href: '/subscribe', label: 'Subscribe' },
  { href: '/about', label: 'About' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur">
      <div className="container-shell flex items-center justify-between py-5">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            justmalhar.com
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/subscribe">Get updates</Link>
        </Button>
      </div>
    </header>
  );
}
