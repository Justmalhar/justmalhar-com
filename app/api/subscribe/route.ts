import { NextResponse } from 'next/server';
import { saveSubscriber } from '@/lib/email-capture/store';
import { validateEmail } from '@/lib/email-capture/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = validateEmail(body.email ?? '');
    const source = typeof body.source === 'string' && body.source.length > 0 ? body.source : 'site';
    const contentSlug = typeof body.contentSlug === 'string' ? body.contentSlug : undefined;
    const name = typeof body.name === 'string' ? body.name : undefined;

    const record = await saveSubscriber({ email, source, contentSlug, name });

    return NextResponse.json({
      ok: true,
      message: 'You’re in. I’ll send the resource when delivery wiring is connected.',
      subscriber: record,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went sideways.';
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
