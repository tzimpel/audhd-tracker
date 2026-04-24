# Standards

## Product Standards

- V1 must remain small and personally useful.
- Any new feature should justify its cognitive cost.
- Tracking should remain sparse by default.
- The app should support prevention and recovery, not just observation.

## UX Standards

- Primary actions should be visible without hunting.
- Avoid overwhelming the user with charts, text blocks, or too many choices.
- Screens should have one main purpose.
- Use calm, concrete wording.
- Avoid guilt-inducing prompts.
- Support dark mode only if it does not complicate the design excessively.

## Accessibility Standards

- Large tap targets
- clear visual hierarchy
- strong color contrast
- support keyboard navigation where relevant in web contexts
- avoid relying on color alone for meaning
- reduced-stimulus mode should minimize animation and visual clutter

## Data Standards

- Domain data is the source of truth.
- Derived summaries should be recalculated from stored entities.
- Every persisted structure should be version-tolerant.
- Export format must include schema version metadata.
- Use stable IDs for all user-generated entities.

## Copy Standards

Prefer:

- `capacity`
- `strain`
- `support`
- `recovery`
- `rest helping`
- `under strain`

Avoid:

- `failed`
- `unproductive`
- `lazy`
- `wellness score`
- `discipline problem`

## Architectural Standards

- UI components must not call storage APIs directly.
- Business rules belong in the domain/application layers.
- Storage implementations must stay replaceable.
- External dependencies should be minimal and justified.
- Pages deployment constraints must be considered when choosing routing and asset-path strategy.

## State Management Standards

- Keep state close to where it is used.
- Avoid global state until a real need emerges.
- Prefer simple view models and explicit actions.
- Derived state should be clearly separated from persisted state.

## Testing Standards

At minimum, cover:

- status classification logic
- warning sign recurrence logic
- repository behavior for critical data writes
- import/export validation
- core check-in flow behavior

Guidance:

- full TDD is optional
- core domain logic should usually be implemented with tests close to the change
- bug fixes in critical flows should add regression tests

## Delivery Standards

- `main` is the stable branch
- deployment follows a rolling release model
- GitHub Actions is the source of truth for CI/CD automation
- every non-trivial change should land through a purpose-named feature branch
- GitHub Pages is the initial hosting target for the PWA

Recommended branch prefixes:

- `feat/`
- `fix/`
- `refactor/`
- `docs/`
- `test/`
- `chore/`

## Styling Standards

- Keep styling calm and intentional.
- Avoid default “wellness app” aesthetics.
- Prefer clarity over decorative UI.
- Design for one-thumb mobile usage first.

## Documentation Standards

When the implementation starts:

- update docs when architectural boundaries change
- document new domain entities
- document repository contract changes
- document migrations if the local schema changes
