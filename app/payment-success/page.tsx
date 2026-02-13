'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { PageTransition } from '../../components/motion/PageTransition';
import { StaggerList, StaggerItem } from '../../components/motion/StaggerList';
import { scaleIn } from '../../lib/animations';
import { AnimatedCounter } from '../../components/motion/AnimatedCounter';
import { AnimatedProgress } from '../../components/motion/AnimatedProgress';
import { haptics } from '../../lib/haptics';
import { useProfile } from '@/lib/hooks/use-profile';

const tierConfig: Record<string, string> = {
    bronze: 'Bronze', silver: 'Silver', gold: 'Gold', vip: 'VIP',
};

export default function PaymentSuccessPage() {
    const { profile } = useProfile();
    const tierLabel = tierConfig[profile?.tier ?? 'bronze'] ?? 'Bronze';
    const points = profile?.loyalty_points ?? 0;

    useEffect(() => {
        haptics.notification('success');
    }, []);

    return (
        <AuthGuard>
        <MobileLayout className="pb-8 lg:pb-8">
            <PageTransition variant={scaleIn}>
                <StaggerList className="flex flex-col lg:max-w-xl lg:mx-auto">
                    {/* Success Header */}
                    <StaggerItem>
                        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pt-8">
                            <div className="relative mb-8">
                                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary" style={{ filter: 'drop-shadow(0 0 12px rgba(19, 236, 91, 0.6))' }}>
                                    <span className="material-icons text-primary text-5xl">check</span>
                                </div>
                                <div className="absolute inset-0 rounded-full border-2 border-primary/30 scale-125" />
                                <div className="absolute inset-0 rounded-full border border-primary/10 scale-150" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">Payment Successful!</h1>
                            <p className="text-primary/80 font-medium text-lg">Transaction Complete</p>
                        </div>
                    </StaggerItem>

                    {/* Transaction Details */}
                    <StaggerItem>
                        <div className="px-6 mb-8 mt-8">
                            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 backdrop-blur-md">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-white/50 text-sm uppercase tracking-wider">Status</span>
                                    <span className="text-white/50 text-sm uppercase tracking-wider">Date</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-2xl font-bold text-primary">Confirmed</div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                                        <div className="text-xs text-primary/60">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </StaggerItem>

                    {/* Loyalty Rewards */}
                    <StaggerItem>
                        <div className="px-6 mb-12">
                            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl p-6 relative overflow-hidden">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="material-icons text-primary text-xl">star</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Loyalty Points: <AnimatedCounter target={points} duration={1} /></h3>
                                        <p className="text-sm text-white/50">Nightlife Loyalty Tier: {tierLabel}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {(() => {
                                        const nextTier = profile?.tier === 'bronze' ? 100 : profile?.tier === 'silver' ? 500 : profile?.tier === 'gold' ? 2000 : 5000;
                                        const progress = Math.min(100, Math.round((points / nextTier) * 100));
                                        return (
                                            <>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium">Progress to Next Tier</span>
                                                    <span className="text-primary font-bold">{points} / {nextTier}</span>
                                                </div>
                                                <AnimatedProgress
                                                    progress={progress}
                                                    className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5"
                                                    barClassName="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full"
                                                />
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </StaggerItem>

                    {/* Actions */}
                    <StaggerItem>
                        <div className="px-6 pb-12">
                            <Link href="/wallet" className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-5 rounded-full text-lg neon-glow flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                                Back to Wallet
                                <span className="material-icons text-xl">account_balance_wallet</span>
                            </Link>
                            <Link href="/transactions" className="w-full mt-4 text-white/50 hover:text-white font-medium py-2 transition-colors block text-center">
                                View Receipt
                            </Link>
                        </div>
                    </StaggerItem>
                </StaggerList>
            </PageTransition>
        </MobileLayout>
        </AuthGuard>
    );
}
