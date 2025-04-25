import '@fontsource/montserrat';
import '@fontsource/roboto';
import { createRootRoute } from '@tanstack/react-router';

import Footer from '../components/Footer';
import Seo from '../components/SEO';

import styles from './index.module.css';

export default function IndexPage() {
  return (
    <html>
      <head>
        <html lang="en-US" />
        <Seo
          description="A page dedicated to my personal coding projects"
          imageUrl="https://kwagner.dev/static/starlight_lounge-cf67d74b7be4b4baf494389267fa8e60.webp"
          title="Kristopher Wagner's Development Site"
          url="https://kwagner.dev"
        />
      </head>
      <body className={styles.body}>
        <article>
          <h1>Welcome!</h1>
          <p>This is my work-in-progress development website</p>
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
          <p>
            I just started using a 3D printer, you can{' '}
            <a href="https://www.printables.com/@kwagner">
              follow my journey on Printables
            </a>
            .
          </p>
          <p>
            I also play Lorcana, you can{' '}
            <a href="https://dreamborn.ink/users/BJXuxcM6ASb2YhhJZDT2y6dEImd2">
              peak at my decks here
            </a>
            .
          </p>
        </article>
        <Footer />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  component: IndexPage,
});
