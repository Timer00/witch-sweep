# Subtask 06: Print-Only Contract Output

## Goal

Ensure printing outputs only the contract sheet and visually matches the on-screen contract preview.

## Scope

- Implement print-specific CSS and print trigger handling.
- Exclude all non-contract UI from printed output.

## Implementation Details

1. Add print media rules in global styles:
   - hide all application UI by default in print
   - show only element tagged for contract print (e.g. `[data-print-contract]`)
   - remove overlays, controls, and close buttons
2. Tune page layout for A4-like output:
   - sensible page margins
   - prevent clipping of title/signatures/witch illustration
   - avoid accidental page breaks inside contract sheet
3. Print button placement and trigger:
   - add a `Drucken` (Print) button in `src/pages/SpendCoins.tsx` next to the edit button
   - button calls `window.print()`
   - optional `requestAnimationFrame` before print for layout stability
4. Verify print preview parity:
   - structure and copy should match on-screen contract
   - only printable contract artifact appears

## Acceptance Criteria

- Print preview contains only the contract sheet.
- Buttons, spend controls, and close icons are not printed.
- Text and lines are legible and correctly aligned on A4.
- Browser "Save as PDF" from print dialog works without extra code.

## Notes from Spec/Mocks

- Print action is a first-class primary action in preview screen.
- Contract should read as a standalone document when printed.
