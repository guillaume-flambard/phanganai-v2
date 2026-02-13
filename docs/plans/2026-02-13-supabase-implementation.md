# Supabase Backend Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all hardcoded data with a Supabase backend — auth, events, tickets, wallet, payments (Omise), notifications, and referrals.

**Architecture:** Supabase Full-Stack. Client calls Supabase directly via `@supabase/supabase-js` for reads (with RLS). Sensitive writes (wallet, tickets, payments) go through Edge Functions. Realtime subscriptions keep wallet balance and notifications in sync.

**Tech Stack:** Supabase (Postgres + Auth + Edge Functions + Realtime + Storage), Omise REST API, `@supabase/supabase-js`, Zustand, Capacitor deep links.

**Important:** This project has no test framework. Verification = `npm run build` succeeds + manual checks. No unit tests to write.

---

## Task 1: Supabase Project Setup & Client Library

**Files:**
- Create: `lib/supabase.ts`
- Create: `lib/types/database.ts`
- Modify: `package.json`
- Create: `.env.local`

**Step 1: Install Supabase client**

Run:
```bash
npm install @supabase/supabase-js
```

**Step 2: Create `.env.local`**

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

These values come from Supabase Dashboard > Settings > API.

**Step 3: Create Supabase client**

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

**Step 4: Create database types**

Create `lib/types/database.ts` with TypeScript types matching the schema. These will be replaced later by auto-generated types via `supabase gen types typescript`, but we need them now for type safety:

```typescript
export type EventStatus = 'upcoming' | 'live' | 'past' | 'cancelled';
export type TicketStatus = 'active' | 'used' | 'cancelled';
export type TransactionType = 'topup' | 'payment' | 'refund' | 'referral' | 'ticket_purchase';
export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'vip';

export interface Profile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  phone: string | null;
  referral_code: string;
  loyalty_points: number;
  tier: LoyaltyTier;
  push_token: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  venue: string;
  date: string;
  doors_at: string;
  image_url: string;
  is_featured: boolean;
  status: EventStatus;
  created_at: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  image_url: string;
}

export interface EventArtist {
  event_id: string;
  artist_id: string;
  sort_order: number;
}

export interface TicketTier {
  id: string;
  event_id: string;
  name: string;
  price: number;
  capacity: number;
  sold_count: number;
}

export interface Ticket {
  id: string;
  user_id: string;
  event_id: string;
  tier_id: string;
  qr_code: string;
  status: TicketStatus;
  purchased_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  updated_at: string;
}

export interface Transaction {
  id: string;
  wallet_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  icon: string;
  icon_color: string;
  href: string | null;
  read: boolean;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  code_used: string;
  bonus_paid: boolean;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile> & { id: string }; Update: Partial<Profile> };
      events: { Row: Event; Insert: Omit<Event, 'id' | 'created_at'>; Update: Partial<Event> };
      artists: { Row: Artist; Insert: Omit<Artist, 'id'>; Update: Partial<Artist> };
      event_artists: { Row: EventArtist; Insert: EventArtist; Update: Partial<EventArtist> };
      ticket_tiers: { Row: TicketTier; Insert: Omit<TicketTier, 'id'>; Update: Partial<TicketTier> };
      tickets: { Row: Ticket; Insert: Omit<Ticket, 'id'>; Update: Partial<Ticket> };
      wallets: { Row: Wallet; Insert: Omit<Wallet, 'id'>; Update: Partial<Wallet> };
      transactions: { Row: Transaction; Insert: Omit<Transaction, 'id'>; Update: Partial<Transaction> };
      notifications: { Row: Notification; Insert: Omit<Notification, 'id'>; Update: Partial<Notification> };
      referrals: { Row: Referral; Insert: Omit<Referral, 'id'>; Update: Partial<Referral> };
    };
  };
}
```

**Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds (`.env.local` vars are only needed at runtime).

**Step 6: Commit**

```bash
git add lib/supabase.ts lib/types/database.ts package.json package-lock.json .env.local
git commit -m "feat: add Supabase client and database types"
```

