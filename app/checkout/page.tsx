'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { CheckoutHeader } from '../../components/features/checkout/CheckoutHeader';
import { OrderSummary } from '../../components/features/checkout/OrderSummary';
import { PaymentMethods } from '../../components/features/checkout/PaymentMethods';
import { PaymentButton } from '../../components/features/checkout/PaymentButton';
import { PageTransition } from '../../components/motion/PageTransition';
import { slideRightVariants } from '../../lib/animations';
import { useEvent } from '@/lib/hooks/use-events';

const FALLBACK_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAcyiHagYeLytG3El1EJoKbpWfYLLNDYCqEG6EEq25mxlx3uCLrkNsuVCjuD42WqtgYSSGsV3U1UQ6BIOEYAfXminjaBo4fHL8t_FHqVSVPq15wEUZxXSD87TTBI_ePTwVj2Uz2OYZjM9hSGBHq8CrQwO8CIcwCx1eRuVQIBj1B2ANudbDIZJqvsK-AiKSfkoGUdhEklkA0mIw3Ug0PRNYWbxl5RC6ztwJCyR2z2v_DWTxZ_S6dEf8sqNc0bTo7RWa-DdstAHV8OuM';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug') || '';
    const { event, tiers, loading } = useEvent(slug);

    const firstTier = tiers[0];

    return (
        <AuthGuard>
            <MobileLayout className="pb-32">
            <PageTransition variant={slideRightVariants}>
                <CheckoutHeader />

                <div className="flex-1 overflow-y-auto px-6 pb-32 lg:grid lg:grid-cols-2 lg:gap-8 lg:pb-8">
                    {/* Hero Image / Event Card */}
                    <div className="relative w-full h-32 lg:h-64 rounded-lg overflow-hidden mb-6 mt-2 border border-primary/10 lg:col-span-2">
                        {loading ? (
                            <div className="w-full h-full bg-white/5 animate-pulse" />
                        ) : (
                            <>
                                <img
                                    className="w-full h-full object-cover opacity-60"
                                    alt={event?.title ?? 'Event'}
                                    src={event?.image_url || FALLBACK_IMAGE}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent" />
                                <div className="absolute bottom-3 left-3">
                                    {event?.is_featured && (
                                        <span className="bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mb-1 inline-block">Featured</span>
                                    )}
                                    <h2 className="text-lg font-bold">{event?.title ?? 'Event'}</h2>
                                </div>
                            </>
                        )}
                    </div>

                    <OrderSummary tier={firstTier} />
                    <PaymentMethods />
                </div>
            </PageTransition>

            <Suspense fallback={null}>
                <PaymentButton eventId={event?.id} tierId={firstTier?.id} />
            </Suspense>
            </MobileLayout>
        </AuthGuard>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <MobileLayout className="pb-32">
                <div className="animate-pulse space-y-4 px-6 pt-16">
                    <div className="h-32 bg-white/5 rounded-lg" />
                    <div className="h-40 bg-white/5 rounded-lg" />
                </div>
            </MobileLayout>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
