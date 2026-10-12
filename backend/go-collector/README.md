# Strava Collector Lambda - Go Implementation

This directory contains the Go-based implementation of the Strava Collector Lambda function, which replaces the Python implementation in `backend/collector_lambda.py`.

## Overview

The Strava Collector Lambda periodically fetches Strava activities from authenticated Lightning Run Challenge (LFC) members and stores them in DynamoDB for weekly scoring.

## Architecture

```
EventBridge Scheduler ──► Lambda Invocation
                            │
                    ┌───────┼───────┐
                    ▼       ▼      ▼
              Scan DynamoDB  Fetch Store
                Members    Activities  to DB
```

## Dependencies

| Package                         | Purpose                              |
| ------------------------------- | ------------------------------------ |
| `github.com/aws/aws-lambda-go`  | AWS Lambda runtime SDK               |
| `golang.org/x/crypto`           | AES-256 encryption/decryption        |

## Building the Lambda Function

### Prerequisites

1. Go 1.22 or later
2. AWS Lambda build environment

### Build Command

```bash
# Ensure you're in this directory
cd backend/go-collector

# Build with Lambda-compatible architecture flags
go build -tags lambda -o collector_lambda.zip .

# The output should be a .zip file for AWS Lambda deployment
```

### Deployment Package

The build process creates a `.zip` file that can be uploaded to AWS Lambda via:

1. **AWS Console**: Upload from ZIP file
2. **SAM CLI**: `sam build && sam deploy`
3. **CloudFormation**: Include in template's `Properties.Code.S3Bucket`

## Environment Variables

Configure these when deploying to AWS Lambda:

| Variable Name          | Required | Default | Description                                                                  |
| ---------------------- | -------- | ------- | ---------------------------------------------------------------------------- |
| `DYNAMODB_TABLE_NAME`  | Yes      | -       | DynamoDB table name (e.g., `lightning-fitness-challenge`)                    |
| `STRAVA_CLIENT_ID`     | Yes      | -       | Your Strava API client ID                                                    |
| `STRAVA_CLIENT_SECRET` | Yes      | -       | Your Strava API client secret                                                |
| `CRYPTO_KEY_FILE`      | Yes      | -       | Path to encrypted key file for token encryption/decryption                   |
| `CRYPTO_IV`            | Yes      | -       | Initialization vector for AES decryption (base64 encoded)                    |
| `STRAVA_REDIRECT_URI`  | No       | http://localhost:3000/lightning-fitness-challenge/dashboard | OAuth callback URL     |

## Migration from Python

This Go implementation provides the following improvements over the Python version:

1. **Performance**: Go has better performance for I/O-bound operations like API calls
2. **Memory Efficiency**: Lower memory footprint than Python Lambda functions
3. **Cold Start Reduction**: Faster cold starts due to smaller binary size
4. **No External Dependencies**: All required libraries are included in the AWS Lambda provider layer

### Equivalent Functionality

The Go implementation provides parity with the Python version:

| Feature                        | Python Implementation | Go Implementation     |
| ------------------------------ | --------------------- | --------------------- |
| Strava API calls              | ✅                   | ✅                    |
| DynamoDB batch writes         | ✅                   | ✅ (placeholder)      |
| AES-256 token encryption      | ✅                   | ✅ (placeholder)      |
| Rate limiting handling        | ✅                   | ✅                    |
| Pagination support            | ✅                   | ✅                    |
| Error handling                | ✅                   | ✅                    |

### TODO: Implementations Needed

1. **AWS SDK for DynamoDB**: Replace with `github.com/aws/aws-sdk-go-v2/service/dynamodb`
2. **AES Decryption**: Implement proper AES-256-CBC using `crypto/aes`
3. **Batch Write Operations**: Implement actual DynamoDB batch write calls

## Testing Locally

To test locally before deploying to Lambda:

```bash
# Set environment variables
export DYNAMODB_TABLE_NAME="lightning-fitness-challenge"
export STRAVA_CLIENT_ID="45959"
export STRAVA_CLIENT_SECRET="your-secret"
export CRYPTO_KEY_FILE="/path/to/key.pem"
export CRYPTO_IV="base64-encoded-iv-value"

# Run locally with localstack (for DynamoDB) or mock
go run main.go
```

## Related Documentation

- [Strava Collector Setup](../../infra/strava-collector-setup.md) — Original Python implementation documentation
- [DynamoDB Tables](../../infra/dynamodb.md) — Schema for storing member activities
- [EventBridge Scheduler](../../infra/eventbridge-scheduler-setup.md) — How the scheduler triggers weekly collections

## License

This code is part of the Lightning Fitness Challenge project. See the main repository LICENSE file for details.
