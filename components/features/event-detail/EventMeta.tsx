import React from 'react';
import type { Event } from '@/lib/types/database';

function formatEventDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });
}

function formatEventTime(dateStr: string): string {
    return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}

export function EventMeta({ event }: { event: Event }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-icons">calendar_today</span>
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Date</p>
                    <p className="font-medium">{formatEventDate(event.date)}</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-icons">schedule</span>
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Doors</p>
                    <p className="font-medium">{formatEventTime(event.doors_at)}</p>
                </div>
            </div>

            <div className="flex items-start gap-3 col-span-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-icons">location_on</span>
                </div>
                <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Location</p>
                    <div className="flex justify-between items-center">
                        <p className="font-medium">{event.venue} &middot; {event.location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
