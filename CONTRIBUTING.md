# Contributing

This project uses a simple rolling-release workflow.

## Branch Model

- `main` is the stable branch
- all non-trivial work should happen on a short-lived branch
- changes are merged back into `main` continuously

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

## When Adding New Features

Before expanding scope, check that the change still fits the V1 principles:

- low-friction
- local-first
- sparse tracking
- support-oriented
- backend-optional
