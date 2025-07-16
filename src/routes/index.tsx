import { createFileRoute, Link } from '@tanstack/react-router';
import clsx from 'clsx';

import Footer from '../components/Footer';
import SocialLinks from '../components/Footer/SocialLinks';
import Header from '../components/Header';
import MakerIcon from '../components/MakerIcon';
import Seo from '../components/SEO';
import { imageFolder } from '../constants';

import { Route as Articles } from './articles';
import { Route as Cookbook } from './cookbook';
import { Route as Wedding } from './wedding';

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
      <Header heading="Kristopher Wagner">
        <p>
          This is my simple development website. The goal of this site is to
          share my hobbies and help people who share my interests learn from my
          successes and failures.
        </p>
      </Header>
      <main className={clsx('hyper-legible', styles.body)}>
        <article>
          <h2>
            <i className="fa-duotone fa-rings-wedding" /> Husband
          </h2>
          <p>
            Check out the{' '}
            <Link
              aria-label="Navigate to the archived wedding website"
              to={Wedding.to}
            >
              archive of our wedding website
            </Link>
            .
          </p>
        </article>
        <article>
          <h2>
            <i className="fa-solid fa-person-running" /> Runner
          </h2>
          <p>
            I maintain a running group with weekly blog posts, statistics, and
            discussions,{' '}
            <a href="https://www.strava.com/clubs/502620">join us on Strava</a>.
          </p>
        </article>
        <article>
          <h2>
            <MakerIcon height="100%" /> Maker
          </h2>
          <p>
            I just started using a 3D printer, you can{' '}
            <a href="https://www.printables.com/@kwagner">
              follow my journey on Printables
            </a>
            .
          </p>
        </article>
        <article>
          <h2>
            <img
              alt="Lorcana logo"
              className={styles['lorcana-logo']}
              height="32px"
              src={imageFolder + 'lorcana.webp'}
              width="34.7667px"
            />{' '}
            Illumineer
          </h2>
          <p>
            I also play{' '}
            <span className={styles['lorcana-text']}>Disney Lorcana</span>, you
            can you can{' '}
            <a href="https://dreamborn.ink/creators/BJXuxcM6ASb2YhhJZDT2y6dEImd2">
              peak at my decks on dreamborn.ink
            </a>
            .
          </p>
        </article>
        <article>
          <h2>
            <i className="fa-duotone fa-rabbit-running" /> Vegetarian
          </h2>
          <p>
            Cook some of our{' '}
            <Link
              aria-label="Navigate to the Wagner family cookbook"
              to={Cookbook.to}
            >
              favorite recipes
            </Link>
            .
          </p>
        </article>
        <article>
          <h2>
            <i className="fa-duotone fa-comments" /> Maven
          </h2>
          <p>
            I like to learn and once I find something interesting (or something
            I like), I make sure everyone knows about it. Read some of my{' '}
            <Link to={Articles.to}>favorite articles</Link>.
          </p>
        </article>
      </main>
      <Footer>
        <SocialLinks />
      </Footer>
    </>
  );
}

export const Route = createFileRoute('/')({
  component: IndexPage,
});
