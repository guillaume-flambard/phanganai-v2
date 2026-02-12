import { MobileLayout } from "../components/layout/MobileLayout";
import { HomeHeader } from "../components/features/home/HomeHeader";
import { WalletBalanceCard } from "../components/features/home/WalletBalanceCard";
import { QuickActions } from "../components/features/home/QuickActions";
import { FeaturedEvents } from "../components/features/home/FeaturedEvents";
import { PeakEnergyNow } from "../components/features/home/PeakEnergyNow";
import { BottomNav } from "../components/navigation/BottomNav";

export default function Home() {
  return (
    <MobileLayout>
      <HomeHeader />
      <WalletBalanceCard />
      <QuickActions />
      <FeaturedEvents />
      <PeakEnergyNow />
      <BottomNav />
    </MobileLayout>
  );
}
