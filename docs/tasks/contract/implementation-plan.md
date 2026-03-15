# Contract Feature – Implementation Plan

## 1) Goal and settled decisions

This document specifies the implementation of the Contract feature based on the spec and the clarified decisions.

Settled:

- A child can spend coins **in two ways**:
  - by selecting a specific reward
  - by manually entering (slider) an amount of coins
- Changes in edit mode are persisted **only on Save**.
- When leaving with unsaved changes, show a **confirmation dialog**.
- Printing should include **only the contract sheet** (without surrounding UI).
- Validation:
  - at least 1 reward
  - parent name and child name are required fields
  - reward text: min. 1, max. 100 characters
  - reward amount: integers only
- Maximum 7 rewards:
  - add button is disabled
  - cursor `not-allowed` on hover
  - tooltip explains the limit
- Empty state in preview:
  - instead of the contract preview, show a CTA **„Vertrag erstellen“**.
- Language is consistently correct German.

## 2) Decision: print vs. PDF download
ok let's use print first then.

**Recommendation: print-first via the browser dialog.**

Why this is the simplest approach:

- No additional dependency stack needed (`jspdf`, `html2canvas`, etc.).
- Higher layout fidelity between on-screen view and print via `@media print`.
- “Save as PDF” is already available in most browser print dialogs.
- Lower risk around fonts/scaling than canvas rasterization.

Concrete implementation:

- Button „Drucken“ triggers `window.print()`.
- Print CSS hides everything except the contract sheet.
- Optional later: a dedicated “PDF herunterladen” button as phase 2.

## 3) UX flow

### 3.1 SpendCoins overlay (preview + spending)

1. Overlay opened.
2. If no contract is saved:
   - contract area shows CTA „Vertrag erstellen“.
3. If a contract exists:
   - show the contract preview.
4. Left spend section:
   - show coin balance.
   - list rewards with costs.
   - only selectable rewards that are affordable.
   - an amount input, with arrows to increase/decrease amount
   - clicking a reward simply replaces the amount with the reward amount
   - primary button „Ausgeben“ (with guardrails against misclicks). And a satisfying purchase animation. make it a nice button to click.
5. Bottom area:
   - button „Drucken“
   - button „Bearbeiten“ (opens contract definition).

### 3.2 Contract definition (editing)

- use react hook form for state management and zod for validation
- Fields:
  - Elternname
  - Kindname
  - reward list (1..7)
- Add/edit pattern per mock:
  - add row button transforms into an inline editor
  - edit pre-fills the inline editor
  - checkmark confirms the entry
- Button „Speichern“
- “Back” / close:
  - when `isDirty === true`, show confirmation dialog:
    - „Änderungen verwerfen und zurück?“

## 4) Data model & persistence (localStorage)
Use zod to define any type, and then validations can also be defined.

New (versioned) storage key:

- `contract.v1`

Recommended interface:

```ts
interface ContractReward {
  id: string;
  description: string; // 1..100
  amount: number; // integer > 0
}

interface ContractData {
  parentName: string;
  childName: string;
  rewards: ContractReward[]; // 1..7
  updatedAt: string; // ISO timestamp
}
```

Helper functions:

- `loadContract(): ContractData | null`
- `saveContract(data: ContractData): void`

Rules:

- Save **valid** data only.
- Defensive parsing on load (schema check / fallback `null`).

## 5) Planned code structure

### 5.1 Extend existing file

- `src/pages/SpendCoins.tsx`
  - refactor into 3 states:
    - `empty` (kein Vertrag)
    - `preview`
    - `edit` -> edit should be a new page that we navigate the user to.
  - integrate print trigger

### 5.2 New files

- `src/components/contract/ContractDefinitionForm.tsx`
  - parent/child name
  - reward CRUD (add/edit/delete)
  - 7-item limit + tooltip/disabled cursor
  - save/cancel callbacks

