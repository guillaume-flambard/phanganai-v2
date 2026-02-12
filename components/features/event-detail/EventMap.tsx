import React from 'react';
import { MapPin } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';

export function EventMap() {
    return (
        <section className="mt-4">
            <div className="w-full h-32 rounded-lg overflow-hidden relative border border-white/10 bg-white/5">
                <img
                    className="w-full h-full object-cover opacity-60 grayscale"
                    alt="Map location"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbJI2Mzfa4GYh1_4F8LJ1wgLvdpEG-RXsrHsTAvTq_XBV8_ZnBL_OO1SAnQAgef0OUhW7i9EPmBNtt3zeUyzhrOg5nROPzOlfHAgPAGM7UNbCyC3tjZkDOo08mD8rduaFtlTozFWBySpOjOdV49FamObC7wWtvzr1L-7zGKuGTl1eJ5WfxSm5DUiQRhK1EAARXhVNEcbtW433zA8OBwBCQhOYCh4RKWEaOSPps9jZNdmEBBdOzhMZWxxij_xhUVykPw_WEdobzUho"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(19,236,91,0.5)]">
                        <MapPin className="w-5 h-5 text-background-dark" />
                    </div>
                </div>
            </div>
        </section>
    );
}
