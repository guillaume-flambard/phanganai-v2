export type EventStatus = 'upcoming' | 'live' | 'past' | 'cancelled';
export type TicketStatus = 'active' | 'used' | 'cancelled';
export type TransactionType = 'topup' | 'payment' | 'refund' | 'referral' | 'ticket_purchase';
export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'vip';

export interface Profile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  phone: string | null;
  referral_code: string;
  loyalty_points: number;
  tier: LoyaltyTier;
  push_token: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  venue: string;
  date: string;
  doors_at: string;
  image_url: string;
  is_featured: boolean;
  status: EventStatus;
  created_at: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  image_url: string;
}

export interface EventArtist {
  event_id: string;
  artist_id: string;
  sort_order: number;
}

export interface TicketTier {
  id: string;
  event_id: string;
  name: string;
  price: number;
  capacity: number;
  sold_count: number;
}

export interface Ticket {
  id: string;
  user_id: string;
  event_id: string;
  tier_id: string;
  qr_code: string;
  status: TicketStatus;
  purchased_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  updated_at: string;
}

export interface Transaction {
  id: string;
  wallet_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  icon: string;
  icon_color: string;
  href: string | null;
  read: boolean;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  code_used: string;
  bonus_paid: boolean;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile> & { id: string }; Update: Partial<Profile> };
      events: { Row: Event; Insert: Omit<Event, 'id' | 'created_at'>; Update: Partial<Event> };
      artists: { Row: Artist; Insert: Omit<Artist, 'id'>; Update: Partial<Artist> };
      event_artists: { Row: EventArtist; Insert: EventArtist; Update: Partial<EventArtist> };
      ticket_tiers: { Row: TicketTier; Insert: Omit<TicketTier, 'id'>; Update: Partial<TicketTier> };
      tickets: { Row: Ticket; Insert: Omit<Ticket, 'id'>; Update: Partial<Ticket> };
      wallets: { Row: Wallet; Insert: Omit<Wallet, 'id'>; Update: Partial<Wallet> };
      transactions: { Row: Transaction; Insert: Omit<Transaction, 'id'>; Update: Partial<Transaction> };
      notifications: { Row: Notification; Insert: Omit<Notification, 'id'>; Update: Partial<Notification> };
      referrals: { Row: Referral; Insert: Omit<Referral, 'id'>; Update: Partial<Referral> };
    };
  };
}
