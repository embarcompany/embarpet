# Codebase Structure

**Analysis Date:** 2026-09-03

## Root files

- `package.json` defines Vite development and the combined typecheck, client build, SSR build, and prerender production build.
- `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, and `postcss.config.cjs` configure compilation.
- `vercel.json` configures deployment rewrites and static-asset caching.
- `public/` contains the production images, videos, logos, flags, and social assets consumed by root-relative paths.

## Source layout

- `src/app/` — application routing and route-level selection.
- `src/components/ui/` — reusable interaction-heavy UI: navigation, footer, analysis modal, diagnostic flow, buttons, shared PetLuxo section, and visual helpers.
- `src/design-system/` — design tokens, React primitives, icons, reusable patterns/components, and their styles.
- `src/features/` — page-level modules grouped by product area: `home`, `destinations`, `modalities`, `analysis`, `thank-you`, and `buttons`.
- `src/data/` — airport index, airport search helpers, and curated city data.
- `src/lib/` — small shared utilities for analytics, SEO, country flags, and class names.
- `src/i18n/` — locale provider and path helpers.
- `src/hooks/` — reusable suggestion hooks.

## Destination landing-page locations

- `src/features/destinations/destination-content.ts` — typed destination configuration and page registry.
- `src/features/destinations/DestinationUnitedStatesPage.tsx` — page shell and analysis orchestration.
- `src/features/destinations/sections/` — independently maintained LP sections.
- `src/features/destinations/destinations.css` — destination-specific layout, responsive rules, and component overrides.

## Naming conventions

- React components use PascalCase filenames and named exports.
- Hooks use `use-` filename prefixes and `useX` exports.
- Feature CSS classes are scoped with `ep-` and a feature prefix such as `ep-us-` or `ep-home-`.
- Static files use descriptive `embarpet-*` names in `public/`.

---

*Structure analysis: 2026-09-03*
