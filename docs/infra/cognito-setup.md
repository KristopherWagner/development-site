---
type: Infrastructure
title: Amazon Cognito Setup
description: Configuration for the Cognito User Pool and App Client used by the lightning-fitness-challenge route.
resource: infra/template.yaml
tags: [auth, cognito, lightning-fitness-challenge]
generated: { by: claude-code, at: 2026-10-08T15:00:00Z }
verified: { by: human:kristopher, at: 2026-10-08T15:20:00Z }
---

# Amazon Cognito Configuration

This document describes the AWS Cognito User Pool and App Client setup deployed via [`infra/template.yaml`](../template.yaml).

## User Pool Configuration

The Cognito User Pool is defined in [`infra/template.yaml`](../template.yaml) with the following properties:

| Property                 | Value                                                           |
| ------------------------ | --------------------------------------------------------------- |
| **User Pool Name**       | `lrc-user-pool`                                                 |
| **Username Attribute**   | `email`                                                         |
| **Auto-confirm Sign-up** | `true`                                                          |
| **MFA Configuration**    | `OFF`                                                           |
| **Password Policy**      | 16+ characters, lowercase, numbers, uppercase, symbols required |

## App Client Configuration

The App Client configured for the frontend application:

| Property                | Value                         |
| ----------------------- | ----------------------------- |
| **Client Name**         | `lightning-run-club-client`   |
| **Client Secret**       | Not enabled (empty string)    |
| **OAuth Flows**         | `code`, `refresh_token_grant` |
| **Explicit Auth Flows** | `ALLOW_REFRESH_TOKEN_SECRET`  |

### Allowed OAuth Redirect URIs

The following redirect URIs are whitelisted:

- `http://localhost:3000/lightning-fitness-challenge`
- `https://kwagner.dev/lightning-fitness-challenge`

### Allowed OAuth Scopes

- `email`

## Lifecycle Notes

- **Account Creation**: Sign-up is automatically enabled with auto-confirm. When a user signs up, they receive an email from `hello@kwagner.dev`.
- **Manual Provisioning**: No manual provisioning workflow; accounts are created through the standard sign-up flow.
- **Region**: Deployed in `us-east-1`.
