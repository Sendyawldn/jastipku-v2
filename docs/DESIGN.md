# Design Contract

## UI Direction

The product should feel like a custody ledger tied to travel, not a generic dashboard shell.

The customer app needs discovery, trust, and transaction clarity. The admin panel needs operational density and evidence. The traveler experience needs compact task progression and status changes.

## Conceptual Anchor

- Anchor reference: custody chain ledger for trip-based purchases
- Real-world signal: stamped travel manifests, receipt packets, and settlement trails

## Motion and Palette Decision

- Motion: progression should feel like documents moving through a controlled handoff, with status transitions that expand from compact rows into focused detail views.
- Palette: warm paper neutrals, graphite text, teal trust accents, ember risk accents, and olive progress accents.
- Typographic contrast: section headings should feel editorial and decisive; body copy should stay neutral, compact, and highly legible.

## Derived Token Logic

- Use a calm surface base so status colors remain legible.
- Use strong semantic colors for verification, payment, warning, and failure states.
- Keep radius, spacing, and borders restrained on admin surfaces, but allow more spatial breathing room in the customer and traveler app.
- Use layout changes between mobile and desktop rather than shrinking the same composition.

## Design Flexibility Policy

- Lock product goals, accessibility, and interaction requirements.
- Keep exact font families, radii, shadows, and final palette values open until the UI implementation pass.
- Avoid generic dashboard composition, empty wallpaper texture, and copy-pasted component-kit skins.

## AI-Safe UI Audit

- Reject generic admin chrome.
- Reject dashboard card grids that could belong to any product.
- Reject decoration without a named interaction or information function.
- Keep state changes visible for loading, empty, error, success, and stale data.

## Design Execution Policy

- Confirm the anchor before implementation.
- Derive the composition from workflow, not from library defaults.
- Keep mobile-first ordering different from desktop grouping when the flow benefits.

## Design Execution Handoff

- Customer app: discovery and order creation should be the primary narrative.
- Traveler app: trip management and fulfillment should dominate the first view.
- Admin app: verification, financial review, and exception handling should be the first-class paths.

## Review Rubric

- Three product-specific signals must be visible at a glance.
- The layout should not rename cleanly into another product category.
- Interaction states must remain understandable without color alone.

## Context Hygiene

- Use current repo evidence, current brief, and current docs.
- Do not reuse old project visual memory unless the user asks for continuity.
- Keep research vocabulary inside the contract and out of end-user copy.
