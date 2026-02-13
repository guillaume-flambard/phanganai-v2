'use client';

import React from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { FadeIn } from '../../motion/FadeIn';
import type { TicketTier } from '@/lib/types/database';

export function EventPricing({ tiers }: { tiers: TicketTier[] }) {
    if (tiers.length === 0) return null;

    // Use the cheapest tier as the default selection for total display
    const cheapest = tiers[0]; // tiers are already sorted by price from the hook
    const serviceFeeRate = 0.05;
    const basePrice = cheapest.price / 100;
    const serviceFee = Math.round(basePrice * serviceFeeRate * 100) / 100;
    const total = basePrice + serviceFee;

    return (
        <FadeIn>
        <GlassCard className="rounded-xl p-5 border-primary/20 bg-primary/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-4">Pricing Breakdown</h3>
            <div className="space-y-3">
                {tiers.map((tier) => (
                    <div key={tier.id} className="flex justify-between items-center">
                        <span className="text-slate-400">{tier.name}</span>
                        <span className="font-medium">฿{(tier.price / 100).toLocaleString()}</span>
                    </div>
                ))}
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Service Fee (5%)</span>
                    <span className="font-medium">฿{serviceFee.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-lg font-bold">Total (from)</span>
                    <span className="text-2xl font-bold text-primary">฿{total.toLocaleString()}</span>
                </div>
            </div>
        </GlassCard>
        </FadeIn>
    );
}
