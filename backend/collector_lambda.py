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

import base64
import time
from boto3.dynamodb.conditions import Attr


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
