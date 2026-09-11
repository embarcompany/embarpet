# Code Conventions

**Analysis Date:** 2026-09-03

## TypeScript and React

- TypeScript runs in strict mode through `tsconfig.json`; production builds begin with `tsc --noEmit`.
- Components are function declarations with typed inline props when the type is local, for example in `src/features/destinations/sections/AuthoritySection.tsx`.
- Feature content is data-driven where repetition is expected. `src/features/destinations/destination-content.ts` is the reference pattern for adding destination variants.
- Reusable shared UI belongs in `src/components/ui/` or `src/design-system/`, not copied between home and destination pages.
- Event handlers use explicit names such as `onStartPlanning`, `onToggleRoute`, and `onItemAction`.

## Styling

- Use the established `ep-` CSS namespace and feature-specific prefixes to prevent page-level overrides from leaking.
- Most feature CSS is compact and selector-driven. Append overrides carefully: import order in `src/main.tsx` means later rules can intentionally correct shared home styles for LPs.
- Responsive layout is handled with CSS media queries, primarily at 700px, 800px, and 900px breakpoints.
- Prefer semantic elements (`section`, `article`, `button`, `nav`) according to interaction; non-interactive service cards are articles rather than buttons.

## Copy and CTA behavior

- LP CTAs should open the shared analysis modal and pass a placement-specific source from the destination page shell.
- The home page may retain navigation links where the LP needs modal conversion; reusable components expose optional callbacks for this distinction.
- Supporting copy selectively uses `strong` to emphasize authority or operational detail without over-weighting the paragraph.

## Validation

- Run `npx tsc --noEmit` for code changes.
- Run `npm run build` for production-impacting changes; it includes client, SSR, and prerender stages.
- Run `git diff --check` before committing.

---

*Convention analysis: 2026-09-03*
