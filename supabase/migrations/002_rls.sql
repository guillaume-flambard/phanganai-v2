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

create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Events are publicly readable" on public.events for select using (true);
create policy "Artists are publicly readable" on public.artists for select using (true);
create policy "Event artists are publicly readable" on public.event_artists for select using (true);
create policy "Ticket tiers are publicly readable" on public.ticket_tiers for select using (true);

create policy "Users can read own tickets" on public.tickets for select using (auth.uid() = user_id);
create policy "Users can read own wallet" on public.wallets for select using (auth.uid() = user_id);

create policy "Users can read own transactions" on public.transactions
  for select using (wallet_id in (select id from public.wallets where user_id = auth.uid()));

create policy "Users can read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can mark own notifications as read" on public.notifications
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can read own referrals" on public.referrals
  for select using (auth.uid() = referrer_id or auth.uid() = referred_id);
