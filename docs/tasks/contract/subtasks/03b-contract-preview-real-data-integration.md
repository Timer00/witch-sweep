# Subtask 03b: Contract Preview Real-Data Integration

## Goal

Replace static contract fixture data with real persisted data after the definition form is implemented and saving valid contracts.

## Depends on

- `01-foundation-domain-storage.md`
- `02-contract-preview-ui.md`
- `03-contract-definition-page-form.md`

## Scope

- Wire `ContractPreview` in `src/pages/SpendCoins.tsx` to real data from local storage.
- Remove static preview fixture from Subtask 02.
- Keep `ContractPreview` presentation-only (data loading remains in page/container level).

## Type source (required)

Use types from `src/utils/contractValidation.ts`:

- `ContractData`
- `ContractReward`

Use storage helpers from `src/utils/contractStorage.ts`:

- `loadContract()`

## Implementation details

1. In `src/pages/SpendCoins.tsx`:
   - replace static fixture data with `loadContract()` result
   - pass `parentName`, `childName`, and `rewards` into `ContractPreview`
2. Loading behavior:
   - if `loadContract()` returns `null`, do not attempt to render populated preview data
   - keep empty-state handling in place for "no contract" case
   - **Empty state definition:** see `05-flow-orchestration-and-navigation.md` and `00-overview.md` (shared UX details) for the CTA "Vertrag erstellen" and layout when no contract exists
3. Refresh behavior:
   - after successful save in definition flow, re-read and re-render latest contract data
4. Keep storage concerns out of `ContractPreview`:
   - `ContractPreview` receives props only
   - no direct local storage calls inside component

## Acceptance criteria

- `ContractPreview` no longer depends on hardcoded data in `SpendCoins`.
- Preview reflects current `contract.v1` data from storage.
- Contract updates are visible after saving edits.
- Invalid/corrupt storage payload does not crash preview flow.
- Type imports for preview data come from `src/utils/contractValidation.ts`.

## Notes

- This task intentionally happens after the form task so preview wiring can use the same validated shape that the form persists.
