import { create } from 'zustand';

export interface Notification {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  message: string;
  time: string;
  group: 'today' | 'yesterday' | 'earlier';
  read: boolean;
  href?: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (n: Omit<Notification, 'id' | 'read'>) => void;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    icon: 'celebration',
    iconColor: 'text-primary',
    title: 'OXA Party Tonight!',
    message: 'Gates open at 9 PM. Your ticket is ready.',
    time: '2h ago',
    group: 'today',
    read: false,
    href: '/ticket',
  },
  {
    id: '2',
    icon: 'payment',
    iconColor: 'text-blue-400',
    title: 'Payment Received',
    message: '฿450 received from your wallet top-up.',
    time: '5h ago',
    group: 'today',
    read: false,
    href: '/transactions',
  },
  {
    id: '3',
    icon: 'local_offer',
    iconColor: 'text-yellow-400',
    title: '20% Off This Weekend',
    message: 'Use code JUNGLE20 for selected events.',
    time: '8h ago',
    group: 'today',
    read: false,
    href: '/events',
  },
  {
    id: '4',
    icon: 'group_add',
    iconColor: 'text-purple-400',
    title: 'Referral Reward!',
    message: 'Sarah used your code. ฿100 bonus added!',
    time: 'Yesterday',
    group: 'yesterday',
    read: true,
    href: '/referral',
  },
  {
    id: '5',
    icon: 'verified',
    iconColor: 'text-primary',
    title: 'Account Verified',
    message: 'Your identity verification is complete.',
    time: '2 days ago',
    group: 'earlier',
    read: true,
  },
];

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.read).length,

  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return { notifications, unreadCount: notifications.filter((n) => !n.read).length };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  addNotification: (n) =>
    set((state) => {
      const notification: Notification = { ...n, id: Date.now().toString(), read: false };
      return {
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }),
}));
