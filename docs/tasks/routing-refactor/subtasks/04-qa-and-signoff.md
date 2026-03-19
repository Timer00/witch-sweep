# Subtask 04: QA and Sign-off

## Goal

Validate overlay/menu routing migration parity, deep-link behavior, and navigation consistency before merge.

## Scope

- Manual end-to-end checks across route-migrated overlay paths.
- Verify URL entry, close behavior, and browser history semantics.
- Confirm no regressions in core game, coins, and contract flow.

## Test Checklist

1. Direct routes:
   - open `/`
   - open `/info`
   - open `/legal`
   - open `/spend`
   - open `/spend/contract/edit`

2. Overlay replacements:
   - open each utility screen from in-app buttons
   - close each and verify expected return target

3. Browser history:
   - validate back/forward across route transitions
   - ensure no dead-end states after repeated open/close actions

4. Info hash behavior:
   - open `/info#faq-...` and verify matching accordion is expanded
   - toggle sections and confirm URL hash sync remains correct

5. Contract flow:
   - create/edit/save contract through route-based flow
   - verify return to `/spend`
   - confirm contract data reload still works

6. Core gameplay parity:
   - complete a full game cycle and verify outcomes/coins unchanged
   - verify game paging flow is still state/index based and unchanged
   - verify main menu confirmation behavior where required

7. Technical checks:
   - lint changed files
   - verify no runtime routing errors in console

## Sign-off Criteria

- All checklist items pass.
- No blocking regressions in navigation or core behavior.
- Route definitions and constants remain consistent and maintainable.
- Legacy navigation state removed where route replacement exists.
- No game-flow routing layer was introduced.

## Deliverables

- QA notes in PR/task comment.
- List of any non-blocking polish follow-ups.
