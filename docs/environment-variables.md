---
type: Reference
title: Environment Variables
description: Configuration of system environment variables and their purposes.
resource: .env
tags: [config, environment, auth]
---

# Schema
The following variables are defined in the `.env` file and accessed via `src/config.ts`.

| Key | Description | Example Value |
| --- | --- | --- |
| `PUBLIC_COGNITO_AUTHORITY` | The Cognito authority URL. | `https://cognito-idp.<REGION>.amazonaws.com/<ID>` |
| `PUBLIC_COGNITO_CLIENT_ID` | The Cognito App Client ID. | `<COGNITO_CLIENT_ID>` |
| `PUBLIC_COGNITO_REDIRECT_URI` | The authorized redirect URI for Cognito. | `http://localhost:3000/lightning-fitness-challenge` |
| `PUBLIC_STRAVA_CLIENT_ID` | The Strava OAuth Client ID. | `<STRAVA_CLIENT_ID>` |
| `PUBLIC_STRAVA_REDIRECT_URI` | The authorized redirect URI for Strava. | `http://localhost:3000/lightning-fitness-challenge` |
| `PUBLIC_STRAVA_SCOPE` | The permissions requested from Strava. | `read,activity:read_all` |

# Usage
Variables are accessed in the frontend via `import.meta.env`.
To ensure consistency, all variables are wrapped in the `src/config.ts` file.

# Examples
To get the Strava Client ID in a component:
```typescript
import { STRAVA_CONFIG } from '../../config';
console.log(STRAVA_CONFIG.clientId);
```
