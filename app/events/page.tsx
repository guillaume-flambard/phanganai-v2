'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { PageTransition } from '../../components/motion/PageTransition';
import { StaggerList, StaggerItem } from '../../components/motion/StaggerList';
import { slideRightVariants } from '../../lib/animations';
import { GlassCard } from '../../components/ui/GlassCard';

const filters = ['All Events', 'Techno', 'House', 'Trance', 'Beach'];

const events = [
    {
        id: 1,
        title: 'OXA: Jungle Party',
        date: 'Friday, Oct 12',
        location: 'Koh Phangan',
        price: '฿500',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcyiHagYeLytG3El1EJoKbpWfYLLNDYCqEG6EEq25mxlx3uCLrkNsuVCjuD42WqtgYSSGsV3U1UQ6BIOEYAfXminjaBo4fHL8t_FHqVSVPq15wEUZxXSD87TTBI_ePTwVj2Uz2OYZjM9hSGBHq8CrQwO8CIcwCx1eRuVQIBj1B2ANudbDIZJqvsK-AiKSfkoGUdhEklkA0mIw3Ug0PRNYWbxl5RC6ztwJCyR2z2v_DWTxZ_S6dEf8sqNc0bTo7RWa-DdstAHV8OuM',
        isGold: true,
    },
    {
        id: 2,
        title: 'Lighthouse: Full Moon Eve',
        date: 'Saturday, Oct 13',
        location: 'Leela Beach',
        price: '฿600',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZkr3C0n7V53d76g9YpxNqKksss_eXqz5nFCKqvBVMPZukla-cigclFgcn6QSToMk6gvJJuq9va94CL5tuTiLM11ipPP_OpwdntZ6sfrw8OENPxI-i9dbzjzGpm85KovSz_r0SFfNGdaQSbINpCXcyNTgaOAEpaMg4LAzfmcWWjAv9RpaJW8lU0k3ehHLWwIMuAMt92lVj0WeKjudNruZKboJVx8okNY2VpeH0vPt5Wlon-loXsGoIpOh5pbMj2gSnhs9SIVcoNXo',
    },
    {
        id: 3,
        title: 'Secret Mountain: Sunset Session',
        date: 'Thursday, Oct 19',
        location: 'Secret Mountain',
        price: '฿500',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjxWNNiUGDnxga7JDvXCJbkluS_frS2_wtJ4c9OoVclCv7D9gr2R7k3DSAKGNe5Gry8d0tlU3bJ6TU5xt6vF5y-K95DIzQUiXJBeoLDCF5F-OEkhJyYn4G0XPV_6FeVGh-WouQfnrt0G8RB9O9ySS4RugIYSwkoTvoJ2r9FuB9ebui0YXDhBEpvJhBOL9IRxiTNqF3Y8juGFm4vLWByHTfmdR40Fk-7H4pgfWPJgXhLHq7Gx08lgBmaKsM73husdKYuuWZHwWNkPs',
    },
    {
        id: 4,
        title: 'OXA: Berlin Calling Edition',
        date: 'Friday, Oct 27',
        location: 'Koh Phangan',
        price: '฿600',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN--TujDsqT0bBN6gX3Oh8pDcceL2Vequ9NkKY1NkInA5mTYnH6PvqBcM6EE5HfK__juwiW0Mr6GJxygTklYI9TjOnXH8Su_Smc3nYAJRyafvA73Et-AiujfFxU_2syEiaAdpCulUw-z2qWEgSbxvNH2q2Zbdm1pLkcH-cK_WoXNtpwJtt3tP-fYO5CndUVc_k77zUnII_7axCVF1mb7tWMipFLfGcykssB23GwySjacI1vhkjWt12Xf0pe6mqlKbHy1YsD_qwXds',
        isGold: true,
    },
    {
        id: 5,
        title: 'Half Moon Festival',
        date: 'Saturday, Oct 28',
        location: 'Ban Tai',
        price: '฿2,500',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsXd-joHxtYFIMuzIDtP2akpOxKhhafT7ks_E1OkdQuoOMez9WuDuQLAKluHHofecan491ET2HaqcFILpA1K9wU47mCFWFNsyIgt0jUQKlkB-56uVYZpGTly-nU1XCOcrVAYSGl5eJ0dRM9iHEAsT0u4yaEnVXxcTS4sm2wlycAqACB8kL9qXrYba4Dadx-ENLdceDi7JsLk6c8QPF_Nn-xkAEs1fza7A_Qa8pstHh0TQVLC7cQJhiLDNuCfzualrhi6chkTdjP78',
    },
];

export default function EventsPage() {
    const router = useRouter();
    const [active, setActive] = useState(0);

    return (
        <MobileLayout>
            <PageTransition variant={slideRightVariants}>
                <header className="py-4 flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary"
                        aria-label="Go back"
                    >
                        <span className="material-icons">arrow_back</span>
                    </button>
                    <div className="flex-1 relative">
                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xl">search</span>
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/40"
                        />
                    </div>
                </header>

                <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2 mb-6">
                    {filters.map((filter, index) => (
                        <button
                            key={filter}
                            onClick={() => setActive(index)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                                index === active
                                    ? 'bg-primary text-background-dark'
                                    : 'bg-white/5 border border-white/10 text-white/60'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <StaggerList className="space-y-4 pb-32">
                    {events.map((event) => (
                        <StaggerItem key={event.id}>
                            <Link href="/event-detail" className="block group">
                                <GlassCard className="p-3 rounded-xl flex gap-4 items-center group-hover:bg-white/5 transition-colors">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <img className="w-full h-full object-cover" src={event.image} alt={event.title} />
                                    </div>
                                    <div className="flex-grow">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${event.isGold ? 'text-gold' : 'text-primary'}`}>
                                            {event.date}
                                        </span>
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
                        </StaggerItem>
                    ))}
                </StaggerList>
            </PageTransition>
        </MobileLayout>
    );
}
