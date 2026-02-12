import React from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { Bookmark, MapPin } from 'lucide-react';

const events = [
    {
        id: 1,
        title: "Eden Garden: Sunset Sessions",
        date: "Friday, Oct 12",
        location: "Haad Rin West",
        price: "฿400",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN--TujDsqT0bBN6gX3Oh8pDcceL2Vequ9NkKY1NkInA5mTYnH6PvqBcM6EE5HfK__juwiW0Mr6GJxygTklYI9TjOnXH8Su_Smc3nYAJRyafvA73Et-AiujfFxU_2syEiaAdpCulUw-z2qWEgSbxvNH2q2Zbdm1pLkcH-cK_WoXNtpwJtt3tP-fYO5CndUVc_k77zUnII_7axCVF1mb7tWMipFLfGcykssB23GwySjacI1vhkjWt12Xf0pe6mqlKbHy1YsD_qwXds"
    },
    {
        id: 2,
        title: "Lighthouse: Full Moon Eve",
        date: "Saturday, Oct 13",
        location: "Leela Beach",
        price: "฿600",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZkr3C0n7V53d76g9YpxNqKksss_eXqz5nFCKqvBVMPZukla-cigclFgcn6QSToMk6gvJJuq9va94CL5tuTiLM11ipPP_OpwdntZ6sfrw8OENPxI-i9dbzjzGpm85KovSz_r0SFfNGdaQSbINpCXcyNTgaOAEpaMg4LAzfmcWWjAv9RpaJW8lU0k3ehHLWwIMuAMt92lVj0WeKjudNruZKboJVx8okNY2VpeH0vPt5Wlon-loXsGoIpOh5pbMj2gSnhs9SIVcoNXo",
        isGold: true
    },
    {
        id: 3,
        title: "Waterfall Party: Main Stage",
        date: "Sunday, Oct 14",
        location: "Jungle Valley",
        price: "฿800",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjxWNNiUGDnxga7JDvXCJbkluS_frS2_wtJ4c9OoVclCv7D9gr2R7k3DSAKGNe5Gry8d0tlU3bJ6TU5xt6vF5y-K95DIzQUiXJBeoLDCF5F-OEkhJyYn4G0XPV_6FeVGh-WouQfnrt0G8RB9O9ySS4RugIYSwkoTvoJ2r9FuB9ebui0YXDhBEpvJhBOL9IRxiTNqF3Y8juGFm4vLWByHTfmdR40Fk-7H4pgfWPJgXhLHq7Gx08lgBmaKsM73husdKYuuWZHwWNkPs"
    }
];

import Link from 'next/link';
// ... imports

// ... events array

export function DiscoveryFeed() {
    return (
        <section className="px-6 pb-32">
            <h2 className="text-lg font-bold tracking-tight mb-4">Discovery Feed</h2>
            <div className="space-y-4">
                {events.map((event) => (
                    <Link href="/event-detail" key={event.id} className="block group">
                        <GlassCard className="p-3 rounded-xl flex gap-4 items-center group-hover:bg-white/5 transition-colors">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <img className="w-full h-full object-cover" src={event.image} alt={event.title} />
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${event.isGold ? 'text-gold' : 'text-primary'}`}>
                                        {event.date}
                                    </span>
                                    <Bookmark className="w-4 h-4 text-white/30" />
                                </div>
                                <h4 className="font-bold text-base leading-tight">{event.title}</h4>
                                <p className="text-white/50 text-[11px] mt-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {event.location}
                                </p>
                            </div>

                            <div className="text-right">
                                <div className="text-xs text-white/40">From</div>
                                <div className="font-bold text-primary">{event.price}</div>
                            </div>
                        </GlassCard>
                    </Link>
                ))}
            </div>
        </section>
    );
}
