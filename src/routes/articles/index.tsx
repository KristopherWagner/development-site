import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';

import Footer from '../../components/Footer';
import HomeLink from '../../components/Footer/HomeLink';
import Grid from '../../components/Grid';
import Card from '../../components/Grid/Card';
import Header from '../../components/Header';
import Seo from '../../components/SEO';

import articles from './articles.json' with { type: 'json' };

export default function Articles() {
  return (
    <>
      <Seo
        description="A repository of my favorite articles"
        imageUrl=""
        title="Kristopher's favorite articles"
        url={'https://kwagner.dev' + Route.to}
      />
      <Header heading="Articles">
        <p>
          Below you'll find a list of my favorite articles (or in some cases
          products).
        </p>
        <p>
          I am not an affiliate and I make no money from you reading any of
          these articles.
        </p>
      </Header>
      <main className={clsx('main', 'hyper-legible')}>
        <Grid>
          <ul className="contents">
            {articles.map((article) => (
              <a
                aria-label={'Visit the external article ' + article.title}
                className={clsx('no-decoration', 'with-hover', 'cols-md')}
                href={article.href}
                key={article.href}
                referrerPolicy="origin-when-cross-origin"
              >
                <Card as="li">{article.title}</Card>
              </a>
            ))}
          </ul>
        </Grid>
      </main>
      <Footer>
        <HomeLink />
      </Footer>
    </>
  );
}

export const Route = createFileRoute('/articles/')({
  component: Articles,
});
