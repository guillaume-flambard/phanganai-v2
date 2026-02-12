'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { BottomNav } from '../../components/navigation/BottomNav';
import { PageTransition } from '../../components/motion/PageTransition';
import { StaggerList, StaggerItem } from '../../components/motion/StaggerList';
import { useNotificationStore } from '../../lib/stores/notification-store';

export default function NotificationsPage() {
    const router = useRouter();
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

    const grouped = {
        today: notifications.filter((n) => n.group === 'today'),
        yesterday: notifications.filter((n) => n.group === 'yesterday'),
        earlier: notifications.filter((n) => n.group === 'earlier'),
    };

    const handleTap = (id: string, href?: string) => {
        markAsRead(id);
        if (href) router.push(href);
    };

    return (
        <MobileLayout>
            <PageTransition>
                <header className="pt-6 pb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs font-bold text-primary uppercase tracking-wider"
                        >
                            Mark All Read
                        </button>
                    )}
                </header>

                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-icons text-6xl text-primary/20 mb-4">notifications_none</span>
                        <h2 className="text-xl font-bold mb-2">You&apos;re all caught up!</h2>
                        <p className="text-white/40 text-sm">No new notifications right now.</p>
                    </div>
                ) : (
                    <div className="pb-32 space-y-6">
                        {(['today', 'yesterday', 'earlier'] as const).map((group) => {
                            const items = grouped[group];
                            if (items.length === 0) return null;
                            return (
                                <section key={group}>
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-primary/50 mb-3 ml-1">
                                        {group === 'today' ? 'Today' : group === 'yesterday' ? 'Yesterday' : 'Earlier'}
                                    </h2>
                                    <StaggerList className="space-y-2">
                                        {items.map((n) => (
                                            <StaggerItem key={n.id}>
                                                <button
                                                    onClick={() => handleTap(n.id, n.href)}
                                                    className={`w-full text-left p-4 rounded-xl flex items-start gap-4 transition-colors active:bg-white/10 ${
                                                        n.read ? 'bg-white/[0.02]' : 'bg-primary/5 border border-primary/10'
                                                    }`}
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                                        <span className={`material-icons ${n.iconColor}`}>{n.icon}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h3 className={`font-bold text-sm ${n.read ? 'text-white/70' : 'text-white'}`}>{n.title}</h3>
                                                            {!n.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
                                                        </div>
                                                        <p className="text-xs text-white/40 mt-0.5 line-clamp-2">{n.message}</p>
                                                        <p className="text-[10px] text-white/25 mt-1.5">{n.time}</p>
                                                    </div>
                                                </button>
                                            </StaggerItem>
                                        ))}
                                    </StaggerList>
                                </section>
                            );
                        })}
                    </div>
                )}
            </PageTransition>
            <BottomNav />
        </MobileLayout>
    );
}
