import React from 'react';
import Link from 'next/link';

export function FeaturedEvents() {
    return (
        <section className="mb-8">
            <div className="px-6 flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold tracking-tight">Featured Parties</h2>
                <span className="text-primary text-sm font-medium cursor-pointer hover:text-primary/80">See All</span>
            </div>

            <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 px-6 pb-2">
                {/* OXA Party Card */}
                <Link href="/event-detail" className="flex-shrink-0 w-[85%] snap-center relative aspect-[16/10] rounded-[2rem] overflow-hidden group border border-white/5 cursor-pointer block">
                    <img
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt="Neon light beach party at OXA Beach Club"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOTLXnq5LOB4z2nmGha7f84hWTAZ4BscqTD9ggKVT7LDonJw2ObRGV9A_BVJ-x1w3cpN9whUja_kR9l7YhSyd8eD14LWLxP2_anXqAZgpTksdZQABQXjfA0m5MU1NxnihmGheUHzx5Wl5gNxyGsPGYzAXPPw2wuswS8pghW8TmWMzKHO2XUR8fkCqppxl0LKGtk1BU-4LWe1wi4V_zceWq6Bu6lamWsi3g4HGZIZoL0S2nfGhMX9dtQm-jzVLly8ZtKxw7bWE5vpo"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-gold text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Gold Exclusive</span>
                            <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/30">Tonight</span>
                        </div>
                        <h3 className="text-xl font-bold leading-tight">OXA Beach: Techno Jungle</h3>
                        <p className="text-white/60 text-xs mt-1">Bantai Beach • Starting from ฿500</p>
                    </div>
                </Link>

                {/* Half Moon Card */}
                <div className="flex-shrink-0 w-[85%] snap-center relative aspect-[16/10] rounded-[2rem] overflow-hidden group border border-white/5">
                    <img
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt="Crowd dancing at a large jungle festival"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ2jKDYbo0xcADRmvX_4-rrEH_P8bAYtaSfZ3m5znLde2AS7pT41D15-m62g-5Vh7IwGtY5e8JEAyRetmWGz8FNuI9dLR-JJtPcG35JxdFMBBCMdiHUhdRMZfam6nfj87rL3tI1cCneHJh-HhOrKpNXyuSTbwUu9s4o2M8etR5irWxSUMgepY05c5N_zcLmkq2prhDnv5unbEvGAPJsnwzpWyjwEV_5Fiz3G2GbNZ9YXYS_06nm1eRxJItiREp5VXwu8T7_QeZloM"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/30">Upcoming</span>
                        </div>
                        <h3 className="text-xl font-bold leading-tight">Half Moon Festival</h3>
                        <p className="text-white/60 text-xs mt-1">Jungle Arena • Starting from ฿1,200</p>
                    </div>
                </div>
            </div>
        </section >
    );
}
