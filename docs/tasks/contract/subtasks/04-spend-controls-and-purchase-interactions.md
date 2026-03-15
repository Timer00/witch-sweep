# Subtask 04: Spend Controls and Contract-Row Click Interaction

## Goal

Refactor spending behavior keeping it simple: use the existing `ContractPreview` rows as the reward picker without affecting printing, and update amount in `src/pages/SpendCoins.tsx` on click. Refactor the spending button and remove slider.

## Scope

- Keep spend controls (coin balance, amount input, spend button) in `src/pages/SpendCoins.tsx`.
- Do **not** render a second rewards list in a separate controls component.
- Add reward hover/click behavior directly to reward rows rendered in `ContractPreview` without affecting printing

## Implementation Details

1. Spend panel behavior (left panel in preview screen):
   - coin balance (`Deine Münzen: X`)
   - amount input with increment/decrement arrows
   - spend button (`Ausgeben`)
   - amount indicator (`Menge: N`) or equivalent

2. Reward row interactions in `ContractPreview` (as displayed in SpendCoins):
   - if reward is affordable (`reward.amount <= coins`):
     - show hover effect
     - show pointer cursor
     - on click, set spend amount to reward amount
   - if reward is not affordable:
     - no hover highlight
     - cursor `not-allowed`
     - show tooltip on hover: `Du hast nicht genug Münzen.`
     - on click, do nothing

3. Manual amount behavior:
   - integer only
   - clamp to valid range:
     - minimum 1 when coins > 0
     - maximum current coins
   - if coins = 0, spend controls disabled

4. Print safety:
   - interaction styling must not affect print output
   - in print, rows render as normal static contract rows

## Acceptance Criteria

- Rewards are rendered once (inside `ContractPreview`), not duplicated elsewhere.
- Clicking an affordable reward updates current spend amount in `SpendCoins`.
- Unaffordable rewards show `not-allowed` + tooltip and do not update amount on click.
- Manual amount controls still work and can override current amount.
- Spend action never allows spending more than available coins.
- Print output remains unaffected by hover/click UI states.

## Notes from Spec/Mocks

- This keeps the interaction model minimal and intuitive for kids.
- Contract preview remains the single visual source for rewards.
