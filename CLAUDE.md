# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Static export to out/
npm run lint         # ESLint (flat config, next/core-web-vitals + typescript)
npm run cap:sync     # Build + sync to Capacitor (iOS & Android)
npm run cap:ios      # Build + open in Xcode
npm run cap:android  # Build + open in Android Studio
```

No test framework is configured. There is a `bun.lock` present but `npm` is used for scripts.

## Architecture

**Static-export Next.js app** (`output: 'export'`) — no SSR, no API routes, no server components with data fetching. All pages render client-side. Capacitor wraps the static `out/` directory for native iOS/Android.

### Page Structure

Every page follows the same pattern:
1. Wrap content in `<MobileLayout>` (background gradients, max-width constraint, bottom padding for nav)
2. Wrap in `<PageTransition>` with appropriate animation variant from `lib/animations.ts`
3. Include `<BottomNav />` for mobile navigation

Pages are in `app/` using Next.js App Router. 17 routes total (home, events, event-detail, wallet, ticket, venue-ticket, checkout, scan-to-pay, top-up, payment-methods, payment-success, transactions, notifications, profile, settings, referral).

### Responsive Layout

- Mobile-first (390px target) with `lg:` breakpoints for desktop
- `BottomNav` shows on mobile, `DesktopSidebar` shows on `lg:` screens
- Root layout adds `lg:pl-64` to offset for sidebar
- `MobileLayout` constrains content to `max-w-md` on mobile, `max-w-6xl` on desktop

### Component Organization

- `components/features/{page}/` — page-specific components (e.g., `features/home/FeaturedEvents.tsx`)
- `components/motion/` — animation wrappers (`PageTransition`, `FadeIn`, `StaggerList`, `AnimatedCounter`, `AnimatedProgress`)
- `components/ui/` — shared primitives (`GlassCard`, `Button`)
- `components/navigation/` — `BottomNav` (mobile) and `DesktopSidebar` (desktop)
- `components/layout/MobileLayout.tsx` — page shell with background effects

### State & Utilities

- `lib/hooks/` — Supabase-backed data hooks (`use-profile`, `use-wallet`, `use-events`, `use-tickets`, `use-notifications`, `use-auth`)
- `lib/haptics.ts` — Capacitor haptics with dynamic imports (no-ops on web)
- `lib/share.ts` — Web Share API with clipboard fallback + sonner toast
- `lib/animations.ts` — motion variant presets (`pageVariants`, `slideRightVariants`, `slideUpVariants`, `scaleIn`, `staggerContainer`, `staggerItem`)
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

## Design System ("Neon Jungle")

Defined in `DESIGN.md` and `app/globals.css`. Key tokens via Tailwind `@theme`:

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#13ec5b` | Buttons, icons, glows |
| `background-dark` | `#102216` | Page backgrounds |
| `gold` | `#d4af37` | Premium/exclusive badges |
| `surface-dark` | `#1a2e20` | Card backgrounds |
| `font-display` | Space Grotesk | All text |

Custom utility classes in `globals.css`: `glass-card`, `glass-card-light`, `neon-glow`, `gold-text`, `gold-gradient`, `jungle-gradient`, `jungle-mesh`, `ios-blur`, `hide-scrollbar`.

Icons use **Google Material Icons** loaded via CDN (`<link>` in layout), referenced as `<span className="material-icons">icon_name</span>`.

## Client Context

This app is for **OXA**, a venue/party brand on Koh Phangan. OXA must be prominently featured. **Jungle Experience** is a direct competitor — never mix or confuse the two. Currency is Thai Baht (฿).
