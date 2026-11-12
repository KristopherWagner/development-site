import { Route } from '../../../routes/cookbook';

import Footer from '../../Footer';
import HomeLink from '../../Footer/HomeLink';
import Header from '../../Header';
import Grid from '../../Grid';
import { CardLink } from '../../Grid/Card';
import Seo from '../../SEO';

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
      <Header>Cookbook</Header>
      <main className={styles.root}>
        <p>
          This page will slowly aggregate our favorite recipes. I'll (hopefully)
          add some fun features to the page over time as well.
        </p>
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
