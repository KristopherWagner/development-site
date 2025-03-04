import '@fontsource/montserrat';
import '@fontsource/roboto';
import { Link } from 'gatsby';
import React from 'react';
import * as styles from './index.module.css';

import Seo from '../components/SEO';

export default function IndexPage() {
  return (
    <>
      <h1>Welcome!</h1>
      <p>This is my work-in-progress development website</p>
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
    </>
  );
}

export const Head = () => (
  <>
    <html lang="en-US" />
    <body className={styles.body} />
    <Seo
      description="A page dedicated to my personal coding projects"
      imageUrl="https://kwagner.dev/static/starlight_lounge-cf67d74b7be4b4baf494389267fa8e60.webp"
      title="Kristopher Wagner's Development Site"
      url="https://kwagner.dev"
    />
  </>
);
