---
okf_version: 0.2
type: Plan
title: Build & Deploy Plan
description: Roadmap and execution plan for the LRC automation system.
tags: [deployment, infrastructure]
---

# Build & Deploy Plan

- **IaC:** AWS SAM — 4 Lambdas, 1 DynamoDB table, 2 schedules, 1 private S3 bucket + 1 versioned archive bucket, HTTP API + Cognito authorizer, Cognito user pool. ~350 lines; `sam deploy`.
- **Frontend:** `run-club/` routes in existing Amplify app behind Amplify Auth.

## Infrastructure

- **AWS SAM** (`infra/template.yaml`): 4 Lambdas, 1 DynamoDB table, 2 schedules, HTTP API, Cognito user pool, Cognito custom domain.
- **Console Configuration**: After initial SAM deploy, configure email delivery (SES) and verify ACM certificate in Cognito console. See `env-config.yaml` for current settings.

**Current Configuration** (`docs/lightning-run-club/environment-variables.md`):

| Component | Value | How to update |
|-----------|-------|---------------|
| Custom domain | `https://auth.kwagner.dev` | ACM certificate applied in Cognito Console → Add custom domain |
| Email provider | Amazon SES (US East) | Cognito Console → User pool → Message customizations → SNS topic |
| FROM address | `hello@kwagner.dev` (Kristopher Wagner) | SES identity verification + Cognito email settings |

## Phases

| Phase         | Scope                                                                                                      | Effort                         |
| ------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------ |
| P0            | Create Strava developer app; Deploy SAM with Cognito custom domain + SES integration                       | 1 day                         |
| P1            | OAuth connect flow, DynamoDB table creation, Collector Lambda (testing with ~10 friendly runners), NHL ingestion (current season) | ~1 week of evenings            |
| P2            | Scorer + weekly rules engine, results API, members-only leaderboard, weekly scheduler                      | ~1 week                        |
| **P3**        | **Closed Beta Test (~10 hockey club runners)**; gather feedback; performance validation                    | ~1 week                       |
| **P4**        | Submit Extended Access application for full-scale deployment                                               | 1 day + approval wait         |
| **P5**        | Legacy migration (see below) + parallel run vs. live spreadsheet for 2–3 weeks                             | ~1 week, overlaps season start |
| P6            | Badge engine + badge backfill + Badge/History pages                                                        | ~1 week post-launch            |
| P7 (optional) | Strava webhooks, weekly digests, social login, partial-credit standings                                    | As desired                     |

## P3 — Closed Beta Test Runbook

The closed beta test validates the system with ~10 hockey club runners before full-scale deployment:

1. **Invite participants:** Select 10 trusted runners from the hockey club (mix of experience levels).
2. **Onboard manually:** Walk through the Connect-with-Strava flow for each beta tester; confirm OAuth success, DynamoDB records, and activity ingestion works end-to-end.
3. **First-week test cycle:** Run a full week on Monday:
   - Collector ingests activities from all ~10 beta testers
   - Scorer recomputes weekly totals, streaks, and badges
   - Leaderboard renders correctly with members-only access
4. **Gather feedback:** Collect UX feedback on:
   - Connect flow clarity (help text, error messages)
   - Activity display in leaderboard
   - Badge notifications/awards
5. **Performance check:** Verify response times under load (~10 concurrent OAuth calls + weekly ingestion).
6. **Decision point:** After P3 validation, proceed to P4 (Extended Access application for full-scale deployment with ~65 members).

## P5 — Legacy Migration Runbook

1. **Archive first:** upload original `.xlsm` to versioned S3 archive bucket (immutable source of truth; keep writing the spreadsheet in parallel until P5 validation passes).
2. **Extract:** import script with per-season format handlers (L1: modern two-block layout vs. 2018-19 minimal layout; Sunday → Monday week normalization).
3. **Identity resolution:** build canonical member registry; fuzzy-match names across seasons; **admin UI step**: you confirm alias merges (critical for nicknames like "Young Money" → real person). Unmatched names stay as display-only members.
4. **Load:** idempotent upsert of `WEEKMILE` items with `source=LEGACY`.
5. **Recompute & validate:** Scorer runs against legacy seasons → compare recomputed completion %, streaks, season totals, and `Overall` aggregates vs. the spreadsheet's recorded values. Target: **≥ 95% aggregate agreement**; every discrepancy logged to `MIGRATION/REPORT#{run_id}` with cause hypotheses (rule drift — e.g., walks not counted in early seasons — data-entry typos, name splits).
6. **Reconcile:** you review the discrepancy queue; fixes are alias/rule/config changes, never hand-edited database rows. Re-run until the report is clean or discrepancies are accepted and documented.
7. **Backfill badges (P6):** evaluate `CONFIG/BADGES` against full history; award backlog.
