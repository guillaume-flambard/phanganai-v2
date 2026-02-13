'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { BottomNav } from '../../components/navigation/BottomNav';
import { PageTransition } from '../../components/motion/PageTransition';
import { share } from '../../lib/share';
import { haptics } from '../../lib/haptics';
import { useTickets } from '@/lib/hooks/use-tickets';
import { useProfile } from '@/lib/hooks/use-profile';

export default function TicketPage() {
    const [maxBrightness, setMaxBrightness] = useState(false);
    const { tickets, loading } = useTickets();
    const { profile } = useProfile();

    const ticket = tickets[0] ?? null;

    if (loading) {
        return (
            <AuthGuard>
                <MobileLayout>
                <PageTransition>
                    <header className="py-4 flex justify-between items-center">
                        <Link href="/profile" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary" aria-label="Back to profile">
                            <span className="material-icons">arrow_back</span>
                        </Link>
                        <h1 className="text-sm font-bold tracking-widest text-primary uppercase">My Ticket</h1>
                        <div className="w-10 h-10" />
                    </header>
                    <main className="flex-1 flex flex-col items-center pb-32 lg:pb-8 lg:max-w-lg lg:mx-auto lg:w-full">
                        <div className="h-8 w-32 bg-white/10 rounded animate-pulse mt-4 mb-4" />
                        <div className="h-5 w-48 bg-white/10 rounded animate-pulse mb-8" />
                        <div className="w-full max-w-[280px] aspect-square bg-white/10 rounded-xl animate-pulse" />
                        <div className="mt-8 w-full bg-white/5 rounded-lg p-5 h-40 animate-pulse" />
                    </main>
                </PageTransition>
                <BottomNav />
                </MobileLayout>
            </AuthGuard>
        );
    }

    if (!ticket) {
        return (
            <AuthGuard>
                <MobileLayout>
                <PageTransition>
                    <header className="py-4 flex justify-between items-center">
                        <Link href="/profile" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary" aria-label="Back to profile">
                            <span className="material-icons">arrow_back</span>
                        </Link>
                        <h1 className="text-sm font-bold tracking-widest text-primary uppercase">My Ticket</h1>
                        <div className="w-10 h-10" />
                    </header>
                    <main className="flex-1 flex flex-col items-center justify-center pb-32 lg:pb-8 lg:max-w-lg lg:mx-auto lg:w-full">
                        <span className="material-icons text-6xl text-primary/20 mb-4">confirmation_number</span>
                        <h2 className="text-xl font-bold mb-2">No Active Tickets</h2>
                        <p className="text-white/40 text-sm mb-6">Browse events to grab your next ticket.</p>
                        <Link href="/events" className="bg-primary text-background-dark px-6 py-3 rounded-full font-bold text-sm">
                            Browse Events
                        </Link>
                    </main>
                </PageTransition>
                <BottomNav />
                </MobileLayout>
            </AuthGuard>
        );
    }

    const eventDate = new Date(ticket.event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });
    const formattedTime = eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <AuthGuard>
            <MobileLayout>
            <PageTransition>
                {/* Header */}
                <header className="py-4 flex justify-between items-center">
                    <Link href="/profile" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary" aria-label="Back to profile">
                        <span className="material-icons">arrow_back</span>
                    </Link>
                    <h1 className="text-sm font-bold tracking-widest text-primary uppercase">My Ticket</h1>
                    <button
                        onClick={() => share({ title: `My Ticket - ${ticket.event.title}`, url: window.location.href })}
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        aria-label="Share ticket"
                    >
                        <span className="material-icons text-xl">share</span>
                    </button>
                </header>

                <main className="flex-1 flex flex-col items-center pb-32 lg:pb-8 lg:max-w-lg lg:mx-auto lg:w-full">
                    {/* Event Info */}
                    <div className="text-center mt-4 mb-8">
                        <h2 className="text-3xl font-bold tracking-tight mb-2">{ticket.event.title}</h2>
                        <div className="flex items-center justify-center gap-2 text-primary/80">
                            <span className="material-icons text-sm">calendar_today</span>
                            <span className="text-sm font-medium">{formattedDate} &bull; {formattedTime}</span>
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
                        <div className={`relative bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center justify-center aspect-square w-full max-w-[280px] transition-all ${maxBrightness ? 'brightness-125 shadow-[0_0_40px_rgba(255,255,255,0.3)]' : ''}`}>
                            <div className="text-black font-mono text-sm font-bold tracking-widest mb-4 text-center break-all">{ticket.qr_code}</div>
                            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="material-icons text-gray-400 text-6xl">qr_code_2</span>
                            </div>
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
                                <p className="font-bold text-lg text-primary">{ticket.tier.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Holder</p>
                                <p className="font-bold text-lg">{profile?.display_name ?? 'Ticket Holder'}</p>
                            </div>
                        </div>
                        <div className="h-px bg-white/10 w-full" />
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Venue</p>
                                <p className="font-medium">{ticket.event.venue}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Location</p>
                                <p className="font-medium">{ticket.event.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Brightness Toggle */}
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <button
                            onClick={() => { setMaxBrightness(!maxBrightness); haptics.impact('light'); }}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full transition-colors ${maxBrightness ? 'bg-primary/20 border border-primary/30 text-primary' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                            <span className="material-icons text-primary">brightness_high</span>
                            <span className="text-sm font-semibold">Max Screen Brightness</span>
                        </button>
                        <p className="text-xs text-white/40 max-w-[200px] text-center italic">
                            Scanning works best at full brightness in dark environments.
                        </p>
                    </div>
                </main>
            </PageTransition>

            <BottomNav />
            </MobileLayout>
        </AuthGuard>
    );
}
