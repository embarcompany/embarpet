# Codebase Concerns

**Analysis Date:** 2026-09-03

## CSS cascade complexity

- Global imports in `src/main.tsx` load home CSS before destination CSS. This enables LP overrides but creates a fragile coupling.
- `src/features/home/home.css` contains global `main > ... { order: ... }` rules. Destination pages must explicitly reset shared-section order, as seen in `src/features/destinations/destinations.css` for modalities and PetLuxo.
- Many long one-line CSS rules make targeted changes and visual regression review harder.

## Testing gap

- The project has no automated unit, component, or end-to-end test suite.
- CTA/modal flow, route prefill, mobile layout, and prerendered SEO are central conversion behaviors but currently rely on manual verification.

## Bundle and performance

- Production builds report a browser JavaScript chunk above Vite's 500 kB warning threshold.
- Several media-heavy sections use video and large imagery. Lazy loading is common but should be audited for first-view payload and mobile performance.
- Dynamic imports are not currently used to split feature-heavy routes or modal code.

## Integration and data risks

- Google Places is client-side and requires a restricted browser key. A misconfigured `VITE_GOOGLE_MAPS_API_KEY` would be public in the bundle.
- The lead endpoint `/api/public/leads` is outside this repository, so client-side changes cannot independently validate backend contracts or delivery outcomes.
- Remote Unsplash images in destination content add external availability and optimization dependencies.

## Destination-scaling risks

- The configuration model in `src/features/destinations/destination-content.ts` is a strong base, but only the United States page is registered today.
- Some destination sections still reference US-oriented assets and copy directly; new countries need a content and SEO checklist before configuration is duplicated.
- Shared components need explicit LP-vs-home CTA behavior, as implemented for modalities and PetLuxo, to avoid accidental outbound navigation on conversion pages.

## Recommended remediation order

1. Add CTA/modal and mobile smoke coverage before multiplying destination pages.
2. Extract or scope global home ordering rules to prevent future LP order collisions.
3. Establish a destination-content schema checklist for metadata, FAQs, route rules, images, and conversion sources.

---

*Concerns analysis: 2026-09-03*
