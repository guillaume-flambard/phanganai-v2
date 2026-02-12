import React from 'react';
import Link from 'next/link';

const events = [
    {
        id: 1,
        title: 'Eden Garden Rave',
        location: 'Haad Rin Jungle, Phangan',
        price: '1,200 PAI',
        badge: 'Tonight',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx2ThiJrZWGAiAss6mLXXqmH5mYK_1pWma6dBHnjNOSrOWyCx-4Br4dUpGDTso3zTfkGdKGg1ZrCGHwHGdHAUgZgjAS_77ZdeyzS4REnwwRNyBRilbl9wKoxcyQf-RKpTSN8c3mm9oJIO3MTo4sRkl0JjKtNR91dNA_JCpgJR31KauqqR5BfMVpTC96B8zHlngjTtqZDbFpIOFthQo2-RiBnJikPijECOz_CLJbtP3ARZFYB-Qsg2di-G9jjVE1PsmMDJDxau-RWw',
    },
    {
        id: 2,
        title: 'Waterfall Ritual',
        location: 'Baan Kai, Phangan',
        price: '850 PAI',
        badge: 'SAT 24',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsXd-joHxtYFIMuzIDtP2akpOxKhhafT7ks_E1OkdQuoOMez9WuDuQLAKluHHofecan491ET2HaqcFILpA1K9wU47mCFWFNsyIgt0jUQKlkB-56uVYZpGTly-nU1XCOcrVAYSGl5eJ0dRM9iHEAsT0u4yaEnVXxcTS4sm2wlycAqACB8kL9qXrYba4Dadx-ENLdceDi7JsLk6c8QPF_Nn-xkAEs1fza7A_Qa8pstHh0TQVLC7cQJhiLDNuCfzualrhi6chkTdjP78',
    },
];

export function FeaturedEvents() {
    return (
        <section className="mb-10">
            <div className="flex justify-between items-end mb-5">
                <h3 className="text-xl font-bold tracking-tight">FEATURED RAVES</h3>
                <a className="text-primary text-xs font-bold uppercase tracking-widest border-b border-primary/30 pb-0.5" href="#">View All</a>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-6 -mx-5 px-5 hide-scrollbar">
                {events.map((event) => (
                    <Link href="/event-detail" key={event.id} className="min-w-[280px] relative group block">
                        <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="glass-card rounded-xl overflow-hidden relative">
                            <div className="h-44 w-full relative">
                                <img alt={event.title} className="w-full h-full object-cover" src={event.image} />
                                <div className="absolute top-3 right-3 bg-background-dark/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold border border-white/10 uppercase">
                                    {event.badge}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent" />
                            </div>
                            <div className="p-4 pt-0 -mt-6 relative z-10">
                                <h4 className="text-lg font-bold text-white mb-1">{event.title}</h4>
                                <p className="text-xs text-white/60 flex items-center gap-1 mb-4">
                                    <span className="material-icons text-[14px] text-primary">location_on</span> {event.location}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-primary font-bold">{event.price}</span>
                                    <button className="bg-primary text-background-dark text-[10px] font-black uppercase px-4 py-2 rounded-lg neon-glow">
                                        Book Spot
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
