# Technology Stack

**Analysis Date:** 2026-09-03

## Languages

**Primary:**
- TypeScript 5.7+ (resolved locally to 5.9.3) - React application, design-system components, browser utilities, and Vite configuration in `src/**/*.ts`, `src/**/*.tsx`, and `vite.config.ts`.
- CSS - Tailwind entry styles and component/page styling in `src/tailwind.css`, `src/design-system/*.css`, and `src/features/**/*.css`.

**Secondary:**
- JavaScript (ES modules) - Node build and prerender scripts in `scripts/prerender.mjs` and `scripts/build-airport-index.mjs`.
- JSON - generated airport data in `src/data/airports.global.json`, package lock data in `package-lock.json`, and deployment routing/header configuration in `vercel.json`.
- HTML - Vite template and SEO/schema markup in `index.html`.

## Runtime

**Environment:**
- Node.js - local development environment reports `v24.15.0`; no Node engine, `.nvmrc`, or `.node-version` is committed. Node executes Vite and both `.mjs` scripts through `package.json`.
- Modern browser - application targets DOM, DOM Iterable, and ES2022 APIs through `tsconfig.json`.

**Package Manager:**
- npm 11.12.1 in the current development environment.
- Lockfile: present as `package-lock.json` (lockfile version 3). Use `npm install` to reproduce the resolved dependency tree.

## Frameworks

**Core:**
- React 19 (`react`, `react-dom`) - client rendering/hydration in `src/main.tsx`; server string rendering in `src/entry-server.tsx`.
- Vite 6 - development server and production bundling, configured in `vite.config.ts`.
- Tailwind CSS 3 - utility processing for `src/**/*.{ts,tsx}`, configured by `tailwind.config.ts` and `postcss.config.cjs`.

**Testing:**
- Not detected - `package.json` has no test script and no Jest, Vitest, Playwright, Cypress, or test configuration files are present.

**Build/Dev:**
- TypeScript - strict, no-emit static type checking in the `npm run build` command and compiler rules in `tsconfig.json`.
- `@vitejs/plugin-react` - React JSX development/build transform dependency.
- PostCSS with Autoprefixer - CSS pipeline configured in `postcss.config.cjs`.
- Custom static-site prerenderer - `scripts/prerender.mjs` renders React routes via the SSR bundle and writes locale/SEO-specific HTML under `dist/`.

## Key Dependencies

**Critical:**
- `react` and `react-dom` `^19.0.0` - component runtime, browser hydration, and `renderToString` SSR used by `src/main.tsx` and `src/entry-server.tsx`.
- `lucide-react` `^1.31.0` - functional icon library used throughout `src/components/ui/` and `src/features/`.
- `clsx` `^2.1.1` and `tailwind-merge` `^3.6.0` - class composition through `cn` in `src/lib/utils.ts`.

**Infrastructure:**
- `vite` `^6.0.0` and `@vitejs/plugin-react` `^4.3.4` - local development and production/SSR bundles.
- `typescript` `^5.7.2`, `@types/react`, and `@types/react-dom` - static typing for `src/`.
- `tailwindcss` `^3.4.17`, `postcss` `^8.5.26`, and `autoprefixer` `^10.5.4` - CSS compilation pipeline.

## Configuration

**Environment:**
- `.env.local` is present for local environment configuration; its contents are not inspected. The only declared browser-exposed variable is optional `VITE_GOOGLE_MAPS_API_KEY` in `src/vite-env.d.ts`, consumed by `src/data/airport-search.ts` to enable Google Places.
- Keep browser-safe values only in `VITE_*` variables: Vite embeds them in the client bundle. Configure the Google Maps key in Vercel as documented by `GOOGLE_PLACES_SETUP.md`, restricted to Embarpet domains.
- No backend-specific environment configuration is implemented in this repository. `README.md` documents the future `/api/public/leads` endpoint separately from this static frontend.

**Build:**
- `package.json` defines `npm run dev` as `vite`.
- `package.json` defines `npm run build` as TypeScript validation, Vite client build, Vite SSR build of `src/entry-server.tsx`, then `scripts/prerender.mjs`.
- `tsconfig.json` enforces strict TypeScript, ES2022 targets, bundler resolution, React JSX transform, and no emitted JavaScript.
- `vite.config.ts` sets the static asset directory to `public/`.
- `tailwind.config.ts` defines the Embarpet color, typography, radius, and content-scan configuration; `postcss.config.cjs` activates Tailwind and Autoprefixer.
- `vercel.json` provides immutable-cache headers for static assets and SPA rewrites for supported language, analysis, destination, and thank-you routes.

## Platform Requirements

**Development:**
- Install dependencies with npm, then use `npm run dev` for the Vite application. A current Node LTS-compatible runtime is required; this workspace currently uses Node `v24.15.0` but does not pin a version.
- Network access is needed only when optional browser integrations or data refresh tooling run: Google Maps/Places at runtime and OurAirports data fetches from `scripts/build-airport-index.mjs`.

**Production:**
- Static assets and prerendered pages are built into `dist/`; `vercel.json` indicates Vercel hosting with SPA rewrites and long-lived static-asset cache headers.
- The optional Google Places flow requires a Vercel `VITE_GOOGLE_MAPS_API_KEY` deployment variable; local airport suggestions still work from `src/data/airports.global.json` without it.

---

*Stack analysis: 2026-09-03*
