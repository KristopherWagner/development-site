import clsx from 'clsx';
import React from 'react';

import * as styles from './Section.module.css';

export default function Section(
  props: React.PropsWithChildren<{
    anchor: string;
    variant?: 'light' | 'primary' | 'secondary';
  }>
) {
  const { anchor, children } = props;

  const classes = clsx(styles.root, styles[props.variant ?? 'primary']);

  return (
    <section className={classes} id={anchor}>
      {children}
    </section>
  );
}
