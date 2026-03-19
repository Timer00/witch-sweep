# Routing Refactor Subtasks Overview

This folder breaks the routing refactor into executable subtasks based on:

- `docs/tasks/routing-refactor/routing-refactor.md`
- `docs/tasks/routing-refactor/implementation-plan.md`

## Execution Order

1. `01-router-foundation-and-route-contract.md`
2. `02-overlay-pages-to-routes.md`
3. `03-contract-flow-nested-routing.md`
4. `04-qa-and-signoff.md`

## Global Constraints (applies to all subtasks)

- Use `react-router-dom` as the routing library.
- Keep route paths centralized in a shared route constants file.
- Preserve existing game and coin behavior while migrating navigation.
- Keep game paging/index navigation state-based exactly as it is today.
- Do not change contract storage schema (`contract.v1`) in this refactor.
- Keep Info hash deep-link behavior compatible (`faq-*`).
- Keep user-facing copy in German.
- Remove obsolete navigation state once route equivalent is live.

## Refactor principles

- Prefer incremental migration over big-bang rewrites.
- Move one navigation concern at a time and verify parity.
- Keep route semantics predictable and parent/child relationships explicit.
- Add small navigation helpers instead of repeating route strings.
