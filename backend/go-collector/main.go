//go:build lambda
// +build lambda

package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
)

// Global variables for environment configuration
var (
	stravaClientID     = os.Getenv("STRAVA_CLIENT_ID")
	stravaClientSecret = os.Getenv("STRAVA_CLIENT_SECRET")
	cryptoKeyFilePath  = os.Getenv("CRYPTO_KEY_FILE")
	cryptoIV           = os.Getenv("CRYPTO_IV")
	dynamodbTableName  = os.Getenv("DYNAMODB_TABLE_NAME")
	stravaRedirectURI  = os.Getenv("STRAVA_REDIRECT_URI", "http://localhost:3000/lightning-fitness-challenge/dashboard")
)

// ActivityRecord represents a Strava activity stored in DynamoDB
type ActivityRecord struct {
	StravaMemberID      string  `json:"stravaMemberId"`
	ItemType            string  `json:"itemType"`
	Distance            float64 `json:"distance"`
	MovingTime          int     `json:"movingTime"`
	ElapsedTime         int     `json:"elapsedTime"`
	TotalElevationGain  int     `json:"totalElevationGain"`
	AverageWatts        *float64 `json:"averageWatts,omitempty"`
	AverageHeartRate    *int    `json:"averageHeartRateBpm,omitempty"`
	MaxHeartRate        *int    `json:"maxHeartRateBpm,omitempty"`
	Type                string  `json:"type"`
	Name                string  `json:"name"`
	StartDatetime       string  `json:"startDatetime"`
	DateUTC             string  `json:"dateUTC"`
	Kudos               int     `json:"kudos"`
	Tombstone           string  `json:"tombstone,omitempty"`
	UploadStatus        string  `json:"uploadStatus,omitempty"`
	AveragePace         *float64 `json:"averagePacePerKilometer,omitempty"`
	DeviceWatts         string  `json:"deviceWatts,omitempty"`
	PRRankLocal         *int    `json:"prRankLocal,omitempty"`
}

// MemberInfo represents a DynamoDB member record from scan results
type MemberInfo struct {
	StravaMemberID string `json:"stravaMemberId"`
	EncryptedToken string `json:"encryptedToken"`
}

// decryptToken decrypts a Strava OAuth token using AES-256-CBC encryption
func decryptToken(encryptedToken, keyFilePath, iv string) (string, error) {
	if keyFilePath == "" || iv == "" {
		return encryptedToken, nil // Return as-is if no decryption configured
	}

	keyData, err := os.ReadFile(keyFilePath)
	if err != nil {
		return "", fmt.Errorf("failed to read key file: %w", err)
	}

	ivBytes, err := base64.StdEncoding.DecodeString(iv)
	if err != nil {
		return "", fmt.Errorf("failed to decode IV: %w", err)
	}

	encryptedTokenBytes, err := base64.StdEncoding.DecodeString(encryptedToken)
	if err != nil {
		return "", fmt.Errorf("failed to decode encrypted token: %w", err)
	}

	// TODO: Implement AES-256-CBC decryption using crypto library
	// For now, return the original encrypted token as placeholder
	_ = keyData
	_ = ivBytes
	_ = encryptedTokenBytes

	return encryptedToken, nil // Placeholder - implement proper decryption
}

