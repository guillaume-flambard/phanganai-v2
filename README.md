# PhanganAI

Booking and events app for Koh Phangan, built around a "Neon Jungle" aesthetic: dark mode, deep forest greens, vibrant neon accents, and heavy glassmorphism for a premium nightlife feel.

## What it is

A cross-platform app (web plus native iOS and Android via Capacitor) for discovering and booking parties and events on the island, with a design system tuned for an energetic, immersive, high-end experience.

## Stack

Next.js (App Router), Supabase, Capacitor for the mobile builds, Motion for animation. Design system in `DESIGN.md`.

## Run

```bash
bun install
bun dev            # web at http://localhost:3000
bunx cap sync      # sync the native iOS / Android shells
```

Set Supabase credentials in `.env` before running.
