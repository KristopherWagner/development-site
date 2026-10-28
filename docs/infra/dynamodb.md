---
type: Infrastructure
title: DynamoDB Setup
description: Configuration details for the Amazon DynamoDB tables used by the lightning-fitness-challenge route.
tags: [database, dynamodb, lightning-fitness]
resource: infra/template.yaml
generated: { by: ai:qwen3.5:9b, at: 2026-10-28T13:56:00Z }
verified: { by: human:kristopher, at: 2026-10-28T13:57:00Z }
---

# DynamoDB Setup for Lightning Fitness Challenge

## Overview

This project uses AWS DynamoDB to store user link relationships between Amazon Cognito and Strava. The database is provisioned via AWS SAM (Serverless Application Model).

## Table Schema

### `lfc-user-links` - User Linking Table

**Purpose:** Store the relationship between Cognito users and their linked Strava accounts.

**Primary Key Design:** Composite key

- **Hash Key:** `cognitoUsername` (String) - Cognito user's email address
- **Range Key:** `stravaUserId` (Number) - Strava athlete ID

**Schema Attributes:**

| Attribute            | Type                    | Description                       | Notes                                   |
| -------------------- | ----------------------- | --------------------------------- | --------------------------------------- |
| cognitoUsername      | String                  | Hash key - Cognito username/email | Unique per row, identifies Cognito user |
| stravaUserId         | Number \| NULL          | Range key - Strava athlete ID     | NULL if no Strava link exists yet       |
| accessToken          | String                  | OAuth 2.0 access token JWT        | Token value from Strava API             |
| refreshToken         | String                  | OAuth refresh token               | Used to obtain new access tokens        |
| accessTokenExpiresAt | Number (Unix Timestamp) | When access token expires         | Used for on-demand token refresh logic  |

**No TTL configured:** User linking is a permanent relationship. Token expiry handled via application logic (checking expiration timestamps before API calls).

## Global Secondary Index (GSI)

_No GSIs are configured for this table._

The `lfc-user-links` table does not use any global secondary indexes. All queries use the composite primary key (`cognitoUsername` as hash, `stravaUserId` as range).

## Token Management Strategy

**Encryption Note:** DynamoDB uses AWS-managed Server-Side Encryption (AES-256) for all data at rest. OAuth tokens are stored as plain text values in DynamoDB items but are protected by infrastructure-level encryption. Application-layer token encryption is not implemented.

### Access Token Lifecycle

Strava's OAuth 2.0 tokens follow this pattern:

- **Access token expiry:** Typically 6 hours (some scopes allow longer)
- **Refresh token:** Persistent until revoked or after 120 days of inactivity
- **Inactivity window:** Refresh tokens may expire if no API requests made for 120 days

### On-Demand Refresh Logic

No cron jobs are scheduled. Instead:

1. **Before making Strava API calls**, check the `accessTokenExpiresAt` attribute
2. If token is expired or near expiry, use `refreshToken` to obtain new tokens via `/oauth/token` endpoint
3. Update DynamoDB item with new tokens and updated expiration timestamps
4. If refresh fails or user has been inactive for 120+ days → they need to reauthorize

## Deployment

To deploy this configuration, apply the `infra/template.yaml` file using AWS SAM or CloudFormation in the `us-east-1` region.
