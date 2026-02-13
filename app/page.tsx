import { MobileLayout } from "../components/layout/MobileLayout";
import { HomeHeader } from "../components/features/home/HomeHeader";
import { WalletBalanceCard } from "../components/features/home/WalletBalanceCard";
import { QuickActions } from "../components/features/home/QuickActions";
import { FeaturedEvents } from "../components/features/home/FeaturedEvents";
import { DiscoveryFeed } from "../components/features/home/DiscoveryFeed";
import { PeakEnergyNow } from "../components/features/home/PeakEnergyNow";
import { BottomNav } from "../components/navigation/BottomNav";
import { PageTransition } from "../components/motion/PageTransition";

export default function Home() {
  return (
    <MobileLayout>
      <PageTransition>
        <HomeHeader />
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left column: wallet + actions */}
          <div className="lg:col-span-4">
            <WalletBalanceCard />
            <QuickActions />
            <div className="hidden lg:block">
              <PeakEnergyNow />
            </div>
          </div>
          {/* Right column: events feed */}
          <div className="lg:col-span-8">
            <FeaturedEvents />
            <div className="lg:hidden">
              <PeakEnergyNow />
            </div>
            <DiscoveryFeed />
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileLayout>
  );
}
