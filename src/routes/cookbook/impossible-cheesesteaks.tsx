import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';

import Header from '../../components/Header';
import Seo from '../../components/SEO';

import styles from './cookbook.module.css';

const description = 'An impossibly delicious vegan version of a cheesesteak';

export default function ImpossibleCheesesteaks() {
  return (
    <>
      <Seo
        description={description}
        imageUrl=""
        title="Impossible Cheesesteaks"
        url="https://kwagner.dev/cookbook/recipes/impossible-cheesesteaks"
      />{' '}
      <Header heading="Impossible Cheesesteaks">
        <h2>Overview</h2>
        <p>{description}</p>
        <ul>
          <li>Makes 3 sandwiches</li>
          <li>Total time: 1 hour</li>
          <li>Tag: Vegetarian</li>
        </ul>
      </Header>
      <main className={clsx('main', 'hyper-legible')}>
        <h2>Ingredients</h2>
        <ul>
          <li>Cola-caramelized onions:</li>
          <ul>
            <li>2 large yellow onions, thinly sliced</li>
            <li>One 20-oz bottle cola</li>
          </ul>

          <li>Plant-based whiz:</li>
          <ul>
            <li>7oz American-style plant-based cheese, cut into small cubes</li>
            <li>3/4 cup plus 3 Tbsp water</li>
          </ul>
          <li>1 Tbsp vegetable oil</li>
          <li>12 oz Impossible Burger</li>
          <li>Salt</li>
          <li>Ground black pepper</li>
          <li>3 6-in hoagie rolls</li>
          <li>1/2 cup pickled hot peppers, sliced or chopped</li>
        </ul>

        <h2>Instructions</h2>

        <h3>Caramelized onions</h3>
        <ol>
          <li className={styles.pretty}>
            Line a large rimmed baking sheet with parchment paper.
          </li>
          <li className={styles.pretty}>
            In a saucepan over medium-high heat, combine the onions and cola.
          </li>
          <li className={styles.pretty}>
            Reduce the heat to medium-low to maintain a steady simmer and cook.
          </li>
          <li className={styles.pretty}>
            Stir occassionally, until the cola is completely reduced and
            evaporated (about 1 hour).
          </li>
          <li className={styles.pretty}>
            Remove from the heat and transfer the onions to the prepared baking
            sheet, spreading them into an even layer to cool.
          </li>
          <li className={styles.pretty}>
            If not using right away, transfer to an airtight container and
            refrigerate for up to 5 days.
          </li>
        </ol>

        <h3>Plant-based whiz</h3>
        <ol>
          <li className={styles.pretty}>
            Add the cheese and water to a small saucepan.
          </li>
          <li className={styles.pretty}>Bring to a simmer over medium heat.</li>
          <li className={styles.pretty}>
            Whisk until smooth (about 2 minutes)
          </li>
          <li className={styles.pretty}>
            Cover and set aside to keep warm until serving.
          </li>
        </ol>

        <h3>Cheesesteaks</h3>
        <ol>
          <li className={styles.pretty}>
            In a large nonstick skillet over high heatm warm the oil.
          </li>
          <li className={styles.pretty}>
            Crumble the Impossible Burger into the pan and season with 1 tsp
            salt and a few turns of black pepper.
          </li>
          <li className={styles.pretty}>
            Cook, stirring to break up the meat, until cooked through and the
            pieces start to form a brown crust (3-4 minutes).
          </li>
          <li className={styles.pretty}>
            Stir in the caramelized onions and warm through.
          </li>
          <li className={styles.pretty}>
            Divide the mixture amojng the hoagie rolls.
          </li>
          <li className={styles.pretty}>Top with the plant-based whiz.</li>
          <li className={styles.pretty}>
            Sprinkled with pickled hot peppers and serve at once.
          </li>
        </ol>

        <h2>Source</h2>
        <p>
          <a
            aria-label="Visit the external source for Cheesesteaks with caramelized onions"
            href="https://impossiblefoods.com/blog/impossible-the-cookbook-is-here"
            referrerPolicy="origin-when-cross-origin"
          >
            Impossible: The Cookbook
          </a>
        </p>
        <p>
          Impossible Foods. (2020). Impossible: The Cookbook. San Francisco:
          Chronicle Books LLC
        </p>
      </main>
    </>
  );
}

export const Route = createFileRoute('/cookbook/impossible-cheesesteaks')({
  component: ImpossibleCheesesteaks,
});