---

## Task 2: SQL Migrations — Database Schema

**Files:**
- Create: `supabase/migrations/001_schema.sql`
- Create: `supabase/migrations/002_rls.sql`
- Create: `supabase/migrations/003_functions.sql`
- Create: `supabase/migrations/004_triggers.sql`
- Create: `supabase/migrations/005_seed.sql`

These SQL files are applied via Supabase Dashboard (SQL Editor) or `supabase db push`. They are kept in the repo for version control.

**Step 1: Create schema migration**

Create `supabase/migrations/001_schema.sql`:

```sql
-- profiles (linked to auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  avatar_url text,
  phone text,
  referral_code text unique not null default substr(md5(random()::text), 1, 8),
  loyalty_points int not null default 0,
  tier text not null default 'bronze' check (tier in ('bronze', 'silver', 'gold', 'vip')),
  push_token text,
  created_at timestamptz not null default now()
);

-- events
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null default '',
  location text not null,
  venue text not null,
  date timestamptz not null,
  doors_at timestamptz not null,
  image_url text not null default '',
  is_featured bool not null default false,
  status text not null default 'upcoming' check (status in ('upcoming', 'live', 'past', 'cancelled')),
  created_at timestamptz not null default now()
);

-- artists
create table public.artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  genre text not null default '',
  image_url text not null default ''
);

-- event_artists junction
create table public.event_artists (
  event_id uuid not null references public.events(id) on delete cascade,
  artist_id uuid not null references public.artists(id) on delete cascade,
  sort_order int not null default 0,
  primary key (event_id, artist_id)
);

-- ticket tiers
create table public.ticket_tiers (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  price int not null, -- in satang (1 THB = 100 satang)
  capacity int not null,
  sold_count int not null default 0
);

-- tickets
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  tier_id uuid not null references public.ticket_tiers(id),
  qr_code text unique not null default gen_random_uuid()::text,
  status text not null default 'active' check (status in ('active', 'used', 'cancelled')),
  purchased_at timestamptz not null default now()
);

-- wallets
create table public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.profiles(id) on delete cascade,
  balance int not null default 0 check (balance >= 0), -- in satang
  updated_at timestamptz not null default now()
);

-- transactions
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references public.wallets(id) on delete cascade,
  type text not null check (type in ('topup', 'payment', 'refund', 'referral', 'ticket_purchase')),
  amount int not null, -- positive = credit, negative = debit
  description text not null default '',
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- notifications
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  icon text not null default 'info',
  icon_color text not null default 'text-primary',
  href text,
  read bool not null default false,
  created_at timestamptz not null default now()
);

-- referrals
create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.profiles(id),
  referred_id uuid not null references public.profiles(id),
  code_used text not null,
  bonus_paid bool not null default false,
  created_at timestamptz not null default now()
);

-- indexes
create index idx_events_status on public.events(status);
create index idx_events_featured on public.events(is_featured) where is_featured = true;
create index idx_tickets_user on public.tickets(user_id);
create index idx_tickets_qr on public.tickets(qr_code);
create index idx_transactions_wallet on public.transactions(wallet_id);
create index idx_notifications_user on public.notifications(user_id);
create index idx_notifications_unread on public.notifications(user_id) where read = false;
```

**Step 2: Create RLS policies**

Create `supabase/migrations/002_rls.sql`:

