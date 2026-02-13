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
    if (!user) return;

    const fetch = async () => {
      const { data } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setWallet(data as Wallet | null);
      setLoading(false);
    };
    fetch();

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
    if (!user) return;

    const fetch = async () => {
      const { data: rawWallet } = await supabase
        .from('wallets')
        .select('id')
        .eq('user_id', user.id)
        .single();

      const wallet = rawWallet as { id: string } | null;
      if (!wallet) { setLoading(false); return; }

      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('wallet_id', wallet.id)
        .order('created_at', { ascending: false })
        .limit(limit);
      setTransactions((data as Transaction[] | null) ?? []);
      setLoading(false);
    };
    fetch();
  }, [user, limit]);

  return { transactions, loading };
}
