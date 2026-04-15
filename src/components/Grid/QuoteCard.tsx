import clsx from 'clsx';
import styles from './Card.module.css';

export default function QuoteCard({
  as = 'blockquote',
  className,
  children,
}: React.PropsWithChildren<{
  as?: 'blockquote' | 'div' | 'section';
  className?: string;
}>) {
  const Component = as;
  return (
    <Component className={clsx(styles.card, styles['card-quote'], className)}>
      {children}
    </Component>
  );
}
