import clsx from 'clsx';

import styles from './Grid.module.css';

export default function Grid({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx(className, styles['grid-container'])}>{children}</div>
  );
}
