# Subtask 03: Contract Flow Nested Routing

## Goal

Move contract create/edit navigation from local component state to dedicated nested routes.

## Scope

- Remove `showContractDefinition` state from `src/pages/SpendCoins.tsx`.
- Route contract edit/create through `/spend/contract/edit`.
- Keep contract storage and form behavior unchanged.

## Implementation Details

1. Route structure:
   - keep `/spend` for preview + spend screen
   - add nested or sibling route for `/spend/contract/edit`

2. Spend screen navigation:
   - "Vertrag erstellen" and "Bearbeiten" actions navigate to contract edit route
   - printing remains in spend route

3. Contract definition close/save:
   - save returns to `/spend`
   - cancel/discard return behavior remains consistent with existing confirmation dialog

4. Info page integration:
   - FAQ "Vertrag" action should navigate directly to contract edit route
   - preserve Info hash behavior for FAQ sections

## Acceptance Criteria

- Contract definition is no longer toggled by local state inside Spend page.
- `/spend/contract/edit` is directly accessible by URL.
- Save/cancel flows return to spend route as expected.
- Contract data persistence behavior remains unchanged.

## Notes

- Keep UI and copy parity; this is a navigation refactor, not a visual redesign.
