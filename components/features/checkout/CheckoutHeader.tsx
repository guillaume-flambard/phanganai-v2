'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';

export function CheckoutHeader() {
    const router = useRouter();

    return (
        <div className="px-6 py-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full w-10 h-10 p-0 text-primary bg-primary/10 border-none hover:bg-primary/20"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-xl font-bold tracking-tight">Checkout</h1>
                <div className="w-10" />
            </div>

            {/* Step Indicator */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-primary/60">
                    <span>Payment Method</span>
                    <span>Step 1 of 2</span>
                </div>
                <div className="w-full h-1 bg-primary/20 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-primary shadow-[0_0_8px_#13ec5b]" />
                </div>
            </div>
        </div>
    );
}
