'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { haptics } from '@/lib/haptics';

export function PaymentButton() {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirm = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        haptics.impact('medium');
        const toastId = toast.loading('Processing payment...');
        await new Promise((r) => setTimeout(r, 1500));
        toast.success('Payment confirmed!', { id: toastId });
        haptics.notification('success');
        router.push('/payment-success');
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent z-20 lg:static lg:bg-transparent lg:p-0 lg:mt-4">
            <div className="max-w-md mx-auto lg:max-w-none">
                <button
                    className="w-full h-16 bg-primary text-background-dark font-black text-lg rounded-full flex items-center justify-center gap-2 neon-glow shadow-[0_8px_20px_-4px_#13ec5b66] active:scale-[0.98] transition-transform disabled:opacity-50"
                    onClick={handleConfirm}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <span className="material-icons animate-spin">sync</span>
                            PROCESSING...
                        </>
                    ) : (
                        <>
                            CONFIRM PAYMENT
                            <span className="material-icons">arrow_forward</span>
                        </>
                    )}
                </button>
                <div className="w-32 h-1.5 bg-white/20 rounded-full mx-auto mt-6 pointer-events-none lg:hidden" />
            </div>
        </div>
    );
}
