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
          <a
            className={styles.link}
            aria-label="Go to event details"
            href="#details"
            onClick={closeOverlay}
          >
            Event
          </a>
          <a
            className={styles.link}
            aria-label="Go to travel details"
            href="#travel"
            onClick={closeOverlay}
          >
            Travel/Accommodations
          </a>
          <a
            className={styles.link}
            aria-label="Go to COVID guidance"
            href="#covid"
            onClick={closeOverlay}
          >
            COVID-19
          </a>
          <a
            className={styles.link}
            aria-label="Go to the about us section"
            href="#about"
            onClick={closeOverlay}
          >
            About Us
          </a>
          <a
            className={styles.link}
            aria-label="Go to the schedule of events"
            href="#schedule"
            onClick={closeOverlay}
          >
            Schedule
          </a>
          <a
            className={styles.link}
            aria-label="Go to the frequently asked questions"
            href="#faq"
            onClick={closeOverlay}
          >
            FAQ
          </a>
        </nav>
      </div>
    </>
  );
}
