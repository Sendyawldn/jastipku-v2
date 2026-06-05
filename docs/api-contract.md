# API Contract

## Contract Principles

- The API is the system of record for auth, orders, payments, withdrawals, and admin actions.
- Browser clients use secure HTTP-only cookies for session or JWT transport.
- Role-based access control is enforced at the API boundary.
- Role checks do not replace resource ownership checks. Endpoints that mutate user-owned records must add resource-aware authorization before production use.
- Mutations that cross money or state boundaries must be idempotent where a retry is plausible.

## Health Endpoints

- `GET /health/live` for process liveness
- `GET /health/ready` for readiness, including critical dependencies

## Auth

- `POST /auth/register`
- `POST /auth/login`
  - Request body: `{ email, password }`.
  - Success response: `{ user }` and a `Set-Cookie` header for `jastipku_access_token`.
  - Cookie attributes: HTTP-only, path `/`, `SameSite=Lax` by default, and `Secure` when `AUTH_COOKIE_SECURE=true`.
  - Error response: `401` for invalid credentials.
- `POST /auth/logout`
  - Clears the `jastipku_access_token` cookie.
- `GET /auth/me`
  - Requires a valid `jastipku_access_token` cookie.
  - Success response: `{ user: { sub, email, role } }`.

## Users and Profiles

- `GET /users/me`
- `PATCH /users/me`
- `POST /traveler-profile`
- `GET /traveler-profile/me`

## Trips

- `GET /trips`
- `POST /trips`
  - Requires an authenticated `TRAVELER` or `ADMIN` user.
  - Traveler callers cannot choose `travelerId`; the API uses the authenticated user id.
  - Admin callers must provide `travelerId` when creating a trip for a traveler.
- `GET /trips/:id`
- `PATCH /trips/:id`
- `DELETE /trips/:id`

## Orders

- `POST /orders`
  - Requires an authenticated `CUSTOMER` or `ADMIN` user.
  - Customer callers cannot choose `customerId`; the API uses the authenticated user id.
  - Admin callers must provide `customerId` when creating an order for a customer.
  - `travelerId` must match the selected trip's traveler.
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
