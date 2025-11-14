import clsx from 'clsx';

import styles from './Loader.module.css';

export default function Loader() {
  return (
    <h1 className={styles.heading}>
      <i className={clsx('fa-duotone fa-loader', 'fa-spin-pulse')} /> Loading...
    </h1>
  );
}
