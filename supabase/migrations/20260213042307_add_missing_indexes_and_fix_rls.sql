-- Add missing foreign key indexes for performance
CREATE INDEX idx_event_artists_artist ON public.event_artists(artist_id);
CREATE INDEX idx_referrals_referred ON public.referrals(referred_id);
CREATE INDEX idx_referrals_referrer ON public.referrals(referrer_id);
CREATE INDEX idx_ticket_tiers_event ON public.ticket_tiers(event_id);
CREATE INDEX idx_tickets_event ON public.tickets(event_id);
CREATE INDEX idx_tickets_tier ON public.tickets(tier_id);

-- Fix RLS policies to use (select auth.uid()) instead of auth.uid()
-- This prevents re-evaluation per row (initplan optimization)

-- profiles
DROP POLICY "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (id = (select auth.uid()));

DROP POLICY "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (id = (select auth.uid()));

-- tickets
DROP POLICY "Users can read own tickets" ON public.tickets;
CREATE POLICY "Users can read own tickets" ON public.tickets
  FOR SELECT USING (user_id = (select auth.uid()));

-- wallets
DROP POLICY "Users can read own wallet" ON public.wallets;
CREATE POLICY "Users can read own wallet" ON public.wallets
  FOR SELECT USING (user_id = (select auth.uid()));

-- transactions
DROP POLICY "Users can read own transactions" ON public.transactions;
CREATE POLICY "Users can read own transactions" ON public.transactions
  FOR SELECT USING (wallet_id IN (SELECT id FROM wallets WHERE user_id = (select auth.uid())));

-- notifications
DROP POLICY "Users can read own notifications" ON public.notifications;
CREATE POLICY "Users can read own notifications" ON public.notifications
  FOR SELECT USING (user_id = (select auth.uid()));

DROP POLICY "Users can mark own notifications as read" ON public.notifications;
CREATE POLICY "Users can mark own notifications as read" ON public.notifications
  FOR UPDATE USING (user_id = (select auth.uid())) WITH CHECK (user_id = (select auth.uid()));

-- referrals
DROP POLICY "Users can read own referrals" ON public.referrals;
CREATE POLICY "Users can read own referrals" ON public.referrals
  FOR SELECT USING ((select auth.uid()) = referrer_id OR (select auth.uid()) = referred_id);
