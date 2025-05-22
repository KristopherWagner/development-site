import { createFileRoute } from '@tanstack/react-router';

import recipe from '../../../../static/recipes/smokyBlackBeanGrilledCheese.json';

import Footer from '../../../components/Footer';
import CookbookLink from '../../../components/Footer/CookbookLink';
import HomeLink from '../../../components/Footer/HomeLink';
import Seo from '../../../components/SEO';

export default function SmokyBlackBeanGrilledCheese() {
  return (
    <>
      <Seo
        description="A quick protein- and carb-packed lunch"
        imageUrl=""
        title="Smoky Black Bean Grilled Cheese"
        url="https://kwagner.dev/cookbook/recipes/smoky-black-bean-grilled-cheese"
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
        <HomeLink />
        <CookbookLink />
      </Footer>
    </>
  );
}

export const Route = createFileRoute(
  '/cookbook/recipes/smoky-black-bean-grilled-cheese',
)({
  component: SmokyBlackBeanGrilledCheese,
});
