import React from 'react';

import * as styles from './ButtonGroup.module.css';

export default function ButtonGroup(props: React.PropsWithChildren) {
  return <div className={styles.root}>{props.children}</div>;
}
