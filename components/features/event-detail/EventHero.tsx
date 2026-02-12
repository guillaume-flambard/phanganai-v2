'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { share } from '@/lib/share';
import { haptics } from '@/lib/haptics';

export function EventHero() {
    const router = useRouter();
    const [liked, setLiked] = useState(false);

    return (
        <div className="relative h-[450px] w-full overflow-hidden -mx-5">
            <img
                alt="OXA Koh Phangan"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcyiHagYeLytG3El1EJoKbpWfYLLNDYCqEG6EEq25mxlx3uCLrkNsuVCjuD42WqtgYSSGsV3U1UQ6BIOEYAfXminjaBo4fHL8t_FHqVSVPq15wEUZxXSD87TTBI_ePTwVj2Uz2OYZjM9hSGBHq8CrQwO8CIcwCx1eRuVQIBj1B2ANudbDIZJqvsK-AiKSfkoGUdhEklkA0mIw3Ug0PRNYWbxl5RC6ztwJCyR2z2v_DWTxZ_S6dEf8sqNc0bTo7RWa-DdstAHV8OuM"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />

            {/* Top Action Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
                <button
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10"
                    onClick={() => router.back()}
                    aria-label="Go back"
                >
                    <span className="material-icons text-white">arrow_back_ios_new</span>
                </button>
                <div className="flex gap-3">
                    <button
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10"
                        onClick={() => share({ title: 'OXA Koh Phangan', url: window.location.href })}
                        aria-label="Share event"
                    >
                        <span className="material-icons text-white">share</span>
                    </button>
                    <button
                        className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center border border-white/10 transition-colors ${liked ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-white'}`}
                        onClick={() => {
                            setLiked(!liked);
                            haptics.impact('light');
                            toast(liked ? 'Removed from favorites' : 'Added to favorites');
                        }}
                        aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <span className="material-icons">{liked ? 'favorite' : 'favorite_border'}</span>
                    </button>
                </div>
            </div>

            {/* Event Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-flex items-center px-3 py-1 bg-primary text-background-dark text-xs font-bold rounded-full mb-3 uppercase tracking-widest">
                    Trending
                </div>
                <h1 className="text-4xl font-bold text-white leading-tight">OXA</h1>
                <p className="text-primary font-medium mt-1 flex items-center gap-2">
                    <span className="material-icons text-base">auto_awesome</span>
                    Koh Phangan&apos;s Most Unique Nightlife
                </p>
            </div>
        </div>
    );
}
