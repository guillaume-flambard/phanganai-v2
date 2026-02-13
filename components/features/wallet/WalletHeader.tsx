'use client';

import React from 'react';
import Link from 'next/link';
import { useProfile } from '@/lib/hooks/use-profile';

export function WalletHeader() {
    const { profile } = useProfile();

    return (
        <header className="pt-2 pb-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 bg-surface-dark">
                    {profile?.avatar_url ? (
                        <img
                            className="w-full h-full object-cover"
                            alt="User avatar"
                            src={profile.avatar_url}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="material-icons text-primary/40">person</span>
                        </div>
                    )}
                </div>
                <div>
                    <p className="text-xs text-primary/60 font-medium uppercase tracking-wider">Welcome back</p>
                    <h1 className="text-lg font-bold">{profile?.display_name ?? 'Guest'}</h1>
                </div>
            </div>
            <Link href="/notifications" className="w-10 h-10 rounded-full bg-surface-dark flex items-center justify-center border border-primary/10" aria-label="Notifications">
                <span className="material-icons text-primary">notifications</span>
            </Link>
        </header>
    );
}