// fetchActivities fetches all activities from Strava API for a member
func fetchActivities(memberID string) ([]ActivityRecord, error) {
	activities := []ActivityRecord{}
	page := 1
	maxPages := 5 // Strava paginated limit (max page count depends on data size)

	for page <= maxPages {
		accessToken, err := decryptToken("", cryptoKeyFilePath, cryptoIV)
		if err != nil {
			return nil, fmt.Errorf("failed to decrypt token: %w", err)
		}

		// Create request headers for Strava API
		headers := http.Header{
			"Authorization":  {fmt.Sprintf("Bearer %s", accessToken)},
			"Accept":         {"application/json"},
			"User-Agent":     {"Lightning-Fitness-Challenge/1.0"},
		}

		url := fmt.Sprintf("https://www.strava.com/api/v3/athlete/%d/activities?page=%d&per_page=300&order_by=elapsed_time&desc=true",
			memberID, page)

		client := &http.Client{}
		resp, err := client.Get(url, headers)
		if err != nil {
			return nil, fmt.Errorf("failed to fetch activities from Strava API: %w", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode == 429 {
			waitSeconds := int(resp.Header.Get("X-Rate-Limit-Reset")) - time.Now().Unix()
			return nil, fmt.Errorf("rate limited. Waiting %d seconds...", waitSeconds)
		}

		var pageData []map[string]interface{}
		if resp.StatusCode != 200 {
			if resp.StatusCode == 403 {
				return []ActivityRecord{}, fmt.Errorf("invalid credentials (403). Re-authentication required.")
			}
			return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
		}

		if json.NewDecoder(resp.Body).Decode(&pageData) != nil {
			break
		}

		if len(pageData) == 0 {
			break
		}

		// Process each activity
		for _, activity := range pageData {
			actRecord := ActivityRecord{
				StravaMemberID: fmt.Sprintf("%d", memberID),
				ItemType:       fmt.Sprintf("ACT#%d", activity["id"].(float64)),
				Distance:        activity["distance"].(float64),
				MovingTime:      int(activity["moving_time"].(float64)),
				ElapsedTime:     int(activity["elapsed_time"].(float64)),
				TotalElevationGain: int(activity["total_elevation_gain"].(float64)),
				Type:            activity["sport_type"].(string),
				Name:            activity["name"].(string),
				Kudos:           int(activity["kudos_count"].(float64)),
			}

			if avgWatts, ok := activity["average_watts"].(float64); ok {
				actRecord.AverageWatts = &avgWatts
			}
			if avgHR, ok := activity["average_heartrate"].(float64); ok {
				hr := int(avgHR)
				actRecord.AverageHeartRate = &hr
			}
			if maxHR, ok := activity["max_heartrate"].(float64); ok {
				hr := int(maxHR)
				actRecord.MaxHeartRate = &hr
			}
			if pace, ok := activity["average_pace_per_kilometer"].(float64); ok {
				actRecord.AveragePace = &pace
			}

			if startDateUTC, ok := activity["start_date"]; ok {
				actRecord.DateUTC = startDateUTC.(string)
				if datetime, ok := activity["start_date_utc"].(string); ok {
					// Convert to EST (UTC-5)
					actRecord.StartDatetime = formatEST(datetime)
				}
			}

			if tombstone, ok := activity["tombstone"]; ok {
				actRecord.Tombstone = tombstone.(string)
			}
			if uploadStatus, ok := activity["upload_status"].(string); ok {
				actRecord.UploadStatus = uploadStatus
			}
			if deviceWatts, ok := activity["device_watts"].(string); ok {
				actRecord.DeviceWatts = deviceWatts
			}
			if prRankLocal, ok := activity["pr_rank_local"].(int); ok {
				actRecord.PRRankLocal = &prRankLocal
			}

			activities = append(activities, actRecord)
		}

		// If we got less than 300 items (max per page), no more pages
		if len(pageData) < 300 {
			break
		}

		page++
	}

	return activities, nil
}

// formatEST converts UTC datetime to EST format (YYYY-MM-DDTHH:MM:SS)
func formatEST(utcTime string) string {
	utcTimeParsed, _ := time.Parse(time.RFC3339, utcTime)
_EST_TIME := utcTimeParsed.Add(-5 * time.Hour).Format("2006-01-02T15:04:05")
	return _EST_TIME
}

// Lambda handler entry point - this simulates EventBridge invocation
func lambdaHandler(ctx context.Context, event interface{}) (LambdaResponse, error) {
	fmt.Printf("Strava Collector Lambda invoked at %s\n", time.Now().Format(time.RFC3339))

	// TODO: Scan DynamoDB for OAuth-enabled members
	// This would replace the Python table.scan() call with AWS SDK for Go
	members := []MemberInfo{}

	fmt.Printf("Found %d OAuth-enabled members\n", len(members))

	allActivities := []ActivityRecord{}
	totalItemsStored := 0

	// Process each member's activities
	for _, member := range members {
		fmt.Printf("Processing member %s...\n", member.StravaMemberID)

		// Refresh token if needed
		encryptedToken, _ := decryptToken(member.EncryptedToken, cryptoKeyFilePath, cryptoIV)

		// Fetch activities
		activities, err := fetchActivities(member.StravaMemberID)
		if err != nil {
			fmt.Printf("Error fetching activities for member %s: %v\n", member.StravaMemberID, err)
			continue
		}

		if len(activities) > 0 {
			fmt.Printf("Member %s: Fetched %d activities\n", member.StravaMemberID, len(activities))

			// TODO: Store in DynamoDB using AWS SDK - replace with actual batch_write
			totalItemsStored += len(activities)
			allActivities = append(allActivities, activities...)
		}
	}

	// Summary response
	return LambdaResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: fmt.Sprintf(`{"message":"Strava activity collection completed successfully","membersProcessed":%d,"activitiesFetched":%d,"itemsStoredInDynamoDB":%d,"timestamp":"%s"}`,
			len(members), len(allActivities), totalItemsStored, time.Now().Format(time.RFC3339)),
	}, nil
}

// Entry point for AWS Lambda
func main() {
	lambda.Start(lambdaHandler)
}
