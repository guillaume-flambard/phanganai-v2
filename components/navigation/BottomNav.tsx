'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Wallet, User } from 'lucide-react';

const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Map, label: "Map", href: "#" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: User, label: "Profile", href: "/profile" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background-dark/80 backdrop-blur-xl border-t border-white/5 px-8 flex justify-between items-center z-50">
            {navItems.map((item) => {
                const isActive = item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href) && item.href !== '#';

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${isActive ? 'text-primary' : 'text-white/40 hover:text-primary'}`}
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
