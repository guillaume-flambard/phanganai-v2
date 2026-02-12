import React from 'react';
import { Eye, FileText, QrCode } from 'lucide-react';

export function BalanceCard() {
    return (
        <div className="px-6">
            {/* Balance Display */}
            <section className="mt-4 mb-8 text-center py-8 rounded-xl bg-surface-dark/40 backdrop-blur-md border border-white/5 relative">
                <p className="text-sm text-white/50 mb-1">Total Balance</p>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-3xl font-bold gold-text">฿</span>
                    <h2 className="text-6xl font-bold gold-text tracking-tight">4,820</h2>
                </div>
                <div className="mt-6 flex justify-center gap-3">
                    <button className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Hide
                    </button>
                    <button className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Statements
                    </button>
                </div>
            </section>

            {/* QR Code Button */}
            <button className="w-full py-4 bg-primary text-background-dark font-bold text-lg rounded-full flex items-center justify-center gap-3 neon-glow active:scale-[0.98] transition-transform mb-8">
                <QrCode className="w-6 h-6" />
                My QR Code
            </button>
        </div>
    );
}
