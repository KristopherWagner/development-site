---
okf_version: 0.2
type: Plan
title: Build & Deploy Plan
description: Roadmap and execution plan for the LRC automation system (manual AWS Console setup).
tags: [deployment, infrastructure]
---

# Build & Deploy Plan

- **Infrastructure:** Manual AWS Console configuration. Lambdas deployed via Lambda console/API, DynamoDB created manually, SNS topics configured in Console, API Gateway + Cognito set up through Console UIs.
- **Frontend:** `run-club/` routes in existing Amplify app behind Amplify Auth.

## Infrastructure Setup (Manual AWS Console)

**Cognito**: See [`cognito.md`](../../infra/cognito.md) for details.

**Amazon DynamoDB** (`DynamoDB Console`):

1. Go to [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
2. Create table:
   - Table name: `lfc`
   - Partition key: `stravaMemberId` (String)
   - Sort key: `itemType` (String) — see [`../infra/dynamodb-setup.md`](../infra/dynamodb-setup.md) for all item types
   - Stream enabled: **Yes** (new and old image) for audit trail
3. Enable Auto-scaling (read capacity 5, write capacity 2 initially, scale based on utilization)

**S3 Buckets** (`S3 Console`):

1. Create `LFC-Archive` bucket:
   - Bucket name: `lfc-archive.kwagner.dev`
   - Access control: Block all public access (private only)
   - Default encryption: SSE-S3 enabled
   - Versioning: **Disabled** (immutable archive via lifecycle rules to delete after 1 year)
2. Create `LFC-Results` bucket:
   - Bucket name: `lfc-results.kwagner.dev`
   - Access control: Block all public access (private only)
   - Default encryption: SSE-S3 enabled
   - Versioning: **Enabled** (results storage with version history for audit/recovery)
   - Lifecycle rule: Overwrite weekly results JSON files each week

**AWS Lambda Functions** (`Lambda Console`):
Deploy each function via **Create function → Choose from AWS Marketplace** or **Author from scratch**:

1. **Collector Lambda** (`lrc-collector`):
   - Runtime: Python 3.12
   - Timeout: 300s (5 minutes)
   - Memory: 512 MB
   - Trigger: EventBridge rule `LRC-Collector-Schedule` (every 6 hours)
   - Permissions: Strava API, DynamoDB, S3 (results bucket)

2. **Scorer Lambda** (`lrc-scorer`):
   - Runtime: Python 3.12
   - Timeout: 300s
   - Memory: 512 MB
   - Trigger: EventBridge rule `LRC-Scorer-Schedule` (weekly)
   - Permissions: DynamoDB, API Gateway

**API Gateway** (`Lambda Console → Add a trigger → Add API trigger`):

1. Create REST API from Lambda:
   - Select existing Lambdas: `lrc-collector`, `lrc-scorer`
   - Configure methods: GET/POST for /activities, /standings, /members
2. Go to **Authorizers** tab → Add authorizer:
   - Type: Cognito User Pool
   - Select your LRC-Auth user pool
   - JWT configuration as needed

**Amazon EventBridge Rules** (`EventBridge Console`):

1. Navigate to [AWS EventBridge Console](https://console.aws.amazon.com/eventbridge/)
2. Create rule `LRC-Collector-Schedule`:
   - Schedule: cron expression `cron(0 */6 * * ? *)` (every 6 hours)
   - Target: Lambda function `lrc-collector`
3. Create rule `LRC-Scorer-Schedule`:
   - Schedule: cron expression `cron(0 2 ? * MON *)` (weekly on Monday at 2 AM)
   - Target: Lambda function `lrc-scorer`

### Environment Variables Setup

Each Lambda function needs environment variables configured in its **Configuration → Environment variables** tab:

| Variable             | Value                                               | Description                    |
| -------------------- | --------------------------------------------------- | ------------------------------ |
| `LRC_REGION`         | [your-region]                                       | AWS region (e.g., us-east-1)   |
| `LRC_USER_POOL_ID`   | See Cognito setup                                   | From Cognito console           |
| `LRC_API_URL`        | https://[api-id].execute-api.[region].amazonaws.com | API Gateway endpoint           |
| `LRC_DYNAMODB_TABLE` | lfc                                                  | DynamoDB table name            | ([`../../infra/dynamodb.md`](../../infra/dynamodb.md))
| `LFC_ARCHIVE_BUCKET` | lfc-archive.kwagner.dev                             | Archive S3 bucket              |
| `LFC_RESULTS_BUCKET` | lfc-results.kwagner.dev                             | Results S3 bucket              |
| `STRAVA_CLIENT_ID`   | [from-strava]                                       | From Strava OAuth app settings |

### Security & Compliance

- Enable CloudWatch Alarms for Lambda errors and high memory usage
- Configure API Gateway stage variables for environment-specific config
- Review IAM roles for all services (least privilege principle)
- Set up AWS Config rules for compliance monitoring

## Phases

| Phase         | Scope                                                                                                                             | Effort                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| P0            | Create Strava developer app; Manual AWS Console setup (Cognito, SES, DynamoDB, S3, Lambda, API Gateway)                           | 2 days                         |
| P1            | OAuth connect flow, DynamoDB table creation, Collector Lambda (testing with ~10 friendly runners), NHL ingestion (current season) | ~1 week of evenings            |
| P2            | Scorer + weekly rules engine, results API, members-only leaderboard, weekly scheduler                                             | ~1 week                        |
| **P3**        | **Closed Beta Test (~10 hockey club runners)**; gather feedback; performance validation                                           | ~1 week                        |
| **P4**        | Submit Extended Access application for full-scale deployment                                                                      | 1 day + approval wait          |
| **P5**        | Legacy migration (see below) + parallel run vs. live spreadsheet for 2–3 weeks                                                    | ~1 week, overlaps season start |
| P6            | Badge engine + badge backfill + Badge/History pages                                                                               | ~1 week post-launch            |
| P7 (optional) | Strava webhooks, weekly digests, social login, partial-credit standings                                                           | As desired                     |

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

1. **Archive first:** Upload original `.xlsm` to versioned S3 archive bucket (immutable source of truth; keep writing the spreadsheet in parallel until P5 validation passes).
2. **Extract:** Import script with per-season format handlers (L1: modern two-block layout vs. 2018-19 minimal layout; Sunday → Monday week normalization).
3. **Identity resolution:** Build canonical member registry; fuzzy-match names across seasons; **admin UI step**: you confirm alias merges (critical for nicknames like "Young Money" → real person). Unmatched names stay as display-only members.
4. **Load:** Idempotent upsert of `WEEKMILE` items with `source=LEGACY`.
5. **Recompute & validate:** Scorer runs against legacy seasons → compare recomputed completion %, streaks, season totals, and `Overall` aggregates vs. the spreadsheet's recorded values. Target: **≥ 95% aggregate agreement**; every discrepancy logged to `MIGRATION/REPORT#{run_id}` with cause hypotheses (rule drift — e.g., walks not counted in early seasons — data-entry typos, name splits).
6. **Reconcile:** You review the discrepancy queue; fixes are alias/rule/config changes, never hand-edited database rows. Re-run until the report is clean or discrepancies are accepted and documented.
7. **Backfill badges (P6):** Evaluate `CONFIG/BADGES` against full history; award backlog.

**Current Configuration** (`docs/lightning-run-club/environment-variables.md`):

| Component      | Value                                   | How to update                                          |
| -------------- | --------------------------------------- | ------------------------------------------------------ |
| Custom domain  | `https://auth.kwagner.dev`              | ACM certificate in Cognito Console → Domain settings   |
| Email provider | Amazon SES (US East)                    | SES identities verified + SNS topic in Cognito console |
| FROM address   | `hello@kwagner.dev` (Kristopher Wagner) | SES identity verification                              |
