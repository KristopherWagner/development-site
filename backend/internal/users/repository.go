package users

import (
	"context"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

// UserRepository handles data access for user-related entities
type UserRepository struct {
	db *dynamodb.Client
}

// NewUserRepository creates a new instance of UserRepository
func NewUserRepository(db *dynamodb.Client) *UserRepository {
	return &UserRepository{db: db}
}

// GetStravaStatus checks if a user already has a Strava account linked.
// It uses Single Table Design where the PK is the User ID and SK defines the entity type.
func (r *UserRepository) GetStravaStatus(ctx context.Context, cognitoSub string) (*UserStravaLink, error) {
	// We query by PK. Because of our Single-Table Design, 
	// this returns all items (Metadata + Strava Links) for this user.
	out, err := r.db.Query(ctx, &dynamodb.QueryInput{
		TableName:                 aws.String("UserAuthLinks"),
		KeyConditionExpression:    aws.String("PK = :pk"),
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":pk": &types.AttributeValueMemberS{Value: "USER#" + cognitoSub},
		},
	})

	if err != nil {
		return nil, err
	}

	// Logic to parse results:
	// If any item in the result has the prefix "STR_LINK#", 
	// the user is connected.
	for _, item := range out.Items {
		if sk, ok := item["SK"].(*types.AttributeValueMemberS); ok && strings.HasPrefix(sk.Value, "STR_LINK#") {
			return r.parseLink(item), nil
		}
	}

	return nil, nil // No link found
}

// parseLink helper to convert a DynamoDB map item into a UserStravaLink struct
func (r *UserRepository) parseLink(item map[string]types.AttributeValue) *UserStravaLink {
	var link UserStravaLink

	if val, ok := item["StravaID"].(*types.AttributeValueMemberS); ok {
		link.StravaID = val.Value
	}
	if _, ok := item["LinkedAt"].(*types.AttributeValueMemberS); ok {
		// Note: In a production app, you'd properly parse the date string into time.Time
		// For now, we'll just store the raw string or a placeholder
		link.LinkedAt = time.Now() 
	}
	if val, ok := item["AuthToken"].(*types.AttributeValueMemberS); ok {
		link.AuthToken = val.Value
	}

	return &link
}
