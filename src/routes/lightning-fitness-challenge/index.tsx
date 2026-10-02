import { createFileRoute } from '@tanstack/react-router';
import { withAuthenticationRequired } from 'react-oidc-context';

const PrivateRoute = () => <div>Private</div>;

const fitnessChallengeRoute = withAuthenticationRequired(PrivateRoute, {
  OnRedirecting: () => <div>Redirecting to the login page...</div>,
});

export const Route = createFileRoute('/lightning-fitness-challenge/')({
  component: fitnessChallengeRoute,
});
