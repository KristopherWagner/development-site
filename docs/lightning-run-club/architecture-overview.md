---
type: Architecture
title: Architecture Overview (AWS)
description: High-level architectural diagram and component breakdown for the LRC automation system.
tags: [architecture, aws, infrastructure]
---

# Architecture Overview (AWS)


```
                          ┌────────────────────────────────────────────────┐
                          │                  AWS (us-east-1)               │
                          │                                                │
  ┌───────────┐  weekly   │  ┌──────────────────┐                          │
  │EventBridge │──────────▶│  │ Collector Lambda │                          │
  │ Scheduler  │  trigger  │  │  (Python, ~60s)  │                          │
  └───────────┘           │  └──────┬───────┬───┘                          │
                          │         │       │                              │
                          │    ┌────▼───┐ ┌─▼────────────┐                 │
                          │    │DynamoDB│ │ Strava API   │ per-athlete    │
                          │    │        │ │ (OAuth)      │ activities     │
                          │    └───▲────┘ └─▲────────────┘                 │
                          │        │        │                              │
                          │  ┌─────┴────────┴───┐   ┌──────────────────┐   │
                          │  │ Scoring Lambda    │──▶│ S3 results/      │   │
                          │  │ + Badge Engine    │   │ weekly JSON      │   │
                          │  │  (idempotent full  │   │ (private bucket) │   │
                          │  │  recompute)       │   └───────┬──────────┘   │
                          │  └────────▲──────────┘           │              │
                          │           │              ┌───────▼──────────┐   │
                          │           │              │ NHL API          │   │
                          │           │              │ (2018→ schedules)│   │
                          │  ┌────────┴─────────┐    └──────────────────┘   │
                          │  │ API Gateway       │                            │
                          │  │ (HTTP + Cognito   │   ┌──────────────────┐    │
                          │  │  JWT authorizer)  │   │ S3 archive       │    │
                          │  └────────▲──────────┘   │ (versioned,      │    │
                          └───────────┼──────────────│  original .xlsm) │────┘
                                      │ valid JWT    └──────────────────┘
┌───────────────┐   fetch results     │              ▲ one-time import (P3)
│ Amplify site   │◀────────────────────┘   ┌─────────┴──────────┐
│ Run Club page  │   Cognito login         │ ImportJob: local    │
│ (members-only) │   Connect-with-Strava   │ script/Lambda →     │
│ + History page │                         │ parse xlsm → DynamoDB│
│ + Badges page  │                         └────────────────────┘
└───────────────┘
```

### Components

| Component        | Service                                                                 | Role                                                                                                                                                                                                                                                        |
| ---------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scheduler        | EventBridge Scheduler                                                   | Weekly (Tue 06:00 ET) → Collector; optional Mon secondary trigger in dense weeks.                                                                                                                                                                                                          |
| Ingestion        | Lambda "Collector"                                                      | Per ACTIVE member: refresh token → `GET /athlete/activities?after=<last_sync>` → upsert DynamoDB. Pagination, `429` backoff, revoked-token deactivation.                                                                                                                                   |
| Schedule source  | NHL API                                                                 | Season schedules for 2018–19 → current fetched once (backfill) + weekly refresh; `Games` + `Week` items.                                                                                                                                                                                   |
| Scoring          | Lambda "Scorer"                                                         | Full idempotent recompute: weekly qualification, standings, streaks, lifetime aggregates, badge evaluation. Writes results JSON. Late syncs retroactively corrected (F5).                                                                                                                  |
| **Badge engine** | Inside Scorer (v1)                                                      | Evaluates config-defined achievement rules per member on each recompute; writes `ACHIEVEMENT` items (idempotent — `awarded_at` set once). Separate Lambda later if rule eval grows.                                                                                                        |
| **Import job**   | One-time: local Python script (same code in a Lambda for repeatability) | Parses all 9 sheets with per-season format handlers → long-format weekly-mile records → DynamoDB; emits a **validation report** (recomputed vs. recorded completion %, streaks, `Overall` aggregates); uploads original `.xlsm` to versioned S3 archive. Re-runnable (idempotent upserts). |
| Storage          | DynamoDB                                                                | Single table `lrc` (§8).                                                                                                                                                                                                                                                                   |
| Results delivery | S3 + API Gateway (HTTP API, Cognito JWT authorizer)                     | Weekly results, season archives, lifetime stats, badges — all behind auth.                                                                                                                                                                     |
