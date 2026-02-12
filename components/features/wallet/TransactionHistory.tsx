import React from 'react';
import { Wine, Ticket, Wallet, UtensilsCrossed } from 'lucide-react';

const transactions = [
    {
        icon: Wine,
        iconColor: 'text-primary',
        iconBg: 'bg-primary/10',
        label: 'Drink at OXA',
        date: '14 Oct \u2022 23:45',
        amount: '- \u0E3F250',
        amountColor: 'text-white',
    },
    {
        icon: Ticket,
        iconColor: 'text-primary',
        iconBg: 'bg-primary/10',
        label: 'Ticket Purchase',
        date: '14 Oct \u2022 16:20',
        amount: '- \u0E3F630',
        amountColor: 'text-white',
    },
    {
        icon: Wallet,
        iconColor: 'text-gold',
        iconBg: 'bg-gold/10',
        label: 'Wallet Top-up',
        date: '12 Oct \u2022 09:15',
        amount: '+ \u0E3F1,000',
        amountColor: 'text-primary',
    },
    {
        icon: UtensilsCrossed,
        iconColor: 'text-primary',
        iconBg: 'bg-primary/10',
        label: 'Beach Club Dining',
        date: '11 Oct \u2022 14:30',
        amount: '- \u0E3F1,200',
        amountColor: 'text-white',
    },
];

export function TransactionHistory() {
    return (
        <section className="px-6 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white/90">Recent Activity</h3>
                <button className="text-primary/70 text-xs">View all</button>
            </div>
            <div className="space-y-3">
                {transactions.map((tx) => (
                    <div
                        key={tx.label}
                        className="p-4 bg-surface-dark/40 border border-white/5 rounded-xl flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${tx.iconBg} flex items-center justify-center`}>
                                <tx.icon className={`w-5 h-5 ${tx.iconColor}`} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{tx.label}</p>
                                <p className="text-[10px] text-white/40 uppercase tracking-tighter">{tx.date}</p>
                            </div>
                        </div>
                        <p className={`text-sm font-bold ${tx.amountColor}`}>{tx.amount}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
