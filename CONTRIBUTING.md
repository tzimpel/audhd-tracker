# Contributing

This project uses a simple rolling-release workflow.

## Working Method

Implementation follows the roadmap and backlog documentation in this repository.

Process for each slice:

1. pick the next roadmap/backlog slice
2. discuss the implementation concept in chat before coding
3. resolve questions and feedback before implementation starts
4. implement the slice together with relevant automated tests
5. review and test the change
6. address follow-up feedback
7. merge only after explicit approval

The repository docs are the main source of truth for scope, architecture, and standards.

## Branch Model

- `main` is the stable branch
- all non-trivial work should happen on a short-lived branch
- changes are merged back into `main` continuously
- branches should usually map to one coherent roadmap/backlog slice or sub-slice

Branch naming convention:

- `feat/<short-purpose>`
- `fix/<short-purpose>`
- `refactor/<short-purpose>`
- `docs/<short-purpose>`
- `test/<short-purpose>`
- `chore/<short-purpose>`

Examples:

- `feat/trend-summary`
- `fix/export-schema-validation`
- `test/status-classifier`

## Pull Request Expectations

- keep scope focused
- explain the purpose clearly
- note any architectural or product tradeoffs
- update documentation if behavior or architecture changes
- keep CI green
- do not merge before review and approval

## Testing Expectations

Automated tests are required for core logic.

At minimum, changes should preserve or improve coverage around:

- domain classification logic
- repository behavior
- import/export validation
- core check-in flow behavior

Full TDD is optional. Strong regression protection for important logic is not optional.

## Deployment Model

- `main` is intended to be continuously deployable
- GitHub Actions runs CI and deployment workflows
- GitHub Pages is the initial hosting target

## Commit And Merge Policy

- prefer atomic commits within a feature branch
- do not use a rebase-based merge workflow
- squash merge is the default
- regular merge is acceptable when preserving meaningful commit detail is useful
- do not merge unstable or half-reviewed work into `main`

## When Adding New Features

Before expanding scope, check that the change still fits the V1 principles:

- low-friction
- local-first
- sparse tracking
- support-oriented
- backend-optional
