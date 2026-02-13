import React from 'react';
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

export default function EventDetailPage() {
    return (
        <MobileLayout className="pb-32">
            <PageTransition variant={slideRightVariants}>
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Left: Hero + About */}
                    <div className="lg:col-span-7">
                        <EventHero />
                        <div className="px-6 pt-4 pb-8 space-y-8 lg:px-0">
                            <EventLineup />
                            <FadeIn><EventAbout /></FadeIn>
                            <FadeIn><EventMap /></FadeIn>
                        </div>
                    </div>
                    {/* Right: Meta + Pricing (sticky on desktop) */}
                    <div className="lg:col-span-5 px-6 lg:px-0 lg:pt-8">
                        <div className="lg:sticky lg:top-8 space-y-8">
                            <EventMeta />
                            <FadeIn><EventPricing /></FadeIn>
                            <div className="hidden lg:block">
                                <EventFooter />
                            </div>
                        </div>
                    </div>
                </div>
            </PageTransition>

            <div className="lg:hidden">
                <EventFooter />
            </div>
        </MobileLayout>
    );
}
