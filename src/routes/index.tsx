import { createFileRoute, Link } from '@tanstack/react-router';

import Footer from '../components/Footer';
import SocialLinks from '../components/Footer/SocialLinks';
import Grid from '../components/Grid';
import Card from '../components/Grid/Card';
import Header from '../components/Header';
import Seo from '../components/SEO';
import { imageFolder } from '../constants';

import { Route as Articles } from './articles';
import { Route as Blog } from './blog';
import { Route as Cookbook } from './cookbook';
import { Route as Wedding } from './wedding';

import styles from './index.module.css';
import clsx from 'clsx';

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
              <i className="fa-duotone fa-family" />
              Husband & Father
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
              <i className="fa-duotone fa-code" /> Engineer
            </h2>
            <p>
              I am a computer science engineer by trade and occasionally I write
              some code on my free time (this site included!). You can{' '}
              <a href="https://github.com/KristopherWagner">
                look at my GitHub profile
              </a>{' '}
              to see what I've been working on.
            </p>
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
          <Card as="article" className={clsx('cols-lg', 'row-2')}>
            <h2>
              <i className="fa-duotone fa-rabbit-running" /> Vegetarian
            </h2>
            <blockquote>
              "The four highest-impact things an individual can do to tackle
              climate change are eat a plant-based diet, avoid air travel, live
              car-free, and have fewer children. Of those four actions, only
              plant-based eating immediately addresses methane and nitrous
              oxide, the most urgently important greenhouse gases."
            </blockquote>
            - Jonathan Safran Foer
            <p>
              Cook some of our{' '}
              <Link
                aria-label="Navigate to the Wagner family cookbook"
                to={Cookbook.to}
              >
                favorite recipes
              </Link>
              . They're better for your body, slow climate change, and relieve
              the global hunger crisis.
            </p>
          </Card>
          <Card as="article" className="cols-lg">
            <h2>
              <i className="fa-duotone fa-comments" /> Maven
            </h2>
            <p>
              I like to learn and once I find something interesting (or
              something I like), I make sure everyone knows about it. Read some
              of my <Link to={Articles.to}>favorite articles</Link>. Or check
              out some of <Link to={Blog.to}>my blog posts</Link>.
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
