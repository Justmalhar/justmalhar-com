# justmalhar.com — MVP Build Plan

## Objective
Ship the first usable version of justmalhar.com as a content + lead magnet + product platform.

---

## Scope for MVP

### Must have
- homepage
- essays listing
- notes listing
- playbooks listing
- products listing
- dynamic content page route
- lead magnet signup form
- basic email capture persistence
- one paid product link flow
- responsive UI

### Nice to have
- auth
- library
- member-only access
- admin tools

---

## Delivery phases

### Phase 0 — foundation
- initialize Next.js app
- configure TypeScript, Tailwind, ESLint
- create app layout
- define design tokens/basic theme
- create content collections structure

### Phase 1 — content engine
- implement content item model
- add MDX support
- build listings for essays/notes/playbooks/products
- build `/p/[slug]`
- create sample seeded content

### Phase 2 — capture + commerce
- add subscribe form
- persist leads/subscribers
- create lead magnet landing page pattern
- add Gumroad/Razorpay CTA blocks
- create product card + product page pattern

### Phase 3 — polish
- improve homepage
- SEO metadata
- OG image scaffolding
- analytics placeholder
- empty-state handling

---

## Engineering tasks

### App shell
- `app/layout.tsx`
- `app/page.tsx`
- shared header/footer
- reusable section components

### Routes
- `app/essays/page.tsx`
- `app/notes/page.tsx`
- `app/playbooks/page.tsx`
- `app/products/page.tsx`
- `app/subscribe/page.tsx`
- `app/about/page.tsx`
- `app/p/[slug]/page.tsx`

### Data layer
- content loader abstraction
- MDX parsing + metadata typing
- product/lead magnet metadata support

### Components
- Hero
- ContentCard
- ProductCard
- LeadMagnetCard
- CTASection
- EmailCaptureForm
- AccessGate

---

## Suggested file structure
- `app/`
- `components/`
- `content/`
- `lib/`
- `types/`
- `public/`

Inside `content/`:
- `essays/`
- `notes/`
- `playbooks/`
- `products/`

---

## MVP success test
The site is MVP-complete if you can:
1. publish one essay
2. publish one note
3. publish one lead magnet page with signup
4. publish one paid product page with external checkout
5. present a coherent homepage tying it all together

---

## Recommended immediate build order
1. scaffold app
2. build homepage
3. build content collections + listing pages
4. build dynamic content route
5. add lead magnet form
6. add product page + checkout link
7. deploy preview