```sql
-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.artists enable row level security;
alter table public.event_artists enable row level security;
alter table public.ticket_tiers enable row level security;
alter table public.tickets enable row level security;
alter table public.wallets enable row level security;
alter table public.transactions enable row level security;
alter table public.notifications enable row level security;
alter table public.referrals enable row level security;

-- profiles: read own, update own
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- events: public read
create policy "Events are publicly readable" on public.events for select using (true);

-- artists: public read
create policy "Artists are publicly readable" on public.artists for select using (true);

-- event_artists: public read
create policy "Event artists are publicly readable" on public.event_artists for select using (true);

-- ticket_tiers: public read
create policy "Ticket tiers are publicly readable" on public.ticket_tiers for select using (true);

-- tickets: read own only
create policy "Users can read own tickets" on public.tickets for select using (auth.uid() = user_id);

-- wallets: read own only
create policy "Users can read own wallet" on public.wallets for select using (auth.uid() = user_id);

-- transactions: read own only
create policy "Users can read own transactions" on public.transactions
  for select using (
    wallet_id in (select id from public.wallets where user_id = auth.uid())
  );

-- notifications: read own, update own (mark as read)
create policy "Users can read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can mark own notifications as read" on public.notifications
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- referrals: read own
create policy "Users can read own referrals" on public.referrals
  for select using (auth.uid() = referrer_id or auth.uid() = referred_id);
```

**Step 3: Create DB functions for atomic wallet operations**

Create `supabase/migrations/003_functions.sql`:

```sql
-- Atomic wallet debit (used by scan-to-pay, ticket purchase)
create or replace function public.debit_wallet(
  p_user_id uuid,
  p_amount int,
  p_type text,
  p_description text,
  p_metadata jsonb default null
) returns uuid as $$
declare
  v_wallet_id uuid;
  v_tx_id uuid;
begin
  -- Lock wallet row
  select id into v_wallet_id
  from public.wallets
  where user_id = p_user_id
  for update;

  if v_wallet_id is null then
    raise exception 'Wallet not found';
  end if;

  -- Debit
  update public.wallets
  set balance = balance - p_amount, updated_at = now()
  where id = v_wallet_id and balance >= p_amount;

  if not found then
    raise exception 'Insufficient balance';
  end if;

  -- Create transaction record
  insert into public.transactions (wallet_id, type, amount, description, metadata)
  values (v_wallet_id, p_type, -p_amount, p_description, p_metadata)
  returning id into v_tx_id;

  return v_tx_id;
end;
$$ language plpgsql security definer;

-- Atomic wallet credit (used by top-up, referral)
create or replace function public.credit_wallet(
  p_user_id uuid,
  p_amount int,
  p_type text,
  p_description text,
  p_metadata jsonb default null
) returns uuid as $$
declare
  v_wallet_id uuid;
  v_tx_id uuid;
begin
  select id into v_wallet_id
  from public.wallets
  where user_id = p_user_id
  for update;

  if v_wallet_id is null then
    raise exception 'Wallet not found';
  end if;

  update public.wallets
  set balance = balance + p_amount, updated_at = now()
  where id = v_wallet_id;

  insert into public.transactions (wallet_id, type, amount, description, metadata)
  values (v_wallet_id, p_type, p_amount, p_description, p_metadata)
  returning id into v_tx_id;

  return v_tx_id;
end;
$$ language plpgsql security definer;
```

**Step 4: Create triggers for auto profile/wallet creation**

Create `supabase/migrations/004_triggers.sql`:

```sql
-- Auto-create profile + wallet on new auth user
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  );

  insert into public.wallets (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

**Step 5: Create seed data**

Create `supabase/migrations/005_seed.sql`:

```sql
-- Seed events (OXA events first, then others)
insert into public.events (id, title, slug, description, location, venue, date, doors_at, image_url, is_featured, status) values
  ('e1000000-0000-0000-0000-000000000001', 'OXA: Jungle Party', 'oxa-jungle-party',
   'Deep in the heart of Koh Phangan''s jungle, OXA presents an immersive audio-visual experience. World-class DJs, mesmerizing visuals, and the raw energy of the island.',
   'Koh Phangan', 'OXA', now() + interval '2 days', now() + interval '2 days' - interval '1 hour',
   '', true, 'upcoming'),
  ('e1000000-0000-0000-0000-000000000002', 'OXA: Berlin Calling Edition', 'oxa-berlin-calling',
   'A night of pure Berlin techno in the jungle. Expect hard-hitting beats and an unrelenting dancefloor.',
   'Koh Phangan', 'OXA', now() + interval '9 days', now() + interval '9 days' - interval '1 hour',
   '', true, 'upcoming'),
  ('e1000000-0000-0000-0000-000000000003', 'Half Moon Festival', 'half-moon-festival',
   'The legendary Half Moon Festival returns to Ban Tai.',
   'Ban Tai, Phangan', 'Half Moon', now() + interval '16 days', now() + interval '16 days' - interval '2 hours',
   '', false, 'upcoming'),
  ('e1000000-0000-0000-0000-000000000004', 'Lighthouse: Full Moon Eve', 'lighthouse-full-moon',
   'Beach party at Leela Beach with sunset views and deep house.',
   'Leela Beach', 'Lighthouse', now() + interval '5 days', now() + interval '5 days' - interval '1 hour',
   '', false, 'upcoming'),
  ('e1000000-0000-0000-0000-000000000005', 'Secret Mountain: Sunset Session', 'secret-mountain-sunset',
   'Intimate sunset session high in the mountains of Koh Phangan.',
   'Secret Mountain', 'Secret Mountain', now() + interval '12 days', now() + interval '12 days' - interval '2 hours',
   '', false, 'upcoming');

