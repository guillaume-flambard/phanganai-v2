'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { BottomNav } from '../../components/navigation/BottomNav';
import { PageTransition } from '../../components/motion/PageTransition';
import { StaggerList, StaggerItem } from '../../components/motion/StaggerList';
import { AnimatedCounter } from '../../components/motion/AnimatedCounter';
import { AnimatedProgress } from '../../components/motion/AnimatedProgress';
import { haptics } from '../../lib/haptics';

export default function ProfilePage() {
    const router = useRouter();

    return (
        <MobileLayout>
            <PageTransition>
                {/* Header */}
                <header className="pt-6 pb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-primary to-gold">
                                <img
                                    alt="User Profile"
                                    className="w-full h-full rounded-full object-cover border-2 border-background-dark"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ6cXBN2W08Wkj2lzjwyh7osbQL-VdV_v4be1LwYJcN3CsU0eBnUVKCFDj0Qbcum5g2BvR9FacRgpfy1MX6-9E56l1EA7V2Lqi4UixdCf5b08gPPMN45j3RF3voP-5LpnoVTe8FxjxLgOjh1JWOwmGgIlreCkCjhZyK-iw2qeutDJtCzO9XoDEOwLDTtZmAkK9MtvrwENneB9HwUqW5hYdHRSJ6Esi7Qox-rFZ-2im5TJLjRPSR5PFRNB_umi5XTF94pg0dalDYZ8"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-gold text-background-dark text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                VIP
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Alex Rivera</h1>
                            <p className="text-primary text-sm font-medium flex items-center gap-1">
                                Full Moon Resident
                                <span className="material-icons text-gold text-sm">verified</span>
                            </p>
                        </div>
                    </div>
                    <Link href="/notifications" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md" aria-label="Notifications">
                        <span className="material-icons text-white">notifications_none</span>
                    </Link>
                </header>

                <main className="flex-1 space-y-6 pb-32">
                    {/* Loyalty Progress Card */}
                    <section className="bg-surface-dark rounded-xl p-6 border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16" />
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">Loyalty Points</p>
                                <h2 className="text-3xl font-bold"><AnimatedCounter target={2450} /> <span className="text-sm font-normal text-white/40">pts</span></h2>
                            </div>
                            <div className="bg-gold/10 px-3 py-1 rounded-full flex items-center gap-1 border border-gold/20">
                                <span className="material-icons text-gold text-sm">workspace_premium</span>
                                <span className="text-gold text-xs font-bold uppercase tracking-wider">Gold Tier</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/70">Next: <span className="text-white font-medium">Free Drink</span></span>
                                <span className="text-primary font-bold">75%</span>
                            </div>
                            <AnimatedProgress
                                progress={75}
                                className="h-3 bg-white/10 rounded-full overflow-hidden"
                                barClassName="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(19,236,91,0.4)]"
                            />
                            <p className="text-[11px] text-white/40 text-center pt-2 italic">Spend 550 more points for a VIP Upgrade</p>
                        </div>
                    </section>

                    {/* Gift a Ticket CTA */}
                    <section
                        onClick={() => { toast('Coming soon!'); haptics.impact('light'); }}
                        className="bg-primary rounded-xl p-5 flex items-center justify-between group cursor-pointer shadow-lg shadow-primary/10 active:scale-[0.98] transition-transform"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-background-dark/20 flex items-center justify-center">
                                <span className="material-icons text-background-dark text-2xl">card_giftcard</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-background-dark">Gift a Ticket</h3>
                                <p className="text-background-dark/70 text-xs">Share the vibe with your tribe</p>
                            </div>
                        </div>
                        <span className="material-icons text-background-dark/40 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </section>

                    {/* Account Management Menu */}
                    <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2 mb-3">Account Management</h4>

                        <StaggerList className="space-y-2">
                            <StaggerItem>
                                <Link href="/ticket" className="flex items-center justify-between p-4 bg-white/5 rounded-xl active:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <span className="material-icons text-primary">confirmation_number</span>
                                        </div>
                                        <span className="font-medium">My Tickets</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="bg-primary text-background-dark text-[10px] font-black px-1.5 py-0.5 rounded-md">2 NEW</span>
                                        <span className="material-icons text-white/20">chevron_right</span>
                                    </div>
                                </Link>
                            </StaggerItem>

                            <StaggerItem>
                                <Link href="/transactions" className="flex items-center justify-between p-4 bg-white/5 rounded-xl active:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                            <span className="material-icons text-white/60">history</span>
                                        </div>
                                        <span className="font-medium text-white/80">Transaction History</span>
                                    </div>
                                    <span className="material-icons text-white/20">chevron_right</span>
                                </Link>
                            </StaggerItem>

                            <StaggerItem>
                                <Link href="/payment-methods" className="flex items-center justify-between p-4 bg-white/5 rounded-xl active:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                            <span className="material-icons text-white/60">account_balance_wallet</span>
                                        </div>
                                        <span className="font-medium text-white/80">Payment Methods</span>
                                    </div>
                                    <span className="material-icons text-white/20">chevron_right</span>
                                </Link>
                            </StaggerItem>

                            <StaggerItem>
                                <Link href="/settings" className="flex items-center justify-between p-4 bg-white/5 rounded-xl active:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                            <span className="material-icons text-white/60">settings</span>
                                        </div>
                                        <span className="font-medium text-white/80">Settings</span>
                                    </div>
                                    <span className="material-icons text-white/20">chevron_right</span>
                                </Link>
                            </StaggerItem>
                        </StaggerList>
                    </div>

                    {/* Log Out */}
                    <button
                        onClick={() => { toast('Logged out'); haptics.impact('light'); router.push('/'); }}
                        className="w-full py-4 text-red-400 font-medium text-sm flex items-center justify-center gap-2"
                    >
                        <span className="material-icons text-sm">logout</span>
                        Log Out
                    </button>
                </main>
            </PageTransition>

            <BottomNav />
        </MobileLayout>
    );
}
