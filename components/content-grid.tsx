import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export type ContentCardItem = {
  title: string;
  description: string;
  meta?: string;
};

export function ContentGrid({ items }: { items: ContentCardItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title} className="h-full">
          <CardHeader>
            {item.meta ? <p className="eyebrow">{item.meta}</p> : null}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent />
        </Card>
      ))}
    </div>
  );
}
