import clsx from 'clsx';
import React from 'react';

import * as styles from './Button.module.css';

export default function Button(
  props: React.PropsWithChildren<{
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    selected?: boolean;
  }>
) {
  return (
    <button
      className={clsx(
        'button',
        styles.button,
        props.selected && styles.selected
      )}
      onClick={props.onClick}
      type="button"
    >
      {props.children}
    </button>
  );
}
