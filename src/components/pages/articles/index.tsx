import { Route } from '../../../routes/articles';
import Footer from '../../Footer';
import HomeLink from '../../Footer/HomeLink';
import Grid from '../../Grid';
import { CardLink } from '../../Grid/Card';
import Header from '../../Header';
import Seo from '../../SEO';

import articles from './articles.json' with { type: 'json' };
import styles from './articles.module.css';

export default function Articles() {
  return (
    <>
      <Seo
        description="A repository of my favorite articles"
        imageUrl=""
        title="Kristopher's favorite articles"
        url={'https://kwagner.dev' + Route.to}
      />
      <Header>Articles</Header>
      <main>
        <p>
          Below you'll find a list of my favorite articles (or in some cases
          products).
        </p>
        <p>
          I am not an affiliate and I make no money from you reading any of
          these articles.
        </p>
        <Grid className={styles.grid}>
          {articles.map((article) => (
            <CardLink
              className="cols-md"
              to={article.href}
              key={article.href}
              isExternal
              linkProps={{
                'aria-label': 'Visit the external article ' + article.title,
                referrerPolicy: 'origin-when-cross-origin',
              }}
            >
              {article.title}
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
