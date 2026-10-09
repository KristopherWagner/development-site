---
type: Infrastructure
title: Amazon Cognito Setup
description: Configuration for the Cognito User Pool and App Client used by authentication.
resource: Amazon Cognito
tags: [auth, cognito]
---

# Amazon Cognito Configuration

This document describes the AWS Cognito User Pool and App Client setup deployed in the AWS console.

## User Pool Configuration

| Property                 | Value               |
| ------------------------ | ------------------- |
| **User Pool Name**       | `User pool - -9nj7` |
| **Username Attribute**   | `email`             |
| **Auto-confirm Sign-up** | `true`              |
| **MFA Configuration**    | `OFF`               |

## App Client Configuration

| Property                | Value                         |
| ----------------------- | ----------------------------- |
| **Client Name**         | `Lightning Fitness Challenge` |
| **Client Secret**       | Not enabled (empty string)    |
| **OAuth Flows**         | `code`, `refresh_token_grant` |
| **Explicit Auth Flows** | `ALLOW_REFRESH_TOKEN_SECRET`  |

### OAuth Redirect URIs

| Type                      | URL                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Allowed callback URLs** | `http://localhost:3000/lightning-fitness-challenge`, `https://kwagner.dev/lightning-fitness-challenge` |
| **Default redirect URL**  | `https://kwagner.dev/lightning-fitness-challenge`                                                      |
| **Allowed sign-out URLs** | `https://kwagner.dev`                                                                                  |

## Domain & Email Configuration

| Property               | Value                                 |
| ---------------------- | ------------------------------------- |
| **Custom Domain**      | `https://auth.kwagner.dev`            |
| **Branding Version**   | Managed login                         |
| **Email Provider**     | Amazon SES                            |
| **SES Region**         | US East (N. Virginia)                 |
| **Verified Domain**    | `kwagner.dev`                         |
| **FROM email address** | `hello@kwagner.dev`                   |
| **FROM sender name**   | Kristopher Wagner <hello@kwagner.dev> |
| **Reply-To address**   | -                                     |

## SMS Configuration

| Setting         | Value               |
| --------------- | ------------------- |
| **SMS Enabled** | No (not configured) |
