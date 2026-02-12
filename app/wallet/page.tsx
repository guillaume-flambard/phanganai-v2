'use client';

import { WalletHeader } from '../../components/features/wallet/WalletHeader';
import { BalanceCard } from '../../components/features/wallet/BalanceCard';
import { QuickActions } from '../../components/features/wallet/QuickActions';
import { TransactionHistory } from '../../components/features/wallet/TransactionHistory';
import { BottomNav } from '../../components/navigation/BottomNav';
import { PageTransition } from '../../components/motion/PageTransition';

export default function WalletPage() {
    return (
        <div className="min-h-screen relative overflow-x-hidden pb-24">
            {/* Background with jungle mesh */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="jungle-gradient absolute inset-0" />
                <div className="jungle-mesh absolute inset-0" />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 left-0 -ml-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            </div>

            {/* iOS Status Bar Spacer */}
            <div className="h-12 w-full" />

            {/* Main Content */}
            <main className="w-full max-w-md mx-auto relative z-10 px-5">
                <PageTransition>
                    <WalletHeader />
                    <BalanceCard />
                    <QuickActions />
                    <TransactionHistory />
                </PageTransition>
            </main>

            <BottomNav />
            <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-[60]" />
        </div>
    );
}
