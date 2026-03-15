# justmalhar.com — Technical Architecture Spec

## Vision
`justmalhar.com` should be the canonical home for:
- public essays
- technical/operator notes
- email-gated lead magnets
- paid digital products
- future premium memberships
- a user library/dashboard for unlocked assets

This is not a blog with payments bolted on.
It is a **content-commerce platform** optimized for technical publishing and monetizable knowledge products.

---

## Core product goals

### Primary goals
1. Publish durable long-form content
2. Capture email via lead magnets
3. Sell digital products without Stripe dependence
4. Support future paywalled content and memberships
5. Keep publishing workflow simple and git-native

### Constraints
- India-friendly payment stack
- avoid dependence on Stripe
- solo-founder maintainability
- must support fast iteration and productization

---

## Recommended stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content format:** MDX + structured metadata
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth
- **Email:** Resend
- **Payments v1:** Gumroad + optional Razorpay links
- **Hosting:** Vercel
- **Storage:** Supabase Storage
- **Analytics:** Plausible or PostHog later

---

## Architectural principles

### 1. Content as canonical asset
All content should be modeled as reusable platform assets, not ad hoc pages.

### 2. Access control is first-class
Every content item should define access behavior from day 1:
- public
- email gated
- paid
- member only
- bundled

### 3. Commerce is modular
Do not hardwire one payment provider into the data model.
Use a provider abstraction so products can map to:
- Gumroad
- Razorpay link
- future custom checkout

### 4. Publishing should remain simple
Use MDX for writing and a small metadata layer for content management.
Avoid heavy CMS overhead before volume justifies it.

### 5. The website is the source of truth
X/LinkedIn/email are distribution layers.
justmalhar.com is the canonical publishing + monetization layer.

---

## Content domain model

### Core entity: ContentItem
All top-level pieces of publishable surface content inherit the same shared shape.

Shared fields:
- `id`
- `type`
- `slug`
- `title`
- `summary`
- `status`
- `cover_image`
- `seo_title`
- `seo_description`
- `published_at`
- `updated_at`
- `access_level`
- `tags`
- `cta_variant`

### Specialized types
1. `article`
2. `note`
3. `lead_magnet`
4. `product`
5. `series`

---

## Access architecture

### Access levels
- `public`
- `email_gated`
- `paid`
- `member_only`
- `bundle_only`

### Access resolution flow
When a visitor opens a content page:
1. resolve content metadata
2. check access level
3. if public → render full content
4. if email gated → check unlock state or show signup gate
5. if paid/member/bundle → check auth + entitlements
6. show CTA or unlocked content accordingly

---

## Commerce architecture

### v1
Use hosted checkout externally, but keep entitlement tracking locally.

Flow:
1. user clicks product CTA
2. redirected to Gumroad/Razorpay payment link
3. on successful purchase, grant access internally via webhook/manual sync
4. user can access product in `/library`

### Why this works
- avoids payment engineering complexity upfront
- avoids Stripe dependency
- still lets the site behave like a product platform

---

## Email architecture

### Use cases
- lead magnet delivery
- newsletter / digest later
- product confirmation
- access granted email
- nurture sequences later

### Recommendation
Use Resend with templates and store email events in DB.

---

## Content storage strategy

### MDX for canonical authored content
Use repo-based MDX files for:
- essays
- notes
- playbooks with rich formatting

### DB metadata for runtime behavior
Use DB for:
- access rules
- product IDs
- subscriber unlocks
- analytics and entitlements

This hybrid model gives editorial simplicity + runtime flexibility.

---

## Admin strategy

### v1
No heavy admin panel.
Use:
- repo-authored MDX
- a simple admin route for products/unlocks/subscribers if needed

### v2
Add lightweight internal dashboard for:
- lead magnets
- products
- access grants
- subscriber management

---

## SEO/content strategy implications
- canonical content on justmalhar.com
- structured metadata per content type
- series and topic pages for internal linking
- snippets from essays derive social posts
- lead magnets embedded contextually inside articles

---

## Security and access considerations
- signed download URLs for paid assets
- auth-aware library access
- avoid public blob URLs for premium assets
- webhook verification for payment events
- role separation: anonymous, subscriber, customer, member, admin

---

## Future evolution path

### Phase 1
- public content
- email capture
- lead magnet delivery
- paid product links

### Phase 2
- auth + dashboard
- internal entitlements
- gated articles
- library page

### Phase 3
- memberships
- bundles
- subscriber journeys
- premium series/course-like experiences

---

## Success criteria for v1
- can publish essays quickly
- can create lead magnet pages repeatedly
- can capture email reliably
- can sell one paid product cleanly
- can expand without rewriting the stack