-- Seed artists
insert into public.artists (id, name, genre, image_url) values
  ('a1000000-0000-0000-0000-000000000001', 'Makossa', 'Techno', ''),
  ('a1000000-0000-0000-0000-000000000002', 'Luna City', 'Deep House', ''),
  ('a1000000-0000-0000-0000-000000000003', 'Marco S.', 'Progressive', ''),
  ('a1000000-0000-0000-0000-000000000004', 'K-Soul', 'Afro House', '');

-- Link artists to OXA Jungle Party
insert into public.event_artists (event_id, artist_id, sort_order) values
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 0),
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', 1),
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000003', 2),
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000004', 3);

-- Seed ticket tiers for OXA Jungle Party
insert into public.ticket_tiers (event_id, name, price, capacity) values
  ('e1000000-0000-0000-0000-000000000001', 'General Admission', 50000, 500),
  ('e1000000-0000-0000-0000-000000000001', 'VIP Early Bird', 80000, 100),
  ('e1000000-0000-0000-0000-000000000002', 'General Admission', 60000, 500),
  ('e1000000-0000-0000-0000-000000000002', 'VIP', 100000, 80),
  ('e1000000-0000-0000-0000-000000000003', 'General Admission', 250000, 2000),
  ('e1000000-0000-0000-0000-000000000004', 'General Admission', 60000, 300),
  ('e1000000-0000-0000-0000-000000000005', 'General Admission', 50000, 150);
```

Note: `image_url` values are left empty — the actual images from the current Google CDN URLs should be uploaded to Supabase Storage (see Task 9) and URLs updated via the Dashboard.

**Step 6: Commit**

```bash
git add supabase/
git commit -m "feat: add database schema, RLS policies, functions, triggers, and seed data"
```

---

## Task 3: Auth Provider & Hook

**Files:**
- Create: `lib/hooks/use-auth.ts`
- Create: `components/providers/AuthProvider.tsx`
- Modify: `app/layout.tsx` — wrap children with AuthProvider

**Step 1: Create auth hook**

Create `lib/hooks/use-auth.ts`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string) => {
    return supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const signInWithGoogle = async () => {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const signInWithApple = async () => {
    return supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  return { user, session, loading, signInWithEmail, signInWithGoogle, signInWithApple, signOut };
}
```

**Step 2: Create AuthProvider**

Create `components/providers/AuthProvider.tsx`:

```typescript
'use client';

import { createContext, useContext } from 'react';
import { useAuth } from '@/lib/hooks/use-auth';

type AuthContextType = ReturnType<typeof useAuth>;

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
```

**Step 3: Create auth callback page**

Create `app/auth/callback/page.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.replace('/');
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="material-icons text-primary text-4xl animate-spin">sync</span>
        <p className="mt-4 text-white/60">Signing you in...</p>
      </div>
    </div>
  );
}
```

**Step 4: Create login page**

