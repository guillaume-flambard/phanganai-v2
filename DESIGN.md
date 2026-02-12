# Design System: PhanganAI
**Project ID:** 1468504922771497084

## 1. Visual Theme & Atmosphere
The application embodies a "Neon Jungle" aesthetic, merging the organic, raw beauty of Koh Phangan with a high-tech, futuristic digital layer. The interface is predominantly dark mode, utilizing deep forest greens and blacks as a canvas for vibrant neon accents. The mood is energetic, immersive, and premium, evoking the feeling of a high-end nightlife experience in a tropical paradise. It uses "glassmorphism" heavily to create depth and a modern, airy feel despite the dark background.

## 2. Color Palette & Roles
*   **Neon Cyber Green (#13ec5b)**: Primary action color. Used for buttons, icons, highlights, and glowing effects. Represents energy and digital connection.
*   **Deep Jungle Night (#102216)**: Main background color. A very dark, rich green-black that provides high contrast for the neon elements.
*   **Golden Sand (#d4af37)**: Accent color used for exclusive badges ("Gold Exclusive"), premium features, or verified status.
*   **Mist White (#f6f8f6)**: Used for main text and backgrounds in "light" contexts (though the app is primarily dark).
*   **Translucent White (rgba(255, 255, 255, 0.05-0.1))**: Used for glassmorphic cards and overlays.

## 3. Typography Rules
*   **Display Font:** `Space Grotesk`. Used for all headings and body text.
    *   **Headings:** Bold weights (700), tight letter spacing.
    *   **Body:** Regular/Medium weights (400/500).
    *   **Labels/Badges:** Uppercase, tracking-widest (10px+ letter spacing) for a technical, sci-fi feel.

## 4. Component Stylings
*   **Buttons:**
    *   **Primary:** Pill-shaped (`rounded-full`), Neon Cyber Green background with Deep Jungle Night text. Bold font. Often features a drop shadow or glow (`shadow-[0_0_30px_rgba(19,236,91,0.3)]`).
    *   **Secondary/Tag:** Glassmorphic or outlined. Pill-shaped.
*   **Cards (Glass Cards):**
    *   `rounded-xl` (Subtly rounded corners, approx 12-16px).
    *   Background is `rgba(19, 236, 91, 0.05)` or `rgba(255, 255, 255, 0.05)`.
    *   Backdrop blur (`backdrop-filter: blur(12px)`).
    *   Thin, subtle border (`1px solid rgba(19, 236, 91, 0.1)`).
    *   Some cards feature a "Neon Glow" (`box-shadow: 0 0 15px rgba(19, 236, 91, 0.3)`).
*   **Images:**
    *   Start with `rounded-full` for avatars and artists.
    *   `rounded-xl` for event thumbnails and location maps.
    *   Object fit cover.
*   **Navigation:**
    *   Bottom bar is glassmorphic (`backdrop-blur-xl`), `bg-background-dark/80`.
    *   Icons are `Material Icons` or `Material Symbols Outlined`.

## 5. Layout Principles
*   **Mobile-First:** Designed specifically for mobile viewports (approx 390px width).
*   **Spacing:** Generous padding (`p-6` / 24px) for main content areas.
*   **Grids & Lists:**
    *   Horizontal scrolling carousels for "Featured" content (`snap-x`, `snap-mandatory`).
    *   Vertical stacks (`space-y-4`) for feed items.
*   **Sticky Elements:** Fixed bottom navigation and "Book Now" call-to-action buttons.
