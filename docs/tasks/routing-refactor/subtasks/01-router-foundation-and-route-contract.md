# Subtask 01: Router Foundation and Route Contract

## Goal

Introduce routing infrastructure with minimal behavioral impact, and define a single source of truth for route paths.

## Scope

- Add routing dependency.
- Create route constants/helpers.
- Mount app through a router entrypoint.
- Keep existing screen behavior unchanged in this step.

## Implementation Details

1. Add dependency:
   - install `react-router-dom` (latest compatible version)

2. Create route contract:
   - add `src/config/routes.ts` with constants for:
     - root route
     - info route
     - legal route
     - spend route
     - spend contract edit route

3. Add router entrypoint:
   - add `src/router/AppRouter.tsx` (or equivalent) with top-level routes
   - keep current app shell at root route for now

4. Wire root render:
   - update `src/main.tsx` to render router provider/app router
   - keep `CoinsProvider` wrapping semantics unchanged

5. Add placeholders where needed:
   - route components may initially reuse existing components without moving logic yet

## Acceptance Criteria

- App boots using router infrastructure.
- Route constants exist and are used by route definitions.
- Existing default flow at `/` behaves as before.
- No user-visible behavior changes yet beyond routing foundation.

## Notes

- Keep this step intentionally small to isolate router bootstrapping risk.
