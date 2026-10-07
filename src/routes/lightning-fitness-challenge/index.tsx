import { createFileRoute } from '@tanstack/react-router';
import { useAuth, withAuthenticationRequired } from 'react-oidc-context';

import Footer from '../../components/Footer';
import HomeLink from '../../components/Footer/HomeLink';
import Header from '../../components/Header';
import Seo from '../../components/SEO';

function LightningFitnessChallenge() {
  const auth = useAuth();

  return (
    <>
      <Seo
        description="A place for Lightning Fans to stay healthy and support their team"
        imageUrl=""
        title="Lightning Fitness Challenge on Strava"
        url={'https://kwagner.dev' + Route.to}
      />

      <Header heading="Lightning Fitness Challenge">
        <p>Success! Thanks for signing in</p>
      </Header>

      <main>
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </main>

      <Footer>
        <HomeLink />
      </Footer>
    </>
  );
}

function RedirectingToLogin() {
  return (
    <>
      <Header heading="Lightning Fitness Challenge">
        <p>Redirecting to the login page...</p>
      </Header>
    </>
  );
}

const LightningFitnessChallengeRoute = withAuthenticationRequired(
  LightningFitnessChallenge,
  {
    OnRedirecting: () => <RedirectingToLogin />,
  },
);

export const Route = createFileRoute('/lightning-fitness-challenge/')({
  component: LightningFitnessChallengeRoute,
});
