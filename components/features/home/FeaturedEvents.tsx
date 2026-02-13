'use client';

import React from 'react';
import Link from 'next/link';
import { StaggerList, StaggerItem } from '../../motion/StaggerList';
import { useEvents } from '@/lib/hooks/use-events';

const FALLBACK_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCx2ThiJrZWGAiAss6mLXXqmH5mYK_1pWma6dBHnjNOSrOWyCx-4Br4dUpGDTso3zTfkGdKGg1ZrCGHwHGdHAUgZgjAS_77ZdeyzS4REnwwRNyBRilbl9wKoxcyQf-RKpTSN8c3mm9oJIO3MTo4sRkl0JjKtNR91dNA_JCpgJR31KauqqR5BfMVpTC96B8zHlngjTtqZDbFpIOFthQo2-RiBnJikPijECOz_CLJbtP3ARZFYB-Qsg2di-G9jjVE1PsmMDJDxau-RWw';

function computeBadge(dateStr: string): string {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDay = new Date(eventDate);
    eventDay.setHours(0, 0, 0, 0);

    const diffMs = eventDay.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Tonight';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) {
        return eventDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    }
    return eventDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }).toUpperCase();
}

export function FeaturedEvents() {
    const { events, loading } = useEvents({ featured: true });

    if (loading) {
        return (
            <section className="mb-10">
                <div className="flex justify-between items-end mb-5">
                    <h3 className="text-xl font-bold tracking-tight">FEATURED RAVES</h3>
                    <Link className="text-primary text-xs font-bold uppercase tracking-widest border-b border-primary/30 pb-0.5" href="/events">View All</Link>
                </div>
                <div className="flex gap-5 overflow-x-auto pb-6 -mx-5 px-5 hide-scrollbar lg:mx-0 lg:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible">
                    {[1, 2].map((i) => (
                        <div key={i} className="min-w-[280px] lg:min-w-0 animate-pulse">
                            <div className="glass-card rounded-xl overflow-hidden">
                                <div className="h-44 bg-white/5" />
                                <div className="p-4 space-y-3">
                                    <div className="h-5 bg-white/5 rounded w-3/4" />
                                    <div className="h-3 bg-white/5 rounded w-1/2" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="mb-10">
            <div className="flex justify-between items-end mb-5">
                <h3 className="text-xl font-bold tracking-tight">FEATURED RAVES</h3>
                <Link className="text-primary text-xs font-bold uppercase tracking-widest border-b border-primary/30 pb-0.5" href="/events">View All</Link>
            </div>

            <StaggerList className="flex gap-5 overflow-x-auto pb-6 -mx-5 px-5 hide-scrollbar lg:mx-0 lg:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible">
                {events.map((event) => (
                    <StaggerItem key={event.id}>
                    <Link href={`/event-detail?slug=${event.slug}`} className="min-w-[280px] lg:min-w-0 relative group block">
                        <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="glass-card rounded-xl overflow-hidden relative">
                            <div className="h-44 w-full relative">
                                <img alt={event.title} className="w-full h-full object-cover" src={event.image_url || FALLBACK_IMAGE} />
                                <div className="absolute top-3 right-3 bg-background-dark/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold border border-white/10 uppercase">
                                    {computeBadge(event.date)}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent" />
                            </div>
                            <div className="p-4 pt-0 -mt-6 relative z-10">
                                <h4 className="text-lg font-bold text-white mb-1">{event.title}</h4>
                                <p className="text-xs text-white/60 flex items-center gap-1 mb-4">
                                    <span className="material-icons text-[14px] text-primary">location_on</span> {event.location}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-primary font-bold text-sm">{event.venue}</span>
                                    <span className="bg-primary text-background-dark text-[10px] font-black uppercase px-4 py-2 rounded-lg neon-glow">
                                        Book Spot
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    </StaggerItem>
                ))}
            </StaggerList>
        </section>
    );
}
