# Subtask 03: Contract Definition Page and Form

## Goal

Implement the contract editing screen with full reward CRUD, RHF+Zod validation, and unsaved-changes handling.

## Scope

- Create dedicated contract definition page/screen.
- Add a button in `src/pages/SpendCoins.tsx` to access the contract create/edit page 
- Build `ContractDefinitionForm` and `UnsavedChangesDialog`.
- Implement add/edit/delete for rewards.
- Save only on explicit confirm.

## Implementation Details

1. Create `src/pages/ContractDefinition.tsx` (or equivalent dedicated screen entry point):
  - use FullScreen component
  - title area top middle
  - add info icon action that opens info page callback on top left
2. Create `src/components/contract/ContractDefinitionForm.tsx`:
  - use `react-hook-form` and zod resolver
  - fields:
    - `parentName`
    - `childName`
    - reward list (`useFieldArray`)
  - reward add/edit inline UI per `image.png`:
    - add row transforms to editor row
    - editor row contains:
      - wide description input
      - amount input with increment/decrement arrows
      - checkmark confirm control
    - edit pre-fills values into the editor row
    - delete removes reward entry
  - show rewards counter in title area: `(x/7)`
  - enforce max 7 rewards:
    - add control disabled at limit
    - cursor `not-allowed` on hover
    - tooltip: `Maximal 7 Belohnungen.`
3. Create `src/components/contract/UnsavedChangesDialog.tsx`:
  - shown when closing with `isDirty === true`
  - copy: `Änderungen verwerfen und zurück?`
  - actions: cancel / discard
4. Save action:
  - validates form
  - persists via storage helper
  - takes user back to the preview page (SpendCoins overlay)
5. Navigation from SpendCoins:
  - add a button in `src/pages/SpendCoins.tsx` (e.g. „Vertrag erstellen“ / „Bearbeiten“) that opens the contract definition screen. use an icon of a pencil from lucide.
  - button placement: to the right of the contract preview, like a sidebar that is unnaffected by the scrolling of the contract. 

## Acceptance Criteria

- User can reach the contract definition screen from SpendCoins via a dedicated button.
- User can add, edit, and delete rewards within 1..7 limit.
- Reward input and amount validation errors are shown in German.
- Parent and child names are required before save succeeds.
- Closing with unsaved edits always prompts confirmation.
- Closing without changes exits directly.
- Saving/confirming the contract takes the user back to the preview page.
- Saved values reappear when reopening the editor.

## Notes from Spec/Mocks

- Definition screen should feel like a focused, full-screen editing surface.
- Keep visual hierarchy similar to sketch:
  - rewards list dominant in upper half
  - names and primary save action in lower area.

