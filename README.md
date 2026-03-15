# justmalhar.com

Canonical home for:
- public essays
- technical/operator notes
- email-gated lead magnets
- paid digital products
- future premium memberships

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX via `next-mdx-remote`
- local JSONL email capture abstraction ready to swap to Supabase + Resend

## Content model
Content lives in git-native MDX collections:
- `content/essays`
- `content/notes`
- `content/playbooks`
- `content/products`

Every item shares metadata for slug, access level, CTA hooks, tags, and publishing state. Dynamic pages resolve through `/p/[slug]`.

## Email capture
The MVP form posts to `app/api/subscribe/route.ts` and persists to `data/subscribers.jsonl` when `EMAIL_CAPTURE_PROVIDER=local`.

Env placeholders live in `.env.example` for later Supabase/Resend wiring.

## Getting started
```bash
npm install
npm run dev
npm run build
```

## Planning docs
- `ARCHITECTURE.md`
- `SCHEMA-ROUTES.md`
- `HOMEPAGE-IA-COPY.md`
- `MVP-BUILD-PLAN.md`
