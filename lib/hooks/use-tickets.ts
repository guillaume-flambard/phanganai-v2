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
      const { data: rawTickets } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('purchased_at', { ascending: false });

      const ticketRows = rawTickets as Ticket[] | null;
      if (!ticketRows || ticketRows.length === 0) { setTickets([]); setLoading(false); return; }

      const eventIds = [...new Set(ticketRows.map(t => t.event_id))];
      const tierIds = [...new Set(ticketRows.map(t => t.tier_id))];

      const [{ data: rawEvents }, { data: rawTiers }] = await Promise.all([
        supabase.from('events').select('*').in('id', eventIds),
        supabase.from('ticket_tiers').select('*').in('id', tierIds),
      ]);

      const events = rawEvents as Event[] | null;
      const tiers = rawTiers as TicketTier[] | null;

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
