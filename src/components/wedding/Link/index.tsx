import React from 'react';

import * as styles from './Link.module.css';

export default function Link(props: {
  ariaLabel?: string;
  href: string;
  text: React.ReactNode;
}) {
  return (
    <a
      aria-label={props.ariaLabel}
      className={styles.link}
      href={props.href}
      rel="noreferrer"
      target="_blank"
    >
      {props.text}
    </a>
  );
}
