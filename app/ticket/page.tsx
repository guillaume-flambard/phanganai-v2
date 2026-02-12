'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { BottomNav } from '../../components/navigation/BottomNav';
import { ChevronLeft, Share, Sun } from 'lucide-react';

export default function TicketPage() {
    const [maxBrightness, setMaxBrightness] = useState(false);

    return (
        <MobileLayout>
            {/* Header */}
            <header className="px-6 py-4 flex justify-between items-center">
                <Link href="/profile" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-sm font-bold tracking-widest text-primary uppercase">My Ticket</h1>
                <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Share className="w-5 h-5" />
                </button>
            </header>

            <main className="flex-1 flex flex-col items-center px-6 pb-32">
                {/* Event Info */}
                <div className="text-center mt-4 mb-8">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">OXA - Jungle Experience</h2>
                    <div className="flex items-center justify-center gap-2 text-primary/80">
                        <span className="text-sm font-medium">Friday, Oct 27 &bull; 21:00 PM</span>
                    </div>
                </div>

                {/* Ticket Status Badge */}
                <div className="mb-6">
                    <div className="bg-primary text-background-dark px-6 py-1.5 rounded-full flex items-center gap-2 font-bold text-xs tracking-tighter uppercase neon-glow">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background-dark opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-background-dark" />
                        </span>
                        Active &amp; Valid
                    </div>
                </div>

                {/* QR Code */}
                <div className="relative group">
                    <div className="absolute -inset-1.5 bg-primary/30 rounded-[2.5rem] blur-sm group-hover:bg-primary/50 transition-all duration-500" />
                    <div className={`relative bg-white p-8 rounded-xl shadow-2xl flex items-center justify-center aspect-square w-full max-w-[280px] transition-all ${maxBrightness ? 'brightness-125 shadow-[0_0_40px_rgba(255,255,255,0.3)]' : ''}`}>
                        <img
                            alt="Entry QR Code"
                            className="w-full h-full object-contain mix-blend-multiply"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnv5Wxv-eu8pcER6mgPeTN0RH5gFu6dHIoPKtSJmFOPnYemfifjy15grqPgUsa5Xqd_33eMQ-YhTmHezBZAU9P6l-jxwINHEY-_OuxkbE6q5b-WQRiUnIhNUEovIfhPEtuMfAdsucXQIwYHXbA7oTZgeZ--JNd6WYKdKG_vytWgL1deXIOgPLL_FTjx9sxwttKklLOBfw8dT4NQgcx0K2r-UtltEUPQMz56HqdrhKDcFm8Ittpli582rirJjwjVfzkU1vfAon23Ic"
                        />
                        {/* Corner Decorations */}
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/20" />
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/20" />
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/20" />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/20" />
                    </div>
                </div>

                {/* Ticket Metadata */}
                <div className="mt-8 w-full bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Ticket Type</p>
                            <p className="font-bold text-lg text-primary">VIP Early Bird</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Holder</p>
                            <p className="font-bold text-lg">Alex Rivera</p>
                        </div>
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Entrance</p>
                            <p className="font-medium">Main Jungle Gate</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">ID Required</p>
                            <p className="font-medium text-amber-400">Yes</p>
                        </div>
                    </div>
                </div>

                {/* Brightness Toggle */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <button
                        onClick={() => setMaxBrightness(!maxBrightness)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-full transition-colors ${maxBrightness ? 'bg-primary/20 border border-primary/30 text-primary' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        <Sun className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold">Max Screen Brightness</span>
                    </button>
                    <p className="text-xs text-white/40 max-w-[200px] text-center italic">
                        Scanning works best at full brightness in dark environments.
                    </p>
                </div>
            </main>

            <BottomNav />
        </MobileLayout>
    );
}
