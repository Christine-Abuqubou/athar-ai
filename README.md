# ATHAR AI | Jerusalem Through Time

ATHAR AI is a full-stack cultural heritage experience for exploring Jerusalem through **Place × Time × Story**. This repository contains the working WebDev project, seeded Jerusalem heritage content, a responsive public experience, a server-side tRPC contract for heritage data and AI-ready Q&A, and a regression test suite.

## What is included

The application includes a cinematic homepage, bilingual-ready language switch affordance, three seeded Jerusalem heritage sites, responsive exploration cards, an interactive heritage map view, period timeline, personalized route builder, source-aware Ask ATHAR interface, Heritage Passport and badges, historical transparency labels, a mobile-first camera scanning experience, and dedicated site detail experiences for Live in the Past, Hear Its Story, Read History, and Ask ATHAR.

The initial sites are the Dome of the Rock, the City of David, and the Old City Walls. The app uses uploaded Jerusalem heritage imagery stored through the project storage layer. Image sources were collected during the build from public heritage-image search results; review and replace media according to your final licensing requirements before public launch.

## Run locally

Requirements: Node.js 22 or newer, pnpm 10 or newer, and a MySQL/TiDB-compatible database if you want to persist users and extend the database-backed features.

```bash
pnpm install
cp .env.template .env
# Fill DATABASE_URL and the other values for your environment.
pnpm dev
```

The dev server runs on port `3000` by default. For a production build:

```bash
pnpm check
pnpm test
pnpm build
pnpm start
```

If you connect a database and change `drizzle/schema.ts`, generate and apply migrations with:

```bash
pnpm db:push
```

## Environment variables

The WebDev scaffold expects the following server-side values. Never commit real secrets.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MySQL/TiDB connection string |
| `JWT_SECRET` | Session signing secret |
| `VITE_APP_ID` | Manus OAuth application ID |
| `OAUTH_SERVER_URL` | OAuth backend URL |
| `VITE_OAUTH_PORTAL_URL` | Browser login portal URL |
| `BUILT_IN_FORGE_API_URL` | Server-side Manus built-in API gateway |
| `BUILT_IN_FORGE_API_KEY` | Server-side built-in API key |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend built-in API URL, if needed |
| `VITE_FRONTEND_FORGE_API_KEY` | Frontend built-in API key, if needed |

## Project map

`client/src/pages/Home.tsx` contains the public product experience and its page-level feature views. `client/src/index.css` contains the visual system and responsive layouts. `server/routers.ts` contains the auth, heritage, route generation, passport, and Ask ATHAR procedures. `server/heritage.test.ts` covers the seeded heritage contracts. Uploaded visual assets are referenced from `/manus-storage/...` paths and should not be copied into `client/public`.

## Adding another heritage site

Add a site object to the seeded list in `client/src/pages/Home.tsx` for the frontend preview and to the corresponding list in `server/routers.ts` for server responses. Include a stable slug, English and Arabic names, a period backed by evidence, a category, location, verified fact, and a storage-backed image path. For a production CMS, move these records into the database schema and admin workflow rather than keeping them in source code.

## AI, RAG, and computer vision status

The product surface is intentionally transparent. Camera recognition currently runs as a clearly labeled **DEMO MODE** prototype with a replaceable flow; it never claims simulated recognition is live computer vision. Ask ATHAR currently returns a source-aware seeded response through a server-side procedure contract. To connect live RAG, add retrieval against your historical knowledge base and pgvector-compatible embeddings (or adapt the included MySQL/TiDB scaffold to your chosen vector store) before calling an LLM. Keep the existing `VERIFIED FACT`, `HISTORICAL INTERPRETATION`, `AI-GENERATED RECONSTRUCTION`, and `MACHINE TRANSLATION` labels in the experience.

## Tests and verification

The project currently passes the Vitest suite, TypeScript checks, and the production build. The responsive camera, site detail, route, Ask ATHAR, Passport, and map flows were visually verified at desktop and mobile sizes. See `verification-notes.md` for the handoff record.

## License and media review

This project code is provided as a working implementation handoff. Before a public launch, review the rights and attribution requirements for every image, audio track, video, document, and historical source you upload. Replace any search-sourced image with an appropriately licensed or institution-provided asset where necessary.

## Al-Aqsa Mamluk documentary

The supplied `mamluk-jerusalem-documentary(1).mp4` is integrated into the Al-Aqsa in Mamluk Jerusalem site experience at `/site/al-aqsa-mamluk`. Open **Live in the past** to play the documentary, then switch between the Mamluk period, approximately 100 years ago (`c. 1926`), and approximately 1 year ago (`c. 2025`) comparison lenses. The documentary is a supplied media asset; the comparison lenses are clearly labeled as historical comparison views rather than exact archival footage.
