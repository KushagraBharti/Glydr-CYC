# Glydr MVP

Minimal Glydr profile-platform replatform.

## Stack

- `frontend/`: React + Vite + React Router
- `backend/`: Fastify + JSON-file persistence
- `packages/shared/`: shared contracts and UI-facing types

## Local Development

1. Copy `.env.example` to `.env` if you want to override defaults.
2. Install dependencies with either:
   `npm install`
   `bun install`
3. Start local development with either:
   `npm run dev`
   `bun run dev`

`npm` is the recommended path on Windows + OneDrive. `bun` support is kept for other environments.

Frontend runs on `http://localhost:5173`.
Backend runs on `http://localhost:3001`.

## MVP Scope

- Homepage, game page, profile detail page, and import success flow
- Local JSON-backed repositories with seeded data
- Stub auth plus a local-only `Ctrl+K` auth bypass

## TODO

- Replace JSON repositories with Postgres + Drizzle
- Replace stub auth with real identity providers
- Add Railway deployment config for backend
- Add Vercel deployment config for frontend
- Implement real Control Panel handoff and compatibility scoring
