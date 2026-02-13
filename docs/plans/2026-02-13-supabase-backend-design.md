# Supabase Backend Design — PhanganAI v2

## Decision Summary

- **Approach**: Supabase Full-Stack (Auth + Postgres + Edge Functions + Realtime + Storage)
- **Auth**: Magic Link (email) + Social Login (Google/Apple)
- **Payments**: Omise (THB native, PromptPay support) via Edge Functions REST API
- **Admin**: Supabase Dashboard initially, custom admin panel later
- **Scope**: Full implementation (auth, events, tickets, wallet, payments, notifications, referral)

## Database Schema

### profiles
- `id` uuid PK (= auth.users.id)
- `display_name` text
- `avatar_url` text
- `phone` text nullable
- `referral_code` text unique (auto-generated)
- `loyalty_points` int default 0
- `tier` text default 'bronze' (bronze/silver/gold/vip)
- `push_token` text nullable
- `created_at` timestamptz

### events
- `id` uuid PK
- `title` text
- `slug` text unique
- `description` text
- `location` text
- `venue` text
- `date` timestamptz
- `doors_at` timestamptz
- `image_url` text
- `is_featured` bool default false
- `status` text default 'upcoming' (upcoming/live/past/cancelled)
- `created_at` timestamptz

### artists
- `id` uuid PK
- `name` text
- `genre` text
- `image_url` text

### event_artists (junction)
- `event_id` uuid FK → events
- `artist_id` uuid FK → artists
- `sort_order` int default 0
- PK (event_id, artist_id)

### ticket_tiers
- `id` uuid PK
- `event_id` uuid FK → events
- `name` text (e.g. "VIP Early Bird", "General Admission")
- `price` int (satang / smallest unit)
- `capacity` int
- `sold_count` int default 0

### tickets
- `id` uuid PK
- `user_id` uuid FK → profiles
- `event_id` uuid FK → events
- `tier_id` uuid FK → ticket_tiers
- `qr_code` text unique (generated UUID)
- `status` text default 'active' (active/used/cancelled)
- `purchased_at` timestamptz

### wallets
- `id` uuid PK
- `user_id` uuid unique FK → profiles
- `balance` int default 0 (satang)
- `updated_at` timestamptz

### transactions
- `id` uuid PK
- `wallet_id` uuid FK → wallets
- `type` text (topup/payment/refund/referral/ticket_purchase)
- `amount` int (positive = credit, negative = debit)
- `description` text
- `metadata` jsonb nullable
- `created_at` timestamptz

### notifications
- `id` uuid PK
- `user_id` uuid FK → profiles
- `title` text
- `message` text
- `icon` text
- `icon_color` text
- `href` text nullable
- `read` bool default false
- `created_at` timestamptz

### referrals
- `id` uuid PK
- `referrer_id` uuid FK → profiles
- `referred_id` uuid FK → profiles
- `code_used` text
- `bonus_paid` bool default false
- `created_at` timestamptz

## Edge Functions

1. **purchase-ticket**: verify capacity → debit wallet OR charge Omise → create ticket with unique qr_code → increment sold_count → create notification
2. **validate-ticket**: input qr_code → verify active + correct event date → mark used → return holder info
3. **topup-wallet**: create Omise charge (REST API) → return authorize_uri if 3DS → webhook confirms → credit wallet
4. **scan-to-pay**: verify balance → atomic debit via DB function → create transaction + notification
5. **omise-webhook**: verify Omise signature → process charge.complete/charge.failed
6. **apply-referral**: verify code + not self-referral + first time → credit both wallets ฿50 → create referral record + notifications
7. **register-push-token**: store FCM/APNs token in profiles

## Auth Flow

- Supabase Auth with Magic Link (email) + Google + Apple OAuth
- Deep links for Capacitor: `com.phanganai.app://auth/callback`
- On first sign-in, DB trigger creates profile + wallet + unique referral_code
- Client uses `@supabase/supabase-js` with session stored in device storage

## Realtime

- Subscribe to `wallets` changes (balance updates live)
- Subscribe to `notifications` inserts (badge count + toast)
- Zustand stores hydrated from Supabase queries, then kept in sync via Realtime

## Storage Buckets

- `event-images`: public read, admin write
- `avatars`: public read, owner write

## Row Level Security

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| profiles | Own only | Auto (trigger) | Own only | Never |
| events | Public | Admin | Admin | Admin |
| artists | Public | Admin | Admin | Admin |
| event_artists | Public | Admin | Admin | Admin |
| ticket_tiers | Public | Admin | Admin | Admin |
| wallets | Own only | Auto (trigger) | DB function only | Never |
| transactions | Own only | DB function only | Never | Never |
| tickets | Own only | DB function only | Never | Never |
| notifications | Own only | DB function only | Own (mark read) | Never |
| referrals | Own only | DB function only | Never | Never |

Wallet balance and transactions are NEVER modified via direct client UPDATE — only through `security definer` PL/pgSQL functions to guarantee atomicity.

## Client Integration

- Install `@supabase/supabase-js`
- Create `lib/supabase.ts` with client initialization
- Replace hardcoded data in components with Supabase queries
- Replace Zustand notification store with Supabase-backed store + Realtime
- Add auth context/provider wrapping the app
