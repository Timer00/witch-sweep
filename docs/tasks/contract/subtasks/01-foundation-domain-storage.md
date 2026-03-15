# Subtask 01: Foundation, Domain Model, and Storage

## Goal

Establish the contract data model, schema validation, and local storage utilities used by all later UI tasks.

## Scope

- Use required form/validation dependencies (already installed):
  - `react-hook-form`
  - `zod`
  - `@hookform/resolvers`
- Define contract domain schema and types.
- Implement local storage read/write helpers.
- Centralize contract validation rules from the plan/spec.

## Implementation Details

1. Create `src/utils/contractValidation.ts`:
   - define zod schema(s) for:
     - reward item
     - full contract payload
   - enforce:
     - parent name required
     - child name required
     - rewards length `1..7`
     - reward description length `1..100`
     - reward amount integer and `> 0`
2. Create `src/utils/contractStorage.ts`:
   - storage key: `contract.v1`
   - `loadContract()`:
     - read raw JSON
     - parse safely
     - validate with zod
     - return `null` on invalid/corrupt data
   - `saveContract(data)`:
     - validate first with zod
     - include `updatedAt` (Date)
     - persist only if valid
3. Expose inferred TS types from zod schema for UI and props.

## Acceptance Criteria

- Invalid local storage payload never crashes the app.
- Valid payload loads successfully and matches schema types.
- Saving invalid contract data is rejected and does not overwrite storage.
- Validation rules match implementation plan exactly.
- Storage key is exactly `contract.v1`.

## Notes from Spec/Mocks

- Contract cannot be empty.
- Names are mandatory.
- Reward amounts are integer-only.
- Max 7 rewards with explicit limit handling in UI (implemented in later subtasks).
