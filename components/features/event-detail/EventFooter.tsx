import React from 'react';
import Link from 'next/link';
import type { Event } from '@/lib/types/database';

export function EventFooter({ event }: { event?: Event }) {
    const href = event ? `/checkout?slug=${event.slug}` : '/checkout';

    return (
        <div className="fixed bottom-0 left-0 right-0 p-6 pt-2 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent z-20 lg:static lg:bg-transparent lg:p-0 lg:pt-0">
            <div className="max-w-md mx-auto lg:max-w-none">
                <Link href={href} className="w-full h-14 bg-primary text-background-dark font-bold text-lg rounded-full flex items-center justify-center gap-2 neon-glow active:scale-[0.98] transition-transform">
                    Book Now
                    <span className="material-icons">confirmation_number</span>
                </Link>
                <p className="text-center text-[10px] text-slate-500 mt-3 uppercase tracking-tighter">
                    Secure checkout powered by PhanganAI Wallet
                </p>
            </div>
            <div className="h-2" />
        </div>
    );
}
