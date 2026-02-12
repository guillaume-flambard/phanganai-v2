import React from 'react';
import { Ticket } from 'lucide-react';
import { Button } from '../../ui/Button';
import Link from 'next/link';

export function EventFooter() {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-6 pt-2 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent z-20">
            <div className="max-w-md mx-auto">
                <Link href="/checkout">
                    <Button className="w-full h-14 text-lg font-bold gap-2">
                        Book Now
                        <Ticket className="w-5 h-5" />
                    </Button>
                </Link>
                <p className="text-center text-[10px] text-slate-500 mt-3 uppercase tracking-tighter">
                    Secure checkout powered by PhanganAI Wallet
                </p>
            </div>
            {/* iOS Home Indicator Spacer inside footer to ensure clickable area is safe */}
            <div className="h-2"></div>
        </div>
    );
}
