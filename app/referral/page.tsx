'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { ChevronLeft, HelpCircle, Copy, Share, Users, Check } from 'lucide-react';

export default function ReferralPage() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText('ISLANDVIBE88');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <MobileLayout className="pb-0">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
                >
                    <ChevronLeft className="w-5 h-5 text-primary" />
                </button>
                <h1 className="text-lg font-bold tracking-tight uppercase">Referral</h1>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <HelpCircle className="w-5 h-5 text-primary" />
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
                        <button onClick={copyCode} className="flex items-center gap-1 text-xs font-bold uppercase text-primary">
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>
                    <button className="bg-primary text-background-dark w-14 h-14 rounded-full flex items-center justify-center neon-glow transition-transform active:scale-95">
                        <Share className="w-5 h-5" />
                    </button>
                </div>
                {copied && (
                    <p className="text-center text-xs text-primary mt-2 animate-in fade-in">Copied to clipboard!</p>
                )}
            </div>

            {/* Rewards Footer */}
            <div className="mt-auto bg-background-dark/80 backdrop-blur-xl border-t border-white/5 p-6 rounded-t-lg shadow-[0_0_20px_rgba(19,236,91,0.15)]">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Rewards Earned</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-primary italic">฿1,250</span>
                            <span className="text-xs text-white/30">.00</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Friends Joined</p>
                        <div className="flex items-center justify-end gap-1">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-xl font-bold">25</span>
                        </div>
                    </div>
                </div>
                <button className="w-full bg-primary/10 border border-primary/20 text-primary font-bold uppercase py-4 rounded-full mt-6 tracking-widest text-sm hover:bg-primary hover:text-background-dark transition-all active:scale-[0.98]">
                    View History
                </button>
            </div>
        </MobileLayout>
    );
}
