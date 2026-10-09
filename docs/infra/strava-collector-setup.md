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
│ EventBridge     │ ───► triggers every Tuesday 6 AM ET
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

| Package | Purpose | Installation Command |
|---------|---------|---------------------|
| `boto3` | AWS SDK for DynamoDB operations | `pip install boto3` |
| `requests` | HTTP client for Strava API calls | `pip install requests` |
| `pycryptodome` | AES encryption/decryption for tokens | `pip install pycryptodome` |

> **Note**: All packages are included in the Lambda Layer or the provided `requirements.txt`.

## Environment Variables

Configure these environment variables in the AWS Console when deploying the function:

| Variable Name | Required | Default | Description |
|---------------|----------|---------|-------------|
| `DYNAMODB_TABLE_NAME` | Yes | - | DynamoDB table name (e.g., `lightning-fitness-challenge`) |
| `COGNITO_ACCESS_TOKEN` | Yes | - | Temporary access token to call AWS APIs on behalf of the Lambda service role |
| `STRAVA_CLIENT_ID` | Yes | - | Your Strava API client ID (configured in Cognito pool) |
| `STRAVA_CLIENT_SECRET` | Yes | - | Your Strava API client secret |
| `CRYPTO_KEY_FILE` | Yes | - | Path to encrypted key file for token encryption/decryption |
| `CRYPTO_IV` | Yes | - | Initialization vector for AES decryption (base64 encoded) |

## Lambda Function Configuration

### Runtime & Memory

| Setting | Value | Rationale |
|---------|-------|-----------|
| **Runtime** | Python 3.12 | Latest stable Python runtime |
| **Memory** | 512 MB | Sufficient for API calls and batching |
| **Timeout** | 900 seconds (15 min) | Allows fetching multiple activities without timeout |

### Permissions (IAM Role)

The Lambda requires the following IAM permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "sts:GetServiceLinkedRole",
        "sts:AssumeRoleWithWebIdentity"
      ],
      "Resource": "arn:aws:iam::YOUR_ACCOUNT_ID:role/COGNITO_ROLE_XXXXXX"
    }
  ]
}
```

> **Note**: Update `YOUR_ACCOUNT_ID` and `COGNITO_ROLE_XXXXXX` with your actual AWS account ID and Cognito role ARN.

## Bootstrap Code

Below is the complete bootstrap code for the Collector Lambda:

```python
"""
Strava Collector Lambda - Bootstrap Script

This script collects Strava activities from all active Lightning Run Challenge members
and stores them in DynamoDB for weekly scoring.

Author: Kristopher Wagner
Created: 2026-10-09
"""

import os
import json
import boto3
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from requests.exceptions import RequestException, HTTPError
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend


# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE_NAME'])

# Strava API Configuration
STRAVA_CLIENT_ID = os.environ.get('STRAVA_CLIENT_ID', '')
STRAVA_CLIENT_SECRET = os.environ.get('STRAVA_CLIENT_SECRET', '')
STRAVA_REDIRECT_URI = os.environ.get('STRAVA_REDIRECT_URI', 'http://localhost:3000/lightning-fitness-challenge/dashboard')

# Strava API Rate Limits (160 requests per 2 minutes window)
RATE_LIMIT_WINDOW_SECONDS = 120  # 2 minutes
MAX_REQUESTS_PER_WINDOW = 160

# TTL configuration
ACTIVITY_TTL_DAYS = 730  # 2 years
STRAVA_API_RATE_LIMIT_WAIT = 2 * 60  # Wait for rate limit window to reset


def decrypt_token(encrypted_token: str, key_file_path: str, iv: str) -> str:
    """
    Decrypt an encrypted Strava token from DynamoDB.
    
    Args:
        encrypted_token: The base64-encoded encrypted token from DynamoDB
        key_file_path: Path to the file containing the decryption key
        iv: Initialization vector for AES decryption (base64 encoded)
    
    Returns:
        Decrypted access_token string
    
    Raises:
        Exception: If decryption fails
    """
    try:
        # Read the decryption key from file
        with open(key_file_path, 'rb') as f:
            aes_key = f.read()
        
        # Decode initialization vector
        iv_bytes = base64.b64decode(iv)
        
        # Decode encrypted token
        encrypted_token_bytes = base64.b64decode(encrypted_token)
        
        # AES-256-CBC decryption
        cipher = Cipher(algorithms.AES(aes_key), modes.CBC(iv_bytes), backend=default_backend())
        decryptor = cipher.decryptor()
        
        # Decrypt and remove PKCS7 padding
        plaintext = decryptor.update(encrypted_token_bytes) + decryptor.finalize()
        padding_len = int.from_bytes(plaintext[-1:], byteorder='big')
        decrypted = plaintext[:-padding_len]
        
        return decrypted.decode('utf-8')
    
    except Exception as e:
        raise Exception(f"Token decryption failed: {str(e)}")


