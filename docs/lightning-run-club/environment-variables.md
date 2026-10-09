---
okf_version: 0.2
type: Reference
title: Environment Variables
description: Environment variables for the LRC Lambda functions and infrastructure.
tags: [configuration, environment, secrets]
---

# Environment Variables

All Lambda functions and infrastructure components use environment variables to retrieve secrets (never hardcoded). Secrets are encrypted in DynamoDB or stored in SSM Parameter Store.

## Production Values

| Variable | Value | Source | Security Level |
|----------|-------|--------|---------------|
| **STRAVA_CLIENT_ID** | `YOUR_CLIENT_ID_HERE` | Strava Developer Console → Your app | Public (can document) |
| **STRAVA_CLIENT_SECRET_SSM** | `/lrc/client_secret` (SSM Path) | AWS SSM Parameter Store (encrypted at rest) | **SECRET** - use KMS or AWS Secrets Manager |
| **COGNITO_USER_POOL_ID** | `us-east-1iail71ujs` | Cognito User Pool Settings | Public (can document) |
| **COGNITO_CUSTOM_DOMAIN** | `auth.us-east-1iail71ujs.auth.us-east-1.amazoncognito.com` | Cognito Domain Settings | Public (can document) |
| **COGNITO_USER_POOL_CLIENT_ID** | `YOUR_CLIENT_ID_FROM_AMPLIFY` | Amplify Console → App clients | Sensitive - store in SSM |
| **STRAVA_REDIRECT_URI** | `https://auth.kwagner.dev/strava/callback` | Custom domain + Strava app settings | Public (can document) |
| **AWS_REGION** | `us-east-1` | Account setting | Public (can document) |
| **ENVIRONMENT** | `production` | Deployment stage | Public (can document) |

## DynamoDB Encryption

Tokens (Strava `access_token`, `refresh_token`) are encrypted before storage:

```python
from cryptography.fernet import Fernet

key = b"your_256_bit_key_here"  # Store in SSM, not env vars
cipher = Fernet(key)

encrypted_refresh = cipher.encrypt(refresh_token_bytes).decode()
# Store in DynamoDB TOKEN table item
```

**Note:** For production, use AWS KMS instead of Fernet. The current code uses a placeholder; the SAM template will include a proper KMS configuration.

---

## SSM Parameter Store Paths

| Key | Path | Type | Description |
|-----|------|------|-------------|
| `STRAVA_CLIENT_SECRET` | `/lrc/client_secret` | SecureString | Strava app secret (encrypted) |
| `SCORER_RULES_CONFIG` | `/lrc/scorer/rules.json` | String | Scoring rules JSON (not secrets) |
| `BADGES_CONFIG` | `/lrc/badges/config.json` | String | Badge definitions JSON |

---

## Local Development

For local testing (using SAM local), use a `.env` file:

```bash
# .env for SAM local development
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
COGNITO_USER_POOL_ID=us-east-1iail71ujs
COGNITO_USER_POOL_CLIENT_ID=your_amplify_client_id
STRAVA_REDIRECT_URI=https://auth.kwagner.dev/strava/callback
AWS_REGION=us-east-1
ENVIRONMENT=development
```

⚠️ **Warning:** Never deploy local `.env` files to production. Use SSM Parameter Store for secrets in production deployments.

---

## Secrets Management Best Practices

1. **Rotate client secrets annually** — Update Strava app settings, update SSM parameter
2. **Use AWS KMS** for token encryption instead of static keys (configure in SAM)
3. **Audit access** — Cognito user pool admin and SSM Parameter Store permissions
4. **Delete tokens on disconnect** — Lambda writes `TOKEN` item with `status=REVOKED`, then deletes row

---

_This document is current as of October 2026._
