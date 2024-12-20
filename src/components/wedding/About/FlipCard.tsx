import clsx from 'clsx';
import React, { useState } from 'react';

import * as styles from './FlipCard.module.css';

export default function FlipCard(props: {
  image: React.ReactNode;
  memory: string;
  name: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={clsx(styles.container, flipped && styles.flipped)}
        onClick={() => setFlipped(!flipped)}
      >
        <div className={styles.front}>{props.image}</div>
        <div className={styles.front + ' ' + styles.back}>
          <h4 className="montserrat">{props.name}</h4>
          <p className="body1">{props.memory}</p>
        </div>
      </div>
    </div>
  );
}
