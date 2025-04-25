import clsx from 'clsx';

import styles from './HorizontalRule.module.css';

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
