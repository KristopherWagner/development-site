package users

import (
	"context"
	"errors"
	"fmt"
)

var ErrNoStravaLink = errors.New("no strava account linked")

// UserService handles the business logic for user actions
type UserService struct {
	repo *UserRepository
}

// NewUserService creates a new instance of UserService
func NewUserService(repo *UserRepository) *UserService {
	return &UserService{repo: repo}
}

// GetStravaStatus checks if the user has a strava account and returns the status
func (s *UserService) GetStravaStatus(ctx context.Context, cognitoSub string) (*UserStravaLink, error) {
	if cognitoSub == "" {
		return nil, fmt.Errorf("cognito_sub is required")
	}

	link, err := s.repo.GetStravaStatus(ctx, cognitoSub)
	if err != nil {
		return nil, fmt.Errorf("repository error: %w", err)
	}

	if link == nil {
		return nil, ErrNoStravaLink
	}

	return link, nil
}