- `src/components/contract/ContractPreview.tsx`
  - printable contract view
  - render names + rewards + witch illustration
  - signature lines with labels

- `src/components/contract/SpendControls.tsx`
  - coin balance
  - reward selection + increment buttons
  - primary button with guardrails and reward animation

- `src/components/contract/UnsavedChangesDialog.tsx`
  - confirm/cancel for discarding

- `src/utils/contractStorage.ts`
  - load/save helper

- `src/utils/contractValidation.ts`
  - central validation logic

> Note: If the modules stay small, `contractStorage` and `contractValidation` can be merged.

## 6) Validation & error messages (German)

Recommended messages:

- „Bitte gib den Namen des Elternteils ein.“
- „Bitte gib den Namen des Kindes ein.“
- „Bitte füge mindestens eine Belohnung hinzu.“
- „Die Belohnung muss zwischen 1 und 100 Zeichen lang sein.“
- „Bitte gib eine ganze Zahl größer als 0 ein.“
- „Maximal 7 Belohnungen möglich.“
- „Nicht genügend Münzen.“
- „Änderungen verwerfen und zurückgehen?“

Tooltips/labels:

- Add-Limit-Tooltip: „Maximal 7 Belohnungen.“
- Empty-State-CTA: „Vertrag erstellen“
- Edit-Button: „Vertrag bearbeiten“
- Print-Button: „Drucken“

## 7) Contract text (correct German)

Contract-Sheet:

- Titel: `Vertrag`
- Untertitel: `Diese Dinge kann ich gegen Münzen eintauschen:`
- Datumsfeld: `Datum:`
- Signatur Elternteil: `Unterschrift (Elternteil):`
- Signatur Kind: `Unterschrift (Kind):`

show parent and child names as labels below/above the signature lines.

## 8) Print implementation

Print strategy:

- `ContractPreview` bekommt einen stabilen Wrapper (z. B. `data-print-contract`).
- In global CSS:
  - `@media print`:
    - hide everything
    - show only the contract sheet
    - optimize layout for A4 (`page-break`, margins, scaling)
- „Drucken“-Button:
  - optional `requestAnimationFrame` before `window.print()` to ensure reflow sync.

Acceptance:

- print contains only the contract sheet, no buttons/sliders/close icon.
- print matches the preview 1-to-1

## 9) Implementation steps (recommended order)

1. **Model & Storage**
   - interfaces + storage/validation helpers
2. **ContractPreview**
   - render static first to validate look
   - after form and storage are implemented, wire real data
3. **Definition Form**
   - reward CRUD, name fields, validation, save/discard dialog
4. **SpendCoins Refactor**
   - empty/preview/edit states
   - new spending logic and ui
5. **Print CSS**
   - print-only contract via media rules
6. **Polish**
   - German copy, tooltips, disabled states, accessibility

## 10) Test plan

### 10.1 Manual core cases

- Kein Vertrag:
  - „Vertrag erstellen“ sichtbar
- Vertrag speichern:
  - Reload → Daten bleiben erhalten
- Ungespeicherte Änderungen:
  - Zurück → Confirm-Dialog erscheint
- Reward-Limit:
  - bei 7 Rewards Add disabled + Tooltip + not-allowed Cursor
- Validierung:
  - leere Namen / leere Rewards / >100 Zeichen / nicht-integer Betrag
- Ausgeben (Belohnung):
  - bezahlbar/unbezahlbar korrekt
- Ausgeben (manuell):
  - Slider 1..coins, Coins werden korrekt reduziert
- Drucken:
  - nur Contract-Sheet im Print-Preview
  - „Als PDF speichern“ im Browser möglich

### 10.2 Edge Cases

- localStorage korrupt/invalid JSON → App bleibt nutzbar, fallback to empty state
- Coins = 0 → Ausgeben disabled
- Belohnung kostet 0 oder negativ → verhindert durch Validierung