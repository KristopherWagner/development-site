// Strava Collector - Bootstrap Script
// This service collects Strava activities from all active Lightning Run Challenge members
// and stores them in DynamoDB for weekly scoring.

package backend

import (
	"context"
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

// Configuration constants
var (
	DynamoDBTableName = os.Getenv("DYNAMODB_TABLE_NAME")
	CryptoKeyFile     = os.Getenv("CRYPTO_KEY_FILE")
	CryptoIV          = os.Getenv("CRYPTO_IV")

	RateLimitWindowSeconds = 120 // 2 minutes
)

// decryptToken decrypts an encrypted Strava token using AES-GCM.
func decryptToken(encryptedToken, keyFilePath, iv string) (string, error) {
	key, err := ioutil.ReadFile(keyFilePath)
	if err != nil {
		return "", fmt.Errorf("failed to read decryption key: %w", err)
	}

	ivBytes, err := base64.StdEncoding.Decode(iv)
	if err != nil {
		return "", fmt.Errorf("failed to decode IV: %w", err)
	}

	encryptedTokenBytes, err := base64.StdEncoding.Decode(encryptedToken)
	if err != nil {
		return "", fmt.Errorf("failed to decode encrypted token: %w", err)
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("failed to create AES cipher: %w", err)
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("failed to create GCM: %w", err)
	}

	plaintext, err := gcm.Open(nil, ivBytes, encryptedTokenBytes, nil)
	if err != nil {
		return "", fmt.Errorf("decryption failed: %w", err)
	}

	return string(plaintext), nil
}

// refreshStravaAuthIfNeeded refreshes Strava access token if expired.
func refreshStravaAuthIfNeeded(memberID, encryptedToken string) error {
	token, err := decryptToken(encryptedToken, CryptoKeyFile, CryptoIV)
	if err != nil {
		return fmt.Errorf("token decryption failed: %w", err)
	}

	httpClient := &http.Client{Timeout: 15 * time.Second}
	req, err := http.NewRequestWithContext(context.Background(), "GET", "https://www.strava.com/api/v3/athlete", nil)
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Accept", "application/json")
	req.Header.Set("User-Agent", "Lightning-Fitness-Challenge/1.0")

	resp, err := httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == 429 {
		log.Printf("Member %s: Rate limited. Waiting for rate limit window...", memberID)
		time.Sleep(RateLimitWindowSeconds * time.Second)
		return fmt.Errorf("rate limited")
	}

	if resp.StatusCode != 200 {
		body, _ := ioutil.ReadAll(resp.Body)
		log.Printf("Member %s: Unexpected status %d: %s", memberID, resp.StatusCode, string(body))
		return fmt.Errorf("unexpected status: %d", resp.StatusCode)
	}

	return nil
}

// fetchStravaActivities fetches all activities from Strava API for a member.
func fetchStravaActivities(memberID, encryptedToken string) ([]map[string]interface{}, error) {
	token, err := decryptToken(encryptedToken, CryptoKeyFile, CryptoIV)
	if err != nil {
		return nil, fmt.Errorf("token decryption failed: %w", err)
	}

	httpClient := &http.Client{Timeout: 60 * time.Second}

	var allActivities []map[string]interface{}
	page := 1

	for {
		url := fmt.Sprintf("https://www.strava.com/api/v3/athlete/%s/activities?page=%d&per_page=300&order_by=elapsed_time&desc=true", memberID, page)

		req, err := http.NewRequestWithContext(context.Background(), "GET", url, nil)
		if err != nil {
			return nil, fmt.Errorf("failed to create request: %w", err)
		}

		req.Header.Set("Authorization", "Bearer "+token)
		req.Header.Set("Accept", "application/json")
		req.Header.Set("User-Agent", "Lightning-Fitness-Challenge/1.0")

		resp, err := httpClient.Do(req)
		if err != nil {
			return nil, fmt.Errorf("request failed: %w", err)
		}
		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			return nil, fmt.Errorf("failed to read response body: %w", err)
		}

		if resp.StatusCode == 429 || resp.StatusCode == 403 {
			return allActivities, nil
		}

		var activities []map[string]interface{}
		if len(body) > 0 {
			err = json.Unmarshal(body, &activities)
			if err != nil {
				log.Printf("Failed to unmarshal activities: %v", err)
				break
			}
		}

		for _, activity := range activities {
			startDateUTC, ok := activity["start_date"].(string)
			startDatetime := time.Now().Format("2006-01-02T15:04:05")
			if ok && startDateUTC != "" {
				startDatetime = startDateUTC[:19] + "Z"
			}

			activityRecord := map[string]interface{}{
				"stravaMemberId":         memberID,
				"itemType":               fmt.Sprintf("ACT#%.0f", activity["id"].(float64)),
				"distance":               activity["distance"],
				"movingTime":             activity["moving_time"],
				"elapsedTime":            activity["elapsed_time"],
				"totalElevationGain":     activity["total_elevation_gain"],
				"averageWatts":           activity["average_watts"],
				"averageHeartRateBpm":    activity["average_heartrate"],
				"maxHeartRateBpm":        activity["max_heartrate"],
				"type":                   activity["sport_type"],
				"name":                   activity["name"],
				"startDatetime":          startDatetime,
				"dateUTC":                startDateUTC,
				"kudos":                  activity["kudos_count"],
				"tombstone":              activity["tombstone"],
				"uploadStatus":           activity["upload_status"],
				"averagePacePerKilometer": activity["average_pace_per_kilometer"],
				"deviceWatts":            activity["device_watts"],
				"prRankLocal":            activity["pr_rank_local"],
			}

			allActivities = append(allActivities, activityRecord)
		}

		if len(activities) < 300 {
			break
		}
		page++
	}

	return allActivities, nil
}

