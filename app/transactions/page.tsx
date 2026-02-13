'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { BottomNav } from '../../components/navigation/BottomNav';
import { PageTransition } from '../../components/motion/PageTransition';
import { StaggerList, StaggerItem } from '../../components/motion/StaggerList';
import { slideRightVariants } from '../../lib/animations';
import { AnimatedCounter } from '../../components/motion/AnimatedCounter';
import { share } from '../../lib/share';
import { haptics } from '../../lib/haptics';
import { useWallet, useTransactions } from '@/lib/hooks/use-wallet';
import type { Transaction } from '@/lib/types/database';

const txIcons: Record<string, { icon: string; iconColor: string; iconBg: string }> = {
    topup: { icon: 'account_balance_wallet', iconColor: 'text-gold', iconBg: 'bg-gold/20' },
    payment: { icon: 'local_bar', iconColor: 'text-primary', iconBg: 'bg-primary/20' },
    ticket_purchase: { icon: 'confirmation_number', iconColor: 'text-primary', iconBg: 'bg-primary/20' },
    refund: { icon: 'replay', iconColor: 'text-blue-400', iconBg: 'bg-blue-400/20' },
    referral: { icon: 'group_add', iconColor: 'text-purple-400', iconBg: 'bg-purple-400/20' },
};

