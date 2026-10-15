---
type: Infrastructure
title: Amazon Cognito Setup
description: Configuration details for the Amazon Cognito user pool and client used by the lightning-fitness-challenge route.
tags: [auth, cognito, lightning-fitness-challenge]
generated: { by: ai:qwen3.5:9b, at: 2026-10-15T12:00:00Z }
verified: { by: human:kristopher, at: 2026-10-15T12:00:00Z }
---

# Cognito Configuration

This document outlines the Amazon Cognito setup for the `lightning-fitness-challenge` route.

## Infrastructure Overview

The Cognito setup consists of the following AWS resources defined in `infra/template.yaml`:

- **User Pool**: `LFC-Runners` (region: `us-east-1`)
- **User Pool Client**: `Lightning Fitness Challenge`
- **User Pool Domain**: Custom authentication domain with managed login

## User Pool Details

### Configuration

| Property                | Value           |
| ----------------------- | --------------- |
| Name                    | `LFC-Runners`   |
| Username Attribute      | `email`         |
| MFA Configuration       | `OPTIONAL`      |
| Minimum Password Length | `16` characters |
| Password History Size   | `2`             |

### Password Policy Requirements

The following character requirements are enforced:

- ✓ Must contain at least one uppercase letter
- ✓ Must contain at least one lowercase letter
- ✓ Must contain at least one number
- ✓ Must contain at least one symbol
- ✓ Temporary password valid for 7 days (if used)

### Email Configuration

| Property         | Value                                                           |
| ---------------- | --------------------------------------------------------------- |
| Sending Account  | `DEVELOPER`                                                     |
| From Address     | `Kristopher Wagner <hello@kwagner.dev>`                         |
| SES Identity ARN | `arn:aws:ses:us-east-1:575108915575:identity/hello@kwagner.dev` |

### Admin Configuration

- Admin-created users must be allowed via admin-only flag (`AllowAdminCreateUserOnly: true`)

## User Pool Client Details

### OAuth Configuration

| Property                    | Value                         |
| --------------------------- | ----------------------------- |
| App Client Name             | `Lightning Fitness Challenge` |
| Allowed OAuth Flows         | `code`                        |
| Allowed OAuth Scopes        | `email`, `openid`, `profile`  |
| Allowed as User Pool Client | Yes                           |

### Redirect URIs

| Type                 | URI                                                 |
| -------------------- | --------------------------------------------------- |
| Default Redirect URI | `https://kwagner.dev/lightning-fitness-challenge`   |
| Callback URL         | `http://localhost:3000/lightning-fitness-challenge` |
| Logout URL 1         | `http://localhost:3000`                             |
| Logout URL 2         | `https://kwagner.dev`                               |

### Explicit Auth Flows Enabled

- `ALLOW_USER_PASSWORD_AUTH` - Allows user password authentication
- `ALLOW_REFRESH_TOKEN_AUTH` - Allows refresh token authentication

### Identity Providers

- Supported: Cognito identity provider (`COGNITO`)

### Security Settings

| Setting                       | Value                                             |
| ----------------------------- | ------------------------------------------------- |
| Prevent User Existence Errors | Enabled                                           |
| Default Redirect URI          | `https://kwagner.dev/lightning-fitness-challenge` |

## User Pool Domain Details

### Domain Configuration

| Property              | Value                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------- |
| Custom Domain         | `auth.kwagner.dev` (configurable)                                                     |
| Certificate ARN       | `arn:aws:acm:us-east-1:575108915575:certificate/9c3ce001-1ff7-44e5-9884-dba1a3611ab8` |
| Security Policy       | `TLS_V1_2_2021`                                                                       |
| Managed Login Version | 2                                                                                     |

### Branding Configuration

- Uses Cognito-provided branding values (`UseCognitoProvidedValues: true`)

## Authentication Flow

### User Journey

1. **Entry**: User visits `kwagner.dev/lightning-fitness-challenge`
2. **Redirect**: The application redirects the user to the authentication domain (customizable via `DomainName` parameter)
3. **Authentication**: User logs in on the auth domain
4. **Return**: Upon successful login, the user is redirected back to `kwagner.dev/lightning-fitness-challenge`

### Account Management

- **No Self-Registration**: Public account sign-up is disabled (`AllowAdminCreateUserOnly: true`)
- **Provisioning**: Accounts are manually provisioned by an administrator
- **Notification**: When an account is created, the user receives an email from `hello@kwagner.dev` containing their login credentials

## Outputs

The following values are exported from the CloudFormation template for integration:

| Output             | Description                                 |
| ------------------ | ------------------------------------------- |
| `UserPoolId`       | The ID of the Cognito User Pool             |
| `UserPoolClientId` | The ID of the Cognito App Client            |
| `DomainName`       | The Custom Domain assigned to the User Pool |

## Deployment

To deploy this configuration, apply the `infra/template.yaml` file using AWS SAM or CloudFormation in the `us-east-1` region.

---

_Generated with [Claude Code](https://claude.com/claude-code)_
