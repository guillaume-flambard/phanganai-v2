'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const amounts = ['฿500', '฿1,000', '฿2,000'];

export function QuickActions() {
    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

    return (
        <div>
            {/* Quick Top-Up */}
            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white/90">Quick Top-Up</h3>
                    <span className="text-xs text-primary font-medium">Auto-reload off</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {amounts.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => setSelectedAmount(selectedAmount === amount ? null : amount)}
                            className={`py-3 border rounded-full text-sm font-semibold transition-colors active:scale-95 ${
                                selectedAmount === amount
                                    ? 'bg-primary/20 border-primary/40 text-primary'
                                    : 'bg-surface-dark border-white/5 hover:bg-primary/20 hover:border-primary/40'
                            }`}
                        >
                            {amount}
                        </button>
                    ))}
                </div>
                {selectedAmount && (
                    <Link href="/top-up" className="w-full mt-4 py-3 bg-primary text-background-dark font-bold rounded-full neon-glow active:scale-[0.98] transition-transform block text-center">
                        Top Up {selectedAmount}
                    </Link>
                )}
            </section>

            {/* Payment Method */}
            <section className="mb-8">
                <h3 className="font-bold text-white/90 mb-4">Payment Method</h3>
                <div className="p-4 bg-surface-dark/60 border border-white/5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                            <span className="material-icons text-blue-400">credit_card</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Omise / Credit Card</p>
                            <p className="text-xs text-white/40">Visa &bull;&bull;&bull;&bull; 4242</p>
                        </div>
                    </div>
                    <Link href="/payment-methods" className="text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full active:scale-95 transition-transform">
                        Edit
                    </Link>
                </div>
            </section>
        </div>
    );
}
