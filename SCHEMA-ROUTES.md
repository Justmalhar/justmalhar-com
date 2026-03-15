# justmalhar.com — Schema + Route Map

## Route map

### Public routes
- `/`
- `/essays`
- `/notes`
- `/playbooks`
- `/products`
- `/subscribe`
- `/about`
- `/p/[slug]`
- `/tag/[tag]`
- `/series/[slug]`

### Auth routes
- `/login`
- `/signup`
- `/auth/callback`

### User routes
- `/dashboard`
- `/library`
- `/account`

### Internal/admin routes (later)
- `/admin`
- `/admin/products`
- `/admin/subscribers`
- `/admin/access`

---

## Database schema

### users
- id (uuid, pk)
- email
- name
- avatar_url
- created_at
- updated_at

### profiles
- user_id (pk, fk users.id)
- role (`user`, `admin`)
- bio
- website
- location

### subscribers
- id (uuid, pk)
- email
- name
- source
- status (`active`, `unsubscribed`)
- subscribed_at

### content_items
- id (uuid, pk)
- type (`article`, `note`, `lead_magnet`, `product`, `series`)
- slug (unique)
- title
- summary
- cover_image
- body_path
- access_level (`public`, `email_gated`, `paid`, `member_only`, `bundle_only`)
- status (`draft`, `published`, `archived`)
- seo_title
- seo_description
- cta_variant
- published_at
- updated_at

### tags
- id (uuid, pk)
- name
- slug

### content_tags
- content_id
- tag_id

### series
- id (uuid, pk)
- slug
- title
- description
- access_level

### series_items
- id (uuid, pk)
- series_id
- content_id
- position

### lead_magnets
- id (uuid, pk)
- content_id (fk content_items.id)
- asset_url
- delivery_mode (`email`, `instant`, `dashboard`)
- form_key
- upsell_product_id (nullable)

### products
- id (uuid, pk)
- content_id (fk content_items.id)
- product_type (`digital_download`, `bundle`, `membership`)
- provider (`gumroad`, `razorpay_link`, `manual`)
- provider_product_id
- provider_checkout_url
- price_amount
- price_currency
- active

### purchases
- id (uuid, pk)
- user_id (nullable fk users.id)
- email
- product_id
- provider
- provider_order_id
- status (`pending`, `paid`, `failed`, `refunded`)
- purchased_at

### access_grants
- id (uuid, pk)
- user_id (nullable)
- email
- grant_type (`email_unlock`, `purchase`, `membership`, `manual`)
- content_id (nullable)
- product_id (nullable)
- granted_at
- expires_at (nullable)

### email_events
- id (uuid, pk)
- email
- event_type
- metadata_json
- created_at

---

## Notes on schema design
- `content_items` is the core abstraction
- products and lead magnets extend content behavior instead of living as disconnected systems
- email unlocks and purchases both resolve into `access_grants`
- route resolution mostly begins from slug → content_items

---

## Rendering rules by route

### `/p/[slug]`
1. fetch content item by slug
2. resolve type
3. resolve access level
4. render content page shell
5. render appropriate gate/CTA if locked

### `/library`
Show all content/products unlocked for logged-in user or matched email.

### `/products`
List all active paid products.

### `/playbooks`
Show lead magnets + tactical guides.
