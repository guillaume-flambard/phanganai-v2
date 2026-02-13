'use client';

import React from 'react';
import { FadeIn } from '../../motion/FadeIn';
import type { Event } from '@/lib/types/database';

export function EventAbout({ event }: { event: Event }) {
    if (!event.description) return null;

    return (
        <FadeIn>
        <section>
            <h2 className="text-xl font-bold mb-3">About Event</h2>
            <p className="text-slate-400 leading-relaxed text-sm">
                {event.description}
            </p>
        </section>
        </FadeIn>
    );
}
