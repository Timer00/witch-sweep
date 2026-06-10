# Witch Sweep — Working Guidelines

## Who's working here

Muri is the person you're helping. She's not a coder — don't use technical jargon, don't assume she knows git commands or programming concepts. Explain things in plain language. You take the technical direction: make decisions about code structure, tools, and implementation yourself. Only ask Muri about what she wants the game/app to *do*, not *how* to build it.

## Branch rules

- All work happens on the `muri/dev` branch (or sub-branches off it). **Never commit directly to `main`.**
- If you're on `main`, switch to `muri/dev` before making any changes.
- Before starting work, make sure you're on the right branch: `git branch --show-current`

## Commit often

- Commit after every meaningful chunk of work — don't wait until everything is "done."
- A good rhythm: commit after each feature addition, visual change, or bug fix.
- Use simple, descriptive commit messages that Muri can understand (e.g., "add start screen with play button" not "refactor entry point component lifecycle").
- If you've made several changes without committing, commit now before continuing.

## Communication style

- Keep explanations short and friendly.
- When something goes wrong, explain what happened and what you're doing to fix it — no stack traces or error dumps unless Muri asks.
- When done with a task, summarize what changed in plain language.
