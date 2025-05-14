import { createFileRoute } from '@tanstack/react-router';

import LorcanaLogo from '../../static/images/lorcana.webp';

import Footer from '../components/Footer';
import Seo from '../components/SEO';

import styles from './index.module.css';
import clsx from 'clsx';
import MakerIcon from '../components/MakerIcon';

export default function IndexPage() {
  return (
    <>
      <Seo
        description="A page dedicated to my personal coding projects"
        imageUrl="https://kwagner.dev/static/starlight_lounge-cf67d74b7be4b4baf494389267fa8e60.webp"
        title="Kristopher Wagner's Development Site"
        url="https://kwagner.dev"
      />
      <div className={styles.body}>
        <main>
          <h1>Welcome!</h1>
          <p>This is my work-in-progress development website</p>
          <p>
            <i className={clsx('fa-duotone fa-rings-wedding', styles.icon)} />{' '}
            Check out the{' '}
            <a
              aria-label="Navigate to the archived wedding website"
              href="/wedding"
            >
              archive of our wedding website
            </a>
            .
          </p>
          <p>
            <MakerIcon /> I just started using a 3D printer, you can{' '}
            <a href="https://www.printables.com/@kwagner">
              follow my journey on Printables
            </a>
            .
          </p>
          <p>
            <img
              alt="Lorcana logo"
              className={styles['lorcana-logo']}
              height="17.5px"
              loading="lazy"
              src={LorcanaLogo}
            />{' '}
            I also play{' '}
            <span className={styles['lorcana-text']}>Disney Lorcana</span>, you
            can you can{' '}
            <a href="https://dreamborn.ink/creators/BJXuxcM6ASb2YhhJZDT2y6dEImd2">
              peak at my decks on dreamborn.ink
            </a>
            .
          </p>
          <p>
            <i className={clsx('fad fa-fish', styles.icon)} /> We have a
            75-gallon aquarium that we'll hopefully be upgrading in a few years,
            until then you can{' '}
            <a href="https://www.reef2reef.com/threads/mon-cala-2-0.1111326/">
              watch our coral and fish grow on Reef2Reef
            </a>
            .
          </p>
        </main>
        <Footer />
      </div>
    </>
  );
}

export const Route = createFileRoute('/')({
  component: IndexPage,
});
