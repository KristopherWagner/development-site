import clsx from 'clsx';

import Grid from '../Grid';
import Card from '../Grid/Card';
import Header from '../Header';
import Seo from '../SEO';

import styles from './NotFound.module.css';
import { Link, useRouter } from '@tanstack/react-router';
import { Route } from '../../routes';

export default function NotFound() {
  const { history } = useRouter();

  console.log(history);

  return (
    <>
      <Seo
        description="404: Page nout found"
        imageUrl=""
        title="404 Not Found"
        url=""
      />
      <Header
        heading={
          <span>
            <i className="fa-duotone fa-crow" /> 404
          </span>
        }
      >
        <h2>Well, this is awkward</h2>
        <p>
          Looks like this page flew the coop. Our murder of crows searched
          everywhere, but even with their legendary intelligence and
          problem-solving skills, they couldn't find what you're looking for.
        </p>
      </Header>
      <main className={clsx('main', 'hyper-legible')}>
        <Grid>
          <Card className={clsx(styles.card, 'cols-full')}>
            <p>
              "Once upon a midnight dreary, while I pondered, weak and weary,
              over this page that exists... nevermore."
            </p>
            <p>- Edgar Allan No-Page</p>
          </Card>
          <p className={clsx(styles.instructions, 'cols-full')}>
            You can{' '}
            <Link aria-label="Return home" preload="intent" to={Route.to}>
              fly back home
            </Link>{' '}
            or use your browser's back button to retrace your flight path.
          </p>
          <Card className={clsx(styles.card, 'cols-full')}>
            <h3>
              <i className="fa-duotone fa-crow" /> Crow facts while you're here:
            </h3>
            <ul className={styles.list}>
              <li>Crows can remember human faces for years and hold grudges</li>
              <li>They're one of the few animals that create and use tools </li>
              <li>
                Crows have been observed playing pranks on each other for fun
              </li>
              <li>
                A group of crows is called a "murder" (fitting for this dead
                page)
              </li>
            </ul>
          </Card>
        </Grid>
      </main>
    </>
  );
}
