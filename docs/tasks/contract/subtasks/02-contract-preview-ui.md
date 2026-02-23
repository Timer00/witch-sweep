# Subtask 02: Contract Preview UI Component

## Goal

Build the reusable contract preview component that visually matches the paper contract style and is print-ready.

## Scope

- Create `src/components/contract/ContractPreview.tsx`.
- Render a stylized contract sheet using contract data.
- Ensure structure can be printed exactly as shown.

## Implementation Details

1. Component props:
   - parent name
   - child name
   - rewards list
2. Visual structure based on `image 1.png`:
   - title: `Vertrag`
   - subtitle: `Diese Dinge kann ich gegen Münzen eintauschen:`
   - reward rows (up to 7 visible rows in paper layout)
   - coin/value area aligned to the right of each row
   - date line labeled `Datum:`
   - signature lines:
     - `Unterschrift (Elternteil):` with parent name label
     - `Unterschrift (Kind):` with child name label
   - witch illustration in lower-right area (reuse existing witch assets where practical)
3. Add stable print selector wrapper:
   - e.g. `data-print-contract`
4. Empty rows should still render as lines if fewer than max visual slots are used.

## Acceptance Criteria

- Component renders correctly with sample data and with minimal valid data (1 reward).
- German copy matches agreed wording and spelling.
- Preview proportions are suitable for A4-like print output.
- ContractPreview can be used both onscreen and in print mode without structural changes.

## Notes from Spec/Mocks

- This component is the main visual element in the preview screen.
- The contract should look like a "paper" artifact, not generic app cards.
