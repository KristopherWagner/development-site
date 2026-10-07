---
type: Reference
title: Failure Modes & Monitoring
description: Resilience patterns and alerting for the LRC system.
---
## Failure Modes & Monitoring

| Failure                 | Detection                       | Handling                                                                 |
| ----------------------- | ------------------------------- | ------------------------------------------------------------------------ |
| Strava rate limit       | `429` + headers                 | Backoff; weekly cadence tolerates retry; alert on 2 consecutive failures |
| Member revokes access   | 401 on refresh                  | REVOKED; UI "reconnect"; excluded from future weeks                      |
| Token refresh race      | Concurrent refresh              | Single-writer; conditional write on `expires_at`                         |
| NHL API stale           | Non-200 / empty                 | Keep last schedule; alert if stale > 7 days in-season                    |
| Late activity syncs     | — (expected)                    | Idempotent recompute; optional Monday trigger                            |
| Bad results JSON        | Schema validation pre-write     | Keep last-good; alert                                                    |
| Migration data mismatch | Validation report discrepancies | Reconciliation queue for manual review (§12, P3)                         |
| Lambda errors           | CloudWatch                      | 60s timeout, 256 MB; alarms on Error metric                              |

Alerting: SNS → email; alarms on Lambda Errors and stale `computed_at` (> 8 days in-season).

---
