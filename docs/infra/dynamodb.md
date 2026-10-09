---
type: Infrastructure
title: DynamoDB Table Configuration
description: Schema and configuration for the LFC DynamoDB table used by the Lightning Fitness Club system.
resource: DynamoDB Tables
tags: [database, dynamodb, lightning-fitness-challenge]
---

# DynamoDB Table `lightning-fitness-challenge`

This document describes the AWS DynamoDB table created manually via the AWS Console for the Lightning Fitness Club (LFC) automation system.

## Table Properties

| Property           | Value                         | Notes                                                  |
| ------------------ | ----------------------------- | ------------------------------------------------------ |
| **Table Name**     | `lightning-fitness-challenge` | Used by all Lambda functions and API Gateway           |
| **Billing Mode**   | PAY_PER_REQUEST               | On-demand pricing, free tier compliant for ~65 members |
| **Region**         | us-east-1                     | N. Virginia                                            |
| **Stream Enabled** | Yes (new and old images)      | Captures write/delete events for audit trail           |

## Primary Key Structure

The table uses a **composite primary key** with two attributes:

| Attribute Name   | Attribute Type | Role                 | Description                                             |
| ---------------- | -------------- | -------------------- | ------------------------------------------------------- |
| `stravaMemberId` | String         | Partition Key (HASH) | Athlete's Strava ID (unique across all athletes)        |
| `itemType`       | String         | Sort Key (RANGE)     | Type of data item (PROFILE, TOKEN, ACT, WEEKMILE, etc.) |

### What is `itemType`?

The `itemType` field acts like a folder selector. Each athlete's data is stored under their Strava ID, and the itemType determines which "sub-folder" the data goes into. This allows efficient querying:

- Query by partition key alone (`stravaMemberId = 12345`) → Get all data for athlete #12345
- Query by partition + sort key (`stravaMemberId = 12345`, `itemType = ACT`) → Get just that athlete's activities

### Item Types (Sort Key Values)

| itemType                   | Purpose                                                     | TTL Enabled   | Notes                                |
| -------------------------- | ----------------------------------------------------------- | ------------- | ------------------------------------ |
| `PROFILE`                  | Member profile data (name, email, avatar, club affiliation) | No            | Core identity record                 |
| `TOKEN`                    | OAuth tokens (access_token, refresh_token)                  | No            | Encrypted at rest                    |
| `ALIAS#{legacy_name}`      | Legacy name → canonical member mapping                      | No            | Enables legacy spreadsheet migration |
| `ACT#{activity_id}`        | Weekly activity records (distance, type, date)              | Yes (2 years) | Raw Strava activities                |
| `WEEKMILE#{season}#{week}` | Weekly mile aggregates for scoring                          | No            | Scoring calculation cache            |
| `STREAK`                   | Current streak tracking                                     | No            | Lifetime streak data                 |
| `ACHV#{badge_id}`          | Awarded achievements/badges                                 | No            | Badge metadata                       |
| `GAME#{game_id}`           | Game information (opponent, date)                           | No            | Hockey game records                  |
| `WEEK#{week_key}`          | Weekly game aggregates                                      | No            | Week summary                         |
| `SEASON#{yyyyyyyy}`        | Per-member season aggregates                                | No            | Season totals                        |
| `RESULTS`                  | Latest results blob                                         | No            | Current standings snapshot           |
| `CONFIG`                   | Scoring rule parameters                                     | No            | Hard-coded configuration             |
| `CONFIG.BADGES`            | Achievement definitions                                     | No            | Badge rules (JSON)                   |
| `MIGRATIONREPORT#{run_id}` | Migration validation reports                                | No            | Legacy spreadsheet import results    |

## Provisioned Throughput

Since we're using PAY_PER_REQUEST billing mode, capacity scales automatically. Initial recommendations:

| Setting                    | Recommended Value    | Notes                              |
| -------------------------- | -------------------- | ---------------------------------- |
| Read Capacity Units (RCU)  | Auto-scaling enabled | Start at 5 RCU-equivalent baseline |
| Write Capacity Units (WCU) | Auto-scaling enabled | Start at 2 WCU-equivalent baseline |

AWS will automatically scale based on utilization patterns. Monitor CloudWatch metrics and adjust if needed.

## Time-to-Live (TTL)

- **Enabled**: Yes
- **Attribute Name**: `ttl`
- **Expiration**: 2 years from item creation/last update
- **Applies to**: `ACT` (activity) items only

Activities older than 2 years are automatically purged to control storage costs.

## Global Secondary Index (GSI)

### GSI1: Weekly Aggregates Index

| Property            | Value                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------- |
| **Index Name**      | `GSI1`                                                                                       |
| **Key Schema**      | `week_key` (HASH), `stravaMemberId` (RANGE)                                                  |
| **Projection Type** | ALL                                                                                          |
| **Purpose**         | Enables efficient querying of weekly aggregates across all athletes for scoring computations |

## Deployment Steps (Manual Console Setup)

### 1. Create the Table

1. Go to [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
2. Click **Create table**
3. Configure:
   - Table name: `lfc`
   - Partition key: `stravaMemberId` (String)
   - Sort key: `itemType` (String)
   - Billing mode: On-demand (PAY_PER_REQUEST)
   - Streams: Enabled with "New and old image"
4. After table creation, go to **Streams** tab and add TTL attribute:
   - Attribute name: `ttl`
   - Select items with TTL: Type in field or use selector
   - TTL type: Number (timestamp)

### 2. Add TTL Setting for ACT Items

1. Go to **Table settings** → **Time to live** tab
2. Click **Add time to live attribute**
3. Name: `ttl`
4. Select items with TTL: Type `ACT#.*` or similar pattern
5. Set expiration in days (730 = 2 years)

### 3. Configure Streams for Auditing

1. Go to **Table settings** → **Streams** tab
2. Verify "New and old image" is selected
3. This enables CloudWatch Logs to capture every item change

## Data Model Reference

See [`../lightning-run-club/data-model.md`](../lightning-run-club/data-model.md) for the complete attribute schema and field descriptions per itemType.

# Actual settings

Table name: lightning-fitness-challenge

## Settings

### General information

Partition key
stravaMemberId (String)
Sort key
itemType (String)
Capacity mode
On-demand
Table status
Active
Alarms
No active alarms
Point-in-time recovery (PITR)Info
Off
Item count
0
Table size
0 bytes
Average item size
0 bytes
Resource-based policyInfo
Not active
Amazon Resource Name (ARN)
arn:aws:dynamodb:us-east-1:575108915575:table/lightning-fitness-challenge

### Time to Live (TTL)

TTL status
On
TTL attribute
ttl View items
Items deleted in the last 24 hours
0 View graph

## Backups

### Point-in-time recovery (PITR)

Status
On
Backup recovery period
35 days
Earliest restore point
October 9, 2026, 13:40:42 (UTC-04:00)
Latest restore point
October 9, 2026, 13:40:42 (UTC-04:00)

## Exports and stream

### Exports to S3

Empty

### DynamoDB stream details

Stream status
On
Resource-based policy
Not active
View type
New and old images
Latest stream ARN
arn:aws:dynamodb:us-east-1:575108915575:table/lightning-fitness-challenge/stream/2026-10-09T17:30:02.538