Create `app/login/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { PageTransition } from '@/components/motion/PageTransition';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { haptics } from '@/lib/haptics';

export default function LoginPage() {
  const { signInWithEmail, signInWithGoogle, signInWithApple } = useAuthContext();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async () => {
    if (!email || loading) return;
    setLoading(true);
    haptics.impact('light');
    const { error } = await signInWithEmail(email);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success('Check your email for the magic link!');
    }
  };

  const handleGoogle = async () => {
    haptics.impact('light');
    const { error } = await signInWithGoogle();
    if (error) toast.error(error.message);
  };

  const handleApple = async () => {
    haptics.impact('light');
    const { error } = await signInWithApple();
    if (error) toast.error(error.message);
  };

  return (
    <MobileLayout>
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
          {/* Logo */}
          <div className="mb-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary text-4xl">bolt</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">PhanganAI</h1>
            <p className="text-xs text-primary/60 uppercase tracking-widest mt-1">Powered by OXA</p>
          </div>

          {sent ? (
            <div className="text-center glass-card rounded-xl p-8 w-full max-w-sm">
              <span className="material-icons text-primary text-5xl mb-4">mark_email_read</span>
              <h2 className="text-xl font-bold mb-2">Check your email</h2>
              <p className="text-white/60 text-sm">We sent a magic link to <span className="text-primary font-medium">{email}</span></p>
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-6">
              {/* Email input */}
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMagicLink()}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-center placeholder:text-white/30 focus:outline-none focus:border-primary/40"
                />
              </div>

              <button
                onClick={handleMagicLink}
                disabled={loading || !email}
                className="w-full py-4 rounded-full bg-primary text-background-dark font-bold text-lg neon-glow active:scale-[0.98] transition-transform disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-white/30 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Social buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleGoogle}
                  className="w-full py-4 rounded-full bg-white/5 border border-white/10 font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
                >
                  Continue with Google
                </button>
                <button
                  onClick={handleApple}
                  className="w-full py-4 rounded-full bg-white/5 border border-white/10 font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
                >
                  Continue with Apple
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
}
```

**Step 5: Wrap app with AuthProvider**

Modify `app/layout.tsx`: import `AuthProvider` and wrap `{children}` with it (inside `<body>`, around the existing content).

**Step 6: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 7: Commit**

```bash
git add lib/hooks/use-auth.ts components/providers/AuthProvider.tsx app/auth/ app/login/ app/layout.tsx
git commit -m "feat: add Supabase auth with magic link, Google, and Apple sign-in"
```

---

## Task 4: Supabase Data Hooks

**Files:**
- Create: `lib/hooks/use-profile.ts`
- Create: `lib/hooks/use-events.ts`
- Create: `lib/hooks/use-wallet.ts`
- Create: `lib/hooks/use-tickets.ts`
- Create: `lib/hooks/use-notifications.ts`

These hooks encapsulate all Supabase queries. Components will import these instead of using hardcoded data.

**Step 1: Create profile hook**

Create `lib/hooks/use-profile.ts`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/types/database';
import { useAuthContext } from '@/components/providers/AuthProvider';

