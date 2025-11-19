import { createFileRoute, Link } from '@tanstack/react-router';
import clsx from 'clsx';

import Footer from '@kwagner-dev/footer';
import HomeLink from '@kwagner-dev/footer/HomeLink';
import Header from '@kwagner-dev/header';
import Seo from '@kwagner-dev/seo';

import CookbookLink from '../../components/Footer/CookbookLink';

import { Route as cookbookRoute } from '.';
import recipes from './recipes.json' with { type: 'json' };

import styles from './cookbook.module.css';

export default function Recipe() {
  const { recipeName } = Route.useParams();

  const recipe = recipes.find((r) => r.url === recipeName);

  const pageFooter = (
    <Footer>
      <HomeLink />
      <CookbookLink />
    </Footer>
  );

  if (recipe == null) {
    return (
      <>
        <Header heading="Not found">
          <p>Recipe not found, check your url and try again.</p>
        </Header>
        <main className={clsx('main', 'hyper-legible')}>
          <p>
            Or you can{' '}
            <Link preload="intent" to={cookbookRoute.to}>
              return to the cookbook
            </Link>
            .
          </p>
        </main>
        {pageFooter}
      </>
    );
  }

  return (
    <>
      <Seo
        description={recipe.description}
        imageUrl=""
        title={recipe.title}
        url={`https://kwagner.dev/cookbook/recipes/${recipeName}`}
      />
      <Header heading={recipe.title}>
        <h2>Overview</h2>
        <p>{recipe.description}</p>
        <ul>
          <li>Makes {recipe.servings}</li>
          <li>Total time: {recipe.time}</li>
          <li>Tags:</li>
          <ul>
            {recipe.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </ul>
      </Header>
      <main className={clsx('main', 'hyper-legible')}>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.ingredient}>
              {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
            </li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((step) => (
            <li className={styles.pretty} key={step}>
              {step}
            </li>
          ))}
        </ol>
        <h2>Source</h2>
        <p>
          <a href={recipe.source.href}>{recipe.source.title}</a>
        </p>
        <p>{recipe.source.citation}</p>
      </main>
      {pageFooter}
    </>
  );
}

export const Route = createFileRoute('/cookbook/$recipeName')({
  component: Recipe,
});
