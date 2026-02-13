'use client';

import React, { Suspense } from 'react';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { CheckoutHeader } from '../../components/features/checkout/CheckoutHeader';
import { OrderSummary } from '../../components/features/checkout/OrderSummary';
import { PaymentMethods } from '../../components/features/checkout/PaymentMethods';
import { PaymentButton } from '../../components/features/checkout/PaymentButton';
import { PageTransition } from '../../components/motion/PageTransition';
import { slideRightVariants } from '../../lib/animations';

export default function CheckoutPage() {
    return (
        <AuthGuard>
            <MobileLayout className="pb-32">
            <PageTransition variant={slideRightVariants}>
                <CheckoutHeader />

                <div className="flex-1 overflow-y-auto px-6 pb-32 lg:grid lg:grid-cols-2 lg:gap-8 lg:pb-8">
                    {/* Hero Image / Event Card */}
                    <div className="relative w-full h-32 lg:h-64 rounded-lg overflow-hidden mb-6 mt-2 border border-primary/10 lg:col-span-2">
                        <img
                            className="w-full h-full object-cover opacity-60"
                            alt="Event details"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtbG7BW0H8P0D8Iwv0n7yHgz_XMeHRcaFaP4bNHgpLVC3JefpEzPNaYys1VqeAT7PYTTjsw5z5Yq7jE46mEHMe2AtkI6zlYiSXSSdVrEgSaM2mgJRwpheOc8Ah4JduQWjaDxx1pYHGfy4-PFgzL-n7U7kuVVIMqvM-8be6xIkN21Krzs7y72RBmtZL-5U_hyh-T3uYHVgOwVc6P2Jm7Yd0QHws6v8y5fYI62QzJzBswe-tRMyHzWWrJ5jafWV4_7LYiQCXdlAtUWk"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                            <span className="bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mb-1 inline-block">Featured Event</span>
                            <h2 className="text-lg font-bold">OXA</h2>
                        </div>
                    </div>

                    <OrderSummary />
                    <PaymentMethods />
                </div>
            </PageTransition>

            <Suspense fallback={null}>
                <PaymentButton />
            </Suspense>
            </MobileLayout>
        </AuthGuard>
    );
}
