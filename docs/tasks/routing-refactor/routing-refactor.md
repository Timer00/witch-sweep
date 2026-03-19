# Routing Refactor

## Story

As a parent/child user, I want menu and overlay screens to have stable URLs so navigation is predictable, deep links work, and future feature development does not require adding more ad-hoc view state in `App.tsx`.

## Current Problem

Navigation is currently split across different mechanisms:

- Numeric page index (`page`) for core game flow.
- Top-level booleans in `src/App.tsx` (`showInfo`, `showLegalInfo`, `showCoinSpend`) for fullscreen overlays.
- Local nested toggle in `src/pages/SpendCoins.tsx` (`showContractDefinition`) for a secondary screen.
- Hash handling in `src/pages/Info.tsx` for FAQ open state.

This works for a small app, but it gets harder to reason about:

- Back/forward behavior for overlays is not fully URL-driven.
- Deep-linking to specific screens is limited.
- Navigation logic is duplicated across multiple components.
- Feature work increasingly requires touching `App.tsx` state plumbing.

## Recommended Library

Use `react-router-dom`.

Why this is the best fit here:

- It is the standard routing solution for React projects.
- It supports nested routes and shared layouts cleanly.
- It allows incremental migration (we can refactor in phases, not all at once).
- It provides native browser history integration and better URL semantics.
- It is well documented and easy for future contributors to understand.

## Alternatives Considered

- `@tanstack/react-router`: excellent type safety, but higher migration and learning cost for this codebase stage.
- `wouter`: lightweight, but we would need custom patterns for nested flows, route helpers, and future expansion.

## Success Criteria

- Key application views have dedicated routes.
- Browser back/forward behavior is consistent for those views.
- Direct URL access works for main utility screens (`/info`, `/legal`, `/spend`, `/spend/contract/edit`).
- The current game logic and coin behavior stay functionally equivalent after migration.
- The core game paging/index flow remains state-based and unchanged in this refactor.
