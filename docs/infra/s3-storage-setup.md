---
type: Infrastructure
title: S3 Storage Configuration
description: Configuration for the AWS S3 buckets used for results storage and legacy data archiving.
resource: infra/template.yaml
tags: [storage, s3, aws-s3]
generated: { by: claude-code, at: 2026-10-08T15:17:00Z }
verified: { by: human:kristopher, at: 2026-10-08T15:20:00Z }
---

# S3 Storage Configuration

This document describes the AWS S3 storage configuration for the Lightning Run Club system.

## Bucket Types

Two S3 bucket patterns are referenced in the architecture:

### 1. Results Bucket (Private)

| Property      | Value                                   | Purpose                                                                |
| ------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| **Access**    | Private (Cognito-authenticated only)    | Stores weekly results JSON, season archives, lifetime stats            |
| **Lifecycle** | Overwritten/idempotent writes each week | Latest results replace previous; historical data preserved in DynamoDB |

### 2. Archive Bucket (Versioned)

| Property              | Value                                | Purpose                                                                      |
| --------------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| **Access**            | Private (Cognito-authenticated only) | Immutable archive of original `.xlsm` spreadsheet during and after migration |
| **Object Versioning** | Enabled                              | Preserves version history for audit/recovery                                 |
| **Lifecycle**         | Immutable source of truth            | No deletion; P3 legacy migration writes to this bucket                       |

## Bucket Naming Convention (Example)

```
{account-id}-lfc-results       # Weekly results, archives, lifetime stats
{account-id}-lfc-archive       # Versioned migration sources
```

> **Note**: Actual bucket names are typically derived from AWS account ID and deployment region. See AWS SAM deploy output for exact naming.

## Access Controls

### Private Bucket Policy Example

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAuthenticatedRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::lfc-{account-id}/*",
      "Condition": {
        "StringEquals": {
          "aws:username": "cognito-identity.amazonaws.com/*"
        }
      }
    }
  ]
}
```

See [`../lightning-run-club/security-and-privacy.md`](../lightning-run-club/security-and-privacy.md) for the complete security configuration.

## Storage Locations

Both buckets are deployed in:

- **Region**: us-east-1 (N. Virginia)
- **Default Endpoint**: `s3.us-east-1.amazonaws.com`

## Cleanup & Lifecycle Policies

| Policy Type              | Bucket  | Action                                             |
| ------------------------ | ------- | -------------------------------------------------- |
| Overwrite weekly results | Results | Previous week's JSON replaced on new compute cycle |
| Immutable archive        | Archive | No lifecycle expiration; preserved indefinitely    |

## Monitoring

See [`../lightning-run-club/failure-modes.md`](../lightning-run-club/failure-modes.md) for storage failure detection and handling.
