'use client';

import React from 'react';
import Link from 'next/link';

const actions = [
    { icon: 'qr_code_scanner', label: 'Scan', href: '/scan-to-pay' },
    { icon: 'map', label: 'Explore', href: '/events' },
    { icon: 'local_activity', label: 'Tickets', href: '/ticket' },
    { icon: 'history', label: 'Past', href: '/transactions' },
];

export function QuickActions() {
    return (
        <section className="grid grid-cols-4 gap-4 mb-10">
            {actions.map((action) => (
                <Link key={action.label} href={action.href} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center border-primary/40 text-primary group active:scale-95 transition-transform">
                        <span className="material-icons text-2xl group-hover:scale-110 transition-transform">{action.icon}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-tight text-white/60">{action.label}</span>
                </Link>
            ))}
        </section>
    );
}
