import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from 'react-oidc-context';

import Footer from '../../components/Footer';
import HomeLink from '../../components/Footer/HomeLink';
import Header from '../../components/Header';
import Seo from '../../components/SEO';

import { STRAVA_CONFIG } from '../../config';

function LightningFitnessChallenge() {
  const auth = useAuth();
  const { clientId, redirectUri, scope } = STRAVA_CONFIG;

  const url = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&exchange_token=true&approval_prompt=force&scope=${scope}`;

  console.log(JSON.stringify(auth, null, 2));

  if (!auth.isAuthenticated) {
    return (
      <Header heading="Lightning Fitness Challenge">
        <p>
          Welcome, please{' '}
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
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
        <a href={url}>Authorize Strava</a>
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
