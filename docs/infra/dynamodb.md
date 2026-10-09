---
type: Infrastructure
title: DynamoDB Table Configuration
description: Schema and configuration for the LFC DynamoDB table used by the Lightning Fitness Club system.
resource: DynamoDB Tables
tags: [database, dynamodb, lightning-fitness-challenge]
---

# DynamoDB Table `lightning-fitness-challenge`

This document describes the AWS DynamoDB table for the Lightning Fitness Club (LFC) automation system.

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

## Time-to-Live (TTL)

- **Enabled**: Yes
- **Attribute Name**: `ttl`
- **Expiration**: 2 years from item creation
- **Applies to**: Items in the `ACT#{...}` type only

DynamoDB TTL is a table-level feature. When enabled, you must use application logic to add the `ttl` attribute only to items that need auto-expiration (currently only `ACT` items). AWS automatically deletes items whose `ttl` has expired without additional code or charges.

## Global Secondary Index (GSI)

### GSI1: Weekly Aggregates Index

| Property            | Value                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------- |
| **Index Name**      | `GSI1`                                                                                       |
| **Key Schema**      | `week_key` (HASH), `stravaMemberId` (RANGE)                                                  |
| **Projection Type** | ALL                                                                                          |
| **Purpose**         | Enables efficient querying of weekly aggregates across all athletes for scoring computations |

## Data Model Reference

See [`../lightning-run-club/data-model.md`](../lightning-run-club/data-model.md) for the complete attribute schema and field descriptions per itemType.
