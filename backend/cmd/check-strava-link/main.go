package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"

	"github.com/KristopherWagner/development-site/backend/internal/users"
)

func main() {
	// Initialize AWS Config
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	// Initialize DynamoDB Client
	dbClient := dynamodb.NewFromConfig(cfg)

	// Initialize Repository and Service
	repo := users.NewUserRepository(dbClient)
	svc := users.NewUserService(repo)

	// Register Lambda handler
	lambda.Start(HandleRequest(svc))
}

func HandleRequest(svc *users.UserService) func(context.Context, events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return func(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
		var input users.GetStravaStatusRequest
		if err := json.Unmarshal([]byte(req.Body), &input); err != nil {
			return events.APIGatewayProxyResponse{
				StatusCode: 400,
				Body:       fmt.Sprintf("Invalid request: %v", err),
			}, nil
		}

		link, err := svc.GetStravaStatus(ctx, input.CognitoSub)
		if err != nil {
			if err == users.ErrNoStravaLink {
				return events.APIGatewayProxyResponse{
					StatusCode: 200,
					Body:       `{"is_linked": false, "link": null}`,
				}, nil
			}
			return events.APIGatewayProxyResponse{
				StatusCode: 500,
				Body:       fmt.Sprintf("Internal error: %v", err),
			}, nil
		}

		resp := users.GetStravaStatusResponse{
			IsLinked: true,
			Link:     link,
		}

		respBody, _ := json.Marshal(resp)
		return events.APIGatewayProxyResponse{
			StatusCode: 200,
			Body:       string(respBody),
		}, nil
	}
}
