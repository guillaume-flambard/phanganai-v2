import React from 'react';

export function EventMeta() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-icons">calendar_today</span>
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Date</p>
                    <p className="font-medium">Friday, Oct 27</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-icons">schedule</span>
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Time</p>
                    <p className="font-medium">9 PM - 6 AM</p>
                </div>
            </div>

            <div className="flex items-start gap-3 col-span-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-icons">location_on</span>
                </div>
                <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Location</p>
                    <div className="flex justify-between items-center">
                        <p className="font-medium">Baan Tai Jungle</p>
                        <button className="text-primary text-sm font-semibold">Map</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
