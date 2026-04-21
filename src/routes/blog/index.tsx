import { createFileRoute, Link } from '@tanstack/react-router';

import Seo from '../../components/SEO';
import Header from '../../components/Header';
import Grid from '../../components/Grid';
import Card from '../../components/Grid/Card';

import { Route as Introduction } from './introduction';

export default function Blog() {
  return (
    <>
      <Seo
        description="Blog posts by Kristopher Wagner"
        imageUrl=""
        title="Blog | kwagner.dev"
        url={'https://kwagner.dev' + Route.to}
      />
      <Header heading="Blog" />
      <main>
        <Grid>
          <Card className="cols-lg">
            <h2>introduction</h2>
            <p>
              ❄️ In 2016 after shoveling my car and my girlfriend's car out of
              31" of snow, I noticed that the car parked outside of my apartment
              had a handicap placard on the rearview mirror. So I shoveled the
              snow around a third car. The next morning, I couldn't get out of
              bed because my back hurt that much. So, I found a job in Florida
              and haven't touched a snow shovel since.
            </p>
            <Link className="btn" to={Introduction.to}>
              Read More
            </Link>
          </Card>
        </Grid>
      </main>
    </>
  );
}

export const Route = createFileRoute('/blog/')({
  component: Blog,
});
