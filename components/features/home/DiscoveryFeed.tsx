'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '../../ui/GlassCard';
import { StaggerList, StaggerItem } from '../../motion/StaggerList';
import { useEvents } from '@/lib/hooks/use-events';

const FALLBACK_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAcyiHagYeLytG3El1EJoKbpWfYLLNDYCqEG6EEq25mxlx3uCLrkNsuVCjuD42WqtgYSSGsV3U1UQ6BIOEYAfXminjaBo4fHL8t_FHqVSVPq15wEUZxXSD87TTBI_ePTwVj2Uz2OYZjM9hSGBHq8CrQwO8CIcwCx1eRuVQIBj1B2ANudbDIZJqvsK-AiKSfkoGUdhEklkA0mIw3Ug0PRNYWbxl5RC6ztwJCyR2z2v_DWTxZ_S6dEf8sqNc0bTo7RWa-DdstAHV8OuM';

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

export function DiscoveryFeed() {
    const { events, loading } = useEvents();

    if (loading) {
        return (
            <section className="px-6 lg:px-0 pb-32 lg:pb-8">
                <h2 className="text-lg font-bold tracking-tight mb-4">Discovery Feed</h2>
                <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                            <GlassCard className="p-3 rounded-xl flex gap-4 items-center">
                                <div className="w-20 h-20 rounded-lg bg-white/5 flex-shrink-0" />
                                <div className="flex-grow space-y-2">
                                    <div className="h-3 bg-white/5 rounded w-1/3" />
                                    <div className="h-5 bg-white/5 rounded w-3/4" />
                                    <div className="h-3 bg-white/5 rounded w-1/2" />
                                </div>
                            </GlassCard>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="px-6 lg:px-0 pb-32 lg:pb-8">
            <h2 className="text-lg font-bold tracking-tight mb-4">Discovery Feed</h2>
            <StaggerList className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                {events.map((event) => (
                    <StaggerItem key={event.id}>
                    <Link href={`/event-detail?slug=${event.slug}`} className="block group">
                        <GlassCard className="p-3 rounded-xl flex gap-4 items-center group-hover:bg-white/5 transition-colors">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <img className="w-full h-full object-cover" src={event.image_url || FALLBACK_IMAGE} alt={event.title} />
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${event.title.toLowerCase().includes('oxa') ? 'text-gold' : 'text-primary'}`}>
                                        {formatDate(event.date)}
                                    </span>
                                    <span className="material-icons text-white/30 text-base">bookmark_border</span>
                                </div>
                                <h4 className="font-bold text-base leading-tight">{event.title}</h4>
                                <p className="text-white/50 text-[11px] mt-1 flex items-center gap-1">
                                    <span className="material-icons text-xs">location_on</span> {event.location}
                                </p>
                            </div>

                            <div className="text-right">
                                <div className="text-xs text-white/40">{event.venue}</div>
                            </div>
                        </GlassCard>
                    </Link>
                    </StaggerItem>
                ))}
            </StaggerList>
        </section>
    );
}
