import { MobileLayout } from '../../components/layout/MobileLayout';
import { WalletHeader } from '../../components/features/wallet/WalletHeader';
import { BalanceCard } from '../../components/features/wallet/BalanceCard';
import { QuickActions } from '../../components/features/wallet/QuickActions';
import { TransactionHistory } from '../../components/features/wallet/TransactionHistory';
import { BottomNav } from '../../components/navigation/BottomNav';

export default function WalletPage() {
    return (
        <MobileLayout>
            <WalletHeader />
            <BalanceCard />
            <QuickActions />
            <TransactionHistory />
            <BottomNav />
        </MobileLayout>
    );
}
