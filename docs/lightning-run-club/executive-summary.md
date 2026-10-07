---
type: Playbook
title: Executive Summary
description: Overview of the Lightning Run Club automation project goals and constraints.
tags: [architecture, summary, project-overview]
---

# Background & Current Process

**Today (manual):** weekly, read Strava club leaderboard → transcribe miles into `Reddit-TBL-Fitness-Challenge.xlsm` → cross-reference Lightning games → determine qualifiers; streaks and season stats maintained by hand.

**Goal:** zero-touch weekly pipeline + members-only leaderboard with **full historical depth** (2018–present) and streaks.

**Hard constraints:**

1. Strava removed the Club Activities endpoint on **September 1, 2026** → ingestion must be per-athlete OAuth; no club feed exists.
2. The club has **65 members** (> Standard Tier ~10-user cap) → **Extended Access application is mandatory** and is the project's critical-path item.

**Scoring model (confirmed):** per Mon–Sun (ET) week, required miles = **2.0 × Lightning games that week**. Qualifying: Run, VirtualRun (treadmill), TrailRun, Walk, Hike. **No biking.** Leaderboard is members-only.
