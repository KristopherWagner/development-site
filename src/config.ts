export const STRAVA_CONFIG = {
  clientId: import.meta.env.PUBLIC_STRAVA_CLIENT_ID,
  redirectUri: import.meta.env.PUBLIC_STRAVA_REDIRECT_URI,
  scope: import.meta.env.PUBLIC_STRAVA_SCOPE,
};

export const COGNITO_CONFIG = {
  authority: import.meta.env.PUBLIC_COGNITO_AUTHORITY,
  clientId: import.meta.env.PUBLIC_COGNITO_CLIENT_ID,
  redirectUri: import.meta.env.PUBLIC_COGNITO_REDIRECT_URI,
};
