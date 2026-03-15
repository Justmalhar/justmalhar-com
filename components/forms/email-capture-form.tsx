"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  source: string;
  contentSlug?: string;
  buttonLabel?: string;
  helperText?: string;
  compact?: boolean;
};

export function EmailCaptureForm({ source, contentSlug, buttonLabel = 'Get it in my inbox', helperText, compact = false }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState(helperText ?? 'No spam, no sludge. Just useful material.');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('Saving your email...');

    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source, contentSlug }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      setStatus('error');
      setMessage(result.message ?? 'Something went sideways. Try again.');
      return;
    }

    setStatus('success');
    setMessage(result.message);
    setEmail('');
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-3' : 'space-y-4'}>
      <div className={compact ? 'flex flex-col gap-3 sm:flex-row' : 'flex flex-col gap-3 sm:flex-row'}>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          required
          className="sm:flex-1"
        />
        <Button type="submit" variant="accent" disabled={status === 'loading'}>
          {status === 'loading' ? 'Saving...' : buttonLabel}
        </Button>
      </div>
      <p className={`text-sm ${status === 'error' ? 'text-red-500' : status === 'success' ? 'text-accent' : 'text-muted'}`}>{message}</p>
    </form>
  );
}
