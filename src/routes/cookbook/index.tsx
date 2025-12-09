import { createFileRoute } from '@tanstack/react-router';

import Footer from '../../components/Footer';
import HomeLink from '../../components/Footer/HomeLink';
import Header from '../../components/Header';
import Grid from '../../components/Grid';
import { CardLink } from '../../components/Grid/Card';
import Seo from '../../components/SEO';

import recipes from './recipes.json' with { type: 'json' };
import styles from './cookbook.module.css';

export default function Cookbook() {
  return (
    <>
      <Seo
        description="A repository of our favorite recipes"
        imageUrl=""
        title="Wagner Family Cookbook"
        url={'https://kwagner.dev' + Route.to}
      />
      <Header heading="Cookbook">
        <p>
          This page will slowly aggregate our favorite recipes. I'll (hopefully)
          add some fun features to the page over time as well.
        </p>
      </Header>
      <main className={styles.root}>
        <Grid>
          <h2 className="cols-full">Recipes</h2>
          {[...recipes].map((recipe) => (
            <CardLink className="cols-md" key={recipe.url} to={recipe.url}>
              {recipe.title}
            </CardLink>
          ))}
        </Grid>
      </main>
      <Footer>
        <HomeLink />
      </Footer>
    </>
  );
}

export const Route = createFileRoute('/cookbook/')({
  component: Cookbook,
});
