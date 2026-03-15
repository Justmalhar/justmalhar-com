import fs from 'node:fs/promises';
import path from 'node:path';

export type SubscriberInput = {
  email: string;
  source: string;
  contentSlug?: string;
  name?: string;
};

export type SubscriberRecord = SubscriberInput & {
  createdAt: string;
};

const STORAGE_PROVIDER = process.env.EMAIL_CAPTURE_PROVIDER ?? 'local';
const DATA_FILE = path.join(process.cwd(), 'data', 'subscribers.jsonl');

async function persistLocally(record: SubscriberRecord) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.appendFile(DATA_FILE, `${JSON.stringify(record)}\n`, 'utf8');
}

export async function saveSubscriber(input: SubscriberInput) {
  const record: SubscriberRecord = {
    ...input,
    email: input.email.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  };

  switch (STORAGE_PROVIDER) {
    case 'supabase':
      console.warn('EMAIL_CAPTURE_PROVIDER=supabase is not wired yet. Falling back to local JSONL persistence.');
      await persistLocally(record);
      break;
    case 'local':
    default:
      await persistLocally(record);
      break;
  }

  return record;
}
