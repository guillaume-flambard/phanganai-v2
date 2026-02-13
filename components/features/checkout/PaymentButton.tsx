'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { haptics } from '@/lib/haptics';
import { supabase } from '@/lib/supabase';

interface PaymentButtonProps {
    eventId?: string;
    tierId?: string;
    payWithWallet?: boolean;
}

export function PaymentButton({ eventId, tierId, payWithWallet = true }: PaymentButtonProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirm = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        haptics.impact('medium');
        const toastId = toast.loading('Processing payment...');

        const resolvedEventId = eventId || searchParams.get('event_id');
        const resolvedTierId = tierId || searchParams.get('tier_id');

        if (!resolvedEventId || !resolvedTierId) {
            toast.error('Missing event or ticket tier information', { id: toastId });
            setIsProcessing(false);
            return;
        }

        const { data, error } = await supabase.functions.invoke('purchase-ticket', {
            body: {
                event_id: resolvedEventId,
                tier_id: resolvedTierId,
                pay_with_wallet: payWithWallet,
            },
        });

        if (error || !data?.success) {
            toast.error(error?.message || data?.error || 'Payment failed', { id: toastId });
            haptics.notification('error');
            setIsProcessing(false);
            return;
        }

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
