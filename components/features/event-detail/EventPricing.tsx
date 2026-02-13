'use client';

import React from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { FadeIn } from '../../motion/FadeIn';

export function EventPricing() {
    return (
        <FadeIn>
        <GlassCard className="rounded-xl p-5 border-primary/20 bg-primary/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-4">Pricing Breakdown</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">General Admission</span>
                    <span className="font-medium">฿600.00</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Service Fee (5%)</span>
                    <span className="font-medium">฿30.00</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-lg font-bold">Total Price</span>
                    <span className="text-2xl font-bold text-primary">฿630.00</span>
                </div>
            </div>
        </GlassCard>
        </FadeIn>
    );
}
