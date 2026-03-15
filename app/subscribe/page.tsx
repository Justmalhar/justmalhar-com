import { PageHero } from '@/components/page-hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SubscribePage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="SUBSCRIBE"
        title="Get free resources, new essays, and premium updates in your inbox."
        description="This will become the central capture layer for lead magnets, newsletters, product launches, and future premium content."
      />
      <div className="container-shell max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Email capture goes here</CardTitle>
            <CardDescription>
              v1 will use a simple email capture form connected to Supabase + Resend.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Coming soon</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
