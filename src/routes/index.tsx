import { createFileRoute, Link } from '@tanstack/react-router';

import Footer from '../components/Footer';
import SocialLinks from '../components/Footer/SocialLinks';
import Grid from '../components/Grid';
import Card from '../components/Grid/Card';
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
      <main className={styles.body}>
        <Grid className={styles.grid}>
          <Card as="article" className="cols-lg">
            <h2>
              <i className="fa-duotone fa-rings-wedding" />
              Husband
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
          </Card>
          <Card as="article" className="cols-lg">
            <h2>
              <i className="fa-solid fa-person-running" /> Runner
            </h2>
            <p>
              I maintain a running group with weekly blog posts, statistics, and
              discussions,{' '}
              <a href="https://www.strava.com/clubs/502620">
                join us on Strava
              </a>
              .
            </p>
          </Card>
          <Card as="article" className="cols-lg">
            <h2>
              <MakerIcon height="100%" /> Maker
            </h2>
            <p>
              I just started using a 3D printer, you can{' '}
              <a href="https://www.printables.com/@kwagner">
                follow my journey on Printables
              </a>{' '}
              or{' '}
              <a href="https://makerworld.com/en/@kwagner">
                checkout my MakerWorld profile
              </a>
              .
            </p>
          </Card>
          <Card as="article" className="cols-lg">
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
          </Card>
          <Card as="article" className="cols-lg">
            <h2>
              <i className="fa-duotone fa-comments" /> Maven
            </h2>
            <p>
              I like to learn and once I find something interesting (or
              something I like), I make sure everyone knows about it. Read some
              of my <Link to={Articles.to}>favorite articles</Link>.
            </p>
          </Card>
        </Grid>
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
