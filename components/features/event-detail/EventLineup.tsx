'use client';

import React from 'react';
import { StaggerList, StaggerItem } from '../../motion/StaggerList';
import type { Artist } from '@/lib/types/database';

const FALLBACK_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC1nxQH4slBgnSAK7fAeX353Vn0lNpIAw5og-H4LADTqH6Wz8N0d0x-QuArt46GKn3_0Nza_MOQrZ4ZHEFQhn6WHQTN6qGIkiUhMVlLm91qNqVFtR50Jt8czY8HjTM1trGrXAK3oOfHThvAekg7Pfl1E1UpXYzExnw30iEZkxpvN7oK6H7naRL2MafqdY0V064-wTCmvjZoVrUjplyxNNyKXrH3utn2JfOJaslITzXuqxvsRINqDhFTnH428ZcTT-yhmIyo3quKp28';

export function EventLineup({ artists }: { artists: Artist[] }) {
    if (artists.length === 0) return null;

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">The Lineup</h2>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
                    {artists.length} Artist{artists.length !== 1 ? 's' : ''}
                </span>
            </div>
            <StaggerList className="flex overflow-x-auto gap-6 hide-scrollbar pb-2">
                {artists.map((artist, index) => (
                    <StaggerItem key={artist.id}>
                    <div className="flex-shrink-0 text-center w-20">
                        <div className={`relative w-20 h-20 rounded-full mb-2 p-1 border-2 ${index === 0 ? 'border-primary/30' : 'border-transparent'}`}>
                            <img
                                alt={artist.name}
                                className="w-full h-full object-cover rounded-full"
                                src={artist.image_url || FALLBACK_IMAGE}
                            />
                        </div>
                        <p className="text-sm font-medium leading-tight">{artist.name}</p>
                    </div>
                    </StaggerItem>
                ))}
            </StaggerList>
        </section>
    );
}
