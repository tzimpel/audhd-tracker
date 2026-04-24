# Architecture Concept

## Overview

V1 should be a local-first Ionic PWA with clean separation between:

- UI
- domain logic
- persistence
- infrastructure

The most important architectural requirement is storage decoupling.

## Primary Architecture Goals

- keep product logic independent from storage technology
- support IndexedDB in V1
- allow a future backend such as Firebase without redesigning the domain
- support offline-first usage
- keep the implementation simple enough for a solo project

Additional delivery goals:

- support GitHub Actions CI/CD cleanly
- support GitHub Pages deployment with minimal operational overhead
- keep testing practical and focused on core logic

## Recommended Stack Direction

This document stays intentionally slightly abstract, but the current preferred direction is:

- Ionic + Angular
- Angular standalone components and standalone routing
- TypeScript
- IndexedDB for local persistence
- service worker / PWA installability
- charting only if a lightweight library is necessary

Framework choice has been made. The app should use modern Angular standalone APIs rather than NgModule-heavy structure.

## Angular Structure Direction

The Angular implementation should prefer:

- standalone page components
- standalone shared UI components
- route-based lazy loading where useful
- provider-based app configuration
- explicit feature folders aligned to domain concerns

Avoid:

- unnecessary global state libraries in V1
- NgModule-based feature design unless a specific library forces it
- storage logic inside components

## Deployment Constraints

The initial deployment target is GitHub Pages for the repository.

That has architectural consequences:

- the app must work under a repository subpath, not just `/`
- asset URLs must be path-safe for Pages hosting
- client-side routing must be handled carefully

Recommended V1 direction:

- prefer hash-based routing for the first deployable version, or
- explicitly solve SPA fallback behavior before using path-based routing

For a small personal PWA, hash-based routing is the safer initial choice on GitHub Pages.

Current implementation choice:

- V1 uses hash-based routing for GitHub Pages deployment
- GitHub Actions is responsible for building and publishing the `www` output

## Layered Structure

## 1. App / Presentation Layer

Responsibilities:

- routing
- screen composition
- view state
- input handling
- accessibility and responsive behavior

This layer should not know anything about IndexedDB or Firebase details.

## 2. Application / Use Case Layer

Responsibilities:

- orchestrating user actions
- transforming inputs into domain entities
- deriving summaries for screens
- coordinating repository reads and writes

Examples:

- submit daily check-in
- load home summary
- calculate 7-day trend summary
- save weekly reflection
- export user data

## 3. Domain Layer

Responsibilities:

- core entities
- enums / value objects
- business rules
- lightweight trend logic
- state classification logic

Examples:

- classify status as `stable`, `watch`, or `underStrain`
- compute recurring strain tags
- detect repeated warning signs
- determine whether support mode should be suggested

The domain layer should remain storage-agnostic.

## 4. Persistence / Integration Layer

Responsibilities:

- local IndexedDB adapter
- future remote backend adapter
- serialization and schema versioning
- import/export

This layer implements repository interfaces defined above it.

## Core Repository Boundary

The app should define interfaces before implementing storage.

Suggested repository surface:

- `TrackerRepository`
- `SettingsRepository`
- `ExportRepository`

Example responsibilities:

`TrackerRepository`

- save check-in
- list recent check-ins
- save warning sign log
- list warning sign history
- save weekly reflection
- load dashboard data

`SettingsRepository`

- load user settings
- save personal warning signs
- save recovery defaults

`ExportRepository`

- export full local dataset
- import full local dataset

V1 may implement these with one IndexedDB-backed module internally, but the interface should remain split by responsibility.

## Suggested Domain Entities

## `CheckIn`

Fields:

- `id`
- `createdAt`
- `dateKey`
- `capacity`
- `restHelping`
- `mainStrain`
- `selectedWarningSignIds`
- `secondarySignalType?`
- `secondarySignalValue?`
- `notes?`

## `WarningSign`

Fields:

- `id`
- `label`
- `active`
- `sortOrder`
- `createdAt`

## `WeeklyReflection`

Fields:

- `id`
- `weekKey`
- `drainedBy`
- `helpedBy`
- `warningSignsObserved`
- `nextWeekProtection`
- `createdAt`

## `RecoveryPlan`

Fields:

- `id`
- `essentialTasks`
- `essentialCare`
- `deferList`
- `supportActions`
- `updatedAt`

## `UserSettings`

Fields:

- `version`
- `theme`
- `reducedStimulusMode`
- `checkInReminderEnabled`
- `preferredCheckInTime?`

## Status Model

V1 should use simple, explainable classifications:

- `stable`
- `watch`
- `underStrain`

Optional later:

- `critical`

V1 should avoid pretending to generate a clinically meaningful risk score.

## Example Classification Inputs

- recent capacity trend
- repeated `restHelping = no`
- recurrence of the same strain tag
- recurrence of personal warning signs

The classification algorithm should be:

- deterministic
- inspectable
- easy to tune

## Storage Strategy

## V1

Use IndexedDB as the authoritative local store.

Reasons:

- structured client-side storage
- offline-friendly
- suitable for time-series style app data
- can store enough local data for this app without a backend

## Future

Introduce a remote implementation behind the repository boundary.

Possible later model:

- local repository remains source for offline interaction
- sync engine reconciles local data to Firebase
- conflict handling introduced only when needed

Do not introduce sync complexity in V1.

## Data Export Strategy

V1 should support export/import because PWA local storage is useful but not as durable as native app storage.

Recommended export format:

- versioned JSON

Export bundle should include:

- settings
- warning signs
- check-ins
- weekly reflections
- recovery plan
- schema version metadata

## Error Handling Principles

- failed persistence should produce a visible but calm error
- unsaved form state should not be lost silently
- import validation should fail explicitly
- unknown schema versions should not be imported blindly

## Testing Strategy Direction

Priority tests:

- domain logic tests for status classification
- repository contract tests
- import/export validation tests
- basic screen flow tests for core check-in path

V1 does not need dogmatic full TDD, but core logic should be covered early and continuously.

Practical guidance:

- domain and repository logic should usually be test-first or test-near
- UI-only styling work does not need forced TDD
- critical regressions should get tests before or alongside fixes

## Future Backend Migration Path

To keep migration safe:

- never access IndexedDB directly from screens
- avoid storage-specific data shapes leaking into UI state
- keep repository return types aligned with domain entities
- version exported/imported schema
- centralize serialization logic

That allows a future backend to be added as infrastructure, not as a full rewrite.
