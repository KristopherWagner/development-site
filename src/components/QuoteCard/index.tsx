import clsx from 'clsx';
import styles from './QuoteCard.module.css';

export default function QuoteCard({ children }: React.PropsWithChildren<{}>) {
  return (
    <blockquote className={clsx(styles.block, styles['block-testimonial'])}>
      {children}
    </blockquote>
  );
}
