---
type: Infrastructure
title: EventBridge Scheduler Configuration
description: Configuration for the AWS EventBridge Scheduler that triggers the Collector Lambda weekly.
resource: infra/template.yaml
tags: [scheduler, eventbridge, aws-events]
generated: { by: claude-code, at: 2026-10-08T15:17:30Z }
verified: { by: human:kristopher, at: 2026-10-08T15:20:00Z }
---

# EventBridge Scheduler Configuration

This document describes the AWS EventBridge Scheduler used to trigger the Collector Lambda.

## Schedule Configuration

| Property                   | Value                         | Purpose                                              |
| -------------------------- | ----------------------------- | ---------------------------------------------------- |
| **Event Source**           | EventBridge Scheduler         | Weekly trigger for data collection cycle             |
| **Schedule Expression**    | Cron-based (Tuesday 06:00 ET) | Regular weekly cadence per N2 (near-zero ops burden) |
| **Target Lambda**          | Collector                     | Ingest Strava activities for active members          |
| **Failures Trigger Alarm** | Yes                           | SNS email alert on repeated failure                  |

## Schedule Expression

### Primary Schedule (Tuesday 06:00 ET)

```cron
rate(1 week) offset(tue 0am UTC)
```

> **Note**: Times are specified in UTC; ET conversion is handled by the scheduler's timezone configuration.

### Secondary Trigger (Monday - Optional)

In dense weeks, a secondary Monday trigger can be added via Lambda or EventBridge rule modifications.

## Target Configuration

| Property          | Value                                                         |
| ----------------- | ------------------------------------------------------------- |
| **Target Type**   | AWS Lambda Function                                           |
| **Function Name** | Collector                                                     |
| **Handler**       | `bootstrap` (provided.al2)                                    |
| **Payload**       | EventBridge standard format with timestamp and source details |

## Failure Handling

See [`../lightning-run-club/failure-modes.md`](../lightning-run-club/failure-modes.md) for:

- **Rate limit failures**: Backoff strategy with SNS alert after 2 consecutive failures
- **Lambda errors**: CloudWatch alarms on Error metric (threshold: >0 in 5 minutes)
- **Alert Destination**: SNS → email

## Monitoring

| Metric                     | Threshold   | Action                                      |
| -------------------------- | ----------- | ------------------------------------------- |
| Lambda Errors              | >0 per week | SNS alert to owner                          |
| Schedule Execution Success | 99%+ weekly | Dashboard metric; no action below threshold |

## CloudWatch Integration

The scheduler creates:

- **Schedule History**: View in EventBridge console (last 100 executions)
- **Lambda Logs**: Collector Lambda logs streamed to CloudWatch Logs
- **Error Alarms**: SNS alarm on Lambda error rate