def refresh_token_if_needed(member_id: str, encrypted_token: str) -> Optional[Dict[str, Any]]:
    """
    Refresh Strava access token if expired.
    
    Args:
        member_id: Strava member ID (used as partition key)
        encrypted_token: Encrypted token from DynamoDB
    
    Returns:
        New encrypted token on refresh, or original if still valid
    
    Raises:
        HTTPError: If rate limit exceeded (Strava returns 429 Too Many Requests)
    """
    try:
        # Decrypt the current token
        access_token = decrypt_token(encrypted_token, os.environ['CRYPTO_KEY_FILE'], os.environ['CRYPTO_IV'])
        
        # Create request headers for Strava API
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Accept': 'application/json',
            'User-Agent': 'Lightning-Fitness-Challenge/1.0'
        }
        
        # Call user endpoint to refresh token if expired
        response = requests.get(
            f'https://www.strava.com/api/v3/athlete',
            headers=headers,
            timeout=15
        )
        
        # Handle rate limit (429 Too Many Requests)
        if response.status_code == 429:
            wait_seconds = int(response.headers.get('X-Rate-Limit-Reset', RATE_LIMIT_WINDOW_SECONDS)) - datetime.now().timestamp()
            raise HTTPError(
                status_code=429,
                response=response,
                reason=f'Rate limit exceeded. Waiting {wait_seconds} seconds...'
            )
        
        # Check if we need to handle refresh token rotation (Strava's new behavior)
        error = response.json().get('error')
        if isinstance(error, dict) and error.get('message') == 'Invalid authorization code.':
            # Token has been rotated by Strava; must re-authenticate
            print(f"Member {member_id}: Token rotation detected. Re-authentication required.")
            return None
        
        return encrypted_token
    
    except HTTPError as e:
        if e.response.status_code == 429:
            # Rate limit - sleep and retry later
            wait_seconds = int(e.response.headers.get('X-Rate-Limit-Reset', RATE_LIMIT_WINDOW_SECONDS)) - datetime.now().timestamp()
            print(f"Member {member_id}: Rate limited. Waiting {wait_seconds} seconds...")
            time.sleep(min(wait_seconds, 120))  # Cap at 2 minutes
        raise
    
    except Exception as e:
        raise Exception(f"Token refresh failed for member {member_id}: {str(e)}")


def fetch_activities(member_id: str, encrypted_token: str) -> List[Dict[str, Any]]:
    """
    Fetch all activities from Strava API.
    
    Args:
        member_id: Strava member ID (partition key)
        encrypted_token: Encrypted token for authentication
    
    Returns:
        List of activity records ready for DynamoDB storage
    
    Raises:
        HTTPError: If rate limit exceeded or invalid credentials
    """
    try:
        # Decrypt token for API calls
        access_token = decrypt_token(encrypted_token, os.environ['CRYPTO_KEY_FILE'], os.environ['CRYPTO_IV'])
        
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Accept': 'application/json',
            'User-Agent': 'Lightning-Fitness-Challenge/1.0'
        }
        
        activities = []
        page = 1
        
        while True:
            # Fetch activities from Strava API (paginated)
            url = f'https://www.strava.com/api/v3/athlete/{member_id}/activities?page={page}&per_page=300&order_by=elapsed_time&desc=true'
            
            response = requests.get(url, headers=headers, timeout=60)
            
            if response.status_code == 429:
                # Rate limit exceeded - wait and retry
                wait_seconds = int(response.headers.get('X-Rate-Limit-Reset', RATE_LIMIT_WINDOW_SECONDS)) - datetime.now().timestamp()
                print(f"Member {member_id}: Rate limited. Waiting {wait_seconds} seconds...")
                time.sleep(min(wait_seconds, 120))
                
            elif response.status_code != 200:
                if response.status_code == 403:
                    # Invalid or expired token - must re-authenticate
                    print(f"Member {member_id}: Invalid credentials (403). Re-authentication required.")
                    return []
                raise HTTPError(status_code=response.status_code, response=response)
            
            data = response.json()
            
            if not data:
                break
            
            # Process each activity
            for activity in data:
                act_record = {
                    'stravaMemberId': str(member_id),
                    'itemType': f'ACT#{activity["id"]}',  # ACT + activity ID as sort key
                    'distance': activity.get('distance', 0),
                    'movingTime': activity.get('moving_time', 0),
                    'elapsedTime': activity.get('elapsed_time', 0),
                    'totalElevationGain': activity.get('total_elevation_gain', 0),
                    'averageWatts': activity.get('average_watts'),
                    'averageHeartRateBpm': activity.get('average_heartrate'),
                    'maxHeartRateBpm': activity.get('max_heartrate'),
                    'type': activity.get('sport_type', ''),
                    'name': activity.get('name', ''),
                    'startDatetime': (datetime.utcnow() + timedelta(hours=5)).isoformat()[:19] if activity.get('start_date_utc') else datetime.utcnow().isoformat()[:19],  # Convert to EST
                    'dateUTC': activity.get('start_date'),
                    'kudos': activity.get('kudos_count', 0),
                    'tombstone': activity.get('tombstone', ''),
                    'uploadStatus': activity.get('upload_status'),
                    'averagePacePerKilometer': activity.get('average_pace_per_kilometer'),
                    'deviceWatts': activity.get('device_watts'),
                    'prRankLocal': activity.get('pr_rank_local'),
                }
                
                activities.append(act_record)
            
            # If we got 300 items (max per page), there are no more pages
            if len(data) < 300:
                break
            
            page += 1
        
        return activities
    
    except Exception as e:
        raise Exception(f"Failed to fetch activities for member {member_id}: {str(e)}")


