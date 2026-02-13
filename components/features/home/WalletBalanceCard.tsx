'use client';

import React from 'react';
import Link from 'next/link';
import { FadeIn } from '../../motion/FadeIn';
import { AnimatedCounter } from '../../motion/AnimatedCounter';
import { useWallet } from '@/lib/hooks/use-wallet';

export function WalletBalanceCard() {
    const { wallet, loading } = useWallet();
    const balanceTHB = wallet ? wallet.balance / 100 : 0;

    return (
        <FadeIn>
        <section className="mb-10">
            <div className="relative rounded-2xl p-5 bg-background-dark/90 overflow-hidden shadow-2xl border border-[#b38728]/40">
                <div className="absolute inset-0 rounded-2xl gold-gradient opacity-15 pointer-events-none" />
                <div className="absolute inset-0 bg-[#ffd700]/5 pointer-events-none" />

                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#ffd700]/70 font-bold mb-1">Available Credits</p>
                        {loading ? (
                            <div className="h-9 w-36 bg-white/10 rounded-lg animate-pulse" />
                        ) : (
                            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                                &#3647;<AnimatedCounter target={balanceTHB} /> <span className="text-sm font-medium text-[#ffd700]">THB</span>
                            </h2>
                        )}
                        {!wallet && !loading && (
                            <p className="text-[10px] text-white/40 mt-1">Sign in to view balance</p>
                        )}
                    </div>
                    <div className="bg-[#ffd700]/10 w-10 h-10 rounded-xl flex items-center justify-center">
                        <span className="material-icons text-[#ffd700] text-2xl">account_balance_wallet</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-end relative z-10">
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                            <span className="material-icons text-base text-primary">confirmation_number</span>
                            <span className="text-[10px] font-bold text-primary uppercase">Tickets</span>
                        </div>
                    </div>
                    <Link href="/top-up" className="bg-[#ffd700] text-background-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#ffd700]/20">
                        Quick Top Up
                    </Link>
                </div>
            </div>
        </section>
        </FadeIn>
    );
}
