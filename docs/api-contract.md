# API Contract

## Contract Principles

- The API is the system of record for auth, orders, payments, withdrawals, and admin actions.
- Browser clients use secure HTTP-only cookies for session or JWT transport.
- Role-based access control is enforced at the API boundary.
- Mutations that cross money or state boundaries must be idempotent where a retry is plausible.

## Health Endpoints

- `GET /health/live` for process liveness
- `GET /health/ready` for readiness, including critical dependencies

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

## Users and Profiles

- `GET /users/me`
- `PATCH /users/me`
- `POST /traveler-profile`
- `GET /traveler-profile/me`

## Trips

- `GET /trips`
- `POST /trips`
- `GET /trips/:id`
- `PATCH /trips/:id`
- `DELETE /trips/:id`

## Orders

- `POST /orders`
- `GET /orders`
  - Query parameters: `limit` defaults to `20` and has a maximum of `50`; `cursor` is the previous page's `pageInfo.nextCursor`.
  - Response shape: `{ data: Order[], pageInfo: { limit, nextCursor, hasNextPage } }`.
  - Empty state: returns an empty `data` array with `hasNextPage: false` and `nextCursor: null`.
- `GET /orders/:id`
- `PATCH /orders/:id/accept`
- `PATCH /orders/:id/reject`
- `PATCH /orders/:id/status`
- `PATCH /orders/:id/confirm-received`

## Payments

- `POST /payments/orders/:orderId/invoice`
- `GET /payments/:orderId`
- `POST /webhooks/xendit`

## Withdrawals

- `POST /withdrawals`
- `GET /withdrawals`
- `PATCH /admin/withdrawals/:id/approve`
- `PATCH /admin/withdrawals/:id/reject`

## Chat

- `GET /orders/:orderId/messages`
- WebSocket namespace or gateway for real-time order chat

## Admin

- `GET /admin/users`
- `GET /admin/travelers`
- `PATCH /admin/travelers/:id/verify`
- `PATCH /admin/travelers/:id/reject`
- `GET /admin/orders`
- `GET /admin/payments`

## Common Response Rules

- Use a consistent error envelope with a machine-readable code, message, and validation details when present.
- Pagination must be explicit on list endpoints that can grow.
- Webhook handlers must acknowledge valid events idempotently.
- Financial responses must include currency and amount precision consistently.

## Assumptions to Validate

- Exact route naming may change once the NestJS module layout exists.
- The final error envelope shape will be standardized after the first backend scaffold.
- Pagination style will be cursor-based for large lists and may be offset-based for bounded admin views.
