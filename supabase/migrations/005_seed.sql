insert into public.events (id, title, slug, description, location, venue, date, doors_at, image_url, is_featured, status) values
  ('e1000000-0000-0000-0000-000000000001', 'OXA: Jungle Party', 'oxa-jungle-party',
   'Deep in the heart of Koh Phangan''s jungle, OXA presents an immersive audio-visual experience.',
   'Koh Phangan', 'OXA', now() + interval '2 days', now() + interval '2 days' - interval '1 hour', '', true, 'upcoming'),
  ('e1000000-0000-0000-0000-000000000002', 'OXA: Berlin Calling Edition', 'oxa-berlin-calling',
   'A night of pure Berlin techno in the jungle.',
   'Koh Phangan', 'OXA', now() + interval '9 days', now() + interval '9 days' - interval '1 hour', '', true, 'upcoming'),
  ('e1000000-0000-0000-0000-000000000003', 'Half Moon Festival', 'half-moon-festival',
   'The legendary Half Moon Festival returns to Ban Tai.',
   'Ban Tai, Phangan', 'Half Moon', now() + interval '16 days', now() + interval '16 days' - interval '2 hours', '', false, 'upcoming'),
  ('e1000000-0000-0000-0000-000000000004', 'Lighthouse: Full Moon Eve', 'lighthouse-full-moon',
   'Beach party at Leela Beach with sunset views and deep house.',
   'Leela Beach', 'Lighthouse', now() + interval '5 days', now() + interval '5 days' - interval '1 hour', '', false, 'upcoming'),
  ('e1000000-0000-0000-0000-000000000005', 'Secret Mountain: Sunset Session', 'secret-mountain-sunset',
   'Intimate sunset session high in the mountains.',
   'Secret Mountain', 'Secret Mountain', now() + interval '12 days', now() + interval '12 days' - interval '2 hours', '', false, 'upcoming');

insert into public.artists (id, name, genre, image_url) values
  ('a1000000-0000-0000-0000-000000000001', 'Makossa', 'Techno', ''),
  ('a1000000-0000-0000-0000-000000000002', 'Luna City', 'Deep House', ''),
  ('a1000000-0000-0000-0000-000000000003', 'Marco S.', 'Progressive', ''),
  ('a1000000-0000-0000-0000-000000000004', 'K-Soul', 'Afro House', '');

insert into public.event_artists (event_id, artist_id, sort_order) values
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 0),
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', 1),
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000003', 2),
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000004', 3);

insert into public.ticket_tiers (event_id, name, price, capacity) values
  ('e1000000-0000-0000-0000-000000000001', 'General Admission', 50000, 500),
  ('e1000000-0000-0000-0000-000000000001', 'VIP Early Bird', 80000, 100),
  ('e1000000-0000-0000-0000-000000000002', 'General Admission', 60000, 500),
  ('e1000000-0000-0000-0000-000000000002', 'VIP', 100000, 80),
  ('e1000000-0000-0000-0000-000000000003', 'General Admission', 250000, 2000),
  ('e1000000-0000-0000-0000-000000000004', 'General Admission', 60000, 300),
  ('e1000000-0000-0000-0000-000000000005', 'General Admission', 50000, 150);
