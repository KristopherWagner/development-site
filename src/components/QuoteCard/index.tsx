import clsx from 'clsx';
import styles from './QuoteCard.module.css';

export default function QuoteCard({
  as = 'blockquote',
  className,
  children,
}: React.PropsWithChildren<{ as?: 'blockquote' | 'div'; className?: string }>) {
  const Component = as;
  return (
    <Component
      className={clsx(styles.block, styles['block-testimonial'], className)}
    >
      {children}
    </Component>
  );
}
