# Database Schema

## Persistence Rules

- PostgreSQL is the source of truth.
- Prisma is the schema and migration tool.
- Monetary values use fixed-precision decimals, not floats.
- Currency codes live on money-bearing rows.
- Real-world moments are stored in UTC.
- Core commerce, payment, and audit records are retained rather than deleted.

## Core Entities

### User

- Represents all platform users.
- Fields: id, email, name, password hash, role, profile photo URL, balance, average rating, created at, updated at.
- Relations: traveler profile, trips, orders as customer, orders as traveler, withdrawals, reviews, chat messages, transactions.

### TravelerProfile

- Holds traveler verification and bank details.
- One-to-one with User.
- Fields: identity number, identity image URL, bank name, bank account number, bank account name, verification status, verified at, rejection reason.

### Trip

- Represents a traveler’s journey plan.
- Fields: traveler, origin city, destination city, departure date, arrival date, description, created at, updated at.
- Indexes should support traveler lookup and departure-date filtering.

### Order

- Represents a purchase assistance request.
- Fields: customer, traveler, trip, status, total item price, service fee, shipping fee, total amount, currency code, shipping address, tracking number, created at, updated at.
- Relations: items, payment, review, chat messages.

### OrderItem

- Represents an individual product inside an order.
- Fields: order, product name, product URL, quantity, estimated price, product image URL, notes.

### Payment

- Represents the invoice and its state.
- Fields: order, Xendit invoice ID, amount, currency code, status, payment method, paid at, created at.
- Has payment logs for webhook history.

### PaymentLog

- Stores raw webhook payloads and status snapshots from Xendit.
- Fields: payment, raw response, status, created at.

### Withdrawal

- Represents a traveler’s payout request.
- Fields: traveler, amount, currency code, status, processed at, rejection reason, transaction reference, created at.

### Transaction

- Appends audit records for money movement.
- Fields: user, type, amount, currency code, description, related order, created at.
- Represents payment in, payment out, platform fee, withdrawal, and revenue entries.

### Review

- Represents one review per order.
- Fields: order, reviewer, receiver, rating, comment, created at.

### ChatMessage

- Stores order-scoped chat messages.
- Fields: order, sender, message, created at.

## Relationship Notes

- `TravelerProfile.userId` is unique.
- `Order.payment` is one-to-one.
- `Order.review` is one-to-one.
- `Withdrawal.transactionId` is optional and unique.
- `OrderItem` and `ChatMessage` are one-to-many children.

## Index and Query Notes

- Add indexes for `Trip(travelerId, departureDate)` and `Trip(destinationCity, departureDate)` if search requires it.
- Add indexes for `Order(customerId, createdAt)` and `Order(travelerId, status, createdAt)`.
- Add a unique index for `Payment.xenditInvoiceId`.
- Add an index for `Withdrawal(travelerId, status, createdAt)`.
- Add an index for `ChatMessage(orderId, createdAt)`.

## Delete Semantics

- Financial and order history should be retained.
- Cancellation and refund flows are represented by status changes.
- User-profile cleanup may be handled separately during early bootstrap, but commerce records should not disappear from audit history.

## Assumptions to Validate

- Currency will start as IDR, but the schema keeps the currency code explicit.
- Balance is stored as a decimal value until a ledger model is introduced.
- Soft-delete may be added later for user-facing entities, but not as the default persistence model.
