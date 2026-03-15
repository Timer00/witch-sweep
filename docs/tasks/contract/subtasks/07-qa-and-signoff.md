# Subtask 07: QA, Edge Cases, and Sign-off

## Goal

Validate that the full contract experience matches plan, spec, and mockups before merge.

## Scope

- Execute manual end-to-end verification.
- Confirm UX, validation, persistence, and print behavior.
- Capture final sign-off checklist.

## Test Checklist

1. Empty state:
   - no stored contract -> `Vertrag erstellen` is shown in preview area
2. Definition flow:
   - add/edit/delete rewards works
   - reward counter `(x/7)` updates correctly
   - max 7 disables add and shows tooltip + `not-allowed` cursor
   - name fields required
   - reward description 1..100 validation enforced
   - amount integer and `> 0` enforced
3. Unsaved change behavior:
   - close while dirty -> discard confirmation dialog appears
   - cancel keeps edits
   - discard drops unsaved edits
4. Save/persist behavior:
   - save writes to `contract.v1`
   - reopen app -> contract is restored
   - corrupt local storage -> app falls back safely
5. Spend behavior:
   - reward click sets amount
   - manual increment/decrement works and clamps bounds
   - unaffordable rewards are not selectable
   - 0 coins disables spend
   - guardrail flow prevents accidental spending
   - spend success animation/feedback is visible
6. Preview/layout behavior:
   - preview visually matches intended structure from mock
   - labels and German copy are correct
7. Print behavior:
   - print preview shows only contract sheet
   - no UI chrome/buttons in print output
   - "Save as PDF" from print dialog works

## Sign-off Criteria

- All checklist items pass.
- No blocking lint or runtime errors in changed files.
- Final copy is correct German in all newly added UI strings.
- Feature is usable by parent without reading implementation details.

## Deliverables

- QA notes in PR description or task comment.
- Short list of known non-blocking polish items (if any).
