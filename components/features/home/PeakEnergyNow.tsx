'use client';

import React from 'react';
import Link from 'next/link';
import { FadeIn } from '../../motion/FadeIn';
import { useEvents } from '@/lib/hooks/use-events';

const FALLBACK_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAcyiHagYeLytG3El1EJoKbpWfYLLNDYCqEG6EEq25mxlx3uCLrkNsuVCjuD42WqtgYSSGsV3U1UQ6BIOEYAfXminjaBo4fHL8t_FHqVSVPq15wEUZxXSD87TTBI_ePTwVj2Uz2OYZjM9hSGBHq8CrQwO8CIcwCx1eRuVQIBj1B2ANudbDIZJqvsK-AiKSfkoGUdhEklkA0mIw3Ug0PRNYWbxl5RC6ztwJCyR2z2v_DWTxZ_S6dEf8sqNc0bTo7RWa-DdstAHV8OuM';

export function PeakEnergyNow() {
    const { events, loading } = useEvents();

    // Pick the soonest upcoming event (closest to now)
    const now = new Date();
    const nextEvent = events.find(e => new Date(e.date) >= now) ?? events[0];

    if (loading || !nextEvent) return null;

    return (
        <FadeIn>
        <section className="mb-10">
            <h3 className="text-sm font-bold tracking-widest text-primary/80 uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Happening Soon
            </h3>

            <Link href={`/event-detail?slug=${nextEvent.slug}`} className="block">
                <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-primary/20">
                        <img
                            alt={nextEvent.title}
                            className="w-full h-full object-cover"
                            src={nextEvent.image_url || FALLBACK_IMAGE}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-bold uppercase truncate">{nextEvent.title}</h5>
                        <p className="text-[10px] text-white/40 uppercase font-medium mt-1 flex items-center gap-1">
                            <span className="material-icons text-xs text-primary">location_on</span>
                            {nextEvent.venue}
                        </p>
                    </div>
                    <div className="flex flex-col items-center shrink-0">
                        <span className="text-primary font-black text-xs uppercase italic">Next</span>
                        <span className="material-icons text-primary">trending_up</span>
                    </div>
                </div>
            </Link>
        </section>
        </FadeIn>
    );
}
