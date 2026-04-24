# Backlog And Implementation Slices

This backlog is intentionally ordered so the app can be built one feature slice at a time.

## Slice 1: Project Scaffolding

Goal:

- establish the Ionic PWA project structure

Tasks:

- scaffold Ionic Angular app with standalone components
- add linting/formatting baseline if desired
- define initial folder structure
- configure routing with GitHub Pages deployment constraints in mind
- verify local dev server
- verify PWA build runs

Definition of done:

- app runs locally
- routes load
- project structure matches architecture direction

## Slice 1.5: Repository Automation

Goal:

- establish GitHub-based delivery from the start

Tasks:

- add GitHub Actions workflow for install, lint, build, and test
- add GitHub Actions workflow for GitHub Pages deployment
- configure deployment artifact generation for Angular/Ionic build output
- document required GitHub repository settings
- ensure `main` is the deployment source branch

Definition of done:

- pull requests can run CI
- `main` can deploy to GitHub Pages
- the deployment path strategy is documented

## Slice 2: Domain Model

Goal:

- define stable domain types before UI complexity grows

Tasks:

- create enums for capacity, strain, and status
- create entity types for check-ins, warning signs, settings, reflections, recovery plan
- define repository interfaces
- define import/export schema envelope

Definition of done:

- types compile
- repository contracts are stable enough for V1

## Slice 3: Local Storage Adapter

Goal:

- provide a functioning local persistence layer

Tasks:

- choose IndexedDB wrapper or raw IndexedDB approach
- implement database schema setup
- implement repository methods for settings and warning signs
- implement repository methods for check-ins
- implement repository methods for reflections and recovery plan
- add simple migration/versioning mechanism

Definition of done:

- data survives refresh
- repository operations work end-to-end

## Slice 4: Onboarding

Goal:

- capture the minimum personalization for useful tracking

Tasks:

- welcome screen
- explain app purpose briefly
- create warning sign setup flow
- optional recovery defaults input
- save onboarding completion state

Definition of done:

- first-time user can finish setup in a few minutes

## Slice 5: Quick Check-In

Goal:

- deliver the core daily interaction

Tasks:

- capacity selector
- main strain selector
- rest helping selector
- warning sign multi-select
- save action
- confirmation state

Definition of done:

- user can complete a check-in in 1-3 taps plus optional warning sign taps

## Slice 6: Home Screen Summary

Goal:

- make today’s state understandable immediately

Tasks:

- load latest data
- compute recent status classification
- render simple status card
- show recent trend summary text
- surface one suggested next action

Definition of done:

- home screen answers “how am I doing?” without opening charts

## Slice 7: Trend Screen

Goal:

- show simple pattern visibility without dashboard overload

Tasks:

- list or chart last 7 days of capacity
- show count of `restHelping = no`
- show top strain sources
- show recurring warning signs

Definition of done:

- recent patterns are visible in under 10 seconds of scanning

## Slice 8: Recovery Plan

Goal:

- support action, not just awareness

Tasks:

- create/edit essential tasks
- create/edit essential care list
- create/edit defer list
- create/edit support actions
- render “today recovery” summary

Definition of done:

- user can define and revisit a minimum viable day plan

## Slice 9: Support Mode

Goal:

- preserve usability in overload

Tasks:

- create reduced-stimulus layout
- add simplified support screen
- large-button actions
- no-chart mode
- quick-access navigation from home

Definition of done:

- app remains useful when user has very low capacity

## Slice 10: Weekly Reflection

Goal:

- provide lightweight review and adjustment

Tasks:

- weekly reflection form
- save weekly reflection
- show prior reflections
- summarize recent patterns

Definition of done:

- user can complete a weekly review in a few minutes

## Slice 11: Export / Import

Goal:

- reduce risk of local-data loss

Tasks:

- export versioned JSON
- import versioned JSON
- validate schema version
- show safe import warnings

Definition of done:

- user can back up and restore data locally

## Slice 12: Testing And Hardening

Goal:

- make the app safe for regular personal use

Tasks:

- add tests for classification logic
- add repository contract tests
- add core component/screen flow tests
- handle empty states
- handle storage errors
- validate installability/offline behavior
- polish copy and accessibility

Definition of done:

- core flows are stable and understandable

## Candidate Stretch Tasks After V1

- adaptive rotating secondary questions
- reminders
- lightweight data visualization improvements
- backend adapter spike
- sync-ready auth and user model design
