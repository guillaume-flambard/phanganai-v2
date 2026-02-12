import React from 'react';
import { PlusCircle, ShieldCheck, Lock } from 'lucide-react';

export function WalletBalanceCard() {
    return (
        <section className="px-6 mb-8">
            <div className="bg-gradient-to-br from-primary/20 via-background-dark to-primary/5 rounded-[2rem] p-6 border border-primary/20 relative overflow-hidden neon-glow">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                <div className="relative z-10 flex justify-between items-end">
                    <div>
                        <span className="text-primary text-xs font-bold uppercase tracking-widest">Wallet Balance</span>
                        <div className="text-4xl font-bold mt-1 tracking-tight">฿1,250.00</div>
                    </div>

                    <button className="bg-primary text-background-dark font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(19,236,91,0.3)]">
                        <PlusCircle className="w-5 h-5" />
                        Top Up
                    </button>
                </div>

                <div className="mt-6 flex gap-4 text-[10px] text-white/40 font-medium uppercase tracking-tighter">
                    <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-gold" />
                        Verified User
                    </span>
                    <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Encrypted Wallet
                    </span>
                </div>
            </div>
        </section>
    );
}
