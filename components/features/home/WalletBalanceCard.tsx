import React from 'react';
import Link from 'next/link';

export function WalletBalanceCard() {
    return (
        <section className="mb-10">
            <div className="relative rounded-2xl p-5 bg-background-dark/90 overflow-hidden shadow-2xl border border-[#b38728]/40">
                <div className="absolute inset-0 rounded-2xl gold-gradient opacity-15 pointer-events-none" />
                <div className="absolute inset-0 bg-[#ffd700]/5 pointer-events-none" />

                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#ffd700]/70 font-bold mb-1">Available Credits</p>
                        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                            4,250.00 <span className="text-sm font-medium text-[#ffd700]">PAI</span>
                        </h2>
                    </div>
                    <div className="bg-[#ffd700]/10 p-2 rounded-lg">
                        <span className="material-icons text-[#ffd700] text-xl">account_balance_wallet</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-end relative z-10">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-primary/20 flex items-center justify-center">
                            <span className="material-icons text-[14px] text-primary">confirmation_number</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-[#ffd700]/20 flex items-center justify-center">
                            <span className="material-icons text-[14px] text-[#ffd700]">star</span>
                        </div>
                    </div>
                    <Link href="/top-up" className="bg-[#ffd700] text-background-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#ffd700]/20">
                        Quick Top Up
                    </Link>
                </div>
            </div>
        </section>
    );
}
