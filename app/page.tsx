import { MobileLayout } from "../components/layout/MobileLayout";
import { HomeHeader } from "../components/features/home/HomeHeader";
import { WalletBalanceCard } from "../components/features/home/WalletBalanceCard";
import { QuickActions } from "../components/features/home/QuickActions";
import { FeaturedEvents } from "../components/features/home/FeaturedEvents";
import { PeakEnergyNow } from "../components/features/home/PeakEnergyNow";
import { BottomNav } from "../components/navigation/BottomNav";
import { PageTransition } from "../components/motion/PageTransition";

export default function Home() {
  return (
    <MobileLayout>
      <PageTransition>
        <HomeHeader />
        <WalletBalanceCard />
        <QuickActions />
        <FeaturedEvents />
        <PeakEnergyNow />
      </PageTransition>
      <BottomNav />
    </MobileLayout>
  );
}
