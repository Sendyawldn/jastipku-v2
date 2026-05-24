# Architecture Decision Record

## Decision

Use three separate application repositories under this workspace:

- `jastipku-api`: NestJS API
- `jastipku-web`: Next.js App Router app for customers and travelers
- `jastipku-admin`: Next.js App Router app for administrators

Use PostgreSQL with Prisma for persistence and Redis for cache plus background jobs. Use Docker Compose as the local development orchestrator.

## Context

The product has three distinct user experiences and several operational boundaries:

- customer browsing and ordering
- traveler trip and order management
- admin review, verification, and financial operations

The data model includes commerce records, payment reconciliation, withdrawals, and chat. Those flows need a backend that owns business rules and integrations.

## Rationale

- Separate repos reduce coupling between the public apps and the backend.
- NestJS fits the API side because the domain has clear modules, guards, decorators, and integration boundaries.
- Next.js App Router fits both frontends because they need SSR-friendly, route-driven product surfaces.
- Prisma fits the persistence layer because the schema is central and the domain is relational.
- Redis is the right fit for cache and asynchronous jobs without moving business state out of PostgreSQL.

## Consequences

- Shared contracts need explicit documentation because the apps no longer share one codebase by default.
- UI state and API state must be synchronized through clear contracts rather than implicit coupling.
- Monetary and order-state changes must be audited carefully because the platform handles settlement.

## Alternatives Considered

### Single monolith repo

Rejected because the admin, customer, traveler, and API concerns would grow together and make deployment and ownership harder.

### One Next.js app with backend routes only

Rejected because the API boundary would be too weak for the payment and workflow complexity in this domain.

### Admin panel library product

Rejected because the admin panel needs product-specific operational flows, not a generic external shell.

## Assumptions to Validate

- The three repos will remain independently deployable.
- The API will expose cookie-based auth for browser clients.
- Background jobs will be added only for work that can safely run asynchronously.
- Local Docker orchestration will be added once source scaffolds exist.
