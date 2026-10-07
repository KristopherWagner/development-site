---
type: Reference
title: Security & Privacy
description: Security measures and privacy principles for member data.
---
## Security & Privacy

- **AuthN/Z:** Cognito user pool (email + password); you provision 65 emails; removal from pool = immediate access loss.
- **API protection:** results/history/badges served only via API Gateway HTTP API + Cognito JWT authorizer → Lambda reader. No public buckets, no `NONE`-auth Function URLs.
- **Strava scope:** `activity:read` default (public activities); optional `activity:read_all` per member. No write/location scopes.
- **Data minimization:** type/date/distance/time only; no GPS. Privacy note on the site raises connect-through.
- **Deauthorization:** `oauth/revoke` + token delete; profile REVOKED; legacy history retained for standings integrity.
- **Secrets:** SSM Parameter Store (standard free tier) or Lambda env vars; tokens encrypted in DynamoDB.
- **Legacy data note:** spreadsheet contains real names; the archive bucket and migrated records inherit the same members-only access controls.

---
