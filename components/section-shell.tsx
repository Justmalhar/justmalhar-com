import { cn } from '@/lib/utils';

export function SectionShell({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn('container-shell py-12', className)}>
      <div className="max-w-3xl space-y-3">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description ? <p className="text-base leading-8 text-muted sm:text-lg">{description}</p> : null}
      </div>
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}
