# Flow Overview

## Customer Flow

1. Customer registers and signs in.
2. Customer searches available traveler trips by destination and date.
3. Customer opens a trip, reviews traveler details, and creates an order.
4. Customer submits item details, shipping address, and optional product links.
5. The system creates the order and waits for traveler acceptance.
6. After acceptance, the customer pays through the API-created invoice.
7. The traveler updates the order through processing and shipping states.
8. The customer confirms receipt, which completes the order.
9. The customer can leave a review after completion.

## Traveler Flow

1. Traveler registers and submits profile details for verification.
2. Admin verifies the traveler profile before traveler actions are enabled.
3. Traveler creates trips with origin, destination, and travel dates.
4. Traveler receives order requests for matching trips.
5. Traveler accepts or rejects the order.
6. Traveler updates fulfillment status as the order progresses.
7. Traveler requests withdrawal after funds become available.

## Admin Flow

1. Admin signs in to the admin panel.
2. Admin reviews traveler verification requests.
3. Admin investigates payment or order issues.
4. Admin approves or rejects withdrawal requests.
5. Admin reviews audit data from payments, transactions, and order states.

## System Flow Notes

- Payments are initiated by the backend and reconciled by webhook.
- Chat is tied to an order so conversations stay scoped to one transaction.
- Settlement and withdrawal events create audit records.

## Assumptions to Validate

- Order assignment is based on trip matching rules in the API.
- Payment invoice state is the source of truth for payment completion.
- Chat transport will be WebSocket-based, but message persistence remains in PostgreSQL.
