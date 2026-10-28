---
type: Route
title: Lightning Fitness Challenge
description: A fitness challenge application featuring user authentication and progress tracking.
tags: [fitness, challenge, lightning-fitness]
generated: { by: human:kristopher, at: 2026-10-07T10:32:00Z }
verified: { by: human:kristopher, at: 2026-10-07T10:32:00Z }
---

# Lightning Fitness Challenge Route

## Features

- User authentication via [Amazon Cognito](../cognito.md).
- Interactive fitness challenge UI.
- Progress tracking and analytics.

## Authentication/Authorization Flow

:clipboard: -> To do
:hourglass: -> In progress
:white_check_mark: -> Done

- :white_check_mark: User clicks on the `Sign in` button and is redirected to Amazon Cognito to authenticate them
- :hourglass: We check if that Cognito user is linked to a Strava User by calling Strava API with stored tokens
- :clipboard: If they are, redirect them to the dashboard page
- :clipboard: If they are not, redirect them to authorize Strava
- :clipboard: If they authorize strava redirect them to the dashboard page
- :clipboard: If they do not, display an error message with a reason and how to try again

## Database Design (DynamoDB)

See the [DynamoDB](../infra/dynamodb.md) documentation for more information.

## API Reference

### Strava Authentication Flow

1. Redirect to Cognito authentication
2. After successful Cognito auth, call Strava `/oauth/token` endpoint with refresh token
3. Store returned tokens and athlete info in DynamoDB
4. User can now access Strava data via stored tokens

### Error Handling

- **401 Unauthorized:** Token expired or revoked → trigger re-authentication flow
- **Rate limit errors:** Wait 15 minutes or scale request volume
- **API unavailable:** Retry with exponential backoff

## Monitoring

Key metrics to track:

- Token expiration rate (proportion of expired access tokens)
- Re-authentication frequency per user
- Strava API call success/failure rates
- Lambda invocation errors

## Future Scalability

When app scales beyond current limits:

1. **Separate tables** for stats, progress data, and analytics
2. **Consider caching** frequently accessed athlete data (e.g., profile, zones)
3. **Batch operations** for bulk data exports
4. **Evaluate partition keys** for write throughput optimization
