# AuDHD Burnout Tracker

PWA-first Ionic app concept for personal AuDHD burnout recovery and prevention.

The initial goal is not to build a full health platform. V1 is a small, low-friction tool for:

- quick daily state capture
- personal early-warning sign tracking
- simple trend visibility
- low-capacity support
- local-first storage with a future backend migration path

## Product Direction

V1 should be:

- an Ionic PWA
- installable to the iPhone home screen
- usable offline
- local-first
- backend-optional
- simple enough to remain usable during overload

V1 should not depend on:

- native Apple integrations
- a paid Apple developer account
- a backend
- AI features
- large questionnaires

## Documentation Map

- [AGENTS.md](AGENTS.md): instructions for coding agents working in this repo
- [docs/product-concept.md](docs/product-concept.md): product concept and scope
- [docs/architecture.md](docs/architecture.md): technical architecture and storage abstraction
- [docs/roadmap.md](docs/roadmap.md): phased delivery plan
- [docs/backlog.md](docs/backlog.md): implementation slices and task breakdown
- [docs/standards.md](docs/standards.md): product, UX, data, and coding standards

## V1 Summary

Core capabilities:

- 1-3 tap daily check-in
- custom personal warning signs
- plain-language state summary
- 7-day trends
- recovery / minimum viable day screen
- low-capacity support mode
- weekly reflection
- local export/import for backup

Core tracked signals:

- capacity
- whether rest is helping
- main strain source
- personal early-warning signs

## Technical Direction

The app should be built so storage can be swapped later without rewriting domain logic.

Chosen UI stack:

- Ionic + Angular
- Angular standalone components
- TypeScript

Planned storage strategy:

- `TrackerRepository` interface as the application boundary
- local IndexedDB-backed implementation for V1
- future Firebase implementation behind the same interface

That keeps product logic, UI state, and persistence concerns decoupled.

## Delivery Model

Repository and delivery decisions:

- source control: GitHub
- stable branch: `main`
- release model: rolling release / continuous delivery
- feature development: short-lived feature branches merged into `main`
- CI/CD: GitHub Actions
- initial hosting target: GitHub Pages for the repository site

Branch naming convention:

- `feat/<short-purpose>`
- `fix/<short-purpose>`
- `refactor/<short-purpose>`
- `docs/<short-purpose>`
- `test/<short-purpose>`
- `chore/<short-purpose>`

Examples:

- `feat/quick-check-in`
- `fix/check-in-date-handling`
- `docs/update-architecture`

## Testing Expectations

Automated tests are required for core logic.

V1 does not need dogmatic full TDD, but it should include strong coverage for:

- domain classification logic
- repository behavior
- import/export validation
- core screen flows for the main check-in path

The goal is not blanket coverage. The goal is protecting the core product behavior.

## Suggested Next Step

Start implementation only after agreeing on:

- exact V1 screen list
- data model naming
- repository contract
- export/import format
- initial CI workflow contents
- GitHub Pages deployment approach

The backlog in [docs/backlog.md](docs/backlog.md) is already ordered for incremental implementation.
