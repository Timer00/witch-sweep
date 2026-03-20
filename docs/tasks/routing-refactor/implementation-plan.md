# Routing Refactor - Implementation Plan

## 1) Goal and settled decisions

This plan introduces URL-based navigation for menu/overlay screens while minimizing risk to existing game behavior.

Settled decisions:

- Routing library: `react-router-dom`.
- Migration strategy: incremental.
- Scope: route only menu/overlay flows.
- Out of scope: game paging/index flow refactor.
- Keep business behavior stable (coins, timer outcome, contract data).
- Keep FAQ hash behavior in Info, but host it on a dedicated route.
- Use route constants to avoid scattered string literals.

## 2) Target route model

Proposed route map:

- `/` -> game shell entry (existing state/index flow remains unchanged)
- `/info` -> info/FAQ fullscreen page
- `/legal` -> legal fullscreen page
- `/spend` -> spend + contract preview fullscreen page
- `/spend/contract/edit` -> contract definition fullscreen page

Notes:

- If deployment rewrites for SPA paths are available, prefer browser history routing.
- If rewrites are unavailable in an environment, use hash routing as fallback for that environment only.

## 3) Incremental migration strategy

### Phase 1: Router foundation

1. Add `react-router-dom`.
2. Introduce central route constants (single source of truth).
3. Add router entry file and top-level route tree.
4. Keep existing game flow behavior intact behind `/`.

### Phase 2: Overlay-to-route migration

1. Replace `showInfo`, `showLegalInfo`, and `showCoinSpend` in `src/App.tsx`.
2. Wire button callbacks to route navigation.
3. Ensure close handlers use history-aware behavior (back when possible, fallback route otherwise).

### Phase 3: Contract nested route migration

1. Replace `showContractDefinition` in `src/pages/SpendCoins.tsx`.
2. Move edit/create contract flow to `/spend/contract/edit`.
3. Ensure Info -> Vertrag link navigates to contract-edit route.

### Phase 4: QA, cleanup, and sign-off

1. Remove obsolete local navigation states and dead props.
2. Validate deep links and back/forward semantics for routed overlays.
3. Final lint/test pass and merge checklist.

## 4) Planned code structure

Suggested structure:

- `src/config/routes.ts`
  - route path constants
  - helper builders for nested utility paths (if needed).
- `src/router/AppRouter.tsx`
  - route tree definition.
- `src/App.tsx`
  - core game shell/view composition for root route.

Migration targets in current files:

- `src/main.tsx`: mount app inside router provider.
- `src/App.tsx`: remove overlay booleans, use route navigation.
- `src/pages/SpendCoins.tsx`: remove local contract-definition toggle state.
- `src/pages/Info.tsx`: keep hash section logic, now on `/info`.

## 5) Behavior parity constraints

Must remain unchanged after refactor:

- Coin accumulation/spending calculations.
- Timer and outcome branching behavior.
- Contract persistence (`contract.v1`) and validation behavior.
- Existing confirmation dialogs for leaving critical states.
- German copy and UX wording.
- Core game paging/index behavior in `App` and `useGameState`.

## 6) Risks and mitigations

Risk: Back button closes to unexpected screen.
Mitigation:

- Standardize close behavior:
  - first choice: `navigate(-1)`
  - fallback: explicit parent route.

Risk: Route-mounted fullscreen pages regress layout behavior.
Mitigation:

- Keep current `FullScreen` wrappers and page internals unchanged.
- Limit this refactor to navigation transport only.

Risk: Hosting path rewrite mismatch.
Mitigation:

- Confirm environment rewrite support early.
- Keep fallback strategy documented.

## 7) Test plan

Manual checks:

1. Open app at `/` and complete one normal game flow (should behave exactly as before).
2. Open `/info` and `/legal` directly.
3. Open `/spend` directly; verify create/edit/print paths.
4. Open `/spend/contract/edit` directly; verify save and close.
5. Verify browser back/forward works through utility screens.
6. Verify hash deep links in Info still open expected FAQ (`/info#faq-...`).
7. Verify main-menu button behavior and confirmation dialogs are unchanged.
8. Reload on deep route and confirm state behavior is safe.

## 8) Definition of done

- Routing dependency added and used by app.
- Overlay and contract nested flows are route-driven.
- No game-step routes are introduced in this refactor.
- Existing index-based game flow remains unchanged.
- No lint/runtime regressions in changed files.
- Task subtasks completed and checked off in PR notes.
