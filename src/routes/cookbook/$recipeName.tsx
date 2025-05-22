import { createFileRoute, Link } from '@tanstack/react-router';

import Seo from '../../components/SEO';
import Footer from '../../components/Footer';
import CookbookLink from '../../components/Footer/CookbookLink';
import HomeLink from '../../components/Footer/HomeLink';

import { Route as cookbookRoute } from '.';
import recipes from './recipes.json';

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
        <main className="main">
          <p>Recipe not found, check your url and try again.</p>
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
      {pageFooter}
    </>
  );
}

export const Route = createFileRoute('/cookbook/$recipeName')({
  component: Recipe,
});
