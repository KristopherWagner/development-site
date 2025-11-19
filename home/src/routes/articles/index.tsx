import { createFileRoute, Link } from '@tanstack/react-router';
import clsx from 'clsx';

import Footer from '@kwagner-dev/footer';
import HomeLink from '@kwagner-dev/footer/HomeLink';
import Seo from '@kwagner-dev/seo';

import Header from '../../components/Header';

import { Route as HowMoneyCanBuyHappiness } from './how-money-can-buy-happiness';
import { Route as SustainabilityOfShipping } from './sustainability-of-shipping';

export default function Articles() {
  return (
    <>
      <Seo
        description="A repository of our favorite recipes"
        imageUrl=""
        title="Wagner Family Cookbook"
        url={'https://kwagner.dev' + Route.to}
      />
      <Header heading="Articles">
        <p>
          Below you'll find a list of my favorite articles (or in some cases
          products) with a short explanation of why I'm sharing it.
        </p>
        <p>
          You may wonder why I have copied the article text when a link to the
          original articles should suffice. The reason is that my website is
          designed to be easy to read and free from distractions.
        </p>
        <p>
          Read about{' '}
          <a href="https://www.brailleinstitute.org/freefont/">
            the hyperlegible font
          </a>{' '}
          and why I chose{' '}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8883023/">
            such a large font size
          </a>
          .
        </p>
        <p>
          I am not an affiliate and I make no money from you reading any of
          these articles.
        </p>
      </Header>
      <main className={clsx('main', 'hyper-legible')}>
        <ul>
          <li>
            <Link to={SustainabilityOfShipping.to}>
              Explained: Sustainability of Shipping
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={HowMoneyCanBuyHappiness.to}>
              How Money Can Buy Happiness
            </Link>
          </li>
        </ul>
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
