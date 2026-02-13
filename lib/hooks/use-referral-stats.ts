'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthContext } from '@/components/providers/AuthProvider';

export function useReferralStats() {
  const { user } = useAuthContext();
  const [totalRewards, setTotalRewards] = useState(0);
  const [friendsCount, setFriendsCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      const [{ count }, { data: txData }] = await Promise.all([
        supabase
          .from('referrals')
          .select('*', { count: 'exact', head: true })
          .eq('referrer_id', user.id),
        supabase
          .from('wallets')
          .select('id')
          .eq('user_id', user.id)
          .single(),
      ]);

      setFriendsCount(count ?? 0);

      if (txData) {
        const { data: rewards } = await supabase
          .from('transactions')
          .select('amount')
          .eq('wallet_id', (txData as { id: string }).id)
          .eq('type', 'referral');

        const total = (rewards ?? []).reduce((sum, r) => sum + (r as { amount: number }).amount, 0);
        setTotalRewards(Math.round(total / 100));
      }
    };
    fetch();
  }, [user]);

  return { totalRewards, friendsCount };
}
