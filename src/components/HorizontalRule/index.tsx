import clsx from 'clsx';
import React from 'react';

import * as styles from './HorizontalRule.module.css';

export default function HorizontalRule(props: {
  variant?:
    | 'backgroundLightText'
    | 'primary'
    | 'primaryContainerText'
    | 'secondaryContainerText';
}) {
  return (
    <div className={clsx(styles.root, styles[props.variant ?? 'primary'])} />
  );
}
