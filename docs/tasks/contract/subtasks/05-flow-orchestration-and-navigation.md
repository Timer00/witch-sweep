# Subtask 05: Flow Orchestration and Navigation

## Goal

Wire app-level flow so preview, empty state, and dedicated edit screen work together cleanly.

## Scope

- Refactor `src/pages/SpendCoins.tsx` into orchestration container.
- Integrate ContractPreview, SpendControls, and navigation to ContractDefinition page.
- Handle empty vs. existing contract state.

## Implementation Details

1. In `SpendCoins`:
   - load contract via storage helper
   - derive view state:
     - empty: no contract exists
     - preview: contract exists
   - render close button behavior consistent with existing fullscreen overlays
2. Empty state UX:
   - replace contract sheet area with CTA button:
     - `Vertrag erstellen`
   - CTA opens dedicated contract definition screen
3. Existing contract UX:
   - show `ContractPreview`
   - show `SpendControls`
   - show bottom actions:
     - `Drucken`
     - `Vertrag bearbeiten`
4. Edit navigation behavior:
   - `Vertrag bearbeiten` opens dedicated definition screen
   - after successful save:
     - return to preview
     - reload/render fresh contract data
   - on discard/close:
     - return to previous screen without persisting
5. Info flow integration:
   - definition screen exposes an info button action wired to existing info modal/page callback.

## Acceptance Criteria

- No contract -> user sees only empty-state contract area + create CTA.
- Existing contract -> preview and spend interactions are fully available.
- Editing always happens in dedicated screen flow.
- Save returns to preview with updated values.
- Discard returns without changes.
- Info button in definition view opens existing info experience.

## Notes from Spec/Mocks

- Keep top-right close affordance in both preview and definition screens.
- Bottom action area in preview should match mock emphasis:
  - large print button
  - secondary edit button.
