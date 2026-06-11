# Jastipku UI Design System & Intent

## 1. Design Intent and Product Personality
Jastipku is a peer-to-peer delivery network built on trust and clear coordination. It is not an abstract e-commerce store; it is a human-driven logistics network. The personality is **Reliable, Structured, and Official**, prioritizing clear state communication over soft lifestyle aesthetics.

## 2. Audience and Use-Context Signals
- **Customer**: High stakes (trusting a stranger with money and goods). Needs absolute transparency on status and whereabouts.
- **Traveler**: Task-oriented. Needs clear instructions, easy-to-read manifests, and quick updates.
- **Context**: Glance-and-go on mobile devices at airports, malls, or during transit.

## 3. Visual Direction: Airline Luggage Tag & Waybill Manifest
We are adopting the visual language of physical logistics artifacts: the **Luggage Tag** and the **Waybill Manifest**.
- **Why?** It immediately communicates physical transfer, clear routing, identity verification, and structured data, completely escaping the generic "SaaS dashboard" or "lifestyle e-commerce" traps.

## 4. Color, Typography, Spacing, and Density
- **Color**: High-contrast monochrome (Ink Black `#111` on Paper White `#F9F9F9`) to mimic printed manifests. A single vibrant "Highlighter" color (e.g., Neon Orange `#FF5500` or Highlighter Yellow) used sparingly for critical status stamps and primary actions.
- **Typography**: 
  - *Display/Headers*: A bold, condensed Grotesk (e.g., Anton, Oswald, or Inter Tight) for routing cities (e.g., `CGK → NRT`) and prices.
  - *Data/Metadata*: A Monospace font (e.g., JetBrains Mono, Roboto Mono) for order IDs, dates, weights.
  - *Body*: Clean Sans-serif (Inter) for conversational text.
- **Spacing/Density**: Structured with hard lines/borders (1px solid black) instead of drop shadows. High density for data tables, modular grids.

## 5. Token Architecture
- Uses OKLCH for predictable lightness curves.
- `surface-base`, `surface-manifest`, `ink-primary`, `ink-secondary`, `highlight-marker`.
- Hard borders (`border-ink`) replace soft elevation shadows.

## 6. Responsive Recomposition
- **Mobile**: Single-column manifest. Sticky bottom action bar for status updates.
- **Desktop**: Split-pane view. Left pane: Trip routing/details. Right pane: Order manifest list.

## 7. Motion, Interaction, and Feedback
- **Signature Motion**: Mechanical unfolding (like a receipt printing out) for expanding details.
- **Feedback**: "Stamping" impact animations when a status changes (e.g., `PENDING` stamped to `COMPLETED` with a slight scale-down impact).

## 8. Component Morphology
- **Cards**: Sharp corners (0px or 2px radius), 1px solid dark borders. No drop shadows. Looks like a printed ticket or tag.
- **Buttons**: Blocky, full-width on mobile, high-contrast hover states.
- **Dividers**: Dashed or dotted lines mimicking tear-away perforations.

## 9. Context Hygiene & Anti-Patterns
- **Avoid**: Floating glassmorphism cards, soft pastel gradients, rounded pill-shaped buttons everywhere, generic spinner loaders.
- **Avoid**: "SaaS Admin" layouts for the traveler view. It must feel like a task-manifest, not an enterprise dashboard.

## 10. Accessibility Non-Negotiables
- WCAG 2.2 AA Contrast for all text.
- Form inputs must have clear, visible boundaries (no underline-only inputs).
- Visible focus rings (`outline-offset: 2px`) for keyboard navigation.
