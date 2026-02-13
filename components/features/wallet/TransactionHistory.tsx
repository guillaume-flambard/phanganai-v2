'use client';

import React from 'react';
import Link from 'next/link';
import { StaggerList, StaggerItem } from '../../motion/StaggerList';
import { useTransactions } from '@/lib/hooks/use-wallet';
import type { Transaction } from '@/lib/types/database';

const txIcons: Record<string, { icon: string; iconColor: string; iconBg: string }> = {
    topup: { icon: 'account_balance_wallet', iconColor: 'text-gold', iconBg: 'bg-gold/10' },
    payment: { icon: 'local_bar', iconColor: 'text-primary', iconBg: 'bg-primary/10' },
    ticket_purchase: { icon: 'confirmation_number', iconColor: 'text-primary', iconBg: 'bg-primary/10' },
    refund: { icon: 'replay', iconColor: 'text-blue-400', iconBg: 'bg-blue-400/10' },
    referral: { icon: 'group_add', iconColor: 'text-purple-400', iconBg: 'bg-purple-400/10' },
};

function formatTxDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) +
        ' \u2022 ' +
        d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function TransactionRow({ tx }: { tx: Transaction }) {
    const style = txIcons[tx.type] ?? txIcons.payment;
    const isCredit = tx.amount > 0;
    const amountDisplay = `${isCredit ? '+' : '-'} \u0E3F${Math.abs(tx.amount / 100).toLocaleString()}`;
    const amountColor = isCredit ? 'text-primary' : 'text-white';

    return (
        <div className="p-4 bg-surface-dark/40 border border-white/5 rounded-xl flex items-center justify-between hover:bg-primary/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${style.iconBg} flex items-center justify-center`}>
                    <span className={`material-icons text-lg ${style.iconColor}`}>{style.icon}</span>
                </div>
                <div>
                    <p className="text-sm font-semibold">{tx.description}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-tighter">{formatTxDate(tx.created_at)}</p>
                </div>
            </div>
            <p className={`text-sm font-bold ${amountColor}`}>{amountDisplay}</p>
        </div>
    );
}

function TransactionSkeleton() {
    return (
        <div className="p-4 bg-surface-dark/40 border border-white/5 rounded-xl flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-white/10 rounded" />
                    <div className="h-3 w-20 bg-white/10 rounded" />
                </div>
            </div>
            <div className="h-4 w-16 bg-white/10 rounded" />
        </div>
    );
}

export function TransactionHistory() {
    const { transactions, loading } = useTransactions(5);

    return (
        <section className="mb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white/90">Recent Activity</h3>
                <Link href="/transactions" className="text-primary/70 text-xs hover:text-primary transition-colors">
                    View all
                </Link>
            </div>
            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <TransactionSkeleton key={i} />
                    ))}
                </div>
            ) : transactions.length === 0 ? (
                <div className="p-8 text-center text-white/40 text-sm">
                    <span className="material-icons text-3xl mb-2 block">receipt_long</span>
                    No transactions yet
                </div>
            ) : (
                <StaggerList className="space-y-3">
                    {transactions.map((tx) => (
                        <StaggerItem key={tx.id}>
                            <TransactionRow tx={tx} />
                        </StaggerItem>
                    ))}
                </StaggerList>
            )}
        </section>
    );
}
