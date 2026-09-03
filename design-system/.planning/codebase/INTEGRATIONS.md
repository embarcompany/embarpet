# Integrations

**Analysis Date:** 2026-09-03

## Browser and third-party services

- Google Places is optional and client-side. `src/data/airport-search.ts` reads `VITE_GOOGLE_MAPS_API_KEY` and falls back to the local airport index when it is unavailable.
- The key is declared in `src/vite-env.d.ts`; deployment guidance is in `GOOGLE_PLACES_SETUP.md`. Only browser-safe, restricted `VITE_*` values belong in this static frontend.
- Analytics is centralized in `src/lib/analytics.ts`. UI components call `trackConversionEvent` for CTA, modality, WhatsApp, diagnostic, and thank-you events.
- The lead payload contract is defined in `src/lead-contract.ts`. It posts to a same-origin endpoint (default `/api/public/leads`) and does not implement a backend in this repository.

## Hosted content and links

- Static imagery, videos, logo assets, and social icons are served from `public/` and addressed with root-relative URLs.
- Destination-context photography currently references Unsplash URLs from `src/features/destinations/destination-content.ts`.
- Public outbound links include social networks, media appearances, and partner/credit sites. External links use `target="_blank"` with a `rel` attribute where appropriate.

## Data imports

- `src/data/airports.global.json` is the local search dataset used by airport suggestions.
- `scripts/build-airport-index.mjs` fetches OurAirports country and airport data to regenerate that dataset; it is a maintenance script, not a production runtime dependency.
- `src/data/airport-cities.ts` supplies curated city data alongside the global index.

## Hosting and delivery

- `vercel.json` configures SPA rewrites and cache headers, indicating Vercel static hosting.
- `scripts/prerender.mjs` renders routes with `src/entry-server.tsx` and produces static HTML in `dist/` for the deployed site.

## Integration boundaries

- React views should emit conversion events through `src/lib/analytics.ts`, rather than inventing event names at call sites without updating its contract.
- UI code may consume airport data and browser services, but no repository module should expose secrets: Vite embeds `VITE_*` values in client output.

---

*Integration analysis: 2026-09-03*
