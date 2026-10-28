import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from 'react-oidc-context';

import Footer from '../../components/Footer';
import HomeLink from '../../components/Footer/HomeLink';
import Header from '../../components/Header';
import Seo from '../../components/SEO';

function LightningFitnessChallenge() {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return (
      <Header heading="Lightning Fitness Challenge">
        <p>
          Welcome, please{' '}
          <button
            aria-label="sign in through Amazon cognito"
            onClick={() => auth.signinRedirect()}
          >
            Sign in
          </button>
        </p>
      </Header>
    );
  }

  return (
    <>
      <Seo
        description="A place for Lightning Fans to stay healthy and support their team"
        imageUrl=""
        title="Lightning Fitness Challenge on Strava"
        url={'https://kwagner.dev' + Route.to}
      />

      <Header heading="Lightning Fitness Challenge">
        <p>
          Success! Thanks for signing in, you'll need to authorize Strava now.
        </p>
      </Header>

      <main>
        Todo: Add Strava authorization and display the Lightning Fitness
        Challenge content here.
      </main>

      <Footer>
        <HomeLink />
      </Footer>
    </>
  );
}

export const Route = createFileRoute('/lightning-fitness-challenge/')({
  component: LightningFitnessChallenge,
});
