'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { BottomNav } from '../../components/navigation/BottomNav';

export default function VenueTicketPage() {
    const handleMaxBrightness = useCallback(() => {
        const el = document.documentElement;
        el.requestFullscreen?.();
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden font-display text-white">
            {/* Background Layer */}
            <div className="fixed inset-0 z-0">
                <img
                    alt="Deep tropical jungle at night"
                    className="w-full h-full object-cover opacity-20 grayscale brightness-50"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhcKqCeSOviUudxMWm2gFYCFVmOFFQ1BzBPtxKmgLhjPMnmMEkegtIzrZPETk7hE7cYbidSjOxDVk6S5Re3GeacQGL4ptYhZYsOtI89OJYi0x4UR81qr42dNXFogXKPk6tzGFM1UhG74khFblC83PRbfs6L53crdA4NUEi0udaKXPA1zNs0p4i6LtVVqiS1PAfR8EYRs3XbQ1FXGGcuF3Mjg06ET37hTUVl7oA3WxEmRQBKnr61MGXQHqodR5E6TqCjP601bsvdHY"
                />
                <div className="absolute inset-0 jungle-gradient opacity-90" />
            </div>

            {/* Decorative Glow */}
            <div className="fixed top-0 left-0 pointer-events-none opacity-30 mix-blend-screen">
                <div className="w-48 h-48 bg-primary/20 blur-[100px] rounded-full" />
            </div>
            <div className="fixed bottom-40 right-0 pointer-events-none opacity-20">
                <div className="w-64 h-64 bg-primary/30 blur-[120px] rounded-full" />
            </div>

            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center justify-between min-h-screen max-w-md mx-auto px-6 pt-12 pb-28">
                {/* Top Status Area */}
                <div className="w-full flex justify-between items-center mb-8">
                    <Link href="/ticket" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <span className="material-icons text-white">chevron_left</span>
                    </Link>
                    <div className="flex flex-col items-center">
                        <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Entry Ticket</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <span className="material-icons text-white text-xl">share</span>
                    </button>
                </div>

                {/* Ticket Section */}
                <div className="w-full flex-1 flex flex-col items-center justify-center">
                    {/* Event Info */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-white mb-1">OXA - Jungle Experience</h1>
                        <p className="text-white/60 font-medium">Friday, Oct 27 &bull; 9:00 PM</p>
                    </div>

                    {/* Scannable Card */}
                    <div className="relative w-full aspect-[4/5] bg-white rounded-xl p-8 flex flex-col items-center justify-between ticket-shadow">
                        {/* Perforation Design */}
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background-dark" />
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background-dark" />
                        <div className="w-full border-b-2 border-dashed border-gray-100 mb-4 h-0" />

                        {/* QR Code */}
                        <div className="flex-1 flex items-center justify-center w-full">
                            <div className="bg-white p-4 rounded-lg">
                                <img
                                    alt="QR Code for event entry"
                                    className="w-64 h-64"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwjsyGL0ALN7GbiIjrzCZtZUzJUhDOPhB6L7Soc2vKOTTRb710CVeUGPy52HG8_EpFMVyHL1uHZ94ZTYjttyYtU5Xf360DwFDB7Cweh_mM5cs3KQuWyHypme2hCkYhNxBKayQc1INntfgqr9dfmjZsGGug4-5Is-ao-MdRQHv5FGy-ga8a-avxglSS7xqcZshj2eGkATiUpSXRfdaDuKv1b0DpMGAxrUMNUUnVr6B0J-mVwbhYRDs9XymZxcxJEdGjtvvtgHx4Nlk"
                                />
                            </div>
                        </div>

                        {/* Pass ID */}
                        <div className="w-full text-center mt-6">
                            <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Pass ID</div>
                            <div className="text-black font-mono font-bold text-lg">OXA-7729-BK24</div>
                        </div>
                    </div>

                    {/* Brightness Toggle Button */}
                    <button
                        onClick={handleMaxBrightness}
                        className="mt-8 group flex items-center gap-3 bg-primary text-background-dark px-6 py-4 rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                    >
                        <span className="material-icons">brightness_high</span>
                        <span>Tap for Maximum Brightness</span>
                    </button>

                    {/* Instructions */}
                    <div className="mt-8 flex flex-col items-center text-center gap-2">
                        <div className="flex items-center gap-2 text-primary/80">
                            <span className="material-icons text-sm">info</span>
                            <p className="text-sm font-medium">Show this to the door staff</p>
                        </div>
                        <p className="text-xs text-white/40 max-w-[240px]">This ticket is valid for one entry. Please have your ID ready for verification.</p>
                    </div>
                </div>
            </main>

            {/* Bottom Nav */}
            <BottomNav />

            {/* iOS Home Indicator */}
            <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-[60]" />
        </div>
    );
}
