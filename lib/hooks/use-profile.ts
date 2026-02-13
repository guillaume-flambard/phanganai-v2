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
    if (!user) return;

    let cancelled = false;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (!cancelled) {
        setProfile(data as Profile | null);
        setLoading(false);
      }
    };
    fetchProfile();
    return () => { cancelled = true; };
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from('profiles') as any)
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    if (!error && data) setProfile(data as Profile);
    return { data, error };
  };

  return { profile, loading, updateProfile };
}
