package users

import "time"

// GetStravaStatusRequest represents the input for checking strava status
type GetStravaStatusRequest struct {
	CognitoSub string `json:"cognito_sub"`
}

// UserStravaLink represents the data structure for a linked strava account
type UserStravaLink struct {
	StravaID  string    `json:"strava_id"`
	LinkedAt  time.Time `json:"linked_at"`
	AuthToken string    `json:"auth_token"`
}

// GetStravaStatusResponse represents the output of the check
type GetStravaStatusResponse struct {
	IsLinked bool           `json:"is_linked"`
	Link     *UserStravaLink `json:"link,omitempty"`
}
