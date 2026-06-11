# Jastipku UI Design System

### Anchor
Financial-Infrastructure & Modern Logistics: Borrowing the precision and atmospheric gradient mesh of Stripe, using a white canvas with deep navy text and electric indigo accents to project absolute trust, speed, and premium service.

### Tokens
- **Typography**: 
  - Display/Body: Inter (weights 300, 400), scale base 15px, ratio 1.25. `ss01` feature enabled globally.
  - Mono/Numerics: Inter with `tnum` (tabular lining) for all pricing and numeric data.
- **Colors**:
  - Primary (Indigo): `oklch(0.45 0.25 285)` / `#533AFD` (CTA, links)
  - Ink (Deep Navy): `oklch(0.2 0.05 250)` / `#0D253D` (Body text, dark surfaces)
  - Canvas (White): `oklch(1 0 0)` / `#FFFFFF` (Default background)
  - Surface Soft: `oklch(0.97 0.01 250)` / `#F6F9FC` (Feature bands)
  - Error (Ruby): `oklch(0.6 0.2 15)` / `#EA2261`
  - Success (Teal): `oklch(0.6 0.15 170)` / `#00C4B5`
- **Spacing**: Base unit 8px (tokens: 4, 8, 12, 16, 24, 32, 64, 96).
- **Radius**: 
  - Small: 6px (inputs)
  - Medium: 12px (cards)
  - Pill: 9999px (buttons)
- **Shadow**: 
  - Level 1: `0 1px 3px rgba(13,37,61,0.08)` (Cards on white)
  - Level 2: `0 8px 24px rgba(13,37,61,0.08), 0 2px 6px rgba(13,37,61,0.04)` (Floating panels)
- **Motion**: Duration 300ms, easing `cubic-bezier(0.25, 1, 0.5, 1)`, explicit reduced-motion fallback.

### Constraints
- WCAG 2.2 AA floor for all text and interactive elements.
- Ensure all user-supplied input is sanitized, all status indicators have non-color alternatives, and all interactive elements have visible focus states.
- **Anti-patterns**: 
  1. No pure black (`#000000`) text; use Ink.
  2. No generic boxy buttons; CTAs must be tight pills.
  3. No flat color blocks for heroes; require atmospheric gradient mesh.

### Previous Directions
- "Premium Secure Courier & Vault" (Dark theme)
- "Airline Luggage Tag & Waybill Manifest" (Brutalist)
