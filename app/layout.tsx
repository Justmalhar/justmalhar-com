import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'justmalhar.com',
  description: 'Practical AI systems, operator notes, and monetizable playbooks.',
};

const nav = [
  { href: '/essays', label: 'Essays' },
  { href: '/playbooks', label: 'Playbooks' },
  { href: '/products', label: 'Products' },
  { href: '/notes', label: 'Notes' },
  { href: '/subscribe', label: 'Subscribe' },
  { href: '/about', label: 'About' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-border/80">
          <div className="container-shell flex items-center justify-between py-5">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              justmalhar.com
            </Link>
            <nav className="hidden gap-6 text-sm text-muted md:flex">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}