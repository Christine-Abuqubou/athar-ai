# Athar AI verification notes

- Desktop screenshots verified: `/`, `/explore`, `/routes`, `/ask`, `/passport` render with the intended editorial heritage style, real Jerusalem image assets, working navigation affordances, and no visible overflow in the captured viewport.
- Mobile screenshots verified at 390x844: homepage hero, `/scan` demo camera UI, and `/site/dome-of-the-rock` detail view are responsive and readable.
- Camera denial state is explicit: `Camera access is required to scan a site.`
- Demo recognition is explicit: `DEMO MODE · VISUAL RECOGNITION` and result copy explains it is a guided prototype, not live computer vision.
- Regression suite: 5 tests passed across `server/auth.logout.test.ts` and `server/heritage.test.ts`.
- TypeScript check passed and production build passed. Build emitted only a non-blocking chunk-size warning and a runtime-resolved storage asset warning.
