import { createFileRoute } from '@tanstack/react-router';
import Seo from '../../../components/SEO';

import recipe from '../../../../static/recipes/walnutPasta.json';

function WalnutPasta() {
  return (
    <>
      <Seo
        description="Your night-before-a-long-run pasta"
        imageUrl=""
        title="Walnut Pasta"
        url="https://kwagner.dev/cookbook/recipes/walnut-pasta"
      />
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
    </>
  );
}

export const Route = createFileRoute('/cookbook/recipes/walnut-pasta')({
  component: WalnutPasta,
});
