'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { haptics } from '@/lib/haptics';
import { useWallet } from '@/lib/hooks/use-wallet';

export function BalanceCard() {
    const [hidden, setHidden] = useState(false);
    const { wallet, loading } = useWallet();
    const balanceTHB = wallet ? wallet.balance / 100 : 0;

    return (
        <div>
            {/* Balance Display */}
            <section className="mt-4 mb-8 text-center py-8 rounded-xl bg-surface-dark/40 backdrop-blur-md border border-white/5 relative">
                <p className="text-sm text-white/50 mb-1">Total Balance</p>
                <div className="flex items-center justify-center gap-1">
                    {loading ? (
                        <div className="h-16 w-48 bg-white/10 rounded-lg animate-pulse" />
                    ) : hidden ? (
                        <h2 className="text-6xl font-bold tracking-tight text-white/30">&bull;&bull;&bull;&bull;&bull;</h2>
                    ) : (
                        <>
                            <span className="text-3xl font-bold gold-text">&#3647;</span>
                            <h2 className="text-6xl font-bold gold-text tracking-tight">
                                <AnimatedCounter target={balanceTHB} className="gold-text" />
                            </h2>
                        </>
                    )}
                </div>
                {!wallet && !loading && (
                    <p className="text-xs text-white/40 mt-2">Sign in to view balance</p>
                )}
                <div className="mt-6 flex justify-center gap-3">
                    <button
                        onClick={() => { setHidden(!hidden); haptics.impact('light'); }}
                        className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary flex items-center gap-2 active:scale-95 transition-transform"
                    >
                        <span className="material-icons text-sm">{hidden ? 'visibility_off' : 'visibility'}</span>
                        {hidden ? 'Show' : 'Hide'}
                    </button>
                    <Link href="/transactions" className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary flex items-center gap-2 active:scale-95 transition-transform">
                        <span className="material-icons text-sm">history_edu</span>
                        Statements
                    </Link>
                </div>
            </section>

            {/* QR Code Button */}
            <Link href="/venue-ticket" className="w-full py-4 bg-primary text-background-dark font-bold text-lg rounded-full flex items-center justify-center gap-3 neon-glow active:scale-[0.98] transition-transform mb-8">
                <span className="material-icons">qr_code_2</span>
                My QR Code
            </Link>
        </div>
    );
}