export function useProfile() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setProfile(null); setLoading(false); return; }

    const fetch = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data);
      setLoading(false);
    };
    fetch();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    if (!error && data) setProfile(data);
    return { data, error };
  };

  return { profile, loading, updateProfile };
}
```

**Step 2: Create events hook**

Create `lib/hooks/use-events.ts`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Event, Artist, TicketTier } from '@/lib/types/database';

export function useEvents(options?: { featured?: boolean }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      let query = supabase
        .from('events')
        .select('*')
        .in('status', ['upcoming', 'live'])
        .order('date', { ascending: true });

      if (options?.featured) {
        query = query.eq('is_featured', true);
      }

      const { data } = await query;
      setEvents(data ?? []);
      setLoading(false);
    };
    fetch();
  }, [options?.featured]);

  return { events, loading };
}

export function useEvent(slug: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tiers, setTiers] = useState<TicketTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      // Fetch event
      const { data: eventData } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!eventData) { setLoading(false); return; }
      setEvent(eventData);

      // Fetch artists via junction
      const { data: artistLinks } = await supabase
        .from('event_artists')
        .select('artist_id, sort_order')
        .eq('event_id', eventData.id)
        .order('sort_order');

      if (artistLinks && artistLinks.length > 0) {
        const { data: artistsData } = await supabase
          .from('artists')
          .select('*')
          .in('id', artistLinks.map(l => l.artist_id));
        // Sort by the junction sort_order
        const orderMap = new Map(artistLinks.map(l => [l.artist_id, l.sort_order]));
        setArtists((artistsData ?? []).sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0)));
      }

      // Fetch ticket tiers
      const { data: tiersData } = await supabase
        .from('ticket_tiers')
        .select('*')
        .eq('event_id', eventData.id)
        .order('price');
      setTiers(tiersData ?? []);

      setLoading(false);
    };
    fetch();
  }, [slug]);

  return { event, artists, tiers, loading };
}
```

**Step 3: Create wallet hook with Realtime**

Create `lib/hooks/use-wallet.ts`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Wallet, Transaction } from '@/lib/types/database';
import { useAuthContext } from '@/components/providers/AuthProvider';

export function useWallet() {
  const { user } = useAuthContext();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setWallet(null); setLoading(false); return; }

    const fetch = async () => {
      const { data } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setWallet(data);
      setLoading(false);
    };
    fetch();

    // Realtime subscription for balance updates
    const channel = supabase
      .channel('wallet-changes')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'wallets',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        setWallet(payload.new as Wallet);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  return { wallet, loading };
}

export function useTransactions(limit = 20) {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setTransactions([]); setLoading(false); return; }

    const fetch = async () => {
      // First get wallet id
      const { data: wallet } = await supabase
        .from('wallets')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!wallet) { setLoading(false); return; }

      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('wallet_id', wallet.id)
        .order('created_at', { ascending: false })
        .limit(limit);
      setTransactions(data ?? []);
      setLoading(false);
    };
    fetch();
  }, [user, limit]);

  return { transactions, loading };
}
```

**Step 4: Create tickets hook**

Create `lib/hooks/use-tickets.ts`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Ticket, Event, TicketTier } from '@/lib/types/database';
import { useAuthContext } from '@/components/providers/AuthProvider';

export interface TicketWithDetails extends Ticket {
  event: Event;
  tier: TicketTier;
}

export function useTickets() {
  const { user } = useAuthContext();
  const [tickets, setTickets] = useState<TicketWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setTickets([]); setLoading(false); return; }

    const fetch = async () => {
      const { data: ticketRows } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('purchased_at', { ascending: false });

      if (!ticketRows || ticketRows.length === 0) { setTickets([]); setLoading(false); return; }

      // Fetch related events and tiers
      const eventIds = [...new Set(ticketRows.map(t => t.event_id))];
      const tierIds = [...new Set(ticketRows.map(t => t.tier_id))];

      const [{ data: events }, { data: tiers }] = await Promise.all([
        supabase.from('events').select('*').in('id', eventIds),
        supabase.from('ticket_tiers').select('*').in('id', tierIds),
      ]);

      const eventMap = new Map((events ?? []).map(e => [e.id, e]));
      const tierMap = new Map((tiers ?? []).map(t => [t.id, t]));

      setTickets(ticketRows.map(t => ({
        ...t,
        event: eventMap.get(t.event_id)!,
        tier: tierMap.get(t.tier_id)!,
      })).filter(t => t.event && t.tier));
      setLoading(false);
    };
    fetch();
  }, [user]);

  return { tickets, loading };
}
```

**Step 5: Replace notification store with Supabase-backed version**

Create `lib/hooks/use-notifications.ts`:

