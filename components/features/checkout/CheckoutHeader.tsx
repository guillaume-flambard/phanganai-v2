'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AnimatedProgress } from '@/components/motion/AnimatedProgress';

export function CheckoutHeader() {
    const router = useRouter();

    return (
        <div className="py-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <button
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                    onClick={() => router.back()}
                    aria-label="Go back"
                >
                    <span className="material-icons">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xl font-bold tracking-tight">Checkout</h1>
                <div className="w-10" />
            </div>

            {/* Step Indicator */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-primary/60">
                    <span>Payment Method</span>
                    <span>Step 1 of 2</span>
                </div>
                <AnimatedProgress
                    progress={50}
                    className="w-full h-1 bg-primary/20 rounded-full overflow-hidden"
                    barClassName="h-full bg-primary shadow-[0_0_8px_#13ec5b]"
                />
            </div>
        </div>
    );
}
