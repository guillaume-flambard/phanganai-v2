'use client';

import { AuthGuard } from '@/components/guards/AuthGuard';
import { WalletHeader } from '../../components/features/wallet/WalletHeader';
import { BalanceCard } from '../../components/features/wallet/BalanceCard';
import { QuickActions } from '../../components/features/wallet/QuickActions';
import { TransactionHistory } from '../../components/features/wallet/TransactionHistory';
import { BottomNav } from '../../components/navigation/BottomNav';
import { PageTransition } from '../../components/motion/PageTransition';

export default function WalletPage() {
    return (
        <AuthGuard>
            <div className="min-h-screen relative overflow-x-hidden pb-24 lg:pb-8">
                {/* Background with jungle mesh */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="jungle-gradient absolute inset-0" />
                    <div className="jungle-mesh absolute inset-0" />
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-40 left-0 -ml-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                </div>

                {/* Main Content */}
                <main className="w-full max-w-md lg:max-w-6xl mx-auto relative z-10 px-5 lg:px-8">
                    <PageTransition>
                        <WalletHeader />
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="lg:col-span-5">
                                <BalanceCard />
                                <QuickActions />
                            </div>
                            <div className="lg:col-span-7">
                                <TransactionHistory />
                            </div>
                        </div>
                    </PageTransition>
                </main>

                <BottomNav />
            </div>
        </AuthGuard>
    );
}
