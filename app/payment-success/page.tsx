'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { PageTransition } from '../../components/motion/PageTransition';
import { StaggerList, StaggerItem } from '../../components/motion/StaggerList';
import { scaleIn } from '../../lib/animations';
import { AnimatedCounter } from '../../components/motion/AnimatedCounter';
import { AnimatedProgress } from '../../components/motion/AnimatedProgress';
import { haptics } from '../../lib/haptics';

export default function PaymentSuccessPage() {
    useEffect(() => {
        haptics.notification('success');
    }, []);

    return (
        <MobileLayout className="pb-8">
            <PageTransition variant={scaleIn}>
                <StaggerList className="flex flex-col">
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
                                    <span className="text-white/50 text-sm uppercase tracking-wider">Total Spent</span>
                                    <span className="text-white/50 text-sm uppercase tracking-wider">Venue</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-3xl font-bold">฿250.00</div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold">OXA Bar</div>
                                        <div className="text-xs text-primary/60">Baan Tai, Koh Phangan</div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-primary/10 flex justify-between text-xs text-white/40">
                                    <span>Ref: #PAI-9921-X</span>
                                    <span>Oct 24, 2023 &bull; 23:14</span>
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
                                        <h3 className="font-bold">+<AnimatedCounter target={25} duration={1} /> Points Earned!</h3>
                                        <p className="text-sm text-white/50">Nightlife Loyalty Tier: Silver</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">Progress to Reward</span>
                                        <span className="text-primary font-bold">175 / 200</span>
                                    </div>
                                    <AnimatedProgress
                                        progress={87.5}
                                        className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5"
                                        barClassName="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full"
                                    />
                                    <div className="flex items-center gap-2 pt-2 text-sm">
                                        <span className="material-icons text-yellow-500 text-base">celebration</span>
                                        <span className="text-white/70">Only <span className="font-bold text-white">25 points</span> more for a <span className="text-primary italic">Free Drink!</span></span>
                                    </div>
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
    );
}
