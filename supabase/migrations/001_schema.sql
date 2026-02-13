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
  price int not null,
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
  balance int not null default 0 check (balance >= 0),
  updated_at timestamptz not null default now()
);

-- transactions
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references public.wallets(id) on delete cascade,
  type text not null check (type in ('topup', 'payment', 'refund', 'referral', 'ticket_purchase')),
  amount int not null,
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
