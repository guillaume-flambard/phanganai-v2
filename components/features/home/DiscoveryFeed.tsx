import React from 'react';
import { GlassCard } from '../../ui/GlassCard';

const events = [
    {
        id: 1,
        title: "OXA: Jungle Party",
        date: "Friday, Oct 12",
        location: "Koh Phangan",
        price: "฿500",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcyiHagYeLytG3El1EJoKbpWfYLLNDYCqEG6EEq25mxlx3uCLrkNsuVCjuD42WqtgYSSGsV3U1UQ6BIOEYAfXminjaBo4fHL8t_FHqVSVPq15wEUZxXSD87TTBI_ePTwVj2Uz2OYZjM9hSGBHq8CrQwO8CIcwCx1eRuVQIBj1B2ANudbDIZJqvsK-AiKSfkoGUdhEklkA0mIw3Ug0PRNYWbxl5RC6ztwJCyR2z2v_DWTxZ_S6dEf8sqNc0bTo7RWa-DdstAHV8OuM",
        isGold: true
    },
    {
        id: 2,
        title: "Lighthouse: Full Moon Eve",
        date: "Saturday, Oct 13",
        location: "Leela Beach",
        price: "฿600",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZkr3C0n7V53d76g9YpxNqKksss_eXqz5nFCKqvBVMPZukla-cigclFgcn6QSToMk6gvJJuq9va94CL5tuTiLM11ipPP_OpwdntZ6sfrw8OENPxI-i9dbzjzGpm85KovSz_r0SFfNGdaQSbINpCXcyNTgaOAEpaMg4LAzfmcWWjAv9RpaJW8lU0k3ehHLWwIMuAMt92lVj0WeKjudNruZKboJVx8okNY2VpeH0vPt5Wlon-loXsGoIpOh5pbMj2gSnhs9SIVcoNXo"
    },
    {
        id: 3,
        title: "Secret Mountain: Sunset Session",
        date: "Thursday, Oct 19",
        location: "Secret Mountain",
        price: "฿500",
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
                                    <span className="material-icons text-white/30 text-base">bookmark_border</span>
                                </div>
                                <h4 className="font-bold text-base leading-tight">{event.title}</h4>
                                <p className="text-white/50 text-[11px] mt-1 flex items-center gap-1">
                                    <span className="material-icons text-xs">location_on</span> {event.location}
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
