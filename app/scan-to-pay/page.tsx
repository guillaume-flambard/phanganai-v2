'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { PageTransition } from '../../components/motion/PageTransition';
import { slideUpVariants } from '../../lib/animations';
import { haptics } from '../../lib/haptics';
import { supabase } from '@/lib/supabase';

const quickAmounts = ['฿250', '฿450', '฿800'];

export default function ScanToPayPage() {
    const router = useRouter();
    const [selectedAmount, setSelectedAmount] = useState('฿450');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePay = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        haptics.impact('medium');
        const toastId = toast.loading('Processing payment...');

        const amount = parseInt(selectedAmount.replace('฿', '')) * 100;
        const { data, error } = await supabase.functions.invoke('scan-to-pay', {
            body: { amount, description: 'OXA Bar' },
        });

        if (error || !data?.success) {
            toast.error(error?.message || data?.error || 'Payment failed', { id: toastId });
            haptics.notification('error');
            setIsProcessing(false);
            return;
        }

        toast.success(`${selectedAmount} sent to OXA Bar`, { id: toastId });
        haptics.notification('success');
        router.push('/payment-success');
    };

    return (
        <MobileLayout className="pb-0">
            <PageTransition variant={slideUpVariants}>
                <div className="relative flex flex-col lg:flex-row lg:gap-8 lg:items-start" style={{ minHeight: 'calc(100vh - 3rem)' }}>
                    {/* Top Navigation */}
                    <header className="absolute top-0 left-0 right-0 z-50 p-6 flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="w-10 h-10 rounded-full bg-background-dark/50 backdrop-blur-md flex items-center justify-center border border-white/10"
                            aria-label="Close"
                        >
                            <span className="material-icons text-xl">close</span>
                        </button>
                        <h1 className="text-lg font-bold tracking-tight uppercase italic">PhanganAI</h1>
                        <button className="w-10 h-10 rounded-full bg-background-dark/50 backdrop-blur-md flex items-center justify-center border border-white/10" aria-label="Toggle flashlight">
                            <span className="material-icons text-xl">flashlight_on</span>
                        </button>
                    </header>

                    {/* Viewfinder */}
                    <div className="relative flex-1 flex flex-col items-center justify-center min-h-[320px]">
                        <div className="absolute inset-0 z-0">
                            <img
                                alt="Nightlife venue"
                                className="w-full h-full object-cover grayscale-[0.2] brightness-50"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3NrE5eoX-gwq90YDHPDPgwhT-2lEZbNZqVrK4QjL8kfnrPuKTYRmHu0OJ7YO6t-ysUhKsa9_PTj5ojDrEU9gvmKQMdIJ4z-neadzvytuxnrWRe2hweEm-Imgio-QSdSMcloKsmwJxoI-mTdZRYDJ2AsXvTsC3LKAcsOt3tlbeYV8_yAvtTmzFbkFLln0WwUzS19siHHTKguFys8kNRRGOzzWYt9b6nVs_amTqHLYikhdB4b83A0hWZ4yAt3kuPjHHAn83XpnRRQs"
                            />
                            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, transparent 40%, rgba(16, 34, 22, 0.8) 100%)' }} />
                        </div>

                        {/* Scanning Frame */}
                        <div className="relative z-10 w-64 h-64 border-2 border-primary/40 rounded-xl overflow-hidden">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse shadow-[0_0_15px_#13ec5b]" />
                        </div>
                        <p className="relative z-10 mt-6 text-sm font-medium text-primary bg-background-dark/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-primary/20">
                            Align QR Code to Pay
                        </p>
                    </div>

                    {/* Payment Panel */}
                    <div className="relative z-20 bg-background-dark border-t border-white/10 rounded-t-xl px-6 pt-3 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />

                        {/* Merchant & Wallet */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center border border-gold/40">
                                    <span className="material-icons text-gold text-2xl">wine_bar</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h2 className="font-bold">OXA Bar</h2>
                                        <span className="material-icons text-gold text-base">verified</span>
                                    </div>
                                    <p className="text-xs text-white/50 uppercase tracking-widest">Ban Tai, Koh Phangan</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Wallet Balance</p>
                                <div className="flex items-center justify-end gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-primary font-bold">฿1,250</span>
                                </div>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="mb-8 text-center">
                            <span className="text-white/40 text-sm uppercase tracking-widest font-bold">Enter Amount</span>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className="text-4xl font-bold text-white/40">฿</span>
                                <span className="text-6xl font-bold">{selectedAmount.replace('฿', '')}</span>
                            </div>

                            <div className="flex gap-3 justify-center mt-6">
                                {quickAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => { setSelectedAmount(amount); haptics.impact('light'); }}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors active:scale-95 ${
                                            selectedAmount === amount
                                                ? 'border border-primary bg-primary/20 text-primary font-bold'
                                                : 'border border-white/10 bg-white/5 hover:bg-white/10'
                                        }`}
                                    >
                                        {amount}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Slide to Pay */}
                        <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className="relative h-20 w-full rounded-full bg-primary/10 border border-primary/20 flex items-center active:scale-[0.98] transition-transform disabled:opacity-50"
                        >
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-primary font-bold tracking-widest uppercase text-sm opacity-60">
                                    {isProcessing ? 'Processing...' : 'Slide to Pay Securely'}
                                </span>
                            </div>
                            <div className="ml-2 h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(19,236,91,0.5)]">
                                {isProcessing ? (
                                    <span className="material-icons text-background-dark text-3xl animate-spin">sync</span>
                                ) : (
                                    <span className="material-icons text-background-dark text-3xl">arrow_forward</span>
                                )}
                            </div>
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 opacity-30">
                            <span className="material-icons text-xs">lock</span>
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">End-to-End Encrypted</span>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </MobileLayout>
    );
}