```typescript
'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Notification } from '@/lib/types/database';
import { useAuthContext } from '@/components/providers/AuthProvider';

export function useNotifications() {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setNotifications([]); setUnreadCount(0); setLoading(false); return; }

    const fetch = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
      const notifs = data ?? [];
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
      setLoading(false);
    };
    fetch();

    // Realtime for new notifications
    const channel = supabase
      .channel('notification-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        const newNotif = payload.new as Notification;
        setNotifications(prev => [newNotif, ...prev]);
        setUnreadCount(prev => prev + 1);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const markAsRead = useCallback(async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!user) return;
    await supabase.from('notifications').update({ read: true }).eq('user_id', user.id).eq('read', false);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  }, [user]);

  return { notifications, unreadCount, loading, markAsRead, markAllAsRead };
}
```

**Step 6: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 7: Commit**

```bash
git add lib/hooks/
git commit -m "feat: add Supabase data hooks for profile, events, wallet, tickets, and notifications"
```

---

## Task 5: Refactor Components — Events

**Files:**
- Modify: `components/features/home/FeaturedEvents.tsx` — replace hardcoded events with `useEvents({ featured: true })`
- Modify: `app/events/page.tsx` — replace hardcoded events with `useEvents()`
- Modify: `app/event-detail/page.tsx` — use `useEvent(slug)` with URL search params
- Modify: `components/features/event-detail/EventLineup.tsx` — accept artists as prop
- Modify: `components/features/event-detail/EventPricing.tsx` — accept tiers as prop

The key pattern: remove `const events = [...]` from each component and replace with hook calls. Pass data as props to child components.

Event detail page needs to read slug from URL. Since this is a static export, use `useSearchParams()` to pass `?slug=oxa-jungle-party` and update all `<Link href="/event-detail">` to `<Link href={`/event-detail?slug=${event.slug}`}>`.

**Step 1: Implement changes**

Update each component to use the hooks. Add loading skeleton states (simple pulse animation divs).

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git commit -am "feat: connect events pages to Supabase data"
```

---

## Task 6: Refactor Components — Wallet & Transactions

**Files:**
- Modify: `components/features/wallet/BalanceCard.tsx` — use `useWallet()`
- Modify: `components/features/wallet/TransactionHistory.tsx` — use `useTransactions()`
- Modify: `components/features/home/WalletBalanceCard.tsx` — use `useWallet()`
- Modify: `app/transactions/page.tsx` — use `useTransactions()`

Replace hardcoded balance (฿4,820) and transaction arrays with hook data. Format amounts from satang to THB display: `(amount / 100).toLocaleString()`.

**Step 1: Implement changes**

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git commit -am "feat: connect wallet and transactions to Supabase"
```

---

## Task 7: Refactor Components — Profile, Tickets, Notifications

**Files:**
- Modify: `app/profile/page.tsx` — use `useProfile()`, `useAuthContext()`
- Modify: `app/ticket/page.tsx` — use `useTickets()`
- Modify: `app/venue-ticket/page.tsx` — use ticket data from URL params
- Modify: `app/notifications/page.tsx` — use `useNotifications()`
- Modify: `components/navigation/BottomNav.tsx` — use `useNotifications()` instead of Zustand store
- Modify: `components/navigation/DesktopSidebar.tsx` — use `useNotifications()` instead of Zustand store

Replace hardcoded "Alex Rivera", loyalty points, etc. with profile data from hooks. Update nav components to use `useNotifications().unreadCount` instead of the Zustand store.

Once all references to the old Zustand notification store are removed, delete `lib/stores/notification-store.ts`.

**Step 1: Implement changes**

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git commit -am "feat: connect profile, tickets, and notifications to Supabase"
```

---

## Task 8: Edge Functions

**Files:**
- Create: `supabase/functions/purchase-ticket/index.ts`
- Create: `supabase/functions/topup-wallet/index.ts`
- Create: `supabase/functions/scan-to-pay/index.ts`
- Create: `supabase/functions/validate-ticket/index.ts`
- Create: `supabase/functions/omise-webhook/index.ts`
- Create: `supabase/functions/apply-referral/index.ts`

Edge Functions are written in Deno/TypeScript and deployed via `supabase functions deploy`.

Each function:
1. Validates the JWT from the `Authorization` header
2. Parses request body
3. Performs the business logic (calling DB functions, Omise API, etc.)
4. Returns JSON response

**Omise integration** in `topup-wallet`: call `https://api.omise.co/charges` with Basic auth (secret key). Handle 3D Secure by returning `authorize_uri` to the client.

