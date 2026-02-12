'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { BottomNav } from '../../components/navigation/BottomNav';
import {
    ChevronLeft, SlidersHorizontal, Wine, CreditCard,
    Ticket, ShoppingBag, UtensilsCrossed, Download, Share
} from 'lucide-react';

type Transaction = {
    id: string;
    icon: React.ElementType;
    iconColor: string;
    iconBg: string;
    label: string;
    subtitle: string;
    amount: string;
    amountColor: string;
    status: string;
};

const sections: { title: string; transactions: Transaction[] }[] = [
    {
        title: 'Today',
        transactions: [
            {
                id: 'PAI-7829-9102-X',
                icon: Wine,
                iconColor: 'text-primary',
                iconBg: 'bg-primary/20',
                label: 'OXA Beach Bar',
                subtitle: '22:14 \u2022 Drinks',
                amount: '-\u0E3F450.00',
                amountColor: 'text-white',
                status: 'Completed',
            },
            {
                id: 'PAI-4501-2233-T',
                icon: CreditCard,
                iconColor: 'text-primary',
                iconBg: 'bg-primary/20',
                label: 'Wallet Top-up',
                subtitle: '14:02 \u2022 Mobile Banking',
                amount: '+\u0E3F5,000.00',
                amountColor: 'text-primary',
                status: 'Success',
            },
        ],
    },
    {
        title: 'Yesterday',
        transactions: [
            {
                id: 'PAI-9912-5501-H',
                icon: Ticket,
                iconColor: 'text-gold',
                iconBg: 'bg-gold/20',
                label: 'Half Moon Festival',
                subtitle: '19:45 \u2022 Early Bird VIP',
                amount: '-\u0E3F2,500.00',
                amountColor: 'text-white',
                status: 'Completed',
            },
            {
                id: 'PAI-3344-7788-S',
                icon: ShoppingBag,
                iconColor: 'text-primary',
                iconBg: 'bg-primary/20',
                label: '7-Eleven Baan Tai',
                subtitle: '18:12 \u2022 Grocery',
                amount: '-\u0E3F185.00',
                amountColor: 'text-white',
                status: 'Completed',
            },
        ],
    },
    {
        title: 'Oct 12',
        transactions: [
            {
                id: 'PAI-1122-3344-F',
                icon: UtensilsCrossed,
                iconColor: 'text-primary',
                iconBg: 'bg-primary/20',
                label: "Fisherman's Restaurant",
                subtitle: '21:30 \u2022 Dinner',
                amount: '-\u0E3F1,250.00',
                amountColor: 'text-white',
                status: 'Completed',
            },
        ],
    },
];

export default function TransactionsPage() {
    const [expandedId, setExpandedId] = useState<string | null>(sections[0].transactions[0].id);

    return (
        <MobileLayout>
            {/* Header */}
            <header className="px-6 py-4 sticky top-0 z-40 bg-background-dark/80 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-2">
                    <Link href="/wallet" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight">Activity</h1>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                        <SlidersHorizontal className="w-5 h-5" />
                    </button>
                </div>
                <div className="mt-6 flex flex-col items-center">
                    <p className="text-xs uppercase tracking-widest text-primary/60 font-medium">Total Balance</p>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold">฿</span>
                        <span className="text-5xl font-bold">14,250</span>
                        <span className="text-2xl font-bold text-white/40">.45</span>
                    </div>
                </div>
            </header>

            <main className="px-6 pb-32">
                {sections.map((section) => (
                    <section key={section.title} className="mt-8">
                        <h2 className="text-sm font-semibold text-primary/40 uppercase tracking-widest mb-4">{section.title}</h2>
                        <div className="space-y-3">
                            {section.transactions.map((tx) => {
                                const isExpanded = expandedId === tx.id;
                                return (
                                    <div
                                        key={tx.id}
                                        className="bg-white/[0.03] border border-primary/10 rounded-lg p-4 transition-all hover:bg-primary/5 cursor-pointer"
                                        onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full ${tx.iconBg} flex items-center justify-center`}>
                                                    <tx.icon className={`w-5 h-5 ${tx.iconColor}`} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">{tx.label}</h3>
                                                    <p className="text-sm text-white/40">{tx.subtitle}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold text-lg ${tx.amountColor}`}>{tx.amount}</p>
                                                <p className="text-xs text-white/30">{tx.status}</p>
                                            </div>
                                        </div>
                                        {isExpanded && (
                                            <div className="mt-4 pt-4 border-t border-white/5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-white/40">Transaction ID</span>
                                                    <span className="font-mono text-white/50 uppercase tracking-tighter">{tx.id}</span>
                                                </div>
                                                <button className="w-full bg-primary py-3 rounded-full flex items-center justify-center gap-2 text-background-dark font-bold text-sm neon-glow active:scale-[0.98] transition-transform">
                                                    <Download className="w-4 h-4" />
                                                    DOWNLOAD PDF RECEIPT
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}

                {/* Referral Promo */}
                <div className="mt-12 relative overflow-hidden rounded-lg bg-primary/10 border border-primary/20 p-6 flex flex-col gap-3">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                    <h4 className="text-lg font-bold">Refer a Beach Friend</h4>
                    <p className="text-sm text-white/50">Get ฿200 free credit when your friend tops up for the first time.</p>
                    <button className="w-max px-6 py-2 bg-primary text-background-dark font-bold text-xs rounded-full mt-2 flex items-center gap-2 active:scale-95 transition-transform">
                        <Share className="w-4 h-4" />
                        SHARE LINK
                    </button>
                </div>
            </main>

            <BottomNav />
        </MobileLayout>
    );
}
