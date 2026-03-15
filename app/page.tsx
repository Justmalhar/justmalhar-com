import Link from 'next/link';

const featuredEssays = [
  {
    title: 'Why most AI products break after the demo',
    description: 'System design, reliability, retries, and the unglamorous engineering behind trustworthy agents.',
  },
  {
    title: 'Local vs frontier models is an architecture decision',
    description: 'Latency, privacy, eval quality, and operational control — where each stack actually wins.',
  },
  {
    title: 'Building monetizable playbooks from technical work',
    description: 'How operator notes become lead magnets, paid products, and premium content.',
  },
];

export default function HomePage() {
  return (
    <div className="pb-20">
      <section className="container-shell py-20">
        <div className="max-w-4xl space-y-6">
          <p className="eyebrow">CANONICAL HOME BASE</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
            Practical AI systems, operator notes, and monetizable playbooks.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted sm:text-xl">
            Essays, build logs, and tactical resources on agents in production, workflow design, LLM systems, and products that work outside demos.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/playbooks" className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background">
              Get free playbooks
            </Link>
            <Link href="/essays" className="rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground">
              Read essays
            </Link>
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-6 py-8 md:grid-cols-3">
        <div className="card md:col-span-2">
          <p className="eyebrow">FEATURED LEAD MAGNET</p>
          <h2 className="mt-3 text-2xl font-semibold">Start with a free playbook</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Tactical resources on AI workflows, outreach systems, product architecture, and operator-grade automation.
          </p>
          <div className="mt-6">
            <Link href="/playbooks" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
              Unlock templates
            </Link>
          </div>
        </div>
        <div className="card">
          <p className="eyebrow">POSITIONING</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>AI systems explained clearly</li>
            <li>Build logs and operator notes</li>
            <li>Lead magnets and templates</li>
            <li>Premium playbooks worth paying for</li>
          </ul>
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">LATEST</p>
            <h2 className="mt-2 text-3xl font-semibold">Essays and operator notes</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Long-form writing on AI systems, build logs, model/tool tradeoffs, and what breaks when you move from demo theater to real workflows.
            </p>
          </div>
          <Link href="/essays" className="text-sm text-muted hover:text-foreground">
            View all essays →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredEssays.map((essay) => (
            <article key={essay.title} className="card">
              <h3 className="text-xl font-semibold tracking-tight">{essay.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{essay.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">PREMIUM LAYER</p>
            <h2 className="mt-2 text-2xl font-semibold">Premium playbooks and products</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Tactical kits, implementation guides, and monetizable workflows for people who want more than surface-level AI content.
            </p>
          </div>
          <Link href="/products" className="rounded-full border border-border px-5 py-3 text-sm font-medium">
            Explore products
          </Link>
        </div>
      </section>
    </div>
  );
}