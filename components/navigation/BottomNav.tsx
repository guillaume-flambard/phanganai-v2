'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNotificationStore } from '@/lib/stores/notification-store';
import { haptics } from '@/lib/haptics';

const navItems = [
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'confirmation_number', label: 'Tickets', href: '/ticket' },
    { icon: 'notifications', label: 'Alerts', href: '/notifications' },
    { icon: 'person', label: 'Profile', href: '/profile' },
];

export function BottomNav() {
    const pathname = usePathname();
    const unreadCount = useNotificationStore((s) => s.unreadCount);

    return (
        <nav className="fixed bottom-6 left-5 right-5 h-16 glass-card rounded-2xl flex items-center justify-around px-2 z-50 neon-glow">
            {navItems.map((item, index) => {
                const isActive = item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                // Insert FAB button in the middle
                if (index === 2) {
                    return (
                        <div key="fab-group" className="contents">
                            <div className="relative -top-6">
                                <Link
                                    href="/scan-to-pay"
                                    className="w-14 h-14 rounded-full bg-primary text-background-dark flex items-center justify-center shadow-[0_0_20px_rgba(51,242,13,0.5)] active:scale-90 transition-all"
                                    aria-label="Scan to pay"
                                    onClick={() => haptics.selection()}
                                    style={{ animation: 'neon-pulse 3s ease-in-out infinite' }}
                                >
                                    <span className="material-icons text-3xl font-bold">add</span>
                                </Link>
                            </div>
                            <Link
                                href={item.href}
                                className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${isActive ? 'text-primary bg-primary/10' : 'text-white/40 hover:text-primary'}`}
                                aria-label={item.label}
                                onClick={() => haptics.selection()}
                            >
                                <span className="material-icons">{item.icon}</span>
                                {item.label === 'Alerts' && unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background-dark" />
                                )}
                            </Link>
                        </div>
                    );
                }

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors ${isActive ? 'text-primary bg-primary/10' : 'text-white/40 hover:text-primary'}`}
                        aria-label={item.label}
                        onClick={() => haptics.selection()}
                    >
                        <span className="material-icons">{item.icon}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
