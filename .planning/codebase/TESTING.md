# Testing and Verification

**Analysis Date:** 2026-09-03

## Current automated coverage

- No dedicated test runner is configured in `package.json`.
- No Jest, Vitest, Playwright, Cypress, or unit-test files were detected in the repository.
- The primary automated gate is TypeScript compilation through `npx tsc --noEmit`.

## Build verification

- `npm run build` is the production integration check.
- It runs TypeScript validation, a Vite browser build, an SSR bundle from `src/entry-server.tsx`, and `scripts/prerender.mjs`.
- The build output should be reviewed for unexpected failures; existing Vite warnings about ignored `"use client"` directives and large chunks are warnings, not current build failures.

## Manual acceptance areas

- Verify all CTA placements open the intended analysis modal and preserve route context in `src/components/ui/analysis-modal.tsx`.
- Verify desktop and mobile breakpoint behavior for destination sections, especially horizontally scrolling rails and comparison cards.
- Verify prerendered routes and metadata after changing `src/app/App.tsx`, `src/lib/seo.ts`, or destination configurations.
- Verify optional Google Places behavior with and without `VITE_GOOGLE_MAPS_API_KEY`; local airport search must remain available.

## Recommended next additions

- Add Vitest for pure utilities such as `src/lib/country-flag.ts`, locale path transformations, lead-payload normalization, and airport-search matching.
- Add component tests for modal opening/source attribution and destination route prefill.
- Add Playwright smoke tests for critical landing-page CTAs, modal submission, and no-horizontal-overflow mobile assertions.

## Test placement proposal

- Keep unit tests colocated as `*.test.ts` / `*.test.tsx` beside pure modules.
- Keep browser flows in a top-level `e2e/` directory if Playwright is introduced.

---

*Testing analysis: 2026-09-03*
