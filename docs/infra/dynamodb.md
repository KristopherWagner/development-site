---
type: Infrastructure
title: DynamoDB Table Configuration
description: Schema and configuration for the Lightning Fitness Challenge DynamoDB table.
resource: DynamoDB Tables
tags: [database, dynamodb, lightning-fitness-challenge]
---

# Amazon DynamoDB Configuration

This document describes the AWS DynamoDB table for the Lightning Fitness Club (LFC) automation system.

## Table Properties

| Property           | Value                         | Notes                                                  |
| ------------------ | ----------------------------- | ------------------------------------------------------ |
| **Table Name**     | `lightning-fitness-challenge` | Primary table for all member data and auth links           |
| **Billing Mode**   | PAY_PER_REQUEST               | On-demand pricing                                         |
| **Region**         | us-east-1                     | N. Virginia                                            |

## Schema Design (Single Table)

The table uses a composite primary key structure to store different entities.

| Attribute Name   | Attribute Type | Role                 | Description                                             |
| ---------------- | -------------- | -------------------- | ------------------------------------------------------- |
| `PK`              | String         | Partition Key (HASH) | Unique identifier (e.g., `USER#<cognito_sub>`)         |
| `SK`              | String         | Sort Key (RANGE)     | Entity type prefix (e.g., `STR_LINK#<id>`)            |

### Auth Link Schema

To check if a user has linked their Strava account, the following structure is used:

| PK (Partition Key) | SK (Sort Key) | Attributes             |
| ------------------- | ------------- | ----------------------- |
| `USER#<cognito_sub>`| `STR_LINK#`   | `StravaID`, `LinkedAt`, `AuthToken` |

## Time-to-Live (TTL)

- **Enabled**: Yes
- **Attribute Name**: `ttl`
- **Expiration**: 2 years
- **Applies to**: Specific activity items only.
