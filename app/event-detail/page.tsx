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
                <EventHero />

                <div className="px-6 py-8 space-y-8">
                    <EventMeta />
                    <EventLineup />
                    <FadeIn><EventPricing /></FadeIn>
                    <FadeIn><EventAbout /></FadeIn>
                    <FadeIn><EventMap /></FadeIn>
                </div>
            </PageTransition>

            <EventFooter />
        </MobileLayout>
    );
}
