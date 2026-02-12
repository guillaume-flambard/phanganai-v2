'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { PageTransition } from '../../components/motion/PageTransition';
import { slideRightVariants } from '../../lib/animations';
import { haptics } from '../../lib/haptics';

const quickAmounts = [
    { label: '฿500', value: 500 },
    { label: '฿1,000', value: 1000 },
    { label: '฿2,500', value: 2500 },
];

export default function TopUpPage() {
    const router = useRouter();
    const [selectedQuick, setSelectedQuick] = useState<number | null>(500);
    const [customAmount, setCustomAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleTopUp = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        haptics.impact('medium');
        const amount = customAmount || `฿${selectedQuick?.toLocaleString()}`;
        const toastId = toast.loading('Processing top-up...');
        await new Promise((r) => setTimeout(r, 1500));
        toast.success(`${amount} added to wallet`, { id: toastId });
        haptics.notification('success');
        router.push('/payment-success');
    };

    return (
        <MobileLayout>
            <PageTransition variant={slideRightVariants}>
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-dark border border-primary/10"
                        aria-label="Go back"
                    >
                        <span className="material-icons text-primary text-2xl">chevron_left</span>
                    </button>
                    <h1 className="text-xl font-bold tracking-tight">Add Funds</h1>
                    <div className="w-10" />
                </header>

                <main className="flex-1 px-6 pt-6 flex flex-col gap-8">
                    {/* Quick Select */}
                    <section className="flex flex-col gap-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary/60 px-1">Quick Select</h2>
                        <div className="flex gap-3">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt.value}
                                    onClick={() => { setSelectedQuick(amt.value); setCustomAmount(''); haptics.impact('light'); }}
                                    className={`flex-1 py-3 rounded-full font-bold text-sm transition-all active:scale-95 ${
                                        selectedQuick === amt.value && !customAmount
                                            ? 'bg-primary text-background-dark shadow-lg shadow-primary/20'
                                            : 'bg-surface-dark border border-primary/20 text-white/80'
                                    }`}
                                >
                                    {amt.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Custom Amount */}
                    <section className="flex flex-col gap-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-primary/60 px-1">Or enter custom amount</h2>
                        <div className="relative flex items-center justify-center p-8 rounded-xl bg-surface-dark/50 border border-primary/5">
                            <span className="absolute left-8 text-4xl font-bold text-primary/40">฿</span>
                            <label htmlFor="custom-amount" className="sr-only">Custom amount</label>
                            <input
                                id="custom-amount"
                                className="w-full bg-transparent border-none text-center text-5xl font-black focus:ring-0 focus:outline-none placeholder:text-primary/10 text-primary"
                                placeholder="0.00"
                                type="text"
                                inputMode="decimal"
                                value={customAmount}
                                onChange={(e) => {
                                    setCustomAmount(e.target.value);
                                    if (e.target.value) setSelectedQuick(null);
                                }}
                            />
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section className="flex flex-col gap-4">
                        <div className="flex justify-between items-end px-1">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-primary/60">Payment Method</h2>
                            <Link href="/payment-methods" className="text-xs font-bold text-primary uppercase tracking-tighter">Change</Link>
                        </div>
                        <div className="p-5 rounded-xl bg-surface-dark border border-primary/20 flex items-center gap-4">
                            <div className="w-12 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-[10px] text-white font-bold italic tracking-tighter relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/10 opacity-50 skew-x-12 translate-x-4" />
                                VISA
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">Visa **** 4488</p>
                                <p className="text-[10px] uppercase font-bold text-primary/40 tracking-widest">Exp 12/26</p>
                            </div>
                            <div className="flex items-center gap-1 opacity-60">
                                <span className="text-[9px] font-bold text-white/40">Powered by</span>
                                <span className="text-[11px] font-black tracking-tighter text-blue-500 italic">omise</span>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="p-6 pb-12 flex flex-col gap-4">
                    <button
                        onClick={handleTopUp}
                        disabled={isProcessing}
                        className="w-full py-5 rounded-full bg-primary hover:bg-primary/90 text-background-dark font-black text-lg shadow-2xl shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isProcessing ? (
                            <span className="material-icons text-xl animate-spin">sync</span>
                        ) : (
                            <span className="material-icons text-xl">account_balance_wallet</span>
                        )}
                        {isProcessing ? 'Processing...' : 'Top Up Now'}
                    </button>
                    <div className="flex items-center justify-center gap-1.5 text-primary/40">
                        <span className="material-icons text-xs">lock</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Securely processed by Omise</span>
                    </div>
                </footer>
            </PageTransition>
        </MobileLayout>
    );
}
