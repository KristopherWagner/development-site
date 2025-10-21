import clsx from 'clsx';
import { Link } from '@tanstack/react-router';

import Grid from '../Grid';
import Card from '../Grid/Card';
import Header from '../Header';
import Seo from '../SEO';

import styles from './NotFound.module.css';
import { Route } from '../../routes';

export default function NotFound() {
  return (
    <>
      <Seo
        description="404: Page not found"
        imageUrl=""
        title="404 Not Found"
        url=""
      />
      <Header heading="Page not found">
        <div className={styles.crow}>🐦‍⬛</div>
        <h2>Well, this is awkward</h2>
        <p>
          Looks like this page flew the coop. Our murder of crows searched
          everywhere, but even with their legendary intelligence and
          problem-solving skills, they couldn't find what you're looking for.
        </p>
      </Header>
      <main className={clsx('main', 'hyper-legible')}>
        <p className={clsx(styles.instructions, 'cols-full')}>
          You can{' '}
          <Link aria-label="Return home" preload="intent" to={Route.to}>
            fly back home
          </Link>{' '}
          or use your browser's back button to retrace your flight path.
        </p>
        <h3 className="cols-full">Crow facts while you're here:</h3>
        <Grid as="ul" className={styles.list}>
          <Card as="li" className="cols-md">
            Crows can remember human faces for years and hold grudges
          </Card>
          <Card as="li" className="cols-md">
            They're one of the few animals that create and use tools{' '}
          </Card>
          <Card as="li" className="cols-md">
            Crows have been observed playing pranks on each other for fun
          </Card>
          <Card as="li" className="cols-md">
            A group of crows is called a "murder" (fitting for this dead page)
          </Card>
        </Grid>
      </main>
    </>
  );
}
