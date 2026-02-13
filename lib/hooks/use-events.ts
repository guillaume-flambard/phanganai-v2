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
      setEvents((data as Event[] | null) ?? []);
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
      const { data: rawEvent } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();

      const eventData = rawEvent as Event | null;
      if (!eventData) { setLoading(false); return; }
      setEvent(eventData);

      const { data: rawLinks } = await supabase
        .from('event_artists')
        .select('*')
        .eq('event_id', eventData.id)
        .order('sort_order');
      const artistLinks = rawLinks as { event_id: string; artist_id: string; sort_order: number }[] | null;

      if (artistLinks && artistLinks.length > 0) {
        const { data: rawArtists } = await supabase
          .from('artists')
          .select('*')
          .in('id', artistLinks.map(l => l.artist_id));
        const artistsData = rawArtists as Artist[] | null;
        const orderMap = new Map(artistLinks.map(l => [l.artist_id, l.sort_order]));
        setArtists((artistsData ?? []).sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0)));
      }

      const { data: rawTiers } = await supabase
        .from('ticket_tiers')
        .select('*')
        .eq('event_id', eventData.id)
        .order('price');
      setTiers((rawTiers as TicketTier[] | null) ?? []);

      setLoading(false);
    };
    fetch();
  }, [slug]);

  return { event, artists, tiers, loading };
}
