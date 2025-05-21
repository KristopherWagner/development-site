import { createFileRoute, Link } from '@tanstack/react-router';

import Footer from '../components/Footer';
import MakerIcon from '../components/MakerIcon';
import Seo from '../components/SEO';
import { imageFolder } from '../constants';

import styles from './index.module.css';

export default function IndexPage() {
  return (
    <>
      <Seo
        description="A page dedicated to my personal coding projects"
        imageUrl={imageFolder + 'profile_image.webp'}
        title="Kristopher Wagner's Development Site"
        url="https://kwagner.dev"
      />
      <div className={styles.body}>
        <main className="main">
          <article>
            <h1>
              <i className="fa-duotone fa-rings-wedding" /> Husband
            </h1>
            <p>
              Check out the{' '}
              <Link
                aria-label="Navigate to the archived wedding website"
                to="/wedding"
              >
                archive of our wedding website
              </Link>
              .
            </p>
          </article>
          <article>
            <h1>
              <i className="fa-solid fa-person-running" /> Runner
            </h1>
            <p>
              I maintain a running group with weekly blog posts, statistics, and
              discussions,{' '}
              <a href="https://www.strava.com/clubs/502620">
                join us on Strava
              </a>
              .
            </p>
          </article>
          <article>
            <h1>
              <MakerIcon height="100%" /> Maker
            </h1>
            <p>
              I just started using a 3D printer, you can{' '}
              <a href="https://www.printables.com/@kwagner">
                follow my journey on Printables
              </a>
              .
            </p>
          </article>
          <article>
            <h1>
              <img
                alt="Lorcana logo"
                className={styles['lorcana-logo']}
                height="32px"
                src={imageFolder + 'lorcana.webp'}
                width="34.7667px"
              />{' '}
              Illumineer
            </h1>
            <p>
              I also play{' '}
              <span className={styles['lorcana-text']}>Disney Lorcana</span>,
              you can you can{' '}
              <a href="https://dreamborn.ink/creators/BJXuxcM6ASb2YhhJZDT2y6dEImd2">
                peak at my decks on dreamborn.ink
              </a>
              .
            </p>
          </article>
          <article>
            <h1>
              <i className="fad fa-fish" /> Fishkeeper
            </h1>
            <p>
              We have a 75-gallon aquarium that we'll hopefully be upgrading in
              a few years, until then you can{' '}
              <a href="https://www.reef2reef.com/threads/mon-cala-2-0.1111326/">
                watch our coral and fish grow on Reef2Reef
              </a>
              .
            </p>
          </article>
          <article>
            <h1>
              <i className="fa-duotone fa-rabbit-running" /> Vegetarian
            </h1>
            <p>
              Cook some of our{' '}
              <Link
                aria-label="Navigate to the Wagner family cookbook"
                to="/cookbook"
              >
                favorite recipes
              </Link>
              .
            </p>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}

export const Route = createFileRoute('/')({
  component: IndexPage,
});
