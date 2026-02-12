'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { PageTransition } from '../../components/motion/PageTransition';
import { slideRightVariants } from '../../lib/animations';
import { AnimatedCounter } from '../../components/motion/AnimatedCounter';
import { share } from '../../lib/share';
import { haptics } from '../../lib/haptics';

export default function ReferralPage() {
    const router = useRouter();

    const copyCode = () => {
        navigator.clipboard.writeText('ISLANDVIBE88');
        toast.success('Code copied!');
        haptics.impact('light');
    };

    return (
        <MobileLayout className="pb-0">
            <PageTransition variant={slideRightVariants}>
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
                        aria-label="Go back"
                    >
                        <span className="material-icons text-primary text-xl">chevron_left</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight uppercase">Referral</h1>
                    <button
                        onClick={() => toast('Help center coming soon')}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
                        aria-label="Help"
                    >
                        <span className="material-icons text-primary text-xl">help_outline</span>
                    </button>
                </div>

                {/* Hero */}
                <div className="relative px-6 pt-6 overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-primary/20 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-bold leading-none mb-4">
                            Party Together, <br />
                            <span className="text-primary italic">Earn Together!</span>
                        </h2>
                        <div className="relative w-full aspect-square max-w-[280px] mx-auto my-6">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                            <img
                                alt="Friends clinking glasses"
                                className="w-full h-full object-cover rounded-full border-4 border-primary/30 relative z-10"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6ent5fdilAtipJ2q1smf5q80pkToHLzZjeQHieZ-UQcj4JtMtbCujTebjF6F3dS37bqc5WwVoix0PcdtTESag4j0jnwjCYEobgVMvR6FSz5gZX2ooUUyXwse6KAdSMWEwg0iD1yaMeXGcwFWMsD6FfmaXwa9YR4eMfcFj7arTJXsBJtoRt0DDTeFnWItdUOCnrJfWij2P1Df9YH9avj7TvB6EdnFoWuY2HiNewKd5CNPWqjrbZge6OZo4RRblOZp4X0e-X3rh29k"
                            />
                        </div>
                    </div>
                </div>

                {/* Offer */}
                <div className="px-6 mb-8">
                    <div className="glass-card rounded-lg p-6 text-center">
                        <p className="text-white/50 text-sm mb-2 uppercase tracking-widest font-medium">Limited Time Offer</p>
                        <p className="text-xl leading-relaxed">
                            Invite a friend to <span className="text-primary font-bold tracking-tight">PhanganAI</span> and you both get{' '}
                            <span className="text-primary font-bold text-2xl">฿50</span> when they make their first top-up.
                        </p>
                    </div>
                </div>

                {/* Referral Code */}
                <div className="px-6 mb-8">
                    <label className="block text-xs font-semibold uppercase text-white/40 mb-3 ml-2 tracking-widest">Your Unique Code</label>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/5 border border-primary/30 rounded-full py-4 px-6 flex justify-between items-center">
                            <span className="text-xl font-bold tracking-widest text-primary">ISLANDVIBE88</span>
                            <button onClick={copyCode} className="flex items-center gap-1 text-xs font-bold uppercase text-primary" aria-label="Copy referral code">
                                <span className="material-icons text-xl">content_copy</span>
                            </button>
                        </div>
                        <button
                            onClick={() => share({ title: 'Join PhanganAI', text: 'Use my referral code ISLANDVIBE88!', url: 'https://phanganai.app/referral' })}
                            className="bg-primary text-background-dark w-14 h-14 rounded-full flex items-center justify-center neon-glow transition-transform active:scale-95"
                            aria-label="Share referral code"
                        >
                            <span className="material-icons text-xl">share</span>
                        </button>
                    </div>
                </div>

                {/* Rewards Footer */}
                <div className="mt-auto bg-background-dark/80 backdrop-blur-xl border-t border-white/5 p-6 rounded-t-lg shadow-[0_0_20px_rgba(19,236,91,0.15)]">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Rewards Earned</p>
                            <div className="flex items-baseline gap-1">
                                <AnimatedCounter target={1250} prefix="฿" className="text-3xl font-bold text-primary italic" />
                                <span className="text-xs text-white/30">.00</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Friends Joined</p>
                            <div className="flex items-center justify-end gap-1">
                                <span className="material-icons text-primary text-base">group</span>
                                <span className="text-xl font-bold">25</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/transactions" className="w-full bg-primary/10 border border-primary/20 text-primary font-bold uppercase py-4 rounded-full mt-6 tracking-widest text-sm hover:bg-primary hover:text-background-dark transition-all active:scale-[0.98] block text-center">
                        View History
                    </Link>
                </div>
            </PageTransition>
        </MobileLayout>
    );
}
