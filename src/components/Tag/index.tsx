import clsx from 'clsx';
import styles from './Tag.module.css';

export default function Tag({
  as = 'span',
  className,
  children,
}: React.PropsWithChildren<{ as?: 'span' | 'li'; className?: string }>) {
  const Component = as;

  return (
    <Component className={clsx(styles.tag, className)}>{children}</Component>
  );
}
