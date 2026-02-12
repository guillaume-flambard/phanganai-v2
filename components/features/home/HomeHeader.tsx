import React from 'react';
import Link from 'next/link';

export function HomeHeader() {
    return (
        <header className="flex justify-between items-center mb-8">
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80 font-semibold mb-1">Welcome to the Jungle</p>
                <h1 className="text-2xl font-bold tracking-tight">ALEX RAVE <span className="text-primary">.</span></h1>
            </div>
            <Link href="/profile" className="relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary/30">
                    <img
                        className="w-full h-full object-cover"
                        alt="Profile"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVVi_9BU6Pgy_Al2Gdq6ApYwIXO2DXveeJ0IR18KrQkFMkMl4kpY_gm5Y5K4Yb1fx9IYQRFIg5y3TA2FsPNmrrr76JYPO9FMADLD63ad5AaoEE28kVAOTF7BD4xeiK4y2fCo774gVXzLN1NrqhkS5iWmzee60Qh-7KRcem6nZQW0nDWeL-uuIjrvnBRNiIYyP0HUCujMhzRH3ADk9M8HEkgpO6Cm9jRF1sxUiEIy92nvOUsbOxU4OGtYJYf_jWLrZqdPqyffEqhoc"
                    />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background-dark neon-glow" />
            </Link>
        </header>
    );
}
