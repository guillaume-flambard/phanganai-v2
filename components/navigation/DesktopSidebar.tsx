'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNotifications } from '@/lib/hooks/use-notifications';

const navItems = [
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'explore', label: 'Events', href: '/events' },
    { icon: 'qr_code_scanner', label: 'Scan to Pay', href: '/scan-to-pay' },
    { icon: 'account_balance_wallet', label: 'Wallet', href: '/wallet' },
    { icon: 'confirmation_number', label: 'Tickets', href: '/ticket' },
    { icon: 'receipt_long', label: 'Transactions', href: '/transactions' },
    { icon: 'notifications', label: 'Notifications', href: '/notifications' },
];

const bottomItems = [
    { icon: 'person', label: 'Profile', href: '/profile' },
    { icon: 'settings', label: 'Settings', href: '/settings' },
];

export function DesktopSidebar() {
    const pathname = usePathname();
    const { unreadCount } = useNotifications();

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-surface-dark/60 backdrop-blur-xl border-r border-white/5 z-50">
            {/* Logo */}
            <div className="p-6 pb-4">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <span className="material-icons text-primary text-xl">bolt</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">PhanganAI</h1>
                        <p className="text-[10px] text-primary/60 uppercase tracking-widest">Powered by OXA</p>
                    </div>
                </Link>
            </div>

            {/* Main Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            isActive(item.href)
                                ? 'bg-primary/10 text-primary'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <span className="material-icons text-xl">{item.icon}</span>
                        <span>{item.label}</span>
                        {item.label === 'Notifications' && unreadCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                        {isActive(item.href) && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                        )}
                    </Link>
                ))}
            </nav>

            {/* Bottom Nav */}
            <div className="px-3 py-4 border-t border-white/5 space-y-1">
                {bottomItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            isActive(item.href)
                                ? 'bg-primary/10 text-primary'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <span className="material-icons text-xl">{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
