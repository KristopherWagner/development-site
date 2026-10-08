package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-lambda-go/events"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	code := request.QueryStringParameters["code"]
	if code == "" {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       fmt.Sprintf(`{"message": "No code provided"}`),
		}, nil
	}

	// TODO:
	// 1. Exchange 'code' for tokens using Strava API
	// 2. Save tokens to DynamoDB
	// 3. Redirect user back to frontend

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       fmt.Sprintf(`{"message": "Auth code received: %s"}`, code),
	}, nil
}

func main() {
	lambda.Start(handler)
}
