# Design System — Premium Tech Firm

## 1. Visual Theme & Atmosphere

Graebener.tech follows a premium dark aesthetic inspired by high-end tech firms (Linear, Vercel, Stripe). The design emphasizes confident typography, generous whitespace, and subtle glass-surface elements on a pure black canvas. The background features a WebGL shader rendering slow-moving atmospheric noise — barely perceptible, providing depth without distraction.

**Key Characteristics:**
- Pure black canvas (`#000000`) with subtle atmospheric WebGL shader
- Sentence case body text with selective uppercase on eyebrow labels and navigation
- Near-white spectral text (`#f0f0fa`) — not pure white, a slight blue-violet tint
- Glass-card surfaces with backdrop blur for interactive elements
- Generous spacing between sections (py-32/py-40)
- Gradient dividers between major sections
- 3D carousel for featured project showcase

## 2. Color Palette & Roles

### Primary
- **Black** (`#000000`): Page background
- **Spectral White** (`#f0f0fa`): Primary text color

### Text Hierarchy
- **Primary** (`#f0f0fa`): Headings, emphasized text
- **Secondary** (`rgba(240, 240, 250, 0.65)`): Supporting text
- **Muted** (`rgba(240, 240, 250, 0.5)`): Body text, descriptions
- **Subtle** (`rgba(240, 240, 250, 0.4)`): Dimmed elements, labels

### Interactive
- **Ghost Surface** (`rgba(240, 240, 250, 0.1)`): Button background
- **Ghost Border** (`rgba(240, 240, 250, 0.35)`): Button border
- **Glass Surface** (`rgba(255, 255, 255, 0.03)`): Card backgrounds
- **Glass Border** (`rgba(255, 255, 255, 0.08)`): Card borders
- **Accent Subtle** (`rgba(255, 255, 255, 0.04)`): Hover states

## 3. Typography Rules

### Font Families
- **Sans**: Barlow (weights: 400, 500, 600, 700)
- **Mono**: JetBrains Mono

### Hierarchy
| Role | Weight | Tracking | Case |
|------|--------|----------|------|
| Hero headline | 700 (bold) | tight | Sentence case |
| Section heading | 700 (bold) | tight | Natural case |
| Eyebrow label | 400 (regular) | 0.12em | UPPERCASE |
| Nav links | 600 (semibold) | 0.08em | UPPERCASE |
| Body text | 400 (regular) | normal | Sentence case |
| Metric values | 700 (bold, mono) | normal | Natural |

### Principles
- Sentence case for all body text and headings — premium, readable
- Uppercase reserved for micro-labels: eyebrows, nav links, badges
- No global text-transform rules — case is applied per-component

## 4. Component Stylings

### Glass Card
- Background: `rgba(255, 255, 255, 0.03)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Border radius: `16px`
- Backdrop filter: `blur(20px)`
- Hover: lift with subtle border brightening

### Ghost Button
- Background: `rgba(240, 240, 250, 0.1)` (primary) / transparent (outline)
- Border: `1px solid rgba(240, 240, 250, 0.35)` (primary) / `rgba(240, 240, 250, 0.2)` (outline)
- Border radius: `12px`
- Padding: `18px` vertical, `24px` horizontal

### Eyebrow Label
- Font size: `0.75rem` (12px)
- Letter spacing: `0.12em`
- Text transform: uppercase
- Color: muted (`rgba(240, 240, 250, 0.5)`)

### Section Heading
- Supports optional eyebrow prop
- 3xl/4xl responsive sizing, bold weight, tight tracking

### Section Dividers
- Horizontal gradient line: `from-transparent via-[rgba(255,255,255,0.06)] to-transparent`

## 5. 3D Project Carousel

The homepage features an interactive 3D carousel built with CSS 3D transforms and Motion (framer-motion).

### Desktop (md+)
- Perspective: `1200px`
- Cards arranged in circular arc using `rotateY` + `translateZ`
- Active card: full scale, full opacity, tech stack visible
- Adjacent cards: scaled down, reduced opacity, backdrop blur
- Navigation: arrow buttons, dot indicators, click-to-select, keyboard arrows
- Auto-rotation: 5s interval, pauses on hover

### Mobile (<md)
- Horizontal scroll snap container
- Full-width cards with native swipe
- Dot indicators below

## 6. Background Shader

The WebGL shader renders a subtle atmospheric effect:
- Layered simplex noise creating organic movement
- Dark navy to warm charcoal color range
- Very slow animation (0.06x time multiplier)
- Gentle mouse-following light bloom
- Vignette effect
- Film grain texture
- Purpose: barely perceptible atmospheric depth, not a visible effect

## 7. Layout Principles

### Spacing
- Section padding: `py-32 sm:py-40` (generous breathing room)
- Content max-width: `max-w-6xl` (standard) / `max-w-4xl` (blog)
- Section headings margin: `mb-14`

### Responsive Breakpoints
- Mobile: < 768px (carousel → scroll snap, grid stacking)
- Tablet: 768px-1024px
- Desktop: 1024px+

## 8. Do's and Don'ts

### Do
- Use sentence case for headings and body text
- Use uppercase only for eyebrow labels, nav links, and tech badges
- Use glass-card surfaces for interactive cards
- Maintain generous whitespace between sections
- Use subtle gradient dividers between sections
- Keep animations smooth and restrained (300-600ms)

### Don't
- Don't apply global text-transform: uppercase
- Don't use heavy shadows or bright colors
- Don't make the background shader visually prominent
- Don't use border-radius larger than 16px on cards (no pills)
- Don't use fast animations (<150ms) — they feel cheap
