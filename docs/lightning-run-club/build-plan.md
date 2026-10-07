---
type: Plan
title: Build & Deploy Plan
description: Roadmap and execution plan for the LRC automation system.
---
## Build & Deploy Plan

- **IaC:** AWS SAM — 4 Lambdas, 1 DynamoDB table, 2 schedules, 1 private S3 bucket + 1 versioned archive bucket, HTTP API + Cognito authorizer, Cognito user pool. ~350 lines; `sam deploy`.
- **Frontend:** `run-club/` routes in existing Amplify app behind Amplify Auth.

### Phases

| Phase         | Scope                                                                                                      | Effort                         |
| ------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------ |
| P0            | **Submit Extended Access application**; create Strava app; Cognito + Amplify Auth gate                     | 1–2 days + approval wait       |
| P1            | OAuth connect flow, DynamoDB, Collector (own account → 3 friendly members), NHL ingestion (current season) | ~1 week of evenings            |
| P2            | Scorer + weekly rules engine, results API, members-only leaderboard, weekly scheduler                      | ~1 week                        |
| **P3**        | **Legacy migration (see below) + parallel run vs. live spreadsheet for 2–3 weeks**                         | ~1 week, overlaps season start |
| P4            | Badge engine + badge backfill + Badge/History pages                                                        | ~1 week post-launch            |
| P5 (optional) | Strava webhooks, weekly digests, social login, partial-credit standings                                    | As desired                     |

### P3 — Legacy Migration Runbook

1. **Archive first:** upload original `.xlsm` to versioned S3 archive bucket (immutable source of truth; keep writing the spreadsheet in parallel until P3 validation passes).
2. **Extract:** import script with per-season format handlers (L1: modern two-block layout vs. 2018-19 minimal layout; Sunday → Monday week normalization).
3. **Identity resolution:** build canonical member registry; fuzzy-match names across seasons; **admin UI step**: you confirm alias merges (critical for nicknames like "Young Money" → real person). Unmatched names stay as display-only members.
4. **Load:** idempotent upsert of `WEEKMILE` items with `source=LEGACY`.
5. **Recompute & validate:** Scorer runs against legacy seasons → compare recomputed completion %, streaks, season totals, and `Overall` aggregates vs. the spreadsheet's recorded values. Target: **≥ 95% aggregate agreement**; every discrepancy logged to `MIGRATION/REPORT#{run_id}` with cause hypotheses (rule drift — e.g., walks not counted in early seasons — data-entry typos, name splits).
6. **Reconcile:** you review the discrepancy queue; fixes are alias/rule/config changes, never hand-edited database rows. Re-run until the report is clean or discrepancies are accepted and documented.
7. **Backfill badges (P4):** evaluate `CONFIG/BADGES` against full history; award backlog.

---
