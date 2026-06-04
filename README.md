# Jastipku Upgrade Workspace

This workspace is the upgrade path for the Jastipku platform.

It is organized as three product repos under one local workspace:

- `jastipku-api` for the backend API
- `jastipku-web` for the customer and traveler web app
- `jastipku-admin` for the admin panel

The target stack is:

- NestJS + TypeScript for the API
- PostgreSQL + Prisma for persistence
- Redis for cache and background jobs
- Next.js App Router for both web frontends
- Tailwind CSS for the customer and traveler app
- shadcn/ui for the admin panel
- Docker Compose for local orchestration

## Current Status

The workspace now has project docs, a backend API scaffold, two Next.js frontends, and a local Compose topology.

## Local Structure

- `jastipku-api/`
- `jastipku-web/`
- `jastipku-admin/`
- `compose.yaml` as the local runtime entrypoint

## Start Here

- Read [`docs/doc-index.md`](docs/doc-index.md) for the routing map.
- Read [`docs/project-brief.md`](docs/project-brief.md) for product scope.
- Read [`docs/architecture-decision-record.md`](docs/architecture-decision-record.md) for the current stack and topology decision.
- Read [`docs/database-schema.md`](docs/database-schema.md) for the current data model direction.

## Assumptions to Validate

- The API remains the system of record for auth, payments, order state, and admin actions.
- Monetary values are stored as fixed-precision decimals, not floats.
- Local development will use Docker Compose once the runtime lane is scaffolded.
- The web and admin apps will stay as separate Next.js applications rather than a shared front-end monorepo package.

## Local Setup

1. Install dependencies inside each app directory.
2. Copy the relevant `.env.example` files to `.env` where needed.
3. Start the services with `docker compose up --watch` when Docker is available.
4. Run the apps directly for local development when you do not need the full Compose stack.

## Useful Commands

- Workspace validation: `npm run validate`
- API: `cd jastipku-api && npm run start:dev`
- Web: `cd jastipku-web && npm run dev`
- Admin: `cd jastipku-admin && npm run dev`
- Compose: `docker compose up --watch`

## Validation Notes

- Docker validation is blocked in this WSL environment because the Docker CLI is unavailable.
- The source trees were checked with workspace diagnostics and diff hygiene after each major scaffold step.
- The root package.json now exposes the repo-wide validation script expected by the project instructions.
