# Product Concept

## Working Title

AuDHD Burnout Tracker

## Purpose

Create a small, private, low-friction app that helps one user:

- notice early warning signs of AuDHD burnout
- identify whether things are stable, worsening, or recovering
- act on that information with simple recovery-oriented support

This is not a diagnostic tool. It is a personal pattern-awareness and support tool.

## Problem Statement

Traditional habit trackers, journaling apps, and mood trackers are often too demanding to use during overload. They assume stable executive function and high recall. That makes them least usable when they are needed most.

The app should therefore:

- minimize daily effort
- accept sparse and imperfect input
- focus on a few high-signal indicators
- prioritize usability in low-capacity states

## Target User

Primary user for V1:

- one AuDHD adult using the app for personal recovery and prevention
- likely using an iPhone home-screen-installed PWA
- may open the app inconsistently
- may need the app most when energy and executive function are already degraded

## Core Product Thesis

The app should behave like a lightweight state-aware companion:

- quiet when things are stable
- observant when warning signs recur
- supportive when capacity drops

## V1 Goals

- Make daily tracking possible in 1-3 taps.
- Capture a few high-signal indicators consistently.
- Surface recent trends in plain language.
- Support the user with a minimum viable day / recovery mode.
- Keep all data local by default.
- Preserve a future path to backend sync without rewriting the app.

## V1 Non-Goals

- full health tracking
- Apple Health integration
- watch integrations
- automated passive data ingestion
- therapist or coach collaboration features
- large-scale analytics
- community/social features
- AI features
- diagnostic claims

## High-Signal Indicators For V1

Daily primary indicators:

- `capacity`
- `restHelping`
- `mainStrain`

Personal indicators:

- 3 to 5 custom early-warning signs defined by the user

Rotating secondary indicators:

- executive friction
- sensory/social overload
- withdrawal / reduced communication capacity
- joy / interest access

Secondary indicators should not all be asked every day.

## Key User Flows

## 1. Onboarding

The user should be able to:

- understand the app in under two minutes
- define their personal early-warning signs
- optionally define default recovery actions

## 2. Daily Check-In

The user should be able to log:

- capacity
- main strain
- whether rest is helping
- present personal warning signs

This should be skippable, fast, and forgiving.

## 3. Home Summary

The home screen should answer:

- How am I doing right now?
- Does the app think I am stable, under strain, or worsening?
- What is the one most useful next action?

## 4. Trends

The trends area should show:

- last 7 days of capacity
- repeated strain sources
- repeated personal warning signs
- whether rest has been helping recently

## 5. Recovery / Minimum Viable Day

The app should support a very small recovery plan:

- 1 to 3 essential tasks
- key self-care items
- things to defer
- low-demand recovery actions

## 6. Support Mode

When capacity is low, the app should become simpler:

- fewer words
- larger actions
- no charts
- no pressure to explain

## 7. Weekly Reflection

The app should support a short weekly review:

- what drained me
- what helped
- what signs showed up
- what boundary or support matters next week

## Product Language Principles

The app should frame burnout around:

- capacity
- demand
- recovery
- strain
- support

The app should avoid:

- shame-based language
- productivity moralizing
- vague wellness language

## Success Criteria For V1

V1 is successful if:

- the user can use it consistently enough to create pattern visibility
- the app remains usable on bad days
- the summary feels personally relevant rather than generic
- local storage is reliable enough for normal usage
- the app is structured so later sync can be added safely
