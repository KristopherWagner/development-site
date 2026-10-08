---
type: Infrastructure
title: API Gateway and HTTP API Configuration
description: Configuration for the AWS API Gateway HTTP API with Cognito JWT authorizer used by the LRC system.
resource: infra/template.yaml
tags: [api, api-gateway, cognito, aws-apigateway]
generated: { by: claude-code, at: 2026-10-08T15:16:00Z }
verified: { by: human:kristopher, at: 2026-10-08T15:20:00Z }
---

# API Gateway Configuration

This document describes the AWS API Gateway HTTP API deployed alongside the infrastructure.

## Authentication & Authorization

The API Gateway is configured with **Cognito JWT authorizer**:

| Property            | Value             | Source                                            |
| ------------------- | ----------------- | ------------------------------------------------- |
| **Authorizer Type** | Cognito User Pool | [`docs/infra/cognito-setup.md`](cognito-setup.md) |
| **JWT Validation**  | Enabled           | Enforces N3 (privacy: members-only access)        |
| **Token Scope**     | email             | OAuth scope from Cognito client                   |

### Security Architecture

- **Protected Endpoints**: All results/history/badges endpoints
- **No Public Buckets**: S3 buckets are private; no `NONE`-auth Function URLs
- **Access Flow**:
  1. Client authenticates via Cognito (see [`cognito-setup.md`](cognito-setup.md))
  2. Returns JWT token
  3. API Gateway validates JWT → forwards to Scorer Lambda

## Deployment Configuration

See [`../template.yaml`](../template.yaml) for the complete infrastructure definition including:

- **HTTP API**: Defined as `Api` resource in template
- **Endpoint Paths**:
  - `/auth/callback` (Strava OAuth callback)
  - Results endpoints (`/results`, `/history`, `/badges`)
- **Methods**: GET, POST as appropriate per endpoint

## Integration with AWS Services

The HTTP API integrates with:

| Service                 | Integration Type     | Purpose                                     |
| ----------------------- | -------------------- | ------------------------------------------- |
| **Scorer Lambda**       | Proxy integration    | Recompute weekly results, standings, badges |
| **S3 (results bucket)** | S3Lambda integration | Serve weekly JSON results                   |
| **DynamoDB**            | Lambda invokes table | Store/retrieve member data                  |

## Rate Limits

- **Default**: AWS-managed rate limits apply
- **Custom Limits**: Can be configured via API Gateway throttling policies

## CORS

- **CORS Headers**: Configured for frontend calls from `kwagner.dev` and `localhost:3000`

## Monitoring

See [`../lightning-run-club/failure-modes.md`](../lightning-run-club/failure-modes.md) for CloudWatch alarm configurations and failure mode handling.
