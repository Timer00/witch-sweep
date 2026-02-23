# Subtask 02: Contract Preview Static UI (Look Validation)

## Goal

Build the static `ContractPreview` UI first to validate layout and style, as defined in the plan step: "render static first to validate look."

## Scope

- Create `src/components/contract/ContractPreview.tsx`.
- Render it in the existing `src/pages/SpendCoins.tsx` center area.
- Use static fixture data only for this task.
- Keep DOM print-ready, but do not wire local storage yet.

Out of scope for this task:

- reading contract data from local storage
- wiring to the definition form output
- empty-state logic driven by persisted data

## Type source and static fixture contract

Types must come from `src/utils/contractValidation.ts`:

- `ContractData`
- `ContractReward`

For this task, define a static fixture in `SpendCoins.tsx`, typed from those exported types.

Do not add duplicate local interface definitions.

## Asset and icon plan

### Existing assets

- Witch illustration source: `src/assets/index.ts`
  - preferred: `witchHello`
  - fallback: `witchTalk`
- Witch placement: lower-right contract area, matching mock balance.

### Lucide icons (required)

Use `lucide-react` for decorative and symbolic elements:

- Header magic/decor:
  - `Sparkles`
  - `Stars`
  - `WandSparkles`
  - optional accent: `MoonStar`
- Reward row coin: use the same coin icon already used elsewhere in the app

Icon styling:

- dark stroke (`text-black` or near-black)
- decorative icons lower visual priority than text
- avoid icon-heavy clutter; keep decorations sparse and playful

## Styling direction (witchy + playful)

The contract must feel like a magical paper sheet, not a generic app card:

- Paper base:
  - warm off-white/cream tone
  - dark hand-drawn-like linework
  - avoid glossy shadows
- Header:
  - large centered `Vertrag`
  - subtitle `Diese Dinge kann ich gegen Münzen eintauschen:`
  - magical stars/spell accents around title
- Reward section:
  - always render 7 visual rows/lines
  - fill remaining rows with empty lines when fewer rewards exist
  - right-aligned coin/value marker zone per row
- Footer:
  - `Datum:` line
  - `Unterschrift (Elternteil):` + parent label
  - `Unterschrift (Kind):` + child label
  - witch image anchored bottom-right without overlapping core text

## Implementation details

1. Implement `ContractPreview` layout zones:
   - title/decor
   - rewards list
   - date/signatures
   - witch illustration
2. Add stable print selector on root:
   - `data-print-contract`
3. Render `ContractPreview` from `src/pages/SpendCoins.tsx` using static mock data.
4. Keep component presentation-only (no storage/form/spend logic inside).

## Acceptance criteria

- `ContractPreview` renders on `src/pages/SpendCoins.tsx` using static fixture data.
- Props are typed from `src/utils/contractValidation.ts`.
- German copy and spelling are correct.
- Visual style is clearly witchy/playful with stars/spell motifs.
- Root includes `data-print-contract`.
- Works for static fixture scenarios:
  - 1 reward
  - 7 rewards
  - intermediate counts with empty visual rows
- No `loadContract()` or local storage integration exists in this subtask.

## Notes from spec and mocks

- This task intentionally validates appearance first.
- Real data integration is handled in a dedicated follow-up subtask after form work.
