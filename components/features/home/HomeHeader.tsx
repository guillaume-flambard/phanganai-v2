'use client';

import React from 'react';
import Link from 'next/link';
import { useProfile } from '@/lib/hooks/use-profile';

const DEFAULT_AVATAR = '/icons/default-avatar.svg';

export function HomeHeader() {
    const { profile, loading } = useProfile();
    const displayName = profile?.display_name ?? 'Explorer';

    return (
        <header className="flex justify-between items-center mb-8">
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80 font-semibold mb-1">Welcome to the Jungle</p>
                {loading ? (
                    <div className="h-7 w-36 bg-white/10 rounded animate-pulse" />
                ) : (
                    <h1 className="text-2xl font-bold tracking-tight">{displayName.toUpperCase()} <span className="text-primary">.</span></h1>
                )}
            </div>
            <Link href="/profile" className="relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary/30">
                    {loading ? (
                        <div className="w-full h-full bg-white/10 animate-pulse" />
                    ) : (
                        <img
                            className="w-full h-full object-cover"
                            alt="Profile"
                            src={profile?.avatar_url || DEFAULT_AVATAR}
                        />
                    )}
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background-dark neon-glow" />
            </Link>
        </header>
    );
}
