# Project Brief

## Product Summary

Jastipku is a domestic purchase-assistance platform that connects customers who want items bought with travelers who can purchase and carry those items on a trip.

## Primary Actors

- Customer: searches for travelers, creates orders, pays for orders, tracks fulfillment, and leaves reviews.
- Traveler: publishes trips, receives order requests, updates order status, and requests withdrawals.
- Admin: verifies traveler profiles, resolves order or payment issues, and processes withdrawal requests.

## Delivery Goals

- Support a safe order flow from discovery to settlement.
- Keep payment, escrow, and withdrawal handling auditable.
- Provide separate customer/traveler and admin experiences.
- Keep the backend authoritative for business rules and external integrations.

## Scope

### In scope

- Authentication and role-based access control
- Traveler verification
- Trip publishing and discovery
- Order creation, acceptance, fulfillment, and completion
- Payment reconciliation through Xendit webhooks
- Withdrawal requests and admin approval
- Chat tied to an order
- Admin management screens for key operational tasks

### Out of scope for the first bootstrap pass

- Multi-country currency support
- Marketplace search ranking optimization
- Advanced analytics warehouse
- Native mobile applications

## Constraints

- The API, web app, and admin app stay as separate top-level repos.
- PostgreSQL is the source of truth for transactional data.
- Redis supports cache and background work, not business state.
- Monetary values must use fixed-precision storage, not floats.
- Real-world timestamps must be stored in UTC.

## Assumptions to Validate

- Jastipku will launch with a single currency first, likely IDR.
- Traveler verification is admin-reviewed rather than fully automatic.
- Customer and traveler chat is scoped per order.
- The admin panel is internal-only and does not need public marketing pages.
