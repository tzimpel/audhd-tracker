# Agent Instructions

This repository is for a small, personal, PWA-first AuDHD burnout tracking app.

Implementation stack for this repo:

- Ionic + Angular
- Angular standalone components, not NgModule-based feature modules
- TypeScript

Delivery model for this repo:

- GitHub-hosted repository
- `main` is always intended to stay stable
- rolling release / continuous delivery model
- feature branches for all non-trivial work
- GitHub Actions for CI/CD
- GitHub Pages as the initial deployment target

All coding agents must optimize for:

- low cognitive load for the user
- low implementation complexity for V1
- local-first architecture
- clear future migration path to a real backend
- plain language over wellness jargon

## Product Guardrails

- Do not expand V1 into a generic wellness platform.
- Do not add long questionnaires.
- Do not add AI summaries, recommendations, or chat features in V1.
- Do not add native-only platform dependencies unless explicitly requested.
- Do not make a backend mandatory in V1.
- Do not design around perfect data completeness. Sparse input is expected.

## UX Guardrails

- Every primary user flow should be usable in a low-capacity state.
- Prefer 1-3 tap interactions for daily tracking.
- Avoid dense dashboards.
- Avoid noisy motion and visually busy layouts.
- Support skipped days gracefully.
- Always allow uncertainty. Inputs like `not sure` and `skip` are valid.

## Architecture Guardrails

- Keep domain logic independent from persistence.
- Access stored data only through repository interfaces.
- Avoid coupling UI components directly to IndexedDB or browser APIs.
- Treat export/import as part of the core local-first design, not an afterthought.
- Assume Firebase or another backend may be added later, but do not design V1 around backend constraints.
- Keep deployment constraints in mind for GitHub Pages. V1 routing and asset paths must work when hosted under a repository subpath.

## Implementation Priorities

1. Domain model and repository contract
2. CI/CD and deployment baseline
3. Local storage implementation
4. Quick check-in flow
5. Home summary logic
6. Trends
7. Recovery/support mode
8. Weekly reflection
9. Export/import

## Coding Standards

- Use TypeScript strictly.
- Prefer Angular standalone components, standalone routing, and provider-based configuration.
- Prefer simple, explicit code over clever abstractions.
- Keep files cohesive and small.
- Add comments only where intent is not obvious.
- Avoid introducing heavy dependencies without clear justification.
- Keep data models serializable and versionable.

## Git Workflow Standards

- Work from short-lived branches off `main`.
- Use branch prefixes that describe intent:
  - `feat/`
  - `fix/`
  - `refactor/`
  - `docs/`
  - `test/`
  - `chore/`
- Keep pull requests focused to one slice of work where practical.
- Do not merge changes that break the main build, tests, or deployment workflow.

## Data Standards

- Timestamps should be stored in ISO 8601 string form unless there is a strong reason not to.
- Domain entities should include stable IDs.
- Plan for schema evolution from the start.
- Never store derived summaries as the source of truth if they can be recomputed.

## When In Doubt

- Choose the simpler implementation.
- Keep the domain model clean.
- Preserve the storage abstraction.
- Protect low-friction UX.
