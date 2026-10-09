---
type: Reference
title: Extended Access Application Description
description: Draft application description for Strava Extended Access request.
tags: [strava, extended-access, application]
---

# Lightning Run Club — Extended Access Application Description

Use this text when submitting your request via the [Strava Developer Program review form](https://share.hsforms.com/1VXSwPUYqSH6IxK0y51FjHwcnkd8).

---

## Application Title

**Lightning Run Club (LRC) — Consumer Fitness Challenge Tracker**

---

## Use Case & Value Proposition

The **Lightning Run Club** is a weekly consumer fitness challenge that engages runners, walkers, and hikers in friendly competition around professional hockey games. Our system:

- **Complements Strava:** We do not compete with Strava; we leverage the Strava API to ingest athletes' activity data with their permission, providing them with personalized progress tracking, seasonal badges, and community recognition.
- **Enhances the athlete experience:** Members receive automatic activity ingestion, lifetime statistics, streak tracking, and achievement badges without manual data entry.
- **Privacy-first design:** We only collect activity type, date, distance, and time—no GPS coordinates or personal health information beyond what Strava already makes available to third parties when authorized.

**Scale rationale for Extended Access:** The LRC serves approximately 65 registered athletes in the Lightning Hockey Club ecosystem. While our current user count is modest, we are building toward:

- **Organic growth** through the hockey community and broader fitness challenges
- **Multi-challenge expansion** (e.g., monthly leagues, regional events) that could scale beyond Strava's Standard Tier limits
- Extended Access approval now future-proofs our infrastructure for growth without service interruption

---

## Data Minimization & Privacy Compliance

LRC adheres strictly to Strava's API Policy and data handling requirements:

| Requirement                  | LRC Implementation                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Explicit user consent        | OAuth authorization code flow requires athlete approval on Strava UI                                                      |
| User-specific visibility     | Only the authenticated athlete can view their own collected activities and stats                                          |
| Data deletion on termination | All activity records are purged within 30 days of deauthorization                                                         |
| Cache limits                 | No persistent caching beyond 7-day window; activities written to DynamoDB immediately upon ingestion                      |
| Privacy settings respected   | OAuth scope defaults to `activity:read` (or `activity:read_all` if athlete opts in); never requests write/location scopes |

**We do NOT:**

- ❌ Train AI/ML models on Strava data
- ❌ Aggregate or publish de-identified leaderboards beyond members-only access
- ❌ Export data to vector stores or third-party analytics platforms
- ❌ Re-expose the API via intermediary services

---

## Technical Architecture Overview

### Data Flow

```
Athlete (Strava)
    │
    │ ① Clicks "Connect with Lightning Run Club" on LRC website
    ▼
LRC Frontend (Amplify Hosted UI) ── Cognito JWT verified
    │
    │ ② Redirects to Strava OAuth authorize URL with nonce
    ▼
Strava Consent Screen ← Athlete approves scope: activity:read / activity:read_all
    │
    │ ③ Redirect back to LRC callback with auth code
    ▼
LRC Collector Lambda ── ④ Exchanges code for tokens (access_token, refresh_token)
                          ── ⑤ Fetches athlete activities since last sync
                          ── ⑥ Upserts activity records to DynamoDB
                          ── ⑦ Recomputes weekly totals, streaks, and badges
    │
    │ Weekly polling via EventBridge Scheduler (Tue 06:00 ET)
    ▼
Results served via API Gateway (HTTP + Cognito JWT authorizer) to LRC website
```

### Infrastructure

- **AWS Region:** `us-east-1` (or athlete's preferred region with data residency as needed)
- **Backend:** Python Lambda functions (~60s timeout); Serverless architecture ensures near-zero ops burden
- **Storage:** DynamoDB (`lrc` table); S3 private bucket for weekly results JSON; versioned archive bucket for legacy import
- **AuthN/Z:** Amazon Cognito User Pool + API Gateway Cognito JWT authorizer

### Free Tier Compliance

LRC operates within AWS Free Tier limits:

- Lambda: 1M requests/month (plenty for 65 athletes × weekly polling)
- DynamoDB: On-demand pricing; at this scale, negligible cost
- S3: Archive storage ~$0.023/GB/month

**Estimated monthly cost:** <$0.50 when running during the season; $0 when inactive.

---

## Compliance Statement

> The Lightning Run Club complies with all terms outlined in the Strava Developer Program API Policy and Extended Access requirements. We do not use AI/ML training on athlete data, we never aggregate de-identified data beyond members-only leaderboards, and we delete all user data within 30 days of deauthorization or account termination. LRC respects all athlete privacy settings and only collects activity type, date, distance, and moving time—never GPS coordinates or sensitive health information.

---

## Requested Access Level

We respectfully request **Extended Access Tier** to support our current ~65 athlete cohort and future growth. Our weekly polling approach (EventBridge Scheduler → Collector Lambda) is lightweight on API capacity: approximately 65–300 requests per week even across all athletes, well below any rate limits.

We will immediately contact Strava if policy updates or new requirements are issued; we remain committed to responsible data stewardship throughout the partnership.

---

## Points of Contact

- **Developer:** Kristopher Wagner
- **Project Repository:** `KristopherWagner/development-site` (public, for transparency)
- **Support:** kristopher.wagner@email.com _(update with actual email)_

---

## OAuth Configuration Details

| Setting | Value | Notes |
|---------|-------|-------|
| **Redirect URI** | `https://auth.kwagner.dev/strava/callback` | Production callback for Strava OAuth; configured in Cognito custom domain + Strava app settings |
| **Cognito User Pool Domain** | `auth.us-east-1iail71ujs.auth.us-east-1.amazoncognito.com` | Your Cognito user pool custom domain |
| **AWS Region** | `us-east-1` | Lambda, DynamoDB, and S3 location |

---

### Strava Developer App Registration

When registering your Strava developer app:

- **Authorization callback URL:** `https://auth.kwagner.dev/strava/callback`
- **Application name:** `Lightning Run Club` (or descriptive variant)
- **Description:** Use the text from this document (section "Use Case & Value Proposition")

⚠️ **Important:** This redirect URI must be exact-match configured in Strava's app settings. Once registered, do not change it — that requires re-registering the entire app.

---

_This application description is current as of October 2026._
