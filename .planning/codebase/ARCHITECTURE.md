# Architecture

**Analysis Date:** 2026-09-03

## Overview

The project is a single React/Vite application rendered in the browser and prerendered for production. Pages are feature modules composed from reusable UI and design-system layers.

## Entry points and routing

- `src/main.tsx` hydrates prerendered markup when present or mounts React for client-only navigation.
- `src/entry-server.tsx` supplies server rendering to `scripts/prerender.mjs`.
- `src/app/App.tsx` reads the current route and selects home, destination, modality, analysis, thank-you, and supporting views.
- `src/lib/seo.ts` sets page metadata; destination pages pass title, description, and canonical path from their configuration.

## Feature composition

- `src/features/home/HomePage.tsx` is the primary site composition and uses shared components such as `PetLuxoSection` and `ModalityRail`.
- `src/features/destinations/DestinationUnitedStatesPage.tsx` defines the reusable `DestinationPage` shell, analysis modal state, CTA source attribution, and section order.
- `src/features/destinations/destination-content.ts` is the content boundary for destination LPs. Adding a destination should primarily add configuration, not duplicate the page shell.
- `src/features/destinations/sections/` owns the individual landing-page sections; each section receives only the destination data or callbacks it needs.

## UI and state flow

- `src/components/ui/analysis-modal.tsx` hosts the diagnostic flow shared by CTAs.
- Destination CTAs call `startPlanning(placement)` in the page shell, which stores the analytics source and opens the modal with the route context.
- `src/components/ui/diagnostic-flow.tsx` gathers route, time, pet, and lead data, then invokes the lead contract and analytics events.
- Local React state is used for modal visibility, route inversion, selected period, video sound, and interactive rails. There is no global application store.

## Styling layers

- `src/tailwind.css` is the base stylesheet.
- `src/design-system/` defines tokens, primitives, shared components, and shared button styling.
- Feature styles live beside their feature, such as `src/features/destinations/destinations.css` and `src/features/home/home.css`.
- `src/main.tsx` imports the stylesheets globally, so selectors must remain scoped to avoid cross-page collisions.

---

*Architecture analysis: 2026-09-03*
