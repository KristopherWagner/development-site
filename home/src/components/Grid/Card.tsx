import clsx from 'clsx';

import styles from './Card.module.css';

export default function Card({
  as = 'div',
  className,
  children,
}: React.PropsWithChildren<{ as?: 'div' | 'li'; className?: string }>) {
  const Component = as;
  return (
    <Component className={clsx(className, styles.card)}>{children}</Component>
  );
}
