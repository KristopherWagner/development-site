---
type: Infrastructure
title: DynamoDB Table Configuration
description: Schema and configuration for the LRC DynamoDB table used by the Lightning Run Club system.
resource: infra/template.yaml
tags: [database, dynamodb, lightning-run-club]
generated: { by: claude-code, at: 2026-10-08T15:15:00Z }
verified: { by: human:kristopher, at: 2026-10-08T15:20:00Z }
---

# DynamoDB Table Configuration

This document describes the AWS DynamoDB table `lrc` deployed via [`infra/template.yaml`](../template.yaml).

## Table Properties

| Property         | Value           | Source                                            |
| ---------------- | --------------- | ------------------------------------------------- |
| **Table Name**   | `lrc`           | [`infra/template.yaml`](../template.yaml) Line 2. |
| **Billing Mode** | PAY_PER_REQUEST | Default for cost efficiency (N1).                 |
| **Region**       | us-east-1       | Deployment region per infrastructure setup.       |

## Primary Key Structure

The table uses a composite primary key:

| Attribute Name | Attribute Type | Role                 |
| -------------- | -------------- | -------------------- |
| `PK`           | String         | Partition Key (HASH) |
| `SK`           | String         | Sort Key (RANGE)     |

### Item Types by PK#SK

| PK Pattern            | SK Pattern                 | Purpose                      | TTL Attribute |
| --------------------- | -------------------------- | ---------------------------- | ------------- |
| `MEMBER#{athlete_id}` | `PROFILE`                  | Member profile data          | No            |
| `MEMBER#{athlete_id}` | `TOKEN`                    | OAuth tokens (encrypted)     | No            |
| `MEMBER#{athlete_id}` | `ALIAS#{legacy_name}`      | Canonical member mapping     | No            |
| `MEMBER#{athlete_id}` | `ACT#{activity_id}`        | Weekly activity records      | Yes (2 years) |
| `MEMBER#{athlete_id}` | `WEEKMILE#{season}#{week}` | Weekly mile aggregates       | No            |
| `MEMBER#{athlete_id}` | `STREAK`                   | Streak tracking              | No            |
| `MEMBER#{athlete_id}` | `ACHV#{badge_id}`          | Awarded achievements/badges  | No            |
| `GAME#{game_id}`      | `INFO`                     | Game information             | No            |
| `WEEK#{week_key}`     | `GAMES`                    | Weekly game aggregates       | No            |
| `SEASON#{yyyyyyyy}`   | `SUMMARY`                  | Per-member season aggregates | No            |
| `RESULTS`             | `LATEST`                   | Latest results blob          | No            |
| `CONFIG`              | `RULES`                    | Scoring rule parameters      | No            |
| `CONFIG`              | `BADGES`                   | Achievement definitions      | No            |
| `MIGRATION`           | `REPORT#{run_id}`          | Migration validation reports | No            |

## Global Secondary Index (GSI)

### GSI1: Weekly Aggregates Index

- **Index Name**: `GSI1`
- **Key Schema**:
  - `week_key` (HASH)
  - `PK` (RANGE)
- **Projection Type**: ALL
- **Purpose**: Enables the Scorer Lambda to pull weekly aggregates directly for efficient recompute operations.

## Time-to-Live (TTL)

- **Enabled**: Yes
- **Attribute Name**: `ttl`
- **Expiration**: 2 years from item creation/last update
- **Applies to**: ACT (activity) items only

## Data Model Reference

See [`../lightning-run-club/data-model.md`](../lightning-run-club/data-model.md) for the complete attribute schema and field descriptions.
