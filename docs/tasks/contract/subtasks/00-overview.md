# Contract Feature Subtasks Overview

This folder breaks the contract feature into executable subtasks based on:

- `docs/tasks/contract/implementation-plan.md`
- `docs/tasks/contract/contract-feature.md`
- `docs/tasks/contract/image.png` (Contract Definition mock)
- `docs/tasks/contract/image 1.png` (Contract Preview + Spend mock)

## Execution Order

1. `01-foundation-domain-storage.md`
2. `02-contract-preview-ui.md`
3. `03-contract-definition-page-form.md`
4. `03b-contract-preview-real-data-integration.md`
5. `04-spend-controls-and-purchase-interactions.md`
6. `05-flow-orchestration-and-navigation.md`
7. `06-print-only-contract-output.md`
8. `07-qa-and-signoff.md`

## Global Constraints (applies to all subtasks)

- Keep user-facing copy in German and spellings correct.
- Any typing should be defined using zod
- Any form validation should be done using zod
- Persist contract data only on explicit save.
- Use `contract.v1` in local storage.
- Subtask 02 is static-preview-only; real localStorage wiring belongs to Subtask 03b.
- Use `react-hook-form` + `zod` for the definition form.
- Print flow is print-first (`window.print()`), with only the contract sheet visible in print output.
- Contract editing must be treated as a dedicated page/screen flow (not just inline editing inside preview state).

## Shared UX details from mockups/spec

- Contract Definition screen:
  - title centered at top
  - close button on top-right -> This is a default of the FullScreen component we'll use
  - rewards section title with count indicator `(x/7)`
  - add-row transforms into inline editor (description input + amount stepper + confirm)
  - reward list supports edit and delete
  - visible scrollable list area
  - parent and child name fields
  - large confirm/save action on lower right
  - info icon button opens info page
- Contract Preview + Spend screen:
  - left spend panel with current coins, amount controls, spend button
  - center contract sheet with witchy styling
  - bottom actions: print button and edit button
  - close button top-right -> This is a default of the FullScreen component we'll use
  - if no contract exists, show CTA "Vertrag erstellen" instead of sheet -> that leads to contract create/edit page