**Omise webhook** in `omise-webhook`: verify event, find pending transaction by charge ID in metadata, credit wallet via `credit_wallet()` DB function.

The client calls these via `supabase.functions.invoke('function-name', { body: {...} })`.

**Step 1: Implement all edge functions**

**Step 2: Update client components to call edge functions**
- `app/scan-to-pay/page.tsx` — call `scan-to-pay` function instead of setTimeout
- `app/top-up/page.tsx` — call `topup-wallet` function instead of setTimeout
- `app/checkout/page.tsx` / `PaymentButton.tsx` — call `purchase-ticket` function
- `app/referral/page.tsx` — call `apply-referral` on first top-up

**Step 3: Commit**

```bash
git add supabase/functions/
git commit -am "feat: add edge functions for payments, tickets, and referrals"
```

---

## Task 9: Storage Buckets

**Files:**
- Create: `supabase/migrations/006_storage.sql`

**Step 1: Create storage policies**

```sql
-- Create buckets
insert into storage.buckets (id, name, public) values ('event-images', 'event-images', true);
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- event-images: public read
create policy "Event images are publicly accessible"
  on storage.objects for select using (bucket_id = 'event-images');

-- avatars: public read, owner write
create policy "Avatars are publicly accessible"
  on storage.objects for select using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert with check (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own avatar"
  on storage.objects for update using (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );
```

**Step 2: Add avatar upload to profile page**

Add a button on the profile page that calls:
```typescript
const { data } = await supabase.storage
  .from('avatars')
  .upload(`${user.id}/avatar.jpg`, file, { upsert: true });
```

Then update `profile.avatar_url` with the public URL.

**Step 3: Commit**

```bash
git add supabase/migrations/006_storage.sql
git commit -am "feat: add storage buckets for event images and avatars"
```

---

## Task 10: Auth Guards & Final Wiring

**Files:**
- Create: `components/guards/AuthGuard.tsx`
- Modify: pages that require auth (wallet, profile, tickets, transactions, checkout, scan-to-pay, referral, notifications, settings)

**Step 1: Create AuthGuard**

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/components/providers/AuthProvider';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="material-icons text-primary text-4xl animate-spin">sync</span>
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
}
```

**Step 2: Wrap authenticated pages**

In each page that requires auth, wrap the content:

```typescript
import { AuthGuard } from '@/components/guards/AuthGuard';

export default function WalletPage() {
  return (
    <AuthGuard>
      {/* existing page content */}
    </AuthGuard>
  );
}
```

Pages that DON'T need auth: home (`/`), events (`/events`), event-detail (`/event-detail`), login (`/login`), auth callback (`/auth/callback`).

**Step 3: Update profile logout**

In `app/profile/page.tsx`, replace the toast-based logout with:
```typescript
const { signOut } = useAuthContext();
// onClick:
await signOut();
router.push('/login');
```

**Step 4: Verify build**

Run: `npm run build`

**Step 5: Commit**

```bash
git commit -am "feat: add auth guards and protect authenticated routes"
```

---

## Task 11: Cleanup

**Files:**
- Delete: `lib/stores/notification-store.ts` (replaced by `use-notifications` hook)
- Verify: no remaining hardcoded mock data in any component
- Verify: `.env.local` is in `.gitignore`

**Step 1: Remove dead code**

Search for any remaining hardcoded `const events = [`, `const transactions = [`, etc. and remove them.

**Step 2: Ensure .env.local is gitignored**

Check `.gitignore` contains `.env.local`. If not, add it.

**Step 3: Final build check**

Run: `npm run build`

**Step 4: Commit**

```bash
git commit -am "chore: remove hardcoded mock data and old notification store"
```
