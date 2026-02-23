# Subtask 04: Spend Controls and Purchase Interactions

## Goal

Implement spend mechanics that combine reward selection and manual amount entry, with safe and satisfying purchase behavior.

## Scope

- Create `src/components/contract/SpendControls.tsx`.
- Support reward-based and manual spending in one coherent UI.
- Add anti-misclick guardrails and purchase feedback animation.

## Implementation Details

1. Layout (left panel in preview screen, per `image 1.png`):
   - coin balance (`Deine Münzen: X`)
   - amount input with increment/decrement arrows
   - spend button (`Ausgeben`)
   - amount indicator (`Menge: N`) or equivalent
2. Reward selection behavior:
   - render reward list with amounts
   - disable rewards that cost more than available coins
   - clicking a reward sets/replaces current amount with reward amount
3. Manual amount behavior:
   - integer only
   - clamp to valid range:
     - minimum 1 when coins > 0
     - maximum current coins
   - if coins = 0, spending controls disabled
4. Misclick guardrails:
   - implement a clear anti-accidental interaction pattern, for example:
     - confirmation step on first click, or
     - short hold-to-confirm interaction
   - include visible state change so intent is obvious
5. Satisfying purchase feedback:
   - add a lightweight success animation on spend:
     - button press feedback (scale/shadow)
     - optional coin sparkle/pulse effect
   - ensure reduced-motion users still get non-animated success feedback

## Acceptance Criteria

- Reward click always updates current spend amount.
- Manual controls can still override amount after reward click.
- Spend action never allows spending more than available coins.
- With 0 coins, spend action is clearly disabled.
- Guardrail behavior prevents accidental one-tap spending.
- Successful spend interaction provides clear positive feedback.

## Notes from Spec/Mocks

- The spend area should stay compact and readable.
- The spend button is visually prominent and should feel rewarding to use.
