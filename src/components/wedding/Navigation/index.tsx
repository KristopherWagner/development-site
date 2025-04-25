import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { useState } from 'react';

import styles from './Navigation.module.css';

export default function Navigation() {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(!expanded);
  const closeOverlay = () => setExpanded(false);

  return (
    <>
      <div
        aria-label={expanded ? 'Close navigation' : 'Open navigation'}
        className={clsx(styles.button, expanded && styles.expanded)}
        onClick={toggle}
        onKeyDown={toggle}
        role="button"
        tabIndex={0}
      >
        <i
          className={clsx(
            styles.icon,
            expanded
              ? 'fa-solid fa-x fa-fw fa-xl'
              : 'fa-solid fa-bars fa-fw fa-xl',
          )}
        />
      </div>
      <div className={clsx(styles.overlay, expanded && styles.expanded)}>
        <nav className={styles.content}>
          <Link
            className={styles.link}
            aria-label="Go to event details"
            to="#details"
            onClick={closeOverlay}
          >
            Event
          </Link>
          <Link
            className={styles.link}
            aria-label="Go to travel details"
            to="#travel"
            onClick={closeOverlay}
          >
            Travel/Accommodations
          </Link>
          <Link
            className={styles.link}
            aria-label="Go to COVID guidance"
            to="#covid"
            onClick={closeOverlay}
          >
            COVID-19
          </Link>
          <Link
            className={styles.link}
            aria-label="Go to the about us section"
            to="#about"
            onClick={closeOverlay}
          >
            About Us
          </Link>
          <Link
            className={styles.link}
            aria-label="Go to the schedule of events"
            to="#schedule"
            onClick={closeOverlay}
          >
            Schedule
          </Link>
          <Link
            className={styles.link}
            aria-label="Go to the frequently asked questions"
            to="#faq"
            onClick={closeOverlay}
          >
            FAQ
          </Link>
        </nav>
      </div>
    </>
  );
}
