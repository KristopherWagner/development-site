---
type: Reference
title: Appendix A — Key API references
description: Summary of API endpoints and AWS free tier limits.
---
## Appendix A — Key API references (verify at build time):

- Strava: `GET /athlete/activities`, `POST /oauth/token`, `POST /oauth/revoke`, `POST /push_subscriptions`.
- NHL: `GET https://api-web.nhle.com/v1/club-schedule-season/TBL/{season}` (backfill 20182019→current), `.../club-schedule/TBL/week/{date}`, `.../scoreboard/{date}`.
- AWS free tiers (2026): Lambda 1M req + 400K GB-s/mo permanent; EventBridge Scheduler 14M/mo permanent; API Gateway HTTP 1M/mo (12 mo), then $1/M; Cognito 50K MAUs free; DynamoDB on-demand ≈ $0 at this scale; S3 archive ~GB-months pennies.

---
