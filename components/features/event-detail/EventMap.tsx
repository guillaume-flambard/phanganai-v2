'use client';

import React from 'react';
import { FadeIn } from '../../motion/FadeIn';
import type { Event } from '@/lib/types/database';

export function EventMap({ event }: { event?: Event }) {
    const venue = event?.venue || 'Koh Phangan';
    const location = event?.location || 'Thailand';

    return (
        <FadeIn delay={0.1}>
        <section className="mt-4">
            <div className="w-full rounded-lg overflow-hidden relative border border-white/10 bg-surface-dark p-5">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="material-icons text-primary text-2xl">location_on</span>
                    </div>
                    <div>
                        <p className="font-bold">{venue}</p>
                        <p className="text-sm text-white/50">{location}</p>
                    </div>
                </div>
            </div>
        </section>
        </FadeIn>
    );
}