function groupTransactionsByDate(transactions: Transaction[]): { title: string; transactions: Transaction[] }[] {
    const groups: Record<string, Transaction[]> = {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    for (const tx of transactions) {
        const d = new Date(tx.created_at);
        let label: string;
        if (d.toDateString() === today.toDateString()) {
            label = 'Today';
        } else if (d.toDateString() === yesterday.toDateString()) {
            label = 'Yesterday';
        } else {
            label = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        }
        if (!groups[label]) groups[label] = [];
        groups[label].push(tx);
    }

    return Object.entries(groups).map(([title, txs]) => ({ title, transactions: txs }));
}

function TransactionSkeleton() {
    return (
        <div className="bg-white/[0.03] border border-primary/10 rounded-lg p-4 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10" />
                    <div className="space-y-2">
                        <div className="h-5 w-36 bg-white/10 rounded" />
                        <div className="h-4 w-24 bg-white/10 rounded" />
                    </div>
                </div>
                <div className="text-right space-y-2">
                    <div className="h-5 w-20 bg-white/10 rounded" />
                    <div className="h-3 w-16 bg-white/10 rounded" />
                </div>
            </div>
        </div>
    );
}

export default function TransactionsPage() {
    const { wallet, loading: walletLoading } = useWallet();
    const { transactions, loading: txLoading } = useTransactions(50);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const balanceTHB = wallet ? wallet.balance / 100 : 0;
    const sections = groupTransactionsByDate(transactions);

    return (
        <AuthGuard>
            <div className="min-h-screen relative overflow-x-hidden pb-24 lg:pb-8">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="jungle-gradient absolute inset-0" />
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md lg:max-w-4xl mx-auto relative z-10">
                <PageTransition variant={slideRightVariants}>
                    {/* Header */}
                    <header className="px-5 py-4 sticky top-0 z-40 bg-background-dark/80 ios-blur">
                        <div className="flex items-center justify-between mb-2">
                            <Link href="/wallet" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary" aria-label="Back to wallet">
                                <span className="material-icons">arrow_back_ios_new</span>
                            </Link>
                            <h1 className="text-xl font-bold tracking-tight">Activity</h1>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary" aria-label="Filter transactions">
                                <span className="material-icons">filter_list</span>
                            </button>
                        </div>
                        <div className="mt-6 flex flex-col items-center">
                            <p className="text-xs uppercase tracking-widest text-primary/60 font-medium">Total Balance</p>
                            {walletLoading ? (
                                <div className="h-12 w-40 bg-white/10 rounded-lg animate-pulse mt-2" />
                            ) : (
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-3xl font-bold">&#3647;</span>
                                    <AnimatedCounter target={balanceTHB} className="text-5xl font-bold" />
                                </div>
                            )}
                        </div>
                    </header>

                    <main className="px-5 pb-32">
                        {txLoading ? (
                            <section className="mt-8 space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <TransactionSkeleton key={i} />
                                ))}
                            </section>
                        ) : transactions.length === 0 ? (
                            <div className="mt-16 text-center text-white/40">
                                <span className="material-icons text-5xl mb-3 block">receipt_long</span>
                                <p className="text-lg font-semibold">No transactions yet</p>
                                <p className="text-sm mt-1">Your activity will appear here</p>
                            </div>
                        ) : (
                            sections.map((section) => (
                                <section key={section.title} className="mt-8">
                                    <h2 className="text-sm font-semibold text-primary/40 uppercase tracking-widest mb-4">{section.title}</h2>
                                    <StaggerList className="space-y-3">
                                        {section.transactions.map((tx) => {
                                            const isExpanded = expandedId === tx.id;
                                            const style = txIcons[tx.type] ?? txIcons.payment;
                                            const isCredit = tx.amount > 0;
                                            const amountDisplay = `${isCredit ? '+' : '-'}฿${Math.abs(tx.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
                                            const amountColor = isCredit ? 'text-primary' : 'text-white';
                                            const timeStr = new Date(tx.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

                                            return (
                                                <StaggerItem key={tx.id}>
                                                    <div
                                                        className="bg-white/[0.03] border border-primary/10 rounded-lg p-4 transition-all hover:bg-primary/5 cursor-pointer"
                                                        onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-12 h-12 rounded-full ${style.iconBg} flex items-center justify-center ${style.iconColor}`}>
                                                                    <span className="material-icons">{style.icon}</span>
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-bold text-lg">{tx.description}</h3>
                                                                    <p className="text-sm text-white/40">{timeStr}</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className={`font-bold text-lg ${amountColor}`}>{amountDisplay}</p>
                                                                <p className="text-xs text-white/30">Completed</p>
                                                            </div>
                                                        </div>
                                                        {isExpanded && (
                                                            <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                                                                <div className="flex justify-between items-center text-xs">
                                                                    <span className="text-white/40">Transaction ID</span>
                                                                    <span className="font-mono text-white/50 uppercase tracking-tighter">{tx.id.slice(0, 18)}</span>
                                                                </div>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); toast.success('Receipt downloaded!'); haptics.impact('light'); }}
                                                                    className="w-full bg-primary py-3 rounded-full flex items-center justify-center gap-2 text-background-dark font-bold text-sm neon-glow active:scale-[0.98] transition-transform"
                                                                >
                                                                    <span className="material-icons text-sm">download</span>
                                                                    DOWNLOAD PDF RECEIPT
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </StaggerItem>
                                            );
                                        })}
                                    </StaggerList>
                                </section>
                            ))
                        )}

                        {/* Referral Promo */}
                        <div className="mt-12 relative overflow-hidden rounded-lg bg-primary/10 border border-primary/20 p-6 flex flex-col gap-3">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                            <h4 className="text-lg font-bold">Refer a Beach Friend</h4>
                            <p className="text-sm text-white/50">Get &#3647;200 free credit when your friend tops up for the first time.</p>
                            <button
                                onClick={() => share({ title: 'Join PhanganAI', text: 'Get ฿200 free credit!', url: 'https://phanganai.app/referral' })}
                                className="w-max px-6 py-2 bg-primary text-background-dark font-bold text-xs rounded-full mt-2 flex items-center gap-2 active:scale-95 transition-transform"
                            >
                                <span className="material-icons text-sm">share</span>
                                SHARE LINK
                            </button>
                        </div>
                    </main>
                </PageTransition>
            </div>

            <BottomNav />
            </div>
        </AuthGuard>
    );
}
