---
type: Infrastructure
title: Strava Collector Lambda Function
description: AWS Lambda function that collects Strava activities from authenticated Lightning Run Challenge members.
resource: docs/infra/migration-go.md
tags: [lambda, strava, collector, aws-lambda, python]
status: stable
verified: true
generated: 2026-10-09
---

# Strava Collector Lambda Function

This document describes the **Collector Lambda** that periodically fetches Strava activities from authenticated members and stores them in DynamoDB for weekly scoring.

## Overview

The Collector Lambda is a background worker that runs on a weekly schedule (triggered by EventBridge Scheduler) to:

1. Fetch OAuth tokens from DynamoDB for all active members
2. Call the Strava API to retrieve recent activities
3. Store activity data in DynamoDB with proper TTL management
4. Handle rate limiting and retry logic for Strava API
5. Log successes and failures to CloudWatch

## Architecture Flow

```
┌─────────────────┐
│ EventBridge     │ ───► triggers every Monday 6 AM ET
│ Scheduler        │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Lambda Invokes   │
│ Bootstrap Entry  │
│ Point            │
└─────────────────┘
        │
        ├──────────────┬──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Get Tokens │ │  Fetch     │ │ Store      │
│ from DB    │ │ Activities │ │ to DynamoDB│
│ (strava_   │ │ from       │ │ with TTL   │
│ member_id) │ │ Strava API │ │ (2 years)  │
└────────────┘ └────────────┘ └────────────┘
```

## Dependencies

The Lambda uses the following Python packages:

| Package        | Purpose                              | Installation Command       |
| -------------- | ------------------------------------ | -------------------------- |
| `boto3`        | AWS SDK for DynamoDB operations      | `pip install boto3`        |
| `requests`     | HTTP client for Strava API calls     | `pip install requests`     |
| `pycryptodome` | AES encryption/decryption for tokens | `pip install pycryptodome` |

> **Note**: All packages are included in the Lambda Layer or the provided `requirements.txt`.

## Environment Variables

Configure these environment variables in the AWS Console when deploying the function:

| Variable Name          | Required | Default | Description                                                                  |
| ---------------------- | -------- | ------- | ---------------------------------------------------------------------------- |
| `DYNAMODB_TABLE_NAME`  | Yes      | -       | DynamoDB table name (e.g., `lightning-fitness-challenge`)                    |
| `COGNITO_ACCESS_TOKEN` | Yes      | -       | Temporary access token to call AWS APIs on behalf of the Lambda service role |
| `STRAVA_CLIENT_ID`     | Yes      | -       | Your Strava API client ID (configured in Cognito pool)                       |
| `STRAVA_CLIENT_SECRET` | Yes      | -       | Your Strava API client secret                                                |
| `CRYPTO_KEY_FILE`      | Yes      | -       | Path to encrypted key file for token encryption/decryption                   |
| `CRYPTO_IV`            | Yes      | -       | Initialization vector for AES decryption (base64 encoded)                    |

## Lambda Function Configuration

### Runtime & Memory

| Setting     | Value                | Rationale                                           |
| ----------- | -------------------- | --------------------------------------------------- |
| **Runtime** | Python 3.12          | Latest stable Python runtime                        |
| **Memory**  | 512 MB               | Sufficient for API calls and batching               |
| **Timeout** | 900 seconds (15 min) | Allows fetching multiple activities without timeout |

### Permissions (IAM Role)

The Lambda requires the following IAM permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["dynamodb:GetItem", "dynamodb:PutItem"],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["sts:GetServiceLinkedRole", "sts:AssumeRoleWithWebIdentity"],
      "Resource": "arn:aws:iam::YOUR_ACCOUNT_ID:role/COGNITO_ROLE_XXXXXX"
    }
  ]
}
```

> **Note**: Update `YOUR_ACCOUNT_ID` and `COGNITO_ROLE_XXXXXX` with your actual AWS account ID and Cognito role ARN.

## Deployment Instructions

Follow these steps to deploy via the AWS Console:

### Step 1: Prepare Cryptographic Keys

1. Generate an AES-256 key and IV for token encryption/decryption:

```bash
# Generate a 32-byte (256-bit) key
openssl rand -hex 32 > collector-key.pem

# Generate a 16-byte initialization vector (base64 encoded)
head -c 16 /dev/urandom | base64 > crypto-iv.txt
```

Store these values securely. You'll need:

- `collector-key.pem` path for the Lambda environment variable
- Base64-encoded IV value

### Step 2: Create IAM Role

1. Go to **IAM Console** → **Roles** → **Create role**
2. Select **Lambda service** as trusted entity
3. Attach these policies:
   - `AmazonDynamoDBReadOnlyAccess` (or specific permissions)
   - Your Cognito role for token validation
4. Copy the role ARN

### Step 3: Create Lambda Function

1. Go to **Lambda Console** → **Create function**
2. Choose **Author from scratch**
3. Configure:
   - **Function name**: `lightning-fitness-challenge-collector`
   - **Runtime**: Python 3.12
   - **Architectures**: x86_64
   - **Role**: Select/create role with appropriate permissions

### Step 4: Upload Code

1. Click **Add Lambda layer** or **Upload from .zip file**
2. Zip up your `bootstrap` directory and upload it
3. Alternatively, use the code snippet above as inline code

### Step 5: Configure Environment Variables

In the Lambda configuration:

| Variable Name          | Value                                                         | Source                 |
| ---------------------- | ------------------------------------------------------------- | ---------------------- |
| `DYNAMODB_TABLE_NAME`  | `lightning-fitness-challenge`                                 | DynamoDB table name    |
| `STRAVA_CLIENT_ID`     | `45959`                                                       | Strava OAuth settings  |
| `STRAVA_CLIENT_SECRET` | _[Your Secret]_                                               | Strava API credentials |
| `STRAVA_REDIRECT_URI`  | `http://localhost:3000/lightning-fitness-challenge/dashboard` | OAuth callback URL     |
| `CRYPTO_KEY_FILE`      | `collector-key.pem`                                           | Path to key file       |
| `CRYPTO_IV`            | `[base64-iv-value]`                                           | Initialization vector  |

