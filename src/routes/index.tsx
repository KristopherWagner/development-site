import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';

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
        imageUrl="https://development-site-static.s3.us-east-2.amazonaws.com/images/profile_image.webp"
        title="Kristopher Wagner's Development Site"
        url="https://kwagner.dev"
      />
      <div className={styles.body}>
        <main>
          <article>
            <h1>
              <i className={clsx('fa-duotone fa-rings-wedding', styles.icon)} />{' '}
              Husband
            </h1>
            <p>
              Check out the{' '}
              <a
                aria-label="Navigate to the archived wedding website"
                href="/wedding"
              >
                archive of our wedding website
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
                height="100%"
                loading="lazy"
                src={imageFolder + 'lorcana.webp'}
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
              <i className={clsx('fad fa-fish', styles.icon)} /> Fishkeeper
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
        </main>
        <Footer />
      </div>
    </>
  );
}

export const Route = createFileRoute('/')({
  component: IndexPage,
});