def store_activities(activities: List[Dict[str, Any]]) -> int:
    """
    Store activities in DynamoDB using batch_write.
    
    Args:
        activities: List of activity records
    
    Returns:
        Number of items successfully stored
    
    Raises:
        Exception: If batch write fails
    """
    try:
        # Build batch write request items
        batch_items = [{
            'PutRequest': {
                'Item': act,
                'ConditionExpression': 'attribute_not_exists(#sortKey)'
            }
        } for act in activities]
        
        # Execute batch write (max 25 items per call)
        batches = [batch_items[i:i+25] for i in range(0, len(batch_items), 25)]
        
        successfully_stored = 0
        
        for batch in batches:
            response = table.batch_write_item(
                RequestItems={
                    os.environ['DYNAMODB_TABLE_NAME']: batch
                }
            )
            
            successfully_stored += len(batch)
        
        return successfully_stored
    
    except Exception as e:
        raise Exception(f"Failed to store activities in DynamoDB: {str(e)}")


def lambda_handler(event, context):
    """
    Lambda entry point for Strava activity collection.
    
    Args:
        event: EventBridge invocation event
        context: Lambda runtime context
    
    Returns:
        Lambda response with summary statistics
    """
    print(f"Strava Collector Lambda invoked at {datetime.utcnow().isoformat()}")
    
    try:
        # Get all members who have OAuth tokens set up
        members = table.scan(
            FilterExpression=Attr('oauthEnabled').eq(True),  # Only active OAuth-enabled members
            ProjectionExpression='stravaMemberId, encryptedToken'
        )
        
        print(f"Found {len(members['Items'])} OAuth-enabled members")
        
        all_activities = []
        total_items_stored = 0
        
        # Process each member's activities
        for member in members['Items']:
            try:
                member_id = member['stravaMemberId']
                
                print(f"Processing member {member_id}...")
                
                # Refresh token if needed
                encrypted_token = refresh_token_if_needed(member_id, member['encryptedToken'])
                
                if encrypted_token is None:
                    # Token needs re-authentication
                    continue
                
                # Fetch activities
                activities = fetch_activities(member_id, encrypted_token)
                
                if activities:
                    print(f"  Member {member_id}: Fetched {len(activities)} activities")
                    
                    # Store in DynamoDB
                    stored = store_activities(activities)
                    total_items_stored += stored
                    
            except Exception as e:
                # Log error for this member but continue with others
                print(f"Error processing member {member['stravaMemberId']}: {str(e)}")
                continue
        
        # Summary
        result = {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'message': 'Strava activity collection completed successfully',
                'membersProcessed': len(members['Items']),
                'activitiesFetched': len(all_activities),
                'itemsStoredInDynamoDB': total_items_stored,
                'timestamp': datetime.utcnow().isoformat(),
            })
        }
        
        print(f"Collection complete: {total_items_stored} activities stored")
        
        return result
    
    except Exception as e:
        error_result = {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'message': f'Collector Lambda failed: {str(e)}',
                'timestamp': datetime.utcnow().isoformat(),
            })
        }
        
        # Send error alert to SNS (if configured)
        sns = boto3.client('sns')
        try:
            response = sns.publish(
                TopicArn=os.environ.get('SNS_ERROR_TOPIC_ARN', ''),
                Message=f"Strava Collector Lambda failed: {str(e)}",
                Subject="LFC Strava Collector Error"
            )
        except Exception as sns_error:
            print(f"Failed to send SNS alert: {str(sns_error)}")
        
        return error_result


