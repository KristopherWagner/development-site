import clsx from 'clsx';

import styles from './Grid.module.css';

export default function Grid({
  as = 'div',
  className,
  children,
}: React.PropsWithChildren<{ as?: 'div' | 'ul'; className?: string }>) {
  const Component = as;
  return (
    <Component className={clsx(className, styles['grid-container'])}>
      {children}
    </Component>
  );
}
