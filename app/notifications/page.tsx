'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MobileLayout } from '../../components/layout/MobileLayout';
import { BottomNav } from '../../components/navigation/BottomNav';
import { PageTransition } from '../../components/motion/PageTransition';
import { StaggerList, StaggerItem } from '../../components/motion/StaggerList';
import { useNotifications } from '@/lib/hooks/use-notifications';

function getNotificationGroup(createdAt: string): string {
    const date = new Date(createdAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    return 'earlier';
}

function timeAgo(createdAt: string): string {
    const diff = Date.now() - new Date(createdAt).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (hours < 48) return 'Yesterday';
    return `${Math.floor(hours / 24)} days ago`;
}

export default function NotificationsPage() {
    const router = useRouter();
    const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();

    const grouped = {
        today: notifications.filter((n) => getNotificationGroup(n.created_at) === 'today'),
        yesterday: notifications.filter((n) => getNotificationGroup(n.created_at) === 'yesterday'),
        earlier: notifications.filter((n) => getNotificationGroup(n.created_at) === 'earlier'),
    };

    const handleTap = (id: string, href?: string | null) => {
        markAsRead(id);
        if (href) router.push(href);
    };

    if (loading) {
        return (
            <MobileLayout>
                <PageTransition>
                    <header className="pt-6 pb-4 flex items-center justify-between lg:max-w-3xl lg:mx-auto">
                        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
                    </header>
                    <div className="space-y-3 pb-32 lg:max-w-3xl lg:mx-auto lg:pb-8">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-3/4 bg-white/10 rounded" />
                                    <div className="h-3 w-full bg-white/10 rounded" />
                                    <div className="h-2 w-16 bg-white/10 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </PageTransition>
                <BottomNav />
            </MobileLayout>
        );
    }

    return (
        <MobileLayout>
            <PageTransition>
                <header className="pt-6 pb-4 flex items-center justify-between lg:max-w-3xl lg:mx-auto">
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
                    <div className="flex flex-col items-center justify-center py-20 text-center lg:max-w-3xl lg:mx-auto">
                        <span className="material-icons text-6xl text-primary/20 mb-4">notifications_none</span>
                        <h2 className="text-xl font-bold mb-2">You&apos;re all caught up!</h2>
                        <p className="text-white/40 text-sm">No new notifications right now.</p>
                    </div>
                ) : (
                    <div className="pb-32 space-y-6 lg:max-w-3xl lg:mx-auto lg:pb-8">
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
                                                        <span className={`material-icons ${n.icon_color}`}>{n.icon}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h3 className={`font-bold text-sm ${n.read ? 'text-white/70' : 'text-white'}`}>{n.title}</h3>
                                                            {!n.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
                                                        </div>
                                                        <p className="text-xs text-white/40 mt-0.5 line-clamp-2">{n.message}</p>
                                                        <p className="text-[10px] text-white/25 mt-1.5">{timeAgo(n.created_at)}</p>
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
