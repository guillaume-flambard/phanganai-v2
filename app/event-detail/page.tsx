'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { EventHero } from '../../components/features/event-detail/EventHero';
import { EventMeta } from '../../components/features/event-detail/EventMeta';
import { EventLineup } from '../../components/features/event-detail/EventLineup';
import { EventPricing } from '../../components/features/event-detail/EventPricing';
import { EventAbout } from '../../components/features/event-detail/EventAbout';
import { EventMap } from '../../components/features/event-detail/EventMap';
import { EventFooter } from '../../components/features/event-detail/EventFooter';
import { PageTransition } from '../../components/motion/PageTransition';
import { FadeIn } from '../../components/motion/FadeIn';
import { slideRightVariants } from '../../lib/animations';
import { useEvent } from '@/lib/hooks/use-events';

function EventDetailContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug') || 'oxa-jungle-party';
    const { event, artists, tiers, loading } = useEvent(slug);

    if (loading) {
        return (
            <MobileLayout className="pb-32">
                <div className="animate-pulse space-y-6">
                    <div className="h-[500px] bg-white/5 rounded-2xl" />
                    <div className="px-6 space-y-4">
                        <div className="h-8 bg-white/5 rounded w-3/4" />
                        <div className="h-4 bg-white/5 rounded w-1/2" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-16 bg-white/5 rounded-xl" />
                            <div className="h-16 bg-white/5 rounded-xl" />
                        </div>
                        <div className="h-24 bg-white/5 rounded-xl" />
                        <div className="h-32 bg-white/5 rounded-xl" />
                    </div>
                </div>
            </MobileLayout>
        );
    }

    if (!event) {
        return (
            <MobileLayout className="pb-32">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                    <span className="material-icons text-6xl text-white/20 mb-4">event_busy</span>
                    <h2 className="text-xl font-bold mb-2">Event Not Found</h2>
                    <p className="text-white/50 text-sm">This event may have been removed or the link is incorrect.</p>
                </div>
            </MobileLayout>
        );
    }

    return (
        <MobileLayout className="pb-32">
            <PageTransition variant={slideRightVariants}>
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Left: Hero + About */}
                    <div className="lg:col-span-7">
                        <EventHero event={event} />
                        <div className="px-6 pt-4 pb-8 space-y-8 lg:px-0">
                            <EventLineup artists={artists} />
                            <FadeIn><EventAbout event={event} /></FadeIn>
                            <FadeIn><EventMap event={event} /></FadeIn>
                        </div>
                    </div>
                    {/* Right: Meta + Pricing (sticky on desktop) */}
                    <div className="lg:col-span-5 px-6 lg:px-0 lg:pt-8">
                        <div className="lg:sticky lg:top-8 space-y-8">
                            <EventMeta event={event} />
                            <FadeIn><EventPricing tiers={tiers} /></FadeIn>
                            <div className="hidden lg:block">
                                <EventFooter event={event} />
                            </div>
                        </div>
                    </div>
                </div>
            </PageTransition>

            <div className="lg:hidden">
                <EventFooter event={event} />
            </div>
        </MobileLayout>
    );
}

export default function EventDetailPage() {
    return (
        <Suspense fallback={
            <MobileLayout className="pb-32">
                <div className="animate-pulse space-y-6">
                    <div className="h-[500px] bg-white/5 rounded-2xl" />
                    <div className="px-6 space-y-4">
                        <div className="h-8 bg-white/5 rounded w-3/4" />
                        <div className="h-4 bg-white/5 rounded w-1/2" />
                    </div>
                </div>
            </MobileLayout>
        }>
            <EventDetailContent />
        </Suspense>
    );
}
