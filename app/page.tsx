import { MobileLayout } from "../components/layout/MobileLayout";
import { HomeHeader } from "../components/features/home/HomeHeader";
import { WalletBalanceCard } from "../components/features/home/WalletBalanceCard";
import { FeaturedEvents } from "../components/features/home/FeaturedEvents";
import { EventFilters } from "../components/features/home/EventFilters";
import { DiscoveryFeed } from "../components/features/home/DiscoveryFeed";
import { BottomNav } from "../components/navigation/BottomNav";

export default function Home() {
  return (
    <MobileLayout>
      <HomeHeader />
      <WalletBalanceCard />
      <FeaturedEvents />
      <EventFilters />
      <DiscoveryFeed />
      <BottomNav />
    </MobileLayout>
  );
}
