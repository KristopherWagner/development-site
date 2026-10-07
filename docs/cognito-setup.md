---
type: Infrastructure
title: Amazon Cognito Setup
description: Configuration details for the Amazon Cognito user pool and client used by the lightning-fitness-challenge route.
tags: [auth, cognito, lightning-fitness-challenge]
generated: { by: human:kristopher, at: 2026-10-07T10:23:00Z }
verified: { by: human:kristopher, at: 2026-10-07T10:23:00Z }
---

# Cognito Configuration

This document outlines the Amazon Cognito setup for the `lightning-fitness-challenge` route.

## User Pool Details

- **App Client ID**: `${env.PUBLIC_COGNITO_CLIENT_ID}`
- **Region**: `us-east-1`

## Authentication Flow

### User Journey

1.  **Entry**: User visits `kwagner.dev/lightning-fitness-challenge`.
2.  **Redirect**: The application redirects the user to `auth.kwagner.dev`
3.  **Authentication**: User logs in on the auth domain.
4.  **Return**: Upon successful login, the user is redirected back to `kwagner.dev/lightning-fitness-challenge`.

### Account Management

- **No Self-Registration**: Public account sign-up is disabled.
- **Provisioning**: Accounts are manually provisioned by an administrator.
- **Notification**: When an account is created, the user receives an email from `hello@kwagner.dev` containing their login credentials.

## Client Configuration

The client is configured to allow:

- `callback` URLs: `https://kwagner.dev/lightning-fitness-challenge`
- `Allowed OAuth Scopes`: `email`
