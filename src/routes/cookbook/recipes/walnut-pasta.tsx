import { createFileRoute, Link } from '@tanstack/react-router';

import recipe from '../../../../static/recipes/walnutPasta.json';

import Seo from '../../../components/SEO';
import Footer from '../../../components/Footer';

import { Route as homeRoute } from '../../index';

import { Route as cookbookRoute } from '../index';

function WalnutPasta() {
  return (
    <>
      <Seo
        description="Your night-before-a-long-run pasta"
        imageUrl=""
        title="Walnut Pasta"
        url="https://kwagner.dev/cookbook/recipes/walnut-pasta"
      />
      <main className="main">
        <h1>{recipe.title}</h1>
        <p>Makes {recipe.servings} servings</p>
        <p>Total time: {recipe.time}</p>
        <p>Tags:</p>
        <ul>
          {recipe.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
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
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h2>Source</h2>
        <p>
          <a href={recipe.source.href}>{recipe.source.title}</a>
        </p>
        <p>{recipe.source.citation}</p>
      </main>
      <Footer>
        <Link aria-label="Return home" preload="intent" to={homeRoute.to}>
          <i className="fa-duotone fa-house fa-2x fa-fw" />
        </Link>
        <Link
          aria-label="Return to cookbook"
          preload="intent"
          to={cookbookRoute.to}
        >
          <i className="fa-duotone fa-book-open-cover fa-2x fa-fw" />
        </Link>
      </Footer>
    </>
  );
}

export const Route = createFileRoute('/cookbook/recipes/walnut-pasta')({
  component: WalnutPasta,
});
