---
type: Reference
title: Requirements
description: Functional and non-functional requirements for the tracker.
tags: [requirements, project-goals]
---

# Requirements

## 3.1 Functional
| ID | Requirement |
|----|-------------|
| F1 | Ingest activities for connected members weekly (Strava OAuth, per-athlete) |
| F2 | Ingest Lightning schedule; derive games-per-week (Mon–Sun, ET) |
| F3 | Weekly qualification: total qualifying miles ≥ 2.0 × games that week |
| F4 | Members-only leaderboard: weekly progress, season standings |
| F5 | Retroactive re-evaluation of late-logged activities |
| F6 | Member onboarding/offboarding via "Connect with Strava" |
| F7 | Members-only access control (Cognito login) |
| F8 | **Migrate legacy spreadsheet (8 seasons, 2018-19 → 2025-26) into the system** |
| F9 | **Historical views: per-member per-season week grid, lifetime mileage, streaks (incl. historical streaks up to 100+ weeks)** |
| F10 | **Achievements/badges engine (long-term): config-defined rules, e.g., 100% season, 1,000 lifetime miles, streak milestones** |

## 3.2 Non-Functional
| ID | Requirement |
|----|-------------|
| N1 | Cost: $0/month preferred; hard cap $5/month |
| N2 | Ops burden: near-zero during season |
| N3 | Privacy: opt-in; ingest type/date/distance/time only (no GPS); members-only results |
| N4 | Reliability: self-healing retries; email alert on repeated failure |
| N5 | Scale: 65 athletes; trivial for serverless |
