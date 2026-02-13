'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { PageTransition } from '../../components/motion/PageTransition';
import { StaggerList, StaggerItem } from '../../components/motion/StaggerList';
import { slideRightVariants } from '../../lib/animations';
import { GlassCard } from '../../components/ui/GlassCard';
import { useEvents } from '@/lib/hooks/use-events';

const filters = ['All Events', 'Techno', 'House', 'Trance', 'Beach'];

const filterKeywords: Record<string, string[]> = {
    'Techno': ['techno'],
    'House': ['house'],
    'Trance': ['trance', 'psy', 'psytrance', 'goa'],
    'Beach': ['beach', 'sunset', 'bay'],
};

const FALLBACK_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAcyiHagYeLytG3El1EJoKbpWfYLLNDYCqEG6EEq25mxlx3uCLrkNsuVCjuD42WqtgYSSGsV3U1UQ6BIOEYAfXminjaBo4fHL8t_FHqVSVPq15wEUZxXSD87TTBI_ePTwVj2Uz2OYZjM9hSGBHq8CrQwO8CIcwCx1eRuVQIBj1B2ANudbDIZJqvsK-AiKSfkoGUdhEklkA0mIw3Ug0PRNYWbxl5RC6ztwJCyR2z2v_DWTxZ_S6dEf8sqNc0bTo7RWa-DdstAHV8OuM';

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

export default function EventsPage() {
    const router = useRouter();
    const [active, setActive] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const { events, loading } = useEvents();

    const filteredEvents = useMemo(() => {
        let result = events;

        // Filter by category
        const activeFilter = filters[active];
        if (activeFilter !== 'All Events') {
            const keywords = filterKeywords[activeFilter] ?? [];
            result = result.filter((event) => {
                const haystack = `${event.title} ${event.description} ${event.venue}`.toLowerCase();
                return keywords.some((keyword) => haystack.includes(keyword));
            });
        }

        // Filter by search query
        const query = searchQuery.trim().toLowerCase();
        if (query) {
            result = result.filter((event) => {
                return event.title.toLowerCase().includes(query);
            });
        }

        return result;
    }, [events, active, searchQuery]);

    return (
        <MobileLayout>
            <PageTransition variant={slideRightVariants}>
                <header className="py-4 flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary"
                        aria-label="Go back"
                    >
                        <span className="material-icons">arrow_back</span>
                    </button>
                    <div className="flex-1 relative">
                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xl">search</span>
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/40"
                        />
                    </div>
                </header>

                <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2 mb-6">
                    {filters.map((filter, index) => (
                        <button
                            key={filter}
                            onClick={() => setActive(index)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                                index === active
                                    ? 'bg-primary text-background-dark'
                                    : 'bg-white/5 border border-white/10 text-white/60'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-32">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse">
                                <GlassCard className="p-3 rounded-xl flex lg:flex-col gap-4 lg:gap-0 items-center lg:items-stretch">
                                    <div className="w-20 h-20 lg:w-full lg:h-48 rounded-lg bg-white/5 flex-shrink-0" />
                                    <div className="flex-grow space-y-2 lg:p-3">
                                        <div className="h-3 bg-white/5 rounded w-1/3" />
                                        <div className="h-5 bg-white/5 rounded w-3/4" />
                                        <div className="h-3 bg-white/5 rounded w-1/2" />
                                    </div>
                                </GlassCard>
                            </div>
                        ))}
                    </div>
                ) : (
                    <StaggerList className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-32">
                        {filteredEvents.map((event) => (
                            <StaggerItem key={event.id}>
                                <Link href={`/event-detail?slug=${event.slug}`} className="block group">
                                    <GlassCard className="p-3 rounded-xl flex lg:flex-col gap-4 lg:gap-0 items-center lg:items-stretch group-hover:bg-white/5 transition-colors">
                                        <div className="w-20 h-20 lg:w-full lg:h-48 rounded-lg overflow-hidden flex-shrink-0">
                                            <img className="w-full h-full object-cover" src={event.image_url || FALLBACK_IMAGE} alt={event.title} />
                                        </div>
                                        <div className="flex-grow lg:p-3">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${event.title.toLowerCase().includes('oxa') ? 'text-gold' : 'text-primary'}`}>
                                                {formatDate(event.date)}
                                            </span>
                                            <h4 className="font-bold text-base leading-tight">{event.title}</h4>
                                            <p className="text-white/50 text-[11px] mt-1 flex items-center gap-1">
                                                <span className="material-icons text-xs">location_on</span> {event.location}
                                            </p>
                                        </div>
                                        <div className="text-right lg:px-3 lg:pb-3 lg:flex lg:justify-between lg:items-center">
                                            <div className="text-xs text-white/40">{event.venue}</div>
                                        </div>
                                    </GlassCard>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerList>
                )}
            </PageTransition>
        </MobileLayout>
    );
}