# Import required modules for the functions above
import base64
import time
from boto3.dynamodb.conditions import Attr
```

## Deployment Instructions

### Option 1: AWS SAM Template

Create a `template.yaml` file in your infrastructure directory:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Strava Collector Lambda for Lightning Run Challenge

Globals:
  Function:
    Timeout: 900
    MemorySize: 512

Resources:
  StravaCollectorFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: lambda/collector-strava/
      Handler: bootstrap/bootstrap
      Runtime: python3.12
      FunctionName: !Sub "lightning-fitness-challenge-collector-${AWS::Region}"
      Description: Collects Strava activities from active LFC members
      Environment:
        Variables:
          DYNAMODB_TABLE_NAME: !Ref DynamoDBTableName
          STRAVA_CLIENT_ID: !Ref StravaClientId
          STRAVA_CLIENT_SECRET: !Ref StravaClientSecret
          STRAVA_REDIRECT_URI: http://localhost:3000/lightning-fitness-challenge/dashboard
          CRYPTO_KEY_FILE: collector-key.pem
          CRYPTO_IV: ${CryptoIv}  # Set during deployment
      AutoPublishAlias: live
      Tags:
        Project: Lightning-Fitness-Challenge
        Service: Strava-Collector
    
  DynamoDBTableName:
    Type: AWS::SSM::Parameter
    Properties:
      Name: !Sub "/lfc/collector/table-name"
      Type: String
      Value: lightning-fitness-challenge
  
  StravaClientId:
    Type: AWS::SSM::Parameter
    Properties:
      Name: !Sub "/lfc/collector/strava/client-id"
      Type: String
      Value: 45959
  
  StravaClientSecret:
    Type: AWS::SSM::Parameter
    Properties:
      Name: !Sub "/lfc/collector/strava/client-secret"
      Type: SecureString
      Value: ${StravaClientSecretValue}  # Set in SSM Secrets Manager
  
  CryptoIv:
    Type: String
    Value: ${CryptoIvBase64}  # Base64-encoded IV, set during deployment

Outputs:
  CollectorFunctionUrl:
    Description: The ARN of the collector function
    Value: !GetAtt StravaCollectorFunction.Arn
    Export:
      Name: LFC_COLLECTOR_FUNCTION_ARN
```

### Option 2: AWS Console Setup

Follow these steps to deploy via the AWS Console:

#### Step 1: Prepare Cryptographic Keys

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

#### Step 2: Create IAM Role

1. Go to **IAM Console** → **Roles** → **Create role**
2. Select **Lambda service** as trusted entity
3. Attach these policies:
   - `AmazonDynamoDBReadOnlyAccess` (or specific permissions)
   - Your Cognito role for token validation
4. Copy the role ARN

#### Step 3: Create Lambda Function

1. Go to **Lambda Console** → **Create function**
2. Choose **Author from scratch**
3. Configure:
   - **Function name**: `lightning-fitness-challenge-collector`
   - **Runtime**: Python 3.12
   - **Architectures**: x86_64
   - **Role**: Select/create role with appropriate permissions

#### Step 4: Upload Code

1. Click **Add Lambda layer** or **Upload from .zip file**
2. Zip up your `bootstrap` directory and upload it
3. Alternatively, use the code snippet above as inline code

#### Step 5: Configure Environment Variables

In the Lambda configuration:

| Variable Name | Value | Source |
|---------------|-------|--------|
| `DYNAMODB_TABLE_NAME` | `lightning-fitness-challenge` | DynamoDB table name |
| `STRAVA_CLIENT_ID` | `45959` | Strava OAuth settings |
| `STRAVA_CLIENT_SECRET` | *[Your Secret]* | Strava API credentials |
| `STRAVA_REDIRECT_URI` | `http://localhost:3000/lightning-fitness-challenge/dashboard` | OAuth callback URL |
| `CRYPTO_KEY_FILE` | `collector-key.pem` | Path to key file |
| `CRYPTO_IV` | `[base64-iv-value]` | Initialization vector |

#### Step 6: Set Up EventBridge Scheduler

1. Go to **EventBridge Console** → **Schedules** → **Create schedule**
2. Configure:
   - **Name**: `lfc-strava-collector-weekly`
   - **Schedule expression**: `rate(1 week) offset(tue 0am UTC)`
   - **Target**: Select your Lambda function
   - **Input JSON**: Leave empty (Lambda uses cron schedule)

#### Step 7: Configure CloudWatch Alarms (Optional but Recommended)

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

| Issue | Symptom | Solution |
|-------|---------|----------|
| **Rate limit error** | Lambda throws 429 Too Many Requests | Wait for rate limit window to expire or add retry logic with exponential backoff |
| **Invalid token** | 403 Forbidden errors | Token expired - refresh or re-authenticate via OAuth flow |
| **DynamoDB access denied** | AccessDeniedException | Ensure Lambda has proper IAM permissions |
| **Memory timeout** | Lambda times out after ~15 min | Increase memory/timeout; process activities in smaller batches |
| **Token decryption failure** | Exception during decrypt_token() | Check `CRYPTO_KEY_FILE` and `CRYPTO_IV` are correctly configured |

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

*Last updated: 2026-10-09*
