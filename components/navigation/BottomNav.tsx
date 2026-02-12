'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'confirmation_number', label: 'Tickets', href: '/ticket' },
    { icon: 'notifications', label: 'Alerts', href: '#' },
    { icon: 'person', label: 'Profile', href: '/profile' },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-6 left-5 right-5 h-16 glass-card rounded-2xl flex items-center justify-around px-2 z-50 neon-glow">
            {navItems.map((item, index) => {
                const isActive = item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href) && item.href !== '#';

                // Insert FAB button in the middle
                if (index === 2) {
                    return (
                        <div key="fab-group" className="contents">
                            <div className="relative -top-6">
                                <Link href="/scan-to-pay" className="w-14 h-14 rounded-full bg-primary text-background-dark flex items-center justify-center shadow-[0_0_20px_rgba(51,242,13,0.5)] active:scale-90 transition-all">
                                    <span className="material-icons text-3xl font-bold">add</span>
                                </Link>
                            </div>
                            <Link
                                href={item.href}
                                className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${isActive ? 'text-primary bg-primary/10' : 'text-white/40 hover:text-primary'}`}
                            >
                                <span className="material-icons">{item.icon}</span>
                            </Link>
                        </div>
                    );
                }

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${isActive ? 'text-primary bg-primary/10' : 'text-white/40 hover:text-primary'}`}
                    >
                        <span className="material-icons">{item.icon}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
