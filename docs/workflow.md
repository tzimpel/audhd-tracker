# Workflow

This file defines how implementation work should proceed in this repository.

## Source Of Truth

The repository docs are the main source of truth:

- [docs/product-concept.md](product-concept.md)
- [docs/architecture.md](architecture.md)
- [docs/roadmap.md](roadmap.md)
- [docs/backlog.md](backlog.md)
- [docs/standards.md](standards.md)

GitHub issues may be used later for active work tracking, but they should reference the docs rather than replace them.

## Slice-Based Delivery

Work should proceed one roadmap/backlog slice at a time.

Each slice should be:

- coherent
- reviewable
- testable
- small enough to understand in one pass

If a backlog slice is too large, split it into smaller sub-slices before implementation starts.

## Required Implementation Flow

For every implementation slice:

1. identify the slice to work on
2. ask any blocking questions first
3. write an implementation concept in chat before coding
4. wait for approval or comments
5. write an implementation checklist
6. implement the slice and relevant tests
7. let the user review and test
8. address feedback
9. merge only after explicit approval

## Branch Strategy

- `main` is the stable branch
- use a short-lived feature branch for each slice or coherent sub-slice
- branch names should clearly indicate intent

Preferred prefixes:

- `feat/`
- `fix/`
- `refactor/`
- `docs/`
- `test/`
- `chore/`

Examples:

- `feat/project-scaffold`
- `feat/repo-automation`
- `fix/pages-routing`

## Commit Strategy

- prefer atomic commits within a branch
- each commit should represent a meaningful unit of work
- avoid giant mixed-purpose commits
- avoid excessive micro-commits that add no review value

## Merge Strategy

- do not use a rebase workflow
- squash merge is the default
- regular merge is allowed when preserving commit detail is useful

## Test Expectations

Automated tests are required for core behavior.

Full TDD is optional, but core logic should be protected with tests close to the implementation.

Priority coverage areas:

- domain classification logic
- repository behavior
- import/export validation
- core check-in flow behavior

## Review Standard

Before merge:

- implementation should match the approved concept or explain deviations clearly
- relevant tests should pass
- documentation should be updated if architecture, workflow, or product behavior changed
- the change should be stable enough for `main`

## Automation Baseline

Repository automation should stay in place once introduced:

- pull requests should run install, lint, test, and build in GitHub Actions
- pushes to `main` should be eligible for GitHub Pages deployment
- GitHub Pages should use the documented routing strategy rather than relying on implicit SPA fallback behavior
