import React from 'react';
import type { TicketTier } from '@/lib/types/database';

export function OrderSummary({ tier }: { tier?: TicketTier }) {
    const price = tier ? tier.price / 100 : 0;
    const fee = Math.round(price * 0.05);
    const total = price + fee;

    return (
        <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest text-white/50 font-bold mb-4">Order Summary</h3>
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-3">
                {tier ? (
                    <>
                        <div className="flex justify-between items-center">
                            <span className="text-white/80">1x {tier.name}</span>
                            <span className="font-bold">฿{price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/50">Service Fee</span>
                            <span className="text-white/50">฿{fee.toLocaleString()}</span>
                        </div>
                        <div className="pt-3 border-t border-primary/10 flex justify-between items-center">
                            <span className="font-bold text-primary">Total Amount</span>
                            <span className="text-2xl font-bold text-primary">฿{total.toLocaleString()}</span>
                        </div>
                    </>
                ) : (
                    <div className="text-white/40 text-sm text-center py-2">No ticket tier available</div>
                )}
            </div>
        </div>
    );
}
