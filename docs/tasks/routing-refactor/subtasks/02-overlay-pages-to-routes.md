# Subtask 02: Overlay Pages to Routes

## Goal

Replace top-level overlay booleans in `App.tsx` with route-driven navigation for Info, Legal, and Spend screens.

## Scope

- Remove local visibility flags:
  - `showInfo`
  - `showLegalInfo`
  - `showCoinSpend`
- Route-enable entry and close actions for these screens.

## Implementation Details

1. Migrate open handlers:
   - coin button click -> navigate to spend route
   - info button click -> navigate to info route
   - legal button click -> navigate to legal route

2. Migrate close handlers:
   - close button should prefer browser-history back
   - use explicit fallback route when no meaningful history exists

3. Replace conditional render blocks:
   - remove overlay conditional rendering in `src/App.tsx`
   - render route components via router instead

4. Keep shared shell behavior:
   - ensure main menu button and coin display still obey existing visibility rules
   - preserve existing guards/dialog behavior

## Acceptance Criteria

- Info, Legal, and Spend views can be opened directly via URL.
- Opening/closing these views no longer depends on local booleans in `App.tsx`.
- Browser back/forward navigates between these screens correctly.
- No regression in current button visibility rules.

## Notes

- This subtask should not yet change contract nested navigation inside Spend.
