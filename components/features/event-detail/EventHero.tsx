'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Share, Heart, Sparkles } from 'lucide-react';
import { Button } from '../../ui/Button';

export function EventHero() {
    const router = useRouter();
    const [liked, setLiked] = useState(false);

    return (
        <div className="relative h-[450px] w-full overflow-hidden">
            <img
                alt="OXA Party Jungle Experience"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcyiHagYeLytG3El1EJoKbpWfYLLNDYCqEG6EEq25mxlx3uCLrkNsuVCjuD42WqtgYSSGsV3U1UQ6BIOEYAfXminjaBo4fHL8t_FHqVSVPq15wEUZxXSD87TTBI_ePTwVj2Uz2OYZjM9hSGBHq8CrQwO8CIcwCx1eRuVQIBj1B2ANudbDIZJqvsK-AiKSfkoGUdhEklkA0mIw3Ug0PRNYWbxl5RC6ztwJCyR2z2v_DWTxZ_S6dEf8sqNc0bTo7RWa-DdstAHV8OuM"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />

            {/* Top Action Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
                <Button
                    variant="glass"
                    size="icon"
                    className="rounded-full w-10 h-10 p-0 text-white border-white/10"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <div className="flex gap-3">
                    <Button variant="glass" size="icon" className="rounded-full w-10 h-10 p-0 text-white border-white/10">
                        <Share className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="glass"
                        size="icon"
                        className={`rounded-full w-10 h-10 p-0 border-white/10 transition-colors ${liked ? 'text-red-500 bg-red-500/20' : 'text-white'}`}
                        onClick={() => setLiked(!liked)}
                    >
                        <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    </Button>
                </div>
            </div>

            {/* Event Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-flex items-center px-3 py-1 bg-primary text-background-dark text-xs font-bold rounded-full mb-3 uppercase tracking-widest">
                    Trending
                </div>
                <h1 className="text-4xl font-bold text-white leading-tight">OXA - Jungle Experience</h1>
                <p className="text-primary font-medium mt-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Koh Phangan&apos;s Premiere Tech-House
                </p>
            </div>
        </div>
    );
}
