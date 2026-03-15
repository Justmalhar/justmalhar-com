import { PageHero } from '@/components/page-hero';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubscribePage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="SUBSCRIBE"
        title="Get free resources, new essays, and premium updates in your inbox."
        description="The capture layer is live in MVP form: emails are stored locally behind a persistence abstraction that can later point at Supabase and Resend."
      />
      <div className="container-shell max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Join the list</CardTitle>
            <CardDescription>
              Today this stores subscribers locally. Next step is swapping the persistence/delivery layer to Supabase + Resend without changing the UI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmailCaptureForm source="subscribe-page" buttonLabel="Subscribe" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