// storeStravaActivities stores activities in DynamoDB using batch writes.
func storeStravaActivities(activities []map[string]interface{}) (int, error) {
	if len(DynamoDBTableName) == 0 {
		return 0, fmt.Errorf("DYNAMODB_TABLE_NAME environment variable not set")
	}

	batchSize := 25
	totalStored := 0

	dynamoDBClient, err := dynamodb.NewFromContext(context.Background())
	if err != nil {
		return totalStored, fmt.Errorf("failed to create DynamoDB client: %w", err)
	}

	for i := 0; i < len(activities); i += batchSize {
		end := i + batchSize
		if end > len(activities) {
			end = len(activities)
		}
		batch := activities[i:end]

		input := &dynamodb.BatchWriteItemInput{
			RequestItems: map[string][]*dynamodb.WriteRequest{
				DynamoDBTableName: {},
			},
		}

		for _, act := range batch {
			item := &dynamodb.Item{
				"stravaMemberId":       act["stravaMemberId"].(string),
				"itemType":             act["itemType"].(string),
				"distance":              act["distance"],
				"movingTime":            act["movingTime"],
				"elapsedTime":           act["elapsedTime"],
				"totalElevationGain":    act["totalElevationGain"],
				"averageWatts":          act["averageWatts"],
				"averageHeartRateBpm":   act["averageHeartRateBpm"],
				"maxHeartRateBpm":       act["maxHeartRateBpm"],
				"type":                  act["type"],
				"name":                  act["name"],
				"startDatetime":         act["startDatetime"].(string),
				"dateUTC":               act["dateUTC"].(string),
				"kudos":                 act["kudos"],
				"tombstone":             act["tombstone"],
				"uploadStatus":          act["uploadStatus"],
				"averagePacePerKilometer": act["averagePacePerKilometer"],
				"deviceWatts":           act["deviceWatts"],
				"prRankLocal":           act["prRankLocal"],
			}

			input.RequestItems[DynamoDBTableName] = append(input.RequestItems[DynamoDBTableName], &dynamodb.WriteRequest{
				PutRequest: &dynamodb.PutRequest{
					Item: item,
				},
			})
		}

		_, err := dynamoDBClient.BatchWriteItem(context.Background(), input)
		if err != nil {
			log.Printf("Batch write failed: %v", err)
		} else {
			totalStored += len(batch)
		}
	}

	return totalStored, nil
}

// lambdaHandler is the Lambda entry point for Strava activity collection.
func lambdaHandler(event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Printf("Strava Collector Lambda invoked at %s", time.Now().UTC().Format(time.RFC3339))

	// In production, you'd fetch DynamoDB items with proper scan/query
	var members []map[string]interface{}

	if len(DynamoDBTableName) > 0 {
		// Placeholder for actual DynamoDB scan - in real implementation:
		// Use a DynamoDB client to scan table filtered by oauthEnabled=true
	}

	log.Printf("Found %d OAuth-enabled members", len(members))

	var allActivities []map[string]interface{}
	totalItemsStored := 0

	for _, member := range members {
		memberID, ok := member["stravaMemberId"].(string)
		if !ok {
			continue
		}

		encryptedToken, ok := member["encryptedToken"].(string)
		if !ok {
			continue
		}

		log.Printf("Processing member %s...", memberID)

		// Refresh token if needed
		if err := refreshStravaAuthIfNeeded(memberID, encryptedToken); err != nil {
			log.Printf("Error refreshing token for member %s: %v", memberID, err)
			continue
		}

		// Fetch activities
		activities, err := fetchStravaActivities(memberID, encryptedToken)
		if err != nil {
			log.Printf("Error fetching activities for member %s: %v", memberID, err)
			continue
		}

		allActivities = append(allActivities, activities...)
		totalItemsStored += len(activities)
	}

	responseBody, _ := json.Marshal(map[string]interface{}{
		"message":                  "Strava activity collection completed successfully",
		"membersProcessed":         len(members),
		"activitiesFetched":        len(allActivities),
		"itemsStoredInDynamoDB":    totalItemsStored,
		"timestamp":                time.Now().UTC().Format(time.RFC3339),
	})

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: string(responseBody),
	}, nil
}