### Step 6: Set Up EventBridge Scheduler

1. Go to **EventBridge Console** → **Schedules** → **Create schedule**
2. Configure:
   - **Name**: `lfc-strava-collector-weekly`
   - **Schedule expression**: `rate(1 week) offset(tue 0am UTC)`
   - **Target**: Select your Lambda function
   - **Input JSON**: Leave empty (Lambda uses cron schedule)

### Step 7: Configure CloudWatch Alarms (Optional but Recommended)

1. Go to **CloudWatch Console** → **Alarms** → **Create alarm**
2. Create alarm for `Errors` metric with threshold > 0 in 5 minutes
3. Add SNS notification for email alerts

## Testing the Collector

### Option 1: Test via AWS Console

1. In Lambda console, click **Test** tab
2. Click **Add new test event**
3. Create a manual test event:

```json
{
  "message": "Manual trigger for testing",
  "timestamp": "2026-10-09T15:00:00Z"
}
```

4. Click **Save** and then **Test**
5. Check CloudWatch logs for execution results

### Option 2: Use EventBridge Console

1. Go to **EventBridge Console** → **Schedules**
2. Create or edit a schedule that triggers the Lambda
3. Enable testing mode initially
4. Monitor executions in EventBridge history

### Option 3: Test Lambda Invoker CLI Tool

Create a test script:

```python
#!/usr/bin/env python3
"""
Test script to manually invoke the Strava Collector Lambda.
Replace YOUR_REGION and YOUR_LAMBDA_ARN with your actual values.
"""

import json
import boto3

# Replace with your actual ARN
LAMBDA_ARN = "arn:aws:lambda:YOUR_REGION:YOUR_ACCOUNT_ID:function:lightning-fitness-challenge-collector"

def main():
    client = boto3.client('lambda')

    response = client.invoke(
        FunctionName='lightning-fitness-challenge-collector',  # Your actual function name
        InvocationType='RequestResponse',
        Payload=json.dumps({
            "message": "Manual trigger for testing",
            "timestamp": datetime.utcnow().isoformat()
        })
    )

    print("Lambda invoked successfully!")
    print(f"Execution result: {response['StatusCode']}")

if __name__ == "__main__":
    main()
```

## Troubleshooting

### Common Issues and Solutions

| Issue                        | Symptom                             | Solution                                                                         |
| ---------------------------- | ----------------------------------- | -------------------------------------------------------------------------------- |
| **Rate limit error**         | Lambda throws 429 Too Many Requests | Wait for rate limit window to expire or add retry logic with exponential backoff |
| **Invalid token**            | 403 Forbidden errors                | Token expired - refresh or re-authenticate via OAuth flow                        |
| **DynamoDB access denied**   | AccessDeniedException               | Ensure Lambda has proper IAM permissions                                         |
| **Memory timeout**           | Lambda times out after ~15 min      | Increase memory/timeout; process activities in smaller batches                   |
| **Token decryption failure** | Exception during decrypt_token()    | Check `CRYPTO_KEY_FILE` and `CRYPTO_IV` are correctly configured                 |

### Monitoring Best Practices

1. **CloudWatch Logs**: Enable log streaming for the Lambda function
2. **Alarms**: Set up alarm for Error metric > 0 in 5 minutes
3. **Dashboard**: Create CloudWatch dashboard with:
   - Last run timestamp
   - Activities fetched this week
   - Errors encountered
4. **SNS Alerts**: Configure SNS topic for critical failures

## Security Considerations

### Data Encryption

- All Strava tokens are encrypted at rest using AES-256-CBC
- Only Lambda can decrypt tokens to make API calls
- Keys stored in SSM Parameter Store (encrypted with KMS)

### Least Privilege Principle

Lambda function has minimal permissions:

- DynamoDB read/write only for specific tables
- No access to S3 or other AWS services not required

### Token Rotation Handling

Strava periodically rotates tokens. The collector handles this by:

1. Detecting rotation errors from Strava API
2. Flagging members requiring re-authentication
3. Logging the issue for manual OAuth flow restart via user dashboard

## Updating OAuth Credentials

If you need to update Strava credentials or OAuth settings:

1. Update `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET` in Cognito pool client configuration
2. Update environment variables in Lambda function
3. Re-deploy with `sam deploy --stack-name lfc-infra --guided`

## Related Documentation

- [EventBridge Scheduler Configuration](eventbridge-scheduler-setup.md) — How the scheduler triggers the collector weekly
- [DynamoDB Tables](dynamodb.md) — Schema for storing member activities
- [API Gateway Setup](api-gateway-setup.md) — OAuth callback endpoint configuration
- [Cognito Configuration](cognito.md) — User authentication and token management

---

_Last updated: 2026-10-09_
