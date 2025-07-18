import { createFileRoute, Link } from '@tanstack/react-router';
import clsx from 'clsx';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HomeLink from '../../components/Footer/HomeLink';
import Seo from '../../components/SEO';

import recipes from './recipes.json';
import styles from './cookbook.module.css';

export default function Cookbook() {
  return (
    <>
      <Seo
        description="A repository of our favorite recipes"
        imageUrl=""
        title="Wagner Family Cookbook"
        url="https://kwagner.dev/cookbook"
      />
      <Header heading="Cookbook">
        <p>
          This page will slowly aggregate our favorite recipes. I'll (hopefully)
          add some fun features to the page over time as well.
        </p>
      </Header>
      <main className={clsx('main', 'hyper-legible', styles.cookbook)}>
        <h2>Recipes</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.url}>
              <Link to={recipe.url}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
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
