'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { ChevronLeft, Pencil, Trash2, Plus, Shield, CreditCard } from 'lucide-react';

type Card = {
    id: string;
    brand: string;
    last4: string;
    expiry: string;
    isPrimary: boolean;
};

const initialCards: Card[] = [
    { id: '1', brand: 'Visa', last4: '4488', expiry: '12/26', isPrimary: true },
    { id: '2', brand: 'Mastercard', last4: '1122', expiry: '08/25', isPrimary: false },
];

export default function PaymentMethodsPage() {
    const router = useRouter();
    const [cards, setCards] = useState(initialCards);

    const setDefault = (id: string) => {
        setCards(cards.map(c => ({ ...c, isPrimary: c.id === id })));
    };

    const removeCard = (id: string) => {
        setCards(cards.filter(c => c.id !== id));
    };

    return (
        <MobileLayout>
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-40 bg-background-dark/80 backdrop-blur-xl">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold tracking-tight">Payment Methods</h1>
                <div className="w-10" />
            </header>

            <main className="px-6 pb-32">
                {/* Saved Cards */}
                <section className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm uppercase tracking-widest font-semibold text-primary/60">Your Saved Cards</h2>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">{cards.length} Cards</span>
                    </div>

                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`relative overflow-hidden mb-4 p-6 rounded-xl border ${
                                card.isPrimary
                                    ? 'border-primary/30 bg-primary/5'
                                    : 'border-white/5 bg-white/5'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex flex-col">
                                    <span className={`text-xs font-medium mb-1 uppercase tracking-tighter ${card.isPrimary ? 'text-primary' : 'text-white/40'}`}>
                                        {card.isPrimary ? 'Primary Method' : 'Secondary'}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <CreditCard className={`w-5 h-5 ${card.brand === 'Visa' ? 'text-blue-400' : 'text-orange-400'}`} />
                                        <span className="font-bold text-lg">&bull;&bull;&bull;&bull; {card.last4}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => removeCard(card.id)}
                                        className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] text-white/40 uppercase">Expiry</p>
                                    <p className="font-medium">{card.expiry}</p>
                                </div>
                                {card.isPrimary ? (
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <span className="text-xs font-medium text-primary">Active</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setDefault(card.id)}
                                        className="text-xs font-semibold text-white/40 hover:text-primary transition-colors"
                                    >
                                        Set as Default
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Security */}
                <section className="mt-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center gap-2 text-white/40">
                            <Shield className="w-4 h-4" />
                            <p className="text-xs">Secure encryption by <strong>Omise</strong></p>
                        </div>
                        <p className="text-[10px] text-white/30 leading-relaxed max-w-[240px] mx-auto">
                            Your payment information is stored securely. PhanganAI does not directly store your full card details.
                        </p>
                    </div>
                </section>
            </main>

            {/* Add Card CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark to-transparent">
                <button className="w-full bg-primary text-background-dark font-bold py-4 rounded-full flex items-center justify-center gap-2 neon-glow active:scale-[0.98] transition-transform">
                    <Plus className="w-5 h-5" />
                    Add New Payment Card
                </button>
                <div className="h-4" />
            </div>
        </MobileLayout>
    );
}
